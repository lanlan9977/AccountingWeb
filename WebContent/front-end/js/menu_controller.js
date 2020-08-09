
export {menuInitVue,toggleNavbar };

 var menuInitData = {
    'is_login': false,
    'member_name': _memberName,
    'is_show_login_modal': false,
    'is_show_alert': false,
    'login_modal_class_text': 'modal fade',
    'modal_backdrop_class_text': 'modal-backdrop fade',
    'member_accounts': '',
    'member_password': '',
    'alert_msg_text': '',
    'alert_class_text': 'alert text-center',
    'navbar_show_index': '',
};


var alertTemplateData = {
    props: ['item'],
    template: '<strong>{{item.alert_msg_text}}</strong>',
};

var menuInitVue = new Vue({
    'el': '#menu-navbar',
    'data': menuInitData,
    'init': menuInit(this),
    'methods': {
        toggleModal() {
            toggleLoginModal(this);
        },
        loginIn() {
            startLoginAxios(this);
        },
        loginOut() {
            window.location.replace('/AccountingProject/front-end/index.jsp?_event=EVENT_LOGIN_OUT');
        }
    },
    components: {
        'alert-template': alertTemplateData,
    }
});


function menuInit(vueData) {
    console.log(6578);
    console.log(menuInitVue);
    if (_memberId !== '' && _memberName !== '') {
        vueData.menuInitData.is_login = true;
    } else {
        vueData.menuInitData.is_login = false;
    }
}

function toggleLoginModal(vueData) {
    var isShowModal = vueData.is_show_login_modal;
    if (!isShowModal) {
        vueData.login_modal_class_text = 'modal fade show',
            vueData.modal_backdrop_class_text = 'modal-backdrop fade show',
            vueData.is_show_login_modal = true;
    } else {
        vueData.login_modal_class_text = 'modal fade',
            vueData.modal_backdrop_class_text = 'modal-backdrop fade',
            vueData.is_show_login_modal = false;
    }
}

function startLoginAxios(vueData) {
    var memberAccounts = vueData.member_accounts;
    var memberPassword = vueData.member_password;
    let parmObj = {
        'member_acc': memberAccounts,
        'member_pwd': memberPassword,
    };
    axios({
        method: 'get',
        url: '/AccountingProject/MemberServlet',
        params: parmObj
    }).then(function (response) {
        var rsData = response.data;
        stopLoginAxios(vueData, rsData);
    });
}

function stopLoginAxios(vueData, rsData) {
    var rtnCode = rsData.rtn_code;
    var rtnMsg = rsData.rtn_message;
    if (rtnCode == '000000') {
        vueData.alert_msg_text = 'Info!' + rtnMsg;
        vueData.alert_class_text = 'alert alert-info text-center';
        vueData.is_show_alert = true;
        setTimeout(() => {
            window.location.replace('/AccountingProject/front-end/index.jsp');
        }, 1000);
    } else {
        vueData.alert_msg_text = 'Danger!' + rtnMsg;
        vueData.alert_class_text = 'alert alert-danger text-center';
        vueData.is_show_alert = true;
    }
}

function toggleNavbar(index) {
    menuInitData.navbar_show_index = index;
}
