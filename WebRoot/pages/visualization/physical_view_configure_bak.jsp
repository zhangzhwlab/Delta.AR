<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/deltaar/js/menu.js"></script>

<script type="text/javascript" src="/deltaar/js/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="/deltaar/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery.layout-latest.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery.form.js" ></script>
<link rel="stylesheet" href="/deltaar/css/jquery-ui.css" />
<link href="/deltaar/css/layout-default-latest.css" rel="stylesheet" type="text/css" />
<title>Physical view</title>

</head>

<body>
<div id="container" style="height:700px;">
<jsp:include page="/inc/header.jsp" />
<div id="content">
<div class="header_content">
	<div class="header">Physical View Configure</div>

</div>
<div class="header_border" style="margin-left:10px;width:800px;">
<div class="header_content">
	<div class="header">Genome Location</div>
	<div style="padding-left:10px;">
		<table cellpadding="0" cellspacing="0">
									<tbody>
										<tr style="padding:0px 0px;"><td valign="top">Genome&nbsp;<select id="organismid" style="width:110px;" onchange="loadInitConfigure()"><option value="hg18">Human(hg18)</option><option value="hg19" selected="selected">Human(hg19)</option></select></td></tr>
										<tr><td> Location&nbsp;
										  <select style="width:80px;" id="chromid" onchange="ChooseChrom(2)"></select>
							   <input type="text" name="position" id="curpos" value="" style="width:150px;"/>&nbsp;&nbsp;<select style="width:200px; display:none;" id="dset" name="dataset" onchange="loadInitTrack()"></select>
							   </td>
							   </tr>
							   </tbody>
		</table>
	
	</div>
</div> <!--header content-->
<div class="header_content">
	<div class="header">Choose 3D model</div>
	<div style="overflow:auto;">
		<table id="idtableshowdataset" cellpadding="2" cellspacing="0" style="overflow:auto;padding-left:10px; ">
								<tbody>
									<tr><td style="text-align:right; font-weight:bold;"><img id="imgshowdataset" onclick="showHideDataset()" src="/deltaar/images/bnus.jpg" />Select dataset </td><td><!--get 3d model from mysql -->
									<select id="idPhyModel" onchange="choose3DmodelFunc(1)" style="width:280px;" autocomplete="off">
										
									</select></td></tr>
									
									<tr><td style="text-align:right;">Resolution </td>
									<td><select id="idBinsize" onchange="choose3DmodelByBinsizeFunc()"></select></td></tr>
									
									
								</tbody>
							</table>
							<div class="header" style="padding-left:0px;">Available features for this dataset</div>
							<table id="idtablehidedataset" cellpadding="2" cellspacing="0" style="display:none; ">
								<tbody>
									<tr><td style="text-align:right; font-weight:bold;"><img id="imghidedataset" onclick="showShowDataset()" src="/deltaar/images/plus.jpg" />Select dataset </td></tr>
							   </tbody>
							 </table>
						
			</div>
			<div  id="trackid" style="padding-left:10px;">
				<table id="idPhyModelFeature" >
									<tbody>				
									</tbody>
				</table>
					<div  id="trackidlist"  style="display:none;">
								 
					</div>
		  </div>
</div>


	<div class="header_content">
		<div class="header">Choose Tracks</div>
		<div class="button" id="idbuttontrack" style="background:#eeeeee;width:240px; margin-left:10px; border:1px solid #000;padding-top:5px;padding-bottom:5px; cursor:pointer;" onclick="showSelectTrackDialog()" ><span style="padding-left:5px;vertical-align:bottom;"><img src="/deltaar/images/left_arrow.png" /></span><span style="vertical-align:middle; padding-left:5px; font-weight:bold;">Select Annotation Tracks</span></div>
		<div class="button" style="margin-top:15px;background:#eeeeee;width:125px; margin-left:10px; border:1px solid #000;padding-top:5px;padding-bottom:5px; cursor:pointer; padding-left:5px; font-weight:bold;" onclick="showCNCBTrackDialog()"> CNCB Dataset</div>
	</div>
	
	<div style="margin-left:10px;">
		<table id="hisheatmapid" style="padding-bottom:5px;">
			 <tr><td id="featuremapid"></td></tr>
		</table>
		<table id="CNCBhisheatmapid" style="padding-bottom:5px;">
			 <tr><td id="CNCBfeaturemapid"></td></tr>
		</table>
		<input type="hidden" id="idcncbtxt" /> 
	</div>
	

