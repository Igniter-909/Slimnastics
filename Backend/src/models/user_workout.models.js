import mongoose,{ Schema } from "mongoose";

const userWorkoutSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    workoutId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Workout'
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    duration: { 
        type: Number 
    },
    intensity: { 
        type: String
    },
    trainerId:{
        type: Schema.Types.ObjectId,
        ref: 'Trainer'
    }
},{timestamps: true})

const UserWorkout = mongoose.model('UserWorkout', userWorkoutSchema)

export default UserWorkout;