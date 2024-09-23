import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    console.log(title, description)
    // TODO: get video, upload to cloudinary, create video

    console.log('hello')
    if (!title || !description) {
        throw new ApiError(401, "Title and description is required")
    }
    console.log(req.files)
    const videoLocalPath = req.files.videoFile[0].path
    const thumbnailLocalPath = req.files.thumbnail[0].path

    if (!thumbnailLocalPath) {
        throw new ApiError(401, "thumbnail is required")
    }
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!videoLocalPath) {
        throw new ApiError(401, "Video is required")
    }

    const uplodedVideo = await uploadOnCloudinary(videoLocalPath)
    console.log(uplodedVideo)
    if (!uplodedVideo) {
        throw new ApiError(401, "Video not uploaded successfully")
    }

    const video = await Video.create({
        title,
        description,
        videoFile: uplodedVideo.url,
        thumbnail: thumbnail.url,
        duration: 12,
        isPublished: true,
    })

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video published successfully"))
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    try {

        // Cast videoId to a valid ObjectId if necessary
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            throw new ApiError(400, "Invalid video ID format");
        }

        // Fetch video by ID
        const video = await Video.findById(videoId);

        if (!video) {
            throw new ApiError(404, "Video not found");
        }

        console.log(video); // for debugging
        return res
            .status(200)
            .json(new ApiResponse(200, video, "Video fetched successfully"));
    } catch (error) {
        throw new ApiError(401, "Failed get the video")
    }
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    const { title, description } = req.body
    const thumbnailLocalPath = req.file?.path

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail file is missing");
    }

    const thumbnailImg = await uploadOnCloudinary(thumbnailLocalPath)

    if (!thumbnailImg.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const video = await Video.findByIdAndUpdate(videoId,
        {
            $set: {
                thumbnail: thumbnailImg.url,
                title,
                description
            }
        },
        { new: true }
    ).select('-password')

    console.log('video', video)
    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video updated successfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    const video = await Video.findByIdAndDelete(videoId)

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !isPublished
            }
        }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video toggle successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
