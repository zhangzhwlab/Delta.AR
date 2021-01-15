
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/deltaar/js/menu.js"></script>
<link rel="stylesheet" href="/deltaar/css/jquery-ui.css" />
<link href="/deltaar/css/layout-default-latest.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/deltaar/js/jquery-1.9.1.min.js" ></script>
<link href="/deltaar/css/circlet/circos.css" rel="stylesheet" type="text/css" />
<title>Topological view</title>
<script type="text/javascript">
	var bandlst;
	
</script>
<style  type="text/css">
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

</style>


</head>

<body>
<jsp:include page="/inc/header.jsp" />
<table><tbody><tr><td><input id="idshowpbtn"  style="display:none;" type="button" value="Update physical mode" onclick="RefreshPhysical()" /></td></tr></tbody></table>
<div id="container" style="overflow: hidden; position: relative;" class="" >



<div id="idpagecontent" class="pane ui-layout-center" style="min-width: 1000px; position: absolute; margin: 0px; left: 0px; right: 0px; top: 0px; bottom: 0px; height: 978px; width: 1241px; z-index: 0; display: block; visibility: visible;"> 
				<div class="header_content" style="position:relative;margin-top:0px;padding-top:0px;">
					 <div>Go to&nbsp;<select style="width:50px;" id="chromid" onchange="ChooseChrom(2)"></select>
					   <input type="text" name="position" id="curpos" value="1:1..249250621" style="width:150px;"/><span id="formatscopeid">1 Mb</span>&nbsp;&nbsp;<select style="width:200px; display:none;" id="cdset" name="dataset" onchange="loadInitTrack()"></select>&nbsp;<input type="button" value="go" onclick="singleChrom()"/>&nbsp;&nbsp;<input type="text" id="idgenesearch" value="HBB" /><input type="button" value="Search Gene" onclick="searchGivenGene()" /><img src="/deltaar/images/chroms.jpg"  onclick="loadWholeGenomePage()" alt="chromosomes" />&nbsp;<!--<img src="/deltaar/images/wheels.png" onclick="loadConfigPage()"> &nbsp;&nbsp;&nbsp;&nbsp;--><!--<input type="button" value="Upload" onclick="uploadTrackDialog()" />&nbsp;--><!--<input id="idOutlinkGenome" type="button" value="Goto Genome" onclick="gotoGenome()"><input style="display:none;" id="idEmbedGenome" type="button" value="Goto Genome" onclick="gotoEmbedGenome()"><input id="idGotoOutPhysical" type="button" value="Goto Physical" onclick="gotoPhysicalView()"/><input type="button" value="Virtual 4C" onclick="dialogLoadVirtual4C()" /> --><!--<input type="button" value="Export" onclick="savePageAs()" /><input type="button" value="Share" onclick="shareSession()">--><img src="/deltaar/images/wait.gif" id="waitexport" style="display:none;" /></div>
                     
				  <div style="padding-top:10px;">
				 <table width="1173" cellpadding="0" cellspacing="0">
				 	<tbody>
					<tr>
					<td width="146"><div class="button" id="idbuttontrack" style="background:#eeeeee;width:125px; border:1px solid #000;padding-top:5px;padding-bottom:5px; cursor:pointer;" onclick="showSelectTrackDialog()" ><span style="padding-left:5px;vertical-align:bottom;"><img src="/deltaar/images/left_arrow.png" /></span><span style="vertical-align:middle; padding-left:5px; font-weight:bold;">Select Tracks</span></div></td>
					<td width="4"></td>
					<td width="1021">
				 <span> Zoom in 
				    <input type="button" value="1x" onclick="zoomin_func(2)"/>&nbsp;<input type="button" value="3x" onclick="zoomin_func(3)" />&nbsp;<input type="button" value="10x" onclick="zoomin_func(10)" />&nbsp;
				   <select id="scopeid" style="width:150px;" onchange="changeScope()">
				  		<option value="1000000" selected="selected">Show 1 Mbp</option>
						<option value="500000">Show 500 kbp</option>
						<option value="20000">Show 200 kbp</option>
						<option value="100000">Show 100 kbp</option>
						<option value="50000">Show 50 kbp</option>
						<option value="20000">Show 20 kbp</option>
						<option value="10000">Show 10 kbp</option>
						<option value="5000">Show 5 kbp</option>
						<option value="2000">Show 2 kbp</option>
						<option value="1000">Show 1 kbp</option>
						<option value="200">Show 200 bp</option>
						<option value="100">Show 100 bp</option>
				  </select>&nbsp;Zoom out&nbsp;<input type="button" value="1x" onclick="zoomout_func(2)" />&nbsp;<input type="button" value="3x" onclick="zoomout_func(3)" />&nbsp;<input type="button" value="10x" onclick="zoomout_func(10)"/><input type="hidden" id="windownamount"/>&nbsp;&nbsp;  <input type="hidden" id="radiusamount" /></span><span class="note" style="font-size:10px; font-weight:bold;">Key: Move mouse along track cycle to highlight region;&nbsp;&nbsp; </span>
				  </td></tr>
				  </tbody></table>
				  </div>
					 <!--
					 <div id="err" style="margin-top:10px;margin-bottom:10px; color:navy; font-size:medium; font-family:sans-serif; display:none;">
					 	Detailed view is limited to 5 Mbp.The histogram density view will be showed.<br/> 
						If you want tow show the detail view ,click and drag on one of the scalebars to make a smaller selection.
					 </div> -->
					  
					 <div id="twaitimgid" style=" display:block;position: absolute; top:200px; left:50%; z-index:9999999; width: 64px;height: 66px;">
								 <img id="img-spinner" src="/deltaar/images/ajax-loader.gif" alt="Loading" width="64" height="64"/>
					 </div>	
                     <div id="genome_region" style="margin-top:20px;">
					 	
                     	<div style="position: relative; z-index: 104;"><canvas id="genome" width="900" height="40"></canvas></div>
						<div id="choose_indicator" style="position: absolute; border: 1px solid rgb(128, 166, 255); z-index: 105; display: none;">
							<div style="background-color: blue; opacity: 0.1; height: 100%; width: 100%;"></div>
						</div>
                     </div>
					 <div style="z-index:110; position:relative; padding-left:100px;" >
					 	<table cellspacing="0" cellpadding="0" id="hisheatmapid">
							<tbody>
								<tr><td id="featuremapid"></td></tr>
							</tbody>
						
						</table>
					 </div>
					 <div style="z-index:112; position:relative; padding-left:100px;" >
					 	<table cellspacing="0" cellpadding="0" >
							<tbody>
								<tr><td id="featuremapshowarid"></td></tr>
							</tbody>
						
						</table>
					 </div>
					 
					 <!-- this used to show static picture for all data track of single chromosome or just interaction data of whole genome-->
					 <div id="showpic">
					 
					 </div>
					
					 
					 <div  id="trackContainer" style="position: absolute;display: block; padding-right: 10px; height:800px; background-color:#ffffff;">
						 <div id="idcirclet" style="margin-top:10px;position: relative; z-index: 101; width:1000px;" align="left">
						
							<canvas id="canvas" width="800" height="800" style="margin-left:150px;"></canvas>
						 </div>
						 
					    <div id="divglasspane" style="position: relative;">
                    	     <canvas id="glasspane" style="position: absolute; padding-left:150px;display: none;  z-index: 201;"></canvas> 
					     </div>
						 
					 </div> 
					 
					 <div id="windowsize-vertical" style="height:200px;position:absolute;z-index:999; margin-left:5px; "></div>
					 <div id="radiussize-vertical" style="height:100px; position:absolute;z-index:900; margin-left: 50px; background:red; "></div>
				                     
			  </div>
		<div id="chrompageid" style="display:none;"></div>
		 <div id="configpageid" style="display:none;"></div>
		  <div id="utrackid" style="display:none;"></div>
		  <div id="dsession" style="display:none;"></div>
		  
			 
        <div style="clear: both;"></div>
		
		<div class="header_border"  id="genomeid" style="display:none;margin-left:5px; width:95%;">
			<div class="header">Genome View</div>
			<div class="header_content" > <!--genoview-->
				<iframe id="genomeframe" src="#" width="95%" height="600px"></iframe>
			</div>
	   </div>	
	
