<%@ page import="java.sql.*" %>
<html>
<head><title>Add a New Book</title>
<%@ include file="header.htm" %>
<SCRIPT LANGUAGE = "JAVASCRIPT">
function validate()
{	
	
	if (document.forms.main.callNumber.value == "")
	{
		alert("Call number cannot be empty.");
		return false;
	}
	else if (document.forms.main.title.value == "")
	{
		alert("Title cannot be empty.");
		return false;
	}
	else if (document.forms.main.publisher.value == "")
	{
		alert("Publisher cannot be empty.");
		return false;
	}
	else if (document.forms.main.binding.value <=1)
	{
		alert("You must select a value for binding.");
		return false;
	}
	else if (document.forms.main.price.value < 0)
	{
		alert("You must enter in a positive number.")
		return false;
	}
	else if (document.forms.main.price.value == "")
	{
		alert("Price cannot be empty.")
		return false;
	}
	return true;
}
</SCRIPT>

</script>
</head>
<br>
<br>
<body>
<%	
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		String connection1 = "jdbc:mysql://192.168.0.21:3306/mysql?";
		ServletContext sc = getServletContext();  
		Connection connection = DriverManager.getConnection(connection1, sc.getInitParameter("userName"), sc.getInitParameter("passWord"));
		Statement statement = connection.createStatement();
		
		ResultSet rs = statement.executeQuery("SELECT max( barcode ) AS \"maxBook\" FROM book");
		int maxBookId = 0;
		while (rs.next())
		{
			maxBookId = rs.getInt("maxBook");
		}
		session.setAttribute("maxBookID", maxBookId + 1);
%>
<br />
<h1><font color="orange">Add a New Book</font></h1>
<FORM NAME = "main" ACTION = "added.jsp" METHOD ="POST">
Barcode: </td><INPUT TYPE="text" name = "barCode" value ="<%= String.valueOf(maxBookId+1) %>" readonly></INPUT><br><br>
Call Number:<INPUT TYPE="text" name = "callNumber"></INPUT><br><br>
Title:<INPUT TYPE="text" name = "title"></INPUT><br><br>
Publisher:<INPUT TYPE="text" name = "publisher"></INPUT><br>
<p>Binding:  <select name ="binding"><option value ="4">Hardcover</option>
								 <option value="3">Library</option>
								 <option value ="2">Paperback</option>
								 <option value ="1"selected>Select a binding</option></select>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
On loan: 
<input type="radio" name="yesNo"  value="1">Yes</input>
<input type="radio" name="yesNo" value="0"checked>No</input></p>
Price:<INPUT TYPE="text" name = "price"></INPUT>
<p>
<input type = "submit" VALUE = "Save" onclick ="return validate()"></input> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
<input type = "reset" VALUE = "Cancel" ></input></p>
</form>

<br />
<br />
<%@ include file="footer.htm" %>
</body>
</html>