import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  &>span{
    &:not(:last-child)::after{
      content: '|';
      margin: 0 5px;
    };
    font-weight: bold;
    color: #ff6600;
  }
  width: 100%;
  border: 2px solid #ff6600;
  padding: 2px;
`;

export default class Header extends React.Component {
  public render() {
    return (
      <Container>
        <span>HN RIL PWA</span>
        <span>new</span>
      </Container>
    );
  }
}