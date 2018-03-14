<%@ page import="java.sql.*, java.text.DecimalFormat, java.text.SimpleDateFormat, wu.andy.DateAssistant" %>
<%	
		String barCodeDB = String.valueOf(session.getAttribute("maxBookID"));
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		String connection1 = "jdbc:mysql://192.168.0.21:3306/mysql?";
		ServletContext sc = getServletContext();  
		Connection connection = DriverManager.getConnection(connection1, sc.getInitParameter("userName"), sc.getInitParameter("passWord"));
		PreparedStatement ps = null;
		
		String callNumberDB = request.getParameter("callNumber");
		String titleDB = request.getParameter("title");
		String publisherDB = request.getParameter("publisher");
		String bindingDB = request.getParameter("binding");
		int newBindingDB = Integer.parseInt(bindingDB);
		String bindingType = "";
			if (newBindingDB == 2)
			{
				bindingType = "Hardcover";
			}
			else if (newBindingDB == 3)
			{
				bindingType = "Library";
			}
			else if (newBindingDB == 4)
			{
				bindingType = "Paperback";
			}
		String yesNoDB = request.getParameter("yesNo");
		String priceDB = request.getParameter("price");
			String insertStatement = "INSERT into book (barcode, callno, title, pub, binding, onloan, price) values (?,?,?,?,?,?,?)";
			ps = connection.prepareStatement(insertStatement);
			ps.setString(1, barCodeDB);
			ps.setString(2, callNumberDB);
			ps.setString(3, titleDB);
			ps.setString(4, publisherDB);
			ps.setString(5, bindingType);
			ps.setString(6, yesNoDB);
			ps.setString(7, priceDB);
			int i = 0; 
			i = ps.executeUpdate();

%>
<html>
<head><title>New Book Added </title>
<%@ include file="header.htm" %>
</head>
<body>
<br>
<h2><font color=orange>Catalog Update</font></h2><br><br>
<%
	String message = "";
	if ( i == 0)
	{
		message = "Databased failed to update. Please try again.";
	}
	else if (i == 1)
	message = "New Book Updated Successfully.";
		
	out.print(message);
%>
</body>
<%@ include file="footer.htm" %>
</html>