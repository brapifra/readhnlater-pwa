import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  &>*{
    &:not(:last-child){
      margin-bottom: 5px;
    }
    margin-left: 3px;
  }
  width: 100%;
  padding: 10px 4px;
  background: #f6f6ef;
`;

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export default class ListItem extends React.Component<Props> {
  public render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}