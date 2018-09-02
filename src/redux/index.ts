import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import * as immutableTransform from 'redux-persist-transform-immutable';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import Items from './Items';
import bootstrap from '..';

export default createStore(
  Items,
  {},
  compose(
    applyMiddleware(logger),
    offline({
      ...offlineConfig,
      persistOptions: {
        transforms: [immutableTransform()]
      },
      persistCallback: bootstrap
    })
  )
);