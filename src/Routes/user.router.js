import { Router } from "express";
import { registerUser } from "../Controller/user.controller.js";
import { upload } from '../MiddleWare/multer.middlerware.js'
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


export default router