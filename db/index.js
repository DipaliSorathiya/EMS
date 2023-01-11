const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/reveiw_app').
then(
    () => {
        console.log('db is connected.!')
    }).catch(
        (ex) => {
            console.log('db id connected.!',ex);
        })