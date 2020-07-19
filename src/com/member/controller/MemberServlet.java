package com.member.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.*;

import com.member.model.*;

@WebServlet("/MemberServlet")
public class MemberServlet extends HttpServlet {


	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request,response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setCharacterEncoding("utf-8");
		String memberAcc = request.getParameter("member_acc");
		String memberPwd = request.getParameter("member_pwd");

		HttpSession session = request.getSession();
		
		

		MemberService memberService = new MemberService();
		
		MemberVO memberVO = memberService.getOneMemberAcc(memberAcc,memberPwd);
		

		JSONObject jsonObj = new JSONObject();
		
		
		if(memberVO != null) {
			String memberName = memberVO.getMemberName();
			String memberId = memberVO.getMemberId();
//			JSONObject memberInfoObj = new JSONObject();
//			memberInfoObj.put("member_name",memberName);
//			jsonObj.put("info",memberInfoObj);

			session.setAttribute("member_name", memberName);
			session.setAttribute("member_id", memberId);
		
			jsonObj.put("rtn_message","登入成功");
			jsonObj.put("rtn_code","000000");
		}else {
			jsonObj.put("rtn_message","帳號密碼錯誤");
			jsonObj.put("rtn_code","000001");
		}
		
		
		
		
		PrintWriter out = response.getWriter();
		out.println(jsonObj);
		out.close();
		
	}

}
