//Importaciones
const Role = require('../../database/model/Role.js');
const User = require('../../database/model/User.js');
const regexValidator = require('../utility/regexValidator.js');

//Metodo para crear un rol
const createRole = async (body) => {
    let name = body.name;
    //se valida que los campos nombre y nivel tengan valor
    if (!name) throw new Error('Por favor ingrese todos los campos requeridos para crear el rol');
    regexValidator.validatorLength(name,3,15,'full_name'); //validar la longitud del nombre
    regexValidator.validatorName(name,'full_name');//validar el nombre solo con espacio y letras
    name = name.toLowerCase();
    //validar si el nivel que ingresa ya existe, ya que es único
    await Role.create({ name: name});
    return 'Rol creado correctamente';
  };

//Metodo para obtener todos los roles creados activos
const getAllRole = async () => {
  const role = await Role.find({});
  if (!role) throw new Error('No se pudo encontrar los roles');
  const res = { msj: 'Roles', role: role };
  return res;
};

//Metodo para obtener todos los roles creados activos
const getRoleActive = async () => {
  const role = await Role.find({ state: 1 });
  if (!role) throw new Error('No se pudo encontrar los roles');
  const res = { msj: 'Roles', role: role };
  return res;
};

//Metodo para obtener todos los roles creados inactivos
const getRoleInactive = async () => {
  const role = await Role.find({ state: 0 });
  if (!role) throw new Error('No se pudo encontrar los roles');
  
  const res = { msj: 'Roles', role: role };
  return res;
};

// Metodo para obtener un rol por medio del ID
const getRoleById = async (id) => {
  const role = await Role.findById(id);
  if (!role) throw new Error('No se pudo encontrar el rol');
  const res = { msj: 'Role', role: role };
  return res;
};

//Metodo para modificar un rol
const updateRole = async (id, body) => {
  //validar que exista el id en estado 1
  const searched_id = await Role.findById(id);
  if (!searched_id) throw new Error('No se pudo encontrar el rol. Por favor inténtelo nuevamente');
  //validar si ingresa el campo nombre, validar que solo tenga letras
  let role_name = body.name;
  if (!role_name) throw new Error('Por favor ingrese todos los campos requeridos para crear el rol');

  role_name = role_name.toLowerCase();
  regexValidator.validatorLength(role_name,3,60, 'name'); //validar la longitud del nombre
  regexValidator.validatorName(role_name, 'name'); 
  role_name = role_name.toLowerCase();

  //modificar el rol
  const role = await Role.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true }
  );
  if (!role) throw new Error('No se pudo modificar el rol');
  const res = { msj: 'Role', role: role };
  return res;
};
  
//Metodo para borrar un rol
const deleteRole = async (id) => {
  const searched_user = await User.find({ role: id });
  if (searched_user.length) throw new Error('Error. No se puede eliminar el rol ya que tiene usuarios asignados');
  const role = await Role.findOneAndUpdate(
    { _id: id },
    { state: 0 },
    { new: true }
  );
  if (!role) throw new Error('No se pudo inactivar el rol');
  return 'Rol inactivado correctamente';
};

module.exports = {
  createRole,
  getAllRole,
  getRoleActive,
  getRoleInactive,
  getRoleById,
  updateRole,
  deleteRole
}