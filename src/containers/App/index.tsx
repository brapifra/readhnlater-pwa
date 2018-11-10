import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Header from '../../components/Header';
import styled from 'styled-components';
import SavedItems from '../SavedItems';
import RealTimeList from '../RealTimeList';

const Container = styled.div`
  width: calc(85% - 16px);
  margin: 5px auto;
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    width: 100%;
    margin: 0px auto;
  }
`;

export default class App extends React.PureComponent {

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
          <Route
            path="/show"
            component={this.realTimeRoute("show")}
          />
          <Route
            path="/ask"
            component={this.realTimeRoute("ask")}
          />
          <Route
            path="/jobs"
            component={this.realTimeRoute("jobs")}
          />
          <Route
            path="/best"
            component={this.realTimeRoute("best")}
          />
        </Container >
      </Router >
    );
  }

  private realTimeRoute = (subscribeTo?: "newest" | "show" | "ask" | "jobs" | "best") => () => (
    <RealTimeList subscribeTo={subscribeTo} />
  );

  private savedItemsRoute = () => (
    <SavedItems />
  );
}