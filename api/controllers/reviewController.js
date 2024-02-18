
const reviewService = require('../services/reviewService.js');


//Metodo que permite crer una reseña
const createReview = async (req, res) => {
    try {
      const result = await reviewService.createReview(req.body);
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

//Metodo que permite obtener todos las reseñas
const getAllReview = async (req, res) => {
  try {
    const result = await reviewService.getAllReview();
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

//Metodo que permite obtener todos 3 videos mejor calificados
const getTop3Video = async (req, res) => {
    try {
      const result = await reviewService.getTop3Video();
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


module.exports = {
    getTop3Video,
    createReview,
    getAllReview
}