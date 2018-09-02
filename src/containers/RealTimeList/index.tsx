import * as React from 'react';
import { OrderedMap } from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import APIClient from '../../utils/APIClient';
import ListItem from '../../components/ListItem';
import Item, { ItemProperties } from '../../components/Item';
import { Actions } from '../../redux/Items';

interface Props {
  subscribeTo?: 'newest';
  selectedItems: string[];
  items: OrderedMap<string, ItemProperties>;
  addItem: (s: ItemProperties) => void;
  setSelectedItems: (list: string[]) => void;
  setLoading: (b: boolean) => void;
}

class RealTimeList extends React.Component<Props> {
  public componentDidMount() {
    this.props.setLoading(true);
    switch (this.props.subscribeTo) {
      case 'newest':
        APIClient.getInstance().subscribeToNewStories(this.onNewData);
        break;
      default:
        APIClient.getInstance().subscribeToTopStories(this.onNewData);
        break;
    }
  }

  public render() {
    return (
      <ListItem loading={this.props.selectedItems.length === 0}>
        {this.props.selectedItems.map((id: string, i: number) => {
          if (!this.props.items.has(id)) {
            return <Item id={parseInt(id, 10)} key={i} />;
          }
          return <Item {...this.props.items.get(id)} key={i} />
        })}
      </ListItem>
    );
  }

  private onNewData = async (snapshot: firebase.database.DataSnapshot) => {
    this.props.setLoading(true);
    const items = snapshot.val().map((e: number) => e.toString()) || [];
    try {
      for (const id of items) {
        /*if (this.props.items.has(id)) {

          continue;
        }*/
        APIClient.getInstance().getItem(id).then((item: any) => {
          this.props.addItem(item.val());
        });
      }
      this.props.setSelectedItems(items);
    } catch (e) {
      console.error(e);
    }
    this.props.setLoading(false);
  };
}


const mapStateToProps = (state: any) => {
  return {
    selectedItems: state.selected,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addItem: (payload: ItemProperties) => dispatch({ type: Actions.ADD_ITEM, payload }),
  setSelectedItems: (payload: string[]) => dispatch({ type: Actions.SET_SELECTED_ITEMS, payload }),
  setLoading: (payload: boolean) => dispatch({ type: Actions.SET_LOADING, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeList);