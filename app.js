const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const bulletinRouter = require('./rest/routes/bulletinRouter');

const commentRouter = require('./rest/routes/commentRouter');

const cors=require('cors')

const app = express();

app.use(cors())

app.use(bodyParser.json());

//In case we used membership information
//authentication will be done with json web token
// app.use((req,res,next)=>{
//     var accessToken = req.headers['x-access-token'];
//     if (!accessToken) {
//       next();
//     }
//     else {
//       var userId = jwt.decode(accessToken, config.SecretKey);
//       req.user=getuser(userId)
//     }
// })


app.use('/v1/bulletin/', bulletinRouter);

app.use('/v1/comments/', commentRouter);

app.get('/images/:name', (req, res) => {
    res.sendFile(`${__dirname}/rest/images/${req.params.name}`)
})

app.listen(process.env.PORT || 8080)

console.log("application is listening")


module.exports=app