import * as React from 'react';
import ListItem from '../../components/ListItem';
import Item, { ItemProperties } from '../../components/Item';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';

interface Props {
  savedItems: OrderedMap<number, ItemProperties>;
}

class SavedItems extends React.Component<Props> {
  public render() {
    return (
      <ListItem>
        {this.props.savedItems.toArray().map((item: ItemProperties, i: number) => {
          return <Item {...item} key={i} />
        })}
      </ListItem>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    savedItems: state.saved
  };
};

export default connect(mapStateToProps)(SavedItems);
