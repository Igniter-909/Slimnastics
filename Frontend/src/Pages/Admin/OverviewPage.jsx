import React, { useEffect } from 'react'
import ProfileLayout from '../../layout/ProfileLayout'
import Header from '../../components/Common/Header'
import {motion} from "framer-motion"
import { Zap,Users, ShoppingBag, BarChart2 } from 'lucide-react'
import StatCard from '../../components/Common/StatCard'
import SalesOverviewChart from '../../components/Overview/SalesOverviewChart'
import CategoryDistributionChart from '../../components/Overview/CategoryDistributionChart'
import SalesChannelChart from '../../components/Overview/SalesChannelChart'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveUserCount,getAttendanceSummaryy,getLastDayPresntUserC,getProductRatings,getUserCountByGender, NewUserCount, upcomingExpiryData } from '../../Redux/Slices/AdminSlice.js'

function OverviewPage() {

    const dispatch = useDispatch();
    const activeUser  = useSelector((state) => state.admin.data);
    const userCountGender = useSelector(state => state.admin.userCountByGender)
    const newUserCount = useSelector(state => state.admin.newUserCount);
    const attendanceSummary = useSelector(state => state.admin.attendanceSummary)
    const lastDayPresent = useSelector(state => state.admin.lastDayPresentUser)
    const upcomingExpiry = useSelector(state => state.admin.upcomingExpiry)
    const productratings = useSelector(state => state.admin.productRatings)

    const getActiveUsers = async() => {
        await dispatch(getActiveUserCount());
    }
    const userCountByGender = async() => {
        await dispatch(getUserCountByGender())
    }
    const fetchnewUserCount = async() => {
        await dispatch(NewUserCount());
    }
    const getAttendanceSummary = async() => {
        await dispatch(getAttendanceSummaryy())
    }
    const lastDayPresentCount = async() => {
        await dispatch(getLastDayPresntUserC())
    }
    const fetchUpcomigExpirations = async() => {
        await dispatch(upcomingExpiryData())
    }
    const fetchProductRatings = async() => {
        await dispatch(getProductRatings())
    }

    useEffect(() => {
        getActiveUsers();
        userCountByGender();
        fetchnewUserCount();
        getAttendanceSummary();
        lastDayPresentCount();
        fetchUpcomigExpirations();
        fetchProductRatings();
    }, [dispatch])


  return (
    <ProfileLayout>
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title="Overview" />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div 
                className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y: 0}}
                transition={{duration:1}}
                >
                    <StatCard name='Active Users' icon={Zap} value={activeUser?.data} color='#6366F1' />
					<StatCard name='New Users' icon={Users} value={newUserCount?.data} color='#8B5CF6' />
					<StatCard name='Last Day Present' icon={ShoppingBag} value={lastDayPresent?.data} color='#EC4899' />
					<StatCard name='Upcoming Expiry' icon={BarChart2} value={upcomingExpiry?.data?.length} color='#10B981' />
                </motion.div>


                {/* Chart */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <SalesOverviewChart Data={attendanceSummary?.data || []} />
                    <CategoryDistributionChart genderData={userCountGender?.data || [] } />
                    <SalesChannelChart SALES_CHANNEL_DATA={productratings?.data || []} title={"Average Ratings of Different Brands"} />
                </div>

            </main>
        </div>
    </ProfileLayout>
  )
}

export default OverviewPage