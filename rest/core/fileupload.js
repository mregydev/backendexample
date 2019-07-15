const fs=require('fs')
const path=require('path')
const uuid=require('node-uuid')


module.exports = (stream) => {

    return new Promise((resolve, reject) => {

        let fileName = uuid.v4() + ".png";
        
        //store file to images folder
        let writer=fs.createWriteStream(path.join(__dirname, '..', 'images',fileName))

        stream.pipe(writer)

        stream.on('end',()=>resolve(fileName))

        //this is how to upload to aws s3
        // aws.config.update({
        //     accessKeyId: "",
        //     secretAccessKey: ""
        // });

        // const s3 = new aws.S3({
        //     endpoint: 's3.us-east-2.amazonaws.com',
        //     signatureVersion: 'v4',
        //     region: 'us-east-2', params: { Bucket: 'mcqhubfiles', Key: fileName }
        // });
        
        // s3.upload({ Body: stream }).send(function (err, data) { 

        //     if(err)
        //     {
        //         reject(err)
        //     }
        //     else
        //     {
        //         resolve(data.Location)
        //     }
        //  });


    })

}