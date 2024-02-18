const express = require('express');
const router = express.Router();
const authToken = require('../middleware/AuthToken');
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const commentController = require('../controllers/commentController');
const reviewController = require('../controllers/reviewController');


//--------------------------------------ROLES-----------------------------------------------------------------

/**
 * @openapi
 *  /users:
 *   post:
 *     tags:
 *       - SigIn
 *     summary: Registrar un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createdUser'
 *     responses:
 *       '200':
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuario creado correctamente"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               error: "Existe una cuenta asociada a tu dirección de correo electrónico. Si considera que es un error por favor comuníquese con el administrador"
 */
router.post('/users', userController.sigIn);
/**
 * @openapi
 *  /auth/login:
 *   post:
 *     tags:
 *       - LogIn
 *     summary: Crear sesion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/logIn'
 *     responses:
 *       '200':
 *         description: Usuario logueado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuario logueado correctamente"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               error: "Por favor ingrese todos los campos requeridos"
 */
router.post('/auth/login', authController.logIn);


/**
 * @openapi
 *  /roles:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Registrar un rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/roleSchema'
 *     responses:
 *       '200':
 *         description: Rol creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "Rol creado correctamente"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 *   get:
 *     tags:
 *       - Roles
 *     summary: Obtener todos los roles 
 *     responses:
 *       '200':
 *         description: Obtener todos los roles actuales
 *         content:
 *           application/json:
 *             example:
 *               message: "roles:[{...}]"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 */
router.post('/roles', authToken('administrator'), roleController.createRole);
router.get('/roles', authToken('administrator'), roleController.getAllRole);
  /**
   * @openapi
   * '/role/{id}':
   *  get:
   *     tags: 
   *     - Roles
   *     summary: Obtener solo un rol por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del rol
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "roles:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   *  put:
   *     tags: 
   *     - Roles
   *     summary: Modificar solo un rol por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del rol
   *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/roleSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "roles:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   *  delete:
   *     tags:
   *     - Roles
   *     summary: Eliminar solo un rol por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del rol
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "Rol desactivado correctamente"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/role/:id', authToken('administrator'), roleController.getRoleById);
router.delete('/role/:id', authToken('administrator'), roleController.deleteRole);
router.put('/role/:id', authToken('administrator'), roleController.updateRole);

 /**
   * @openapi
   * '/roles/inactive':
   *  get:
   *     tags: 
   *     - Roles
   *     summary: Obtener todos los roles que han sido desactivados
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "roles:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/roles/inactive', authToken('administrator'), roleController.getRoleInactive);
 /**
   * @openapi
   * '/roles/active':
   *  get:
   *     tags: 
   *     - Roles
   *     summary: Obtener todos los roles activos
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "roles:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/roles/active', authToken('administrator'), roleController.getRoleActive);


//--------------------------------------USUARIOS-----------------------------------------------------------------

/**
 * @openapi
 * '/users':
  *   get:
*     tags:
*     - Users
 *     summary: Obtener todos los usuarios 
 *     responses:
 *       '200':
 *         description: Obtener todos los usuarios actuales
 *         content:
 *           application/json:
 *             example:
 *               message: "usuarios:[{...}]"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 */
router.get('/users', authToken('administrator'), userController.getAllUser);
  /**
   * @openapi
   * '/user/{id}':
   *  get:
   *     tags:
   *     - Users
   *     summary: Obtener solo un usuario por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del usuario
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "usuarios:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   *  put:
   *     tags: 
   *     - Users
   *     summary: Modificar solo un usuario por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del usuario
   *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/userSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "roles:[{..}"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
   *  delete:
   *     tags: 
   *     - Users
   *     summary: Eliminar solo un usuario por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del usuario
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "Usario desactivado correctamente"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/user/:id', authToken('administrator'), userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', authToken('administrator'), userController.deleteUser);

 /**
   * @openapi
   * '/users/inactive':
   *  get:
   *     tags: 
   *     - Users
   *     summary: Obtener todos los usuarios que han sido desactivados
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "users:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/users/inactive', authToken('administrator'), userController.getUserInactive);
 /**
   * @openapi
   * '/users/active':
   *  get:
   *     tags: 
   *     - Users
   *     summary: Obtener todos los usuarios activos
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "usuarios:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/users/active', authToken('administrator'), userController.getUserActive);


//--------------------------------------VIDEOS-----------------------------------------------------------------


/**
 * @openapi
 *  /videos:
 *   post:
 *     tags:
 *       - Videos
 *     summary: Registrar un video
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/videoSchema'
 *     responses:
 *       '200':
 *         description: video creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "video creado correctamente"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 *   get:
*     tags:
 *     - Videos
 *     summary: Obtener todos los videos 
 *     responses:
 *       '200':
 *         description: Obtener todos los videos actuales
 *         content:
 *           application/json:
 *             example:
 *               message: "videos:[{...}]"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 */
