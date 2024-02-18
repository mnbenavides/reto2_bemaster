
const Video = require('../../database/model/Video.js');
const User = require('../../database/model/User.js');
const Review = require('../../database/model/Review.js');


//Metodo para crear un comentario
const createReview = async (body) => {
    let score = body.score;
    const id_video = body.id_video;
    const id_user = body.id_user;

    if (!score || !id_video || !id_user) throw new Error('Por favor ingrese todos los campos requeridos para crear la reseña');

    if (score <= 0 || score > 5) throw new Error('El puntaje es de 1 a 5. Por favor intentalo nuevamente');

    const searched_video = await Video.findById(id_video);
    if (!searched_video) throw new Error('No se pudo encontrar el video. Por favor inténtelo nuevamente');
  
    const searched_user = await User.findById(id_user);
    if (!searched_user) throw new Error('No se pudo encontrar el usuario. Por favor inténtelo nuevamente');

    const existingReview = await Review.findOne({ $and: [{ state: 1 }, { user: id_user }, {video: id_video}] });
    if (existingReview) {
        throw new Error('El usuario ya ha registrado una reseña del video');
    }

    //Crear el usuario
    await Review.create({
      score: score,
      video: id_video,
      user: id_user
    });
    
    return 'Reseña creada correctamente';
};


//Metodo para obtener todos los comentario creados
const getAllReview = async () => {
  const review = await Review.find({});
  if (!review) throw new Error('No se pudo encontrar las reseñas');
  const res = { msj: 'Reviews', review: review };
  return res;
};


const getTop3Video = async () =>{
  const videos = await Video.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'video',
        as: 'reviews'
      }
    },
    { $match: { 'reviews.state': 1 } }, // Filter for reviews with state 1
    {
      $group: {
        _id: '$reviews.video', // Group by video ID from joined reviews
      }
    },
    {
      $lookup: { // Second lookup to populate video details
        from: 'videos', // Change to your actual video collection name
        localField: '_id', // Use the grouped video ID
        foreignField: '_id', // Match with actual video ID in video collection
        as: 'video' // Store data in "video" array
      }
    },
    { $unwind: '$video' }, // Unwind the single video document
    { $project: { 
      _id: 0, 
      videoId: '$video._id', 
      title: '$video.title', 
      description: '$video.description', 
      date_publication: '$video.date_publication'
    } },
    { $sort: { totalScore: -1 } },
    { $limit: 3 }
  ]);


  /*const videos = await Review.aggregate([
    {
      $group: {
        _id: "$video",
        totalScore: { $sum: "$score" },
        averageScore: { $avg: "$score" },
        reviewCount: { $sum: 1 }
      }
    },
    {
      $sort: {
        totalScore: -1,  // Sort by total score in descending order
        averageScore: -1, // Tiebreaker: Sort by average score in descending order
        reviewCount: -1   // Tiebreaker: Sort by review count in descending order
      }
    },
    {
      $limit: 1  // Limit to the top 1 result (the most popular video)
    }
  ]);*/

  if (!videos) throw new Error('No se pudo encontrar los videos');
  const res = { msj: 'Reviews', videos: videos };
  return res;

}

module.exports = {
    getTop3Video,
    createReview,
    getAllReview
}