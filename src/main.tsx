import 'preact/debug';

import '../node_modules/irmas-preact-form-components/dist/style.css';
import './styles/style.css';

import { render } from 'preact';
import { App } from './app.tsx';

render(<App />, document.getElementById('app')!);
