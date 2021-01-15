<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/deltaar/js/menu.js"></script>
<!--
<script type="text/javascript" src="/deltaar/js/jquery-1.9.1.min.js" ></script>-->
<script type="text/javascript" src="/deltaar/js/physical/3Dmol1.2_m.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery.layout-latest.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery.form.js" ></script>

<link rel="stylesheet" href="/deltaar/css/jquery-ui.css" />
<link href="/deltaar/css/layout-default-latest.css" rel="stylesheet" type="text/css" />
<title>Physical view</title>

<style type="text/css">
 .pane {
	display:	block; /* will appear when layout inits */
}
							
.transparent_class {
	background:#fff;
   /* Good browsers */
  opacity: 0.2!important;
 
  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";

  /* IE 5-7 */
  filter: alpha(opacity=20);
  /* Safari 1.x */
  -khtml-opacity: 0.2;
    /* Netscape */
  -moz-opacity: 0.2;

}


*{
z-index:inherit;
}

</style>
<script type="text/javascript" language="javascript">

var mylayout = null;

</script>
</head>

<body>
<jsp:include page="/inc/header.jsp" />

<div id="container" style="margin: 0 0 ;padding: 0 0 ; height:1500px;">
	<div id="centerid" class="pane ui-layout-center" >
				<div class="header_content" style="position:relative; margin-left:0px;padding-left:0px;padding-top:0px;margin-top:0px;width:100%;">
						
						<div class="header_content">
							<table >
							
								<tr><td style="width:250px;font-weight:bold;" valign="top">Current Genome Location</td><td style="width:200px;font-weight:bold;">Current 3D model</td><td style="width:300px;font-weight:bold;">Current Selected Tracks</td></tr>
								<tr><td valign="top"><div id="idppos">
							</div></td><td valign="top"><div id="idpmodel"></div></td><td valign="top"><div id="idptracks" style="width:300px;word-break:hyphenate;word-wrap:break-word;"></div></td></tr>
							
							</table>
							
						</div>
						
                  		<div> 
						<!--<table cellpadding="0" cellspacing="0">
							<tbody>
								<tr style="padding:0px 0px;"><td valign="top">Go to&nbsp;&nbsp;&nbsp;&nbsp;<select style="width:50px;" id="chromid" onchange="ChooseChrom(2)"></select>
					   <input type="text" name="position" id="curpos" value="11" style="width:150px;"/>&nbsp;&nbsp;<select style="width:200px; display:none;" id="dset" name="dataset" onchange="loadInitTrack()"></select><input type="button" value="GO" onclick="drawQuery3D()"/></td><td>&nbsp; <!--<input type="button" value="Goto Genome" onclick="gotoGenome()">&nbsp;<input type="button" value="Goto Topology" onclick="gotoTopoView()"/>&nbsp;<input type="button" value="Activate AR" onclick="callDeltaAR()"/> --> <!--</td></tr>
							</tbody>
						</table> -->
						
						
						<select style="width:200px; display:none;" id="dset" name="dataset" onchange="loadInitTrack()"></select>
						<input type="hidden" id="windownamount"/></div>	
					   	<a id="my_link" style="display:none;"> </a>
  						<div id="firing_div" style="display:none;"></div>	
						
						
						<div id="idtableoperate">
						
                    	<div style="float:left;"> <!--left start-->
						
						 <div >
						<!--   
						 	<table cellpadding="5" cellspacing="0" >
								<tbody> -->
									<!--
									<tr>
									<td valign="top"><div class="button" id="idbuttontrack" style="background:#eeeeee;width:125px; border:1px solid #000;padding-top:5px;padding-bottom:5px; cursor:pointer;" onclick="showSelectTrackDialog()" ><span style="padding-left:5px;vertical-align:bottom;"><img src="/deltaar/images/left_arrow.png" /></span><span style="vertical-align:middle; padding-left:5px; font-weight:bold;">Select Tracks</span></div></td><td>
									<img src="/deltaar/images/wait.gif" id="waitexport" style="display:none;" />
									</td>
									</tr>-->
									<!--<tr>
								
									<td valign="top" colspan="2"> -->
									<!--<input type="checkbox" id="labelid" onclick="showOrHideLabel()" value="1" />Show Label&nbsp;<img src="/deltaar/images/help.gif" title="Checked for showing bead orders" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Always redraw <img src="/deltaar/images/help.gif" title="Click 'yes' to active displaying quantitative features according to zoom level" /><input name="redrawtrack" type="radio" value="1" />Yes <input name="redrawtrack" type="hidden"  value="2" checked="checked">No-->
							<!--		</td>
									
									</tr> -->
									
												
									<!--<tr><td colspan="2">Input Genename:&nbsp;&nbsp;<input id="idtext_ensembl_gene" type="text"><input value="GO" onclick="showSearchGene('idtext_ensembl_gene',0)" type="button"><input id="idfocusgene" onclick="focusGivenGene()" type="checkbox">Pin&nbsp;&nbsp;<input id="tlst_ensembl_gene_showname" value="human/Ensembl Gene,ensembl_gene,null" onclick="toggleGenename()" type="checkbox">
