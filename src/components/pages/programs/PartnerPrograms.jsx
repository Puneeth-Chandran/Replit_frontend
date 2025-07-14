import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BecomeDistributor from './BecomeDistributor';


const PartnerPrograms = () => {

    const [searchParams, setSearchParams] = useSearchParams();
      const activeTab = searchParams.get('tab') || 'certification-program';
    
      const handleTabClick = (tabId) => {
        setSearchParams({ tab: tabId });
      };

  return (
    <>

   
        <div className="page-header page-header-big text-center" style={{backgroundImage: "url(assets/images/banners/belcab/banners/certificate3.png)"}}>
                        <h1 className="page-title text-white">PARTNER PROGRAM<span className="text-white">PARTNER WITH US. POWER THE FUTURE.</span></h1>
                    </div>

                    <div className="container fw-normal">
                    <div className="my-5">
                        <h2 className="text-center title">Belcab Certified Partner Program</h2>
                        <p className='fs-4'>To maintain the highest standards in cabling system performance, Belcab partners only with certified professionals who are trained to deliver reliable, future-ready installations. Our Belcab Certified Partner Program is designed to equip system integrators with practical knowledge of structured cabling systems, installation techniques, and the latest industry standards.<br/></p>

{/* <br/>To achieve Belcab Certified Partner status:</p>
                            <ul className='fs-4'>
                                <li>
                                    <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;A minimum of two engineers from the organization must complete our one-day technical training session.</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;Individual participants who pass the training receive a Belcab Certified Installer Certificate.</p>
                                </li>
                            </ul> */}
                            
                            <h2 className="title-sm mt-3 text-dark">Certified Partners Receive:</h2>
                            <ul className='fs-4'>
                                <li>
                                    <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;Authority to test and certify their own Belcab cabling installations</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;Access to apply for the 25-Year System Performance Warranty</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;An official Certificate of Recognition for both company and installer</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;Ongoing technical support from Belcab</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;A reputation boost through verified professional credibility</p>
                                </li>
                            </ul>

                            <p className='fs-4'>By becoming a Belcab Certified Partner, your organization demonstrates its commitment to quality, professionalism, and long-term client satisfaction.</p>
                    </div>

                    <div className="tabs-vertical py-4">
                    <div className="parter-programs-tabs">
                        <ul className="nav nav-tabs flex-column" id="tabs-8" role="tablist"  style={{borderStyle: "none", backgroundColor: "#e5eaf3"}}>
                            <li className="nav-item py-2">
                                <a className={`nav-link fs-3 ${activeTab === 'certification-program' ? 'active' : ''}`} onClick={() => handleTabClick('certification-program')} id="tab-certification-program" data-toggle="tab" href="#certification-program" role="tab" aria-controls="certification-program" aria-selected="true">Certification Program </a>
                            </li>
                            <li className="nav-item py-2">
                                <a className={`nav-link fs-3 ${activeTab === 'product-warranty' ? 'active' : ''}`} onClick={() => handleTabClick('product-warranty')} id="tab-product-warranty" data-toggle="tab" href="#product-warranty" role="tab" aria-controls="product-warranty" aria-selected="false">Product Warranty </a>
                            </li>
                            <li className="nav-item py-2">
                                <a className={`nav-link fs-3 ${activeTab === 'performance-warranty' ? 'active' : ''}`} onClick={() => handleTabClick('performance-warranty')} id="tab-performance-warranty" data-toggle="tab" href="#performance-warranty" role="tab" aria-controls="performance-warranty" aria-selected="false">Performance Warranty </a>
                            </li>
                            <li className="nav-item py-2">
                                <a className={`nav-link fs-3 ${activeTab === 'become-distributor' ? 'active' : ''}`} onClick={() => handleTabClick('become-distributor')} id="tab-become-distributor" data-toggle="tab" href="#become-distributor" role="tab" aria-controls="become-distributor" aria-selected="false">Become a Distributor </a>
                            </li>
                        </ul>
                        </div>
                        <div className="tab-content tab-content-border" id="tab-content-8" style={{borderStyle: "none"}}>
                        <div className={`tab-pane fade show ${activeTab === 'certification-program' ? 'active' : ''}`} id="certification-program" role="tabpanel" aria-labelledby="tab-certification-program">
    <div className="heading heading-flex">
        <div className="heading-left">
            <h2 className="title-sm">Certification Program</h2>
        </div>

        <div className="heading-right">
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="engineer-tab" data-toggle="tab" href="#engineer-content" role="tab" aria-controls="engineer-content" aria-selected="true">FOR DESIGN ENGINEERS</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="integrator-tab" data-toggle="tab" href="#integrator-content" role="tab" aria-controls="integrator-content" aria-selected="false">FOR SYSTEM INTEGRATOR</a>
                </li>
            </ul>
        </div>
    </div>

    <div className="tab-content mt-3">
        <div className="tab-pane fade show active" id="engineer-content" role="tabpanel" aria-labelledby="engineer-tab">
        <h2 className="title-sm fw-normal fs-3">Empowering Integrators Through Training & Technical Excellence</h2>
                    <p className='fs-4'>At Belcab, we prioritize quality at every level — from product design to system installation. To ensure this standard is upheld, we require that all companies installing Belcab solutions are thoroughly trained and backed by strong technical support.</p>

<p className='fs-4 mt-1'>System integrators aiming to become Belcab Certified Partners must complete specialized training that equips them with the latest knowledge of industry best practices, cabling standards, and emerging technologies. Achieving this certification demonstrates a high level of expertise and instills confidence in clients and project stakeholders.</p>
<p className='fs-4 mt-1 mb-0 fw-normal text-dark'>To qualify:</p>
<ul className='fs-4'>
                                <li>
                                    <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>Each organization must have at least two engineers successfully complete our one-day technical training session</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>Certified individuals are awarded the Belcab Certified Engineer (BCE) certificate</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>The company is officially recognized as a Belcab Certified Partner</p>
                                </li>
                            </ul>
                            <p className='fs-4 mt-1'>Through this program, Belcab ensures that every installation meets professional-grade standards — combining expert execution with long-term system reliability.</p>
        </div>
        <div className="tab-pane fade" id="integrator-content" role="tabpanel" aria-labelledby="integrator-tab">
        <h2 className="title-sm fw-normal fs-3">Ensuring Installation Excellence Through Training & Verification</h2>
                    <p className='fs-4'>At Belcab, quality installation is just as important as the product itself. That’s why we work exclusively with installation partners who are trained to meet the highest industry standards and follow best-in-className practices.</p>

<p className='fs-4 mt-1'>To become a Belcab Certified Partner, system integrators must demonstrate a thorough understanding of installation procedures, cabling standards, and emerging trends in network infrastructure.</p>
<p className='fs-4 mt-1 fw-normal mb-0 text-dark'>Certification Requirements:</p>
<ul className='fs-4'>
                                <li>
                                    <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>A minimum of two engineers from the organization must complete our one-day technical training</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>Upon successful completion, individuals receive the Belcab Certified Installer (BCI) certificate</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>The company is officially recognized as a Belcab Certified Partner</p>
                                </li>
                            </ul>

                            <p className='fs-4 mt-1 fw-normal mb-0 text-dark'>Certified Partner Benefits:</p>
<ul className='fs-4'>
                                <li>
                                    <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>Authority to test and certify their own Belcab cabling installations</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>Eligibility to apply for the 25-Year Belcab System Performance Warranty</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>Enhanced credibility through official certification and approval</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>Access to ongoing technical support for all Belcab products</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6 pr-3' style={{color:"#00286c"}}></i>A Belcab Certified Partner certificate for display and recognition</p>
                                </li>
                            </ul>
                            <p className='fs-4 mt-1'>This program ensures that Belcab installations are not only technically sound but also backed by professionals who understand the importance of precision and performance in every project.</p>
        </div>
    </div>
</div>
                            <div className={`tab-pane fade show ${activeTab === 'product-warranty' ? 'active' : ''}`} id="product-warranty" role="tabpanel" aria-labelledby="tab-product-warranty">
                            <h2 className="title-sm">Product Confidence Backed by Long-Term Warranty</h2>
                    <p className='fs-4'>At our company, we stand behind the quality and reliability of every product we offer. All our networking and cabling solutions are backed by a standard 2-year warranty, covering manufacturing defects and ensuring peace of mind from the moment of purchase.</p>

<p className='fs-4 mt-1'>For clients seeking long-term performance assurance, we offer an extended 25-Year System Performance Warranty. This premium warranty is available upon successful installation and testing by our Certified Installation Partners. To qualify, installations must meet our system design guidelines and be verified through comprehensive post-installation testing. </p>

<p className='fs-4 mt-1'>All systems are tested in the field using advanced certification tools operated by our Authorized Certification Experts. This ensures your network infrastructure is installed to perform efficiently, delivering consistent speed, reliability, and compliance with industry standards.</p>

<p className='fs-4 mt-1'>Our commitment doesn’t end at installation — we guarantee your system will continue to perform at optimal levels for years to come.</p>


                            </div>
                            <div className={`tab-pane fade show ${activeTab === 'performance-warranty' ? 'active' : ''}`} id="performance-warranty" role="tabpanel" aria-labelledby="tab-performance-warranty">
                            <h2 className="title-sm">Guaranteed Performance for the Long Run</h2>
                            <p className='fs-4'>Belcab is committed to delivering long-term reliability and performance in every cabling solution. That’s why we offer a 25-Year System Performance Warranty — a mark of trust that your network infrastructure is built to perform today, tomorrow, and well into the future.</p>

                            <p className='fs-4 mt-1'>This extended warranty guarantees that Belcab cabling systems, when properly installed and tested, will meet or exceed performance expectations for a full 25 years.</p>

                            <p className='fs-4 mt-1'>To ensure system integrity, the 25-Year Warranty is available exclusively for projects installed and tested by Belcab Certified Partners.</p>

                            <ul className='fs-4'>
                                <li>
                                    <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;A minimum of two certified engineers from the installation company must complete our Belcab technical training course</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;Testing must be conducted using approved hand-held field certification tools</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;Individual engineers receive the Belcab Certified Installer Certificate, and the company is recognized as a Certified Partner</p>
                                </li>

                                <p className='fs-4 mt-1'>The 25-Year System Performance Warranty ensures reliable network performance, covers end-to-end system compliance and functionality, and is applicable only to installations verified through certified testing procedures.</p>
                            </ul>
                            </div>
                            <div className={`tab-pane fade show ${activeTab === 'become-distributor' ? 'active' : ''}`} id="become-distributor" role="tabpanel" aria-labelledby="tab-become-distributor">
                            <h2 className="title-sm">Become a Distributor</h2>
                            <BecomeDistributor/>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default PartnerPrograms;