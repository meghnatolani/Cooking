var list = []
// the fuction checks the checked msgs and stores them in list
function cc(id){
	mid = id;
	var index = list.indexOf(mid);
	if(index>-1){
		if (index > -1) {
    		list.splice(index, 1);
		}
	}
	else{
		list.push(mid);
	}
	console.log(list.toString());
}

function delete_messages()
{	
	if (list.length > 0){
	    var xmlhttp = new XMLHttpRequest();
	    var data = new FormData();
	    data.append("mids",list.toString());
	    xmlhttp.open("POST","/delete_message/",false);
	    xmlhttp.send(data);
	}
}

function showDivs(start)
{
	var div;
	var inp = start;
	// remove the reply box
	var rep = document.getElementById("reply");
	rep.style.display = "none";
	
	for(var i=1; i <= {{max_mid}};i++)
	{
        div = document.getElementById('div' + i)
        if (div==null)
            continue;
		if(div.style.display == 'none')
			if(i == inp)
            {
				div.style.display = 'block';
				flag1=1;
            }
            if (i != inp) div.style.display = 'none';
	}
}
function showhide()
{
    var rep = document.getElementById("reply");
    rep.style.display = "block";
    var message = null;
    var mid = 0;
    for(var i=1; i <= {{max_mid}};i++)
    {
        
        div = document.getElementById('div' + i)
        if(div==null)
            continue;
        if (div.style.display == 'block')
        {
            mid = i;
            message = document.getElementById('div' + i);
            div.style.display = 'none';
        }
    }
    var reply_title= document.getElementById('reply_title');
//     console.log(mid);
//     console.log(messages);
    reply_title.innerHTML = "Reply To: " + message.getAttribute('name');
    
    var reply_div = document.getElementById('reply_mid');
    reply_div.innerHTML = "<input id='lol' name='mid' value='" + mid + "' style='display:none'></input>"
//     console.log(message.getAttribute('name'));
//     rep
    
    
//     entry = document.getElementById("mlist_entry" + i);
//     console.log("lol");
//     entry.style.fontWeight='normal';
//     var xmlhttp = new XMLHttpRequest();
//     var data = new FormData();
//     data.append("mid",mid);
//     xmlhttp.open("POST","/read_message/",true);
//     xmlhttp.send(data);
//     console.log("loL");
}
// var list

$(document).ready(function() {
    $('#selectall').click(function() {	//on click
    	if(this.checked){
    		{% for message in messages %}
	    		a = document.getElementById("checkbox{{message.id}}");
	    		if(a.checked == false){
	    			a.click();
	    		}
	        	a.checked = true;
	    	{% endfor %}
	    }
    	else{
    		{% for message in messages %}
	    		a = document.getElementById("checkbox{{message.id}}");
	        	a.checked = false;
	        	list = [];
	        {% endfor %}
	    }
    });   
});

// $(document).ready(function() {
//     $('#selectall').click(function() {	//on click
// 	        alert('here');
// 	        // if(this.checked) { // check select status
	            
// 	        // 	{% for message in messages %}	
// 	        //     	a = document.getElementById("checkbox{{message.id}}");
// 	        //     	a.checked = false;
// 	        //     {% endfor %}
// 	        // }
// 	        // }else{
// 	        // 	{% for message in messages %}   
// 	        //     	a = document.getElementById("checkbox{{message.id}}");
// 	        // 		a.checked = true;
// 	        //     {% endfor %}
// 	        }
//     });
// });
	 
/* searches for messages according 
 * to the given string
 */
$(function () {
    $( '#searchable-container' ).searchable({
        searchField: '#container-search',
        selector: '.row',
        childSelector: '.col-xs-12',
        show: function( elem ) {
            elem.slideDown(100);
        },
        hide: function( elem ) {
            elem.slideUp( 100 );
        }
    })
});
	 
/**
 *
 * jquery.charcounter.js version 1.2
 * requires jQuery version 1.2 or higher
 * Copyright (c) 2007 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */
 
(function($) {
    /**
	 * attaches a character counter to each textarea element in the jQuery object
	 * usage: $("#myTextArea").charCounter(max, settings);
	 */
	
	$.fn.charCounter = function (max, settings) {
		max = max || 100;
		settings = $.extend({
			container: "<span></span>",
			classname: "charcounter",
			format: "(%1 characters remaining)",
			pulse: true,
			delay: 0
		}, settings);
		var p, timeout;
		
		function count(el, container) {
			el = $(el);
			if (el.val().length > max) {
			    el.val(el.val().substring(0, max));
			    if (settings.pulse && !p) {
			    	pulse(container, true);
			    };
			};
			if (settings.delay > 0) {
				if (timeout) {
					window.clearTimeout(timeout);
				}
				timeout = window.setTimeout(function () {
					container.html(settings.format.replace(/%1/, (max - el.val().length)));
				}, settings.delay);
			} else {
				container.html(settings.format.replace(/%1/, (max - el.val().length)));
			}
		};
		
		function pulse(el, again) {
			if (p) {
				window.clearTimeout(p);
				p = null;
			};
			el.animate({ opacity: 0.1 }, 100, function () {
				$(this).animate({ opacity: 1.0 }, 100);
			});
			if (again) {
				p = window.setTimeout(function () { pulse(el) }, 200);
			};
		};
		
		return this.each(function () {
			var container;
			if (!settings.container.match(/^<.+>$/)) {
				// use existing element to hold counter message
				container = $(settings.container);
			} else {
				// append element to hold counter message (clean up old element first)
				$(this).next("." + settings.classname).remove();
				container = $(settings.container)
								.insertAfter(this)
								.addClass(settings.classname);
			}
			$(this)
				.unbind(".charCounter")
				.bind("keydown.charCounter", function () { count(this, container); })
				.bind("keypress.charCounter", function () { count(this, container); })
				.bind("keyup.charCounter", function () { count(this, container); })
				.bind("focus.charCounter", function () { count(this, container); })
				.bind("mouseover.charCounter", function () { count(this, container); })
				.bind("mouseout.charCounter", function () { count(this, container); })
				.bind("paste.charCounter", function () { 
					var me = this;
					setTimeout(function () { count(me, container); }, 10);
				});
			if (this.addEventListener) {
				this.addEventListener('input', function () { count(this, container); }, false);
			};
			count(this, container);
		});
	};

})(jQuery);

$(function() {
    $(".counted").charCounter(320,{container: "#counter"});
});
