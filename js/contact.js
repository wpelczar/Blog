---
---
$(document).ready(function () {

    // Test for placeholder support
    $.support.placeholder = (function () {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // Hide labels by default if placeholders are supported
    if ($.support.placeholder) {
        $('.form-label').each(function () {
            $(this).addClass('js-hide-label');
        });

        // Code for adding/removing classes here
        $('.form-group').find('input, textarea').on('keyup blur focus', function (e) {

            // Cache our selectors
            var $this = $(this),
                $parent = $this.parent().find(".form-label");

            if (e.type == 'keyup') {
                if ($this.val() == '') {
                    $parent.addClass('js-hide-label');
                } else {
                    $parent.removeClass('js-hide-label');
                }
            }
            else if (e.type == 'blur') {
                if ($this.val() == '') {
                    $parent.addClass('js-hide-label');
                }
                else {
                    $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
                }
            }
            else if (e.type == 'focus') {
                if ($this.val() !== '') {
                    $parent.removeClass('js-unhighlight-label');
                }
            }
        });
    }

    // validation

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function (element) {
            $(element)
                .closest('.form-group')
                .removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            if (element.prop('type') === 'checkbox') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $('#contact-form').validate({
        rules: {
            email: {
                email: true,
                required: true
            },
            name: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                email: "Wpisz poprawny adres email",
                required: "Wpisz swój email"
            },
            name: {
                required: "Wpisz swoje imię"
            },
            message: {
                required: "Wpisz wiadomość"
            }
        },
        submitHandler: function () {
            var name = $('#name').val();
            var email = $('#email').val();
            var subject = $('#subject').val();
            var message = $('#message').val();
               
            if(subject === ""){
                subject = "[empty subject]";
            }
            
            $('.btn-submit');

            $.ajax({
                url: '{{ "https://formspree.io/"|| append:site.email }}',
                method: "POST",
                data: {
                    name: name,
                    email: email,
                    _subject: subject,
                    subject: subject,
                    message: message
                },
                dataType: "json",
                success: function () {;
                    $('#contact-form .form-control').val('');
                    $('#contact-success-info').show();
                    $('#contact-error-info').hide();
                },
                error: function () {
                    $('#contact-error-info').show();
                    $('#contact-success-info').hide();
                }
            });
        }
    });

    // hide info messages on contact form click
    $('#contact-form').on('click', function(){
        $('#contact-success-info').hide();
        $('#contact-error-info').hide();
    });
});