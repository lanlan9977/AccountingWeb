package com.goals.model;

import java.util.ArrayList;

public interface GoalsDAO_interface {
	public ArrayList<GoalsVO> getGoalsDataList(String memberId);
}
