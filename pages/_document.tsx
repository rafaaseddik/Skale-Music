// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
      <Html>
          <Head>
              <link rel="manifest" href="/manifest.json" />
              <link rel="icon" href="/favicon.ico" />
              <meta name="theme-color" content="#7C3AED" />
          </Head>
          <body>
          <Main />
          <NextScript />
          </body>
      </Html>
    );
}