</div>
<div class="header_content">
	<div><input type="button" value="Next"  style="width:60px; height:30px;" onclick="configView()" /></div>

</div>


</div>

<div id="catalogTrackid" style="display:none;top:10px;"></div>
<div id="datahubTrackid" style="display:none; top:10px;"></div>
<jsp:include page="/inc/footer.jsp" />

</div>

<script type="text/javascript" language="javascript" src="/deltaar/js/physical/physical_config.js"></script>

<script type="text/javascript" language="javascript">
	$(function(){
		  loadInitConfigure();
		
		})
	loadEmbedPage();
	

	function loadEmbedPage(){
		$("#catalogTrackid").load("/deltaar/pages/visualization/physical_catalog/hg19_catalog_config.jsp");
		$("#datahubTrackid").load("/deltaar/pages/visualization/dialog/cncb_datahub_dialog.jsp");
	}
		
	//this is used to show 3d model
	function configView(){
		var sid = getQueryString("hololensid");
		
		//get all params from current set
		var conf = $("#organismid").val();
		var loc=  $("#curpos").val();
		var model = $("#idPhyModel").val();
		
		var cncbtrack= $("#idcncbtxt").val();
		
		
		var jumptrack="";
		var gtrack="";
		
		var qcount = 0 ; // count the quality tracks number
		
		var t_html= "";
		
		$("#trackid input[type='checkbox']").each(function(){
							if ($(this).is(":checked")) {
									var checkval = $(this).val();
									var arrys = checkval.split(",");					
									if(arrys[1].indexOf('3dmodel') < 0) {
										jumptrack += arrys[1]+"," ;	
										if(arrys[1].indexOf("GSE63525")>-1 || arrys[1].indexOf("GSE35156")>-1 || arrys[1].indexOf("GSE18199")>-1){
											t_html += '<input class=\"re_select_track\" type=\"checkbox\" value=\"'+checkval+'\"  />'+arrys[1]+"<br/>";
										}
										
										else if(arrys[1].indexOf("GM12878")>-1 ||arrys[1].indexOf("H1-hESC")>-1||arrys[1].indexOf("HeLa-S3")>-1||arrys[1].indexOf("HepG2")>-1 ||arrys[1].indexOf("HUVEC")>-1 ||arrys[1].indexOf("K562")>-1 ){
											qcount++;
											t_html += '<input class=\"re_select_track\" type=\"radio\"  name=\"qt\" value=\"'+checkval+'\"  />'+arrys[1]+"<br/>";
										}else  {
											t_html += '<input class=\"re_select_track\" type=\"checkbox\" value=\"'+checkval+'\"  />'+arrys[1]+"<br/>";
										}
										
										 if(arrys[1].indexOf("GSE63525")>-1 || arrys[1].indexOf("GSE35156")>-1 || arrys[1].indexOf("GSE18199")>-1){
												gtrack += arrys[1]+"," ;	
										  }
										  else if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
																|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
																||arrys[1].indexOf("HeLa-S3")>-1 ){
												gtrack += arrys[1]+"_signal," ;	
										  }else{
												gtrack += arrys[1]+"," ;	
										   }	
										
																						
									}																			
							}
					});
					
			if(jumptrack.length > 0){
				jumptrack = jumptrack.substring(0,jumptrack.length-1);	
			}
			
			if(gtrack.length > 0){
				gtrack = gtrack.substring(0,gtrack.length-1);	
			}
			
	
													
					
			var track=jumptrack; 
			
			var bin = $("#idBinsize").val();
			
			var index1 = loc.indexOf(":");
			var index2 = loc.indexOf(".");
		
			
			var pos_starttmp = loc.substring(index1+1,index2);
			var pos_endtmp = loc.substring(index2+2,loc.length);
			
			pos_starttmp = parseInt(pos_starttmp);
			
			pos_endtmp = parseInt(pos_endtmp);
			
			//identifiy the atom of 3dmodel can not super than 100
			var posrange = pos_endtmp -  pos_starttmp ;
			
			var atomcount = posrange/bin;
			if(atomcount > 60 || atomcount<5){
						$('<div></div>').appendTo('body')
							  .html('<div style=\"margin-top:10px;font-size:14px;\">The number of balls showed in you model should between 5 and 60. Please re-define your genome region.</div>')
							  .dialog({
								  modal: true, title: 'Warn', zIndex: 10000, autoOpen: true,
								  width: 'auto', resizable: false,						 
								  close: function (event, ui) {
									  //remove from cookie	
									 
									  $(this).remove();
								  },
								
							});
			
			}else{
			var artrack="";
		
		
			//if the selected quality tracks more than 1, then open a dialog
			
			if(qcount > 1){
				$('<div></div>').appendTo('body')
								  .html('<div style=\"margin-top:10px; font-size:14px; font-weight:normal;\"><strong>Too much tracks you chose, please re-select.</strong><br/>'+t_html+'</div>')
								  .dialog({
									  modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
									  width: 'auto', resizable: false,						 
									  close: function (event, ui) {
										  $(this).remove();
									  },
								  buttons:{
									  Ok: function(){
									  		
											$(".re_select_track:checkbox").each(function(){
													var checkval = $(this).val();
													var arrys = checkval.split(",");
													
													if ($(this).is(":checked")) {
														var checkval = $(this).val();
														var arrys = checkval.split(",");	
														
																		
														if(arrys[1].indexOf('3dmodel') < 0) {
															artrack+= arrys[1]+"," ;	
														}
														
														
														
														
													}	
			
											});	
											var isdrawtrack= $('input[type="radio"][name="qt"]:checked').val();	
											if(isdrawtrack != null ){
												var arrys = isdrawtrack.split(",");					
												if(arrys[1].indexOf('3dmodel') < 0) {
															artrack+= arrys[1]+"," ;	
												}
											
											
											}
											
													if(artrack.length > 0){
														artrack = artrack.substring(0,artrack.length-1);	
													}
													
				
													var res =callDeltaAR(conf,model,bin,conf,loc,artrack,sid); 
													if(res == 0 ){
													//jumping to genome view
													window.location.href="http://"+window.location.host+"/jbrowse/delta_index.html?data="+conf+"&nav=1&overview=1&menu=1&loc="+loc+"&tracks="+gtrack+"&hololensid="+sid+"&model="+model+"&binsize="+bin+"&organism="+conf;		
												//	window.location.href="/deltaar/pages/visualization/physical_view.jsp?conf="+conf+"&loc="+loc+"&tracks="+track+"&model="+model+"&bin="+bin+"&zoom=146&hololensid="+sid;
													
													}
												
			
											
									  }
									}
								});
	  		}
			else{
			 
				var res =callDeltaAR(conf,model,bin,conf,loc,track,sid); 
				var jump_url="";
				if(res ==0 ){
				jump_url="http://"+window.location.host+"/jbrowse/delta_index.html?data="+conf+"&nav=1&overview=1&menu=1&loc="+loc+"&tracks="+gtrack+"&hololensid="+sid+"&model="+model+"&binsize="+bin+"&organism="+conf;
				
				
				if(cncbtrack.length>0){
					jump_url+= "&"+cncbtrack;
				}
				
				window.location.href= jump_url;
				//jumping to genome view
			//	window.location.href="/deltaar/pages/visualization/physical_view.jsp?conf="+conf+"&loc="+loc+"&tracks="+track+"&model="+model+"&bin="+bin+"&zoom=146&hololensid="+sid;
			
				}
				
			
			
			}
			
			
			}
			
			
			
			
			
			
			
			
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
	 
	 function showCNCBTrackDialog(){
	 		$("#cncb_dialog").dialog(
				{ 
				  width:1000,
				  height: 800, 
				  modal: true
			
				}); 
	 
	 }


	//from window location get val
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
</script>

</body>
</html>

