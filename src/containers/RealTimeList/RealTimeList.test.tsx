import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Store from '../../redux';
import RealTimeList from '../RealTimeList';
import ListItem from '../../components/ListItem';

Enzyme.configure({ adapter: new Adapter() });

describe('RealTimeList tests', () => {
  it('Renders without crashing', () => {
    const props: any = { store: Store };
    const wrapper = Enzyme.shallow(<RealTimeList {...props} />);
    const wChild = wrapper.dive();
    expect(wrapper.exists()).toBe(true);
    expect(wChild.is(ListItem)).toBe(true);
  });
});