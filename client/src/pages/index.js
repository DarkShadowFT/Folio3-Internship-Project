import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../state/store';

export default function Index(){
  return (
    <Provider store={store}>
    <App />
    </Provider>
  )
}