import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';
import Store from '../redux';
import redux from '../redux';
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

    Orbit.db = await Orbit.instance.docs(address, { indexBy: 'id' });
    await Orbit.db.load();

    // Legacy
    Orbit.loadReduxToOrbit();

    Orbit.loadOrbitToRedux();

    return Orbit.db;
  }

  public static createDB(): Promise<any> {
    return Orbit.openDB('readhnlater');
  }

  private static ipfs: any;
  private static ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
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