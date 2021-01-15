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
    	
    
		<div id="right-column1" style="margin-left:5px;width:250px;">
		  <div class="header_border">
				
			<div class="block"><img src="/deltaar/images/breadcrumb.gif" />2.	Genome View  </div>
			<ul>
			
				<li><a href="/deltaar/pages/help/help_gview.jsp#21">2.1	Add own track</a></li>
				<li><a href="/deltaar/pages/help/help_gview.jsp#22">2.2	Jumping to Circlet View and Physical View</a></li>
				<li><a href="/deltaar/pages/help/help_gview.jsp#23">2.3	Export Genome View</a></li>
			</ul>	
				
		  </div>
	  </div>
	  
	  <div id="left-column1" style="margin-left:10px;width:980px;margin-top:10px;">
	  	<div class="header_border" style="padding-top:0px;margin-top:0px;">
			<div class="header" id="howto">How to use Delta?</div>
			<div class="header_content">
				<p class="tracktitle" id="genome">2. Genome View </p>
				<div>Delta uses JBrowse to show 3D genome features and other omics data,such as Ensembl annotations and ENCODE data<br/>
				  <br/>
				Delta uses different glyphs to represent different features. It represents Matrix as a triangle heatmap, TAD as a rectangle as well as interaction peak as an arc line. Users can pan left or right, zoom in or out, toggle tracks on or off in the Genome View. And they can also export the whole web page as a high resolution image.<br/>
				<br/>
				<img src="/deltaar/images/help/genome.jpg" width="800" height="600" />
				
			  </div>
			   <div id="21" style="padding-top:10px; padding-bottom:10px; ">
			   
			     <p class="tracktitle" id="genome">2.1	Add custom tracks</p>
			   Users can click the "Track"->"Open track file or URL" menu to upload own data and a dialog as follows will be shown. After upload the file, users need to set the file format from “Files and URLS” and set the display glyph from "New Tracks". <br/>
			   
			   		<img src="/deltaar/images/help/genome_upload.png"  /> <br/><br/>
					<strong>Note</strong>: One should choose HTMLFeatures for most of data; <br/>choose CanvasFeatures for loop;<br/>
					 choose Wiggle XYPlot for BigWig file.<br/>
					For more features, you  can check <a href="http://gmod.org/wiki/JBrowse_Configuration_Guide" target="_blank">JBrowse</a> help page.
			   
			   </div>
			   
			  <div id="22" style="padding-top:10px; padding-bottom:10px; ">
			    <p class="tracktitle" id="genome">2.2	Jumping to Topological View and Physical View</p>
			  Users can click the "Goto Topological" or &quot;Goto Physical&quot; button to go to the Topological View or Physical View respectively.<br/>
				<img src="/deltaar/images/help/genome_3dmodel.jpg"  />
			   
			  
			  </div>
			  
			   <div id="23" style="padding-top:10px; padding-bottom:10px; ">
			   	 <p class="tracktitle" id="genome" style="font-weight:bold;">2.3	Export Genome View</p>
				 Users can export the shown tracks in Genome View by clicking "export" button. Delta uses a <a href="http://phantomjs.org/" target="_blank">PhantomJS</a> tool to create the export image. When you found the exported image is not complete, you need to refresh the export web page to load the full image.
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
