import GunHelper from './GunHelper';
import Gun from 'gun/gun';
import 'gun/sea';

export default class GunFactory {
  private static gun: GunHelper;
  private static user = Gun('http://gungame.herokuapp.com/gun').user();

  private static checkErrors(username: string, password: string) {
    if (!username || !password) {
      throw Error('Username & Password required');
    }
    if (!this.user) {
      throw Error('Gun instance not ready');
    }
  }

  public static get(): Promise<GunHelper> {
    if (!this.gun) {
      return new Promise((resolve, reject) => {
        this.user.recall({ sessionStorage: true }, (ack: any) => {
          if (ack.err) {
            reject(ack.err);
          }

          this.gun = new GunHelper(this.user);
          resolve(this.gun);
        });
      });
    }

    return Promise.resolve(this.gun);
  }

  public static async signUp(username: string, password: string): Promise<void> {
    this.checkErrors(username, password);

    await new Promise((resolve, reject) => {
      this.user.create(username, password, (ack: any) => {
        if (ack.err) {
          reject(ack.err);
        }

        resolve();
      })
    });

    this.gun = new GunHelper(this.user);
  }

  public static async login(username: string, password: string): Promise<void> {
    this.checkErrors(username, password);

    await new Promise((resolve, reject) => {
      this.user.auth(username, password, (ack: any) => {
        if (ack.err) {
          reject(ack.err);
        }

        resolve();
      })
    });

    this.gun = new GunHelper(this.user);
  }
}