import * as React from 'react';
import OrbitDB from 'src/orbitdb';
import { Container as container } from 'src/components/ListItem';
import Orbit from 'src/orbitdb';
import styled from 'styled-components';

const Container = styled(container)`
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  margin: 20px 0;
`;

const InputSection = styled.div`
  margin-top: 40px;
`;

const Input = styled.input`
  width: 80%;
  text-align: center;
`;

const Button = styled.button`
`;

export default class Sync extends React.PureComponent {
  private syncInputRef = React.createRef();

  public onSync = async () => {
    const input = this.syncInputRef.current as HTMLInputElement;
    console.log(input);
    if (!input || !input.value || input.value === Orbit.getDbId()) {
      return;
    }

    const address = input.value;
    await OrbitDB.openDB(address);
    window.location.reload();
  }

  public render() {
    const orbitDbAddress = localStorage.getItem('orbitDbAddress') || OrbitDB.getDbId();

    return (
      <Container>
        <Title>Copy this address if you need to sync another ReadHNLater</Title>
        <div>or</div>
        <Title>Paste here the address of another ReadHNLater to sync</Title>
        <InputSection>
          <Input innerRef={this.syncInputRef as any} defaultValue={orbitDbAddress} />
          <Button onClick={this.onSync}>Sync</Button>
        </InputSection>
      </Container>
    );
  }
}