
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
	
	else if(p != "bookworm")
	{
		alert("Wrong password!");
		return false;
	}
	else
	{
		return true;
	}
	
}
</script>
	</head>
    <body>
        <h1><font color = "orange">Books Galore Library System</font></h1>
		<form id="login" name="login" method="post" action="main.jsp" onSubmit="return validateForm()">
		Username:<INPUT TYPE="text" name = "username"></INPUT><BR><BR>
		Password: <INPUT TYPE="password" name = "password"></INPUT><BR><BR>
		<input type="checkbox" NAME = "checkbox" checked/>Remember me<BR><BR>
		<INPUT type="submit" VALUE= "Login"</INPUT>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<INPUT type="reset" value= "Clear" </INPUT>
		</FORM>
    </body>
</html>
