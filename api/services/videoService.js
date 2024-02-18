const User = require('../../database/model/User.js');
const Video = require('../../database/model/Video.js');
const regexValidator = require('../utility/regexValidator.js');
const dateValidator = require('../utility/dateValidator.js');

//Metodo que permite subir el video
const uploadVideo = async (body) => {
    let title = body.title;
    let description = body.description;
    const date_publication = body.date_publication; //DD/MM/YYY
    const id_uploader_user = body.id_uploader_user;
    let id_author = body.id_author; 

    if (!title || !description || !id_uploader_user || id_author.length == 0 || !id_author ) throw new Error('Por favor ingrese todos los campos requeridos para subir el video');

    title = title.toUpperCase();
    description = description.toLowerCase();

    regexValidator.validatorLength(title,2,60, 'title'); //validar la longitud del titulo
    dateValidator.validateDateDDMMYYYY(date_publication); //validar la fecha

    //Eliminar autores repetidos
    id_author = [...new Set(id_author)];

    //Validar que los autores ingresados esten registrados en la base de datos
    let ids_valid = true;
        
    for (const id of id_author) {
        const author = await User.find({ $and: [{ _id: id  }, { state: 1 }] });
        if (author.length == 0 || !author) throw new Error("Existe ids inválidos de autores, debe recordar que todos los autores del video deben estar registrados"); 
    }
    if (ids_valid) {
        const authors_found = await User.find({ _id: { $in: id_author } }).populate('role');
        for (const author of authors_found) {
            const name_role = author.role.name;
            if (name_role != 'author') throw new Error("Existe ids inválidos de autores, debe recordar que todos los autores del video deben estar registrados"); 
        }
    }

    
    const is_private = (body.is_private)?body.is_private:false;

    //Subir el video
    await Video.create({
        title: title,
        description: description,
        uploader_user: id_uploader_user,
        date_publication: date_publication,
        is_private: is_private,
        author: id_author,
     });
     return 'Usuario creado correctamente';

}


//Metodo  que permite agregar colaborador
const addColaborator = async (id , body) => {
    let collaborator = body.collaborator
    if (collaborator.length == 0 || !collaborator ) throw new Error('Por favor ingrese todos los campos requeridos para subir el video');

    //validar que exista el id en estado 1
    const searched_id = await Video.find({ $and: [{ _id: id  }, { state: 1 }] });
    if (!searched_id || searched_id.length == 0 ) throw new Error('No se pudo encontrar el video. Por favor inténtelo nuevamente');

    //Eliminar colaboradores repetidos
    collaborator = [...new Set(collaborator)];
    //Validar que los autores ingresados esten registrados en la base de datos
    let ids_valid = true;
        
    for (const id of collaborator) {
        const colaborrator = await User.find({ $and: [{ _id: id  }, { state: 1 }] });
        if (colaborrator.length == 0 || !colaborrator) throw new Error("Existe ids inválidos de colaboradores, debe recordar que todos los autores del video deben estar registrados"); 
    }
    if (ids_valid) {
        const colaborrators_found = await User.find({ _id: { $in: collaborator } }).populate('role');
        for (const colaborrator of colaborrators_found) {
            const name_role = colaborrator.role.name;
            if (name_role != 'collaborator') throw new Error("Existe ids inválidos de colaboradores, debe recordar que todos los autores del video deben estar registrados"); 
        }
    }

    
    await Video.findOneAndUpdate(
        { _id: id },
        { $addToSet: { collaborator: collaborator } },
        { new: true }
      ).populate('collaborator author uploader_user').select('-password');

    return "Colaborador(es) agregado(s) correctamente";

}


//Metodo para obtener todos los videos 
const getAllVideo = async () => {
    const video = await Video.find({}).populate('collaborator author uploader_user').select('-password');
    if (!video) throw new Error('No se pudo encontrar los videos');

    const res = { msj: 'Videos', video: video };
    return res;
};


//Metodo para obtener todos los videos activos
const getVideoActive = async () => {
    const video = await Video.find({ state: 1 }).populate('collaborator author uploader_user').select('-password');
    if (video.length === 0) throw new Error('No se pudo encontrar los videos');

    const res = { msj: 'Video', video: video };
    return res;
};
  
//Metodo para obtener todos los videos inactivos
const getVideoInactive = async () => {
    const video = await Video.find({ state: 0 }).populate('collaborator author uploader_user').select('-password');
    if (video.length === 0) throw new Error('No se pudo encontrar los videos');

    const res = { msj: 'Video', video: video };
    return res;
};

