
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/circosweb/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/circosweb/js/menu.js"></script>
<script type="text/javascript" src="/circosweb/js/jquery-1.9.1.js" ></script>
<script type="text/javascript" src="/circosweb/js/jquery-ui.js"></script>
<link rel="stylesheet" href="/circosweb/css/jquery-ui.css" />

<title>Virtual 4C</title>
</head>

<body onload="loadLayout()">


<div id="container" style="overflow: hidden; position: relative; height:1310px;">
<jsp:include page="/inc/header.jsp" />
<div id="content">

	<div id="left-column1" style="width:280px; margin-top: 20px;">
	<div style="background-color:#eeeeee; padding-left:5px; padding-top:10px; padding-bottom:10px; width:250px; font-size:14px; width:100%; font-weight:bold;">Virtual 4C Conditions</div>
	<div class="header_border">
		
		<table cellpadding="5" cellspacing="0" style="margin-top:5px; font-size:13px;">
		<tbody>
			<tr>
			<td width="230">
			<b>Organism</b></td>
			</tr>
			<tr><td>
					  <select id="idorga" style="width:120px;" onchange="showCell()"><option value="hg18">Human (hg18)</option><option value="hg19">Human (hg19)</option></select>
			</td></tr>
			<tr><td><b>Dataset</b></td></tr><tr><td>
			
					  <select style="width:200px;" id="iddataset" onchange="showDataset()" >
				
					</select>
			</td></tr>	
			<tr><td>	
				<b>Resolution Size</b></td></tr><tr><td>
					  <select id="idresolution" style="width:80px;">
						<option value="5000">5kb</option>
					</select> 
			</td></tr>
			<tr><td>
					<b>Position</b><span style="color:red;">*</span></td></tr><tr><td><input type="text" id="idposition" value="1:10000000" style="width:120px;" />
			</td></tr>
			<tr><td>
				
					<b>Expanded region(default &plusmn;500kb)</b></td></tr><tr><td><input type="text" id="idexpand" value="5000000" style="width:120px;">
			</td></tr>
			<tr><td>		
					
					<b>Enter Delta-view  URL or other Genome Browser URL</b></td></tr>
					<tr><td style="font-size:13px;"><input type="radio" name="browse" id="idbnone" value="3" onclick="showgburl()" checked="checked">None <input type="radio" name="browse" id="iddelta" value="1"  onclick="showgburl()"/>Delta-view &nbsp;<input name="browse" value="2" id="iducsc" type="radio" onclick="showgburl()">UCSC Genome Browser </td></tr>
					<tr><td><textarea id="idgburl" rows="5" cols="28" ></textarea>
					
			</td></tr>
			<tr><td>
					<input type="button" value="Submit" onclick="initdraw4cplot()" />&nbsp;<input type="reset" value="Reset" />
					</td></tr>
		
		
		</tbody>
		</table>
		</div>
	

	</div>
	
	<div id="right-column1" style="margin-left:20px; width:900px;">
	
	<div class="header_border" style="position:relative; height:1110px;" >
		<div class="header_content" >
					<input type="hidden" id="windownamount"/>
				<div style="padding-bottom:5px; font-size:13px;" id="idpaper"></div>
		
				<div style="margin-left:0px">Zoom<span style="padding-left:15px;">1</span><span style="padding-left:195px;">20</span> <span id="idwait" style="display:none;"><img src="/circosweb/images/wait.gif" /></span></div>
				<div id="windowsize-vertical" style="width:200px; height:10px; margin-left:50px;margin-top:0px; margin-bottom:10px;"></div>
				<div style="position:absolute;">
					
					<div id="id4cplot" style="width:800px; height:400px; position:relative;z-index:999">
						<canvas id="canvas" width="800" height="400" ></canvas>
					</div>	
					<div style="width:800px;height:400px; position:relative;z-index:1;margin-top:-420px;">
						<canvas id="idannotecanvas" width="800" height="400"></canvas>
					</div>	
					
				
					
					
					<div id="idalignline" style="width:10px; height:1000px; background-color:blue; opacity: 0.1; position:relative; z-index:6;  margin-top:-380px; display:none;">
						
					</div>
					
					
					<div id="iddivframe" style="padding-left:58px; position:relative; z-index:4;  margin-top:10px; display:none;">
						<iframe id="idgbrowse" src="" width="745px" height="600px;">
						
						</iframe>
					</div>
					<div id="idtext" style="width:200px; height:200px;position:relative; z-index:10; font-size:13px;  margin-top:-980px; margin-left:70px; ">
						
					</div>
					<div id="idanchor" style="width:100px;height:20px;position:relative;z-index:1014; margin-top:-220px; background-color:#ccc; color:blue; display:none;">
					
					</div>
				</div>
		
		</div>

	</div>
		</div>

