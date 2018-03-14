<%@ page import="java.sql.*, java.text.DecimalFormat, java.text.SimpleDateFormat, wu.andy.DateAssistant" %>
<%	
SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
		String barcode = request.getParameter("barcode");
		Class.forName("com.mysql.jdbc.Driver").newInstance();
   		String connection1 = "jdbc:mysql://192.168.0.21:3306/mysql?";
		ServletContext sc = getServletContext();  
		Connection connection = DriverManager.getConnection(connection1, sc.getInitParameter("userName"), sc.getInitParameter("passWord"));

   		Statement statement = connection.createStatement();
			
		ResultSet rs, rs1;
		String bookTitle, bookcode, callNo, bookBinding, publisher;
		double bookPrice;
		
		DecimalFormat df = new DecimalFormat("$#,##0.00");
		
			String sqlBooks = "SELECT * FROM book ";
			sqlBooks += " WHERE barcode = " + barcode + ";";	

		rs = statement.executeQuery(sqlBooks);
		rs.next();
		bookTitle = rs.getString("title");
%>
<html>
<head>
<title><%= bookTitle %> Details </title>
<%@ include file="header.htm" %>
</head>
<body>
<br>
<% 
bookcode = rs.getString("barcode");
callNo = rs.getString("callno");
bookBinding = rs.getString("binding");
bookPrice = rs.getDouble("price");
publisher = rs.getString("pub");
out.print("<h1><font color=\"orange\">" + bookTitle + "</font></h1>");
out.print("Barcode: " + barcode + "<br />");
out.print("Call No: " + callNo + "<br />");
out.print("Binding: " + bookBinding + "<br />");
out.print("<p1>Price: " + df.format(bookPrice) + "<br />");
out.print("<p1>Publisher: " + publisher + "<br />");
%>
<br>
<HR>
<h3><font color=orange>Loan History</font></h3>
<table cellpadding="4">
		<tr>
			<th align = "left">Patron</th>
			<th align = "left">Type</th>
			<th align = "left">Out</th>
			<th align = "left">Due</th>
			<th align = "left">In</th>
		</tr>
<%	
	String lastName, firstName, wholeName, schoolType;
	int interval;
	Date loanDate, returnDate;

	
			String sqlBooks1 = "SELECT p.lname, p.fname, p.type, b.loandate, b.returndate  FROM bookpatron b,  patron p";
			sqlBooks1 += " WHERE b.pid = p.pid ";	
			sqlBooks1 += " AND b.barcode = " + barcode + ";";
			

		rs1 = statement.executeQuery(sqlBooks1);
while (rs1.next())
	{
lastName = rs1.getString("lname");
firstName = rs1.getString("fname");
wholeName = firstName.concat(" " + lastName);
schoolType = rs1.getString("type");
		if (schoolType.equals("undergrad"))
        {interval = 30;}
        else if (schoolType.equals("graduate"))
        {interval = 60;}
        else 
        {interval = 90;}
	
loanDate = rs1.getDate("loandate");
returnDate = rs1.getDate("returnDate");

		out.print("<td>" + wholeName + "</td>");
		out.print("<td>" + schoolType.substring(0,1).toUpperCase() + schoolType.substring(1) + "</td>");
		out.print("<td>" + DateAssistant.convertDate(loanDate) + "</td>");
		out.print("<td>" + DateAssistant.calcNewDate(loanDate, interval) + "</td>");
		if (returnDate != null )
			out.print("<td>" + DateAssistant.convertDate(returnDate) + "</td></tr>");
		else
			out.print("<td>On Loan </td></tr>");
	}
	connection.close();
%>
</table>
</body>
<%@ include file="footer.htm" %>
</html>