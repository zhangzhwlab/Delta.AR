
<style>
.ui-dialog {
    position:absolute;
}
</style>

<div id="dialog-catalog" style="z-index:9999999;" >
<div id="container">
	<div id="content" >
	
    	
    
		<div id="right-column1" style="margin-left:5px; margin-top:0px; width:200px;font-size:12px;">
		
		
		  	<div class="header_border" style=" height:900px;overflow:auto;" id="idallcata">
			
		    		<div class="catalog" id="idheaddatacategory" onclick="showcatalog('iddatacategory','imgdatacategory')"><span id="imgdatacategory" class="arrownode-open" style="vertical-align:middle;"><img src="/deltaar/images/blank1.gif" /></span><span style="padding-left:5px;">Data Category</span></div>
					<div class="header_content" id="iddatacategory">
						<table width="253" id="idtabledatacategory" cellpadding="0" cellspacing="0"  class="facetSelect">
							<tbody>
								
							</tbody>
						</table>
					
					</div>
					
					
					<div class="catalog" id="idheadcell" onclick="showcatalog('idcell','imgcell')"><span id="imgcell" class="arrownode-open" style="vertical-align:middle;"><img src="/deltaar/images/blank1.gif" /></span><span style="padding-left:5px;">Cell</span></div>
					<div class="header_content" id="idcell">
						<table width="253" id="idtablecell" cellpadding="0" cellspacing="0"  class="facetSelect">
							<tbody>
								
							</tbody>
						</table>
					
					</div>
					
					
					<div class="catalog" id="idheadantibody" onclick="showcatalog('idantibody','imgantibody')"><span id="imgantibody" class="arrownode-open" style="vertical-align:middle;"><img src="/deltaar/images/blank1.gif" /></span><span style="padding-left:5px;">Antibody</span></div>
					<div class="header_content" id="idantibody">
						<table width="253" id="idtableantibody" cellpadding="0" cellspacing="0"  class="facetSelect">
							<tbody>
								
							</tbody>
						</table>
					
					</div>
					
					
					<div class="catalog" id="idheadlab" onclick="showcatalog('idlab','imglab')"><span id="imglab" class="arrownode-open" style="vertical-align:middle;"><img src="/deltaar/images/blank1.gif" /></span><span style="padding-left:5px;">Lab</span></div>
					<div class="header_content" id="idlab">
						<table width="253" id="idtablelab" cellpadding="0" cellspacing="0"  class="facetSelect">
							<tbody>
								
							</tbody>
						</table>
					
					</div>
					
					
					
					<div class="catalog" id="idheaddatatype" onclick="showcatalog('iddatatype','imgdatatype')"><span id="imgdatatype" class="arrownode-open" style="vertical-align:middle;"><img src="/deltaar/images/blank1.gif" /></span><span style="padding-left:5px;">Data Type</span></div>
					<div class="header_content" id="iddatatype">
						<table width="253" id="idtabledatatype" cellpadding="0" cellspacing="0"  class="facetSelect">
							<tbody>
								
							</tbody>
						</table>
					
					</div>
					

		 	</div>
		  </div>
		  

	  
	  <div id="left-column1" style="margin-left:0px; ">
	
			<div class="header_border" style="padding-top:10px; padding-bottom:10px; height:30px;   background: #e9e9e9 none repeat scroll 0 0;">
			<div class="button" style="float:left;background:#eeeeee;width:150px;margin-left:10px; border:1px solid #aaa;padding-top:2px;padding-bottom:2px; cursor:pointer;" onclick="goBackCirclet()"><span style="padding-left:5px;vertical-align:bottom;"><img src="/deltaar/images/left_arrow.png" /></span><span style="vertical-align:middle; padding-left:5px;">Back to browser</span></div>
			<div style="float:left;padding-left:5px;"><span id="idpwait" style="display:none;"><img src="/deltaar/images/wait.gif"></span></div>
			</div>
			<div style="clear:both"></div>
	
			<div class="header_border" >
				<table cellspacing="0"  class="table5 table5-border" cellpadding="0" style="overflow:auto;font-size:12px;">
					<thead>
					<tr><th></th><th>Antibody</th><th>Cell</th><th>Data category</th><th>Data type</th><th>File type</th><th>Lab</th><th>Name</th><th>Organism</th><th>Peaks?</th><th>Replicate number</th></tr>
					</thead>
					<tbody id="tablecontent">
						
					</tbody>
				</table>
				
				
			
			</div>
      </div>
		
	</div>
</div>
</div>
<script type="text/javascript" language="javascript">
var clicktable="";


