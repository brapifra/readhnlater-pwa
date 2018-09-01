import * as React from 'react';
import firebase from '../../utils/firebase';
import Header from '../../components/Header';
import styled from 'styled-components';
import ListItem from '../../components/ListItem';
import Item, { ItemProperties } from '../../components/Item';

const Container = styled.div`
  width: 85%;
  margin: 5px auto;
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    width: 100%;
    margin: 0px auto;
  }
`;

interface State {
  items: number[];
}

class App extends React.Component<{}, State> {
  public state: State = {
    items: []
  }
  private itemsData: Map<number, ItemProperties> = new Map();
  public componentDidMount() {
    firebase.database().ref('/v0/topstories').limitToFirst(30).on('value', async (snapshot) => {
      if (!snapshot) {
        return;
      }
      const items = snapshot.val();
      try {
        for (const id of items) {
          if (this.itemsData.has(id)) {
            continue;
          }
          const item = await firebase.database().ref(`/v0/item/${id}`).once('value');
          this.itemsData.set(id, item.val());
        }
        this.setState({ items });
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
          {this.state.items.map((id: number, i: number) => {
            const item = this.itemsData.get(id);
            if (!item) {
              return null;
            }
            return <Item {...item} key={i} />
          })}
        </ListItem>
      </Container>
    );
  }
}

export default App;
