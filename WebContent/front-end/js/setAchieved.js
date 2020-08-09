
var _consumeItemInfoAry;

var Consume = function () {
    // this.consume_id = consumeId;
    // this.consume_type = consumeType
}

Consume.prototype = {
    getConsumeId: function (consumeType) {
        return _consumeItemInfoAry.find(e => e.consume_type === consumeType).consume_id
    },
    getConsumeType: function (consumeId) {
        return _consumeItemInfoAry.find(e => e.consume_id === consumeId).consume_type
    },
};

var achievedInitData = {
    'is_show_content': false,
    'class_text': 'col-md-12',
    'consume_info_list': [],

    'start_years_list': [],
    'start_days_list': [],
    'select_start_year_value': new Date().getFullYear(),
    'select_start_month_value': new Date().getMonth() + 1,
    'select_start_day_value': new Date().getDate(),

    'end_years_list': [],
    'end_days_list': [],
    'select_end_year_value': new Date().getFullYear(),
    'select_end_month_value': new Date().getMonth() + 1,
    'select_end_day_value': new Date().getDate(),
};

var achievedInitVue = new Vue({
    'el': '#index-container',
    'data': achievedInitData,
    'create': create(),
    'init': init(this),
    'methods': {
        vGetDaysInMonth(dateCat, year, month) {
            getDaysInMonth(this, dateCat, year, month);
        }
    }
});

function create() {
    toggleNavbar(2);
}


function init(vueInitData) {
    getConsumeItemInfo();
    setTimeout(() => {
        vueInitData.achievedInitData.is_show_content = true;
        vueInitData.achievedInitData.class_text = 'col-md-12 show';
        vueInitData.achievedInitData.start_years_list = getMonthInYear();
        vueInitData.achievedInitData.end_years_list = getMonthInYear();
        getDaysInMonth(vueInitData.achievedInitData, 'start', vueInitData.achievedInitData.select_start_year_value, vueInitData.achievedInitData.select_start_month_value);
        getDaysInMonth(vueInitData.achievedInitData, 'end', vueInitData.achievedInitData.select_end_year_value, vueInitData.achievedInitData.select_end_month_value);
    }, 1000);
}


async function getConsumeItemInfo() {
    var consumeInfoAry = [];
    var parmObj = {
        'event': 'QUERY_CONSUME_DATA'
    }

    await axios({
        method: 'post',
        url: '/AccountingProject/ConsumeServlet',
        params: parmObj
    }).then(function (response) {
        var rsData = response.data;
        consumeInfoAry = typeof rsData.consume_info_list !== 'undefined' ? rsData.consume_info_list : [];
    });
    _consumeItemInfoAry = consumeInfoAry;
    achievedInitData.consume_info_list = consumeInfoAry;
    return consumeInfoAry;
}

function getDaysInMonth(vueData, dateCat, year, month) {
    // var year = vueData.select_start_year_value;
    // var month = vueData.select_start_month_value - 1;
    var date = new Date(year, (month - 1), 1);
    var daysAry = [];
    while (date.getMonth() === (month - 1)) {
        daysAry.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
    }
    if (dateCat === 'start') {
        vueData.start_days_list = daysAry;
    } else if (dateCat === 'end') {
        vueData.end_days_list = daysAry;
    }
}

function getMonthInYear() {
    var yearAry = [];
    for (var i = -3; i < 3; i++) {
        var date = new Date();
        var year = date.getFullYear() + i;
        yearAry.push(year);
    }
    return yearAry;
}