import { Router } from 'express';

import { verifyJWT } from '../middleware/auth.middleware.js';
import { addComment, updateComment, getVideoComments, deleteComment } from '../Controller/comment.controller.js';


const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").get(getVideoComments).post(addComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router