import React, { useEffect, useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../Redux/Slices/PlanSlice";
import { enrollIntoPlan } from "../../Redux/Slices/AuthSlice";

function ShowPlans2() {
  const dispatch = useDispatch();

  const { plans = [], loading } = useSelector((state) => state.membership);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const MonthlyPlans = plans?.filter((plan) => plan.duration === 1) || [];
  const YearlyPlans = plans?.filter((plan) => plan.duration === 12) || [];

  const [monthPlan, setMonthPlan] = useState(true);
  const [dialog,setDialog] = useState(false);
  const [formData,setFormData] =useState({
    planId:"",
    startDate:Date.now()
  })

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (planId) => {
    setFormData({
        ...formData,
        planId
    })
    setDialog(true);
  }

  const handleConfirm = async() => {
    await dispatch(enrollIntoPlan(formData));
    setDialog(false);
    Navigate('/');
  }

  const handleCancel = () => {
    setDialog(false);
  }


  const togglePlanType = (type) => {
    setMonthPlan(type === "monthly");
  };

  if (loading) {
    return (
      <HomeLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </HomeLayout>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <HomeLayout>
        <p className="text-center mt-10">No plans available. Please check back later.</p>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="w-full h-fit p-6">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
          <p className="font-aclonica text-xl font-bold">
            Our <span className="text-[#D90A14]">Plans</span>
          </p>
          <div className="w-full h-fit flex justify-center gap-4">
            <button
              className={`w-1/6 px-3 py-1 font-light font-vazirmatn text-sm ${
                monthPlan ? "bg-[#D90A14] text-white" : "bg-[white] text-[#D90A14]"
              } rounded-lg`}
              onClick={() => togglePlanType("monthly")}
            >
              Monthly
            </button>
            <button
              className={`w-1/6 px-3 py-1 font-light font-vazirmatn text-sm ${
                !monthPlan ? "bg-[#D90A14] text-white" : "bg-[white] text-[#D90A14]"
              } border-[#D90A14] border rounded-lg`}
              onClick={() => togglePlanType("yearly")}
            >
              Yearly
            </button>
          </div>
          <p className="text-justify text-sm">
            Select The Plan That Suits Your Fitness Goals And Let Our Expert Coaches Guide You Every Step Of The Way
          </p>
        </div>
        <div className="w-full h-fit grid grid-cols-4 items-center justify-center gap-6 my-12">
          {(monthPlan ? MonthlyPlans : YearlyPlans).map((plan) => (
            <div
              key={plan._id}
              className="w-full h-fit flex flex-col justify-center rounded-lg p-6 gap-2 border-2 border-[#CD4E17] even:border-[#D90A14] hover:scale-110 transform transition-transform duration-300"
            >
              <p className="text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn">Package</p>
              <p className="text-lg font-extrabold font-rubik text-center">{plan.plan}</p>
              <p className="text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn">Description</p>
              <p className="text-sm text-justify">{plan.description}</p>
              <p className="text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn">Benefits</p>
              <ul className="text-sm list-disc">
                {plan.benefits?.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <p className="font-vazirmatn text-center text-lg font-bold">Rs. {plan.price}</p>
              <button
                onClick={handleSubmit.bind(null,plan._id)}
                className="w-full px-4 py-2 text-sm font-vazirmatn text-white bg-[#CD4E17] hover:bg-[#f78a5b] rounded-full"
                aria-label={`Choose plan ${plan.plan}`}
              >
                Choose This Plan
              </button>
            </div>
          ))}
        </div>
        {dialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#1D1D1D] bg-opacity-90">
                    <div className="bg-black rounded-lg shadow-xl p-6 w-80">
                        <h2 className="text-lg font-semibold font-vazirmatn text-center text-[#D90A14]">
                            Enroll into the Plan
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="startDate" className="block text-sm font-medium text-white/60">
                                        Start Date
                                </label>
                                <input
                                    type="date"
                                    style={{ padding: "5px", fontSize: "16px", border: "1px solid #D90A14" }}
                                    id="startDate"
                                    name="startDate"
                                    onChange={handleInputChange}
                                    value={formData.startDate}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#D90A14] focus:border-[#D90A14]"
                                    placeholder="Enter start Date"
                                />
                            </div>
                        </form>
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
      </div>
    </HomeLayout>
  );
}

export default ShowPlans2;
