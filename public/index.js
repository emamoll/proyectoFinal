const tokenForm = document.getElementById("tokenForm");
const tokenUser = document.getElementById("tokenUser");
const chatForm = document.getElementById("chatForm");
const inputMsg = document.getElementById("inputMsg");
const messagesChat = document.getElementById("messagesChat");

const socket = io();

socket.emit("askData");

tokenForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("userToken", tokenUser.value);
  tokenUser.value = "";
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = {
    message: inputMsg.value,
  };
  socket.emit("chatbot", msg);
  inputMsg.value = "";
});

const divChat = (message) => {
  const chatMessage = document.createElement("div");
  chatMessage.innerHTML = `
  <p>${message.from}: ${message.message}</p>
  `;
  messagesChat.appendChild(chatMessage);
};

socket.on("chatbot", (data) => {
  divChat(data);
});

socket.on("chat", (data) => {
  data.map((message) => {
    divChat(message);
  });
});
