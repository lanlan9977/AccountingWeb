package com.accounts.model;

import java.sql.Date;
import java.util.ArrayList;


public class AccountsService {
	private AccountsDAO dao;

	public AccountsService() {
		dao = new AccountsDAO();
	}
	
	public ArrayList<AccountsVO> getOneAccountsInfo(String memberId,Date accountsDate) {
		return dao.getAccountsInfo(memberId,accountsDate);
	}
	
	public void setOneAccountsInfo(Date accountsDate,String accountsName ,int accountsAmount ,String consumeId) {
		AccountsVO accountsVO = new AccountsVO();
		accountsVO.setAccountsDate(accountsDate);
		accountsVO.setAccountsName(accountsName);
		accountsVO.setAccountsAmount(accountsAmount);
		accountsVO.setConsumeId(consumeId);
		
		dao.setAccountsInfo(accountsVO);
	}
	
}
