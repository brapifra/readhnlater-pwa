import * as React from 'react';
import styled from 'styled-components';
import { IoMdBookmark } from 'react-icons/io';
import LoadingComponent from '../LoadingComponent';
import OfflineClient from '../../utils/OfflineClient';
import { ItemProperties } from '../Item';

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
}

interface State {
  savedItems: Map<number, ItemProperties>;
}

export default class ListItem extends React.Component<Props, State> {
  public state: State = {
    savedItems: OfflineClient.getSavedItems()
  };
  public render() {
    const { savedItems } = this.state;
    return (
      <Container
        style={{
          height: this.props.children.length === 0 ? "calc(100vh - 41px)" : "100%"
        }}
      >
        <LoadingComponent loading={this.props.loading}>
          <table>
            <tbody>
              {this.props.children.map((e: React.ReactElement<any>, i: number) => (
                <ItemRow key={i}>
                  <td>{i + 1}.</td>
                  <td>
                    <IoMdBookmark
                      size={15}
                      color={savedItems.has(e.props.id) ? '#ff6600' : '#828282'}
                      onClick={this.saveOrDeleteItem(e.props, this)}
                    />
                  </td>
                  <td>{e}</td>
                </ItemRow>
              ))}
            </tbody>
          </table>
        </LoadingComponent>
      </Container>
    );
  }

  private saveOrDeleteItem = (item: ItemProperties, ref: any) => () => {
    const { savedItems } = this.state;
    if (savedItems.has(item.id)) {
      savedItems.delete(item.id);
    } else {
      savedItems.set(item.id, item);
    }
    OfflineClient.setSavedItems(savedItems);
    this.setState({ savedItems });
  }
}