function showcatalog(divid,imgid){
		var divlow = $("#"+divid);
		if(divlow.css("display") == "none"){
			divlow.css("display","block");
			$("#"+imgid).attr("class","arrownode-open");
		}else{
		
			divlow.css("display","none");
			$("#"+imgid).attr("class","arrownode-close");
		}
}

$("#idtabledatacategory tr").click(
function(){
clicktable="datacategory";
	//identify current class
	var css = $(this).attr("class");
	if(css.indexOf("selected") > -1 ){
		$(this).removeClass("selected");
	}else{
		$(this).addClass("selected");
	} 
	refreshCatalog();
}
);

$("#idtablecell tr").click(
function(){
clicktable="cell";
	//identify current class
	var css = $(this).attr("class");
	alert("click cell");
	if(css.indexOf("selected") > -1 ){
		$(this).removeClass("selected");
	}else{
		$(this).addClass("selected");
	} 
	refreshCatalog();
}
);

$("#idtableantibody tr").click(
function(){
clicktable="antibody";
	//identify current class
	var css = $(this).attr("class");
	if(css.indexOf("selected") > -1 ){
		$(this).removeClass("selected");
	}else{
		$(this).addClass("selected");
	} 
}
);


$("#idtablelab tr").click(
function(){
clicktable="lab";
	//identify current class
	var css = $(this).attr("class");
	if(css.indexOf("selected") > -1 ){
		$(this).removeClass("selected");
	}else{
		$(this).addClass("selected");
	} 
}
);


$("#idtabledatatype tr").click(
function(){
clicktable="datatype";
	//identify current class
	var css = $(this).attr("class");
	if(css.indexOf("selected") > -1 ){
		$(this).removeClass("selected");
	}else{
		$(this).addClass("selected");
	} 
}
);






