const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://krelod:m1LhupPwQfn5rG0q@estoca-kjhkk.gcp.mongodb.net/main?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    socketTimeoutMS: 4500
})

mongoose.Promise = global.Promise

module.exports = mongoose