</div>
	<div class="pane ui-layout-west" style="width:2px; display: none; position: absolute; margin: 0px; left: 0px; right: auto; top: 0px; bottom: 0px; height: 978px; z-index: 0; visibility: visible;; " id="westid" > 
		<div class="header_content" id="trackid" style="margin:0 0 ; padding: 0 0 ; display:none; line-height:1;">
						
         </div> 
	</div>	
		
	
</div>

	
	
	 <div id="catalogTrackid" style="display:none;top:10px;"></div>
	
	<jsp:include page="/inc/footer.jsp" />
	<script type="text/javascript" src="/deltaar/js/jquery-ui.min.js" ></script> 
<script type="text/javascript" src="/deltaar/js/jquery.layout-latest.js"></script>
<script type="text/javascript" src="/deltaar/js/jquery.form.js" ></script>
<script type="text/javascript" src="/deltaar/js/cookie.js"></script>
	<script type="text/javascript" src="/deltaar/js/jspdf.min.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/page.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/mouse.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/layout/chrom.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/layout/wholeGenome.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/circos.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/feature/line.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/feature/gene.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/feature/arc.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/feature/histone.js"></script>
<script type="text/javascript" src="/deltaar/js/circlet/ajaxdata.js"></script>
<script type="text/javascript" src="/deltaar/js/virtual4c/4cplot.js"></script>
<script type="text/javascript" language="javascript" src="/deltaar/js/circlet/init.js"></script>


