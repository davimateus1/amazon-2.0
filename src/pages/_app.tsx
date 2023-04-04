import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../app/store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
