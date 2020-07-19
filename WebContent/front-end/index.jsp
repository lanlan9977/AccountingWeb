<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>




<%
	String event = request.getParameter("_event");
	if("EVENT_LOGIN_OUT".equals(event)){
		Event_login_out(event,session);
	}
%>
<%!
	public void Event_login_out(String iEvent,HttpSession iSession){
		iSession.removeAttribute("member_id");
		iSession.removeAttribute("member_name");
	}

%>
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
	<link rel="stylesheet" href="../front-end/css/index.css">

	<!-- JS ------------------------------------------------------------------------------->

	<!-- plotly /js-->
	<script src="../publiclibrary/plotly-1.51.3/plotly-latest.min.js"></script>

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
					<div class="col-sm-12 col-md-6">
						<div class="card">
							<div class="card-header bg-secondary text-white">
								<h3>開始記帳</h3>
							</div>
							<div class="card-body">
								<label for="add-spend-date"><i class="fa fa-calendar"></i> 請選擇您的日期：</label>
								<div class="col-md-12">
									<input type="text" class="form-control" id="add-spend-date">
								</div>
								<br>

								<label for="spend-name-text"><i class="fa fa-file-text"></i>請輸入您的消費名稱：</label>
								<div class="input-group col-md-12" id="spend-item">
									<input type="text" class="form-control" id="spend-name-text"
										placeholder="請輸入您的消費名稱">
									<div class="input-group-append">
										<button type="button" class="btn btn-primary">送出</button>
									</div>
								</div>
								<br>

								<label for="spend-amount-text" style="display: none;"><i class="fa fa-dollar-sign"></i>
									請輸入您的金額：</label>
								<div class="input-group col-md-12" id="spend-amount" style="display: none;">
									<input type="number" class="form-control" id="spend-amount-text"
										placeholder="請輸入您的金額">
									<div class="input-group-append">
										<button type="button" class="btn btn-primary">送出</button>
									</div>
									<div class="btn-group">
										<button type="button" class="btn btn-danger dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
											data-consume_type="all">
											項目
										</button>
										<div class="dropdown-menu" id="consume-menu">
										</div>
									</div>
								</div>

								<div class="col-md-12" id="result-message" style="display: none;">
									<br>
									<div class="alert alert-warning text-center" role="alert"></div>
								</div>
							</div>
						</div>
						<br>
					</div>
					<div class="col-sm-12 col-md-6">
						<div class="card">
							<div class="card-header bg-success text-white">
								<h3>查詢紀錄</h3>
							</div>
							<div class="card-body" id="query-spend-date-div">
								<label for="qSpeenDate"><i class="fa fa-calendar"></i> 請選擇您的日期:</label>
								<div class="input-group col-md-12">
									<input type="text" class="form-control" id="query-spend-date"消費紀錄圖表
										placeholder="請選擇要查詢的日期" v-model="account_date_text">
									<div class="input-group-append">
										<button type="button" class="btn btn-primary btn-submit" @click="vStartQuerySpendInfo">送出</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-sm-12" style="margin-bottom: 20px;">
						<div class="card bg-light text-dark" style="display: none;" v-show="is_show_charts_div">
							<div class="card-header text-dark">
								<h3>消費紀錄圖表</h3>
							</div>
							<div class="card-body">
								<div class="col-md-12" id="account-charts-div"></div>
							</div>
						</div>
					</div>
					<div class="col-sm-12">
						<div class="card bg-light text-dark" style="display: none;" v-show="is_show_report_div">
							<div class="card-header text-dark">
								<h3>消費紀錄報表</h3>
							</div>
							<div class="card-body">
								<div class="col-md-12" id="account-report-div">
									<div class="btn-group" role="group" style="margin-bottom: 10px;">
										<button type="button" class="btn btn-outline-info" @click="vFilterAcountInfoList('00000')">ALL</button>
										<button type="button" class="btn btn-outline-info" v-for="(consume_info) in consume_info_list" @click="vFilterAcountInfoList(consume_info.consume_id)">{{consume_info.consume_type}}</button>
									</div>

									<table class="table table-hover table-bordered">
										<thead class="thead-dark">
											<tr>
												<th scope="col">#</th>
												<th class="pointer" scope="col" @click="vSortAcountInfoList('consume_id')">項目</th>
												<th class="pointer" scope="col" @click="vSortAcountInfoList('accounts_name')">消費名稱</th>
												<th class="pointer" scope="col" @click="vSortAcountInfoList('accounts_amount')">金額</th>
												<th class="pointer" scope="col" @click="vSortAcountInfoList('accounts_date')">消費日期</th>
												<th class="pointer" scope="col">ACTION</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(acount_info, index) in acount_info_list" v-show="acount_info.is_show">
												<td>{{index + 1}}</td>
												<td>{{vConvertConsumeType(acount_info.consume_id)}}</td>
												<td>{{acount_info.accounts_name}}</td>
												<td>{{acount_info.accounts_amount}}</td>
												<td>{{acount_info.accounts_date}}</td>
												<td><span class="badge badge-info"><i class="fa fa-bar-chart" aria-hidden="true"></i></span></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div class="col-md-12">
		</div>
	</div>
</body>
</html>

<!-- content /js -->
<script src="../front-end/js/index.js"></script>