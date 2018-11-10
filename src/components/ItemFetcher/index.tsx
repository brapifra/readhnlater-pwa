import * as React from 'react';
import { connect } from 'react-redux';
import { ItemProperties } from "../ItemHeader";
import LoadingComponent from '../LoadingComponent';
import { OrderedMap } from 'immutable';
import APIClient from 'src/utils/APIClient';
import { Dispatch } from 'redux';
import { Actions } from 'src/redux/Items';

interface Props {
  id: string;
  render: (item: ItemProperties) => React.ReactElement<any>;
  items: OrderedMap<string, ItemProperties>;
  addItem: (s: ItemProperties) => void;
}

interface State {
  item?: ItemProperties;
}

class FullItem extends React.Component<Props, State> {
  public state: State = {};

  public async componentDidMount() {
    const { items, id, addItem } = this.props;
    let item = items.get(id);

    if (!item) {
      item = (await APIClient.getInstance().getItem(parseInt(id, 10))).val();
      this.setState({ item }, () => addItem(item));
    }

    this.setState({ item });
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState !== this.state;
  }

  public render() {
    const { item } = this.state;
    return (
      <LoadingComponent loading={!item}>
        {item && this.props.render(item)}
      </LoadingComponent>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addItem: (payload: ItemProperties) => dispatch({ type: Actions.ADD_ITEM, payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(FullItem);