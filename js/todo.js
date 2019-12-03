var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    url: 'https://proyecto000813022.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)
      var today = new Date(Date.now())
      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        var date = new Date(data[i].createdOn)
        console.log(date.getFullYear())
        console.log(today.getFullYear())
        //console.log(data[i].createdOn.getDay())
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
        if ((today.getDate() == date.getDate()) && (today.getMonth() == date.getMonth()) && (today.getFullYear() != date.getFullYear()) && (data[i].docType == "dream")) {
          $('#todo-list').append(`<li><span>${date.getFullYear()} ${data[i].description}</span></li>`)
        }
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()

// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });
var mood = document.querySelector("input[name=mood]")
var title = document.querySelector("input[name=title]")
var input = document.querySelector("textarea[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "mood" : mood.value,
      "title" : title.value,
      "description" : input.value,
      "docType": "dream",
      "capsule": "",
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'http://localhost:3000/todos',
      url: 'https://proyecto000813022.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        alert("succesfully updated log")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    mood.value = '';
    title.value = '';
    input.value = '';
  }
})


// function addTodo(id, todoText, completed) {
  
// }