import { PolybaseProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { WagmiConfig } from 'wagmi';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { ConfigProvider, Spin } from 'antd';
import store, { rrfProps } from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import { wagmiConfig, chains } from './utility/rainbow';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import 'antd/dist/antd.less';


const polybase = new Polybase({defaultNamespace:  "pk/0x6291a71f6e1a57cb1fa136ae1c298e017df3ae67efb6bbab7cb59316fdf9a1a09d1fa8f6075825f982ba80b3653bf330cdfb147ab3ed56bdc8bdb4eb27de4955/PubGoods"});

const { theme } = config;

const ProviderConfig = () => {
  const { rtl, isLoggedIn, topMenu, darkMode, auth } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
      auth: state.fb.auth,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <PolybaseProvider polybase={polybase}>
        <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
          <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
            <ReactReduxFirebaseProvider {...rrfProps}>
              {!isLoaded(auth) ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <Router basename={process.env.PUBLIC_URL}>
                  {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
                  {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
                    <Redirect to="/admin" />
                  )}
                </Router>
              )}
            </ReactReduxFirebaseProvider>
          </ThemeProvider>
        </ConfigProvider>
        </PolybaseProvider>
      </RainbowKitProvider>
    </WagmiConfig>

  );
}

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
