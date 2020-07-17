const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bctypt = require('bcrypt')

const authConfig = require('../../config/auth.json')

const User = require('../models/User')

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 /* 1 day */ })
}

router.post('/create', async (req, res) => {
    const { email, document } = req.body

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({
                error: 'Email already exists',
                code: 4000
            })

        if(await User.findOne({ document }))
            return res.status(400).send({
                error: 'Document already exists',
                code: 4001
            })

        const user = await User.create(req.body)

        user.password = undefined

        return res.send({ user, token: generateToken({ id: user.id }) })
    } catch(error) {
        return res.status(400).send({ error })
    }
})
router.post('/ready', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if(!user) 
        return res.status(400).send({
            error: 'User not found',
            code: 4002
        })
    
    if(!await bctypt.compare(password, user.password))
        return res.status(400).send({
            error: 'Invalid password',
            code: 4003
        })
    
    user.password = undefined

    return res.send({
        user,
        token: generateToken({ id: user.id }),
        code: 2000
    })
})

module.exports = app => app.use('/auth', router)