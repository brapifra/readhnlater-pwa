import * as React from 'react';
import styled from 'styled-components';
import { IoMdBookmark } from 'react-icons/io';
import LoadingComponent from '../LoadingComponent';
import { ItemProperties } from '../ItemHeader';
import { OrderedMap } from 'immutable';
import { connect } from 'react-redux';
import GunConnector from 'src/gun/GunConnector';
import GunHelper from 'src/gun/GunHelper';

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
  deprecatedSavedItems: OrderedMap<string, ItemProperties>;
}

class ListItem extends React.PureComponent<Props> {
  public componentDidMount() {
    const position = parseInt(localStorage.getItem("lastScrollPosition") || "0", 10);
    if (position > 0 && window.performance.navigation.type ===
      window.performance.navigation.TYPE_BACK_FORWARD) {
      window.scrollTo({ top: position });
    }
  }

  private renderList = (data: any = {}, err?: any, gun?: GunHelper) => {
    if (err || !gun) {
      console.error(err);
      return null;
    }

    return (
      <table>
        <tbody>
          {this.props.children.map((e: React.ReactElement<any>, i: number) => (
            <ItemRow key={i}>
              <td>{i + 1}.</td>
              <td onClick={this.saveOrDeleteItem(e.props, data, gun)}>
                <IoMdBookmark
                  size={15}
                  color={data[e.props.id.toString()] ? '#ff6600' : '#828282'}
                />
              </td>
              <td>{e}</td>
            </ItemRow>
          ))}
        </tbody>
      </table>
    );
  }

  public render() {
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
            <GunConnector nodeKey="savedItems" render={this.renderList} />
          }
        </LoadingComponent>
      </Container>
    );
  }

  private saveOrDeleteItem = (item: ItemProperties, savedItems: any, gun: GunHelper) => () => {
    const id = item.id.toString();
    const gunId = `savedItems.${id}`;

    if (savedItems[id]) {
      gun.remove(gunId);
    } else {
      gun.put(gunId, { date: new Date().getTime() });
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    deprecatedSavedItems: state.saved,
  };
};

export default connect(mapStateToProps)(ListItem);