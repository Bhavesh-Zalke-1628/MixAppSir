
import mongoose, { model, Schema } from "mongoose";


const tweetSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        owener: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)


export const Tweet = model('Tweet', tweetSchema)