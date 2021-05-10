var amqp = require('amqplib/callback_api')
let user = { username: 'admin', password: 'admin' };

module.exports = (callback) => {
    amqp.connect(`amqp://${user.username}:${user.password}@localhost`,
        (error, conection) => {
            if (error) {
                throw new Error(error);
            }
            callback(conection);
        })
    console.log('socket connected');
}