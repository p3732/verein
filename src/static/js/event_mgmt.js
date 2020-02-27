$('button.deleteButton').
  $.ajax({
    url: '/v1/object/3.json',
    method: 'DELETE',
    contentType: 'application/json',
    success: function(result) {
        // handle success
    },
    error: function(request,msg,error) {
        // handle failure
    }
  });
}

window.addEventListener('load', start)
