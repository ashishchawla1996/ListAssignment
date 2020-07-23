import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import getListReducer from './reducer/getListReducer';
import ListGrid from './screens/ListGrid';

const store = createStore(getListReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <ListGrid />
    </Provider>
  );
};

export default App;
