import React from 'react';
import FlipBook from './FlipBook';

const Catalog = () => {
  return (
    <div className="container mx-auto py-10 mb-5">
      <div className="text-center mt-3">
                        <h2 className="title fw-normal">Belcab Catalogue</h2>
                    </div>
      <FlipBook pdfUrl="/assets/images/banners/belcab/catalog/Belcab-catalogue1.pdf" />
    </div>
  )
}

export default Catalog