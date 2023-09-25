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

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();
  
    // Get user input
    const input = inputField.value;
   
    jQuery.ajax({
      data: {
          msg: input,	
      },
      type: "POST",
      url: "/get",
  }).done(function(data) {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
  

    let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);
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
 
  // Add user input to conversation
  

});
// function generateResponse(input)
// {
//     console.log(1);
 
//     console.log(answer)
//     return answer
   


// }
 /*
 $.ajax({
             data: {
                 msg: rawText,	
             },
             type: "POST",
             url: "/get",
         }).done(function(data) {
             var botHtml = '<div style ="color :aqua"><h1>Hello World</h1></div>'
             $("#messageFormeight").append($.parseHTML(botHtml));
         });
         event.preventDefault();
 */