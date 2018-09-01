import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../../components/Header';
import styled from 'styled-components';
import SavedItems from '../SavedItems';
import RealTimeList from '../RealTimeList';

const Container = styled.div`
  width: 85%;
  margin: 5px auto;
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    width: 100%;
    margin: 0px auto;
  }
`;

export default class App extends React.Component {

  public render() {
    return (
      <Router>
        <Container>
          <Header />
          <Route
            exact={true}
            path="/"
            component={this.realTimeRoute()}
          />
          <Route exact={true} path="/saved" component={this.savedItemsRoute} />
          <Route
            path="/newest"
            component={this.realTimeRoute("newest")}
          />
        </Container >
      </Router >
    );
  }

  private realTimeRoute = (subscribeTo?: "newest") => () => (
    <RealTimeList subscribeTo={subscribeTo} />
  );

  private savedItemsRoute = () => (
    <SavedItems />
  );
}