const mongoose = require('mongoose');
const clientScheme = mongoose.Schema({
    id: {
        type: String,
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
    adress: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    city: {
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
    isBuisness: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    birthDate: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    package: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'phonePackage'
    }
});

const clientTable = mongoose.model('client', clientScheme);
var cookie;

registerClient = (data) => {

    let p = new Promise((resolve, reject) => {

        clientTable.findOne({ id: data.id })
            .then((user) => {
                if (user) {
                    return reject("the user exist");
                }
                let clientObj = clientTable({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDate: data.birthDate,
                    adress: data.lastName,
                    city: data.city,
                    password: data.password,
                    package: data.package,
                    isBuisness: data.isBuisness
                });

                clientObj.save()
                return resolve("add successfuly")
            })
    })
    return p;
}

login = (data) => {
    let p = new Promise((resolve, reject) => {
        clientTable.findOne({ id: data.id, password: data.password })
            .then((user) => {
                if (user.isActive == true) {
                    resolve(user);
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
    return p;
}

getCurrentUser = (data) => {
    let p = new Promise((resolve, reject) => {
        clientTable.findOne({ id: data.id })
            .then((user) => {
                if (user) {
                    return resolve(user);
                }
                return reject("id not exist");
            })
    })
    return p;
}

addLine = (client, packageLine) => {

    return new Promise((resolve, reject) => {
        if (client.isBuisness === false && client.package.length === 0) {
            clientTable.findOneAndUpdate({ _id: client._id }, { $push: { package: packageLine } }, { new: true })
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject('bad bad bad');
                })
        }
        else if (client.isBuisness === false && client.package.length === 1) {
            clientTable.findOneAndUpdate({ _id: client._id }, { package: packageLine }, { new: true })
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject('bad bad bad');
                })
        }

        else if (client.isBuisness === true && client.package.length < 3) {
            clientTable.findOneAndUpdate({ _id: client._id }, { $push: { package: packageLine } }, { new: true })
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject('bad bad bad');
                })
        }
        else if (client.isBuisness === true && client.package.length === 3) {

            clientTable.findOneAndUpdate({ _id: client._id }, {
                $push: {
                    package: {
                        $each: [packageLine],
                        $slice: -3
                    }
                }
            }, { new: true })
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject('bad bad bad');
                })
        }
    })
}

findByCookie = () => {

    let p = new Promise((resolve, reject) => {
        if (!cookie) {
            return reject('you need to log in');
        }
        clientTable.findOne({ _id: cookie.user._id })
            .then((user) => {
                if (user) {
                    return resolve(user)
                }
                return resolve('user not found')
            })
            .catch((err) => {
                return reject('user not found')
            })
    })
    return p;
}


setCookie = (data) => {

    console.log("1---", cookie)
    return new Promise((resolve, reject) => {
        cookie.user = data;
        console.log("2---", cookie)
        return resolve(cookie);
    })
}

newCookie = (data, req, res) => {

    if (!cookie) {

        cookie = req.session;
        cookie.user = data;
    }
    else {
        cookie.user = data
    }

}

getCookie = () => {
    return cookie;
}

clearCookie = () => {

    return cookie = '';
}

deleteClient = (id) => {

    return new Promise((resolve, reject) => {

        clientTable.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true })
            .then((user) => {
                return resolve(user)
            })
            .catch((err) => {
                return reject("bad bad bad")
            })
    })
}


deletePackage = (client, packageLine) => {

    return new Promise((resolve, reject) => {
        if (client.isBuisness === false) {

            clientTable = clientTable.findOneAndUpdate({ _id: client._id }, { package: [] }, { new: true })
                .then((user) => {
                    return resolve(user);
                })
                .catch((err) => {
                    return reject("bad");
                })
        }

        else if (client.isBuisness === true) {

            clientTable.findOneAndUpdate({ _id: client._id },
                {
                    $pull: {
                        package: { $in: [packageLine] }
                    }
                }, { new: true })
                .then((user) => {
                    return resolve(user);
                })
                .catch((err) => {
                    return reject("bad");
                })
        }
    })
}

getAllClients = () => {

    return new Promise((resolve, reject) => {
        clientTable.find()
            .then((users) => {
                return resolve(users);
            })
            .catch((err) => {
                return reject(err);
            })
    })
}

updateClient = (data) => {

    return new Promise((resolve, reject) => {

        clientTable.findOne({ _id: data._id })
            .then((user) => {
                user.id = data.id
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.birthDate = data.birthDate
                user.adress = data.lastName
                user.city = data.city
                user.password = data.password
                user.package = data.package
                user.isBuisness = data.isBuisness
                user.save()
                return resolve(user)
            })
            .catch((err) => {
                return reject("not updated")
            })

    })
}

module.exports = {
    registerClient: registerClient,
    login: login,
    getCurrentUser: getCurrentUser,
    setCookie: setCookie,
    getCookie: getCookie,
    addLine: addLine,
    findByCookie: findByCookie,
    clearCookie: clearCookie,
    deleteClient: deleteClient,
    deletePackage: deletePackage,
    newCookie: newCookie,
    getAllClients: getAllClients,
    updateClient: updateClient
}
