$(function () {
  $('.deleteButton').click(deleteEvent)
})

function deleteEvent () {
  let button = $(this)
  let id = button.attr('id')

  $.ajax({
    url: '/api/event/' + id,
    type: 'DELETE',
    success: function(result) {
      //remove li
      button.parent().remove()
    },
    error: function(request,msg,error) {
      console.log('oh no')
      console.log(error)
    }
  });
}
