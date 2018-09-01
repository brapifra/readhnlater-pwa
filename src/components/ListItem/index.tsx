import * as React from 'react';
import styled from 'styled-components';
import LoadingComponent from '../LoadingComponent';

const Container = styled.div`
  width: 100%;
  padding: 10px 4px;
  background: #f6f6ef;
  color: #828282;
  box-sizing: border-box;
  min-height: calc(100vh - 41px);
  height: calc(100vh - 41px);
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    min-height: calc(100vh - 27px);
  }
`;

const ItemRow = styled.tr`
  &>td{
    font-size: 10pt;
    &:first-child{
      text-align: right;
      padding-right: 4px;
      vertical-align: top;
    }
  }
  &:not(:last-child)>td:nth-child(2){
    padding-bottom: 5px;
  }
`;

interface Props {
  children: React.ReactNode[];
  loading?: boolean;
}

export default class ListItem extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <LoadingComponent loading={this.props.loading}>
          <table>
            <tbody>
              {this.props.children.map((e: React.ReactNode, i: number) => (
                <ItemRow key={i}>
                  <td>{i + 1}.</td>
                  <td>{e}</td>
                </ItemRow>
              ))}
            </tbody>
          </table>
        </LoadingComponent>
      </Container>
    );
  }
}