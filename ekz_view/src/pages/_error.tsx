import React from 'react';
import type { NextApiResponse } from 'next';

const Error = ({ statusCode }: { statusCode: any }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: { res: NextApiResponse; err: any }) => {
  const errorStatusCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errorStatusCode;
  return { statusCode };
};

export default Error;
