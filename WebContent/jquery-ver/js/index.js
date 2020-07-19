var _consumeItemInfoAry;

function Consume(consumeId) {
    this.consume_id = consumeId;
    this.consume_type = _consumeItemInfoAry.filter(function (e) { return e.consume_id === consumeId })[0].consume_type
}


Consume.prototype = {
    getConsumeId: function (consumeType) {
        return _consumeItemInfoAry.filter(function (e) { return e.consume_type === consumeType })[0].consume_id
    }
};

$(document).ready(function () {
    $.ajaxSettings.async = false;
    setTimeout(function () { 
        $('#index-loading').fadeOut('fast',function(){
                
            $('#add-spend-date').datepicker({ dateFormat: 'yy-mm-dd' }).datepicker("setDate", new Date());
            $('#query-spend-date').datepicker({ dateFormat: 'yy-mm-dd' }).datepicker("setDate", new Date('2019-09-13'));
            _consumeItemInfoAry = getConsumeItemInfo();
            setConsumeItemMenu();
            $('#index-content').fadeIn('fast');
        });
     }, 500);
});

$(document).on('click', '#spend-item .btn', function () {
    $('#result-message').hide();
    var spendName = $('#spend-name-text').val();
    if (spendName != '' && typeof spendName != 'undefined') {
        $('#spend-amount').show('fast').prev().show('fast');
    } else {
        $('#result-message div').html('<strong>Warning!</strong>請輸入消費名稱！');
        $('#result-message').show('fast');
    }
});

$(document).on('click', '#spend-amount .btn-primary', function () {
    var spendName = $('#spend-name-text').val();
    var spendAmount = $('#spend-amount-text').val();
    var spendDate = $('#add-spend-date').val();
    var consumeType = $('#consume-menu').prev('.btn').data('consume_type');
    var consumeId = _consumeItemInfoAry.filter(function (e) { return e.consume_type === consumeType })[0].consume_id
    if (spendAmount != '' && typeof spendAmount != 'undefined') {
        let parmObj = {
            'event': 'INSERT_ACOUNTS_INFO_BY_DATE',
            'account_date': spendDate,
            'account_name': spendName,
            'account_amount': spendAmount,
            'consume_id': consumeId,
        };

        $.getJSON('/AccountingProject/AccountsServlet', parmObj, function (rs) {
            if (rs.result_code === '000000') {
                $('#result-message div').attr('class', 'alert alert-success text-center').html('<strong>Success!</strong>輸入成功！');
                $('#result-message').show('fast');
            } else {

                $('#result-message div').attr('class', 'alert alert-danger text-center').html('<strong>Danger!</strong>輸入錯誤！');
                $('#result-message').show('fast');
            }
        });

    } else {
        $('#result-message div').attr('class', 'alert alert-warning text-center').html('<strong>Warning!</strong>請輸入金額！');
        $('#result-message').show('fast');
    }
});

$(document).on('click', '#query-spend-date-div .btn-submit', function () {
    var accountDate = $('#query-spend-date').val();
    var accountInfoListAry = [];
    if (typeof accountDate != 'undefined' && accountDate != '') {
        let parmObj = {
            'event': 'QUERY_ACOUNTS_INFO_BY_DATE',
            'account_date': accountDate,
            'member_id':_memberId,
        };

        $.getJSON('/AccountingProject/AccountsServlet', parmObj, function (rs) {
            accountInfoListAry = rs.accounts_info_list;
        });

        $('#account-charts-div').parents('.card').fadeIn();
        if (accountInfoListAry.length > 0) {
            setAccountsCharts(accountInfoListAry);
        }
    }
});

$(document).on('click', '#consume-menu .dropdown-item', function () {
    var consumeType = $(this).data('consume_type');
    $('#consume-menu').prev('.btn').text(consumeType).data('consume_type', consumeType);
});

function setAccountsCharts(accountInfoListAry) {
    var dateInfoAry = [];
    var dateAry = [];
    var dateSet = new Set();
    var nameAry = [];
    var typeSet = new Set();
    var consumeIdAry = [];
    $.each(accountInfoListAry, function (i, accountInfo) {
        var accountDate = accountInfo.accounts_date;
        var accountName = accountInfo.accounts_name;
        var consumeId = accountInfo.consume_id;
        var chkMatch = false;
        $.each(dateInfoAry, function (i, dataInfo) {
            var iDate = dataInfo.accounts_date;
            var iConsumeId = dataInfo.consume_id;
            var iNameList = dataInfo.accounts_name_list;
            if (iDate === accountDate && iConsumeId === consumeId) {
                iNameList.push(accountName)
                chkMatch = true;
            }
        });
        if (!chkMatch) {
            var dateObj = {};
            dateObj.accounts_date = accountDate;
            dateObj.consume_id = consumeId;
            dateObj.accounts_name_list = [accountName];
            dateInfoAry.push(dateObj);
        }
        typeSet.add(consumeId);
        dateSet.add(accountDate);

    });
    consumeIdAry = Array.from(typeSet);
    dateAry = Array.from(dateSet);

    var traceAry = [];
    $.each(_consumeItemInfoAry, function () {
        let consumeId = this.consume_id;

        var filterTypeAry = [];
        $.each(dateAry, function (i, date) {
            $.each(dateInfoAry.filter(function (e) { return e.accounts_date === date && e.consume_id === consumeId }), function () {
                var iAccountNameList = this.accounts_name_list;
                filterTypeAry.push(iAccountNameList.length);
                return false;
            });
        });

        if (filterTypeAry.length > 0) {
            traceAry.push({
                x: dateAry,
                y: filterTypeAry,
                type: "bar",
                name: new Consume(consumeId).consume_type
            });
        }
    });

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

function getConsumeItemInfo() {
    var consumeInfoAry = [];
    var parmObj = {
        'event': 'QUERY_CONSUME_DATA'
    }
    $.getJSON('/AccountingProject/ConsumeServlet', parmObj, function (rs) {
        consumeInfoAry = typeof rs.consume_info_list !== 'undefined' ? rs.consume_info_list : [];
    });
    return consumeInfoAry;
}

function setConsumeItemMenu() {
    var itemHtml = '';
    $.each(_consumeItemInfoAry, function () {
        var consumeType = this.consume_type;
        itemHtml += '<a class="dropdown-item" href="#" data-consume_type="' + consumeType + '">' + consumeType + '</a>';
    });
    $('#consume-menu').html(itemHtml);
}