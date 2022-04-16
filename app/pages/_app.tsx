import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import TweetProvider from '../context/useTweet';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TweetProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </TweetProvider>
  );
}

export default MyApp;
