<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/deltaar/js/menu.js"></script>
<title>Delta.AR</title>
</head>


<body>
<div id="container" style="height:800px;">
	<jsp:include page="/inc/header.jsp" />
	<div id="content">
    	<jsp:include page="/pages/help/help_leftmenu.jsp" />

		<div id="left-column1" style="margin-left:5px;width:800px;">
		  <div class="header_border">
				
			<div class="block" style="padding-top:10px; padding-bottom:10px;"> Delta.AR video tutorial</div>
			
					<div  class="header">1.Installation  Tutorial</div>
				<div style="padding-top:10px;padding-bottom:10px;padding-left:10px;">
					<video width="500" height="300" controls="controls">
					  <source src="/deltaar/pages/video/installation.mp4" type="video/mp4" />
					  <source src="movie.ogg" type="video/ogg" />
					  <source src="movie.webm" type="video/webm" />
					  <object data="/deltaar/pages/video/installation.mp4" width="500" height="800">
						<embed src="movie.swf" width="500" height="800" />                  
	</object>
				  </video> 
					
					</div>
					<div  class="header">2. Delta.AR Screen Operation Tutorial</div>
					   <div style="padding-top:10px;padding-bottom:10px;padding-left:10px;">
						<video width="500" height="300" controls="controls">
						  <source src="/deltaar/pages/video/screen.mp4" type="video/mp4" />
						  <source src="movie.ogg" type="video/ogg" />
						  <source src="movie.webm" type="video/webm" />
						  <object data="/deltaar/pages/video/screen.mp4" width="500" height="500">
							<embed src="movie.swf" width="500" height="500" />                  
		</object>
						</video> 
						
						</div>
			
						<div  class="header">3. Delta.AR Mixed Operation Tutorial</div>
								   <div style="padding-top:10px;padding-bottom:10px;padding-left:10px;">
									<video width="500" height="300" controls="controls">
									  <source src="/deltaar/pages/video/mixed.mp4" type="video/mp4" />
									  <source src="movie.ogg" type="video/ogg" />
									  <source src="movie.webm" type="video/webm" />
									  <object data="/deltaar/pages/video/mixed.mp4" width="500" height="500">
										<embed src="movie.swf" width="500" height="500" />                  
					</object>
									</video> 
						
						</div>
		  </div>
	  </div>
	  
  </div>
	<jsp:include page="/inc/footer.jsp" />
</div>

<script type="text/javascript" language="javascript">
		showTabs('5');
</script>
</body>
</html>
