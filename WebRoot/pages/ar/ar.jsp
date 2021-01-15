<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="/deltaar/css/jquery-ui.css" />
<script type="text/javascript" src="/deltaar/js/menu.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="/deltaar/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery.form.js" ></script>
<title>Delta.AR</title>
</head>


<body>
<div id="container" style="height:150px;">
	<jsp:include page="/inc/header.jsp" />
	<div id="content">
	  <div style="margin-left:10px;width:1200px;margin-top:10px;">
	  	<div class="header_border" style="padding-top:0px;margin-top:0px;">
			<div class="header">AR Configure</div>
			<div class="header_content">
				<div style="padding-top:5px; padding-bottom:5px;">Put on your HoloLens,start Delta.AR in HoloLens, then you will get a session id.</div>
				<div  style="padding-top:5px; padding-bottom:5px;">Input the session id you get</div>
				<div style="padding-top:5px; padding-bottom:5px;"><input type="text" style="width:200px;" id="idhololens" /></div>
				<div style="padding-top:5px; padding-bottom:5px;"><input type="button" value="Next" style="width:60px; height:30px;" onclick="savehololensid()"/></div>
		   </div>
		 </div>
	  	</div>
      </div>
	
	<jsp:include page="/inc/footer.jsp" />
</div>
	<script type="text/javascript" src="/deltaar/js/cookie.js"></script>
<script type="text/javascript" language="javascript">
		showTabs('6');
		
		function savehololensid(){
			var sid = $("#idhololens").val();
			if(sid == "" || sid == null ){
				$('<div></div>').appendTo('body')
							  .html('<div style=\"margin-top:10px;\">HoloLens id can not be empty!</div>')
							  .dialog({
								  modal: true, title: 'Warn', zIndex: 10000, autoOpen: true,
								  width: 'auto', resizable: false,						 
								  close: function (event, ui) {
									  //remove from cookie	
									 
									  $(this).remove();
								  },
								
							});
			}else{
				//set cookie
				if(sid.length != 4){
					
					$('<div></div>').appendTo('body')
							  .html('<div style=\"margin-top:10px;\">The length of HoloLens id should be 4!</div>')
							  .dialog({
								  modal: true, title: 'Warn', zIndex: 10000, autoOpen: true,
								  width: 'auto', resizable: false,						 
								  close: function (event, ui) {
									  //remove from cookie	
									 
									  $(this).remove();
								  },
								
							});
					
					
					
				}else{
					Cookies.set("delta.ar.hololensid", sid, { path: 'ar'  }) ;	
					window.location.href="/deltaar/pages/visualization/physical_view_configure.jsp?hololensid="+sid;
				
				}

			}
		
		}
		
</script>
</body>
</html>
