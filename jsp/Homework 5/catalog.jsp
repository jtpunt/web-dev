<%@ page import="java.sql.*" %>
<html>
<head>
<%@ include file="header.htm" %>
</head>
<br>
<br>
<body>
<h3>Hi,  <%= (session.getAttribute("name"))%>!</h3>

<h1><font color="orange">Library Catalog</font></h1>
<%	
		Class.forName("com.mysql.jdbc.Driver").newInstance();
   		Connection connection = DriverManager.getConnection(
		"jdbc:mysql://localhost:3306/PerryJ?user=root&password=bcis3680");
   		Statement statement = connection.createStatement();
		
		ResultSet rs;
		String barcode;
		String callNum;
		String bookTitle;
		int checkedOut;
		
	
		String sqlBooks = "SELECT * FROM book";	

		rs = statement.executeQuery(sqlBooks);
%>

<br>

<table border="1" cellpadding="7">
		<tr>
			<th>Bar Code</th>
			<th>Call Number</th>
			<th>Book Title</th>
			<th>Checked Out</th>
		</tr>
        
<%
	while (rs.next())
	{
		barcode = rs.getString("barcode");
		callNum = rs.getString("callno");
		bookTitle = rs.getString("title");
		checkedOut = rs.getInt("onloan");
		
		out.print("<td align = center><a href = book.jsp");
		out.print("?barcode=" + barcode + ">" + barcode);
		out.print("</a></td>");
		out.print("<td>" + callNum + "</td>");
		out.print("<td>" + bookTitle + "</td>");
		if (checkedOut == 0)
		{out.println("<td align = center> No </td></tr>");}
		else
		{out.println("<td align = center> Yes </td></tr>");}
	}
	rs.close();
	statement.close();
	connection.close();
%>
	</table>
<br>
<br>
<%@ include file="footer.htm" %>
</body>
</html>