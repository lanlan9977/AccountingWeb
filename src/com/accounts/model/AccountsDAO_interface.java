package com.accounts.model;

import java.sql.Date;
import java.util.ArrayList;

public interface AccountsDAO_interface {
	public ArrayList<AccountsVO> getAccountsInfo(String memberId,Date accountsDate);
	
	public void setAccountsInfo(AccountsVO accountsVO);
} 