router.post('/videos', authToken(['administrator', 'author']), videoController.uploadVideo);
router.get('/videos', authToken('administrator'), videoController.getAllVideo);



  /**
   * @openapi
   * '/video/{id}':
   *  get:
   *     tags:
   *     - Videos
   *     summary: Obtener solo un video por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
    *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   *  put:
   *     tags: 
   *     - Videos
   *     summary: Modificar solo un video por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/videoUpdateSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
  *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   *  delete:
   *     tags: 
   *     - Videos
   *     summary: Eliminar solo un video por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "Video desactivado correctamente"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/video/:id', authToken('administrator'), videoController.getVideoById);
router.put('/video/:id', authToken(['administrator', 'author']), videoController.updateVideo);
router.delete('/video/:id', authToken(['administrator', 'author']), videoController.deleteVideo);


  /**
   * @openapi
   * '/video/{id}/collaborators':
   *  put:
   *     tags: 
   *     - Videos
   *     summary: Agregar los colaboradores a un video por medio del id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/videoUpdateCollaboratorSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "video:[{..}"
  *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.put('/video/:id/collaborators', authToken(['administrator', 'author']), videoController.addColaborator);
  /**
   * @openapi
   * '/video/author/{id}':
   *  get:
   *     tags:
   *     - Videos
   *     summary: Obtener video de un autor
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del autor
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
    *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/video/author/:id', authToken('administrator'), videoController.getAuthorVideo);
  /**
   * @openapi
   * '/video/collaborator/{id}':
   *  get:
   *     tags:
   *     - Videos
   *     summary: Obtener video de un colabroador
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del colaborador
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
    *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/video/collaborator/:id', authToken('administrator'), videoController.getCollaboratorVideo);
  /**
   * @openapi
   * '/videos/public':
   *  get:
   *     tags:
   *     - Videos
   *     summary: Obtener videos publicos activos
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   */
router.get('/videos/public', videoController.getPublicVideo);
  /**
   * @openapi
   * '/videos/private':
   *  get:
   *     tags:
   *     - Videos
   *     summary: Obtener videos privados activos
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
    *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/videos/private', authToken(['administrator', 'author', 'public user', 'collabroator']), videoController.getPublicVideo);
  /**
   * @openapi
   * '/video/{id}/likes':
   *  put:
   *     tags: 
   *     - Videos
   *     summary: Agregar un like al video de un usuario
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/videoLikesSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "video:[{..}"
  *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
   */
router.put('/video/:id/likes', videoController.addLike);
 /**
   * @openapi
   * '/video/{id}/likes':
   *  get:
   *     tags:
   *     - Videos
   *     summary: Obtener informacion de los usuarios que agregaron like al video
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "users:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
    *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/video/:id/likes', authToken(['administrator', 'author','collabroator']), videoController.getUserWhoLiked);
 /**
   * @openapi
   * '/videos/inactive':
   *  get:
   *     tags: 
   *     - Videos
   *     summary: Obtener todos los videos que han sido desactivados
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/videos/inactive', authToken('administrator'), videoController.getVideoInactive);
/**
   * @openapi
   * '/videos/active':
   *  get:
   *     tags: 
   *     - Videos
   *     summary: Obtener todos los videos activos
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "videos:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/videos/active', authToken('administrator'), videoController.getAllVideo);


//--------------------------------------COMENTARIOS-----------------------------------------------------------------



/**
 * @openapi
 *  /comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Registrar un comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/commentSchema'
 *     responses:
 *       '200':
 *         description: comentario creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "comentario creado correctamente"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *   get:
*     tags:
*     - Comments
 *     summary: Obtener todos los comentario 
 *     responses:
 *       '200':
 *         description: Obtener todos los comentarios actuales
 *         content:
 *           application/json:
 *             example:
 *               message: "comentarios:[{...}]"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 */
