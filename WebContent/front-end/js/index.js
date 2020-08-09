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

var initData = {
    'is_show_content': false,
    'class_text': 'col-md-12',
    'is_show_charts_div': false,
    'is_show_report_div': false,
    'acount_info_list': [],
    'consume_info_list': [],
    'account_date_text': '2019-09-13',
};

var initVue = new Vue({
    'el': '#index-container',
    'data': initData,
    'create' : create(),
    'init': init(this),
    'methods': {
        vStartQuerySpendInfo() {
            querySpendInfo(this);
        },
        vSortAcountInfoList(searchType) {
            sortAcountInfoList(this, searchType);
        },
        vConvertConsumeType(consumeId) {
            return new Consume().getConsumeType(consumeId);
        },
        vFilterAcountInfoList(consumeId) {
            filterAcountInfoList(this, consumeId)
        }
    },
    'computed': {
    }
});


function create(){
    toggleNavbar(1);
}

function init(vueData) {
    getConsumeItemInfo();
    setTimeout(() => {
        vueData.initData.is_show_content = true;
        vueData.initData.class_text = 'col-md-12 show';
    }, 1000);
}

function querySpendInfo(vueData) {
    startSpendInfoAxios(vueData);

    vueData.is_show_charts_div = true;
    vueData.is_show_report_div = true;
}

async function startSpendInfoAxios(vueData) {
    var accountDateText = vueData.account_date_text;
    let parmObj = {
        'event': 'QUERY_ACOUNTS_INFO_BY_DATE',
        'account_date': accountDateText,
        'member_id': _memberId,
    };
    await axios({
        method: 'post',
        url: '/AccountingProject/AccountsServlet',
        params: parmObj
    }).then(function (response) {
        var rsData = response.data;
        var accountInfoListAry = rsData.accounts_info_list;
        if (accountInfoListAry.length > 0) {
            buildAccountsCharts(accountInfoListAry);
            for (accountInfo of accountInfoListAry) {
                accountInfo.is_show = true;
            }
            vueData.acount_info_list = accountInfoListAry;
            //buildAccountsReport(accountInfoListAry);
        }
    });
}

function buildAccountsCharts(accountInfoListAry) {
    var dateInfoAry = [];
    var dateAry = [];
    var dateSet = new Set();
    var traceAry = [];
    var typeSet = new Set();
    for (accountInfo of accountInfoListAry) {
        var accountDate = accountInfo.accounts_date;
        var accountName = accountInfo.accounts_name;
        var consumeId = accountInfo.consume_id;
        var chkMatch = false;
        for (dataInfo of dateInfoAry) {
            var iDate = dataInfo.accounts_date;
            var iConsumeId = dataInfo.consume_id;
            var iNameList = dataInfo.accounts_name_list;
            if (iDate === accountDate && iConsumeId === consumeId) {
                iNameList.push(accountName)
                chkMatch = true;
            }
        };
        if (!chkMatch) {
            var dateObj = {};
            dateObj.accounts_date = accountDate;
            dateObj.consume_id = consumeId;
            dateObj.accounts_name_list = [accountName];
            dateInfoAry.push(dateObj);
        }
        typeSet.add(consumeId);
        dateSet.add(accountDate);
    };

    dateAry = Array.from(dateSet);
    for (consumeItemInfo of _consumeItemInfoAry) {
        let consumeId = consumeItemInfo.consume_id;
        var filterTypeAry = [];
        for (date of dateAry) {
            var filterDateInfoAry = dateInfoAry.filter(e => e.accounts_date === date && e.consume_id === consumeId);
            if (filterDateInfoAry.length > 0) {
                for (filterDateInfo of filterDateInfoAry) {
                    var iAccountNameList = filterDateInfo.accounts_name_list;
                    filterTypeAry.push(iAccountNameList.length);
                    break;
                };
            } else {
                filterTypeAry.push(0);
            }
        };

        if (filterTypeAry.length > 0) {
            traceAry.push({
                x: dateAry,
                y: filterTypeAry,
                type: "bar",
                name: new Consume().getConsumeType(consumeId)
            });
        }
    };
    var layout = {
        xaxis: {
            'tickformat': '%y/%m/%d',
            'tickmode': 'string',
            'tickangle': 45,
            'type': 'string'
        }
    }
    Plotly.newPlot('account-charts-div', traceAry, layout);
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
    initData.consume_info_list = consumeInfoAry;
    return consumeInfoAry;
}


function sortAcountInfoList(vueData, searchType) {
    vueData.acount_info_list = vueData.acount_info_list.sort((a, b) => {
        if (a[searchType] > b[searchType]) {
            return 1;
        } else if (a[searchType] < b[searchType]) {
            return -1;
        } else {
            return 0;
        }
    });
}

function filterAcountInfoList(vueData, consumeId) {
    var acountInfoAry = vueData.acount_info_list;
    if (consumeId === '00000') {
        for (acountInfo of acountInfoAry) {
            acountInfo.is_show = true;
        }
    } else {
        for (acountInfo of acountInfoAry) {
            var iConsumeId = acountInfo.consume_id;
            if (consumeId === iConsumeId) {
                acountInfo.is_show = true;
            } else {
                acountInfo.is_show = false;
            }
        }
    }
    vueData.acount_info_list = acountInfoAry;
}


