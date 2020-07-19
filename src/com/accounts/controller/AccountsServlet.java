package com.accounts.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.accounts.model.AccountsService;
import com.accounts.model.AccountsVO;


/**
 * Servlet implementation class AccountsServlet
 */
@WebServlet("/AccountsServlet")
public class AccountsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request,response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");

		String requestEvent = request.getParameter("event");

		AccountsService accountsService = new AccountsService();
		JSONObject jsonObj = new JSONObject();

		if ("QUERY_ACOUNTS_INFO_BY_DATE".equals(requestEvent)) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String memberId = request.getParameter("member_id");
			String accountDateStr = request.getParameter("account_date");

			try {
				java.util.Date accountDate = sdf.parse(accountDateStr);
				java.sql.Date accountSqlDate = new java.sql.Date(accountDate.getTime());
				ArrayList<AccountsVO> accountsVOList = accountsService.getOneAccountsInfo(memberId,accountSqlDate);

				JSONArray jsonAry = new JSONArray();
				for (AccountsVO accountsVO : accountsVOList) {
					JSONObject accountsObj = new JSONObject();
					accountsObj.put("accounts_date", accountsVO.getAccountsDate());
					accountsObj.put("accounts_name", accountsVO.getAccountsName());
					accountsObj.put("accounts_amount", accountsVO.getAccountsAmount());
					accountsObj.put("consume_id", accountsVO.getConsumeId());

					jsonAry.put(accountsObj);
				}
				jsonObj.put("accounts_info_list", jsonAry);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if ("INSERT_ACOUNTS_INFO_BY_DATE".equals(requestEvent)) {

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			
			String accountDateStr = request.getParameter("account_date");
			String accountName = request.getParameter("account_name");
			String accountAmountStr = request.getParameter("account_amount");
			String cousumeId = request.getParameter("consume_id");


			java.util.Date accountDate;
			try {
				accountDate = sdf.parse(accountDateStr);
				
				java.sql.Date accountSqlDate = new java.sql.Date(accountDate.getTime());
				int accountAmount = Integer.parseInt(accountAmountStr);
				
				accountsService.setOneAccountsInfo(accountSqlDate,accountName,accountAmount,cousumeId);
				
				jsonObj.put("result_code", "000000");
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				jsonObj.put("result_code", "000001");
				e.printStackTrace();
			}

		}

		PrintWriter out = response.getWriter();
		out.println(jsonObj);
		out.close();
	}
}
