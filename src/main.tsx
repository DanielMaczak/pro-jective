import 'preact/debug';

import '../node_modules/irmas-preact-form-components/dist/style.css';
import './styles/style.css';

import { render } from 'preact';
import { Provider } from 'react-redux';

import { store } from './app/store';
import { App } from './app.tsx';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')!
);
