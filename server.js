const http=require('http')
const express=require('express')
const socketio = require('socket.io')

const app =express()
const server=http.createServer(app);

const io=socketio(server)

const users={}

io.on('connection',socket =>{
    socket.on('new-user',name =>{
        users[socket.id]=name
        socket.broadcast.emit('user-connected',name)
 
    })
       
    socket.on('send-chat-message',message =>
    {
        socket.broadcast.emit('chat-message',{message : message , name: users[socket.id]})

    })
    socket.on('disconnect', () =>
    {
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
        
    })
})
server.listen(3000)