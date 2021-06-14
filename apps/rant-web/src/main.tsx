import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import './styles/tailwind.dev.css'
import 'antd/dist/antd.css';
import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
