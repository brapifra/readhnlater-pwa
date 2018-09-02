import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';

const Container = styled.div`
  &>a{
    &:not(:last-child){
      border-right: 2px solid white;
      margin-right: 10px;
      padding-right: 10px;
    };
    &:first-child{
      font-weight: bold;
    }
    color: white;
    text-decoration:none;
    outline: none;
  }
  &>*{
    display: inline-block;
  }
  width: 100%;
  background: #ff6600;
  padding: 5px;
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
        {this.props.loading ? <span><ClipLoader color="white" size={13} /></span> : null}
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