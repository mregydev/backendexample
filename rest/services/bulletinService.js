const models = require('../../DAL/models');
const messages = require('../core/Messages')

const fileupload = require('../core/fileupload')


module.exports = {
    AddInstance: function (instance) {
        return new Promise(async (resolve, reject) => {
            let isValid = this.IsValid(instance)

            if (!isValid.value) {
                reject({ Code: 422, ErrMsg: isValid.ErrMsg })
            }
            else {

                try {
                    let res = await models.bulletin.create(instance);
                
                    resolve(res.id)
                }
                catch (msg) {
                    reject({ Code: 500, ErrMsg: msg })
                }
            }
        })
    },
    RemoveInstance: async function (id) {

        return new Promise(async (resolve, reject) => {

            try {
                let res = await models.bulletin.destroy({
                    where: {
                        id
                    }
                })
                resolve(res)
            }

            catch (msg) {
                reject({ Code: 500, ErrMsg: msg })
            }
        })

    },

    FetchAll: async function () {

        return new Promise(async (resolve, reject) => {
            try {
                let res = await models.bulletin.findAll({})
                resolve(res)
            }
            catch (msg) {

                reject({ Code: 500, ErrMsg: msg })
            }
        })
    },

    FindOne: async function (id) {

        return new Promise(async (resolve, reject) => {
            try {
                let res = await models.bulletin.find({ where: { id } })
                resolve(res)
            }
            catch (msg) {

                reject({ Code: 500, ErrMsg: msg })
            }
        })
    },


    IsValid: function (instance) {
        if (instance && !instance.title) {
            return { value: false, ErrMsg: messages.TitleNotValid }
        }
        if (instance && !instance.content) {
            return { value: false, ErrMsg: messages.ContentNotFound }
        }
        if (instance && !instance.logourl) {
            return { value: false, ErrMsg: messages.LogoNotFound }
        }

        return { value: true }
    }
}