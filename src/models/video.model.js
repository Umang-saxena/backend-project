import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

videoSchema.plugin(mongooseAggregatePaginate); // Enables aggregation pipelines for pagination



const videoSchema = new Schema({
    videoFile: {
        type: String, // Cloudinary URL here,
        required: true
    },
    thumbnail: {
        type: String, // Cloudinary URL here,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // Duration will be extracted from cloudinary
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId, // array of object ids
        ref: "User",
        required: true,
    },
},{timestamps:true}); // createdAt and updatedAt fields will be added automatically

const Video = mongoose.model("Video", videoSchema);