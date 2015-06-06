$(document).ready(function() {
    //------------- Options for Supr - admin tempalte -------------//
    var supr_Options = {
        rtl:false//activate rtl version with true
    }
    //rtl version
    if(supr_Options.rtl) {
        localStorage.setItem('rtl', 1);
        $('#bootstrap').attr('href', 'css/bootstrap/bootstrap.rtl.min.css');
        $('#bootstrap-responsive').attr('href', 'css/bootstrap/bootstrap-responsive.rtl.min.css');
        $('body').addClass('rtl');
        $('#sidebar').attr('id', 'sidebar-right');
        $('#sidebarbg').attr('id', 'sidebarbg-right');
        $('.collapseBtn').addClass('rightbar').removeClass('leftbar');
        $('#content').attr('id', 'content-one')
    } else {localStorage.setItem('rtl', 0);}

    $("input, textarea, select").not('.nostyle').uniform();
    $("#loginForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "Fill me please",
                minlength: "My name is bigger"
            },
            password: {
                required: "Please provide a password",
                minlength: "My password is more that 6 chars"
            }
        }
    });
});
