import * as React from 'react';
import firebase from '../../utils/firebase';
import Header from '../../components/Header';
import styled from 'styled-components';

const Container = styled.div`
  width: 85%;
  margin: 5px auto;
`;

class App extends React.Component {
  public componentDidMount() {
    firebase.database().ref('/v0/topstories').limitToFirst(30).on('value', (snapshot) => {
      if (!snapshot) {
        return;
      }
      console.log(snapshot.val());
    });
  }
  public render() {
    return (
      <Container>
        <Header />
      </Container>
    );
  }
}

export default App;
