import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { OrderedMap } from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import APIClient from '../../utils/APIClient';
import Header from '../../components/Header';
import styled from 'styled-components';
import ListItem from '../../components/ListItem';
import Item, { ItemProperties } from '../../components/Item';
import { Actions } from '../../redux/Items';
import SavedItems from '../SavedItems';

const Container = styled.div`
  width: 85%;
  margin: 5px auto;
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    width: 100%;
    margin: 0px auto;
  }
`;

interface Props {
  selectedItems: string[];
  items: OrderedMap<string, ItemProperties>;
  addStory: (s: ItemProperties) => void;
  setSelectedItems: (list: string[]) => void;
}

class App extends React.Component<Props> {
  public componentDidMount() {
    const client = APIClient.getInstance();
    client.subscribeToTopStories(async (snapshot) => {
      const items = snapshot.val().map((e: number) => e.toString()) || [];
      try {
        for (const id of items) {
          if (this.props.items.has(id)) {
            continue;
          }
          const item = await client.getItem(id);
          this.props.addStory(item.val());
        }
        this.props.setSelectedItems(items);
      } catch (e) {
        console.error(e);
      }
    });
  }

  public render() {
    return (
      <Router>
        <Container>
          <Header />
          <Route
            exact={true}
            path="/"
            component={this.topStoriesRoute}
          />
          <Route path="/saved" component={this.savedItemsRoute} />
        </Container >
      </Router >
    );
  }

  private topStoriesRoute = () => (
    <ListItem loading={this.props.selectedItems.length === 0}>
      {this.props.selectedItems.map((id: string, i: number) => {
        if (!this.props.items.has(id)) {
          return;
        }
        return <Item {...this.props.items.get(id)} key={i} />
      })}
    </ListItem>
  );

  private savedItemsRoute = () => (
    <SavedItems />
  );
}


const mapStateToProps = (state: any) => {
  return {
    selectedItems: state.selected,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addStory: (payload: ItemProperties) => dispatch({ type: Actions.ADD_ITEM, payload }),
  setSelectedItems: (payload: string[]) => dispatch({ type: Actions.SET_SELECTED_ITEMS, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);