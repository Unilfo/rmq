const app = require("express")();
var cors = require('cors');
app.use(cors());
const httpServer = require("http").createServer(app);
var rabbitMQHandler = require('./connection')


const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", socket => {

    socket.on("testMsg", (data) => {
        rabbitMQHandler((connection) => {
            connection.createChannel((err, channel) => {
                if (err) {
                    throw new Error(err)
                }

                var ex = 'test'
                var msg = JSON.stringify(data);
                console.log('msg', msg);
                var mainQueue = 'task_queue';

                channel.assertExchange(ex, 'fanout', {
                    durable: false
                });

                channel.bindQueue(mainQueue, ex, 'qwe')
                channel.publish(ex, 'qwe', Buffer.from(msg));
            });

            setTimeout(function () {
                connection.close();
            }, 500);
        })
    })


    socket.on("get", () => {
        rabbitMQHandler((connection) => {
            connection.createChannel((err, channel) => {
                if (err) {
                    throw new Error(err);
                }

                var mainQueue = 'task_queue'

                channel.assertQueue(mainQueue, { exclusive: false }, (err, queue) => {
                    if (err) {
                        throw new Error(err);
                    }
                    var ex = 'test'
                    channel.assertExchange(ex, 'fanout', {
                        durable: false
                    });
                    console.log(queue);
                    channel.bindQueue(queue.queue, ex, 'qwe')
                    channel.prefetch(1)
                    channel.consume(queue.queue, (msg) => {
                        if (msg) {
                            console.log(queue);
                            var result = msg.content.toString()
                            console.log('result', result);
                            socket.emit('getMsg', result)
                            channel.ack(msg);
                        }
                    });
                }, { noAck: false })
            })
        })
    })

});

httpServer.listen(8000);

