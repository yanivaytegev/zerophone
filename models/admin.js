const mongoose = require('mongoose');

const adminScheme = mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    firstName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    lastName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    userName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    password: {
        type: String,
        min: 5,
        max: 25,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const adminTable = mongoose.model('admin', adminScheme);


adminLogin = (data) => {

    return new Promise((resolve, reject) => {

        adminTable.findOne({ userName: data.userName, password: data.password })
            .then((user) => {
                if (user.isActive == true) {
                    return resolve(user);
                }
            }).catch((err) => {
                return reject("user not found");
            })
    })
}

adminRegister = (data) => {

    return new Promise((resolve, reject) => {

        adminTable.findOne({ userName: data.userName })
            .then((user) => {
                if (user) {
                    return reject("user already exist")
                }
                let obj = adminTable(data)
                obj.save()
                return resolve("add successfully")
            })
    })

}




module.exports = {
    adminLogin: adminLogin,
    adminRegister: adminRegister
}
