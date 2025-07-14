import React,{useEffect} from 'react'
import CustomPagination from '../layout/CustomPagination'
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import ProductItem from './ProductItem';
import Filters from '../layout/Filters';

const FilteredProduct = () => {
    let [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const keyword = searchParams.get("keyword") || "";
    const subcategory = searchParams.get("subcategory");
    const category = searchParams.get("category");

    const specifications = {};
searchParams.forEach((value, key) => {
    if (key.startsWith("spec-")) {
        specifications[key.replace("spec-", "")] = value;
    }
});

    const params = {page, keyword};
if (subcategory) params.subcategory = subcategory;
if (category) params.category = category;
if (Object.keys(specifications).length > 0) params.specifications = specifications;
    subcategory !== null && (params.subcategory = subcategory);
    category !== null && (params.category = category);

    const { data ,isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(()=>{
        if(isError){
            toast.error(error?.data?.message);
    }
    }, [isError,error]);
    
if(isLoading) return <Loader/>;

  return (
    <div className="page-content">
    <div className="container">
        <div className="row">
            <div className="col-lg-9 col-xl-4-5col">

                <div className="mb-3"></div>
                {/* <!-- End .mb-3 --> */}

                <div className="mb-3 mb-lg-5"></div>
                {/* <!-- End .mb-3 mb-lg-5 --> */}

                {/* {keyword?"":
                <>
                    <h2 className="title title-border">Categories</h2>
                <div className="cat-blocks-container">
                    <div className="row">
                        <div className="col-6 col-md-4 col-lg-3">
                            <a href="category.html" className="cat-block">
                                <figure>
                                    <span>
                                        <img src="/assets/images/banners/belcab/cat pics/audio-and-speaker-cables.png" alt="Category image"/>
                                    </span>
                                </figure>

                                <h3 className="cat-block-title">Desktop Computers</h3>
                            </a>
                        </div>
                    </div>
                </div>
                </>
                } */}

                <div className="mb-2"></div>
                {!keyword?
                <h2 className="title title-border">Products</h2>
                :
                <h2 className="title title-border">Search Results for "{keyword}"</h2>}
                <div className="toolbox">
                    <div className="toolbox-left">
                    <div className="toolbox-info">
  {keyword ? (
    data?.products?.length > 1 ? (
      `Displaying ${16 * (page - 1) + 1} to ${
        16 * (page - 1) + data?.products?.length
      } of ${data?.filteredProductsCount} products found with keyword "${keyword}"`
    ) : data?.products?.length === 1 ? (
      `1 Product found with keyword "${keyword}"`
    ) : (
      `No products found with keyword "${keyword}"`
    )
  ) : (
    `${data?.filteredProductsCount} products found`
  )}
</div>
                        {/* <!-- End .toolbox-info --> */}
                    </div>
                    {/* <!-- End .toolbox-left --> */}
                {data?.product?.length ===1 || 0?
                    <div className="toolbox-right">
                        <div className="toolbox-sort">
                            <label htmlFor="sortby">Sort by:</label>
                            <div className="select-custom">
                                <select name="sortby" id="sortby" className="form-control">
                                    <option value="popularity" selected="selected">Most Popular</option>
                                    <option value="rating">Most Rated</option>
                                    <option value="date">Date</option>
                                </select>
                            </div>
                        </div>
                        {/* <!-- End .toolbox-sort --> */}
                    </div>
                    :""}
                    {/* <!-- End .toolbox-right --> */}
                </div>
                

                <div className="products mb-3">


                    <div className="row">
                    {data?.products?.filter(product => !product.isVariant) // ✅ exclude variants
                    .map((product) => (
                        <div className="col-6 col-md-4 col-lg-3" key={product?.slug}>
                                    <ProductItem product={product}/>
                                </div>
                    ))}
                    </div>
                    {/* <!-- End .row --> */}
                </div>
                {/* <!-- End .products --> */}
                <CustomPagination resPerFilter={data?.resPerFilter} filteredProductsCount={data?.filteredProductsCount} />
            </div>
            {/* <!-- End .col-lg-9 --> */}
            
            <Filters/>
        </div>
        </div>
        </div>
        
  )
}

export default FilteredProduct