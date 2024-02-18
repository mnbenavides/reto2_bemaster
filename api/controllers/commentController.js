const commentService = require('../services/commentService.js');

//Metodo que permite crer un comentario
const createComment = async (req, res) => {
  try {
    const result = await commentService.createComment(req.body);
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};


//Metodo que permite obtener todos los comentarios
const getAllComment = async (req, res) => {
  try {
    const result = await commentService.getAllComment();
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};


//Metodo que permite obtener todos los comentarios que estan activos
const getCommentActive = async (req, res) => {
  try {
    const result = await commentService.getCommentActive();
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};


//Metodo que permite obtener todos los comentarios que estan inactivos
const getCommentInactive = async (req, res) => {
  try {
    const result = await commentService.getCommentInactive();
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};

//Metodo que permite obtener un comentario
const getCommentById = async (req, res) => {
  try {
    const result = await commentService.getCommentById(req.params.id);
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};

//Metodo que permite modificar un comentario por medio del id
const updateComment = async (req, res) => {
  try {
    const result = await commentService.updateComment(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};

//Metodo que elmininar un comentario
const deleteComment = async (req, res) => {
  try {
    const result = await commentService.deleteComment(req.params.id);
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};


//Metodo que permite obtener los comentarios del usarios
const getCommentByUser = async (req, res) => {
  try {
    const result = await commentService.getCommentByUser(req.query);
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};

//Metodo que permite obtener un comentario
const getCommentByVideo = async (req, res) => {
  try {
    const result = await commentService.getCommentByVideo(req.params.id);
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
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