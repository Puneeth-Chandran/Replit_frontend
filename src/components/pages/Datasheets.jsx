import React, { useEffect } from 'react'
import { useGetProductsQuery } from '../../redux/api/productsApi';
import DatasheetSearch from './DatasheetSearch';
import { useSearchParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import CustomPagination from '../layout/CustomPagination';
import toast from 'react-hot-toast';

const Datasheets = () => {

    let [searchParams] = useSearchParams();
        const page = searchParams.get("page") || 1;
        const keyword = searchParams.get("keyword") || "";

        const params = {page, keyword};

    const {data, isLoading, error, isError} = useGetProductsQuery(params);
console.log(data);

    useEffect(()=>{
            if(isError){
                toast.error(error?.data?.message);
        }
        }, [isError,error]);
        
    if(isLoading) return <Loader/>;

  return (
<>
    <DatasheetSearch/>
    <div className="row justify-content-center mt-3">
    {data?.products?.map((product) => (
        <div className="col-sm-4 col-md-3">
                			<article className="entry entry-mask">
                                <figure className="entry-media2">
                                <a
                                        href={product?.datasheet?.datasheet}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >
                                        <img src={product?.images[0].url} alt="image desc"/>
                                    </a>
                                </figure>

                                <div className="entry-body">
                                    

                                    <h2 className="entry-title text-dark">
                                        <a
                                        href={product?.datasheet?.datasheet}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >Belcab {product?.name}</a>
                                    </h2>

                                    <div className="entry-cats text-dark">
                                       {product?.seo_title}
                                        
                                    </div>
                                </div>
                            </article>
                		</div>
    ))}
    <CustomPagination resPerFilter={data?.resPerFilter} filteredProductsCount={data?.filteredProductsCount} />
    </div>
    </>
  )
}

export default Datasheets;