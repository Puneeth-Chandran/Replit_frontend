import React, { useEffect, useRef } from 'react'
import { useGetCategoryQuery } from '../../redux/api/categoryApi'
import { Link } from 'react-router-dom';

const CategorySection = () => {

    const sliderRef = useRef();

    const {data, error, isLoading} = useGetCategoryQuery("");

    const categoryList = data?.categoryList || [];
    const total = categoryList.length;

   useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

   // Scroll reset logic
   useEffect(() => {
    const slider = sliderRef.current;
    const item = slider?.querySelector(".category-item");
    if (!slider || !item) return;
  
    const itemWidth = item.offsetWidth;
    const cloneCount = 5;
  
    // Set initial position (skip cloned start)
    slider.scrollLeft = itemWidth * cloneCount;
  
    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const maxScroll = itemWidth * (cloneCount + categoryList.length);
  
      // Reached the end of real content? Reset to start of real content
      if (scrollLeft >= maxScroll) {
        slider.scrollTo({ left: itemWidth * cloneCount, behavior: "auto" });
      }
      
      if (scrollLeft <= 0) {
        slider.scrollTo({ left: itemWidth * categoryList.length, behavior: "auto" });
      }
    };
  
    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [categoryList]);

  useEffect(() => {
    const slider = sliderRef.current;
    const item = slider?.querySelector(".category-item");
    if (slider && item) {
      const itemWidth = item.offsetWidth;
      slider.scrollLeft = itemWidth * 5; // start at real data
    }
  }, [categoryList]);

   // Scroll buttons
   const scroll = (direction) => {
    const amount = direction === "left" ? -200 : 200;
    sliderRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Clone items for looping effect
  const extendedList = [
    ...categoryList.slice(-5), // Clone last 5 at beginning
    ...categoryList,
    ...categoryList.slice(0, 5), // Clone first 5 at end
  ];

  return (

    <div className="category-slider-wrapper mt-6">
      <h2 className="title text-center mb-4">Explore Popular Categories</h2>

      <div className="category-slider-container">
        <button onClick={() => scroll("left")} className="slider-btn left"><i className='bi bi-caret-left text-dark' style={{fontSize:"40px"}}></i></button>

        <div className="category-slider" ref={sliderRef}>
          {extendedList.map((category, index) => (
            <div key={index} className="category-item">
              <Link to={`/products?category=${category?.slug}`} className="cat-block">
                <figure>
                  <span>
                    <img
                      className="cat-block-image lazyload"
                      src={category?.categoryImage}
                      alt="Category"
                    />
                  </span>
                </figure>
                <h3 className="cat-block-title">{category?.name}</h3>
              </Link>
            </div>
          ))}
        </div>

        <button onClick={() => scroll("right")} className="slider-btn right"><i className='bi bi-caret-right text-dark' style={{fontSize:"40px"}}></i></button>
      </div>
    </div>
  )
}

export default CategorySection