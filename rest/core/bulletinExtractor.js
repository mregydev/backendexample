
const UploadFile=require('./fileupload')
const Busboy = require('busboy')
const MemoryStream = require('memorystream')

const { inspect } = require('util')

//extract entity data from multipart form request
module.exports = {

    getInstance:
        (req) => {

            return new Promise((resolve, reject) => {

                let instance = {}

                var busboy = new Busboy({ headers: req.headers });

                //In case file found we store it im memory
                busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {

                     if(fieldname=='logo' && ( mimetype==='image/png' || mimetype==='image/jpg' || mimetype==='image/jpeg' ))
                    {
                        instance['logourl']=await UploadFile(file)
                    }
                });

                busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                    instance[fieldname] = inspect(val)
                });

                busboy.on('finish', function (err) {

                    setTimeout(() => {
                        
                    console.log(instance['logourl'])
                    resolve(instance)
                    }, (2000));
                });

                req.pipe(busboy);
            })
        }
}  