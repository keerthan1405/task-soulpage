import React from 'react';
import MasterView from './components/MasterView';
import './App.css';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import SampleReducers from './store/reducers.store';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  sampleReducers: SampleReducers
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

function App() {
  return (
    <Provider store={store}>
      <div className="container-fluid mt-3">
        <MasterView />
      </div>
    </Provider>
  );
}

export default App;
