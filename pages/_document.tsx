// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
      <Html>
          <Head>
              <link rel="icon" href="/favicon.ico" />
              <title>Skale - Your music toolbox</title>
          </Head>
          <body>
          <Main />
          <NextScript />
          </body>
      </Html>
    );
}
