import React from 'react'
import Loader from './Loader';

const MobileFilter = ({ onClose, category, specifications, handleClick, defaultCheckHandler }) => {

  return (
    <>
    <div className="mobile-filter-modal">
      <div className="mobile-filter-overlay" onClick={onClose}></div>
      <div className="mobile-filter-content">
        <button className="close-button" onClick={onClose}>×</button>

                    <div className="widget widget-categories mt-4">
                        <h3 className="widget-title" style={{color:"#00286c"}}>Categories</h3>

                        <div className="widget-body">
                            <div className="accordion" id="widget-cat-acc">
                                {category?.map((category) => (
                                    <div className="acc-item" key={category.index}>


                                        <h5>
                                            <a role="button" data-toggle="collapse" href={`#collapse-${category.slug}`} aria-expanded="true" aria-controls={`collapse-${category.slug}`}>
                                                {category?.name}
                                            </a>
                                        </h5>


                                        <div id={`collapse-${category.slug}`} className="collapse" data-parent="#widget-cat-acc">
                                            <div className="collapse-wrap">
                                                {category?.children && category?.children?.map((categoryChildren) => (
                                                    <div className="filter-items" key={categoryChildren.slug}>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id={categoryChildren.slug}
                                                                    name="subcategory"
                                                                    value={categoryChildren.slug}
                                                                    defaultChecked={defaultCheckHandler("subcategory", categoryChildren.slug)}
                                                                    onClick={(e) => handleClick(e.target)}
                                                                />
                                                                <label className="custom-control-label" htmlFor={categoryChildren.slug}>
                                                                    {categoryChildren.name}
                                                                </label>
                                                            </div>
                                                            {/* <!-- End .custom-checkbox --> */}
                                                        </div>
                                                        {/* <!-- End .filter-item --> */}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* <!-- End .collapse-wrap --> */}
                                        </div>

                                    </div>

                                ))}
                            </div>
                            {/* <!-- End .accordion --> */}
                        </div>
                        {/* <!-- End .widget-body --> */}
                    </div>
                    {/* <!-- End .widget --> */}
                    {specifications?.map((specification) => (
    <div className="widget" key={specification._id}>
        <h3 className="widget-title">{specification?.title}</h3>
        <div className="widget-body">
            {specification?.children?.map((child) => (
                <div className="filter-items" key={child._id}>
                    <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={child.slug}
                                name={`spec-${specification?.slug}`}
                                value={child.slug}
                                defaultChecked={defaultCheckHandler(`spec-${specification.slug}`, child.slug)}
                                onClick={(e) => handleClick(e.target)}
                            />
                            <label className="custom-control-label" htmlFor={child.slug}>
                                {child.title}
                            </label>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
))}
        </div>
        {/* <!-- End .mobile-menu-wrapper --> */}
    </div>
    </>
  )
}

export default MobileFilter;