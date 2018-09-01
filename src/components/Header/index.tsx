import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { connect } from 'react-redux';

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
  &>*{
    display: inline-block;
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

class Header extends React.Component<{ loading: boolean }> {
  public render() {
    return (
      <Container>
        <Link to="/">ReadHNLater</Link>
        <Link to="/newest">new</Link>
        <Link to="/saved">saved</Link>
        {this.props.loading ? <span><CircleLoader color="#ff6600" size={10} /></span> : null}
      </Container>
    );
  }
}


const mapStateToProps = (state: any) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Header);