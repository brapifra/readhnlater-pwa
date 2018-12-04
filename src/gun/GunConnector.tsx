import * as React from 'react';
import GunFactory from './GunFactory';
import GunHelper from './GunHelper';

interface GunConnectorProps {
  nodeKey: string;
  render: (data?: any, err?: any, gun?: GunHelper) => React.ReactNode | React.ReactNode[];
}

interface GunConnectorState {
  data?: any;
  err?: any;
  gun?: GunHelper;
}

export default class GunConnector extends React.PureComponent<GunConnectorProps> {
  public state: GunConnectorState = {
    data: undefined,
    err: undefined,
    gun: undefined,
  };

  public async componentDidMount() {
    try {
      const gun = await GunFactory.get();
      gun.subscribe(this.props.nodeKey, this.updateState);
      this.setState({ gun })
    } catch (err) {
      this.setState({ err });
    }
  }

  public async componentWillUnmount() {
    if (this.state.gun) {
      this.state.gun.unsubscribe(this.props.nodeKey);
    }
  }

  private updateState = async (data: any) => {
    this.setState({ data });
  }

  public render() {
    return this.props.render(this.state.data, this.state.err, this.state.gun);
  }
}