<script type="text/javascript" language="javascript">
	//	showTabs('2');
		var oldartrack="";
		var oldarlocation="";	
		$(function(){
			loadLayout();
			
		});
		window.setInterval("delta_ar_synchronized_circos()",2000);
		loadEmbedPage();
		
		
		function loadEmbedPage(){
		$("#chrompageid").load("/deltaar/pages/visualization/circos/chrom.jsp");
		$("#configpageid").load("/deltaar/pages/visualization/circos/config.jsp");
		$("#utrackid").load("/deltaar/pages/visualization/circos/uploadtrack.jsp");
		$("#catalogTrackid").load("/deltaar/pages/visualization/catalog/hg19_catalog.jsp");
		$("#dsession").load("/deltaar/pages/visualization/physical/session.jsp");	
		
		}
		
		
		function showSelectTrackDialog(){
			refreshCatalog();
			$("#dialog-catalog").dialog(
			{ 
			  width:1200,
			  height: 800, 
			  modal: true
		
			}); 
	
		
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
									jumptrack += arrys[1]+"," ;	
										
															
									
								}
								
							}
				});
				if(jumptrack.length > 0){
					jumptrack = jumptrack.substring(0,jumptrack.length-1);	
				}
				
			
			var params={"param1":param1,"position":position,"zoom":zoom,"track":jumptrack};
		
		   $.ajax({
			url : '/deltaar/ajax/ajaxGenSession.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: true,
			success : function(data){
				if(data.param2 != null ){
					$("#idgensession").html(data.param2);
					var sessionurl="<a style='color:blue' href='http://delta.big.ac.cn/pages/visualization/topo_viewm.jsp?conf="+param1+"&session="+data.param2+"'>http://delta.big.ac.cn/pages/visualization/topo_viewm.jsp?conf="+param1+"&session="+data.param2+"</a>";
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
		
		function delta_ar_synchronized_circos(){
			
			var hololensid =  getQueryString("hololensid");
				if(hololensid == null || hololensid==""){	
					hololensid = Cookies.get("delta.ar.hololensid");
				} 
				
		
			if(hololensid != null && hololensid !=""){
			 var url ="/deltaar/download/delta_ar/"+hololensid+".json?time="+new Date().getTime();
			 $.get(url,function(result){
					result = eval(result);
					if(result.length >0){
						//console.log("-----------------delta_ar------"+result);
						var dataobj = result[0];
						
						//clear highlight
						
						
						if(dataobj.event == "select_region"){ //go to select region
					
							//var jumptracks = [];
							//jumptracks.push(dataobj.tracks);
							if(oldarlocation != "" && oldarlocation.length>0 ){
						
								var tmp_loc = dataobj.loc;
								if(tmp_loc != oldarlocation){
									var ctx=glasspane.getContext('2d');
						ctx.clearRect(0,0,glasspane.width,glasspane.height);
									var jumptracks = dataobj.tracks;
									RefreshGenomeView(dataobj.loc,jumptracks);
									oldarlocation = tmp_loc;
								}
							}else if(oldarlocation == ""){
							var ctx=glasspane.getContext('2d');
						ctx.clearRect(0,0,glasspane.width,glasspane.height);
									var jumptracks = dataobj.tracks;
									RefreshGenomeView(dataobj.loc,jumptracks);
									oldarlocation = dataobj.loc;
							}
							
							
							
							
						/*	var params1={"hololensid":hololensid};
							$.ajax({
							   url:'/deltaar/ajax/ajaxDelMsg.action',
							   type:'post',
							   dataType:'json',
							   async:false,
							   data:params1,
							   success:function(value){
									
							   }
							   }
							);*/
							
						}else if(dataobj.event == "add_track"){ // add one track
							var jumptracks = [];
							jumptracks.push(dataobj.tracks);
							AddTracks(jumptracks);
							
							
						}else if(dataobj.event == "remove_track"){ //remove one track
							var jumptracks = [];
							jumptracks.push(dataobj.tracks);
							RemoveTracks(jumptracks);
						}/*else if(dataobj.event == "initial") { // inital current genome view
							var initurl="/deltaar/pages/visualization/topo_viewm.jsp?conf="+dataobj.organism+"&loc="+dataobj.loc+"&tracks="+dataobj.tracks+"&resolution="+dataobj.resolution+"&organism="+dataobj.organism+"&sb="+dataobj.sb+"&hololensid="+dataobj.hololensid;
						//	console.log(initurl);
							window.location.href=initurl;
							
							//stop initial
							var params1={};
							$.ajax({
							   url:'/deltaar/ajax/ajaxDelMsg.action',
							   type:'post',
							   dataType:'json',
							   data:params1,
							   success:function(value){
									
							   }
							   }
							);
							
						}*/else if(dataobj.event == "highlight_region"){ //highligh region
							//var jumptracks = [];
							//jumptracks.push(dataobj.tracks);
							if(oldarlocation != "" && oldarlocation.length>0 ){
							
								var tmp_loc = dataobj.loc;
								if(tmp_loc != oldarlocation){
									var ctx=glasspane.getContext('2d');
									ctx.clearRect(0,0,glasspane.width,glasspane.height);
									var jumptracks = dataobj.tracks;
									HighlightGenomeView(dataobj.loc,jumptracks);
									oldarlocation = tmp_loc;
								}
							}else if(oldarlocation == ""){
							var ctx=glasspane.getContext('2d');
						ctx.clearRect(0,0,glasspane.width,glasspane.height);
									var jumptracks = dataobj.tracks;
									HighlightGenomeView(dataobj.loc,jumptracks);
									oldarlocation = dataobj.loc;
							
							}
							
							
							/*var params1={"hololensid":hololensid};
							$.ajax({
							   url:'/deltaar/ajax/ajaxDelMsg.action',
							   type:'post',
							   dataType:'json',
							   async:false,
							   data:params1,
							   success:function(value){
									
							   }
							   }
							);*/
						}
						
					}
				});
			}

			
		
		}
		
		
		
</script>
</body>
</html>

