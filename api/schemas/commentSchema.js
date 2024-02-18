/**
 * @openapi
 * components:
 *   schemas:
 *     commentSchema:
 *       type: object
 *       required:
 *         - text_comment
 *         - id_video
 *         - user_email
 *       properties:
 *         text_comment:
 *           type: string
 *           default: "El video parece ser que est dañado"
 *         id_video:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: "65d162bbe7e2a16a248f256e"
 *         user_email:
 *           type: string
 *           default: "olitaperez@gmail.com"
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     commentUpdateSchema:
 *       type: object
 *       required:
 *         - text_comment
 *         - id_video
 *         - user_email
 *         - state
 *       properties:
 *         text_comment:
 *           type: string
 *           default: "El video parece ser que est dañado"
 *         id_video:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: "65d162bbe7e2a16a248f256e"
 *         user_email:
 *           type: string
 *           default: "olitaperez@gmail.com"
 *         state:
 *           type: Number
 *           default: 1
 */