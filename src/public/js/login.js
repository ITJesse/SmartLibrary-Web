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
                required: "请填写学号",
                minlength: "学号必须大于4位"
            },
            password: {
                required: "请输入密码",
                minlength: "密码至少6位"
            }
        }
    });
});
