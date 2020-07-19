package com.consume.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ConsumeDAO implements ConsumeDAO_interface{

	String driver = "oracle.jdbc.driver.OracleDriver";
	String url = "jdbc:oracle:thin:@localhost:1521:XE";
	String userid = "C##CA106";
	String passwd = "123456";
	
	@Override
	public ArrayList<ConsumeVO> getAllConSumeData() {
		ArrayList<ConsumeVO> list = new ArrayList<ConsumeVO>();
		ConsumeVO consumerVO = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		String SQL = "select * from consume";
		

		try {

			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);

			pstmt = con.prepareStatement(SQL);


			rs = pstmt.executeQuery();

			while (rs.next()) {
				consumerVO = new ConsumeVO();
				consumerVO.setConsumeId(rs.getString("CONSUME_ID"));
				consumerVO.setConsumeType(rs.getString("CONSUME_TYPE"));
				list.add(consumerVO);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
		return list;

	}

}
