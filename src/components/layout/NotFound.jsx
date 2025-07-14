import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    <section className="p-0">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="error-section">
                        <h1>404</h1>
                        <h2>PAGE NOT FOUND</h2>
                        <div className="col-6 col-lg-4 col-xl-2 to-home mt-6">
                            <Link to="/" className='home-button'> BACK TO HOME</Link>
		                </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default NotFound;