const express = require('express');
const router = express.Router();
const authToken = require('../middleware/AuthToken');
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const commentController = require('../controllers/commentController');
const reviewController = require('../controllers/reviewController');
const resetPassController = require('../controllers/resetPassController');


//ruta que permite CREAR un USUARIO
router.post('/users', userController.sigIn);
//ruta que permite LOGEAR un USUARIO
router.post('/auth/login', authController.logIn);


//ruta que permite CREAR un ROL
router.post('/roles', authToken('administrator'), roleController.createRole);
//ruta que permite OBTENER TODOS los roles creados
router.get('/roles', authToken('administrator'), roleController.getAllRole);
//ruta que permite OBTENER todos los ROLES que estan activos
router.get('/roles/active', authToken('administrator'), roleController.getRoleActive);
//ruta que permite OBTENER un ROL por medio del id
router.get('/role/:id', authToken('administrator'), roleController.getRoleById);
//ruta que permite MODIFICAR un ROL
router.put('/role/:id', authToken('administrator'), roleController.updateRole);
//ruta que permite ELIMINAR un ROL
router.delete('/role/:id', authToken('administrator'), roleController.deleteRole);
//ruta que permite OBTENER todos los ROLES que estan inactivos
router.get('/roles/inactive', authToken('administrator'), roleController.getRoleInactive);



//ruta que permite OBTENER TODOS los usuarios creados
router.get('/users', authToken('administrator'), userController.getAllUser);
//ruta que permite OBTENER todos los usuarios que estan activos
router.get('/users/active', authToken('administrator'), userController.getUserActive);
//ruta que permite OBTENER un usuario por medio del id
router.get('/user/:id', authToken('administrator'), userController.getUserById);
//ruta que permite MODIFICAR un usuario
router.put('/user/:id', userController.updateUser);
//ruta que permite ELIMINAR un usuario
router.delete('/user/:id', authToken('administrator'), userController.deleteUser);
//ruta que permite OBTENER todos los USUARIO que estan inactivos
router.get('/users/inactive', authToken('administrator'), userController.getUserInactive);


//ruta que permite SUBIR un video
router.post('/videos', authToken(['administrator', 'author']), videoController.uploadVideo);
//ruta que permite AGREGAR los colaboradores del video
router.put('/video/:id/collaborators', authToken(['administrator', 'author']), videoController.addColaborator);
//ruta que permite OBTENER TODOS los videos creados
router.get('/videos', authToken('administrator'), videoController.getAllVideo);
//ruta que permite OBTENER TODOS los videos que esta activos
router.get('/videos/active', authToken('administrator'), videoController.getAllVideo);
//ruta que permite OBTENER TODOS los videos que esta inactivos
router.get('/videos/inactive', authToken('administrator'), videoController.getVideoInactive);
//ruta que permite OBTENER un video por medio del id
router.get('/video/:id', authToken('administrator'), videoController.getVideoById);
//ruta que permite OBTENER los videos de un autor
router.get('/video/author/:id', authToken('administrator'), videoController.getAuthorVideo);
//ruta que permite OBTENER los videos de un colaborador
router.get('/video/collaborator/:id', authToken('administrator'), videoController.getCollaboratorVideo);
//ruta que permite OBTENER TODOS los videos publicos
router.get('/videos/public', videoController.getPublicVideo);
//ruta que permite OBTENER TODOS los videos privados
router.get('/videos/private', authToken(['administrator', 'author', 'public user', 'collabroator']), videoController.getPublicVideo);
//ruta que permite AGREGAR like del usuario
router.put('/video/:id/likes', videoController.addLike);
//ruta que permite OBTENER informacion de usuarios que le han dado like al video
router.get('/video/:id/likes', authToken(['administrator', 'author','collabroator']), videoController.getUserWhoLiked);
//ruta que permite MODIFICAR EL video
router.put('/video/:id', authToken(['administrator', 'author']), videoController.updateVideo);


//ruta que permite crear un comentario
router.post('/comments', commentController.createComment);
//ruta que permite OBTENER TODOS los comentarios creados
router.get('/comments', authToken('administrator'), commentController.getAllComment);
//ruta que permite OBTENER todos los comentarios que estan activos
router.get('/comments/active', authToken('administrator'), commentController.getCommentActive);
//ruta que permite OBTENER un comentario por medio del id
router.get('/comment/:id', authToken('administrator'), commentController.getCommentById);
//ruta que permite MODIFICAR un comentario
router.put('/comment/:id', authToken('administrator'), commentController.updateComment);
//ruta que permite ELIMINAR un comentario
router.delete('/comment/:id', authToken('administrator'), commentController.deleteComment);
//ruta que permite OBTENER todos los comentarios que estan inactivos
router.get('/comments/inactive', authToken('administrator'), commentController.getCommentInactive);
//Ruta que permtite OBTENER los comentarios por usuario
router.get('/comments/user', authToken(['administrator']), commentController.getCommentByUser);
//Ruta que permtite OBTENER los comentarios del video
router.get('/comments/video/:id', authToken(['administrator', 'author', 'collabroator']), commentController.getCommentByVideo);


//ruta que permite agregar puntuacion al video
router.post('/reviews',authToken(['administrator', 'author', 'collabroator']), reviewController.createReview);
//ruta que permite OBTENER TODOS los usuarios creados
router.get('/reviews', authToken('administrator'), reviewController.getAllReview);
//obtener los 3 videos mejores calificados
router.get('/reviews/video/popular',authToken(['administrator', 'author', 'collabroator']), reviewController.getTop3Video);




module.exports = router;