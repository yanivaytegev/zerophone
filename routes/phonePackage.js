const express = require('express');
const router = express.Router();
const phonePackageModel = require('../models/phonePackage');


router.post('/package', (req, res) => {

    phonePackageModel.findPackageById(req.body)
        .then((user) => {
            return res.status(200).json({ success: user })
        })
        .catch((err) => {
            return res.status(200).json({ success: err })

        })

})
router.post('/add', (req, res) => {

    phonePackageModel.addPackage(req.body)
        .then((user) => {
            return res.status(200).json({ success: user })
        })
        .catch((err) => {
            return res.status(200).json({ success: err })

        })

})

router.get('/allpackages', (req, res) => {

    phonePackageModel.getAllPackage()
        .then((users) => {
            return res.status(200).json(users)
        })
        .catch((err) => {
            return res.status(200).json({ success: err })
        })
})


module.exports = router