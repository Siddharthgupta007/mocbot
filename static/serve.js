

const chatbox = jQuery.noConflict()
chatbox(() => {
  chatbox(".chatbox-open").click(() =>
    chatbox(".chatbox-popup, .chatbox-close").fadeIn()
  )
  chatbox(".chatbox-close").click(() =>
    chatbox(".chatbox-popup, .chatbox-close").fadeOut()
  )
  chatbox(".chatbox-maximize").click(() => {
    chatbox(".chatbox-popup, .chatbox-open, .chatbox-close").fadeOut();
    chatbox(".chatbox-panel").fadeIn();
    chatbox(".chatbox-panel").css({ display: "flex" });
  })
  chatbox(".chatbox-minimize").click(() => {
    chatbox(".chatbox-panel").fadeOut();
    chatbox(".chatbox-popup, .chatbox-open, .chatbox-close").fadeIn();
  })
  chatbox(".chatbox-panel-close").click(() => {
    chatbox(".chatbox-panel").fadeOut();
    chatbox(".chatbox-open").fadeIn();
  });
})
const chatbot = document.getElementById('chatbox-popup__main');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');
const chatBody = document.querySelector(".chat-body");
// const send = document.querySelector(".send");


// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
   // Prevent form submission


   event.preventDefault();
 
   // Get user input
   const input = inputField.value;

   const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

   let message = document.createElement('div');
   message.classList.add('user-message','chatbot');
   message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
   conversation.appendChild(message);
   
   $.ajax({
     data: {
         msg: input,	
     },
     type: "POST",
     url: "/get",
 }).done(function(data) {
   

   const response =data;
   

 // Add chatbot response to conversation

 message = document.createElement('div');
 message.classList.add('chatbot-message','chatbot');
 message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
 conversation.appendChild(message);
 message.scrollIntoView({behavior: "smooth"});
     
 })

   // Clear input field
 inputField.value = '';
 
function scrollToBottom() {
 conversation.scrollTop = conversation.scrollHeight;
}

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

 // Add user input to conversation
 scrollToBottom();
 });



//  const renderMessageEle = (txt, type) => {
//   let className = "user-message";
//   if (type !== "user") {
//     className = "chatbot-message";
//   }
//   const messageEle = document.createElement("div");
//   const txtNode = document.createTextNode(txt);
//   messageEle.classList.add(className);
//   messageEle.append(txtNode);
//   chatBody.append(messageEle);
//};