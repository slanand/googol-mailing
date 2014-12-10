$(document).ready(function() {
	
	// gets collection names on lists page
	$.ajax({
		url: "/mylists",
		type: 'GET',
		success: function(result) {
			$('#lists').html(result);
		}
	});

	// displays email form on email page
	$.ajax({
		url: "/email.html/form",
		type: 'GET',
		success: function(result) {
			$("#postEmailForm").html(result);
		}
	});

	// POST email ajax request
	$('#postEmailForm').submit(function(){
		var query = "/email/";
		var body = $("#body").val().replace(/\n/g, '<br>');
		console.log(typeof($('#toList').val()));		
		query += $('#toList').val() + "/" + $('#subjectTitle').val() 
		 + "/" + body; 
		 console.log(query);
		$.ajax({
			url: query,
			type: 'POST',
			success: function(result) {
				$('#alert').append(result);
			}
		});
		return false;
	});

	// PUT ajax request
	$('#putForm').submit(function(){
		var query = "/m2clists/";
		var firstname = $('#putForm .fname').val().charAt(0).toUpperCase() + $('#putForm .fname').val().slice(1);
		var lastname = $('#putForm .lname').val().charAt(0).toUpperCase() + $('#putForm .lname').val().slice(1);
		query += $('#putForm .listName').val().toLowerCase() + "?" + "firstname=" + firstname + "&" +
				 "lastname=" + lastname + "&" + "email=" + $('#putForm .email').val().toLowerCase();
		console.log(query);
		$.ajax({
			url: query,
			type: 'PUT',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// GET ajax request
	$('#getForm').submit(function(){
		var query = "/m2clists/";
		query += $('#getForm .listName').val().toLowerCase() + "?" + "email=" + $('#getForm .email').val().toLowerCase();
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// POST (update) ajax request
	$('#postForm').submit(function(){
		var query = "/m2clists/";
		var firstname = $('#putForm .fname').val().charAt(0).toUpperCase() + $('#putForm .fname').val().slice(1);
		var lastname = $('#putForm .lname').val().charAt(0).toUpperCase() + $('#putForm .lname').val().slice(1);
		query += $('#postForm .listName').val() + "/" + $('#postForm .currEmail').val().toLowerCase() + "?" + 
				"firstname=" + firstname + "&" + "lastname=" + lastname + "&" +
				"email=" + $('#postForm .email').val().toLowerCase(); 
		$.ajax({
			url: query,
			type: 'POST',
			success: function(result) {
				$('#update').html(result);
			}
		});
		return false;
	});

	// DELETE contact ajax request
	$('#deleteForm').submit(function(){
		var query = "/m2clists/";
		query += $('#deleteForm .listName').val().toLowerCase() + "?" + 
				 "email=" + $('#deleteForm .email').val().toLowerCase();
		$.ajax({
			url: query,
			type: 'DELETE',
			success: function(result) {
				$('#delete').html(result);
			}
		});
		return false;
	});

	// login ajax request
	$('#loginForm').submit(function(){
		var query = "/login/";
		query += $('#username').val().toLowerCase() + "/" + $('#inputPassword').val();
		$.ajax({
			url: query,
			type: 'POST',
			success: function(result) {
				console.log("result: ", result)
				console.log("result.login: ", result.login)
				$('#loginStatus').html(result);
			}
		});
		return false;
	});

	// shows contacts of certain collection on lists page
	$('#lists').click(function(e) {
		var query = "/lists/";
		var listname = $(e.target).closest('div').prop("id");
		query += listname;
		$.ajax({
			url:query,
			type: 'GET',
			success: function(result) {
				$("#" + listname + " span").html(result);
			}
		});
		return false;
	});

	// Grabs 6 most recent pictures of specified hashtag from Instagram
	$("#instaPics").click(function() {
	  var tag = $("#tag").val();
	  try {
	    $.ajax({
	      type: "GET",
	      url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=8372b5642ba843e5a225b1291426c9d8&callback=displayPics",
	      jsonp: true,
	      dataType: "jsonp",
	      crossDomain: true
	    });
	    return false;
	  } catch (error) {console.log(error.description);}
	});

});

// callback function for displaying images from instagram
function displayPics(response) {
  var picArray = [];
  for (var i = 0; i < 6; i ++) {
    // parse through response from Ajax request to grab a single image link
    var picString = "<img src=" + response.data[i].link + "media\/?size=t>";
    picArray += picString;
  }
  // set the images div with new picArray created from Ajax request
  $("#images").html(picArray);
}
