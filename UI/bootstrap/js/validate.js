// This file checks the input fields of the sign up form.

$(document).ready(function(){
    var x = 1;
	var jVal = {
        
		// The gender field is checked.
		'gender' : function (){

			$('body').append('<div id="genderInfo" class="valid"></div>');

			var genderInfo = $('#genderInfo');
			var ele = $('#f');
			var pos = ele.offset();

			genderInfo.css({
				top: pos.top-1,
				left: pos.left+ele.outerWidth()+55
			});

			if($('input[name="gender"]:checked').length == 0) {
				jVal.errors = true;
                x = 1;
					genderInfo.removeClass('correct').addClass('error').html('&larr; Please select your Gender!').show();
					ele.removeClass('normal').addClass('wrong');
			} else {
					genderInfo.removeClass('error').addClass('correct').html('&radic; Okay').hide();
					ele.removeClass('wrong').addClass('normal');
			}
		},
	  
		// The username field is checked.
		'usern' : function() {

			$('body').append('<div id="uname" class="valid"></div>');

			var uname = $('#uname');
			var ele = $('#username');
			var pos = ele.offset();

			uname.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()+45
			});
            
            var patt = /^[a-zA-Z0-9]+$/i;
            var pat = /^[a-zA-Z]+./i;
            
			var xmlhttp = new XMLHttpRequest();
			var data = new FormData();
			data.append("username",ele.val());
            data.append("search","username");
			xmlhttp.open("POST","/search_element/",false);
			xmlhttp.send(data);
                if(ele.val() == 0){
                    jVal.errors = true;
                x = 1;
                        uname.removeClass('correct').addClass('error').html('&larr; Enter a username').show();
                        ele.removeClass('normal').addClass('wrong');
                } else {
                    if(!patt.test(ele.val())) {
                        jVal.errors = true;
                x = 1;
                        uname.removeClass('correct').addClass('error').html('&larr; Only alpha-numeric username without spaces allowed').show();
                        ele.removeClass('normal').addClass('wrong');
                    } else {
                        if(!pat.test(ele.val())) {
                            jVal.errors = true;
                x = 1;
                            uname.removeClass('correct').addClass('error').html('&larr; Start with alphabet').show();
                            ele.removeClass('normal').addClass('wrong');
                        } else {
                            if(xmlhttp.responseText=="1") {
                                jVal.errors = true;
                x = 1;
                                uname.removeClass('correct').addClass('error').html('&larr; already taken').show();
                                ele.removeClass('normal').addClass('wrong');
                            } else {
                                uname.removeClass('error').addClass('correct').html('&radic; available').show();
                                ele.removeClass('wrong').addClass('normal');
                            }
                        }
                    }
                }
		},
		
		// The first_name field is checked.
		'firstn' : function() {

			$('body').append('<div id="fname" class="valid"></div>');

			var fname = $('#fname');
			var ele = $('#first_name');
			var pos = ele.offset();

			fname.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()-315
			});
            
            var space = /(^\s|\s{2,}|\s$)/i;

			if(ele.val().length == 0) {
				jVal.errors = true;
                x = 1;
					fname.removeClass('correct').addClass('error').html('Input Something &rarr;').show();
					ele.removeClass('normal').addClass('wrong');
			} else {
                if(space.test(ele.val())){
                    jVal.errors = true;
                x = 1;
                    fname.removeClass('correct').addClass('error').html('No spaces allowed &rarr;').show();
                    ele.removeClass('normal').addClass('wrong');
                } else {
					fname.hide();
					ele.removeClass('wrong').addClass('normal');
                }
            }
		},
		
		// The password field is checked and suggestion is provided.
		'passwd' : function() {

			$('body').append('<div id="passwd" class="valid"></div>');
			$('body').append('<div id="conf_passwd" class="valid"></div>');

			var passwd = $('#passwd');
			var conf_passwd = $('#conf_passwd');
			var ele = $('#password');
			var ele2 = $('#confirmpassword');
			var pos = ele.offset();

			passwd.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()-320
			});
            
            var char = /[a-zA-Z]/i;
            var num = /[0-9]/i;
            var spech = /[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]/i;

			if(ele.val().length == 0) {
				jVal.errors = true;
                x = 1;
					passwd.removeClass('correct').removeClass('medium').removeClass('weak').addClass('error').html('Enter a Password &rarr;').show();
					ele.removeClass('normal').addClass('wrong');
			} else {
                if(char.test(ele.val()) && num.test(ele.val()) && spech.test(ele.val())) {
                    passwd.removeClass('error').removeClass('medium').removeClass('weak').addClass('correct').html('Strength: Strong &rarr;').show();
                    ele.removeClass('wrong').addClass('normal');
                } else{
                    if((char.test(ele.val()) && num.test(ele.val())) || (char.test(ele.val()) && spech.test(ele.val())) || (num.test(ele.val()) && spech.test(ele.val()))) {
                        passwd.removeClass('error').removeClass('correct').removeClass('weak').addClass('medium').html('Strength: Medium &rarr;').show();
                        ele.removeClass('wrong').addClass('normal');
                    } else {
                        if(char.test(ele.val()) || num.test(ele.val()) || spech.test(ele.val())) {
                            passwd.removeClass('error').removeClass('medium').removeClass('correct').addClass('weak').html('Strength: Weak &rarr;').show();
                            ele.removeClass('wrong').addClass('normal');
                        } else {
                            jVal.errors = true;
                x = 1;
                            passwd.removeClass('correct').removeClass('medium').removeClass('weak').addClass('error').html('Erroneous Password &rarr;').show();
                            ele.removeClass('normal').addClass('wrong');
                        }
                    }
                }
            }
			
			if(ele.val().length == 0){
                jVal.errors = true;
                x = 1;
                conf_passwd.hide();
                ele.removeClass('normal').addClass('wrong');
            } else {
                if(ele.val() != ele2.val()) {
                    jVal.errors = true;
                x = 1;
					conf_passwd.removeClass('correct').addClass('error').html('&larr; Not matching').show();
					ele.removeClass('normal').addClass('wrong');
                } else {
					conf_passwd.removeClass('error').addClass('correct').html('&radic; Matches').show();
					ele.removeClass('wrong').addClass('normal');
                }
            }
		},
		
		// The confirm password field is checked with password field.
		'conf_passwd' : function() {

			$('body').append('<div id="conf_passwd" class="valid"></div>');

			var conf_passwd = $('#conf_passwd');
			var ele = $('#confirmpassword');
			var ele2 = $('#password');
			var pos = ele.offset();
			jVal.passwd();

			conf_passwd.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()+10
			});

            if(ele2.val().length == 0){
                    jVal.errors = true;
                x = 1;
                        conf_passwd.hide();
                        ele.removeClass('normal').addClass('wrong');
            } else {
                if(ele.val() != ele2.val()) {
                    jVal.errors = true;
                x = 1;
                    conf_passwd.removeClass('correct').addClass('error').html('&larr; Not matching').show();
                    ele.removeClass('normal').addClass('wrong');
                } else {
					conf_passwd.removeClass('error').addClass('correct').html('&radic; Matches').show();
					ele.removeClass('wrong').addClass('normal');
                }
            }
		},
		
		// The email field is checked.
		'email' : function() {

			$('body').append('<div id="emailInfo" class="valid"></div>');

			var emailInfo = $('#emailInfo');
			var ele = $('#email');
			var pos = ele.offset();

			emailInfo.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()+40
			});

			var patt = /^.+@.+[.].{2,}$/i;
            var space = /\s/g;
            
            var xmlhttp = new XMLHttpRequest();
            var data = new FormData();
            data.append("email",ele.val());
            data.append("search","email");
            xmlhttp.open("POST","/search_element/",false);
            xmlhttp.send(data);
			if(!patt.test(ele.val())) {
				jVal.errors = true;
                x = 1;
					emailInfo.removeClass('correct').addClass('error').html('&larr; Wrong format').show();
					ele.removeClass('normal').addClass('wrong');
			} else {
                if(space.test(ele.val())) {
                    jVal.errors = true;
                x = 1;
                    emailInfo.removeClass('correct').addClass('error').html('&larr; wrong use of spaces').show();
                    ele.removeClass('normal').addClass('wrong');
                } else {
                if(xmlhttp.responseText=="1") {
                    jVal.errors = true;
                x = 1;
                        emailInfo.removeClass('correct').addClass('error').html('&larr; already registered').show();
                        ele.removeClass('normal').addClass('wrong');
                    } else{
                        emailInfo.removeClass('error').addClass('correct').html('&radic; Alright!').hide();
                        ele.removeClass('wrong').addClass('normal');
                    }
                }
            }
		},
		
		// The phone field is checked.
		'phone' : function() {

			$('body').append('<div id="phoneInfo" class="valid"></div>');

			var phoneInfo = $('#phoneInfo');
			var ele = $('#phone');
			var pos = ele.offset();

			phoneInfo.css({
				top: pos.top+1,
				left: pos.left+ele.outerWidth()+40
			});
            
            var patt = /\D/g;
            
            var xmlhttp = new XMLHttpRequest();
            var data = new FormData();
            data.append("phone",ele.val());
            data.append("search","phone");
            xmlhttp.open("POST","/search_element/",false);
            xmlhttp.send(data);
                if(ele.val().length != 10 || patt.test(ele.val())) {
                    jVal.errors = true;
                x = 1;
					phoneInfo.removeClass('correct').addClass('error').html('&larr; Enter 10-digit Phone Number').show();
					ele.removeClass('normal').addClass('wrong');
                } else {
                    if(xmlhttp.responseText=="1") {
                        jVal.errors = true;
                x = 1;
                        emailInfo.removeClass('correct').addClass('error').html('&larr; already registered').show();
                        ele.removeClass('normal').addClass('wrong');
                    } else {
                        phoneInfo.hide();
                        ele.removeClass('wrong').addClass('normal');
                    }
                }
		},
        
		// The car_number field is checked.
        'car_no' : function() {

            $('body').append('<div id="carno" class="valid"></div>');

            var carno = $('#carno');
            var ele = $('#car_number');
            var pos = ele.offset();

            carno.css({
                top: pos.top+1,
                left: pos.left+ele.outerWidth()+40
            });
            
            var patt = /(^\s|\s{2,}|\s$)/i;

            if(ele.val().length == 0) {
                    carno.removeClass('correct').addClass('error').html('&larr; Input Something').hide();
                    ele.removeClass('wrong').addClass('normal');
            } else {
                if(patt.test(ele.val())) {
                jVal.errors = true;
                x = 1;
                    carno.removeClass('correct').addClass('error').html('&larr; Illegal spaces').show();
                    ele.removeClass('normal').addClass('wrong');                    
                } else {
                    carno.hide();
                    ele.removeClass('wrong').addClass('normal');
            }
            }
        },

		// If no errors in form, the form is submitted.
        'sendIt' : function (){
            if(!jVal.errors) {
                $('#signupform').submit();
            }
        }
	};
    
// ====================================================== //

	// the function executes when sign up button is clicked and checks for all errors.
    $('#signup').click(function (){
            if (x==0)
                return;
            x = 0;
            jVal.errors = false;
            
            jVal.gender();
            jVal.usern();
            jVal.firstn();
            jVal.passwd();
            jVal.conf_passwd();
            jVal.email();
            jVal.phone();
            jVal.car_no();
            jVal.sendIt();
    });

	// bind jVal.value function to corresponding form field
	$('input[name="gender"]').change(jVal.gender);
	$('#username').change(jVal.usern);
	$('#first_name').change(jVal.firstn);
	$('#password').change(jVal.passwd);
	$('#confirmpassword').change(jVal.conf_passwd);
	$('#email').change(jVal.email);
	$('#phone').change(jVal.phone);
    $('#car_number').change(jVal.car_no);

});