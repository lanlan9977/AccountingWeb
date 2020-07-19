package com.consume.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.*;

import com.consume.model.*;
;

@WebServlet("/ConsumeServlet")
public class ConsumeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setCharacterEncoding("utf-8");
		
		ConsumeService consumeService = new ConsumeService();
		
		ArrayList<ConsumeVO> consumeInfoList = consumeService.getAllConSumeInfo();

		JSONObject jsonObj = new JSONObject();
		
		JSONArray jsonAry = new JSONArray();
		for(ConsumeVO consumeVO:consumeInfoList) {
			JSONObject consumeObj = new JSONObject();
			consumeObj.put("consume_id", consumeVO.getConsumeId());
			consumeObj.put("consume_type", consumeVO.getConsumeType());
			
			jsonAry.put(consumeObj);
		}
		jsonObj.put("consume_info_list", jsonAry);
		
		
		
		PrintWriter out = response.getWriter();
		out.println(jsonObj);
		out.close();
	}

}
