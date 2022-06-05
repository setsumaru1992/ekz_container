import React from 'react';
import { withApollo } from '../lib/apollo';

const IndexPage = () => (
  <div>
      aa
  </div>
)

export default withApollo({ ssr: true })(IndexPage)
