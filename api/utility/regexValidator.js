

const validatorLength = (fieldValue, minLength, maxLength, fieldName) => {
    const field_length = fieldValue.length; 
    const valid = (field_length >= minLength && field_length<=maxLength);
    if (!valid) throw new Error(`Error en el valor ${fieldName}. Ingrese máximo ${maxLength} carácteres y mínimo ${minLength} carácteres `);
}


const validatorPass = (field) => {
    const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    const valid = (regex_pass.test(field))
    if (!valid) throw new Error('La contraseña debe contener al menos 8 caráctres de longitud, una minúscula y una mayúscula, un dígito y un carácter especial');
}


const validatorName = (fieldValue, fieldName) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
    const valid = (regex.test(fieldValue))
    if (!valid) throw new Error(`Error en el campo  ${fieldName}, solo se admiten letras`);
}


const validatorEmail = (fieldValue) => {
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = (regex_email.test(fieldValue))
    if (!valid) throw new Error('Ingrese por favor un email válido');
    return valid;
}

const validatorPhone = (fieldValue) => {
    const regex_phone = /^\+?[0-9\s-()]+$/;
    const valid = (regex_phone.test(fieldValue))
    if (!valid) throw new Error('Ingrese por favor un teléfono válido');
    return valid;
}


module.exports = {
    validatorName,
    validatorPass,
    validatorLength,
    validatorEmail,
    validatorPhone
}