<%@ page import="java.sql.*" %>
<html>
<head>
<title>Libary Catalog</title>
<%@ include file="header.htm" %>
<script>
function validate(object)
{
	if(object.value == "Add New Book")
	{
		document.forms.main.action="newbook.jsp";
	}
	else if (object.value == "Delete Selected")
	{
		document.forms.main.action="deleted.jsp";
	}
	document.forms.main.submit();
}
</script>
</head>
<br>
<br>
<body>
<h3>Hi,  <%= (session.getAttribute("name"))%>!</h3>

<h1><font color="orange">Library Catalog</font></h1>
<%	
		Class.forName("com.mysql.jdbc.Driver").newInstance();
   		String connection1 = "jdbc:mysql://192.168.0.21:3306/mysql?";
		ServletContext sc = getServletContext();  
		Connection connection = DriverManager.getConnection(connection1, sc.getInitParameter("userName"), sc.getInitParameter("passWord"));
   		Statement statement = connection.createStatement();
		
		
		ResultSet rs;
		String barcode = "";
		String callNum;
		String bookTitle;
		int checkedOut;
	
		String sqlBooks = "SELECT * FROM book";	

		rs = statement.executeQuery(sqlBooks);
%>

<br>
<form name = "main" method = "post">
<table border="1" cellpadding="7">
		<tr>
			<th> </th>
			<th>Bar Code</th>
			<th>Call Number</th>
			<th>Book Title</th>
			<th>Available</th>
		</tr>
        
<%
	while (rs.next())
	{
		barcode = rs.getString("barcode");
		callNum = rs.getString("callno");
		bookTitle = rs.getString("title");
		checkedOut = rs.getInt("onloan");
		
		out.print("<td><input type = radio name = selectOption value = " + barcode + "></td>");
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
%>
</table>
	<br> <br>
<input type = "submit" name = "add" value = "Add New Book" onclick = "validate(this)"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
<input type = "submit" name = "delete" value = "Delete Selected" onclick = "validate(this)"></p>
	
</form>
<br>
<br>
<%@ include file="footer.htm" %>
</body>
</html>