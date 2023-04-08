import { Head, Html, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => {
  return (
    <Html lang='en'>
      <Head>
        <title>Amazon 2.0 - Your Online Shopping Destination</title>
        <meta
          name='description'
          content='Shop the latest products at Amazon 2.0 and enjoy a seamless online shopping experience. Find great deals on electronics, fashion, home & kitchen, and more.'
        />
        <meta
          name='keywords'
          content='Amazon, Amazon 2.0, online shopping, deals, electronics, fashion, home & kitchen'
        />
        <meta name='author' content='Davi Mateus G.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='canonical' href='https://amazon-2-0-davimateusg.vercel.app/' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
