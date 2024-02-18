//Importaciones
const Comment = require('../../database/model/Comment.js');
const User = require('../../database/model/User.js');
const Video = require('../../database/model/Video.js');
const regexValidator = require('../utility/regexValidator.js');

//Metodo para crear un comentario
const createComment = async (body) => {
  let text_comment = body.text_comment;
  const id_video = body.id_video;
  let user_email = body.user_email;

  if (!text_comment || !id_video || !user_email) throw new Error('Por favor ingrese todos los campos requeridos para subir el video');
  user_email = user_email.toLowerCase();
  regexValidator.validatorEmail(user_email); //validar el email
  const searched_video = await Video.findById(id_video);
  if (!searched_video) throw new Error('No se pudo encontrar el video. Por favor inténtelo nuevamente');
  text_comment = text_comment.toLowerCase();

  //Crear el usuario
  await Comment.create({
    text_comment: text_comment,
    video: id_video,
    user_email: user_email
  });
  
  return 'Comentario creado correctamente';
};

//Metodo para obtener todos los comentario creados
const getAllComment = async () => {
  const comment = await Comment.find({});
  if (!comment) throw new Error('No se pudo encontrar los comentarios');
  const res = { msj: 'Comments', comment: comment };
  return res;
};

//Metodo para obtener todos los comentarios creados activos
const getCommentActive = async () => {
  const comment = await Comment.find({ state: 1 });
  if (!comment) throw new Error('No se pudo encontrar los comentarios');
  const res = { msj: 'Comment', comment: comment };
  return res;
};

//Metodo para obtener todos los comentarios creados inactivos
const getCommentInactive = async () => {
  const comment = await Comment.find({ state: 0 });
  if (!comment) throw new Error('No se pudo encontrar los comentarios');
  const res = { msj: 'Comment', comment: comment };
  return res;
};

// Metodo para obtener un comentario por medio del ID
const getCommentById = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new Error('No se pudo encontrar el comentario');
  const res = { msj: 'Comment', comment: comment };
  return res;
};


//Metodo paraobtener los comentarios de un usuarios
const getCommentByUser = async (query) => {
  let user_email = query.user_email;
  if (!user_email) throw new Error('Por favor ingrese todos los campos requeridos'); 
  const comment = await Comment.find({ $and: [{ state: 1 }, { user_email: user_email }] });
  if (!comment) throw new Error('No se pudo encontrar los comentarios');
  const res = { msj: 'Comment', comment: comment };
  return res;
};


//Metodo para obtener los comentarios de un video
const getCommentByVideo = async (id) => {
    const comment = await Comment.find({ $and: [{ state: 1 }, { video: id }] }).populate('video');
    if (!comment) throw new Error('No se pudo encontrar los comentarios');
    const res = { msj: 'Comment', comment: comment };
    return res;
};
  


//Metodo para modificar un comentario
const updateComment = async (id, body) => {
  //validar que exista el id en estado 1
  const searched_id = await Comment.findById(id);
  if (!searched_id) throw new Error('No se pudo encontrar el comentario. Por favor inténtelo nuevamente');
 
   if(body.user_email){
    body.user_email = body.user_email.toLowerCase();
    regexValidator.validatorEmail(body.user_email); //validar el email
  }

  if(body.text_comment){
    body.text_comment = body.text_comment.toLowerCase();
  }

  if(body.video){
    const searched_video = await Video.findById(body.video);
    if (!searched_video) throw new Error('No se pudo encontrar el video. Por favor inténtelo nuevamente');
  }

  //modificar el comentario
  const comment = await Comment.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true }
  );
  if (!comment) throw new Error('No se pudo modificar el comentario');
  const res = { msj: 'Comment', comment: comment };
  return res;
};
  
//Metodo para borrar un comentario
const deleteComment = async (id) => {
  const searched_comment = await Comment.findById(id);
  if (!searched_comment) throw new Error('No se pudo encontrar el comentario. Por favor inténtelo nuevamente');
  const comment = await Comment.findOneAndUpdate(
    { _id: id },
    { state: 0 },
    { new: true }
  );
  if (!comment) throw new Error('No se pudo inactivar el comentario');
  return 'Comentario inactivado correctamente';
};



module.exports = {
    createComment,
    getAllComment,
    getCommentActive,
    getCommentInactive,
    getCommentById,
    updateComment,
    getCommentByUser,
    deleteComment,
    getCommentByVideo    
}