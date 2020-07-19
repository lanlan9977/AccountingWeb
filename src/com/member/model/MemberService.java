package com.member.model;

public class MemberService {
	private MemberDAO_interface dao;

	public MemberService() {
		dao = new MemberDAO();
	}
	
	public MemberVO getOneMemberAcc(String memberAcc,String memberPwd) {
		return dao.getOneMember(memberAcc,memberPwd);
	}
	
	
}
