
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
};

var achievedInitVue = new Vue({
    'el': '#index-container',
    'data': achievedInitData,
    'init': init(this),
});


function init(vueData) {
    getConsumeItemInfo();
    toggleNavbar(2);
    setTimeout(() => {
        vueData.achievedInitData.is_show_content = true;
        vueData.achievedInitData.class_text = 'col-md-12 show';
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