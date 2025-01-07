import React, { useEffect, useState } from 'react'
import HomeLayout from "../../layout/HomeLayout"
import cover2 from "../../assets/shop/cover2.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../Redux/Slices/ProductSlice.js'
import { addToCart } from '../../Redux/Slices/AuthSlice.js'
import toast from 'react-hot-toast'

function ShowShop() {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts);
    const [pages, setPages] = useState(1);
    const productsPerPage = 8;
    const final_length = pages * productsPerPage;
    const visiblePages = allProducts?.slice(0, final_length) || [];

    const [formData, setFormData] = useState({
        productId: "",
        quantity: 1
    });

    const handleNextPage = () => {
        if (visiblePages.length < allProducts.length) {
            setPages(pages + 1);
        }
    }
    
    useEffect(() => {
        const fetchAllProducts = async () => {
            await dispatch(getAllProducts());
        }
        fetchAllProducts();
    }, [dispatch])

    if (allProducts.length === 0) {
        return <HomeLayout><div className='text-center mt-10'>No products available.</div></HomeLayout>;
    }

    const handleAddToCart = async (id) => {
        const data = {
            productId: id,
            quantity: formData.quantity
        }
        const res = await dispatch(addToCart(data));
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success(res.payload.message);
        }
    }

    return (
        <HomeLayout>
            <div className='relative w-full sm:w-5/6 mx-auto rounded-3xl overflow-hidden h-64 sm:h-80 md:h-96 flex flex-col gap-2 justify-center items-center bg-cover bg-center'
                style={{ backgroundImage: `url(${cover2})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col gap-5 items-center justify-center h-full text-white px-4">
                    <h1 className='font-aclonica text-3xl sm:text-4xl md:text-5xl text-white'>SLIM<span className='text-[#D90A14]'>NASTICS</span></h1>
                    <p className='text-sm sm:text-base font-vazirmatn text-center text-white'>
                        Wide Range Of Trusted And Tested Products
                    </p>
                </div>
            </div>

            <div className='w-full h-fit flex flex-col sm:flex-row gap-6 sm:gap-0 justify-center items-center px-4 sm:px-6 py-10'>
                <StatItem title="98%" subtitle="Client Satisfaction" description="Our Members Love Their Results and Experience" />
                <StatItem title="10+" subtitle="Brands" description="Choose From The Varied Options" />
                <StatItem title="Safe" subtitle="Products" description="Tried And Tested Products Only" />
            </div>

            <h2 className='w-full text-xl sm:text-2xl font-aclonica text-center py-10'>Our Latest <span className='text-[#D90A14]'>Products</span></h2>
            <div className='w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-10'>
                {visiblePages.map((product, index) => (
                    <ProductCard key={index} product={product} handleAddToCart={handleAddToCart} />
                ))}
            </div>
            {final_length < allProducts.length && (
                <div className='w-full h-fit flex justify-center pb-10'>
                    <button className='px-6 py-2 text-sm font-vazirmatn text-white bg-[#d82ef2] hover:bg-[#635cf5] rounded-full transition-colors duration-300' onClick={handleNextPage}>Load More</button>
                </div>
            )}
        </HomeLayout>
    )
}

function StatItem({ title, subtitle, description }) {
    return (
        <div className='w-full sm:w-1/3 h-full flex flex-col gap-2 items-center justify-center sm:border-r-2 sm:border-[#D90A14] last:border-r-0 py-4 sm:py-0'>
            <div className='flex justify-center items-center'>
                <p className='font-aclonica text-xl text-[#D90A14]'>{title} <span className='text-base text-white'>{subtitle}</span></p>
            </div>
            <p className='text-sm text-center'>{description}</p>
        </div>
    )
}

function ProductCard({ product, handleAddToCart }) {
    return (
        <div className='w-full h-full flex flex-col p-6 border-2 border-[#d90A14]/30 rounded-3xl'>
            <div className='w-full h-48 sm:h-56 mb-4'>
                <img src={product.image} alt={product.name} className='w-full h-full object-cover rounded-lg' />
            </div>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <h3 className='font-rubik text-[#e3ec36] text-lg sm:text-xl font-bold text-center'>{product.name}</h3>
                <p className='font-vazirmatn text-white/30'>{product.flavor}</p>
                <div className='text-sm flex flex-wrap gap-2 sm:gap-5 font-vazirmatn justify-center'>
                    <p className='font-semibold'>{product.newPrice}</p>
                    <p className='line-through text-white/60'>{product.originalPrice}</p>
                    <p className='text-green-400'>save {(product.originalPrice - product.newPrice).toFixed(2)}</p>
                </div>
                <div className='w-full px-2 sm:px-6'>
                    <button 
                        className='w-full h-10 rounded-full bg-[#D90A14] text-white font-vazirmatn hover:bg-[#ee4851] transition-colors duration-300'
                        onClick={() => handleAddToCart(product._id)}
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShowShop;

