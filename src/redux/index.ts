import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import * as immutableTransform from 'redux-persist-transform-immutable';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import Items from './Items';
import bootstrap from '..';

const reduxOffline = offline({
  ...offlineConfig,
  persistOptions: {
    transforms: [immutableTransform()]
  },
  persistCallback: bootstrap
});

export default createStore(
  Items,
  {},
  process.env.NODE_ENV !== 'production' ?
    compose(
      applyMiddleware(logger),
      reduxOffline
    ) as any :
    reduxOffline
);