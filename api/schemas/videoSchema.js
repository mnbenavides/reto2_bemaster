/**
 * @openapi
 * components:
 *   schemas:
 *     videoSchema:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - id_uploader_user
 *         - date_publication
 *         - id_author
 *       properties:
 *         name:
 *           type: string
 *           default: "Crepusculo"
 *         description:
 *           type: string
 *           default: "Pelicula romantica basada en vampiros"
 *         id_uploader_user:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: "65d0d9e570de3c24a2350b88"
 *         date_publication:
 *           type: string
 *           default: "12/07/2013"
 *         id_author:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: ["65d0d9e570de3c24a2350b88", "65d0da2d70de3c24a2350b8e"]
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     videoUpdateSchema:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - id_uploader_user
 *         - date_publication
 *         - id_author
 *         - is_private
 *         - state
 *       properties:
 *         name:
 *           type: string
 *           default: "Crepusculo"
 *         description:
 *           type: string
 *           default: "Pelicula romantica basada en vampiros"
 *         id_uploader_user:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: "65d0d9e570de3c24a2350b88"
 *         date_publication:
 *           type: string
 *           default: "12/07/2013"
 *         id_author:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: ["65d0d9e570de3c24a2350b88", "65d0da2d70de3c24a2350b8e"]
 *         is_private:
 *           type: boolean
 *           default: true
 *         state:
 *           type: Number
 *           default: 1
 */




/**
 * @openapi
 * components:
 *   schemas:
 *     videoUpdateCollaboratorSchema:
 *       type: object
 *       required:
 *         - collaborator
 *       properties:
 *         collaborator:
 *           type: mongoose.Schema.Types.ObjectId
 *           default: ["65d0da8470de3c24a2350b9a", "65d0da6870de3c24a2350b94"]
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     videoLikesSchema:
 *       type: object
 *       required:
 *         - user_name
 *         - email
 *       properties:
 *         user_name:
 *           type: string
 *           default: "edgarm"
 *         email:
 *           type: string
 *           default: "edgarramirez@gmail.com"
 */