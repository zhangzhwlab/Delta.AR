<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/circosweb/css/default.css" rel="stylesheet" type="text/css" />


<script type="text/javascript" src="/circosweb/js/menu.js"></script>

<script type="text/javascript" src="/circosweb/js/jquery-1.9.1.js" ></script>
<script type="text/javascript" src="/circosweb/js/physical/3Dmol1.2_m.js"></script>
<script type="text/javascript" src="/circosweb/js/jquery-ui.js"></script>
<script type="text/javascript" src="/circosweb/js/jquery.layout-latest.js"></script>

<link rel="stylesheet" href="/circosweb/css/jquery-ui.css" />
<link href="/circosweb/css/layout-default-latest.css" rel="stylesheet" type="text/css" />
<title>Physical view</title>

<style type="text/css">
 .pane {
	display:	none; /* will appear when layout inits */
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

$(function(){
	//$("#dmenu").load("/circosweb/pages/visualization/physical/detail.jsp");
	$("#dupload").load("/circosweb/pages/visualization/physical/uploadtrack.jsp");
	$("#catalogTrackid").load("/circosweb/pages/visualization/physical_catalog/hg19_catalog.jsp");
	$("#dsession").load("/circosweb/pages/visualization/physical/session.jsp");
	
});

</script>
</head>

<body>
<jsp:include page="/inc/header.jsp" />

<div id="container" style="margin: 0 0 ;padding: 0 0 ; height:1500px;">
	<div id="centerid" class="pane ui-layout-center" >
				<div class="header_content" style="position:relative; margin-left:0px;padding-left:0px;padding-top:0px;margin-top:0px;width:100%;">
						<div>
                    	<div style="float:left;">
					
                  		<div>Go to&nbsp;&nbsp;&nbsp;&nbsp;<select style="width:50px;" id="chromid" onchange="ChooseChrom(2)"></select>
					   <input type="text" name="position" id="curpos" value="11" style="width:150px;"/>&nbsp;&nbsp;<select style="width:200px; display:none;" id="dset" name="dataset" onchange="loadInitTrack()"></select><input type="button" value="GO" onclick="drawQuery3D()"/>&nbsp;<input type="checkbox" id="gviewid" onclick="showGenomeView()"/><img src="/circosweb/images/left_a.jpg" width="15" height="15" />&nbsp;<span style="font-weight:bold;color:red;font-size:16px;">Enter Dual-mode Here</span>&nbsp;<img src="/circosweb/images/help.gif" title="Enter dual-mode with genome view" />&nbsp;<input type="hidden" id="windownamount"/></div>	
					   <a id="my_link" style="display:none;"> </a>
  						<div id="firing_div" style="display:none;"></div>	
						 <div >
						   <div style="padding-top:5px;"><img id="imgoperate" src="/circosweb/images/bnus.jpg" onclick="showOperationPanel()">Operations </div>
						 	<table cellpadding="5" cellspacing="0" id="idtableoperate" style="border:1px solid #cccccc;">
								<tbody>
									
									<tr>
									<td valign="top"><div class="button" id="idbuttontrack" style="background:#eeeeee;width:120px; border:1px solid #000;padding-top:5px;padding-bottom:5px; cursor:pointer;" onclick="showSelectTrackDialog()" ><span style="padding-left:5px;vertical-align:bottom;"><img src="/circosweb/images/left_arrow.png" /></span><span style="vertical-align:middle; padding-left:5px; font-weight:bold;">Select Tracks</span></div></td><td>
									<input type="button" value="Upload" onclick="showUploadDialog()" />&nbsp;<input type="button" value="Goto Genome" onclick="gotoGenome()"><input type="button" value="Goto Topology" onclick="gotoTopoView()"/><input type="button" value="Virtual 4C" onclick="btnShow4Cplot()" /><input type="button" value="Export" onclick="savePageAs()" style="width:50px" /><input type="button" value="Share" onclick="shareSession()"><img src="/circosweb/images/wait.gif" id="waitexport" style="display:none;" />
									
									</td>

									
									</tr>
									<tr>
								
									<td valign="top" colspan="2"><input type="button" onclick="changeLineModel()" value="Line"> &nbsp;
									<input type="button"onclick="changeSphareModel()" value="Sphere">&nbsp;
									<input type="checkbox" id="labelid" onclick="showOrHideLabel()" value="1" />Show Label&nbsp;<img src="/circosweb/images/help.gif" title="Checked for showing bead orders" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Always redraw <img src="/circosweb/images/help.gif" title="Click 'yes' to active displaying quantitative features according to zoom level" /><input name="redrawtrack" type="radio" value="1" />Yes <input name="redrawtrack" type="radio" value="2" checked="checked">No
									</td>
									
									</tr>
									
												
									<tr><td colspan="2">Input Genename:&nbsp;&nbsp;<input id="idtext_ensembl_gene" type="text"><input value="GO" onclick="showSearchGene('idtext_ensembl_gene',0)" type="button"><input id="idfocusgene" onclick="focusGivenGene()" type="checkbox">Pin&nbsp;&nbsp;<input id="tlst_ensembl_gene_showname" value="human/Ensembl Gene,ensembl_gene,null" onclick="toggleGenename()" type="checkbox">
show name</td></tr>
									
									
								</tbody>
							</table>
						</div>
						<div style="padding-left:5px;margin-top:5px;"><span class="note" style="font-size:10px; font-weight:bold;padding-right:20px;">Key: "Ctrl"+left mouse to move 3D model;&nbsp;&nbsp; "Alt" +left mouse to select a region;"Shift"+left mouse to select a loop</span></div>
						</div> <!--left -->
						 <div style="float:left;width:400px;">
							<div style=" overflow:auto;">
							
							
							<table id="idtableshowdataset" cellpadding="2" cellspacing="0" style="overflow:auto;">
								<tbody>
									<tr><td style="text-align:right; font-weight:bold;"><img id="imgshowdataset" onclick="showHideDataset()" src="/circosweb/images/bnus.jpg" />Select dataset </td><td><!--get 3d model from mysql -->
									<select id="idPhyModel" onchange="choose3DmodelFunc(1)" style="width:200px;" autocomplete="off">
										
									</select></td></tr>
									
									<tr><td style="text-align:right;">Resolution Size</td><td><select id="idBinsize" onchange="choose3DmodelByBinsizeFunc()"></select></td></tr>
									<tr><td colspan="2" style="text-align:left;">According Features</td></tr>
									
								</tbody>
							</table>
							<table id="idtablehidedataset" cellpadding="2" cellspacing="0" style="display:none;">
								<tbody>
									<tr><td style="text-align:right; font-weight:bold;"><img id="imghidedataset" onclick="showShowDataset()" src="/circosweb/images/plus.jpg" />Select dataset </td></tr>
							   </tbody>
							 </table>
							
						
						
						   </div>
							<div  id="trackid">
								<table id="idPhyModelFeature" >
									<tbody>				
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
							 <div id="waitimgid" style=" display:none;position: absolute;top: 200px; left: 50%; z-index:9999999; width: 64px;height: 66px;">
								 <img id="img-spinner" src="/circosweb/images/ajax-loader.gif" alt="Loading" width="64" height="64"/>
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
					
					<div id="genepanelid" style="display:block; padding-top:800px;">
							<div class="header_content">
								<div>
								<input type="button" value="Show Gene" onclick="showGenePanel()" />&nbsp;&nbsp;<input type="button" value="Hide Gene" onclick="hideGenePanel()" /></div>
								
								<div id="idgenetable" style="height:400px; overflow:scroll;">
									
								</div>
							</div>
						</div> 
			 </div>	

        <div style="clear: both;"></div>
		
		<!--display menu-->
		<div id="dmenu" style="display:none;"></div>
		<div id="dupload" style="display:none;"></div>
		<div id="dsession" style="display:none;"></div>
		<div id="4cplot" style="display:none;"></div>
		 
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
	<script type="text/javascript" src="/circosweb/js/cookie.js"></script>
	<script type="text/javascript" src="/circosweb/js/jspdf.min.js"></script>
	<script type="text/javascript" language="javascript" src="/circosweb/js/physical/physical.js"></script>
	<script type="text/javascript" language="javascript" src="/circosweb/js/physical/track.js"></script>
	<script type="text/javascript" language="javascript" src="/circosweb/js/physical/init.js"></script>
	

	<script type="text/javascript" language="javascript">
		showTabs('3');
		
		//when check show genome view, we will use the default screen as the div width,
		// however,we will also support user to drag toward physical view and genome view

	    function showGenePanel(){
			$("#idgenetable").css("display","block");
		
		}
		
		function hideGenePanel(){
			
			$("#idgenetable").css("display","none");
		}
		
		function showSelectTrackDialog(){
			refreshCatalog();
			//check all the selected tracks in catalog 
			var checktracklist = $("#trackid input:checkbox:checked");
			
			
			$("#dialog-catalog").dialog(
			{ 
			  width:1200,
			  height: 800, 
			  modal: true
		
			}); 
	
		
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
			 $("#imgoperate").attr("src","/circosweb/images/bnus.jpg");
			}else{
				 $("#idtableoperate").css("display","none");
					$("#imgoperate").attr("src","/circosweb/images/plus.jpg");
			}
		
		}
		
		//this is used to share current session with Other person
		function shareSession(){
		$("#waitexport").css("display","");
			var param1=getQueryString("conf");
		
			var position=$("#curpos").val();
			var zoom = $("#windownamount").val();;
					
			
			
			var jumptrack="";
				
				$("#trackid input[type='checkbox']").each(function(){				
							if ($(this).is(":checked")) {
								var checkval = $(this).val();
								if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
									
									var arrys = checkval.split(",");					
									
										/*if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
										|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
										||arrys[1].indexOf("HeLa-S3")>-1 ){
											jumptrack += arrys[1]+"_signal," ;	
										}else{
											jumptrack += arrys[1]+"," ;	
										}*/
										jumptrack += arrys[1]+"," ;						
									
								}
								
							}
				});
				if(jumptrack.length > 0){
					jumptrack = jumptrack.substring(0,jumptrack.length-1);	
				}
				
				var model = $("#idPhyModel").val();
				if(jumptrack.length>0){
					jumptrack += ","+model;
					if(model.indexOf("3dmodel") > -1){
					
					}else{
					jumptrack += "_3dmodel";	
					}
				}else{
					jumptrack = model;
					if(model.indexOf("3dmodel") > -1){
					
					}else{
						jumptrack += "_3dmodel";	
					}
				}
			
			var params={"param1":param1,"position":position,"zoom":zoom,"track":jumptrack};
		
		   $.ajax({
			url : '/circosweb/ajax/ajaxGenSession.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: true,
			success : function(data){
				if(data.param2 != null ){
					$("#idgensession").html(data.param2);
					var sessionurl="<a style='color:blue' href='http://delta.big.ac.cn/pages/visualization/physical_view.jsp?conf="+param1+"&session="+data.param2+"'>http://delta.big.ac.cn/pages/visualization/physical_view.jsp?conf="+param1+"&session="+data.param2+"</a>";
				$("#idsharesession").html(sessionurl);
				}
				$("#waitexport").css("display","none");
					$("#share_session").dialog({
						"title": "Share Session",
						"width" : 650,
						"height" : 300
					});
				
			 },
			 error : function(){
			 	alert(" share error");
			 }
					
			});
			

		}
		
		

	</script>

</body>
</html>

