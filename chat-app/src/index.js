const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))




io.on('connection', (socket) => {
        console.log('new connection succeed')

        socket.emit('message','welcome')
        socket.broadcast.emit('message', 'A new user has joined')

        socket.on('sendMessage',(message, callback)=>{
            const filter = new Filter()

            if(filter.isProfane(message)){
                return callback('Profanity is not allowed')
            }

            io.emit('message', message)
            callback()
        })

        socket.on('sendLocation',(coords,callback)=>{
            io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
            callback()
        })

        socket.on('disconnect',()=>{
            io.emit('message','user has left')
        })

        // socket.emit('countUpdated', count)

        // socket.on('increment',()=>{
        //     count++
        //     // socket.emit('CountUpdated',count)
        //     io.emit('countUpdated', count)
        // })
})

server.listen(port, () => {
    console.log(`Server is up on  ${port}!`)
})
