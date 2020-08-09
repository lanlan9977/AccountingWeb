<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Html -->
<!DOCTYPE html>
<html>

<%@include file="/front-end/menu.jsp" %>

<head>
    <title>記帳</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- CSS------------------------------------------------------------------------------>

    <!-- content /css -->
    <link rel="stylesheet" href="../front-end/css/setAchieved.css">

</head>


<body>
    <div class="container" id="index-container">
        <div class="row">

            <div class="col-md-12">
                <div class="alert alert-info" id="index-loading" v-show="!is_show_content">
                    <h3><i class="fa fa-spinner fa-pulse fa-fw fa-2x"></i>LOADING...</h3>
                </div>
            </div>
            <div id="index-content" :class="class_text" style="opacity: 0;">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header bg-secondary text-white">
                                <h3>設定目標</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="col-md-12">
                                            <div class="dropdown show" style="margin-bottom: 10px;">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Dropdown link
                                                </a>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" v-for="(consume_info) in consume_info_list"
                                                        href="#">{{consume_info.consume_type}}</a>
                                                </div>
                                            </div>
                                            <div style="margin-bottom: 10px;">
                                                <label>開始日期:</label>
                                                <!-- <div class="" style="width: 33%;"> -->
                                                <select class="custom-select date-select"
                                                    v-model="select_start_year_value"
                                                    @change="vGetDaysInMonth('start',select_start_year_value,select_start_month_value)">
                                                    <!-- <option selected>Select Year</option> -->
                                                    <option v-for="(year) in start_years_list" :value="year">{{year}}
                                                    </option>
                                                </select>
                                                <!-- </div>
                                                <div class="" style="width: 33%;"> -->
                                                <select class="custom-select date-select"
                                                    v-model="select_start_month_value"
                                                    @change="vGetDaysInMonth('start',select_start_year_value,select_start_month_value)">
                                                    <!-- <option selected>Select Month</option> -->
                                                    <option v-for="(month) in 12" :value="month">{{month}}</option>
                                                </select>
                                                <!-- </div>
                                                <div class="" style="width: 33%;"> -->
                                                <select class="custom-select date-select"
                                                    v-model="select_start_day_value">
                                                    <!-- <option selected>Select Day</option> -->
                                                    <option v-for="(day) in start_days_list" :value="day">{{day}}
                                                    </option>
                                                </select>
                                                <!-- </div> -->
                                            </div>
                                            <div style="margin-bottom: 10px;">
                                                <label>結束日期:</label>
                                                <!-- <div class="" style="width: 33%;"> -->
                                                <select class="custom-select date-select"
                                                    v-model="select_end_year_value"
                                                    @change="vGetDaysInMonth('end',select_end_year_value,select_end_month_value)">
                                                    <!-- <option selected>Select Year</option> -->
                                                    <option v-for="(year) in end_years_list" :value="year">{{year}}
                                                    </option>
                                                </select>
                                                <!-- </div>
                                                <div class="" style="width: 33%;"> -->
                                                <select class="custom-select date-select"
                                                    v-model="select_end_month_value"
                                                    @change="vGetDaysInMonth('end',select_end_year_value,select_end_month_value)">
                                                    <!-- <option selected>Select Month</option> -->
                                                    <option v-for="(month) in 12" :value="month">{{month}}</option>
                                                </select>
                                                <!-- </div>
                                                <div class="" style="width: 33%;"> -->
                                                <select class="custom-select date-select"
                                                    v-model="select_end_day_value">
                                                    <!-- <option selected>Select Day</option> -->
                                                    <option v-for="(day) in end_days_list" :value="day">{{day}}</option>
                                                </select>
                                                <!-- </div> -->
                                            </div>
                                            <div style="margin-bottom: 10px;">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="輸入目標名稱" value="" aria-label="Recipient's username" aria-describedby="button-addon2">
                                                    <input type="number" class="form-control" placeholder="輸入目標金額" value="" aria-label="Recipient's username" aria-describedby="button-addon2">
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-success"
                                                            type="button">發送</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <select class="custom-select">
                                                <option v-for="(consume_info) in consume_info_list">
                                                    {{consume_info.consume_type}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
            </div class="col-md-12">
        </div>
    </div>
</body>

</html>

<!-- content /js -->
<script src="../front-end/js/setAchieved.js"></script>