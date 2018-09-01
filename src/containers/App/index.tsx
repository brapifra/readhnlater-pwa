import * as React from 'react';
import APIClient from '../../utils/APIClient';
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
    const client = APIClient.getInstance();
    client.subscribeToTopStories(async (snapshot) => {
      const items = snapshot.val() || [];
      console.log(items);
      try {
        for (const id of items) {
          if (this.itemsData.has(id)) {
            continue;
          }
          const item = await client.getItem(id);
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
