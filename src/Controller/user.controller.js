import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from '../Models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res, next) => {
    // 1 get the data from the user 
    // 2 validation   -- not empty 
    // chek if user already exist : using email or name
    // check for images & cheack for avatar
    // upload on the cloudinary , avtar check
    // create user object
    // remove password and refresh token filed from res 
    // check for user creation 
    // return res  y


    const { fullName, username, email, password } = req.body
    console.log(username, email, password)

    if (
        [fullName, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field are required")
    }
    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    const avatarLocalPAth = req.files?.avatar[0]?.path
    // console.log(avatarLocalPAth);
    const coverImageLocalPath = req.files?.coverImage[0]?.path4

    if (!avatarLocalPAth) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPAth)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    if (!coverImage) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCasae(),
        email,
        password,
    })

    const createdUser = await User.findByID(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register successfully")
    )
})


export {
    registerUser
}