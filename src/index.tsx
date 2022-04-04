import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import { Provider } from 'react-redux';
import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
