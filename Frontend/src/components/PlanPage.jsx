import { Link, useNavigate, useParams } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Card3 from "./Card3";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan, getAPlan, updatePlan } from "../Redux/Slices/PlanSlice";
import { getAllUsers } from "../Redux/Slices/UserSlice";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { enrollIntoPlan } from "../Redux/Slices/AuthSlice";

const PlanPage = () => {

    const {_id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    useEffect(() => {
        dispatch(getAPlan(_id));
        dispatch(getAllUsers());
    },[dispatch])

    const role = useSelector(state => state.auth.role)
    const {plan} = useSelector(state => state.membership);
    console.log("Plan",plan)

    
    
    const {users} = useSelector(state => state.user)

    const trainers = users.filter(user => user.role==="Trainer");
    const members = users.filter(user => user.role==="User");
    const members2 = members.filter(member => member.membershipPlan.find(m=> m.planId === plan._id))

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    }

    const handleConfirm = async() => {
        await dispatch(deletePlan(_id))
        navigate("/plan")
        setIsDialogOpen(false);
    }
    const handleCancel = () => {
        setIsDialogOpen(false);
    }
    const [fdata,setFdata] = useState({
        planId:_id,
        startDate: new Date()
    })
    const [isBuyOpen, setIsBuyOpen] = useState(false);
    const enrollPlan = () => { 
        setIsBuyOpen(true);
    }
    const handleBuyChange = (e) => {
        setFdata({
            ...fdata,
            [e.target.name]:e.target.value
        })
    }

    const handleBuyConfirm = async() => {
        await dispatch(enrollIntoPlan(fdata))
        navigate("/plan")
        setIsBuyOpen(false);
    }
    const handleBuyCancel = () => {
        setIsBuyOpen(false);
    }


    const [formdata,setFormdata] = useState({
        plan:"",
        description: "",
        duration: "",
        price: ""
    })

    useEffect(() => {
        setFormdata({
            plan: plan.plan,
            description: plan.description,
            duration: plan.duration,
            price: plan.price
        })
    },[plan])

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const handleUpdateClick = () => {
        setIsUpdateOpen(true);
    }

    const handleUpdateChange = (e) => {
        e.preventDefault()
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdateConfirm = async() => {
        await dispatch(updatePlan([_id,formdata]))
        setFormdata({
            plan: "",
            description: "",
            duration: "",
            price: ""
        })
        navigate(`/plan/${_id}`)
        setIsUpdateOpen(false);
    }
    const handleUpdateCancel = () => {
        setIsUpdateOpen(false);
    }

    return (
        <div key={_id}>
            <HomeLayout>
            <div className="w-full m-0 p-0 flex flex-col gap-6">
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                    <h1 className="text-5xl font-bold">Slimnastics <span className="text-orange-700">{plan.plan}</span></h1>
                    <p className="py-6">
                        {plan.description}
                        <br />
                        <strong>Duration: {plan.duration} days</strong>
                        <br />
                        <strong>Starting at {plan.price} Only/- </strong>
                    </p>
                    <div className="flex gap-4 justify-center items-center">

                        {role==="Admin" && 
                        <button 
                            className="w-fit bg-purple-700 text-white px-3 py-3 rounded-full hover:bg-purple-500"
                            onClick={handleUpdateClick}    
                        >
                            {<GrUpdate />}
                        </button>}
                        {isUpdateOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                                <h2 className="text-lg font-semibold text-gray-800">
                                Update Plan
                                </h2>
                                <form>
                                    <div className="mt-4 mb-4">
                                        <label
                                            htmlFor="plan"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                        Plan
                                        </label>
                                        <input
                                            type="text"
                                            id="plan"
                                            name="plan"
                                            value={formdata.plan}
                                            onChange={handleUpdateChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter plan name..."
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                        Name
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={formdata.description}
                                            onChange={handleUpdateChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter description"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="duration"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                        Duration
                                        </label>
                                        <input
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            value={formdata.duration}
                                            onChange={handleUpdateChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter duration"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                        Price
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            onChange={handleUpdateChange}
                                            value={formdata.price}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter price"
                                        />
                                    </div>

                                </form>
                                <div className="mt-4 flex justify-between">
                                <button
                                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                                    onClick={handleUpdateConfirm}
                                >
                                Update
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={handleUpdateCancel}
                                >
                                Cancel
                                </button>
                            </div>
                        </div>
                        </div>
                        )}
                        {role==="Admin" && 
                        <button 
                            className="w-fit bg-red-700 text-white px-3 py-3 rounded-full hover:bg-red-500"
                            onClick={handleDeleteClick}
                        >
                            {<MdDeleteForever />}
                        </button>}
                        {isDialogOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                                <h2 className="text-lg font-semibold text-gray-800">
                                Are you sure to delete?
                                </h2>
                                <div className="mt-4 flex justify-between">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
                        <button onClick={enrollPlan} className="btn btn-primary">Buy now</button>
                        {isBuyOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                                <h2 className="text-lg font-semibold text-gray-800">
                                Enroll into the Plan
                                </h2>
                                <form>
                                <div className="mb-4">
                                        <label
                                            htmlFor="startDate"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                        Start Date
                                        </label>
                                        <input
                                            type="date"
                                            style={{ padding: "5px", fontSize: "16px" }}
                                            id="startDate"
                                            name="startDate"
                                            onChange={handleBuyChange}
                                            value={fdata.startDate}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter start Date"
                                        />
                                    </div>
                                </form>
                                <div className="mt-4 flex justify-between">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    onClick={handleBuyConfirm}
                                >
                                OK
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={handleBuyCancel}
                                >
                                Cancel
                                </button>
                            </div>
                        </div>
                        </div>
                        )}      
                    </div>
                    
                    
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
                <h2 className="text-2xl font-bold">Our Trainers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-around">
                    {trainers.map(trainer => (
                        <Card3 user={trainer} />
                    ))}
                </div>
            </div>
            {members2.length > 0 &&
            <div className="flex flex-col gap-5 justify-center items-center">
            <h2 className="text-2xl font-bold">Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-around">
                {members2.map(uu => (
                    <Card3 user={uu} />
                ))}
            </div>
        </div>
            }
        </div>
        </HomeLayout>
        </div>
    )
}

export default PlanPage;