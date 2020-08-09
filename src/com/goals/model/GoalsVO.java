package com.goals.model;

import java.sql.Date;

public class GoalsVO {
	public String goalsId;
	public String goalsName;
	public int goalsAmount;
	public Date goalsStartDate;
	public Date goalsEndDate;
	public String memberId;
	
	public String getGoalsId() {
		return goalsId;
	}
	public void setGoalsId(String goalsId) {
		this.goalsId = goalsId;
	}
	public String getGoalsName() {
		return goalsName;
	}
	public void setGoalsName(String goalsName) {
		this.goalsName = goalsName;
	}
	public int getGoalsAmount() {
		return goalsAmount;
	}
	public void setGoalsAmount(int goalsAmount) {
		this.goalsAmount = goalsAmount;
	}
	public Date getGoalsStartDate() {
		return goalsStartDate;
	}
	public void setGoalsStartDate(Date goalsStartDate) {
		this.goalsStartDate = goalsStartDate;
	}
	public Date getGoalsEndDate() {
		return goalsEndDate;
	}
	public void setGoalsEndDate(Date goalsEndDate) {
		this.goalsEndDate = goalsEndDate;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	

}
