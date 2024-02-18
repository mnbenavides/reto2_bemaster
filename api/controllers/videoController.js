const  videoService = require('../services/videoService.js');

//Metodo que permite crer un video
const uploadVideo = async (req, res) => {
    try {
      const result = await videoService.uploadVideo(req.body);
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



//Metodo que permite agregar autores del video
const addColaborator = async (req, res) => {
    try {
      const result = await videoService.addColaborator(req.params.id, req.body);
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


//Metodo que permite obtener todos los videos
const getAllVideo = async (req, res) => {
    try {
      const result = await videoService.getAllVideo();
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


//Metodo que permite obtener todos los videos que estan activos
const getVideoActive = async (req, res) => {
    try {
      const result = await videoService.getVideoActive();
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
  

//Metodo que permite obtener todos los videos que estan inactivos
const getVideoInactive = async (req, res) => {
    try {
      const result = await videoService.getVideoInactive();
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
 

//Metodo que permite obtener un video
const getVideoById = async (req, res) => {
    try {
      const result = await videoService.getVideoById(req.params.id);
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


//Metodo que permite obtener los videos de un autor
const getAuthorVideo = async (req, res) => {
    try {
      const result = await videoService.getAuthorVideo(req.params.id);
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


//Metodo que permite obtener los videos de un colabroador
const getCollaboratorVideo = async (req, res) => {
    try {
      const result = await videoService.getCollaboratorVideo(req.params.id);
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


//Metodo que permite obtener todos los videos publicos
const getPublicVideo = async (req, res) => {
    try {
      const result = await videoService.getPublicVideo();
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


//Metodo que permite obtener todos los videos privados
const getPrivateVideo = async (req, res) => {
    try {
      const result = await videoService.getPrivateVideo();
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


//Metodo que permite obtener los usuarios quien le ha dado like al usuario
const getUserWhoLiked = async (req, res) => {
    try {
      const result = await videoService.getUserWhoLiked(req.params.id);
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

//Metodo que permite modificar un video por medio del id
const updateVideo = async (req, res) => {
    try {
      const result = await videoService.updateVideo(req.params.id, req.body);
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



//Metodo que permite cambiar los colaboradores del video
const addLike = async (req, res) => {
    try {
      const result = await videoService.addLike(req.params.id, req.body);
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


//Metodo que elmininar un usuario
const deleteVideo = async (req, res) => {
    try {
      const result = await videoService.deleteVideo(req.params.id);
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
    uploadVideo,
    addColaborator,
    getAllVideo,
    getVideoActive,
    getVideoInactive,
    getVideoById,
    getAuthorVideo,
    getCollaboratorVideo,
    getPublicVideo,
    getPrivateVideo,
    getUserWhoLiked,
    updateVideo,
    addLike,
    deleteVideo
}