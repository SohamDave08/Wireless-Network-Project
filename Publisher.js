require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());


const mqtt = require('mqtt')
const options = {
    host: '5f7046cbf23740a493e8d04e5ac3e2e4.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'SD2000',
    password: process.env.PASSWORD
}

//initialize the MQTT client
const client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected to MQTT');
});

app.post('/PublishMessage',(req,res,next) => {
    client.publish('channel1', req.body.message, (err,cb) => {
        if(err){
            console.log(err);
            res.json({success:0,message:"Error!"});
            return next();
        }else {
            console.log(req.body.message)
            res.json({success:1,message:"Success! Added Successfully"});
            return next();
        }
    });
});

app.listen(process.env.PUB_PORT || 3000, (err) => {
    console.log(`Server listening at POST ${process.env.PUB_PORT || 3000}`);
});


// client.on('error', function (error) {
//     console.log(error);
// });

// client.on('message', function (topic, message) {
//     console.log('Received message:', topic, message.toString());
// });

// subscribe to topic 'my/test/topic'
//client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
// client.publish('my/test/topic', 'Hello');