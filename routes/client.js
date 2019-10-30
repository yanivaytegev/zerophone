const express = require('express');
const router = express.Router();
const clientModel = require('../models/client');
const RegisterValidation = require('../validation/users/RegisterValidation')
const phoneModel = require('../models/phonePackage')

router.post('/register', (req, res) => {

    const { error, isValid } = RegisterValidation(req.body.data)
    if (!isValid) {
        return res.status(200).json(error)
    }
    clientModel.registerClient(req.body.data)
        .then((user) => {

            return res.status(200).json({ success: user })
        })
        .catch((err) => {
            return res.status(200).json({ err: err })

        })

})

router.get('/me', (req, res) => {
    return res.json(clientModel.getCookie())
})

router.post('/addline', (req, res) => {

    clientModel.findByCookie()
        .then((data) => {
            phoneModel.findPackage(req.body.data)
                .then((line) => {
                    clientModel.addLine(data, line)
                        .then((user) => {
                            clientModel.setCookie(user)
                                .then((user) => {
                                    return res.status(200).json({ user: user });
                                })
                        })
                })
                .catch((err) => {
                    return ('bad bad bad')
                })
        })
        .catch(() => {
            return res.status(207).json({ err: "please login" })
        })

})

router.post('/login', (req, res) => {
    clientModel.login(req.body.data)
        .then((user) => {
            if (user.isActive) {
                clientModel.newCookie(user, req, res);
                return res.status(200).json(user)
            }
            return res.status(207).json({ err: err })

        })
})

router.get('/logout', (req, res) => {
    return res.json(clientModel.clearCookie())
})


router.post('/deletClient', (req, res) => {

    clientModel.findByCookie()
        .then((user) => {
            clientModel.deleteClient(user._id)
                .then((user) => {
                    if (user) {
                        clientModel.clearCookie()
                            .then((result) => {
                                return res.status(200).json(user)
                            })
                    }
                })
                .catch((err) => {
                    return res.status(207).json({ err: err })
                })
        })
})

router.post('/deletePackage', (req, res) => {

    clientModel.findByCookie()
        .then((user) => {
            phoneModel.findPackage(req.body.data)
                .then((line) => {
                    clientModel.deletePackage(user, line)
                        .then((user) => {
                            if (user) {
                                clientModel.setCookie(user)
                                    .then((user) => {
                                        return res.status(200).json(user)
                                    })
                            }
                        })
                        .catch((err) => {
                            return res.status(207).json({ err: err })
                        })
                })
        })
})



module.exports = router