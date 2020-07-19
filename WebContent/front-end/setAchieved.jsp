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
                    <div class="col-sm-12 col-md-6">
                        <div class="card">
                            <div class="card-header bg-secondary text-white">
                                <h3>設定目標</h3>
                            </div>
                            <div class="card-body">
                                <div class="dropdown show">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        Dropdown link
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" v-for="(consume_info) in consume_info_list"
                                            href="#">{{consume_info.consume_type}}</a>
                                    </div>
                                </div>
                                <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                                    <b-dropdown-item>First Action</b-dropdown-item>
                                    <b-dropdown-item>Second Action</b-dropdown-item>
                                    <b-dropdown-item>Third Action</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item active>Active action</b-dropdown-item>
                                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                                  </b-dropdown>
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