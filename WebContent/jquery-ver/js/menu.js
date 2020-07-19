window.onload = menuInit;

function menuInit() {
    var width = $(window).width();
    if (width <= 1090) {
        $('#navbar-icon').show();
        $('#navbar-icon').nextAll('li').hide();
    } else {
        $('#navbar-icon').hide();
        $('#navbar-icon').nextAll('li').show();
    }

    if (_memberName != '') {
        $('#login-out-Btn').show();
        $('#member-navbar-iD').text(_memberName);
    } else {
        $('#login-in-Btn').show();
    }

}

$(window).resize(function () {
    var width = $(window).width();
    if (width <= 1090) {
        $('#navbar-icon').show();
        $('#navbar-icon').nextAll('li').hide();
    } else {
        $('#navbar-icon').hide();
        $('#navbar-icon').nextAll('li').show();
    }

});

$(document).on('click','#login-in-Btn',function () {
    $('#result-message').hide();
    $('#login-modal').modal();
});

$(document).on('click','#login-out-Btn',function () {
    window.location = '/AccountingProject/front-end/index.jsp?_event=EVENT_LOGIN_OUT';
});

$(document).on('click','#back-home-btn',function () {
    window.location = '/AccountingProject/front-end/index.jsp';
});

$(document).on('click','#longin-sumbit-btn',function () {
    var memberAcc = $('#member-email').val();
    var memberPwd = $('#member-password').val();
    if (memberAcc == '') {
        $('#login-rs-msg div').attr('class', 'alert alert-warning text-center').html('<strong>Warning!</strong>帳號不得為空');
    } else if (memberPwd == '') {
        $('#login-rs-msg div').attr('class', 'alert alert-warning text-center').html('<strong>Warning!</strong>密碼不得為空');
    } else {
        $.getJSON('/AccountingProject/MemberServlet?member_acc=' + memberAcc + '&member_pwd=' + memberPwd, function (rs) {
            var rtnMessage = rs.rtn_message;
            var rtnCode = rs.rtn_code;
            var status;
            if (rtnCode == '000000') {
                var memberInfo = rs.info;
                $('#login-rs-msg div').attr('class', 'alert alert-info text-center').html('<strong>Info!</strong>' + rtnMessage);
                setTimeout(function () { window.location = "/AccountingProject/front-end/index.jsp" }, 1500);
            } else {
                $('#login-rs-msg div').attr('class', 'alert alert-danger text-center').html('<strong>Danger!</strong>' + rtnMessage);
            }
        });
    }
    $('#login-rs-msg').show('fast');
});
