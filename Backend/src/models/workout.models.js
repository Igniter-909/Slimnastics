import mongoose,{ Schema } from 'mongoose';

const workoutSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    duration: {
        type: Number,
        required: true
    },
    equipment:{
        type: String,
        required: true
    },
    steps:{
        type: [String],
        required: true
    },
    caloriesBurned:{
        type: Number,
        required: true
    },
    muscleGroup:{
        type: String,
        required: true
    },
    trainerId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    participants:[
        {
            userId:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date:{
                type: Date,
                required: true
            },
            duration:{
                type: Number,
                required: true
            }
        }
    ]
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;