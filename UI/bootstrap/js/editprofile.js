// This file keeps a check on profile input fields.
//
$(document).ready(function(){

	var jVal = {
		
		'firstn' : function() {
		// The check on first_name input field.
			$('body').append('<div id="fname" class="valid"></div>');

			var fname = $('#fname');
			var ele = $('#efirst_name');
			var pos = ele.offset();
			// The css for first_name inout field.
			fname.css({
				top: pos.top-2,
				left: pos.left+ele.outerWidth()+5
			});

			// At least 1 character for first_name.
			if(ele.val().length == 0) {
				jVal.errors = true;
				fname.removeClass('correct').addClass('error').html('&larr; Input Something').show();
				ele.removeClass('editchange').addClass('wrong');
			} else {
				fname.hide();
				ele.removeClass('wrong').addClass('editchange');
			}
			
			
		},
		
		// The check on last_name input field.
		'lastn' : function() {

			$('body').append('<div id="lname" class="valid"></div>');

			var lname = $('#lname');
			var ele = $('#elast_name');
			var pos = ele.offset();

			lname.css({
				top: pos.top-2,
				left: pos.left+ele.outerWidth()+5
			});

			if(ele.val().length == 0) {
				jVal.errors = true;
				lname.removeClass('correct').addClass('error').html('&larr; Input Something').show();
				ele.removeClass('editchange').addClass('wrong');
			} else {
				lname.hide();
				ele.removeClass('wrong').addClass('editchange');
			}
			
			
		},
		
		// The check on email input field.
		'email' : function() {

			$('body').append('<div id="emailInfo" class="valid"></div>');

			var emailInfo = $('#emailInfo');
			var ele = $('#eemail');
			var pos = ele.offset();

			emailInfo.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()+10
			});

			var patt = /^.+@.+[.].{2,}$/i;
            var xmlhttp = new XMLHttpRequest();
            var data = new FormData();
            data.append("car_number",ele.val());
            data.append("search","email");
            xmlhttp.open("POST","/search_element/",false);
            xmlhttp.send(data);
			if(ele.val().length == 0 || !patt.test(ele.val())) {
				jVal.errors = true;
					emailInfo.removeClass('correct').addClass('error').html('&larr; Wrong format').show();
					ele.removeClass('normal').addClass('wrong');
			} else {
                if(xmlhttp.responseText=="1") {
                    jVal.errors = true;
                        emailInfo.removeClass('correct').addClass('error').html('&larr; already registered').show();
                        ele.removeClass('normal').addClass('wrong');
                } else{
					emailInfo.removeClass('error').addClass('correct').html('&radic; Alright!').hide();
					ele.removeClass('wrong').addClass('editchange');
			}
            }
		},
		
		// The check on phone input field.
		'phone' : function() {

			$('body').append('<div id="phoneInfo" class="valid"></div>');

			var phoneInfo = $('#phoneInfo');
			var ele = $('#ephone_no');
			var pos = ele.offset();

			phoneInfo.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()+10
			});
            
            var patt = /\D/i;
            
            var xmlhttp = new XMLHttpRequest();
            var data = new FormData();
            data.append("phone",ele.val());
            data.append("search","phone");
            xmlhttp.open("POST","/search_element/",false);
            xmlhttp.send(data);
                if(ele.val().length != 10 || patt.test(ele.val())) {
                    jVal.errors = true;
					phoneInfo.removeClass('correct').addClass('error').html('&larr; Enter 10-digit Phone Number').show();
					ele.removeClass('normal').addClass('wrong');
                } else {
                    if(xmlhttp.responseText=="1") {
                        jVal.errors = true;
                        phoneInfo.removeClass('correct').addClass('error').html('&larr; already registered').show();
                        ele.removeClass('editchange').addClass('wrong');
                    } else {
                        phoneInfo.hide();
                        ele.removeClass('wrong').addClass('editchange');
                    }
                }
		},
		
		// The check on vehicle input field.
		'vehicle' : function() {

			$('body').append('<div id="vehicleInfo" class="valid"></div>');

			var vehicleInfo = $('#vehicleInfo');
			var ele = $('#evehicle_no');
			var pos = ele.offset();

			vehicleInfo.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()+10
			});
                        
            var xmlhttp = new XMLHttpRequest();
            var data = new FormData();
            data.append("vehicle",ele.val());
            data.append("search","vehicle");
            xmlhttp.open("POST","/search_element/",false);
            xmlhttp.send(data);
             
                    
                    if(xmlhttp.responseText=="1") {
                        jVal.errors = true;
                        vehicleInfo.removeClass('correct').addClass('error').html('&larr; already registered').show();
                        ele.removeClass('editchange').addClass('wrong');
                    } else {
                        vehicleInfo.hide();
                        ele.removeClass('wrong').addClass('editchange');
                    }
            
		},

		// The check on authorisation input field.
        'auth_sub' : function() {
            var ddl = document.getElementById('auth_type');
            var txt = document.getElementById('id_no');
            
            if(ddl.value=="None" && txt.value=='0')
                jVal.errors = false;
            else if (txt.value=='0')
                jVal.errors = true;
            else {
                jVal.errors = false;
            }
        },

		// When all checks are accepted.
        'done' : function (){
            ele = $('#eemail');
            if(!jVal.errors || ele.val().length != 0) {
                $('#profileform').submit();
            }
        },
     
	};

    
// ====================================================== //

    
    
    // Check every field when an input box field is filled.
    $('#efirst_name').change(jVal.firstn);
    $('#elast_name').change(jVal.lastn);
    $('#eemail').change(jVal.email);
    $('#ephone_no').change(jVal.phone);
    $('#evehicle_no').change(jVal.vehicle);
    

	// This is executed when edit profile is submitted.
    $('#editprofile').click(function (){
        var obj = $.browser.webkit ? $('body') : $('html');
        obj.animate({ scrollTop: $('#edit').offset().top }, 750, function (){
            jVal.errors = false;
            jVal.firstn();
	    jVal.lastn();
            jVal.email();
            jVal.phone();
	    jVal.vehicle();
        jVal.auth_sub();
            jVal.done();
        });
        return false;
    });


});
