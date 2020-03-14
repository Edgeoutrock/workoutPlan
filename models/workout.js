const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise name"
            
                },
                duration: {
                    type: Number,
                    required: "Enter an exercise duration in minutes"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

workoutSchema.virtual("totalDuration").get(function() {
    // "reduce" is a method with javascript where the numbers in an array are manipulated to form one number given an argument... for example, the array could be the total of all numbers or the difference of all numbers in array starting from a number

    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
        // so total is just accumulating the duration like total += duration[i]; with a for loop
    }, 0);
    });

const Workout = mongoose.model("Workout". workoutSchema);

module.exports = Workout;