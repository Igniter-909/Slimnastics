import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, removeFromCart } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

function Cart() {

    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.auth.darkmode);
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

    const handleBuyNow = async () => {
        try {
            const response = await axiosInstance.post('/payment/checkout', {
                amount: calculateTotal() * 100,
                currency: 'INR'
            });

            if (!response.data.success) {
                throw new Error('Failed to create order');
            }

            const options = {
                key: response.data.key,
                amount: response.data.amount,
                currency: "INR",
                name: "slimnastics",
                description: "cart purchase",
                order_id: response.data.order.id,
                handler: async function (razorpayResponse) {
                    try {
                        const verifyResponse = await axiosInstance.post('/payment/verify', {
                            razorpay_order_id: razorpayResponse.razorpay_order_id,
                            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                            razorpay_signature: razorpayResponse.razorpay_signature,
                            userId: userData.data?._id
                        });

                        if (verifyResponse.data.success) {
                            toast.success('Payment successful! Your cart has been cleared.');
                            await dispatch(getUser());
                        }
                    } catch (error) {
                        console.error('Verification Error:', error);
                        toast.error('Payment verification failed');
                    }
                },
                prefill: {
                    name: userData.data?.fullName || "",
                    email: userData.data?.email || "",
                    contact: userData.data?.phone || ""
                },
                theme: {
                    color: "#D90A14"
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();

        } catch (error) {
            console.error('Payment Error:', error);
            toast.error(error.response?.data?.error || 'Something went wrong with the payment');
        }
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
                                <img src={product.productId?.image} alt="product" className='w-full h-full rounded-lg overflow-hidden' />
                            </div>
                            <div className='flex flex-col gap-3 justify-center items-center'>
                                <p className='font-rubik text-[#e3ec36] text-xl font-bold'>{product.productId?.name || "No Name"} </p>
                                <p className={`font-vazirmatn ${isDarkMode ? "text-white/30" : "text-black/30"}`}>{product.productId?.flavor || "No Flavor"}</p>
                                <p className={`font-vazirmatn ${isDarkMode ? "text-white" : "text-black"} text-sm`}>Quantity: {product.quantity || "0"}</p>
                                <p className={`font-vazirmatn ${isDarkMode ? "text-white" : "text-black"} text-sm`}>Rs.{product.productId?.newPrice || "0"}</p>
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