</div>
<jsp:include page="/inc/footer.jsp" />
</div>	

<script type="text/javascript" src="/circosweb/js/virtual4c/init.js" ></script>
<script type="text/javascript" src="/circosweb/js/virtual4c/4cplot.js"></script>
<script type="text/javascript" language="javascript">
showTabs('7');
showCell();
function showCell(){
	var orga = $("#idorga").val();
	if(orga == "hg18"){
		
		$("#iddataset").empty();
		$("#idresolution").empty();
		var option = "<option value='GSE18199_GM06690' selected='selected'>GSE18199_GM06690</option>";
		$("#iddataset").append(option);
		option = "<option value='GSE18199_K562'>GSE18199_K562</option>";
		$("#iddataset").append(option);
		option = "<option value='GSE35156_IMR90'>GSE35156_IMR90</option>";
		$("#iddataset").append(option);
		
		option = "<option value='1000000'>1mb</option>";
		$("#idresolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#idresolution").append(option);
		
	}else if(orga == "hg19"){
		$("#iddataset").empty();
		$("#idresolution").empty();
		var option = "<option value='GSE63525_K562_combined_raw' selected='selected'>GSE63525_K562_combined_raw</option>";
		$("#iddataset").append(option);
	
		option = "<option value='GSE63525_GM12878_combined_raw'>GSE63525_GM12878_combined_raw</option>";
		$("#iddataset").append(option);
		option = "<option value='GSE63525_HUVEC_combined_raw'>GSE63525_HUVEC_combined_raw</option>";
		$("#iddataset").append(option);
		option = "<option value='GSE63525_HMEC_combined_raw'>GSE63525_HMEC_combined_raw</option>";
		$("#iddataset").append(option);
		option = "<option value='GSE63525_IMR90_combined_raw'>GSE63525_IMR90_combined_raw</option>";
		$("#iddataset").append(option);
		option = "<option value='GSE63525_KBM7_combined_raw'>GSE63525_KBM7_combined_raw</option>";
		$("#iddataset").append(option);
		
		option = "<option value='1478854512827'>1478854512827</option>";
		$("#iddataset").append(option);
		
		option = "<option value='1000000'>1mb</option>";
		$("#idresolution").append(option);
		option = "<option value='500000'>500kb</option>";
		$("#idresolution").append(option);
		option = "<option value='250000'>250kb</option>";
		$("#idresolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#idresolution").append(option);
		option = "<option value='50000'>50kb</option>";
		$("#idresolution").append(option);
		option = "<option value='25000'>25kb</option>";
		$("#idresolution").append(option);
		option = "<option value='5000'>5kb</option>";
		$("#idresolution").append(option);
		option = "<option value='50000'>50000</option>";
		$("#idresolution").append(option);

	}
}

function showDataset(){
	var dataset = $("#iddataset").val();
	$("#idresolution").empty();
	if(dataset.indexOf("GSE18199") > -1 ){
	
		var option = "<option value='1000000'>1mb</option>";
		$("#idresolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#idresolution").append(option);
	}else if(dataset.indexOf("GSE35156") > -1){

		var option = "<option value='40000'>40kb</option>";
		$("#idresolution").append(option);
	}else if(dataset.indexOf("GSE63525") > -1){
		var option = "<option value='1000000'>1mb</option>";
		$("#idresolution").append(option);
		option = "<option value='500000'>500kb</option>";
		$("#idresolution").append(option);
		option = "<option value='250000'>250kb</option>";
		$("#idresolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#idresolution").append(option);
		option = "<option value='50000'>50kb</option>";
		$("#idresolution").append(option);
		option = "<option value='25000'>25kb</option>";
		$("#idresolution").append(option);
		option = "<option value='5000'>5kb</option>";
		$("#idresolution").append(option);
	}else if(dataset.indexOf("1478854512827") > -1){
		var option = "<option value='50000'>50000</option>";
		$("#idresolution").append(option);
	}

}


</script>

</body>
</html>

