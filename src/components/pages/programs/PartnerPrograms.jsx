import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BecomeDistributor from './BecomeDistributor';
import styles from './PartnerProgram.module.css';


const PartnerPrograms = () => {

    const [searchParams, setSearchParams] = useSearchParams();
      const activeTab = searchParams.get('tab') || 'certification-program';
    
      const handleTabClick = (tabId) => {
        setSearchParams({ tab: tabId });
      };

  return (
    <>
<div className='container'>
<div className="partner-program">
    <div className="mx-auto sm:px-6 lg:px-8 py-12">
            
            {/* <!-- Introduction Section --> */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-belcab-dark mb-6">Belcab Certified Partner Program</h2>
                <p className="text-lg text-belcab-gray max-w-4xl mx-auto leading-relaxed">
                    To maintain the highest standards in cabling system performance, Belcab partners only with certified professionals who are trained to deliver reliable, future-ready installations. Our Belcab Certified Partner Program is designed to equip system integrators with practical knowledge of structured cabling systems, installation techniques, and the latest industry standards.
                </p>
            </div>

            {/* <!-- Benefits Section --> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-white shadow-lg border-t-4 border-belcab-blue hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="text-belcab-blue text-3xl mb-4">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-belcab-dark">Authority to Test & Certify</h3>
                        <p className="text-belcab-gray">Test and certify your own Belcab cabling installations with official authority</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg border-t-4 border-belcab-blue hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="text-belcab-blue text-3xl mb-4">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-belcab-dark">25-Year Warranty Access</h3>
                        <p className="text-belcab-gray">Access to apply for the 25-Year System Performance Warranty</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg border-t-4 border-belcab-blue hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="text-belcab-blue text-3xl mb-4">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-belcab-dark">Official Recognition</h3>
                        <p className="text-belcab-gray">Certificate of Recognition for both company and installer</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg border-t-4 border-belcab-blue hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="text-belcab-blue text-3xl mb-4">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-belcab-dark">Technical Support</h3>
                        <p className="text-belcab-gray">Ongoing technical support from Belcab experts</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg border-t-4 border-belcab-blue hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="text-belcab-blue text-3xl mb-4">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-belcab-dark">Reputation Boost</h3>
                        <p className="text-belcab-gray">Enhanced credibility through verified professional credentials</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg border-t-4 border-belcab-blue hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="text-belcab-blue text-3xl mb-4">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-belcab-dark">Professional Network</h3>
                        <p className="text-belcab-gray">Join a network of certified professionals and industry leaders</p>
                    </div>
                </div>
            </div>

            {/* <!-- Tabbed Interface --> */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="tab-list">
                    <button className="tab-trigger active" onclick="showTab('certification')">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span className="hidden sm:inline">Certification Program</span>
                        <span className="sm:hidden">Certification</span>
                    </button>
                    <button className="tab-trigger" onclick="showTab('product-warranty')">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="hidden sm:inline">Product Warranty</span>
                        <span className="sm:hidden">Product</span>
                    </button>
                    <button className="tab-trigger" onclick="showTab('performance-warranty')">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="hidden sm:inline">Performance Warranty</span>
                        <span className="sm:hidden">Performance</span>
                    </button>
                    <button className="tab-trigger" onclick="showTab('distributor')">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-3m3 3l3-3" />
                        </svg>
                        <span className="hidden sm:inline">Become a Distributor</span>
                        <span className="sm:hidden">Distributor</span>
                    </button>
                </div>

                <div className="p-8">
                    {/* <!-- Certification Program Tab --> */}
                    <div id="certification" className="tab-content active">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-belcab-dark mb-4">Certification Program</h3>
                            <p className="text-belcab-gray text-lg mb-6">Empowering professionals through comprehensive training and technical excellence</p>
                            
                            {/* <!-- Sub-tabs for Certification --> */}
                            <div className="sub-tab-nav">
                                <button className="sub-tab-button active" onclick="showSubTab('engineer')">
                                    FOR DESIGN ENGINEERS
                                </button>
                                <button className="sub-tab-button" onclick="showSubTab('integrator')">
                                    FOR SYSTEM INTEGRATORS
                                </button>
                            </div>
                            
                            {/* <!-- Engineer Content --> */}
                            <div id="engineer" className="sub-tab-content active">
                                <div className="bg-belcab-light border-0 mb-6 rounded-lg">
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold mb-4 text-belcab-dark">Empowering Integrators Through Training & Technical Excellence</h4>
                                        <p className="text-belcab-gray mb-4">At Belcab, we prioritize quality at every level — from product design to system installation. To ensure this standard is upheld, we require that all companies installing Belcab solutions are thoroughly trained and backed by strong technical support.</p>
                                        <p className="text-belcab-gray">System integrators aiming to become Belcab Certified Partners must complete specialized training that equips them with the latest knowledge of industry best practices, cabling standards, and emerging technologies.</p>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="border border-gray-200 rounded-lg">
                                        <div className="p-6">
                                            <h5 className="text-lg font-semibold mb-3 text-belcab-dark flex items-center gap-2">
                                                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Qualification Requirements
                                            </h5>
                                            <ul className="space-y-2 text-belcab-gray">
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Each organization must have at least two engineers successfully complete our one-day technical training session
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Certified individuals are awarded the Belcab Certified Engineer (BCE) certificate
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    The company is officially recognized as a Belcab Certified Partner
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="border border-gray-200 rounded-lg">
                                        <div className="p-6">
                                            <h5 className="text-lg font-semibold mb-3 text-belcab-dark flex items-center gap-2">
                                                <svg className="h-5 w-5 text-belcab-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                                Training Benefits
                                            </h5>
                                            <ul className="space-y-2 text-belcab-gray">
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    Latest industry best practices
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    Comprehensive cabling standards
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    Emerging technology insights
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                    <p className="text-belcab-gray mb-4">Through this program, Belcab ensures that every installation meets professional-grade standards — combining expert execution with long-term system reliability.</p>
                                    <button className="btn btn-primary">
                                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                        Apply for Engineer Certification
                                    </button>
                                </div>
                            </div>
                            
                            {/* <!-- Integrator Content --> */}
                            <div id="integrator" className="sub-tab-content">
                                <div className="bg-belcab-light border-0 mb-6 rounded-lg">
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold mb-4 text-belcab-dark">Ensuring Installation Excellence Through Training & Verification</h4>
                                        <p className="text-belcab-gray mb-4">At Belcab, quality installation is just as important as the product itself. That's why we work exclusively with installation partners who are trained to meet the highest industry standards and follow best-in-className practices.</p>
                                        <p className="text-belcab-gray">To become a Belcab Certified Partner, system integrators must demonstrate a thorough understanding of installation procedures, cabling standards, and emerging trends in network infrastructure.</p>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="border border-gray-200 rounded-lg">
                                        <div className="p-6">
                                            <h5 className="text-lg font-semibold mb-3 text-belcab-dark flex items-center gap-2">
                                                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                Certification Requirements
                                            </h5>
                                            <ul className="space-y-2 text-belcab-gray">
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    A minimum of two engineers from the organization must complete our one-day technical training
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Upon successful completion, individuals receive the Belcab Certified Installer (BCI) certificate
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    The company is officially recognized as a Belcab Certified Partner
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="border border-gray-200 rounded-lg">
                                        <div className="p-6">
                                            <h5 className="text-lg font-semibold mb-3 text-belcab-dark flex items-center gap-2">
                                                <svg className="h-5 w-5 text-belcab-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                                Certified Partner Benefits
                                            </h5>
                                            <ul className="space-y-2 text-belcab-gray">
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    Authority to test and certify their own Belcab cabling installations
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    Eligibility to apply for the 25-Year Belcab System Performance Warranty
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    Enhanced credibility through official certification and approval
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    Access to ongoing technical support for all Belcab products
                                                </li>
                                                <li className="flex items-start">
                                                    <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    A Belcab Certified Partner certificate for display and recognition
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                    <p className="text-belcab-gray mb-4">This program ensures that Belcab installations are not only technically sound but also backed by professionals who understand the importance of precision and performance in every project.</p>
                                    <button className="btn btn-primary">
                                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Apply for Integrator Certification
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product Warranty Tab --> */}
                    <div id="product-warranty" className="tab-content">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-belcab-dark mb-4">Product Confidence Backed by Long-Term Warranty</h3>
                            <p className="text-belcab-gray text-lg">At Belcab, we stand behind the quality and reliability of every product we offer</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 rounded-lg">
                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <div className="text-4xl font-bold text-belcab-blue mb-2">2</div>
                                        <div className="text-sm text-belcab-gray uppercase tracking-wide">Years</div>
                                    </div>
                                    <h4 className="text-xl font-semibold mb-4 text-belcab-dark">Standard Warranty</h4>
                                    <p className="text-belcab-gray mb-4">All networking and cabling solutions are backed by a standard 2-year warranty covering manufacturing defects.</p>
                                    <ul className="space-y-2 text-belcab-gray">
                                        <li className="flex items-start">
                                            <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Manufacturing defects coverage
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Peace of mind from purchase
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Quality assurance guarantee
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-green-100 border-0 rounded-lg">
                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <div className="text-4xl font-bold text-green-600 mb-2">25</div>
                                        <div className="text-sm text-belcab-gray uppercase tracking-wide">Years</div>
                                    </div>
                                    <h4 className="text-xl font-semibold mb-4 text-belcab-dark">Extended System Warranty</h4>
                                    <p className="text-belcab-gray mb-4">Premium warranty available upon successful installation by Certified Partners.</p>
                                    <ul className="space-y-2 text-belcab-gray">
                                        <li className="flex items-start">
                                            <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Comprehensive system coverage
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Field testing verification
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Long-term performance assurance
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-belcab-light border-0 mt-8 rounded-lg">
                            <div className="p-6">
                                <h4 className="text-lg font-semibold mb-3 text-belcab-dark">Warranty Requirements</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-medium mb-2 text-belcab-dark">Installation Standards</h5>
                                        <ul className="space-y-1 text-belcab-gray text-sm">
                                            <li>• Installation by Certified Partners only</li>
                                            <li>• Compliance with system design guidelines</li>
                                            <li>• Comprehensive post-installation testing</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-medium mb-2 text-belcab-dark">Testing Requirements</h5>
                                        <ul className="space-y-1 text-belcab-gray text-sm">
                                            <li>• Advanced certification tools</li>
                                            <li>• Authorized Certification Experts</li>
                                            <li>• Field verification procedures</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Performance Warranty Tab --> */}
                    <div id="performance-warranty" className="tab-content">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-belcab-dark mb-4">Guaranteed Performance for the Long Run</h3>
                            <p className="text-belcab-gray text-lg">25-Year System Performance Warranty — your network infrastructure built to perform today, tomorrow, and well into the future</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-belcab-blue to-blue-600 text-white rounded-lg p-8 mb-8">
                            <div className="text-center">
                                <div className="text-6xl font-bold mb-2">25</div>
                                <div className="text-xl uppercase tracking-wide">Year Performance Guarantee</div>
                            </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-belcab-dark mb-2">System Integrity</h4>
                                <p className="text-belcab-gray text-sm">Guaranteed network performance when properly installed and tested</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-belcab-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-belcab-dark mb-2">Compliance Coverage</h4>
                                <p className="text-belcab-gray text-sm">End-to-end system compliance and functionality assurance</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-belcab-dark mb-2">Certified Testing</h4>
                                <p className="text-belcab-gray text-sm">Applicable only to verified installations through certified procedures</p>
                            </div>
                        </div>
                        
                        <div className="bg-belcab-light border-0 mb-6 rounded-lg">
                            <div className="p-6">
                                <h4 className="text-lg font-semibold mb-4 text-belcab-dark">Warranty Eligibility Requirements</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-medium mb-3 text-belcab-dark">Certification Requirements</h5>
                                        <ul className="space-y-2 text-belcab-gray">
                                            <li className="flex items-start">
                                                <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                </svg>
                                                Minimum two certified engineers from installation company
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                Completion of Belcab technical training course
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                                Belcab Certified Installer Certificate
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-medium mb-3 text-belcab-dark">Testing Requirements</h5>
                                        <ul className="space-y-2 text-belcab-gray">
                                            <li className="flex items-start">
                                                <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Testing with approved hand-held field certification tools
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Verification by authorized certification experts
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="h-4 w-4 text-belcab-blue mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                Company recognized as Certified Partner
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Distributor Tab --> */}
                    <div id="distributor" className="tab-content">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-belcab-dark mb-4">Become a Distributor</h3>
                            <p className="text-belcab-gray text-lg">Join our network of distributors and grow your business with Belcab's premium cable solutions</p>
                        </div>
                        
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="page-header page-header-big text-center" style={{backgroundImage: "url(assets/images/banners/belcab/banners/certificate3.png)"}}>
                        <h1 className="page-title text-white">PARTNER PROGRAM<span className="text-white">PARTNER WITH US. POWER THE FUTURE.</span></h1>
                    </div>

                    <div className="container fw-normal">
                    <div className="my-5">
                        <h2 className="text-center title">Belcab Certified Partner Program</h2>
                        <p className='fs-4'>To maintain the highest standards in cabling system performance, Belcab partners only with certified professionals who are trained to deliver reliable, future-ready installations. Our Belcab Certified Partner Program is designed to equip system integrators with practical knowledge of structured cabling systems, installation techniques, and the latest industry standards.<br/></p> */}

{/* <br/>To achieve Belcab Certified Partner status:</p>
                            <ul className='fs-4'>
                                <li>
                                    <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;A minimum of two engineers from the organization must complete our one-day technical training session.</p>
                                </li>
                                <li>
                                <p><i className='bi bi-circle-fill fs-6' style={{color:"#00286c"}}></i> &nbsp;Individual participants who pass the training receive a Belcab Certified Installer Certificate.</p>
                                </li>
                            </ul> */}
                            
                            {/* <h2 className="title-sm mt-3 text-dark">Certified Partners Receive:</h2>
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
                </div> */}
                </div>
                </div>
    </>
  )
}

export default PartnerPrograms;