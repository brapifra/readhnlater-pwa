import * as React from 'react';
import firebase from '../../utils/firebase';

class App extends React.Component {
  public componentDidMount() {
    firebase.database().ref('/v0/topstories').on('value', (snapshot) => {
      if (!snapshot) {
        return;
      }
      console.log(snapshot.val());
    });
  }
  public render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
}

export default App;
