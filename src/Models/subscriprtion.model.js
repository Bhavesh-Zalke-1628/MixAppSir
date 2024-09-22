import { model, Schema } from "mongoose";

const subScriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, //one who subscribing 
        ref: 'User'
    },
    chanel: {
        type: Schema.Types.ObjectId, //one who subscribing 
        ref: 'User'
    }
}, { timestamps: true })


export const Subscription = model('subscriptions', subScriptionSchema)