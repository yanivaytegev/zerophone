const express = require('express');
const router = express.Router();
const clientModel = require('../models/client')
const adminModel = require('../models/admin')
const phonePackgeModel = require('../models/phonePackage')


router.get('/allClients', (req, res) => {

    clientModel.getAllClients()
        .then((users) => {
            return res.status(200).json(users)
        })
        .catch((err) => {
            return res.status(200).json(err)

        })

})

router.get('/allPackages', (req, res) => {

    phonePackgeModel.getAllPackage()
        .then((users) => {
            return res.status(200).json(users)
        })
        .catch((err) => {
            return res.status(200).json(err)

        })

})

router.post('/addPackage', (req, res) => {

    phonePackgeModel.addPackage(req.body.data)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(err)

        })
})

router.post('/deletePackage', (req, res) => {

    phonePackgeModel.deletePackage(req.body.data)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(err)

        })
})

router.post('/deleteClient', (req, res) => {

    clientModel.deleteClient(req.body.data)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(err)

        })
})

router.post('/updatePackage', (req, res) => {

    phonePackgeModel.updatePackage(req.body.data)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(err)

        })
})

router.post('/updateClient', (req, res) => {

    clientModel.updateClient(req.body.data)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(err)

        })
})

router.post('/login', (req, res) => {

    adminModel.adminLogin(req.body.data)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(err)
        })
})

router.post('/adminRegister', (req, res) => {

    adminModel.adminRegister(req.body.data)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(err)
        })
})

module.exports = router