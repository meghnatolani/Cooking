// This file checks the input fields of the sign up form.

$(document).ready(function(){

    var fVal = {
        
         // The password field is checked and suggestion is provided.
        'passwd' : function() {

            $('body').append('<div id="passwd" class="valid"></div>');
            $('body').append('<div id="conf_passwd" class="valid"></div>');

            var passwd = $('#passwd');
            var conf_passwd = $('#conf_passwd');
            var ele = $('#pass');
            var ele2 = $('#confirmpass');
            var ele3 = $('#oldpass');
            var pos = ele.offset();

            passwd.css({
                top: pos.top+1,
                left: pos.left+ele.outerWidth()+2
            });
            
            var char = /[a-zA-Z]/i;
            var num = /[0-9]/i;
            var spech = /[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]/i;

            if(ele.val().length == 0) {
                fVal.errors = true;
                    passwd.removeClass('correct').removeClass('medium').removeClass('weak').addClass('error').html('&larr; Enter a Password').show();
                    ele.removeClass('normal').addClass('wrong');
            } else {
                if(ele.val() == ele3.val()) {
                    fVal.errors = true;
                    passwd.removeClass('correct').removeClass('medium').removeClass('weak').addClass('error').html('&larr; Enter a New Password').show();
                    ele.removeClass('normal').addClass('wrong');
                } else {
                    if(char.test(ele.val()) && num.test(ele.val()) && spech.test(ele.val())) {
                        passwd.removeClass('error').removeClass('medium').removeClass('weak').addClass('correct').html('&larr; Strength: Strong').show();
                        ele.removeClass('wrong').addClass('normal');
                    } else{
                        if((char.test(ele.val()) && num.test(ele.val())) || (char.test(ele.val()) && spech.test(ele.val())) || (num.test(ele.val()) && spech.test(ele.val()))) {
                            passwd.removeClass('error').removeClass('correct').removeClass('weak').addClass('medium').html('&larr; Strength: Medium').show();
                            ele.removeClass('wrong').addClass('normal');
                        } else {
                            if(char.test(ele.val()) || num.test(ele.val()) || spech.test(ele.val())) {
                                passwd.removeClass('error').removeClass('medium').removeClass('correct').addClass('weak').html('&larr; Strength: Weak').show();
                                ele.removeClass('wrong').addClass('normal');
                            } else {
                                fVal.errors = true;
                                passwd.removeClass('correct').removeClass('medium').removeClass('weak').addClass('error').html('&larr; Erroneous Password').show();
                                ele.removeClass('normal').addClass('wrong');
                            }
                        }
                    }
                }
            }
            
            if(ele.val().length == 0 || ele.val() == ele3.val()){
                fVal.errors = true;
                conf_passwd.hide();
                ele.removeClass('normal').addClass('wrong');
            } else {
                if(ele.val() != ele2.val()) {
                    fVal.errors = true;
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
            var ele = $('#confirmpass');
            var ele2 = $('#pass');
            var ele3 = $('#oldpass');
            var pos = ele.offset();
            fVal.passwd();

            conf_passwd.css({
                top: pos.top+1,
                left: pos.left+ele.outerWidth()+2
            });

            if(ele2.val().length == 0 || ele.val() == ele3.val()){
                    fVal.errors = true;
                        conf_passwd.hide();
                        ele.removeClass('normal').addClass('wrong');
            } else {
                if(ele.val() != ele2.val()) {
                    fVal.errors = true;
                    conf_passwd.removeClass('correct').addClass('error').html('&larr; Not matching').show();
                    ele.removeClass('normal').addClass('wrong');
                } else {
                    conf_passwd.removeClass('error').addClass('correct').html('&radic; Matches').show();
                    ele.removeClass('wrong').addClass('normal');
                }
            }
        },

            'submit' : function (){
                if(!fVal.errors) {
                    console.log("submitting password");
                    $('#changepass').submit();
                }
            }
    };

        // ====================================================== //
    
    $('#change').click(function (){
            fVal.errors = false;
            fVal.passwd();
            fVal.conf_passwd();
            fVal.submit();
        return false;
    });

    // bind fVal.value function to corresponding form field
    $('#pass').change(fVal.passwd);
    $('#confirmpass').change(fVal.conf_passwd);

});
