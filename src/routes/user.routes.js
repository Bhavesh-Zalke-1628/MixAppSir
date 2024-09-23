import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChanelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetailed, updateUserAvatar, updateUserCoverImage } from "../controller/user.controller.js";
import { upload } from '../middleware/multer.middleware.js'
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(verifyJWT, changeCurrentPassword)
router.route('/current-user').get(verifyJWT, getCurrentUser)
router.route('/update-account').patch(verifyJWT, updateAccountDetailed)
router.route('/avatar').patch(verifyJWT, upload.single('avatar'), updateUserAvatar)
router.route('/cover-image').patch(verifyJWT, upload.single('coverImage'), updateUserCoverImage)
router.route('/c/:username').get(verifyJWT, getUserChanelProfile)
router.route('/history').get(verifyJWT, getWatchHistory)

export default router