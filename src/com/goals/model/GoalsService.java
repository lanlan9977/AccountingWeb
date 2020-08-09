package com.goals.model;

import java.util.ArrayList;

public class GoalsService {
	private GoalsDAO_interface dao;
	
	public GoalsService() {
		dao = new GoalsDAO();
	}
	
	public ArrayList<GoalsVO> getAllGoalsInfoList(String memberId) {
		return dao.getGoalsDataList(memberId);
	}
	
}
