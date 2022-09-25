/* eslint-disable object-curly-newline */
import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default () => {
  return (
    <Html>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <script
          src="https://unpkg.com/react/umd/react.production.min.js"
          crossOrigin="true"
        />
        <NextScript />
      </body>
    </Html>
  );
};
