import * as React from 'react';
import ListItem from '../../components/ListItem';
import ItemHeader, { ItemProperties } from '../../components/ItemHeader';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';

interface Props {
  savedItems: OrderedMap<string, ItemProperties>;
}

class SavedItems extends React.PureComponent<Props> {
  public render() {
    return (
      <ListItem>
        {this.props.savedItems.reverse().toArray().map((item: ItemProperties, i: number) => {
          return <ItemHeader {...item} key={i} />
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