//refresh catalog data
function refreshCatalog(){
    //get all the class equal selected, got the item categoty, item name
			var param="";
			var plist=[];
			plist[0]="";
			plist[1]="";
		      plist[2]="";
			plist[3]="";
			plist[4]="";
			
			
			$("#idtabledatacategory tr").each(function(){
				var css = $(this).attr("class");
				if(css.indexOf("selected") > -1){
					var text = $(this).find('td:eq(1)').text().trim();
					plist[0] += text+";";
				}
				
			});
	
			
			$("#idtablecell tr").each(function(){
				var css = $(this).attr("class");
				if(css.indexOf("selected") > -1){
					var text = $(this).find('td:eq(1)').text().trim();
					plist[1] += text+";";

				}
				
			});
			
			
			$("#idtableantibody tr").each(function(){
				var css = $(this).attr("class");
				if(css.indexOf("selected") > -1){
					var text = $(this).find('td:eq(1)').text().trim();
					plist[2] += text+";";
				}
				
			});
			
			
			$("#idtablelab tr").each(function(){
				var css = $(this).attr("class");
				if(css.indexOf("selected") > -1){
					var text = $(this).find('td:eq(1)').text().trim();
					plist[3] += text+";";
			
				}
				
			});
			
			$("#idtabledatatype tr").each(function(){
				var css = $(this).attr("class");
				if(css.indexOf("selected") > -1){
					var text = $(this).find('td:eq(1)').text().trim();
					plist[4] += text+";";
				
				}
				
			});
			
			var t_org = window.parent.getOrganismFromModel();
			
			var curdataset= $("#dset").val();
			var params={"plist":plist,"param1":curdataset,"param2":t_org};
			
			
			var ajaxurl="/deltaar/ajax/ajaxGetMetaCatalog.action?time="+new Date().getTime();
			
	
			$.ajax({
					url: ajaxurl,
					type:'post',
					traditional:true,
					dataType:'json',
					data:params,
					success:function(value){
						//we need to update the catagory list,
						if(value.catalist != null){
							$("#tablecontent").empty();
							for(var i=0;i<value.catalist.length;i++){
								var catalog = value.catalist[i];
								
								
								var tr = "<tr><td><input type='checkbox' ";
								if($("#tlst_"+catalog.track.key).prop("checked")){
									tr += "checked='checked'" ;
								}
								
								tr += " id=\"ctlst_"+catalog.track.key+"\" value=\""+catalog.track.category+","+catalog.track.key+","+i+"\" onclick=\"cataToggleTrack('"+catalog.track.category+"','"+catalog.track.key+"',"+i+")\"> </td><td>"+catalog.meta.antibody+"</td><td>"+catalog.meta.cell+"</td><td>"+catalog.meta.data_category+"</td><td>"+catalog.meta.data_type+"</td><td>"+catalog.meta.fileType+"</td><td>"+catalog.meta.lab+"</td><td>"+catalog.meta.name+"</td><td>"+catalog.meta.organism+"</td><td>"+catalog.meta.peaks+"</td><td>"+catalog.meta.replicate_number+"</td></tr>";
								$("#tablecontent").append(tr);
							}
						}
						
						if(value.cataTypeList != null){
						//$("#idallcata").empty();
							for(var i=0;i<value.cataTypeList.length;i++){
								var catatype = value.cataTypeList[i];
								var name = catatype.typename ;
								var cataname=name;
								if(name.length>0){
									cataname = name.replace(" ","").toLowerCase();
								}
								
								//if($("#idhead"+cataname).length==0 ||($("#idhead"+cataname).length>0 &&$("#idhead"+cataname).attr("class").indexOf("activeFacet")<0 )){
										
									//$("#idhead"+cataname).remove();	
									//$("#id"+cataname).remove();	
								
									//var div="<div class=\"catalog\" id=\"idhead"+cataname+"\" onclick=\"showcatalog('id"+cataname+"','img"+cataname+"')\"><span id=\"img"+cataname+"\" class=\"arrownode-open\" style=\"vertical-align:middle;\"><img src=\"/deltaar/images/blank1.gif\" /></span><span style=\"padding-left:5px;\">"+name+"</span></div>";
								
								    //$("#idallcata").append(div);
								
								//var div1=$("<div class=\"header_content\" id=\"id"+cataname+"\"></div>");
								//var table1 = $("<table width=\"253\" id=\"idtable"+cataname+"\" cellpadding=\"0\" cellspacing=\"0\"  class=\"facetSelect\"></table>");
								var table1=$("#idtable"+cataname);
								table1.empty();
								if(catatype.itemlist!= null && catatype.itemlist.length > 0 ){
									for(var j=0;j<catatype.itemlist.length ;j++ ){
										var jitem = catatype.itemlist[j];
										//here, we need to add the class for the current click
										var choosecss = "facetValue";
										if(cataname.indexOf("datacategory")>-1){
											if(plist[0] != null && plist[0].length>0 && plist[0].indexOf(jitem.name) > -1 ){
												choosecss = "facetValue selected";
											}
										}
										if(cataname.indexOf("cell")>-1){
											if(plist[1] != null && plist[1].length>0 && plist[1].indexOf(jitem.name) > -1 ){
												choosecss = "facetValue selected";
											}
										}
										if(cataname.indexOf("antibody")>-1){
											if(plist[2] != null && plist[2].length>0 && plist[2].indexOf(jitem.name) > -1 ){
												choosecss = "facetValue selected";
											}
										}
										if(cataname.indexOf("lab")>-1){
											if(plist[3] != null && plist[3].length>0 && plist[3].indexOf(jitem.name) > -1 ){
												choosecss = "facetValue selected";
											}
										}
										if(cataname.indexOf("datatype")>-1){
											if(plist[4] != null && plist[4].length>0 && plist[4].indexOf(jitem.name) > -1 ){
												choosecss = "facetValue selected";
											}
										}
										
										
										
										
											var tr = $("<tr class=\""+choosecss+"\"> <td class=\"count\">"+jitem.count+"</td> <td class=\"value\">"+jitem.name+" </td><td style='display:none'>"+jitem.catagory+"</td></tr>");									tr.click(function(){
											//remove all the idhead 
											$(".catalog").each(function(){
												$(this).removeClass("activeFacet");
											});
											//var
											var category= $(this).find('td:eq(2)').text().trim(); 
											if($("#idhead"+category).length > 0 ){
											
												$("#idhead"+category).removeClass("catalog");
												 $("#idhead"+category).addClass("catalog activeFacet");
											}
										    
											var css = $(this).attr("class");
											if(css.indexOf("selected") > -1 ){
												$(this).removeClass("selected");
											}else{
												$(this).addClass("selected");
											} 
											refreshCatalog();
										}
										);
										tr.appendTo(table1);
									}
								  }
									//table1.appendTo(div1);
									//div1.appendTo($("#idallcata"));
									
									//}
							
							}
						
						}
						
						//we need to update the table
						
						
					},
					error:function(e){
					 	alert("get data error");
					}
			   });

}

function goBackCirclet(){
	  $( "#dialog-catalog" ).dialog( "close" );

}

function cataToggleTrack(category,track,index){
   // $("#idpwait").css("display","block");
	if($("#ctlst_"+track).prop("checked") == true){
		$("#tlst_"+track).prop('checked',true);
		window.parent.ShowTrackColorMap(track); //
		
	}else{
		$("#tlst_"+track).prop('checked',false);
		window.parent.removeTrackColorMap(track);
	}
	 

	
}

