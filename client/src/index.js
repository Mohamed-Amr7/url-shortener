import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configStore from './store';
import AppRouter from './routes/AppRouter';

const store = configStore();


store.subscribe(() => {
    console.log(store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <AppRouter/>
      </Provider>
  </React.StrictMode>
);

