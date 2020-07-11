const socket=io('http://localhost:3000')
const messageForm= document.getElementById('send-container');
const messageInput= document.getElementById('message-input');
const messageContainer = document.getElementById('message-container')

const name=prompt('what is your name?')
  appendMessage('You joined')
  socket.emit('new-user',name)




socket.on('chat-message',data => {
    appendMessage(data.name+' : '+data.message)
})

socket.on('user-connected',name => {
    appendMessage(name+' connected')
})

socket.on('user-disconnected',name => {
    appendMessage(name+' disconnected')
})

messageForm.addEventListener('submit',(e) =>
{
     e.preventDefault();
     const message=messageInput.value;
     socket.emit('send-chat-message',message);
     appendMessage('You: '+message)
     messageInput.value=''
})
function appendMessage(message)
{
    const messageElement = document.createElement('div');
    //messageElement.className = 'new-div'
    messageElement.innerHTML=message
    messageContainer.append(messageElement)

}
