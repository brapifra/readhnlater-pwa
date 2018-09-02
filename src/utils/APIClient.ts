import * as firebase from 'firebase/app';
import 'firebase/database';

const config = {
  databaseURL: " https://hacker-news.firebaseio.com/"
};

class APIClient {
  public static getInstance(): APIClient {
    return (APIClient.instance || (APIClient.instance = new this()));
  }
  private static instance: APIClient;
  private listenerRef: firebase.database.Query | null;

  constructor() {
    if (APIClient.instance) {
      return;
    }
    console.log("Firebase initialization...");
    firebase.initializeApp(config);
    APIClient.instance = this;
  }

  public subscribeToTopStories(
    cb: (snapshot: firebase.database.DataSnapshot) => void,
    limit: number = 30,
    offset: number = 0
  ) {
    this.subscribeTo('/v0/topstories', cb, limit, offset);
  }

  public subscribeToNewStories(
    cb: (snapshot: firebase.database.DataSnapshot) => void,
    limit: number = 30,
    offset: number = 0
  ) {
    this.subscribeTo('/v0/newstories', cb, limit, offset);
  }

  public subscribeToShowStories(
    cb: (snapshot: firebase.database.DataSnapshot) => void,
    limit: number = 30,
    offset: number = 0
  ) {
    this.subscribeTo('/v0/showstories', cb, limit, offset);
  }

  public subscribeToAskStories(
    cb: (snapshot: firebase.database.DataSnapshot) => void,
    limit: number = 30,
    offset: number = 0
  ) {
    this.subscribeTo('/v0/askstories', cb, limit, offset);
  }

  public subscribeToJobStories(
    cb: (snapshot: firebase.database.DataSnapshot) => void,
    limit: number = 30,
    offset: number = 0
  ) {
    this.subscribeTo('/v0/jobstories', cb, limit, offset);
  }

  public subscribeToBestStories(
    cb: (snapshot: firebase.database.DataSnapshot) => void,
    limit: number = 30,
    offset: number = 0
  ) {
    this.subscribeTo('/v0/beststories', cb, limit, offset);
  }

  public getItem(id: number) {
    return firebase.database().ref(`/v0/item/${id}`).once('value');
  }

  public removeListener() {
    if (this.listenerRef) {
      this.listenerRef.off();
    }
    this.listenerRef = null;
  }

  private subscribeTo(
    path: string,
    cb: (snapshot: firebase.database.DataSnapshot) => void,
    limit: number = 30,
    offset: number = 0
  ) {
    this.removeListener();
    this.listenerRef = firebase.database().ref(path).limitToFirst(limit);
    this.listenerRef.on('value', (snapshot) => {
      if (!snapshot) {
        return;
      }
      cb(snapshot);
    });
  }
}

export default APIClient;