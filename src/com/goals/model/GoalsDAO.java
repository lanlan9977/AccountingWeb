package com.goals.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


public class GoalsDAO implements GoalsDAO_interface{

	String driver = "oracle.jdbc.driver.OracleDriver";
	String url = "jdbc:oracle:thin:@localhost:1521:XE";
	String userid = "C##CA106";
	String passwd = "123456";
	

	private static final String GET_SOME_STMT = "select * from goals where member_id = ?";
	//private static final String SET_ONE_STMT = "INSERT INTO ACCOUNTS(ACCOUNTS_DATE,ACCOUNTS_NAME,ACCOUNTS_AMOUNT,CONSUME_ID) VALUES (?,?,?,?)";
	
	@Override
	public ArrayList<GoalsVO> getGoalsDataList(String memberId) {		
		ArrayList<GoalsVO> list = new ArrayList<GoalsVO>();
		GoalsVO goalsVO = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		

		try {

			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);

			pstmt = con.prepareStatement(GET_SOME_STMT);


			rs = pstmt.executeQuery();

			while (rs.next()) {
				goalsVO = new GoalsVO();
				goalsVO.setGoalsId(rs.getString("GOALS_ID"));
				goalsVO.setGoalsName(rs.getString("GOALS_NAME"));
				goalsVO.setGoalsAmount(rs.getInt("CONSUME_TYPE"));
				goalsVO.setGoalsStartDate(rs.getDate("GOALS_START_DATE"));
				goalsVO.setGoalsEndDate(rs.getDate("GOALS_END_DATE"));
				goalsVO.setMemberId(rs.getString("MEMBER_ID"));
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
