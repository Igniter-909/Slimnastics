
import { motion } from "framer-motion";
import { useSelector } from "react-redux";


const UsersExpiryTable = () => {
    const { upcomingExpiry } = useSelector(state => state.admin)

    console.log(upcomingExpiry)
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 my-6 border border-[#D90A14]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-xl font-semibold text-gray-100'>Upcoming Expirations</h2>

			<div className='overflow-x-auto max-h-96'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Expertise
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Gender
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{upcomingExpiry?.data?.length > 0 && upcomingExpiry?.data.map((user) => (
							<motion.tr
								key={user?._id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full flex items-center justify-center'>
												<img src={user.avatar} alt="profile" className="h-10 w-10 overflow-hidden rounded-full" />
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.experience}+ years
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.gender === "Male"
												? "bg-green-800 text-red-100"
												: (user.gender === "Female" ? "bg-pink-600 text-pink-100" : "bg-green-800 text-green-100")
										}`}
									>
										{user.gender}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                <div className='text-sm text-gray-300 text-center'>{new Date(user.membershipPlan?.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
									
                                </td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
            
		</motion.div>
	);
};
export default UsersExpiryTable;