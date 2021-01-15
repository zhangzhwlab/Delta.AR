<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/deltaar/js/menu.js"></script>
<title>Delta.AR</title>
</head>


<body>
<div id="container" style="height:600px;">
	<jsp:include page="/inc/header.jsp" />
	
	
	<div id="content" >
    	
    
		<div id="left-column1" style="margin-left:5px;width:800px; ">
		  <div class="header_border">
				<div class="content_header">
				Welcome to Delta.AR <span style="padding-left:50px;"><input type="button" value="Start Here" style="width:100px; height:50px;" onclick="goconfig()"></span></div>
			    <div class="header_content" >
					Delta.AR is an integrative system that can be used for immersive visualization of 3D chromatin structure and interactively connect to genomic and epigenomic data with Microsoft HoloLens.
				</div>
			<div class="header_content" style="margin-top:0px;">
		  	
			  <video width="600" height="355" controls="controls">
				  <source src="/deltaar/pages/video/mixed.mp4" type="video/mp4" />
				  <source src="movie.ogg" type="video/ogg" />
				  <source src="movie.webm" type="video/webm" />
			  	  <object data="/deltaar/pages/video/mixed.mp4" width="600" height="355">
                    <embed src="movie.swf" width="600" height="355" />                  
</object>
		  	  </video> 
			  </div>
			  
			  <div class="header" style="margin-top:20px; padding-left:15px;">A screen operation tutorial</div>
			  <div class="header_content" style="margin-top:0px;">
		  	
			  <video width="600" height="355" controls="controls">
				  <source src="/deltaar/pages/video/screen.mp4" type="video/mp4" />
				  <source src="movie.ogg" type="video/ogg" />
				  <source src="movie.webm" type="video/webm" />
			  	  <object data="/deltaar/pages/video/screen.mp4" width="600" height="355">
                    <embed src="movie.swf" width="600" height="355" />                  
</object>
		  	  </video> 
			  </div>
			  
		  </div>
	  </div>
	  
	  <div id="right-column1" style="margin-left:10px;width:250px;">
	  	<div class="header_border" style="padding-top:0px;margin-top:0px;">
			<div class="header">What's new?</div>
			<div class="header_content">
			    <div>1. Topological View supports AR is available to access(2018-08-31).</div>
				<div>2. Physical view supports AR is available to access(2018-06-10).</div>
				<div>3. Genome View supports AR is available to access(2017-08-01).</div>
				
			</div>
		</div>
		<div class="header_border">
			<div class="header">Useful link</div>
			<div class="header_content">
				<div><a href="http://delta.big.ac.cn" target="_blank">Delta</a></div>
				<div><a href="http://3cdb.big.ac.cn" target="_blank">3CDB</a></div>

			</div>
		</div>
		
		<div class="header_border">
			<div class="header">Global Visitors</div>
			<div class="header_content">
				<a href="https://www.revolvermaps.com/livestats/0vpfx6shbcw/" target="_blank"><img src="//ra.revolvermaps.com/h/m/a/0/ff0000/100/15/0vpfx6shbcw.png" width="200" height="100" alt="Map" style="border:0;"></a>

			</div>
		</div>
		
      </div>
		
	</div>
	<jsp:include page="/inc/footer.jsp" />
</div>

<script type="text/javascript" language="javascript">
		showTabs('0');
		
		function goconfig(){
			window.location.href="/deltaar/pages/ar/ar.jsp";
		}
</script>
</body>
</html>
