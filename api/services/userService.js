//Importaciones
const User = require('../../database/model/User.js');
const Role = require('../../database/model/Role.js');
const Video = require('../../database/model/Video.js');
const regexValidator = require('../utility/regexValidator.js');
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

//Metodo para registrar un usuario
const sigIn = async (body) => {
  let email = body.email;
  const password = body.password;
  let full_name = body.full_name;
  let last_name = body.last_name;
  let phone = body.phone;
  let role = body.role;

  if (!email || !password || !full_name || !last_name || !phone || !role) throw new Error('Por favor ingrese todos los campos requeridos para crear el usuario');
    
  email = email.toLowerCase();
  full_name = full_name.toUpperCase();
  last_name = last_name.toUpperCase();

  regexValidator.validatorLength(full_name,3,60, 'full_name'); //validar la longitud del nombre
  regexValidator.validatorLength(last_name,3,60, 'last_name'); 
  regexValidator.validatorLength(phone,10,10, 'phone'); 
  regexValidator.validatorName(full_name,'full_name');//validar el nombre solo con espacio y letras
  regexValidator.validatorName(last_name, 'last_name');
  regexValidator.validatorPass(password); //validar la contraseña
  regexValidator.validatorEmail(email); //validar el email
  regexValidator.validatorPhone(phone); //validar el telefono


  const role_found  = await Role.findById({ _id: role });
  if(!role_found) throw new Error("No existe el rol asignado");

  const user_found  = await User.find({ email: email });
  if(user_found.length != 0 ) throw new Error("Existe una cuenta asociada a tu dirección de correo electrónico. Si considera que es un error por favor comuníquese con el administrador");
    
  const indice = email.indexOf("@");
  const name_user = email.substring(0, indice);
  const pass_hash = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    
  //Crear el usuario
  await User.create({
    name_user: name_user,
    password: pass_hash,
    email: email,
    full_name: full_name,
    last_name: last_name,
    phone: phone,
    role: role,
  });
  return 'Usuario creado correctamente';
};


//Metodo para obtener todos los usuarios 
const getAllUser = async () => {
  const user = await User.find({}).select('-password').populate('role');
  if (!user) throw new Error('No se pudo encontrar los usuarios');
  const res = { msj: 'Users', user: user };
  return res;
};

//Metodo para obtener todos los usuarios activos
const getUserActive = async () => {
  const user = await User.find({ state: 1 }).select('-password');
  if (users.length === 0) throw new Error('No se pudo encontrar los usuarios');
  const res = { msj: 'Users', user: user };
  return res;
};

//Metodo para obtener todos los usuarios activos
const getUserInactive = async () => {
  const user = await User.find({ state: 0 }).select('-password');
  if (user.length === 0) throw new Error('No se pudo encontrar los usuarios');
  const res = { msj: 'Users', user: user };
  return res;
};

//Metodo para obtener el usuario por medio del id
const getUserById = async (id, body) => {
  const user = await User.findById({ _id: id }).select('-password');
  if (!user) throw new Error('No se pudo encontrar el usuario');
  const res = { msj: 'User', user: user };
  return res;
};

//Metodo para modificar un rol
const updateUser = async (id, body) => {
  //validar que exista el id en estado 1
  const searched_id = await User.findById(id);
  if (!searched_id) throw new Error('No se pudo encontrar el usuario. Por favor inténtelo nuevamente');

  //validar los diferentes campos ingresados en el body
  if(body.last_name){
    regexValidator.validatorLength(body.last_name,3,60,'last_name'); 
    regexValidator.validatorName(body.last_name,'last_name');
    body.last_name = body.last_name.toUpperCase();
  }

  if(body.full_name){
    regexValidator.validatorLength(body.full_name,3,60,'full_name'); //validar la longitud del nombre
    regexValidator.validatorName(body.full_name,'full_name');//validar el nombre solo con espacio y letras
    body.full_name = body.full_name.toUpperCase();
  }
  
  if (body.email) {
    regexValidator.validatorEmail(body.email); //validar el email
    const email_found  = await User.find({ email: body.email });
    if(email_found) throw new Error("Existe una cuenta asociada a tu dirección de correo electrónico.");
  }

  if (body.phone) {
    regexValidator.validatorEmail(body.phone); //validar el email
    regexValidator.validatorLength(phone,10,10, 'phone'); 
  }


  //modificar el usuario
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true }
  );
  if (!user) throw new Error('No se pudo modificar el usuario');
  const res = { msj: 'User', user: user };
  return res;
};



//Metodo para borrar un usuario
const deleteUser = async (id) => {
  const ROL_AUTHOR = 'author';
  const ROL_COLLABORATOR = 'collaborator';
  const user = await User.findById(id).populate('role');
  const name_role = user.role.name;
  let user_found;
  console.log(name_role);
  if (name_role == ROL_AUTHOR) { //Valida que si el usuario es autor o colaborador que no tenga videos activos
    user_found = await Video.findOne({ $and: [{ state: 1 }, { 'author': id }] });
    console.log('entro');
    console.log(user_found);

  } else if (name_role == ROL_COLLABORATOR) {
    user_found = await Video.findOne({ $and: [{ state: 1 }, { 'collaborator': id }] });
  }

  if (user_found) throw new Error('No se puede eliminar usuario porque tiene videos asignados activos en la aplicación');

  await User.findOneAndUpdate(
    { _id: id },
    { state: 0 },
    { new: true }
  ).select('-password');
  return 'Usuario inactivado correctamente'
};


module.exports = {
  sigIn,
  getAllUser,
  getUserActive,
  getUserInactive,
  getUserById,
  updateUser,
  deleteUser
}