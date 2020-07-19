package com.accounts.model;

import java.sql.Date;

public class AccountsVO {
	public Date accountsDate;
	public String accountsName;
	public int accountsAmount;
	public String consumeId;
	public String memberId;
	
	
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	public Date getAccountsDate() {
		return accountsDate;
	}
	public int getAccountsAmount() {
		return accountsAmount;
	}
	public void setAccountsAmount(int accountsAmount) {
		this.accountsAmount = accountsAmount;
	}
	public void setAccountsDate(Date accountsDate) {
		this.accountsDate = accountsDate;
	}
	public String getAccountsName() {
		return accountsName;
	}
	public void setAccountsName(String accountsName) {
		this.accountsName = accountsName;
	}
	public String getConsumeId() {
		return consumeId;
	}
	public void setConsumeId(String consumeId) {
		this.consumeId = consumeId;
	}
	

}
