const app = require("express")();
const httpServer = require("http").createServer(app);
let arr = [];

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", socket => {
    socket.on("connectToRmq", (data) => {
        console.log('from client:', data);
        getConnect(data)
            .then((data) => {
                if (data) {
                    console.log(data.msg);
                }
                socket.emit("user_check", 'ok');
                console.log('close connection');
                // data.connection.close();
            }).catch(() => {
                console.log("ser_check false");
                socket.emit("user_check", 'false');
            });
    });

    socket.on("testMsg", (data) => {
        console.log('testMsg на сервере---', data);
        let { user } = data;
        getConnect(user, send, data.msg)
            .then((data) => {
                if (data) {
                    console.log(data.msg);
                }
            }).catch(() => {
                console.log("testMsg false");
            });
    });

    setInterval(() => {
        check_msg(socket);
    }, 10000);

    setInterval(() => {
        console.log('arr', arr);
        for (let k in arr) {
            socket.emit('getMsg', arr[k]);
            arr.shift();
        }
    }, 10000);
});
io.on("disconnect", socket => {
    console.log('socket disconnect');
    socket.connect();
});

function getConnect(param, func = null, msg) {
    var amqp = require('amqplib/callback_api');
    console.log('param---', param);
    return new Promise((resolve, reject) => {
        amqp.connect(`amqp://${param.username}:${param.password}@localhost`, (error, connection) => {
            if (error) {
                reject({ msg: '400', error: true })
            }
            if (func) {
                let res = func(connection, msg);
                if (res) {
                    resolve({ msg: '200', connection, res, error: false });
                }
            }
            resolve({ msg: '200', connection, error: false });
        })
    }).catch((error) => {
        console.error('ERROR---getConnect', error);
        reject(error);
    })
}

console.log('socket connected');

httpServer.listen(8000);

function send(connection, message) {
    var exchange = 'test';
    var queue_name = 'task_queue';
    let key = 'test.key';
    var msg = message.msg || 'Hello World!';

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(exchange, 'topic', {
            durable: false
        });

        channel.assertQueue(queue_name, {
            exclusive: false
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }
            channel.bindQueue(q.queue, exchange, key);
            channel.publish(exchange, key, Buffer.from(msg));
            console.log('send to rmq---', msg);
        });
    });

    // setTimeout(function () {
    //     connection.close();
    // }, 500);
}

function check_msg(socket) {
    let user = { username: 'admin', password: 'admin' };
    getConnect(user, getMsg, socket)
        .then((data) => {
            if (data) {
                console.log('check_msg', data.msg);
            }
        }).catch(() => {
            console.log("check_msg false");
        });
}

function getMsg(connection, socket) {
    var exchange = 'test';
    var queue_name = 'task_queue';
    let key = 'test.key';
    return new Promise((resolve, reject) => {
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertExchange(exchange, 'topic', {
                durable: false
            });

            channel.assertQueue(queue_name, {
                exclusive: false
            }, function (error2, q) {
                if (error2) {
                    throw error2;

                }

                channel.consume(q.queue, function (msg) {
                    if (msg.content) {
                        console.log("get msg from rmq---", msg.content.toString());
                        arr.push(msg.content.toString());
                        channel.ack(msg);
                        // socket.emit('getMsg', msg.content.toString());
                    }
                }, {
                    noAck: false
                });
            });
        });

        // setTimeout(function () {
        //     connection.close();
        // }, 500);
    })
}

