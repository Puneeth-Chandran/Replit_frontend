import React, { useEffect } from 'react';
import Metadata from '../layout/Metadata';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import HeaderBanner from './HeaderBanner';
import AboutBanner from './AboutBanner';
import CategorySection from './CategorySection';
import SubCategoryBanners from './SubCategoryBanners';
import CompanyPrinciples from './CompanyPrinciples';

const Home = () => {

    const { isLoading, error, isError } = useGetProductsQuery();

    useEffect(()=>{
        if(isError){
            toast.error(error?.data?.message||"Something went wrong, please try again later");
    }
    }, [isError,error])
if(isLoading) return <Loader />;

  return (
    
    <div className="pantone-blue">
    <div className="page-content">
    <Metadata title={'One stop solution for all your cables needs'}/>
    <HeaderBanner/>
    <AboutBanner/>
    <CategorySection/>
    <SubCategoryBanners/>
    <CompanyPrinciples/>
    </div>
    </div>
  )
}

export default Home