//Metodo para obtener el video por medio del id
const getVideoById = async (id, body) => {
    const video = await Video.findById({ _id: id }).populate('collaborator author uploader_user').select('-password');
    if (!video) throw new Error('No se pudo encontrar el video');

    const res = { msj: 'Video', video: video };
    return res;
};

//Obtener video por autor
const getAuthorVideo = async(id, body)=>{
    const found_video = await Video.find({ $and: [{ author: { $in: id } }, { state: 1 }] }).populate('uploader_user');
    if (!found_video) throw new Error('El autor aun no tiene videos asignados');

    const res = { msj: 'Video', video: found_video };
     return res;
}

//Obtener video por colaborador
const getCollaboratorVideo = async(id, body)=>{
    const found_video = await Video.find({ $and: [{ collaborator: { $in: id } }, { state: 1 }] }).populate('uploader_user');
    if (!found_video) throw new Error('El colaborador aun no tiene videos asignados');

    const res = { msj: 'Video', video: found_video };
     return res;
}

//Obtener videos publicos
const getPublicVideo = async () => {
    const video = await Video.find({$and: [{ is_private: false }, { state: 1 }] });
    if (video.length === 0) throw new Error('No se pudo encontrar los videos en estado public');

    const res = { msj: 'Video', video: video };
    return res;
};
  

//Obtener videos privados(Solo los puede ver usuarios registrados)
const getPrivateVideo = async () => {
    const video = await Video.find({ $and: [{ is_private: true }, { state: 1 }] });
    if (video.length === 0) throw new Error('No se pudo encontrar los videos en estado privado');

    const res = { msj: 'Video', video: video };
    return res;
};

//Obtener informacion de los likes
const getUserWhoLiked = async (id) => {
    const video = await Video.findOne({ $and: [{ _id: id }, { state: 1 }]});
    if (!video) throw new Error('No se pudo encontrar los videos en estado privado');
    const users_liked = video.users_liked;
    const res = { msj: 'Video', users: users_liked};
    return res;
};

//Metodo para modificar un video
const updateVideo = async (id, body) => {
    //validar que exista el id en estado 1
    const searched_id = await Video.findById(id);
    if (!searched_id) throw new Error('No se pudo encontrar el video. Por favor inténtelo nuevamente');
  
    //validar los diferentes campos ingresados en el body
    if(body.title){
        body.title = body.title.toUpperCase();
        regexValidator.validatorLength(body.title,2,60, 'title'); //validar la longitud del titulo
    }
  
    if(body.description){
        body.description = body.description.toLowerCase();
    }
    
    if (body.date_publication) {
        dateValidator.validateDateDDMMYYYY(body.date_publication); //validar la fecha
    }
 
    //modificar el video
    const video = await Video.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!video) throw new Error('No se pudo modificar el video');

    const res = { msj: 'Video', video: video };
    return res;
};



//Agregar likes (Cualqueir usuario)
const addLike = async (id,body) =>{
    let email = body.email;
    const user_name = body.user_name;
    if (!email || !user_name) throw new Error('Por favor ingrese todos los campos requeridos para agregar el like');
    email = email.toLowerCase();
    regexValidator.validatorEmail(email); //validar el email

    //Obtener informacion si el usuario ya realizo like anteriormente
    const searched_user = await Video.find({ $and: [{ _id: id }, { state: 1 }, {users_liked: { $elemMatch: { email } }}] });
    if(!searched_user || searched_user.length != 0 ) throw new Error('El usuario ya ha dado like anteriormente y no puede realizar esta acción nuevamente.');
  
    
    const video = await Video.findOneAndUpdate(
        { _id: id },
        {
        $inc: { likes: 1 }, 
        $addToSet: { users_liked: { email:email, user_name: user_name } } 
        },
        { new: true }
    );


    const res = { msj: 'Video', video: video };
    return res;
}

//Metodo para borrar un video
const deleteVideo = async (id) => {
    const searched_video  = await Video.findOne({ $and: [{ _id: id }, { state: 1 }] });
    if (!searched_video.length || !searched_video) throw new Error('No se pudo encontrar el video. Por favor inténtelo nuevamente');
    const role = await Video.findOneAndUpdate(
      { _id: id },
      { state: 0 },
      { new: true }
    );
    if (!role) throw new Error('No se pudo inactivar el video');

    return 'Video inactivado correctamente';
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





