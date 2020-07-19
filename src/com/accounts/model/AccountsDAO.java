package com.accounts.model;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class AccountsDAO implements AccountsDAO_interface {

	String driver = "oracle.jdbc.driver.OracleDriver";
	String url = "jdbc:oracle:thin:@localhost:1521:XE";
	String userid = "C##CA106";
	String passwd = "123456";

	private static final String GET_SOME_STMT = "select * from accounts where member_id = ? and accounts_date <= ? + 7 and accounts_date >= ? - 7";
	private static final String SET_ONE_STMT = "INSERT INTO ACCOUNTS(ACCOUNTS_DATE,ACCOUNTS_NAME,ACCOUNTS_AMOUNT,CONSUME_ID) VALUES (?,?,?,?)";

	@Override
	public ArrayList<AccountsVO> getAccountsInfo(String memberId,Date accountsDate) {
		ArrayList<AccountsVO> list = new ArrayList<AccountsVO>();
		AccountsVO accountsVO = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {

			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);

			pstmt = con.prepareStatement(GET_SOME_STMT);

			pstmt.setString(1, memberId);
			pstmt.setDate(2, accountsDate);
			pstmt.setDate(3, accountsDate);

			rs = pstmt.executeQuery();

			while (rs.next()) {
				accountsVO = new AccountsVO();
				accountsVO.setAccountsDate(rs.getDate("ACCOUNTS_DATE"));
				accountsVO.setAccountsName(rs.getString("ACCOUNTS_NAME"));
				accountsVO.setAccountsAmount(rs.getInt("ACCOUNTS_AMOUNT"));
				accountsVO.setConsumeId(rs.getString("CONSUME_ID"));
				list.add(accountsVO);
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

	@Override
	public void setAccountsInfo(AccountsVO accountsVO) {
		// TODO Auto-generated method stub
		Connection con = null;
		PreparedStatement pstmt = null;

		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(SET_ONE_STMT);

			pstmt.setDate(1, accountsVO.getAccountsDate());
			pstmt.setString(2, accountsVO.getAccountsName());
			pstmt.setInt(3, accountsVO.getAccountsAmount());
			pstmt.setString(4, accountsVO.getConsumeId());

			pstmt.executeUpdate();
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Couldn't load database driver. " + e.getMessage());
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
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
	}
}
