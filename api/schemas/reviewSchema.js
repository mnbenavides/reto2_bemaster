/**
 * @openapi
 * components:
 *   schemas:
 *     reviewSchema:
 *       type: object
 *       required:
 *         - id_video
 *         - id_user
 *         - score
 *       properties:
 *         id_video:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: "65d0d9e570de3c24a2350b88"
 *         id_user:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: "65d1fa8d8334d9577ad01b83"
 *         score:
 *           type: Number
 *           default: 5
 */