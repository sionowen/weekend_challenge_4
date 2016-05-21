var data = [];
$(document).on('ready', function(){
  getTasks();

  $('.addTask').on('click', addTask);

  $('.table').on('click', '.complete-button', function(){

    completeTask($(this).parent().parent().find('.id').text());

  })

  $('.table').on('click', '.delete-button', function(){
    deleteTask($(this).parent().parent().find('.id').text());


  })



  function addTask() {
		event.preventDefault();

		var task = {};

			task.description = $('.task').val();



		$.ajax({
			type: 'POST',
			url: '/tasks',
			data: task,
			success: function(success) {

				getTasks();
			}

		});



	}


  function getTasks() {
		$.ajax({
			type: 'GET',
			url: '/tasks',
			success: function(tasks) {
				data = tasks;
        console.log(data);
				$('.task-list').empty();
				for (var i = 0; i < data.length; ++i) {
					appendTasks(i);
				}
			}
		})
	}

  function appendTasks(task) {

  	var targetData = data[task];
    appendString = '';

    if(targetData.completed){
      appendString = '<tr class="complete"><td><p class="id">' + targetData.id + '</p></td><td>' + targetData.description + '</td><td>' + targetData.completed + '</td><td>done</td><td><button class="delete-button">delete</button></td></tr>'
    }else {
      appendString = '<tr><td><p class="id">' + targetData.id + '</p></td><td>' + targetData.description + '</td><td>' + targetData.completed + '</td><td><button class="complete-button">complete</button></td><td><button class="delete-button">delete</button></td></tr>'
    }

  	$('.task-list').append(appendString);
  }


  function completeTask(task) {
    event.preventDefault();
    taskComplete = {};
    taskComplete.id = task;
    $.ajax({
      type: 'PUT',
      url: '/tasks',
      data: taskComplete,
      success: function(data){
        getTasks();
      }

    })
  }

  function deleteTask(task) {
    event.preventDefault();
    taskComplete = {};
    taskComplete.id = task;

    $.ajax({
      type: 'DELETE',
      url: '/tasks',
      data: taskComplete,
      success: function(data){
        getTasks();
      }

    })
  }



})
