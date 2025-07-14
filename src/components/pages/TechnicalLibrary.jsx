import React, {useEffect} from 'react';
import Datasheets from './Datasheets';
import { useSearchParams } from 'react-router-dom';
import VideoFAQ from './VideoFAQ';
import KnowHow from './KnowHow';

const TechnicalLibrary = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'datasheets';

  const handleTabClick = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <>
        <div className="page-header page-header-big text-center" style={{backgroundImage: "url(assets/images/banners/belcab/banners/technical2.png)"}}>
                        <h1 className="page-title text-white">Technical Library</h1>
                    </div>

                <div className="page-content pb-0">
                    

                    <hr className="mb-5"/>
                    
                    <div className="col-md-12 container">
                        <ul className="nav nav-tabs nav-tabs-bg justify-content-center" id="tabs-3" role="tablist">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'datasheets' ? 'active' : ''} fs-3`} onClick={() => handleTabClick('datasheets')} id="datasheets-tab" data-toggle="tab" href="#datasheets" role="tab" aria-controls="datasheets" aria-selected="true"><i className="bi bi-file-earmark-text"></i>&nbsp; Data Sheets</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'faq-videos' ? 'active' : ''} fs-3`} onClick={() => handleTabClick('faq-videos')} id="faq-videos-tab" data-toggle="tab" href="#faq-videos" role="tab" aria-controls="faq-videos" aria-selected="false"><i className="bi bi-play-circle"></i>&nbsp; FAQ Videos</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'cable-know-how' ? 'active' : ''} fs-3`} onClick={() => handleTabClick('cable-know-how')} id="cable-know-how-tab" data-toggle="tab" href="#cable-know-how" role="tab" aria-controls="cable-know-how" aria-selected="false"><i className="bi bi-question-circle"></i>&nbsp; Cable Know-How</a>
                            </li>
                        </ul>
                        <div className="tab-content tab-content-border" id="tab-content-3">
                            <div className={`tab-pane fade ${activeTab === 'datasheets' ? 'show active' : ''}`} id="datasheets" role="tabpanel" aria-labelledby="datasheets-tab">
                                <Datasheets/>
                            </div>
                            <div className={`tab-pane fade ${activeTab === 'faq-videos' ? 'show active' : ''}`} id="faq-videos" role="tabpanel" aria-labelledby="faq-videos-tab">
                                <VideoFAQ/>
                            </div>
                            <div className={`tab-pane fade ${activeTab === 'cable-know-how' ? 'show active' : ''}`} id="cable-know-how" role="tabpanel" aria-labelledby="cable-know-how-tab">
                                <KnowHow/>
                            </div>
                        </div>
                    </div>
                    

                    <div className="mb-2"></div>
                </div>
                {/* <!-- End .page-content --> */}
    </>
  )
}

export default TechnicalLibrary;