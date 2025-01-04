import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPlan, deletePlan, getAllPlans, getAPlan, updatePlan } from '../../Redux/Slices/PlanSlice';
import AdminShop from '../shop/AdminShop';

function AdminPlans() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //fetching current or selected plan
    const plan = useSelector(state => state.membership.plan);

    // fetching all plans
    const plans = useSelector(state => state.membership.plans);
    useEffect(() => {
        const fetchPlans = async() => {
            await dispatch(getAllPlans())
        };
        fetchPlans();
    },[dispatch,plan]);

    

    const [display,setDisplay] = useState('plans'); //for displaying plans or shop options
    const [dialog, setDialog] = useState(false); //for displaying dialog box for delete
    const [currentPlanId,setCurrentPlanId] = useState(''); //for storing the current plan id
    const [formData,setFormData] = useState({
        plan: "",
        price: "",
        duration: "",
        description: "",
        benefits: ""
    }) // for adding the plan


    const [formData2,setFormData2] = useState({
        id: plan._id,
        plan:plan.plan,
        price:plan.price,
        duration:plan.duration,
        description:plan.description,
        benefits:plan.benefits
    }) // for updating the plan

    //displaying functions
    const displayPlans = () => {
        setDisplay('plans');
    }

    const displayShop = () => {
        setDisplay('shop');
    }

    //delete functions
    const handleDelete = () => {
        setDialog(true);
    }

    const handleConfirm = () => {
        handleDeletePlan();
        setDialog(false);
    }

    const handleCancel = () => {
        setDialog(false);
    }

    //add a plan function

    const handleAddInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleAddPlan = async() => {
        await dispatch(addPlan(formData))
        navigate("/plans")
        setFormData({
            plan: "",
            price: "",
            duration: "",
            description: "",
            benefits:""
        })
    }

    //get A plan


    const handleSelectedPlan = async(e) => {
        console.log("Selected plan", e.target.name, e.target.value);
        setCurrentPlanId(e.target.value);
        await dispatch(getAPlan(e.target.value));
    }

 

    //update a plan function
    const handleUpdateInputChange = (e) => {
        setFormData2({
           ...formData2,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdatePlan = async() => {
        await dispatch(updatePlan(formData2));
        navigate("/plans");
        setFormData2({
            id: "",
            plan:"",
            price:"",
            duration:"",
            description:"",
            benefits:""
        })
    }

    //delete a plan function
    const handleDeletePlan = async() => {
        await dispatch(deletePlan(currentPlanId));
        navigate("/plans");
        setCurrentPlanId("");
    }



  return (
    <div className='w-full h-fit p-6 flex border-2 rounded-lg border-white/60 mx-5'>
        <div className='w-1/4 h-full rounded-xl overflow-hidden flex flex-col gap-6 items-center justify-center'>
            <button className={`w-full h-fit px-3 py-1 font-vazirmatn ${display === 'plans' ? 'bg-[#7738e3] text-white' : 'text-[#7738e3]'} border-2 border-[#7738e3] rounded-xl`} onClick={displayPlans}>
                Plans
            </button>
            <button className={`w-full h-fit px-3 py-1 font-vazirmatn ${display === 'shop' ? 'bg-[#7738e3] text-white' : 'text-[#7738e3]'} border-2 border-[#7738e3] rounded-xl`} onClick={displayShop}>
                Shop
            </button>
        </div>
        <div className='w-3/4 h-fit flex flex-col gap-6 rounded-xl mx-6 p-10 border-2 border-white/20'>
            {display === 'plans' ? (
                <>
                <p className='text-2xl font-rubik text-[#7738e3]'>Membership Plans Settings</p>
                <div className='w-full h-fit flex flex-col gap-2 border-2 border-white/20 rounded-lg p-6'>
                    <p className='font-aclonica text-3xl font-bold'>Add Plan</p>
                    <div className='w-full h-fit flex flex-col gap-2'>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="plan" className='block text-gray-300/35'>Plan Title</label>
                            <input type="text" value={formData.plan} onChange={handleAddInputChange} id='plan' name='plan' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="price" className='block text-gray-300/35'>Price</label>
                            <input type="number" id='price' value={formData.price} onChange={handleAddInputChange} name='price' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="duration" className='block text-gray-300/35'>Duration</label>
                            <input type="number" id='duration' value={formData.duration} onChange={handleAddInputChange} name='duration' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="description" className='block text-gray-300/35'>Description</label>
                            <input type="text" id='description' value={formData.description} onChange={handleAddInputChange} name='description' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="benefits" className='block text-gray-300/35'>Benefits</label>
                            <textarea name="benefits" id="benefits" value={formData.benefits} onChange={handleAddInputChange} className='w-full min-h-[100px] max-h-[400px] resize-y p-2 border-b-2 bg-transparent outline-none'></textarea>
                        </div>
                        <div className='w-full flex justify-end'>
                            <button className='border-2 border-[#7738e3]  text-[#7738e3] my-2 px-16 py-2 rounded-lg hover:bg-[#7738e3] hover:text-white' type='submit' onClick={handleAddPlan}>Add Plan</button>
                        </div>
                    </div>
                </div>

                <div className='w-full h-fit flex flex-col gap-2 border-2 border-white/20 rounded-lg p-6'>
                    <p className='font-aclonica text-3xl font-bold'>Update Plan</p>
                    
                    <div className='w-full h-fit flex flex-col gap-2'>
                        <label htmlFor="plan_selection">Select Plan</label>
                        <select id="plan_selection" name="plan_selection" value={currentPlanId} onChange={handleSelectedPlan} className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none'>
                            <option value="">Select Plan</option>
                            {plans.map((plan) => {
                                return <option key={plan._id} className='text-[#7738e3]' value={plan._id}>{plan.plan}</option>
                            })}
                        </select>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-2 rounded-lg border-2 border-white/20 p-6 mt-6'>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="plan" className='block text-gray-300/35'>Plan Title</label>
                            <input type="text" id='plan' value={formData2.plan} onChange={handleUpdateInputChange} name='plan' className='w-full  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="price" className='block text-gray-300/35'>Price</label>
                            <input type="number" id='price' name='price' value={formData2.price} onChange={handleUpdateInputChange} className='w-full  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="duration" className='block text-gray-300/35'>Duration</label>
                            <input type="number" id='duration' name='duration' value={formData2.duration} onChange={handleUpdateInputChange} className='w-full  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="description" className='block text-gray-300/35'>Description</label>
                            <input type="text" id='description' name='description' value={formData2.description} onChange={handleUpdateInputChange} className='w-full  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                        </div>
                        <div className='mb-4 pr-6'>
                            <label htmlFor="benefits" className='block text-gray-300/35'>Benefits</label>
                            <textarea name="benefits" id="benefits" value={formData2.benefits} onChange={handleUpdateInputChange} className='w-full min-h-[100px] max-h-[400px] resize-y p-2 border-b-2 bg-transparent outline-none'></textarea>
                        </div>
                        <div className='w-full flex justify-end'>
                            <button className='border-2 border-[#7738e3]  text-[#7738e3] my-2 px-16 py-2 rounded-lg hover:bg-[#aa38e3] hover:text-white' onClick={handleUpdatePlan}>Update Plan</button>
                        </div>

                        <div className='mt-2 text-gray-300/35'>*Note: Changing price will affect customers who have already subscribed to this plan.</div>
                        <div className='mt-2 text-gray-300/35'>*Note: Changing duration,benefits and description will not affect customers who have already subscribed to this plan. You will need to update their subscription manually.</div>
                    </div>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-2 border-2 border-white/20 rounded-lg p-6'>
                        <p className='font-aclonica text-3xl font-bold'>Delete Plan</p>
                        <div className='w-full h-fit flex flex-col gap-2'>
                            <select id="plan_selection" name="plan_selection" className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none' value={currentPlanId} onChange={handleSelectedPlan}>
                                <option value="">Select Plan</option>
                                {plans.map((plan) => {
                                    return <option key={plan._id} className='text-[#7738e3]' value={plan._id}>{plan.plan}</option>
                                })}
                            </select>
                        </div>
                        <div className='w-full flex justify-end'>
                            <button className='border-2 border-[#7738e3]  text-[#7738e3] my-2 px-16 py-2 rounded-lg hover:bg-[#aa38e3] hover:text-white' onClick={handleDelete} type='submit'>Delete Plan</button>
                        </div>
                        <div className='mt-2 text-gray-300/35'>*Note: Deleting a plan will affect customers who have already subscribed to this plan.</div>
                    </div>

                    {dialog && (
                    <div className="fixed inset-0 flex items-center justify-center bg-[#1D1D1D] bg-opacity-90">
                        <div className="bg-black rounded-lg shadow-xl p-6 w-80">
                            <h2 className="text-lg font-semibold font-vazirmatn text-center text-[#D90A14]">
                                Are you sure you want to delete this plan
                            </h2>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="px-4 py-2 bg-[#D90A14] text-white rounded hover:bg-[#a22c32]"
                                        onClick={handleConfirm}
                                >
                                    OK
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                    )}
                </>
            ) : (
                <AdminShop />
            )
            }
        </div>  


    </div>
  )
}

export default AdminPlans