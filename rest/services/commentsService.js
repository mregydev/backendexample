const models = require('../../DAL/models');
const messages = require('../core/Messages')


module.exports = {
    AddComment: function (instance) {
        return new Promise(async (resolve, reject) => {
            let isValid = this.IsValid(instance)
            if (!isValid.value) {
                reject({ Code: 422, ErrMsg: isValid.ErrMsg })
            }
            else {
                try {
                    let res = await models.comment.create(instance);
                    resolve(res.id)
                }
                catch (msg) {
                    reject({ Code: 500, ErrMsg: msg })
                }
            }
        })
    },
    RemoveComment: async function (id) {
        return new Promise(async (resolve, reject) => {

            try {
                let res = await models.comment.destroy({
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

    FetchAllComments: async function (bulletinId) {

        return new Promise(async (resolve, reject) => {
            try {
                let res = await models.comment.findAll({where:{ bulletinId} })

                resolve(res)
            }
            catch (msg) {

                console.log('error here')
                reject({ Code: 500, ErrMsg: msg })
            }
        })
    },


    IsValid: function (instance) {
        if (instance && !instance.user) {
            return { value: false, ErrMsg: messages.UserNotValid }
        }
        if (instance && !instance.content) {
            return { value: false, ErrMsg: messages.ContentNotFound }
        }

        if (instance && (!instance.bulletinId || isNaN(parseInt(instance.bulletinId)))) {

            return { value: false, ErrMsg: messages.BulletInNotValid }
        }

        return { value: true }
    }
}