import { useEffect, useState } from 'react';
import 'style/base.scss';
import Head from 'next/head';
import Close from 'components/assets/close';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'style/nprogress.scss';

interface Props {
  Component: any;
  pageProps: any;
}

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const [cookiesConsent, setCookiesConsent] = useState<string | null>(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setCookiesConsent(localStorage.getItem('cookiesConsent'));
  }, []);
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2ZD3ZDVEZD"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments)}
        gtag("js", new Date());
        gtag("config", "G-2ZD3ZDVEZD");
    `,
          }}
        ></script>
      </Head>
      <Component {...pageProps} />
      {!cookiesConsent && !hide && (
        <div className="cookies">
          We use cookies.
          <a
            className="cookiesLink"
            href="https://intercom.help/ternoa/fr/collections/2774679-legal"
          >
            Learn more
          </a>
          <Close
            className="cross"
            onClick={() => {
              localStorage.setItem('cookiesConsent', 'true');
              setHide(true);
            }}
          />
        </div>
      )}
    </>
  );
};

export default App;
