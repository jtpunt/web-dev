
<html>
    <head><title>User Login</title>
	<script type = "text/javascript">
function validateForm(form)
{
	var u = document.login.username.value;
	var p = document.login.password.value;
	
	if(u == "")
	{
		alert("You must enter your user name!");
		return false;
	}
	else if(pass == "")
	{
	alert("You must enter your password!");
	return false;
	}
	else
	{
		response.sendRedirect("main.htm");
	}
	
}
</script>
	</head>
    <body>
		<%@ include file="header.htm" %></br>
        <h1><font color = "orange">Books Galore Library System</font></h1>
		<form id="login" name="login" method="post" action="main.jsp" onSubmit="return validateForm()">
		Username:<INPUT TYPE="text" name = "username"></INPUT><BR><BR>
		Password: <INPUT TYPE="password" name = "password"></INPUT><BR><BR>
		<select name ="location"><option value ="4">Kalua, HI</option>
								 <option value="3">Sanoma, CA</option>
								 <option value ="2" selected>Frisco, TX</option>
								 <option value ="1">Oviedo, FL</option></select>
								 </br></br>
		<input type="checkbox" NAME = "checkbox" checked/>Remember me<BR><BR>
		<INPUT type="submit" VALUE= "Login"</INPUT>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<INPUT type="reset" value= "Clear" </INPUT>
		</FORM>
		<%@ include file="footer.htm" %>
    </body>
</html>
