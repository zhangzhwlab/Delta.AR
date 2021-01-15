var phymodelMap={};


	
	
function choose3DmodelFunc(flag){
	var modelval = $("#idPhyModel").val();
	var params={"param":modelval};
	$.ajax({
			url : '/deltaar/ajax/ajaxPmodelBinsize.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: false,
			success : function(data){
				if(flag == 1){
					if(data.physicalModelList != null){
						$("#idBinsize").empty();
						for(var i=0;i<data.physicalModelList.length;i++){
							var binobj = data.physicalModelList[i];
							var option = "<option value=\""+binobj.binSize+"\">"+binobj.binSize+"</option>";
							$("#idBinsize").append(option);
						}	
					}
					
				}
				
				var tbinval=$("#idBinsize").val();
				
				var mname = modelval+"_"+tbinval;
				var table = $("#idPhyModelFeature");
				table.empty();
				//console.log("mname="+mname);
				
				if(mname == "MOGEN_GSE35156_IMR90_40000"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE35156_IMR90_40000_TAD\" value=\"GSE35156_IMR90_40000,GSE35156_IMR90_40000_TAD,red\" > GSE35156_IMR90_40000_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
				}else if(mname == "BACH_GSE63525_K562_combined_1000000"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE63525_K562_combined_Interaction\" value=\"GSE63525_K562_combined,GSE63525_K562_combined_Interaction,red\" > GSE63525_K562_combined_Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_GSE63525_K562_combined_TAD\" value=\"GSE63525_K562_combined,GSE63525_K562_combined_TAD,null\" > GSE63525_K562_combined_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
				}else if(mname == "BACH_GSE63525_K562_combined_500000"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE63525_K562_combined_Interaction\" value=\"GSE63525_K562_combined,GSE63525_K562_combined_Interaction,red\" > GSE63525_K562_combined_Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td style='padding-left:5px;' ><input type=\"checkbox\" id=\"tlst_GSE63525_K562_combined_TAD\" value=\"GSE63525_K562_combined,GSE63525_K562_combined_TAD,null\" > GSE63525_K562_combined_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
					
				}else if(modelval == "MOGEN_GSE63525_GM12878_combined"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE63525_GM12878_combined_Interaction\" value=\"GSE63525_GM12878_combined,GSE63525_GM12878_combined_Interaction,red\" > GSE63525_GM12878_combined_Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_GSE63525_GM12878_combined_TAD\" value=\"GSE63525_GM12878_combined,GSE63525_GM12878_combined_TAD,null\" > GSE63525_GM12878_combined_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
					
				}else if(modelval == "MOGEN_GSE63525_HUVEC_combined"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE63525_HUVEC_combined_Interaction\" value=\"GSE63525_HUVEC_combined,GSE63525_HUVEC_combined_Interaction,red\" > GSE63525_HUVEC_combined_Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td style='padding-left:5px;' ><input type=\"checkbox\" id=\"tlst_GSE63525_HUVEC_combined_TAD\" value=\"GSE63525_HUVEC_combined,GSE63525_HUVEC_combined_TAD,null\" > GSE63525_HUVEC_combined_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
					
				}else if(modelval == "MOGEN_GSE63525_HMEC_combined"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE63525_HMEC_combined_Interaction\" value=\"GSE63525_HMEC_combined,GSE63525_HMEC_combined_Interaction,red\" > GSE63525_HMEC_combined_Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td  style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_GSE63525_HMEC_combined_TAD\" value=\"GSE63525_HMEC_combined,GSE63525_HMEC_combined_TAD,null\" > GSE63525_HMEC_combined_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
					
				}else if(modelval == "MOGEN_GSE63525_IMR90_combined"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE63525_IMR90_combined_Interaction\" value=\"GSE63525_IMR90_combined,GSE63525_IMR90_combined_Interaction,red\" > GSE63525_IMR90_combined_Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td  style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_GSE63525_IMR90_combined_TAD\" value=\"GSE63525_IMR90_combined,GSE63525_IMR90_combined_TAD,null\" > GSE63525_IMR90_combined_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
					
				}else if(modelval == "MOGEN_GSE63525_KBM7_combined"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_GSE63525_KBM7_combined_Interaction\" value=\"GSE63525_KBM7_combined,GSE63525_KBM7_combined_Interaction,red\" > GSE63525_KBM7_combined_Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td  style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_GSE63525_KBM7_combined_TAD\" value=\"GSE63525_KBM7_combined,GSE63525_KBM7_combined_TAD,null\" > GSE63525_KBM7_combined_TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
					
				}else if(modelval == "3dmodel"){
					tr=$("<tr></tr>");
					tr.appendTo(table);
					var tdval="<td ><input type=\"checkbox\" id=\"tlst_TAD\" value=\"My Track,TAD,null\" >TAD</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td  style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_Interaction\" value=\"My Track,Interaction,yellow\" > Interaction</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td  style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_LCR_Gene\" value=\"My Track,LCR_Gene,null\" > LCR_Gene</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td  style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_HSs\" value=\"My Track,HSs,red\" > HSs</td>";
					td=$(tdval);
					td.appendTo(tr);
					tdval="<td  style='padding-left:5px;'><input type=\"checkbox\" id=\"tlst_LCR\" value=\"My Track,LCR,null\" > LCR</td>";
					td=$(tdval);
					td.appendTo(tr);
					
					$("#idBinsize").empty();
					var option = "<option value=\"50000\">50000</option>";
					$("#idBinsize").append(option);
					option = "<option value=\"5000\">5000</option>";
					$("#idBinsize").append(option);
					
				}
				
			}
	});
	
	
}	



function getOrganismFromModel(){
	
	var modeltext= $('#idPhyModel option:selected').text();
		var idx1 = modeltext.indexOf("(") ;
		var idx2 = modeltext.indexOf(")") ;
		var tmp_organism= "" ;
		if( idx1 > -1 && idx2 > -1 ){
			tmp_organism = modeltext.substring(idx1+1,idx2).trim();  
		}
	return tmp_organism;
	
}

