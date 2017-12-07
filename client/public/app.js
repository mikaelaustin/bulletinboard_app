$(document).ready(function(){

	$('#bulletin-form').on('submit', function(e){
		e.preventDefault();
		//adding the object for the bulletin board form
		var bulletinObject = {
			title: $('#title-input').val(),
			body: $('#message-input').val()
		}

		$.ajax({
			method: 'POST',
			url: '/api/bulletins',
			dataType: 'json',
			data: JSON.stringify(bulletinObject),
			contentType: 'application/json'
		}).then(function(res){
			if(res==="nul"){
				alert("Complete entire form")
			}
			addBulletin();
		});

		$('#title-input').val("");
		$('#message-input').val("");
	});

	function addBulletin(){
		$('#big-div').remove();

		$.ajax({
			method: 'GET',
			url: '/api/homepage'
		}).then (function(messages){
			//console.log(messages)
			var bigDiv = $('<div id="big-div">');
			var messageDiv, titleP, messageP, xButton;
				messages.rows.sort(function(a, b){ 
				return a.id - b.id;
			});
			for (var i=0; i < messages.rows.length; i++){
				console.log(messages.rows[i].title)
				console.log(messages.rows[i].body)
				messageDiv = $('<div class = "well message-div">')
				messageDiv.css({display: 'inline-block', margin: '10px', overflow: 'hidden'});
				//using jared X button and div
				xButton = $('<button class="btn btn-danger x-button" data-id=' + messages.rows[i].id + '>');
				xButton.css({padding: "0px 2px 0px 2px", float: ' right'})
				xButton.text("x");

				titleP = $('<p>');
				messageP = $('<p class="message" data-id=' + messages.rows[i].id + '>');

				titleP.text("Title: " + messages.rows[i].title);
				messageP.text("Message: " + messages.rows[i].body)

				messageDiv.append(titleP).append(messageP).append(xButton)
				bigDiv.append(messageDiv)
			}

			$('#everything-div').append(bigDiv)
		});
	};
	addBulletin();
//ajax call to delete posts
	$(document).on('click', '.x-button', function(){
		$.ajax({
			method: 'DELETE',
			url: '/api/delete-post/' + $(this).data('id')
		});
		addBulletin();
	});

//ajax call to click on message and be able to update
	$(document).on('click', '.message', function(){
		$('#modal-input-div').remove();
		var postID = $(this).data('id')
		$('#update-message-modal').modal();

		var inputDiv = $('<div id="modal-input-div">');

		$.ajax({
			method: 'GET',
			url: '/api/homepage'

		}).then(function(messages){
			for(i=0;i < messages.rows.length; i++){
				if(messages.rows[i].id===postID){
					var newMessage = $('<textarea id= "new-message">')
					newMessage.val(messages.rows[i].body)

					inputDiv.append(newMessage);
				} 
			}
			var updateButton = $('<button>');
			updateButton.addClass('btn btn-info enter-button');
			updateButton.attr('data-id', postID); 
			updateButton.text('Update Message');
			inputDiv.append('<br>').append(updateButton);
		})
		$('.modal-body').append(inputDiv);
	})
//ajax call to actually be able to update text and have it save on the submit button
	$(document).on('click', '.enter-button', function(){
		var updatedMsg = $('#new-message').val()

		if(updatedMsg !=''){

			$.ajax({
				method: 'PUT',
				url: '/api/update-post/'+ $(this).data('id'),
				data: {message: updatedMsg}
			}).then(function(res){
				addBulletin();
				$('#update-message-modal').modal('toggle');
			});
		} else {
			alert("Enter a message")
		}
	});
});