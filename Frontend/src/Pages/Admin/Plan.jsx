import React, { useEffect } from 'react'
import ProfileLayout from "../../layout/ProfileLayout"
import Header from '../../components/Common/Header'
import { motion } from "framer-motion"
import { AlertTriangle, DollarSign, Handshake, Package, TrendingUp } from "lucide-react";
import StatCard from '../../components/Common/StatCard';
import { useDispatch, useSelector } from 'react-redux';
import AdminPlans from '../plans/AdminPlans';
import { getActiveUserCount, upcomingExpiryData } from '../../Redux/Slices/AdminSlice';
import { getAllPlans } from '../../Redux/Slices/PlanSlice';

function Plan() {

    const dispatch = useDispatch();
    const activeUsers = useSelector(state => state.admin?.data);
    const {upcomingExpiry} = useSelector(state => state.admin);
    const {plans} = useSelector(state => state.membership);


    

    useEffect (() => {
        const fetchActiveUser = async() => {
            await dispatch(getActiveUserCount())
        };
        const fetchUpcomingExpirations = async() => {
            await dispatch(upcomingExpiryData());
        }
        const fetchAllPlans = async() => {
            await dispatch(getAllPlans());
        }
        fetchUpcomingExpirations();
        fetchActiveUser()
        fetchAllPlans();
    },[dispatch]);

    console.log(activeUsers)

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

                    <StatCard name='Total Plans' icon={Package} value={plans.length} color='#6366F1' />
					<StatCard name='Active Members' icon={TrendingUp} value={activeUsers?.data} color='#10B981' />
					<StatCard name='Expiry plans this week' icon={AlertTriangle} value={upcomingExpiry.data?.length || 0} color='#F59E0B' />
					<StatCard name='Our Partner' icon={Handshake} value={"Being Strong"} color='#EF4444' />
				

                </motion.div>
                <AdminPlans />



            </main>
        </div>
        

    </ProfileLayout>
  )
}

export default Plan