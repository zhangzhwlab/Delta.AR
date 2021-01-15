
<!--<script type="text/javascript" src="/circosweb/js/jquery-ui.min.js"></script>
<link rel="stylesheet" href="/circosweb/css/jquery-ui.css" /> -->
<script type="text/javascript">

	$("#windowsize-tt").slider({
		
			  range: "min",
			  min: 1,
			  step: 1,
			  max: 20,
			  showLabels:true,
			  showScale:true,
			  value: 1,
			  slide: function( event, ui ) {
			 
				$( "#windowsize-tt" ).find("a").css("font-size","12px").css("color","#ff0000").css("width","25px").text(ui.value);				
			  },
			  stop: function( event, ui ) { //ui.value
				//draw 4c plot
					var zoom4c = parseInt(ui.value);
	
 
					var pdataset=$("#idPhyModel").val();
					var presolution=$("#idBinsize").val();
					presolution = parseInt(presolution);
					var expandRegion=500000;
					//if(presolution/1000000 > 0 ){ //mb
					expandRegion = expandRegion*zoom4c;
					//}	
					$("#id4cwait").css("display","block");
					var ploc= $("#4cpos").val();
					
					if(pdataset.indexOf("BACH")> -1 || pdataset.indexOf("MOGEN") > -1 ){
						var idex = pdataset.indexOf("GSE");
						if(idex > -1){
							pdataset = pdataset.substring(idex,pdataset.length);
						}
						
					}else{
						pdataset = getQueryString("conf");
					}
					
					
					if(pdataset.indexOf("GSE18199") > -1 ){
						$("#idpaper").html("Virtual 4C constructed <b> "+pdataset+"</b> is from \"Comprehensive mapping of long-range interactions reveals folding principles of the human genome. \" <a  style=\"color:blue;\" href=\"http://www.ncbi.nlm.nih.gov/pubmed/19815776\" target=\"_blank\">PMID</a>");
								
					}else if (pdataset.indexOf("GSE35156") > -1 ){
						$("#idpaper").html("Virtual 4C constructed <b> "+pdataset+"</b> is from \"Topological domains in mammalian genomes identified by analysis of chromatin interactions. \" <a style=\"color:blue;\" href=\"http://www.ncbi.nlm.nih.gov/pubmed/22495300\" target=\"_blank\">PMID</a>");
								
					}else if(pdataset.indexOf("GSE63525") > -1 ){
						$("#idpaper").html("Virtual 4C constructed <b> "+pdataset+"</b> is from \" A 3D map of the human genome at kilobase resolution reveals principles of chromatin looping. \" <a style=\"color:blue;\" href=\"http://www.ncbi.nlm.nih.gov/pubmed/25497547\" target=\"_blank\">PMID</a>");
					}else {
						$("#idpaper").html("");
						
					}
					
					
					var canvastt = document.getElementById("id4ccanvas");
					var ctxtt = canvastt.getContext('2d');	
					$("#idtext").html("");
					ctxtt.clearRect(0, 0, canvastt.width, canvastt.height);
					canvastt.addEventListener("mousemove",extend_canvas_mouse_move1,false);
					
					
					draw4cplotfunc(pdataset,presolution,ploc,expandRegion,start_bin,canvastt,ctxtt);	

			  }
			});
	
	
	
		$( "#windowsize-tt" ).find("a").css("font-size","12px").css("color","#ff0000").css("width","25px").text(1);
		

</script>

<div id="4cplot-dialog" >
	<input type="hidden" id="4cpos" />
	<input type="hidden" id="4cdataset" />
	<input type="hidden" id="4cbin" />
	<div id="idpaper" style="font-size:12px;width:520px;padding-bottom:5px;">
	</div>
	<div style="margin-left:0px">Zoom<span style="padding-left:5px;">1</span><span style="padding-left:95px;">20</span> <span id="id4cwait" style="display:none;"><img src="/circosweb/images/ajax-loader.gif" /></span></div>
	<div id="windowsize-tt" style="width:100px; height:10px; margin-left:50px;margin-top:0px; margin-bottom:10px;"></div>
	<div id="idtext" style="width:400px; height:60px; "></div>
	<div id="id4cplot" style="width:500px; height:400px; position:relative; z-index:8000;  ">
			<canvas id="id4ccanvas" width="500" height="400" ></canvas>
	</div>
	<div id="idalignline" style="width:6px; height:400px; background-color:blue; opacity: 0.1; position:relative; z-index:8006;  margin-top:-400px; display:none;">
</div>
