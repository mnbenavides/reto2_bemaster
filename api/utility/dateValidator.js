const moment = require('moment');

const validateDateDDMMYYYY = (date) =>{
    const format = 'DD/MM/YYYY';
    const valid_date = moment(date, format, true);
    if(!valid_date.isValid() && valid_date.format(format) != date) throw new Error('Por favor ingrese una fecha válida con formato DD/MM/YYYY');

}

module.exports = {
    validateDateDDMMYYYY
}