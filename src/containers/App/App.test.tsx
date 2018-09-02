import * as React from 'react';
import { Provider } from 'react-redux';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import App from '.';
import Store from '../../redux';
import Header from '../../components/Header';
import RealTimeList from '../RealTimeList';

Enzyme.configure({ adapter: new Adapter() });

describe('App tests', () => {
  let component: Enzyme.ReactWrapper;
  beforeEach(() => {
    component = Enzyme.mount(
      <Provider store={Store}>
        <App />
      </Provider>
    );
  })

  it('Renders without crashing', () => {
    expect(component.exists()).toBe(true);
    expect(component.contains(<App />)).toBe(true);
    expect(component.contains(<Header />)).toBe(true);
    expect(component.contains(<RealTimeList />)).toBe(true);
    const rl = component.find(RealTimeList);
    expect(rl.props()).toEqual({ subscribeTo: undefined });
  });
});