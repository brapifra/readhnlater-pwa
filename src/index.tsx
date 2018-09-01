import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

export default function bootstrap() {
  ReactDOM.render(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
  registerServiceWorker();
}
