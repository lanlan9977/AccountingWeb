package com.consume.model;

import java.util.ArrayList;

public class ConsumeService {
	private ConsumeDAO_interface dao;
	
	public ConsumeService() {
		dao = new ConsumeDAO();
	}
	
	public ArrayList<ConsumeVO> getAllConSumeInfo() {
		return dao.getAllConSumeData();
	}
	
}
