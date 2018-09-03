import * as React from 'react';
import styled from 'styled-components';
import { IoMdBookmark } from 'react-icons/io';
import * as ReactSwipe from 'react-swipe';
import LoadingComponent from '../LoadingComponent';
import { ItemProperties } from '../Item';
import { Dispatch } from 'redux';
import { Actions } from '../../redux/Items';
import { OrderedMap } from 'immutable';
import { connect } from 'react-redux';

const Container = styled.div`
  width: 100%;
  padding: 10px 4px;
  background: #f6f6ef;
  color: #828282;
  box-sizing: border-box;
  min-height: calc(100vh - 41px);
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    min-height: calc(100vh - 55px);
  }
`;

const SwipeableItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  min-height: calc(100vh - 75px);
  font-size: 15pt;
`;


interface Props {
  children: React.ReactNode[];
  loading?: boolean;
  savedItems: OrderedMap<string, ItemProperties>;
  saveItem: (payload: ItemProperties) => void;
  unSaveItem: (payload: ItemProperties) => void;
  onSwipe?: (index: number, elem: HTMLElement) => void;
}

class SwipeableList extends React.Component<Props> {
  public render() {
    const { savedItems } = this.props;
    return (
      <Container
        style={{
          height: this.props.children.length === 0 ? "calc(100vh - 41px)" : "100%"
        }}
      >
        <LoadingComponent loading={this.props.loading}>
          <ReactSwipe swipeOptions={{ continuous: false, callback: this.props.onSwipe }}>
            {this.props.children.map((e: React.ReactElement<any>, i: number) => (
              <SwipeableItem key={i}>
                <div>{i + 1}.</div>
                {e}
                <div onClick={this.saveOrDeleteItem(e.props)}>
                  <IoMdBookmark
                    size={25}
                    color={savedItems.has(e.props.id.toString()) ? '#ff6600' : '#828282'}
                  />
                </div>
              </SwipeableItem>
            ))}
          </ReactSwipe>
        </LoadingComponent>
      </Container>
    );
  }

  private saveOrDeleteItem = (item: ItemProperties) => () => {
    const { savedItems } = this.props;
    if (savedItems.has(item.id.toString())) {
      this.props.unSaveItem(item);
    } else {
      this.props.saveItem(item);
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    savedItems: state.saved,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveItem: (payload: ItemProperties) => dispatch({ type: Actions.SAVE_ITEM, payload }),
  unSaveItem: (payload: ItemProperties) => dispatch({ type: Actions.UNSAVE_ITEM, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(SwipeableList);