show name</td></tr>-->
									
									
								</tbody>
							</table>
						</div>
						<div style="padding-left:5px;margin-top:5px;"><span class="note" style="font-size:10px; font-weight:bold;padding-right:20px;">Note: "Ctrl"+left mouse to move 3D model;&nbsp;&nbsp; "Alt" +left mouse to select a region;"Shift"+left mouse to select a loop</span></div>
						</div> <!--left -->
						 <div style="float:left;padding-left:20px;width:400px;">
							<div style=" overflow:auto;">
							
							<!--
							<table id="idtableshowdataset" cellpadding="2" cellspacing="0" style="overflow:auto;">
								<tbody>
									<tr><td style="text-align:right; font-weight:bold;"><img id="imgshowdataset" onclick="showHideDataset()" src="/deltaar/images/bnus.jpg" />Select dataset </td><td>
									<select id="idPhyModel" onchange="choose3DmodelFunc(1)" style="width:200px;" autocomplete="off">
										
									</select></td></tr>
									
									<tr><td style="text-align:right;">Resolution Size</td><td><select id="idBinsize" onchange="choose3DmodelByBinsizeFunc()"></select></td></tr>
									<tr><td colspan="2" style="text-align:left;">According Features</td></tr>
									
								</tbody>
							</table>
							<table id="idtablehidedataset" cellpadding="2" cellspacing="0" style="display:none;">
								<tbody>
									<tr><td style="text-align:right; font-weight:bold;"><img id="imghidedataset" onclick="showShowDataset()" src="/deltaar/images/plus.jpg" />Select dataset </td></tr>
							   </tbody>
							 </table>-->
							
						
						
						   </div>
							<div  id="trackid">
								<table id="idPhyModelFeature" style="display:none;" >
									<tbody>	
										<tr><td><input type="checkbox" id="tlst_GSE35156_IMR90_40000_TAD" value="GSE35156_IMR90_40000,GSE35156_IMR90_40000_TAD,null" onclick="toggleTrack('GSE35156_IMR90_40000','GSE35156_IMR90_40000_TAD',0,1)"></td></tr>
										<tr><td><input type="checkbox" id="tlst_GSE63525_GM12878_combined_Interaction" value="GSE63525_GM12878_combined,GSE63525_GM12878_combined_Interaction,red" onclick="toggleTrack('GSE63525_GM12878_combined','GSE63525_GM12878_combined_Interaction',0,1)"><input type="checkbox" id="tlst_GSE63525_GM12878_combined_TAD" value="GSE63525_GM12878_combined,GSE63525_GM12878_combined_TAD,null" onclick="toggleTrack('GSE63525_GM12878_combined','GSE63525_GM12878_combined_TAD',0,1)"></td></tr>
										<tr><td><input type="checkbox" id="tlst_GSE63525_HUVEC_combined_Interaction" value="GSE63525_HUVEC_combined,GSE63525_HUVEC_combined_Interaction,red" onclick="toggleTrack('GSE63525_HUVEC_combined','GSE63525_HUVEC_combined_Interaction',0,1)"><input type="checkbox" id="tlst_GSE63525_HUVEC_combined_TAD" value="GSE63525_HUVEC_combined,GSE63525_HUVEC_combined_TAD,null" onclick="toggleTrack('GSE63525_HUVEC_combined','GSE63525_HUVEC_combined_TAD',0,1)"></td></tr>
										<tr><td><input type="checkbox" id="tlst_GSE63525_HMEC_combined_Interaction" value="GSE63525_HMEC_combined,GSE63525_HMEC_combined_Interaction,red" onclick="toggleTrack('GSE63525_HMEC_combined','GSE63525_HMEC_combined_Interaction',0,1)"><input type="checkbox" id="tlst_GSE63525_HMEC_combined_TAD" value="GSE63525_HMEC_combined,GSE63525_HMEC_combined_TAD,null" onclick="toggleTrack('GSE63525_HMEC_combined','GSE63525_HMEC_combined_TAD',0,1)"></td></tr>
										<tr><td><input type="checkbox" id="tlst_GSE63525_K562_combined_Interaction" value="GSE63525_K562_combined,GSE63525_K562_combined_Interaction,red" onclick="toggleTrack('GSE63525_K562_combined','GSE63525_K562_combined_Interaction',0,1)">
