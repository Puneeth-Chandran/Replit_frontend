import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Metadata = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${title} - Belcab`}</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default Metadata;
