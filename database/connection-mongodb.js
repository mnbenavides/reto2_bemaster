const mongoose = require('mongoose');

const url ="mongodb://127.0.0.1:27017/app_video_management";

mongoose.connect(url, {})
.then(() => {
  console.log('Connected to mongo database');
})
.catch(error => {
  console.error(error, 'mongo-connection');
  process.exit(1);
});


mongoose.connection.on('error', error => {
  console.info('An error has occurred trying to connect to mongo database');
  console.error(error, 'mongo-connection');
});

module.exports = mongoose;