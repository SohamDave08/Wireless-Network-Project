require('dotenv').config();
const app = require('express')();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Twilio_Client = require('twilio')(accountSid, authToken);
const nodemailer = require('nodemailer');

const mqtt = require('mqtt');
const options = {
	host: '5f7046cbf23740a493e8d04e5ac3e2e4.s1.eu.hivemq.cloud',
	port: 8883,
	protocol: 'mqtts',
	username: 'SD2000',
	password: process.env.PASSWORD,
};

const client = mqtt.connect(options);

client.on('connect', function () {
	console.log('Connected to MQTT');
});

client.on('error', function (error) {
	console.log(error);
});

client.on('message', async function (topic, message) {
	console.log(message.toString());
	console.log('Received message:', topic, message.toString());
	Twilio_Client.messages
		.create({
			body: `New message published: ${message.toString()}`,
			messagingServiceSid: process.env.TWILIO_messagingServiceSid,
			to: process.env.TWILIO_USER,
		})
		.then(message => console.log(message.sid))
		.done();

	Twilio_Client.messages
		.create({
			body: `New message published: ${message.toString()}`,
			from: process.env.TWILIO_WA_SENDER,
			to: process.env.TWILIO_WA_RECEIVER,
		})
		.then(message => console.log(message.sid))
		.done();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_ID, // generated ethereal user
			pass: process.env.EMAIL_PASSWORD, // generated ethereal password
		},
	});

	// send mail with defined transport object
	await transporter
		.sendMail({
			from: process.env.EMAIL_ID, // sender address
			to: 'sdave.tech@gmail.com', // list of receivers
			subject: 'New message received from Publisher', // Subject line
			html: `<h5>New message published: <b>${message.toString()}</b></h5>`, // plain text body
		})
		.then(() => console.log('Email Sent'));
});

// subscribe to topic 'my/test/topic'
client.subscribe('channel1');

app.listen(process.env.SUB_PORT || 5000, err => {
	console.log(`Server listening at POST ${process.env.SUB_PORT || 5000}`);
});
