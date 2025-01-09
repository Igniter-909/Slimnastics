import React, { useEffect } from 'react'
import ProfileLayout from '../../layout/ProfileLayout'
import Header from '../../components/Common/Header'
import Feedback from '../../components/Notifications/Feedback'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContacts } from '../../Redux/Slices/AdminSlice'

function Notifications() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllContacts = async() => {
            await dispatch(getAllContacts())
        };
        fetchAllContacts()
    },[dispatch]);



    const allContacts = useSelector(state => state.admin.allContacts);

  return (
    <ProfileLayout>
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title={"Notifications"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <Feedback allContacts={allContacts} />
            </main>
        </div>
    </ProfileLayout>
)
}

export default Notifications