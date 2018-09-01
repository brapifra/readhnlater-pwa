import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  &>a{
    &:not(:last-child)::after{
      content: '|';
      margin: 0 5px;
    };
    font-weight: bold;
    color: #ff6600;
    text-decoration:none;
    outline: none;
  }
  width: 100%;
  border: 2px solid #ff6600;
  padding: 2px;
  box-sizing: border-box;
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    border-right: 0;
    border-left: 0;
  }
`;

export default class Header extends React.Component {
  public render() {
    return (
      <Container>
        <Link to="/">ReadHNLater PWA</Link>
        <Link to="/saved">saved</Link>
      </Container>
    );
  }
}