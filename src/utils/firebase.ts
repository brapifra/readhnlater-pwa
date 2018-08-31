import * as firebase from 'firebase/app';
import 'firebase/database';

const config = {
  databaseURL: " https://hacker-news.firebaseio.com/"
};

export default firebase.initializeApp(config);