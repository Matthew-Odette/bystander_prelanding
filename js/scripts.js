/* Template: Argo - Training Course Landing Page Template
   Author: InovatikThemes
   Version: 1.0.0
   Created: Aug 2017
   Description: Custom JS file
*/


(function($) {
    "use strict"; 
		
	/* PRELOADER */
	$(window).load(function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});
	
	
	
	/* REGISTRATION FORM */
    $("#RegistrationForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Check if all fields are filled in!");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        // initiate variables with form content
		    var form_u       = $("#form_u").val();
        var form_id      = $("#form_id").val();
        var form_name    = $("#form_name").val();     // MERGE1
        var form_email   = $("#form_email").val();    // MERGE0
		    var form_referer = $("#form_referer").val();  // MERGE2
		
        $.ajax({
            type: "POST",
            url: "https://streamerschool.us17.list-manage.com/subscribe/post",
            data: "u=" + form_u + "&id=" + form_id + "&MERGE1=" + form_name + "&MERGE0=" + form_email + "&MERGE2=" + form_referer, 
            success: function(text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
	}

    function formSuccess() {
        $("#RegistrationForm")[0].reset();
        submitMSG(true, "You Are Registered!")
    }

    function formError() {
        $("#RegistrationForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	

		
	/* REMOVES LONG FOCUS ON BUTTONS */
	$(".button, a, button").mouseup(function(){
		$(this).blur();
	});
	

	
})(jQuery);