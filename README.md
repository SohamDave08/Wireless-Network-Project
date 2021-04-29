# Wireless Network mini project

We have made a Publisher-Subscriber model using HiveMQ cloud under Node.js as a supporting technology.
Using this code one can connect their MQTT devices to HiveMQ's Cloud Native IoT Messaging Broker. 
Run the code to see the output.

### Features:
- Uses MQTT protocol to communicate with the subscribers. 
- Used HiveMQ API to use MQTT protcol.
- Notifies the subscriber on E-Mail (with NodeMailer) as well as SMS (with Twilio).

### Supporting libraries used (Node.js):
-   MQTT
-   Twilio  (For SMS and Whatsapp bot)
-   Nodemailer (Mailing service)

### Running the project:
1. Clone the repository and run *npm install*. This will install the peer dependencies.
2. Create a .env file and include the following contents:
  > PASSWORD=your_password_for_hivemq <br/>
  PUB_PORT=your_port_number
3. Run *npm run pub*. This establishes the subscriber.
4. Run *npm run sub*. This establishes the publisher.
5. You can test the routes on Postman.

###### Please leave a star if the project helps you in any way!

###### Made by Soham Dave, Ansh Mehta and Shubham Patil.
