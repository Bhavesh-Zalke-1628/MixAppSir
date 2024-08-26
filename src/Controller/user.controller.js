import { asyncHandler } from "../utils/asynHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .json({
            message: "Ok"
        })
})


export {
    registerUser
}