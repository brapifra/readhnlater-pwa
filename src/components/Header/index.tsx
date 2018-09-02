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
    &>h1{
      font-weight: bold;
      font-size: 12pt;
      margin: 0;
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
        <Link to="/"><h1>ReadHNLater</h1></Link>
        <Link to="/newest">new</Link>
        <Link to="/show">show</Link>
        <Link to="/ask">ask</Link>
        <Link to="/jobs">jobs</Link>
        <Link to="/best">best</Link>
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