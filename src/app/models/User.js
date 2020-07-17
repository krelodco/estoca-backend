const mongoose = require('../../database')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    document: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users'
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash

    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User