<input type="checkbox" id="tlst_GSE63525_K562_combined_TAD" value="GSE63525_K562_combined,GSE63525_K562_combined_TAD,null" onclick="toggleTrack('GSE63525_K562_combined','GSE63525_K562_combined_TAD',0,1)"></td></tr>	
										<tr><td><input type="checkbox" id="tlst_GSE63525_IMR90_combined_Interaction" value="GSE63525_IMR90_combined,GSE63525_IMR90_combined_Interaction,red" onclick="toggleTrack('GSE63525_IMR90_combined','GSE63525_IMR90_combined_Interaction',0,1)"><input type="checkbox" id="tlst_GSE63525_IMR90_combined_TAD" value="GSE63525_IMR90_combined,GSE63525_IMR90_combined_TAD,null" onclick="toggleTrack('GSE63525_IMR90_combined','GSE63525_IMR90_combined_TAD',0,1)"></td></tr>
										<tr><td><input type="checkbox" id="tlst_GSE63525_KBM7_combined_Interaction" value="GSE63525_KBM7_combined,GSE63525_KBM7_combined_Interaction,red" onclick="toggleTrack('GSE63525_KBM7_combined','GSE63525_KBM7_combined_Interaction',0,1)"><input type="checkbox" id="tlst_GSE63525_KBM7_combined_TAD" value="GSE63525_KBM7_combined,GSE63525_KBM7_combined_TAD,null" onclick="toggleTrack('GSE63525_KBM7_combined','GSE63525_KBM7_combined_TAD',0,1)"></td></tr>		
										<tr><td><input type="checkbox" id="tlst_Interaction" value="My Track,Interaction,red" onclick="toggleTrack('My Track','Interaction',0,1)"><input type="checkbox" id="tlst_LCR" value="My Track,LCR,null" onclick="toggleTrack('My Track','LCR',0,1)"><input type="checkbox" id="tlst_TAD" value="My Track,TAD,null" onclick="toggleTrack('My Track','TAD',0,1)"><input type="checkbox" id="tlst_LCR_Gene" value="My Track,LCR_Gene,null" onclick="toggleTrack('My Track','LCR_Gene',0,1)"><input type="checkbox" id="tlst_HSs" value="My Track,HSs,null" onclick="toggleTrack('My Track','HSs',0,1)"></td></tr>	
										
									</tbody>
								</table>
								 <div  id="trackidlist"  style="display:none;">
								 
								 </div>
							 </div>
						
						
						
						
						</div> <!--right-->
						
						
						
						</div>
						
						
						<div style="clear:both;"></div>
						
						 <!--begin draw physical view--> 
						 <div>

							 <table id="hisheatmapid" style="padding-bottom:5px;">
								<tr><td id="featuremapid"></td></tr>
							 </table>	
							<!-- 
							  <div style="padding-top:0px; padding-bottom:10px;"><input type="button" style="width:100px; height:35px;" value="Goto Genome" onclick="gotoGenome()">&nbsp;<input type="button" style="width:120px; height:35px;"  value="Goto Topology" onclick="gotoTopoView()"/></div> -->
							 
							 <div id="waitimgid" style=" display:none;position: absolute;top: 200px; left: 50%; z-index:9999999; width: 64px;height: 66px;">
								 <img id="img-spinner" src="/deltaar/images/ajax-loader.gif" alt="Loading" width="64" height="64"/>
							</div>					 						
							 <div id="trackContainer" style="position: absolute;display: block; padding-right: 0px; height:800px;z-index:5;">
							
								 <div id="gldiv" style=" height: 800px; margin: 0; padding: 0; border: 0;position:relative;z-index:6;">
								 
									
								 </div>
	
								  <div id="indicator" style="margin-top:-800px; padding:0; border:0; position:relative; z-index:20; background-color:#FF0000;opacity:0.4; display:none;">	
								 </div>
								 <div id="tracktext" style=" padding:0; border:0; background-color:#ffffff; position:relative; z-index:999; display:none;">
									
								 </div>
								  
									
								<div id="idcontextmenu" style="height:40px;width:40px;position:relative;z-index:10010; margin-left:0px; background-color:#FFFFFF;"></div>
							 </div>
							<div id="windowsize-vertical" style="height:200px;position:absolute;z-index:10005; margin-left:10px;margin-top:10px; "></div>
							
							
							
						 </div>
						 
						
						 <!--finish draw physical view-->
						
					</div>
					<div style="clear:both;"></div>
					
				 
			 </div>	

        <div style="clear: both;"></div>
		
		<!--display menu-->
	 
	 <input type="hidden" id="4cpos" />
	<input type="hidden" id="4cdataset" />
	<input type="hidden" id="4cbin" />
	<input type="hidden" id="4cstartbin" />
	<!--
	<div class="pane ui-layout-west" id="westid">
		 
	
	</div> -->
	
	 <div class="pane ui-layout-east" id="eastid">
	
		<div id="genomeviewid" style="display:none;margin-top:20px; ">
			<iframe id="gviewframeid"  style="height:1200px;width:100%; padding-left:0px;margin-left:0px;">				
			</iframe>
		</div>	
	</div>
	

