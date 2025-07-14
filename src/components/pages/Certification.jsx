
import React, { useRef, useState } from 'react'
import { useGetUserCertificateQuery } from '../../redux/api/certificateApi';
import Loader from '../layout/Loader';
import PdfImagePreview from '../layout/PdfImagePreview';

const Certification = () => {

    const { data, isLoading, error } = useGetUserCertificateQuery();
    const sectionRefs = useRef({});

    const [activeCertId, setActiveCertId] = useState(null);

    if (isLoading) return <Loader />

    if (!data?.certificates?.length) return <p className="text-center">No certificates found.</p>;

    const scrollToCertificate = (id) => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <div className="page-header page-header-big text-center mb-3" style={{ backgroundImage: "url(assets/images/banners/belcab/banners/certificate3.png)" }}>
                <h1 className="page-title text-white">CERTIFICATIONS</h1>
            </div>

            <div className="page-content pb-0">
                <div className="container">
                    <div className="row">
                        <div className="text-center mt-1">
                            <h2 className="title">At Belcab, our commitment to excellence extends far beyond manufacturing.</h2>
                            <p className='fs-3'>As a leading UK-based cable manufacturer, we take pride in delivering high-performance, reliable, and safe cabling solutions that meet and exceed global standards. Every cable we produce is the result of stringent quality controls, advanced engineering, and a deep understanding of industry demands.
                                To validate our dedication to quality, safety, environmental responsibility, and technological advancement, our products carry globally recognized certifications. These certifications are a testament to Belcab’s uncompromising standards and our promise to provide only the best to our customers across various sectors and regions.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="mb-2" />
                {/* <!-- End .title text-center --> */}
                <div className="certification-container">
                    <div className="cert-left-sidebar">
                        <ul className="cert-title-list">
                            {data.certificates.map((certificate, index) => (
                                <li
                                    key={index}
                                    className={`cert-title-item ${activeCertId === (certificate._id || certificate.title) ? 'active' : ''}`}
                                    onClick={() => {
                                        scrollToCertificate(certificate._id || certificate.name);
                                        setActiveCertId(certificate._id || certificate.title);
                                        }}
                                        >
                                    {certificate.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="cert-right-content">
                        <div className="row justify-content-center">
                            {data.certificates.map((certificate) => {
                                const certId = certificate._id || certificate.name;
                                return (
                                    <div className="col-sm-12 col-md-12 d-flex" style={{ scrollMarginTop: "100px" }} key={certificate?._id} ref={(el) => (sectionRefs.current[certId] = el)}>
                                        <div className="entry entry-list entry-design h-80 w-100 p-4 d-flex flex-row">


                                            <div className="row align-items-center px-3">
                                                <div className="col-md-3">
                                                    <figure className="entry-media mb-3">
                                                        <img src={certificate?.certificateImage} alt="image desc" />
                                                    </figure>
                                                    
                                                    {(certificate?.url?.trim() || certificate?.certificateFile?.trim()) && (
                                                        <a
                                                            className="verify-button text-white"
                                                            href={certificate?.url || certificate?.certificateFile}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Verify Certificate
                                                            <div className="verify-icon">
                                                                <i className="bi bi-arrow-right"></i>
                                                            </div>
                                                        </a>
                                                    )}
                                                </div>

                                                <div className="col-md-9 entry-design-inner">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <div className="entry-body d-flex flex-column py-2">
                                                                <h2 className="entry-title fw-medium mt-2">
                                                                    {certificate?.title}
                                                                </h2>
                                                                <div className="entry-content">
                                                                    <p className="fs-3 mt-1 text-dark">
                                                                        {certificate?.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 d-flex align-items-center justify-content-center display-certificate">
                                                        {certificate?.certificateFile ? (
                                                                <PdfImagePreview pdfUrl={certificate?.certificateFile} />
                                                            ) : (
                                                                <div
                                                                className="unavailable-certificate d-flex align-items-center justify-content-center text-center"
                                                                >
      Certification under process
    </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Certification;