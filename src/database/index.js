const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/estoca?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    socketTimeoutMS: 4500
})

mongoose.Promise = global.Promise

module.exports = mongoose