
export default class GunHelper {
  private gun: any;

  constructor(gun: any) {
    this.gun = gun.get('readhnlater/' + gun.is.pub);
  }

  public getNode(key: string): any {
    const keys = key.trim().split('.');
    let node = this.gun;

    for (const k of keys) {
      node = node.get(k);
    }

    return node;
  }

  public subscribe(key: string, callback: (data: any) => void) {
    this.getNode(key).on((newData: any) => {
      if (!newData) {
        return;
      }
      const { _, ...rest } = newData;

      callback(rest);
    });
  }

  public unsubscribe(key: string) {
    this.getNode(key).off();
  }

  public get(key: string): Promise<any> {
    return new Promise((resolve) => {
      this.getNode(key).get(resolve);
    });
  }

  public put(key: string, value: object | number | string | null): any {
    return this.getNode(key).put(value, (ack: any)=>{
      console.log(ack);
    });
  }

  public remove(key: string): any {
    return this.put(key, null);
  }

  public drop(): any {
    sessionStorage.clear();
    localStorage.clear();
    return this.gun.put(null);
  }
}