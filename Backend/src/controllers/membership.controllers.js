import Membership from "../models/membership.models.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  asyncHandler from "../utils/asyncHandler.js";

const addMembershipPlan = asyncHandler( async (req,res ) => {
    try {
        const {plan, price, description, duration,benefits} = req.body;

        if(!plan || !price || !description || !duration || !benefits) {
            throw new ApiError(400, "All fields are required")
        }

        const listBenefits = benefits.split(",");

        const newMembershipPlan = await Membership.create({
            plan,
            price,
            description,
            duration,
            benefits:listBenefits,
        });

        const createdPlan = await Membership.findById(newMembershipPlan._id);
        if(!createdPlan){
            throw new ApiError(500, "Failed to create membership plan")
        }

        return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdPlan,
                "Membership plan created successfully"
            )
        )

    } catch (error) {
        throw new ApiError(400, error?.message || "Something went wrong when adding membership plan")
    }
});

const getAllMembershipPlans = asyncHandler( async (req,res) => {
    try {
        const allMembershipPlans = await Membership.find();
        if(!allMembershipPlans){
            throw new ApiError(200,"No plans found!!");
        }
        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    allMembershipPlans,
                    "All membership plans fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500,error?.message || "Failed to fetch all the memberships plans")
    }

})

const updateMembershipPlan = asyncHandler( async(req,res) => {
    try {
        // const user = await User.findById(req.user._id);    
        const { id, plan, price, description, duration, benefits } = req.body;
        const listBenefits = Array.isArray(benefits) ? benefits : benefits.split(",");
        const membershipPlan = await Membership.findByIdAndUpdate(
            id,
            {
                plan,
                price,
                description,
                duration,
                benefits:listBenefits
            },{
                new: true
            }
        );
        if(!membershipPlan){
            throw new ApiError(404, "Membership plan not found")
        }
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                membershipPlan,
                "Membership plan updated successfully"
            ))

    } catch (error) {
        throw new ApiError(500,error?.message || "Failed to update the membership plan")
    }
});

const deleteMembershipPlan = asyncHandler( async (req,res ) => {
    try {        
        const { id } = req.params;
        const membershipPlan = await Membership.findByIdAndDelete(id);
        if(!membershipPlan){
            throw new ApiError(404, "Membership plan not found")
        }
        return res
        .status(200)
        .json(new ApiResponse(
                200,
                {},
                "Membership plan deleted successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Failed to delete the membership plan")
    }
})

const getaPlan = asyncHandler( async (req,res ) =>{
    try {
        const { id } = req.params;
        const membershipPlan = await Membership.findById(id);
        membershipPlan.benefits = membershipPlan.benefits.join(",");
        if(!membershipPlan){
            throw new ApiError(404, "Membership plan not found")
        }
        return res
           .status(200)
           .json(new ApiResponse(
                200,
                membershipPlan,
                "Membership plan fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Failed to fetch the membership plan")
    }
 });

 //get all participants of a particular plan
const getAllParticipants = asyncHandler( async(req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            throw new ApiError(400, "Membership plan id is required")
        }
        const membershipPlan = await Membership.findById(id);
        if(!membershipPlan){
            throw new ApiError(404, "Membership plan not found")
        }
        const participants = await User.find({
            memberships: {
                $elemMatch: {
                    planId: id
                }
            }
        })
        if(!participants){
            throw new ApiError(404, "No participants found for this plan")
        }
        return res
        .status(200)
        .json(new ApiResponse(
                200,
                participants,
                "Participants fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Failed to fetch the participants");
    }
})


export { addMembershipPlan,
    getAllMembershipPlans,
    updateMembershipPlan,
    deleteMembershipPlan,
    getaPlan,
    getAllParticipants
 };