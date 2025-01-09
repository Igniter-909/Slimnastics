import React, { useEffect,useState } from 'react'
import ProfileLayout from '../../layout/ProfileLayout'
import {motion} from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { getActiveUserCount, getAllUsers, getUserCountByGender, NewUserCount, upcomingExpiryData } from '../../Redux/Slices/AdminSlice';
import Header from '../../components/Common/Header';
import StatCard from '../../components/Common/StatCard';
import { UserCheck, UserPlus, UsersIcon, UserX } from 'lucide-react';
import UsersTable from '../../components/User/UsersTable';
import UsersExpiryTable from '../../components/User/UsersexpiryTable';
import UserGrowthChart from '../../components/User/UserGrowthChart';

function Users() {

    const dispatch = useDispatch();
    const {data,userCountByGender,newUserCount,upcomingExpiry,allusers} = useSelector(state => state.admin);
    const [allUsers, setAllUsers] = useState([]);

    const getActiveUsers = async() => {
            await dispatch(getActiveUserCount());
        }
    const fetchUserCountByGender = async() => {
            await dispatch(getUserCountByGender())
        }
    const fetchnewUserCount = async() => {
            await dispatch(NewUserCount());
        }
    const fetchUpcomigExpirations = async() => {
            await dispatch(upcomingExpiryData())
    }
    const fetchAllUsers = async() => {
        await dispatch(getAllUsers())
    }

    useEffect(() => {
        getActiveUsers();
        fetchUserCountByGender();
        fetchnewUserCount();
        fetchUpcomigExpirations();
        fetchAllUsers();
    },[dispatch])

    useEffect(() => {
        setAllUsers(allusers.filter(user => user.role === "User"));
    }, [allusers]);

    const totalUsers = allUsers.length || 0;
    const activeUser = data?.data || 0;
    const churnRate = totalUsers > 0 ? ((totalUsers - activeUser) / totalUsers).toFixed(2) : 0;


  return (
    <ProfileLayout>
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title={"Users"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
                >
                    <StatCard name="Total Users" icon={UsersIcon} value={totalUsers} color='#6366F1' />
                    <StatCard name="Active Users" icon={UserCheck} value={activeUser} color='#10B981' />
                    <StatCard name="New Users This Month" icon={UserPlus} value={newUserCount?.data || 0} color='#F59E0B' />
                    <StatCard name="Churn Rate" icon={UserX} value={churnRate} color='#6366F1' />


                </motion.div>
            
                <UserGrowthChart />
                <UsersTable />
                <UsersExpiryTable />
                

            </main>

        </div>
    </ProfileLayout>
  )
}

export default Users;