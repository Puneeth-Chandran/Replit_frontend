import React, { useState, useEffect } from 'react';

const ScrollUpBtn = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {showScroll && (
        <button
          className={`scroll-to-top ${showScroll ? 'show' : ''}`}
          onClick={scrollToTop}
        >
          <i className='arr bi bi-arrow-up'></i>
        </button>
      )}
    </div>
  );
};

export default ScrollUpBtn;
