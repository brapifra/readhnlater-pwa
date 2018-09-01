import * as React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

interface Props {
  loading: any;
  children: React.ReactNode;
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingComponent = (props: Props): any => {
  if (props.loading) {
    return <LoadingContainer><ClipLoader color="#ff6600" /></LoadingContainer>
  }
  return props.children;
};

export default LoadingComponent;