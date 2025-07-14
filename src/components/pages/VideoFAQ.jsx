import React, {useState} from 'react';
import { useGetUserVideosQuery } from '../../redux/api/videoApi';

const VideoFAQ = () => {

    const {data, error, isLoading} = useGetUserVideosQuery();
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    const getYouTubeVideoId = (url) => {
      const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
  
    const handleThumbnailClick = (url) => {
      const videoId = getYouTubeVideoId(url);
      setSelectedVideoId(videoId);
    };
  
    const closeModal = () => {
      setSelectedVideoId(null);
    };

  return (
    <>
    <div className="portfolio-container row">

                    {data?.videos?.map((video, index) => {
          const videoId = getYouTubeVideoId(video?.url);
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

                    return (
                        <div className="portfolio-item accessories col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch" key={video?.index}>
                            <div className="portfolio p-3 m-3 w-100 " style={{border: "1px solid #e5e5e5", borderRadius: "15px"}}>
                            <h3 className="portfolio-title mb-2 fs-3 fw-normal">{video?.title}</h3>
                        		<figure
                              className="portfolio-media portfolio-video"
                              onClick={() => handleThumbnailClick(video?.url)}
                              style={{ borderRadius: "15px", cursor: 'pointer', position: 'relative' }}
                            >
                              <div className="video-thumb-wrapper">
                                <img src={thumbnailUrl} alt={video?.title} style={{borderRadius: "10px"}}/>
                              </div>
                            </figure>
                        		<div className="portfolio-content mt-auto" >
                        			<div className="portfolio-tags fs-4 fw-normal">
                        				{video?.description}
                        			</div>
                        		</div>
                            </div>
                    	</div>
                    );
                    })}
                    </div>

{selectedVideoId && (
  <div className="video-modal-overlay" onClick={closeModal}>
    <div className="video-modal" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn mb-3" onClick={closeModal}>×</button>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}
</>
  )
}

export default VideoFAQ;