import mongoose, { model, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const commnetSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
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

commnetSchema.plugin(mongooseAggregatePaginate)

export const Comment = model('Comment', commnetSchema)