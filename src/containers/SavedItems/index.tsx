import * as React from 'react';
import ListItem from '../../components/ListItem';
import ItemHeader, { ItemProperties } from '../../components/ItemHeader';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import ItemFetcher from 'src/components/ItemFetcher';
import GunConnector from 'src/gun/GunConnector';
import GunHelper from 'src/gun/GunHelper';

interface Props {
  savedItems: OrderedMap<string, ItemProperties>;
}

class SavedItems extends React.PureComponent<Props> {

  private renderItem = (item: ItemProperties) => {
    return <ItemHeader {...item} />;
  }

  private renderItemFetcher = (id: string) => {
    return <ItemFetcher key={id} id={id} render={this.renderItem} />;
  }

  private renderList = (data: any = {}, err?: any, gun?: GunHelper) => {
    if (err || !gun) {
      console.warn(err ? err : 'Gun helper not ready yet');
      return null;
    }

    const savedItems: string[] = Object.keys(data).filter(key => data[key] !== null);

    return (
      <ListItem>
        {savedItems.map(this.renderItemFetcher)}
      </ListItem>
    )
  }

  public render() {
    return <GunConnector nodeKey="savedItems" render={this.renderList} />;
  }
}

const mapStateToProps = (state: any) => {
  return {
    savedItems: state.saved
  };
};

export default connect(mapStateToProps)(SavedItems);
