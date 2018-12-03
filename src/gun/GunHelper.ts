
export default class GunHelper {
  private gun: any;
  private path: string;

  constructor(gun: any) {
    this.gun = gun;
    this.path = 'readhnlater/' + gun.is.pub;
  }

  public subscribe(callback: (data: any) => void) {
    this.gun.get(this.path).on((newData: any) => {
      if (!newData) {
        return;
      }
      const { _, ...rest } = newData;

      callback(rest);
    }, {
        change: true
      });
  }

  public put(key: string, value: object) {
    this.gun.get(this.path).get(key).put(value);
  }


  public get(key: string): Promise<any> {
    return new Promise((resolve) => {
      this.gun.get(this.path).get(key).get(resolve);
    });
  }

  public remove(key: string) {
    this.gun.get(this.path).get(key).put(null);
  }

  public drop() {
    this.gun.get(this.path).put(null);
  }
}