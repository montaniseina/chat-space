$(function(){
  function buildHTML(message){
    var image = message.image? `<img src = ${message.image} ></img>` : "";
      var html = 
                  `<div class="message" data-message-id=${message.id}>
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
                      <a>${message.content}</a>
                    </p>
                    <div>
                      ${image}
                    </div>
                  </div>`
    return html;
  }
  

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
      var html = buildHTML(form);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })
})