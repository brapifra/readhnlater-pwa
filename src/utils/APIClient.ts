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
    firebase.database().ref('/v0/topstories').limitToFirst(limit).on('value', (snapshot) => {
      if (!snapshot) {
        return;
      }
      cb(snapshot);
    });
  }

  public getItem(id: number) {
    return firebase.database().ref(`/v0/item/${id}`).once('value');
  }
}

export default APIClient;