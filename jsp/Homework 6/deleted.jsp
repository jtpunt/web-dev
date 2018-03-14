<%@ page import="java.sql.*, java.text.DecimalFormat, java.text.SimpleDateFormat, wu.andy.DateAssistant" %>

<html>
<head><title> Book Deleted</title>
<%@ include file="header.htm" %>
</head>
<body>
<br><h2><font color=orange>Catalog Update</font></h2><br>
<%
		String selectedOption = request.getParameter("selectOption");
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		String connection1 = "jdbc:mysql://192.168.0.21:3306/mysql?";
		ServletContext sc = getServletContext();  
		Connection connection = DriverManager.getConnection(connection1, sc.getInitParameter("userName"), sc.getInitParameter("passWord"));
		String deleteSQL = "DELETE FROM book WHERE barcode =" + selectedOption;
		PreparedStatement ps = connection.prepareStatement(deleteSQL);
		int i = 0;
		i = ps.executeUpdate(); 
		if (i == 0)
		{out.print("<br>Book deletion was unsuccessful.");}
		else if (i ==1)
		{out.print("<br>Book deleted successfully.");}
		
%>
<br>
</body>
<%@ include file="footer.htm" %>
</html>