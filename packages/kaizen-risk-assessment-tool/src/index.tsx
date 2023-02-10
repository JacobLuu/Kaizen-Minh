import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import ThemeProvider from './themes';
import GlobalStyles from './themes/GlobalStyles';
import store from './store';
import App from './App';
import history from './utils/history';
import GlobalContainer from './containers/Global';
import 'react-toastify/dist/ReactToastify.css';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const root = ReactDOM.createRoot(document.getElementById('root-admin'));


root.render(<React.Suspense fallback={loading()}>
<Provider store={store}>
  <ConnectedRouter history={history}>
    <ThemeProvider>
      <GlobalStyles />
      <GlobalContainer />
      <App />
    </ThemeProvider>
  </ConnectedRouter>
</Provider>
</React.Suspense>);
