// This file keeps a check on when user logs in.
 
$(document).ready(function(){
    var jVal = {
        'loginname' : function(){
            
            $('body').append('<div id="loginname" class="valid"></div>');
            
            var loginname = $('#loginname');
            var ele = $('#loginusername');
        },
        
        'passwd' : function(){
            
            $('body').append('<div id="passwd" class="valid"></div>');
            
            var passwd = $('#passwd');
            var ele = $("#loginpassword");
        },
        
        'loginsend' : function(){
            console.log("loginsend");
            var loginname = $('#loginname');
            var ele = $('#loginusername');
            var passwd = $('#passwd');
            var ele2 = $("#loginpassword");
            
            var xmlhttp = new XMLHttpRequest();
            var data = new FormData();
            data.append("username",ele.val());
            data.append("password",ele2.val());
            data.append("js","1");
            xmlhttp.open("POST","/login_do/",false);
            xmlhttp.send(data);
                if(ele.val() == 0 || xmlhttp.responseText=="inv_user"){
                    jVal.errors = true;
                        ele.removeClass('loginokay').addClass('loginwrong');
                        ele2.removeClass('loginwrong').addClass('loginokay');
                }
                if(xmlhttp.responseText=="inv_pass") {
                    jVal.errors = true;
                        ele.removeClass('loginwrong').addClass('loginokay');
                        ele2.removeClass('loginokay').addClass('loginwrong');
                }
                if(xmlhttp.responseText=="disabled") {
                    jVal.errors = true;
                        
                }
                if(xmlhttp.responseText=="done") {
                    ele.removeClass('loginwrong').addClass('loginokay');
                    ele2.removeClass('loginwrong').addClass('loginokay');
                }                
                if(!jVal.errors) {
                    $('#loginform').submit();
                    window.location.replace(document.URL);
                }
        },
        
    };
    
	// This function is called when the login button is clicked. It checks all the fields.
    $('#login').click(function (){
         var obj = $.browser.webkit ? $('body') : $('html');
         obj.animate({ scrollTop: $('#loginusername').offset().top }, 750, function (){
             jVal.errors = false;
             jVal.loginsend();
         });
        jVal.errors = false;
        jVal.loginsend();
        return false;
    });
    $('#logout_link').click(function (){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","/logout_do/",false);
        xmlhttp.send();
        
        window.location = "/";
    });
	// It checks all the fields when the form is filled.
    $('#loginusername').change(jVal.loginname);
    $('#loginpassword').change(jVal.passwd);
});