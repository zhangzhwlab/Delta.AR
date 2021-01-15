
<style>
.ui-dialog {
    position:absolute;
}
</style>

<div id="cncb_dialog" style="z-index:999999;" >
<div id="container">
	<div id="content" >
		  
	  <div id="" style="margin-left:0px; ">
	
			<div class="header_border" style="padding-top:10px; padding-bottom:10px; height:30px;   background: #e9e9e9 none repeat scroll 0 0;">
			<div class="button" style="float:left;background:#eeeeee;width:150px;margin-left:10px; border:1px solid #aaa;padding-top:2px;padding-bottom:2px; cursor:pointer;" onclick="goBackCircletCNCB()"><span style="padding-left:5px;vertical-align:bottom;"><img src="/deltaar/images/left_arrow.png" /></span><span style="vertical-align:middle; padding-left:5px;">Back to browser</span></div>
			<div style="float:left;padding-left:5px;"><span id="idpwait" style="display:none;"><img src="/deltaar/images/wait.gif"></span></div>
			</div>
			<div style="clear:both"></div>
	
			<div class="header_border" >
				<table cellspacing="0"  class="table5 table5-border" cellpadding="0" style="overflow:auto;font-size:12px;">
					<thead>
					<tr><th></th><th>Database Name</th><th>Description</th><th>#Tracks</th></tr>
					</thead>
					<tbody id="tablecontent_cncb">
						
					</tbody>
				</table>
				
				
			
			</div>
      </div>
		
	</div>
</div>
</div>
<script type="text/javascript" language="javascript">
var clicktable="";



//refresh catalog data
function refreshCNCBCatalog(){
    //get all the class equal selected, got the item categoty, item name
			
			var t_org = window.parent.getOrganismFromModel();
			
			var curdataset= $("#dset").val();
			var params={"organism":t_org,"param1":"cncb"};
			
			
			var ajaxurl="/deltaar/ajax/ajaxGetPhysicalMetaDataFromTable.action?time="+new Date().getTime();
			
	
			$.ajax({
					url: ajaxurl,
					type:'post',
					traditional:true,
					dataType:'json',
					data:params,
					success:function(value){
						//we need to update the catagory list,
						if(value.metaphysicalList != null){
							$("#tablecontent_cncb").empty();
							for(var i=0;i<value.metaphysicalList.length;i++){
								var catalog = value.metaphysicalList[i];
								if(catalog.dataCategory == "cncb"){
									var tr = "<tr><td><input type='checkbox' ";
									if($("#tlst_"+catalog.label).prop("checked")){
										tr += "checked='checked'" ;
									}
								
								    tr += " id=\"ctlst_"+catalog.label+"\" value=\""+catalog.dataCategory+","+catalog.label+","+i+"\" onclick=\"cataCNCBToggleTrack('"+catalog.dataCategory+"','"+catalog.label+"',"+i+")\"> </td><td>"+catalog.dataType+"</td><td>"+catalog.lab+"</td><td>"+catalog.replicateNumber+"</td></tr>";
								    $("#tablecontent_cncb").append(tr);
								
								}
							}
						}
					},
					error:function(e){
					 	alert("get data error");
					}
			   });

}


function goBackCircletCNCB(){
	  $( "#cncb_dialog" ).dialog( "close" );

}

function cataCNCBToggleTrack(category,track,index){
   // $("#idpwait").css("display","block");
	if($("#ctlst_"+track).prop("checked") == true){
		$("#tlst_"+track).prop('checked',true);
		window.parent.ShowCNCBTrackColorMap(track); //
		
	}else{
		$("#tlst_"+track).prop('checked',false);
		window.parent.removeCNCBTrackColorMap(track);
	}
	 

	
}

