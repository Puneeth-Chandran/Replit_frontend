import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetCategoryQuery } from '../../redux/api/categoryApi';
import { useGetSpecificationsQuery } from '../../redux/api/specApi';
import Loader from './Loader';
import MobileFilter from './MobileFilter';

const Filters = () => {
    const { data, error, isLoading } = useGetCategoryQuery();
    const category = data?.categoryList;

    const { data: specData, error: specError, isLoading: specLoading } = useGetSpecificationsQuery();
    const specifications = specData?.specifications;

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    //Handle category filter
    const handleClick = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name);

        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false;
        });

        if (checkbox.checked === false) {
            //delete the filter from query
            if (searchParams.has(checkbox.name)) {
                searchParams.delete(checkbox.name);
                const path = window.location.pathname + "?" + searchParams.toString();
                navigate(path);
            }
        } else {
            //set new filter value if already there 
            if (searchParams.has(checkbox.name)) {
                searchParams.set(checkbox.name, checkbox.value);
            } else {
                //append new filter
                searchParams.append(checkbox.name, checkbox.value);
            }
            const path = window.location.pathname + "?" + searchParams.toString();
            navigate(path);
        }
    };

    const defaultCheckHandler = (checkboxType, checkboxValue) => {
        const value = searchParams.get(checkboxType);
        if (checkboxValue === value) return true;
        return false;
    };
    if (specLoading) {
        <Loader />
    };

    return (
        <>

            <button className="mobile-filter-btn" onClick={() => setShowMobileFilters(true)}>
                <i className="bi bi-funnel"></i>
            </button>

            {showMobileFilters && (
                <MobileFilter
                    onClose={() => setShowMobileFilters(false)}
                    category={category}
                    specifications={specifications}
                    handleClick={handleClick}
                    defaultCheckHandler={defaultCheckHandler}
                />
            )}

            <aside className="col-lg-3 col-xl-5col order-lg-first filters-desktop">
                <div className="sidebar sidebar-shop">
                    <div className="widget widget-categories mt-4">
                        <h3 className="widget-title">Categories</h3>

                        <div className="widget-body">
                            <div className="accordion" id="widget-cat-acc">
                                {category?.map((category) => (
                                    <div className="acc-item" key={category.slug}>


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
                    {/* {specifications?.map((specification) => (
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
))} */}
                    {/* <!-- End .widget --> */}
                </div>

                {/* <!-- End .sidebar sidebar-shop --> */}
                <div className="accordion" id="accordion-1">
                    {specifications
                        ?.slice()
                        .sort((a, b) => a.title.localeCompare(b.title)) // sort specs alphabetically
                        .map((specification) => (
                            <div className="card" key={specification._id}>
                                <div className="card-header" id={`heading-${specification?.slug}`}>
                                    <h2 className="card-title-filter">
                                        <a
                                            role="button"
                                            data-toggle="collapse"
                                            href={`#collapse-${specification?.slug}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse-${specification?.slug}`}
                                        >
                                            {specification?.title}
                                        </a>
                                    </h2>
                                </div>
                                <div
                                    id={`collapse-${specification?.slug}`}
                                    className="collapse"
                                    aria-labelledby={`heading-${specification?.slug}`}
                                    data-parent="#accordion-1"
                                >
                                    <div className="card-body">
                                        {specification?.children
                                            ?.slice()
                                            .sort((a, b) => {
                                                if (specification.title.toLowerCase() === 'conductor count') {
                                                    const regex = /^(\d+)\s+(\w+)/;
                                                    const matchA = a.title.match(regex);
                                                    const matchB = b.title.match(regex);

                                                    if (matchA && matchB) {
                                                        const numA = parseInt(matchA[1], 10);
                                                        const textA = matchA[2].toLowerCase();

                                                        const numB = parseInt(matchB[1], 10);
                                                        const textB = matchB[2].toLowerCase();

                                                        // First: manually force "pair" to come before "core"
                                                        if (textA === 'pair' && textB === 'core') return -1;
                                                        if (textA === 'core' && textB === 'pair') return 1;

                                                        // Then sort by number
                                                        return numA - numB;
                                                    }
                                                }

                                                // Fallback: alphabetical
                                                return a.title.localeCompare(b.title);
                                            })
                                            .map((child) => (
                                                <div className="filter-items" key={child._id}>
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id={child.slug}
                                                                name={`spec-${specification?.slug}`}
                                                                value={child.slug}
                                                                defaultChecked={defaultCheckHandler(
                                                                    `spec-${specification.slug}`,
                                                                    child.slug
                                                                )}
                                                                onClick={(e) => handleClick(e.target)}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={child.slug}
                                                            >
                                                                {child.title}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                </div>
            </aside>
        </>
    )
}

export default Filters;