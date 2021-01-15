<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<base href="<%=basePath%>">	
		<title>DeltaAR</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">    
		<meta http-equiv="keywords" content="delta ar">
		<meta http-equiv="description" content="delta ar">
	
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="/deltaar/js/jquery-1.9.1.min.js"></script>
			<script src="/deltaar/js/menu.js"></script>
			<script src="/deltaar/js/deltaar.js"></script>
		<link href="/deltaar/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
		<script src="/deltaar/bootstrap/js/bootstrap.min.js"></script>
		<link href="/deltaar/css/default.css" rel="stylesheet" />
	<script type="text/javascript" src="/deltaar/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="/deltaar/js/jquery.layout-latest.js"></script>
	<script type="text/javascript" src="/deltaar/js/jquery.form.js" ></script>
	
	<link rel="stylesheet" href="/deltaar/css/jquery-ui.css" />
	<link href="/deltaar/css/layout-default-latest.css" rel="stylesheet" type="text/css" />

  </head>
  
 <body>
 <div class="container">
   <jsp:include page="/inc/header.jsp" flush="true" />

    <!-- Content -->
    <div class="row">
      <div class="col-md-12" role="main">
        <div class="panel panel-default">
          <div class="panel-body" style="padding-top: 15px; padding-bottom: 10px;">
           
		   		 <div class="form-group row" style="">
					<label for="" class="col-sm-3 col-form-label " style="text-align:right;height:34px; line-height:34px; vertical-align:middle; ">Select dataset</label>
					<div class="col-sm-5">
							
						<select id="idPhyModel" onChange="choose3DmodelFunc(1)" class="form-control" autocomplete="off"><option value="MOGEN_GSE35156_IMR90">MOGEN_GSE35156_IMR90(hg18)</option><option value="BACH_GSE18199_K562">BACH_GSE18199_K562(hg18)</option><option value="MOGEN_GSE18199_K562">MOGEN_GSE18199_K562(hg18)</option><option value="MOGEN_GSE18199_GM06690">MOGEN_GSE18199_GM06690(hg18)</option><option value="BACH_GSE63525_K562_combined">BACH_GSE63525_K562_combined(hg19)</option><option value="MOGEN_GSE63525_K562_combined">MOGEN_GSE63525_K562_combined(hg19)</option><option value="MOGEN_GSE63525_GM12878_combined">MOGEN_GSE63525_GM12878_combined(hg19)</option><option value="MOGEN_GSE63525_HUVEC_combined">MOGEN_GSE63525_HUVEC_combined(hg19)</option><option value="MOGEN_GSE63525_HMEC_combined">MOGEN_GSE63525_HMEC_combined(hg19)</option><option value="MOGEN_GSE63525_IMR90_combined">MOGEN_GSE63525_IMR90_combined(hg19)</option><option value="MOGEN_GSE63525_KBM7_combined">MOGEN_GSE63525_KBM7_combined(hg19)</option><option value="BACH_GSE63525_GM12878_insitu_combined">BACH_GSE63525_GM12878_insitu_combined(hg19)</option><option value="3dmodel">3dmodel(hg19)</option></select>
						
					</div>
				</div>
				
				
				<div class="form-group row" style="">
					<label for="" class="col-sm-3 col-form-label " style="text-align:right;height:34px; line-height:34px; vertical-align:middle; ">Resolution Size</label>
					<div class="col-sm-3">
							
						<select id="idBinsize" onChange="choose3DmodelFunc(1)" class="form-control" autocomplete="off"><option value="5000">5000</option>
						<option value="40000">40000</option></select>
						
					</div>
				</div>
		   
		        <div class="form-group row" style="margin-top:20px;">
					<label for="" class="col-sm-3 col-form-label " style="text-align:right;height:34px; line-height:34px; vertical-align:middle; ">According Features</label>
					<div class="col-sm-8">
							<div  id="trackid">
								<table id="idPhyModelFeature" >
									<tbody>				
									</tbody>
								</table>
								 <div  id="trackidlist"  style="display:none;">
								 
								 </div>
							 </div>
						
						
					</div>
				</div>
		   
		  		 <div class="form-group row" style="">
					<label for="" class="col-sm-3 col-form-label " style="text-align:right;height:34px; line-height:34px; vertical-align:middle; ">Genome Range</label>
					<div class="col-sm-1">
						<select id="chromid" class="form-control" ><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="X">X</option><option value="Y">Y</option><option value="MT">MT</option></select>	
						
						
					</div>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="curpos" value="11:4500000..6500000" />	
						
						
					</div>
				</div>
				
				 <div class="form-group row" style="">
					<label for="" class="col-sm-3 col-form-label " style="text-align:right;height:34px; line-height:34px; vertical-align:middle; ">Please choose annotation tracks</label>
					<div class="col-sm-2">
						<button style="cursor:hand"  class="btn form-control" type="button" onClick="showSelectTrackDialog()" >Select Tracks</button>
					</div>
					
				</div>
				 <div class="form-group row" style="">
					<label for="" class="col-sm-3 col-form-label " style="text-align:right;height:34px; line-height:34px; vertical-align:middle; "></label>
					<div class="col-sm-7">
						<input type="text" id="idtoggletrack" class="form-control" readonly="" />
					</div>
					
				</div>
				
		   
		   
		   
		   	<div class="row" align="center">
				<div class="col-sm-12">
				<button style="cursor:hand;width:150px;padding-top:15px;padding-bottom:15px;"  class="btn1" type="button" onClick="submitForm()">Submit</button> &nbsp;&nbsp;<button style="cursor:hand;width:150px;padding-top:15px;padding-bottom:15px;"  class="btn1" type="button" >Reset</button>
				
				</div>
			
			</div>
			
			<div class="row">
				<div class="col-md-12">
					<div id="catalogTrackid" style="display:none;"></div>
					
				</div>
			
			</div>
		   
		   
		   
          </div>
        </div>
      </div>

    
    </div>
  </div>
    <script type="text/javascript" language="javascript">
       showTabs('1');
	   
	   loadEmbedPage();
		
		function loadEmbedPage(){
			$("#catalogTrackid").load("/deltaar/pages/physical_catalog/hg19_catalog.jsp");
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
		
		//submit form parameter
		function submitForm(){
			var mo = $("#idPhyModel").val();
			var bin = $("#idBinsize").val();
			var sep = getOrganismFromModel();
			var track = $("#idtoggletrack").val();
			
			var seltrack = "";
			$("#trackid input[type='checkbox']").each(function(){
					if ($(this).is(":checked")) {
						var checkval = $(this).val();
						var arrys = checkval.split(",");
						if(arrys != null ){
							seltrack += arrys[1]+",";
						}				
					}
			});
			
			if(seltrack.length> 0 ){
				if(track.length > 0 ){
					track = seltrack+track;
				}else{
					track = seltrack;
					track = seltrack.substring(0,seltrack.length-1);
				}
			}
			
			var chrom= $("#chromid").val();
			var curpos = $("#curpos").val();
			var index1 = curpos.indexOf(":");
			var index2 = curpos.indexOf(".");
			var chrtmp = curpos.substring(0,index1);
			var start = curpos.substring(index1+1,index2);
			var end = curpos.substring(index2+2,curpos.length);		
			start = parseInt(start);	
			end = parseInt(end);
			var url = " http://127.0.0.1/Jiyinserver/Changex.html?modelname="+mo+"&binsize="+bin+"&sepcies="+sep+"&track="+track+"&rense="+chrom+"&start="+start+"&end="+end;
			//submit form
			var a = document.getElementById("goto");
			if(a == null){
				a=document.createElement('a');
				a.id="goto";
				document.body.appendChild(a);
			}
			
			a.href = url;
			a.target="_blank";
			
			 document.getElementById("goto").click();
		}
		
      </script>
  
  </body>
</html>