</div>

	
	 <div id="catalogTrackid" style="display:none;top:10px;"></div>

	<jsp:include page="/inc/footer.jsp" />
	<script type="text/javascript" src="/deltaar/js/cookie.js"></script>
	<script type="text/javascript" src="/deltaar/js/jspdf.min.js"></script>
	<script type="text/javascript" language="javascript" src="/deltaar/js/physical/physical.js"></script>
	<script type="text/javascript" language="javascript" src="/deltaar/js/physical/track.js"></script>
	<script type="text/javascript" language="javascript" src="/deltaar/js/physical/init.js"></script>
	

	<script type="text/javascript" language="javascript">
	//	showTabs('3');
		
		$(function(){
		  loadInitCircos();
		
		});
		loadEmbedPage();
		
		function loadEmbedPage(){
			
			$("#catalogTrackid").load("/deltaar/pages/visualization/physical_catalog/hg19_catalog.jsp");
	
	  
		
		}
		
		//when check show genome view, we will use the default screen as the div width,
		// however,we will also support user to drag toward physical view and genome view

	    function showGenePanel(){
			$("#idgenetable").css("display","block");
		
		}
		
		function hideGenePanel(){
			
			$("#idgenetable").css("display","none");
		}
		
		
		
		function showHideDataset(){
			$("#idtableshowdataset").css("display","none");
			$("#idPhyModelFeature").css("display","none");
			$("#idtablehidedataset").css("display","");
		
		}
		
		function showShowDataset(){
			$("#idtableshowdataset").css("display","");
			$("#idPhyModelFeature").css("display","");
			$("#idtablehidedataset").css("display","none");
		}
		
		function showOperationPanel(){
			var cssdisplay = $("#idtableoperate").css("display");
			if(cssdisplay == "none"){
			 $("#idtableoperate").css("display","");
			 $("#imgoperate").attr("src","/deltaar/images/bnus.jpg");
			}else{
				 $("#idtableoperate").css("display","none");
					$("#imgoperate").attr("src","/deltaar/images/plus.jpg");
			}
		
		}
		
	
		
		
		

	</script>

</body>
</html>