router.post('/comments', commentController.createComment);
router.get('/comments', authToken('administrator'), commentController.getAllComment);

   /**
   * @openapi
   * '/comment/{id}':
   *  get:
   *     tags:
   *     - Comments
   *     summary: Obtener solo un comentario por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del comentario
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "comentario:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   *  put:
   *     tags: 
   *     - Comments
   *     summary: Modificar solo un video por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/commentUpdateSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "comentarios:[{..}"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   *  delete:
   *     tags: 
   *     - Comments
   *     summary: Eliminar solo un comentario por medio de id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del comentario
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "comentario desactivado correctamente"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/comment/:id', authToken('administrator'), commentController.getCommentById);
router.put('/comment/:id', authToken('administrator'), commentController.updateComment);
router.delete('/comment/:id', authToken('administrator'), commentController.deleteComment);
 /**
   * @openapi
   * '/comments/inactive':
   *  get:
   *     tags: 
   *     - Comments
   *     summary: Obtener todos los comentarios que han sido desactivados
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "comments:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/comments/inactive', authToken('administrator'), commentController.getCommentInactive);
 /**
   * @openapi
   * '/comments/active':
   *  get:
   *     tags: 
   *     - Comments
   *     summary: Obtener todos los roles comentarios activos
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "comments:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
   *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/comments/active', authToken('administrator'), commentController.getCommentActive);
 /**
   * @openapi
   * '/comments/user/{id}':
   *  get:
   *     tags:
   *     - Comments
   *     summary: Obtener los comentarios del usuario
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del usuario
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "comentarios:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
    *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/comments/user/:id', authToken(['administrator']), commentController.getCommentByUser);
 /**
   * @openapi
   * '/comments/video/{id}':
   *  get:
   *     tags:
   *     - Comments
   *     summary: Obtener los comentarios del video
   *     parameters:
   *      - name: id
   *        in: path
   *        description: id del video
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *             example:
   *               message: "comentarios:[{..}"
   *       '400':
   *         description: Error de datos ingresados
   *         content:
   *           application/json:
   *             example:
   *               message: "Por favor ingrese todos los campos "
    *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
   */
router.get('/comments/video/:id', authToken(['administrator', 'author', 'collabroator']), commentController.getCommentByVideo);



//--------------------------------------RESEÑAS-----------------------------------------------------------------

/**
 * @openapi
 *  /reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Registrar una reseña 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reviewSchema'
 *     responses:
 *       '200':
 *         description: reseña creada correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: "reseña creada correctamente"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 *   get:
*     tags:
*     - Reviews 
 *     summary: Obtener todos las reseñas 
 *     responses:
 *       '200':
 *         description: Obtener todos las reseñas actuales
 *         content:
 *           application/json:
 *             example:
 *               message: "reviews:[{...}]"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 */
router.post('/reviews',authToken(['administrator', 'author', 'collabroator']), reviewController.createReview);
router.get('/reviews', authToken('administrator'), reviewController.getAllReview);

/**
 * @openapi
 *  /reviews/video/popular:
 *   get:
*     tags:
*     - Reviews 
 *     summary: Obtener los 3 videos con mejor calificacion
 *     responses:
 *       '200':
 *         description: Obtener los 3 videos con mejor calificacion
 *         content:
 *           application/json:
 *             example:
 *               message: "videos:[{...}]"
 *       '400':
 *         description: Error de datos ingresados
 *         content:
 *           application/json:
 *             example:
 *               message: "Por favor ingrese todos los campos "
 *       '403':
 *         description: Autorización denegada
 *         content:
 *           application/json:
 *             example:
 *               message: "No tiene permisos suficientes para estar aqui"
 */
router.get('/reviews/video/popular',authToken(['administrator', 'author', 'collabroator']), reviewController.getTop3Video);




module.exports = router;