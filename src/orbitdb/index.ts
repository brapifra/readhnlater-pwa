import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';
import Store from '../redux';
import { ItemProperties } from 'src/components/ItemHeader';
import { Actions } from 'src/redux/Items';

export default class Orbit {
  public static instance?: any;
  public static db?: any;

  public static init(ipfsOptions: any = Orbit.ipfsOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      Orbit.ipfs = new IPFS(ipfsOptions);

      Orbit.ipfs.on('error', (e: any) => reject(e));

      Orbit.ipfs.on('ready', async () => {
        Orbit.instance = new OrbitDB(Orbit.ipfs);
        resolve();
      });
    });
  }

  public static async openDB(address: string): Promise<any> {
    if (!Orbit.instance) {
      await Orbit.init();
    }

    Orbit.db = await Orbit.instance.docs(address, { indexBy: 'id', write: ['*'] });
    await Orbit.db.load();

    Orbit.db.events.on('replicated', ()=>{
      console.log('OrbitDB: Replicated');
      Orbit.loadOrbitToRedux();
    });

    // Legacy
    Orbit.loadReduxToOrbit();

    Orbit.loadOrbitToRedux();

    return Orbit.db;
  }

  public static createDB(): Promise<any> {
    return Orbit.openDB('readhnlater');
  }

  public static async put(item: ItemProperties): Promise<void>{
    if(!Orbit.db){
      return Promise.reject();
    }

    await Orbit.db.put(item); 
  }

  public static async del(id: number): Promise<void>{
    if(!Orbit.db){
      return Promise.reject();
    }

    await Orbit.db.del(id); 
  }

  private static ipfs: any;
  private static ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        ]
      },
    }
  };

  private static async loadReduxToOrbit() {
    if (localStorage.getItem('migratedToOrbit')) {
      return;
    }

    const items = Store.getState().items.toArray();
    const promises = [];

    for (const item of items) {
      promises.push(Orbit.db.put(item));
    }

    await Promise.all(promises);
    localStorage.setItem('migratedToOrbit', new Date().toUTCString());
    console.log("Migration to OrbitDB completed!");
  }

  private static async loadOrbitToRedux() {
    const items = Orbit.db.query((doc: ItemProperties) => doc.id);

    Store.dispatch({ type: Actions.LOAD_SAVED_ITEMS, payload: { items } });
  }
}