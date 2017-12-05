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

		// $('#title-input').val("");
		// $('#message-input').val("");
	});

	function addBulletin(){
		$('#big-div').remove();

		$.ajax({
			method: 'GET',
			url: '/api/homepage'
		}).then (function(messages){
			console.log(messages)
			// var bigDiv = $('<div id="big-div">');
			// var messageDiv, titleP, messageP, xButton;
			// // 	messages.rows.sort(function(a, b){ 
			// // 	return a.id - b.id;
			// // });
			// for (var i=0; i < messages.rows.length; i++){
			// 	messageDiv = $('<div class = "well message-div">')
			// 	messageDiv.css({display: 'inline-block', margin: '10px', overflow: 'hidden'});
			// 	//using jared X button and div
			// 	xButton = $('<button class="btn btn-danger x-button" data-id=' + messages.rows[i].id + '>');
			// 	xButton.css({padding: "0px 4px 0px 4px", float: 'right'})
			// 	xButton.text("x");

			// 	titleP = $('<p>');
			// 	messageP = $('<p class="message" data-id=" + messages.rows[i].id + ">');

			// 	titleP.text("Title: " + messages.rows[i].title);
			// 	messageP.text("Message: " + messages.rows[i].body)

			// 	messageDiv.append(titleP).append(messageP).append(xButton)
			// 	bigDiv.append(messageDiv)
			// }

			// $('#everything-div').append(bigDiv)
		});

	};
	addBulletin();

	$(document).on('click', '.x-button', function(){
		$.ajax({
			method: 'DELETE',
			url: 'api/delete-post/' + $(this).data('id')
		});
		addBulletin();
	});


	$(document).on('click', '.message', function(){
		
		var postID = $(this).data('id')
		

		$.ajax({


		})
	} )











});