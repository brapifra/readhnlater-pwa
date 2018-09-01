import * as React from 'react';
import firebase from '../../utils/firebase';
import Header from '../../components/Header';
import styled from 'styled-components';
import ListItem from '../../components/ListItem';
import Item, { ItemProperties } from '../../components/Item';

const Container = styled.div`
  width: 85%;
  margin: 5px auto;
`;

interface State {
  listItemData: ItemProperties[];
}

class App extends React.Component<{}, State> {
  public state: State = {
    listItemData: []
  }
  public componentDidMount() {
    firebase.database().ref('/v0/topstories').limitToFirst(30).on('value', async (snapshot) => {
      if (!snapshot) {
        return;
      }
      try {
        const listItemData = [];
        for (const id of snapshot.val()) {
          const item = await firebase.database().ref(`/v0/item/${id}`).once('value');
          listItemData.push(item.val());
        }
        this.setState({ listItemData });
      } catch (e) {
        console.error(e);
      }
    });
  }
  public render() {
    return (
      <Container>
        <Header />
        <ListItem>
          {this.state.listItemData.map((e: ItemProperties, i: number) => (
            <Item {...e} key={i} />
          ))}
        </ListItem>
      </Container>
    );
  }
}

export default App;
