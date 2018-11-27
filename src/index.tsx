import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux';
import App from './containers/App';
import './index.css';
import OrbitDB from './orbitdb';
import registerServiceWorker from './registerServiceWorker';

export default async function bootstrap() {
  const orbitDbAddress = localStorage.getItem('orbitDbAddress');
  orbitDbAddress ? await OrbitDB.openDB(orbitDbAddress) : await OrbitDB.createDB();

  ReactDOM.render(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
  registerServiceWorker();
}
