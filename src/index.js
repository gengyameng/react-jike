import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './App';

import { RouterProvider } from 'react-router-dom'

import router from '@/router'

import { Provider } from 'react-redux';
import store from '@/store'

import './index.scss'

import 'normalize.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
  </Provider>
);


