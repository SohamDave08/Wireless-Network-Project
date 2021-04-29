require('dotenv').config();
const app = require('express')();

const mqtt = require('mqtt');
const options = {
    host: '5f7046cbf23740a493e8d04e5ac3e2e4.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'SD2000',
    password: process.env.PASSWORD
}

const client = mqtt.connect(options);

client.on('connect', function () {
    console.log('Connected to MQTT');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    console.log(message.toString());
    console.log('Received message:', topic, message.toString());
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.API_KEY)
    // const msg = {
    //     to: 'borrapavan@gmail.com',
    //     from: 'Tanveeshs@gmail.com',
    //     subject: 'Message from Pub/Sub',
    //     text: 'The message received is :'+message.toString(),
    // }
    // sgMail
    //     .send(msg)
    //     .then(() => {
    //         console.log('Email sent')
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
});

// subscribe to topic 'my/test/topic'
client.subscribe('channel1');


app.listen(process.env.SUB_PORT || 5000, (err) => {
    console.log(`Server listening at POST ${process.env.SUB_PORT || 5000}`);
});