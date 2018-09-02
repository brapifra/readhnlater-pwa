import * as React from 'react';
import styled from 'styled-components';
import { IoMdBookmark } from 'react-icons/io';
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
    min-height: calc(100vh - 27px);
  }
`;

const ItemRow = styled.tr`
  &>td{
    font-size: 10pt;
    &:first-child{
      text-align: right;
      vertical-align: top;
    }
  }
  &>td:nth-child(2){
    vertical-align: top;
    cursor: pointer;
  }
  &:not(:last-child)>td:nth-child(3){
    padding-bottom: 5px;
  }
`;

interface Props {
  children: React.ReactNode[];
  loading?: boolean;
  savedItems: OrderedMap<string, ItemProperties>;
  saveItem: (payload: ItemProperties) => void;
  unSaveItem: (payload: ItemProperties) => void;
}

class ListItem extends React.Component<Props> {
  public render() {
    const { savedItems } = this.props;
    return (
      <Container
        style={{
          height: this.props.children.length === 0 ? "calc(100vh - 41px)" : "100%"
        }}
      >
        <LoadingComponent loading={this.props.loading}>
          {this.props.children.length === 0 ?
            <div style={{ width: '100%', textAlign: 'center' }}>
              Nothing to show here :(
            </div>
            :
            <table>
              <tbody>
                {this.props.children.map((e: React.ReactElement<any>, i: number) => (
                  <ItemRow key={i}>
                    <td>{i + 1}.</td>
                    <td onClick={this.saveOrDeleteItem(e.props)}>
                      <IoMdBookmark
                        size={15}
                        color={savedItems.has(e.props.id.toString()) ? '#ff6600' : '#828282'}
                      />
                    </td>
                    <td>{e}</td>
                  </ItemRow>
                ))}
              </tbody>
            </table>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);