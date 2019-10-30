const mongoose = require('mongoose');

const phonePackageSchema = mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    callMinutes: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    callMinutesToAboard: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    webService: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    packagePrice: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now()
    },

});

const phonePackageTable = mongoose.model('phonePackage', phonePackageSchema);

addPackage = (data) => {
    let p = new Promise((resolve, reject) => {
        phonePackageTable.findOne({ packageName: data.packageName })
            .then((user) => {
                if (user) return reject("the user exist");
                let packageObj = phonePackageTable({
                    packageName: data.packageName,
                    callMinutes: data.callMinutes,
                    callMinutesToAboard: data.callMinutesToAboard,
                    webService: data.webService,
                    packagePrice: data.packagePrice,

                });

                packageObj.save()
                return resolve("add successfuly")
            })
    })
    return p;
}

getAllPackage = () => {
    let p = new Promise((resolve, reject) => {
        phonePackageTable.find({})
            .then((users) => {
                return resolve(users);
            })
            .catch((err) => {
                return reject('db connect error')
            })
    })
    return p;

}

findPackage = (data) => {

    let p = new Promise((resolve, reject) => {
        phonePackageTable.findOne({ packageName: data })
            .then((user) => {
                if (user) {
                    return resolve(user);
                }
                return reject(false)
            })
    })
    return p;
}

findPackageById = (data) => {

    let p = new Promise((resolve, reject) => {
        phonePackageTable.findOne({ _id: data })
            .then((user) => {
                if (user) {
                    return resolve(user);
                }
                return reject(false)
            })
    })
    return p;
}

deletePackage = (data) => {

    return new Promise((resolve, reject) => {
        phonePackageTable.findOneAndUpdate({ packageName: data }, { isActive: false }, { new: true })
            .then((package) => {
                return resolve(package)
            })
            .catch((err) => {
                return reject("bad bad bad")
            })
    })
}

updatePackage = (data) => {

    return new Promise((resolve, reject) => {
        phonePackageTable.findOne({ packageName: data.packageName })
            .then((package) => {

                package.packageName = data.packageName;
                package.callMinutes = data.callMinutes;
                package.callMinutesToAboard = data.callMinutesToAboard;
                package.webService = data.webService;
                package.packagePrice = data.packagePrice;

                package.save()
                return resolve(package)
            })
            .catch((err) => {
                return reject("not updated")
            })
    })

}

module.exports = {
    addPackage: addPackage,
    getAllPackage: getAllPackage,
    findPackage: findPackage,
    findPackageById: findPackageById,
    deletePackage: deletePackage,
    updatePackage: updatePackage
}