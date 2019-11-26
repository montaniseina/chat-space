$(function(){
  var buildMessageHTML = function(message){
    let image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";

    let html = `<div class="message", data-message-id="${message.id}">


                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div> `
  $('.messages').append(html);
  };
    // var image = message.image? `<img src = ${message.image} ></img>` : "";
    //   var html = 
    //               `<div class="message" data-message-id=${message.id}>
    //               <div class="upper-message">
    //                 <div class="upper-message__user-name">
    //                   ${message.name}
    //                 </div>
    //                 <div class="upper-message__date">
    //                   ${message.created_at}
    //                 </div>
    //               </div>
    //               <div class="lower-message">
    //                 <p class="lower-message__content">
    //                   <a>${message.content}</a>
    //                 </p>
    //                 <div>
    //                   ${image}
    //                 </div>
    //               </div>`
    // return html;
  
  

  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(form){
      var html = buildMessageHTML(form);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
      $('messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  })
  if(window.location.href.match(/\/groups\/\d+\/messages/)){
    var reloadMessages = function(){
      last_message_id = $(".message:last").data("message-id");
      // console.log(location.href);
      $.ajax({
        url: "../api/messages",
        type: 'GET',
        dataType: 'json',
        data:{id:last_message_id}
      })
      .done(function(messages){
        // console.log('success');
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessageHTML(message);
        })
      })
      .fail(function(){
        console.log('fails');
      });
    }
  };
  setInterval(reloadMessages, 7000);
  })


