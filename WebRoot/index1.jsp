<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<base href="<%=basePath%>">	
		<title>Delta AR</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">    
		<meta http-equiv="keywords" content="delta ar">
		<meta http-equiv="description" content="delta ar">
	
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="/deltaar/js/jquery-3.2.1.min.js"></script>
		<script src="/deltaar/js/menu.js"></script>
		<link href="/deltaar/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
		<script src="/deltaar/bootstrap/js/bootstrap.min.js"></script>
		<link href="/deltaar/css/default.css" rel="stylesheet" />
	

  </head>
  
 <body>
 <div class="container">
   <jsp:include page="/inc/header.jsp" flush="true" />

    <!-- Content -->
    <div class="row" style="margin-top:20px;">
      <div class="col-md-9" role="main">
        <div class="panel panel-default">
          <div class="panel-body" style="padding-top: 15px; padding-bottom: 10px;">
            <div class="row" style="margin: 0px 5px 15px 5px;">
              <h3 align="center">Welcome to Delta AR !</h3>
              <p style="text-align: justify">&nbsp;&nbsp;&nbsp;&nbsp;Delta AR is an augmented reality platform for 3D genome. </p>
			  <div>
			  	<video width="600" height="500" controls="controls">
				  <source src="/deltaar/pages/video/hololens_1.mp4" type="video/mp4" />
				  <source src="movie.ogg" type="video/ogg" />
				  <source src="movie.webm" type="video/webm" />
				  <object data="/deltaar/pages/video/hololens_1.mp4" width="600" height="500">
					<embed src="movie.swf" width="600" height="500" />
				  </object>
				</video>
			  
			  </div>
            </div>

          </div>
		
		  
        </div>
      </div>

      <!-- Side -->
      <div class="col-md-3" style="padding-left: 5px" role="complementary">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">
              <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> What's New?
            </h3>
          </div>
          <div class="panel-body">

  
  			 <ul style="padding-left:30px; color:#31708F; line-height: 30px;">
			  <li>xxxxx </li>
            
            </ul>
  
          </div>
        </div>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">
              <span class="glyphicon glyphicon-globe" aria-hidden="true"></span> Linked Resources
            </h3>
          </div>
          <div class="panel-body">
            <ul style="padding-left:30px; color:#31708F; line-height: 30px;">
              <li><a style="color:#F90;" href="http://delta.big.ac.cn" target="_blank">Delta</a></li>
              <li><a style="color:#F90;" href="http://3cdb.big.ac.cn">3CDB</a></li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
    <script type="text/javascript" language="javascript">
   			showTabs('0');
      </script>
  
  </body>
</html>
