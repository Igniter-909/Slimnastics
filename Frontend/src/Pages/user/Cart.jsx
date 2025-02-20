import React, { useEffect } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, removeFromCart } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';

function Cart() {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const cartData = userData.data?.cart || [];
    useEffect(() => {
        const fetchUser = async() => {
            await dispatch(getUser());
        };
        fetchUser();
    },[dispatch]);


    const handleRemoveCart = async (productId) => {
        const res = await dispatch(removeFromCart(productId));
        await dispatch(getUser())
    };

    const calculateTotal = () => {
        return cartData.reduce((total, product) => total + (product.productId?.newPrice || 0) * product.quantity, 0);
    };

    const handleBuyNow = () => {
        // Implement the logic to proceed with the purchase
        toast.success('Proceeding to purchase');
    };

    if (cartData.length === 0) {
        return (
    
                <div className='text-center mt-10'>Your cart is empty.</div>
            
        );
    }




  return (
            <div className='w-full h-fit m-10'>
                <p className='font-aclonica text-3xl text-center mb-6'>My Cart</p>
                <div className='w-full h-fit grid grid-cols-4 gap-6'>
                    {cartData.map((product, index) => (
                        <div key={index} className='w-full h-full flex flex-col p-10 pt-0 border-2 border-[#d90A14]/30 rounded-3xl'>
                            <div className='w-full h-4/6'>
                                <img src={product.image} alt="product" className='w-full h-full rounded-lg overflow-hidden' />
                            </div>
                            <div className='flex flex-col gap-3 justify-center items-center'>
                                <p className='font-rubik text-[#e3ec36] text-xl font-bold'>{product.productId?.name || "No Name"} </p>
                                <p className='font-vazirmatn text-white/30'>{product.productId?.flavor || "No Flavor"}</p>
                                <p className='font-vazirmatn text-white text-sm'>Quantity: {product.quantity || "0"}</p>
                                <p className='font-vazirmatn text-white text-sm'>Rs.{product.productId?.newPrice || "0"}</p>
                                <div className='w-full px-6'>
                                    <button className='w-full h-10 rounded-full bg-[#D90A14] text-white font-vazirmatn hover:bg-[#ee4851]' onClick={() => handleRemoveCart(product.productId?._id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full h-fit flex justify-end mt-10 mr-10'>
                    <div className='w-1/3 h-fit p-6 border-2 border-[#d90A14]/30 rounded-3xl'>
                        <p className='font-aclonica text-xl'>Total: Rs.{calculateTotal()}</p>
                        <button className='w-full h-10 mt-4 rounded-full bg-[#D90A14] text-white font-vazirmatn hover:bg-[#ee4851]' onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>
)
}

export default Cart