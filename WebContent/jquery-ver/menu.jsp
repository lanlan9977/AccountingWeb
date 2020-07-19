<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- Html -->
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<title>記帳</title>

	<!-- CSS------------------------------------------------------------------------------>
	
	<!-- content /css -->
	<link rel="stylesheet" href="../front-end/css/menu.css">

	<!-- bootstrap 4 /css-->
	<link rel="stylesheet" href="../publiclibrary/css/bootstrap.min.css">

	<!-- jquery-ui /css-->
	<link rel="stylesheet" href="../publiclibrary/css/jquery-ui.css">
	<link rel="stylesheet" href="../publiclibrary/scss/stylesheets/init.css">
	
	<!-- font-awesome /css-->
	<link rel="stylesheet" href="../publiclibrary/font-awesome-4.7.0/css/font-awesome.css">


	<!-- JS ------------------------------------------------------------------------------->

	<!-- jquery /js-->
	<script src="../publiclibrary/js/jquery-3.3.1.slim.min.js"></script>
	<script src="../publiclibrary/js/jquery.min.js"></script>
	<script src="../publiclibrary/js/popper.min.js"></script>
	<script src="../publiclibrary/js/bootstrap.min.js"></script>

	<!-- jquery-ui /js-->
	<script src="../publiclibrary/js/jquery-ui.js"></script>

	<!-- plotly /js-->
	<script src="../publiclibrary/plotly-1.51.3/plotly-latest.min.js"></script>

	<!-- content /js -->
	<script src="../front-end/js/menu.js"></script>
	<script>
		$.ajaxSettings.async = false;
	</script>
</head>

<body>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<ul class="navbar-nav">
			<li class="nav-item" style="display:none;" id="navbar-icon">
				<i class="fas fa-bars fa-lg" style="color:white;"></i>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">開始記帳</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">查詢紀錄</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">設立目標</a>
			</li>
		</ul>

		<ul class="navbar-nav ml-auto">
			<li class="nav-item">
				<button type="button" class="btn btn-dark">
					<span class="fa fa-home" style="font-size: 28px;" id="back-home-btn"></span></button>
				<button type="button" class="btn btn-dark">
					<span class="fa fa-user" style="font-size: 28px;" id="user-info-btn"></span></button>

				<button type="button" id="login-in-Btn" class="btn btn-primary" style="display:none;">登入</button>
				<button type="button" id="login-out-Btn" class="btn btn-primary" style="display:none;">登出</button>
			</li>

			<!-- 	    <li class="nav-item"> -->

			<!-- 	    </li> -->
		</ul>
	</nav><br><br>


	<div class="modal fade" tabindex="-1" id="login-modal" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form>
					<div class="modal-header bg-primary">
						<h5 class="modal-title text-white">登入會員</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">

						<div class="form-group">
							<label for="member-email">電子郵件</label>
							<input type="email" class="form-control" id="member-email" aria-describedby="emailHelp"
								placeholder="Enter email">
							<!-- 					    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
						</div>
						<div class="form-group">
							<label for="member-password">密碼</label>
							<input type="password" class="form-control" id="member-password"
								placeholder="Enter password">
						</div>
						<div class="form-group form-check">
							<label class="form-check-label" for="exampleCheck1">
								<input type="checkbox" class="form-check-input" id="exampleCheck1">記住登入資訊
							</label>
						</div>
						<div class="col-md-12" id="login-rs-msg" style="display: none;">
							<br>
							<div class="alert alert-warning text-center" role="alert"></div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary ml-auto" id="longin-sumbit-btn">登入</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
<script>
	var _memberName = '<c:out value="${member_name}"/>';
	var _memberId = '<c:out value="${member_id}"/>';
</script>
</html>