import React from 'react';
import { render }from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import createStore from './reducks/store/store';
import * as serviceWorker from './serviceWorker';
import './assets/reset.css'
import './assets/style.css'
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './assets/theme'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const history = History.createBrowserHistory();
export const store = createStore(history);

render(
    <Provider store={store}>
        <ConnectedRouter history={history} >
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)

serviceWorker.unregister();