<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/deltaar/js/menu.js"></script>
<title>Delta</title>
</head>


<body>
<div id="container">
	<jsp:include page="/inc/header.jsp" />
	<div id="content">
    	
    <jsp:include page="/pages/help/help_leftmenu.jsp" />
		
	  
	  <div id="left-column1" style="margin-left:10px;width:980px;margin-top:10px;">
	  	<div class="header_border" style="padding-top:0px;margin-top:0px;">
			<div class="header" id="howto">How to use Delta.AR?</div>
			<div class="header_content">
				<div style="line-height:1.5;">Delta.AR is an augmented reality (AR) technology based 3D genome visualization platform for the integration of chromatin physical structure with multiple '-omics' data.</div>
				<p class="tracktitle" id="1">1. Load a Delta.AR session</p>
				<div style="line-height:1.5"> Delta.AR ueses Microsoft HoloLens to show a 3D physical model of genome into the user’s view field. When the user launches the Delta.AR app from HoloLens, a session ID will be assigned follows. 
				<br/>
				<br/>
				<img src="/deltaar/images/help/img/1.jpg" width="450" height="325" /><br/><br/>
				Users can click the "Start Here" button from home webpage or click "AR Configure" menu to open the session configure page and input the previous Hololens id , such as 2737. Then click Next, users can load the Physical View Configure webpage<br/>
				<img src="/deltaar/images/help/img/2.jpg"  />
			  </div>
			  <p class="tracktitle" id="2">2. Load 3D model and annotated tracks</p>
			  <div> </div>
				<div id="21" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">2.1 Load 3D model</div>
				
				<div style="line-height:1.5;">
				  <p>Delta.AR provides several precomputated 3D physical model for human hg18/hg19. Users can choose any 3D model, configure genome location, resolution size to see the physical model of given range.
			  </p>
			  <img src="/deltaar/images/help/img/3.jpg"  />
			  </div>

				<div id="22" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">2.2 Load annotated tracks and CNCB tracks</div>
				<div style="padding-top:10px; padding-bottom:10px; line-height:1.5; ">For some 3D physical model, there are several associated available features such as TAD, Interaction. To activate these features, users need to check or uncheck them. Users also can open a track selected panal which include ENCODE histone mark annotated tracks , HiC features, Ensembl gene when click "Select Annotation Tracks"<br/><br/>
				 <img src="/deltaar/images/help/img/4.jpg" width="800" />
				  </div>	
			  <div style="line-height:1.5;">
				Delta.AR provide another track panel which include CNCB data set for users to select, when users click "CNCB Dataset". In future, we will load more CNCB data tracks here. <br/><br/>
				<img src="/deltaar/images/help/img/5.jpg" width="800" /> <br/><br/>
				When user finish choose tracks and click "Next" , a genome view panel shown as follows.<br/><br/>
				<img src="/deltaar/images/help/img/6.jpg"  width="800"/>
			  </div>
			  	<p class="tracktitle" id="3">3. Explore data in Genome View</p> 

				<div style="padding-top:10px; padding-bottom:10px; font-weight:bold;" id="31">3.1 Load or unload a track to show in HoloLens</div>
				<div style="line-height:1.5;">
				When users want to load a track to show in HoloLens, they can move mouse on to the given track name, then a down arrow will be shown. Click the arrow, a dialog will be shown with serveral operated menus. Check the menu "Show in Delta.AR" as follows, the track will be shown as soon as possible in HoloLens view. If users want to delete a track  show in HoloLens view, they can uncheck the "Show in Delta.AR".<br/><br/>
				<img src="/deltaar/images/help/img/7.jpg"  width="800"/>
			  </div>
				<div id="32" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">3.2 Add custom tracks</div>
				<div style="line-height:1.5;" >
					When users want to add more tracks in Genome View or HoloLens, they can click "select tracks" in Genome View, then a track panel shows as follows.<br/> <br/>
					<img src="/deltaar/images/help/img/8.jpg"  width="800"/>
			  </div>	
			<div id="33" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">3.3 Jump to Topological View and Physical View</div>
			<div style="line-height:1.5;">
					Delta.AR provides topological view and physical view for users to visualize data. Click the "Goto Topological" jump to topological view or click "Goto Physical" jump to physical view .<br/><br/>
					<img src="/deltaar/images/help/img/9.jpg"   width="800"/> <br/><br/>
					A topological view panel as follows. Users can zoom in or zoom out, configure viewed genome region, add or remove tracks. <br/><br/>
					<img src="/deltaar/images/help/img/10.jpg" width="800" /> <br/><br/>
					A physical view panel as follows. Users can zoom in or zoom out, configure viewed genome region, add or remove tracks. <br/><br/>
					<img src="/deltaar/images/help/img/11.jpg" />
			</div>		
			  	<p class="tracktitle" id="4">4. Share data</p> 	
				<div style="line-height:1.5;">
				 Users can share genome view to other people by clicking "Share" button. A dialog will be shown as follows. Users can use "CTRL C" button to copy the link and share url to other people. Keep in mind that if other people check or uncheck the track "Show in Delta.AR", HoloLens view will be changed since you are in the same session. <br/><br/>
				 <img src="/deltaar/images/help/img/12.jpg" />
			    </div>
				<p class="tracktitle" id="5">5. Video tutorial</p>
				<div style="line-height:1.5;">
				Delta.AR provides a video tutorial for users to start at beginning. Click <a href="/deltaar/pages/help/help_video.jsp">here</a>.
				</div>
				
				
				<p class="tracktitle" id="6">6. Delta.AR github</p> 
				<div style="line-height:1.5;">
				Delta.AR provides a github project for the whole web project. The url as follows <br/>
				<a href="https://github.com/zhangzhwlab/Delta.AR" target="_blank">https://github.com/zhangzhwlab/Delta.AR</a>
				</div>
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
