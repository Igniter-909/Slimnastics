import React, { useEffect, useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../Redux/Slices/PlanSlice";
import { enrollIntoPlan } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

function ShowPlans2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { plans = [], loading } = useSelector((state) => state.membership);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const MonthlyPlans = plans?.filter((plan) => plan.duration === 1) || [];
  const YearlyPlans = plans?.filter((plan) => plan.duration === 12) || [];

  const [monthPlan, setMonthPlan] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [formData, setFormData] = useState({
    planId: "",
    startDate: new Date().toISOString().split("T")[0]
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (planId) => {
    setFormData({
      ...formData,
      planId
    });
    setDialog(true);
  };

  const handleConfirm = async () => {
    await dispatch(enrollIntoPlan(formData));
    setDialog(false);
    navigate('/');
  };

  const handleCancel = () => {
    setDialog(false);
  };

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
      <div className="w-full min-h-screen p-4 sm:p-6">
        <div className="w-full flex flex-col items-center justify-center gap-4 mb-8">
          <h1 className="font-aclonica text-2xl sm:text-3xl font-bold text-center">
            Our <span className="text-[#D90A14]">Plans</span>
          </h1>
          <div className="w-full flex justify-center gap-4">
            <button
              className={`w-1/3 sm:w-1/6 px-3 py-2 font-light font-vazirmatn text-sm ${
                monthPlan ? "bg-[#D90A14] text-white" : "bg-white text-[#D90A14]"
              } rounded-lg transition-colors duration-300`}
              onClick={() => togglePlanType("monthly")}
            >
              Monthly
            </button>
            <button
              className={`w-1/3 sm:w-1/6 px-3 py-2 font-light font-vazirmatn text-sm ${
                !monthPlan ? "bg-[#D90A14] text-white" : "bg-white text-[#D90A14]"
              } border-[#D90A14] border rounded-lg transition-colors duration-300`}
              onClick={() => togglePlanType("yearly")}
            >
              Yearly
            </button>
          </div>
          <p className="text-center text-sm sm:text-base px-4">
            Select The Plan That Suits Your Fitness Goals And Let Our Expert Coaches Guide You Every Step Of The Way
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
          {(monthPlan ? MonthlyPlans : YearlyPlans).map((plan) => (
            <div
              key={plan._id}
              className="w-full flex flex-col justify-center rounded-lg p-6 gap-4 border-2 border-[#CD4E17] even:border-[#D90A14] hover:scale-105 transform transition-transform duration-300"
            >
              <p className="text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn">Package</p>
              <h2 className="text-lg font-extrabold font-rubik text-center">{plan.plan}</h2>
              <p className="text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn">Description</p>
              <p className="text-sm text-justify">{plan.description}</p>
              <p className="text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn">Benefits</p>
              <ul className="text-sm list-disc pl-5">
                {plan.benefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <p className="font-vazirmatn text-center text-lg font-bold">Rs. {plan.price}</p>
              <button
                onClick={() => handleSubmit(plan._id)}
                className="w-full px-4 py-2 text-sm font-vazirmatn text-white bg-[#CD4E17] hover:bg-[#f78a5b] rounded-full transition-colors duration-300"
                aria-label={`Choose plan ${plan.plan}`}
              >
                Choose This Plan
              </button>
            </div>
          ))}
        </div>
        {dialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#1D1D1D] bg-opacity-90 z-50">
            <div className="bg-black rounded-lg shadow-xl p-6 w-80 sm:w-96">
              <h2 className="text-lg font-semibold font-vazirmatn text-center text-[#D90A14] mb-4">
                Enroll into the Plan
              </h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-white/60 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={handleInputChange}
                    value={formData.startDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#D90A14] focus:border-[#D90A14] bg-transparent text-white"
                  />
                </div>
              </form>
              <div className="mt-6 flex justify-between">
                <button
                  className="px-4 py-2 bg-[#D90A14] text-white rounded hover:bg-[#a22c32] transition-colors duration-300"
                  onClick={handleConfirm}
                >
                  OK
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300"
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
