import React, { useEffect } from 'react'
import ProfileLayout from "../../layout/ProfileLayout"
import Header from '../../components/Common/Header'
import { motion } from "framer-motion"
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import StatCard from '../../components/Common/StatCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Redux/Slices/ProductSlice';
import { getProductRatings } from '../../Redux/Slices/AdminSlice';
import ProductTable from '../../components/Product/ProductTable';
import AdminShop from '../../components/Product/AdminShop';
import SalesChannelChart from '../../components/Overview/SalesChannelChart';

function Products() {

    const dispatch = useDispatch();
    const {allProducts } = useSelector(state => state.product)
    const {productRatings} = useSelector(state => state.admin);

    useEffect (() => {
        const fetchAllProducts = async() => {
            await dispatch(getAllProducts());
        }
        const fetchProductRatings = async() => {
            await dispatch(getProductRatings())
        }
        fetchAllProducts();
        fetchProductRatings();
    },[dispatch]);

    console.log(productRatings);


  return (
    <ProfileLayout>
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title={"Products"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                >

                    <StatCard name='Total Products' icon={Package} value={allProducts.length} color='#6366F1' />
					<StatCard name='Trusted Brand' icon={TrendingUp} value={"MyProtein"} color='#10B981' />
					<StatCard name='Our Brand' icon={AlertTriangle} value={"Slimnastics"} color='#F59E0B' />
					<StatCard name='Our Ratings' icon={DollarSign} value={"4.5"} color='#EF4444' />
				

                </motion.div>
                <SalesChannelChart SALES_CHANNEL_DATA={productRatings?.data || []} title={"Average Ratings"} />
                <ProductTable />
                <AdminShop />



            </main>
        </div>
        

    </ProfileLayout>
  )
}

export default Products