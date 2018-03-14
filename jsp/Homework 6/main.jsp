<%@ page import="java.util.GregorianCalendar, wu.andy.DateAssistant" %>

<html>
    <head><title>Library System Main Page</title></head>
    <body> <%@ include file="header.htm" %>
	<br>
	<h1><font color = "orange"> Books Galore Library System</font></h1>
<%
GregorianCalendar current = new GregorianCalendar();
String name = request.getParameter("username");
String pass = request.getParameter("password");
String location = request.getParameter("location");

if ( pass.equals("JPerry"))
{
out.println(name + ", welcome to the library system!");
out.println("<br /><br /> Your time zone is ");
session.setAttribute("name", name);
switch (Integer.parseInt(location))
{
case 1: 
out.println("Eastern. Current time is ");
out.println(DateAssistant.formatDate(current, 1) + " ");
break;
case 2: 
out.println("Central. Current time is ");
out.println(DateAssistant.formatDate(current, 2) + " ");
break;
case 3: 
out.println("Pacific. Current time is ");
out.println(DateAssistant.formatDate(current, 3) + " ");
break;
case 4: 
out.println("Hawaii. Current time is ");
out.println(DateAssistant.formatDate(current, 4) + " ");
break;
}
}
else
{
response.sendRedirect("login.jsp");
}
%>
<br>
<br>
<a href="catalog.jsp">Manage Catalog</a>
<%@ include file="footer.htm" %>
    </body>
</html>
