var phymodelMap={};	
	
	//init physical config
	function loadInitConfigure(){
	
		var conf = $("#organismid").val();
		var params={"conf":conf};
		$.ajax({
					url:'/deltaar/ajax/initPhysical.action',
					type:'post',
					dataType:'json',
					data: params,
					async: false,
					success:function(data){
						$("#dset").empty();
						$.each(data.datasetList,loadDataset);
						loadInitTrack();
									
					},
					error:function(){
						alert("Init circos datasets fail.");			
					}
				
				});
	}

	//load all the dataset from the configuration file, if cookie dataset exist,then set the default dataset
	function loadDataset(index,value){	
		var option="<option value='"+value.conf+"'>"+value.name+"</option>";
		$("#dset").append(option);	
	}
	
	//used to parse given datasets configurations,get the chromosome information,create the track category page
	function loadInitTrack(){
		
		var curconf = $("#dset").val();
		var params={"curDataset":curconf};	
		
		var curorganism = $("#organismid").val();
		$.ajax({
			url : '/deltaar/ajax/loadPysicalTrack.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: false,
			success : function(data){
				if(data.organism !== undefined && data.organism != null){
					organism = data.organism ;
				}
				
				if(data.speciesJson != undefined && data.speciesJson != null ){
				$("#chromid").empty();
				chrom_lst=[];

			    $.get(data.speciesJson,function(result){
					result = eval(result);

					for(i=0;i<result.length;i++){
						var chromdata = result[i];
						//alert(chromdata.name);
						var option = "<option value='"+chromdata.name+"'>chr"+chromdata.name+"</option>";
						if(i==0){
							selectvar = chromdata.name;
						}
						$("#chromid").append(option);
						//{'chr':'hs1','start':1,'end':249250621}
						var temp_start = parseInt(chromdata.start) +1;
						var temp_end = parseInt(chromdata.end)+1;
						var chrom_arr={"chr":chromdata.name,"start":temp_start,"end":temp_end};
						chrom_lst.push(chrom_arr);						
					}
					
					$("#chromid").find("option[text='"+selectvar+"']").attr("selected",true);
					//init data track
					$("#trackidlist").empty();
					$("#idPhyModel").empty();
					
					
					
					if(data.physicalModelList != null ){
						
						for(var index=0;index<data.physicalModelList.length;index++){
							var physicalbean = data.physicalModelList[index];
							if(physicalbean.species == curorganism ){
								var option = "<option value=\""+physicalbean.modelName+"\">"+physicalbean.modelName+"("+physicalbean.species+")</option>";
								$("#idPhyModel").append(option);
							}			
						}					
					}
					
					if(data.categoryList !=undefined && data.categoryList != null){
						phymodelMap={};
						$.each(data.categoryList,createCategory);			
					}
					
					
					
					ChooseChrom(1);
					
					choose3DmodelFunc(1);
					
					choose3DmodelByBinsizeFunc();

				});
				}
			},
			error : function(){
				alert("load tracks data error!");
			}
		});
	}	
	
	//this used to change chrom information 
//flag == 1 , from initialize or else need to change chrom directly
function ChooseChrom(flag){

			//get current selected chrom length
			if( $("#chromid") != null){
			//var cur_chr = document.getElementById("chromid").value;
			var cur_chr = $("#chromid").val();
			if( cur_chr === null){
				var seloptions= document.getElementById('chromid').options;
				if(seloptions!=null && seloptions.length>0){
					cur_chr = seloptions[0].value;
				}
			}
			for(i=0;i<chrom_lst.length;i++){
				var chrom_data = chrom_lst[i];
				var s_chr = chrom_data.chr+"";
				if(s_chr == cur_chr){
					 chrom = cur_chr;
					 pos_start = parseInt(chrom_data.start);
					 pos_end = parseInt(chrom_data.end);
					var tquerypos = s_chr+":"+pos_start+".."+pos_end;
					$("#curpos").val(tquerypos);
					break;	
				}
			}			
		}
		
}


//this is used to choose a 3d model
function choose3DmodelFunc(flag){
	var modelval = $("#idPhyModel").val();
	
	
	//console.log("modelval==="+modelval);
	if(modelval.indexOf("3dmodel") <= -1){
			//use this model name to get binsize
			
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
				console.log(phymodelMap);
				//load 3d model
				if(phymodelMap[mname] != null){
					var flength =phymodelMap[mname].length;
					
					
					var table = $("#idPhyModelFeature");
					table.empty();
					var f_mname = "";
					//generate hic features
					if(mname.indexOf("BACH") > -1 || mname.indexOf("MOGEN") > -1){
								var idex = mname.indexOf("_");
								mname = mname.substring(idex+1,mname.length);		
								f_mname = modelval.substring(idex+1,modelval.length);								
					}
					
					var t_pmap = null;
					if( phymodelMap[mname] != null ){
						t_pmap = phymodelMap[mname] ;
							
					}else if(phymodelMap[f_mname] != null ){
						t_pmap = phymodelMap[f_mname] ;						
					}
					
					if(t_pmap != null){
						flength = t_pmap.length;
						tr=$("<tr></tr>");
						tr.appendTo(table);
						console.log("debug idPhyModelFeature "+flength);
							for(var i=0 ;i < flength;i++){
							
								var track = t_pmap[i];
								
								if(track.glyph == "peak" || track.glyph == "tad" || track.glyph=="gene" || track.glyph=="circle"){
									
									var tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\">"+track.label+"</td>";
									td=$(tdval);
									td.appendTo(tr);//width=\"33%\"
									
								}						
						}	
							
					}
						    
				}
				
				
			}
	});
		
	}else{
		if($("#hmLCR1").length > 0 ){
			$("#hmLCR1").remove();
		}
		
		var tbinval=$("#idBinsize").val();
				var mname = "My Track";
				var tmp="3dmodel";
				var tmp1 = "custom_3dmodel";
					if(modelval == tmp ){
						mname = "My Track";
						
					}else if(modelval.indexOf(tmp1) > -1){
						mname = "Custom Track";
					}
				
				//generate hic features
				if(phymodelMap[mname] != null){
					var flength =phymodelMap[mname].length;
					if(flength > 0 ){
						if(flag == 1){
							$("#idBinsize").empty();
						}
						var tmpmodel = null;
						for(var it=0;it<flength;it++){
							var track = phymodelMap[mname][it];
							
							if(track.glyph == "3dmodel"){
								
								if(flag == 1){
									if(it ==0){
										tmpmodel = track;
									}
									
									var option = "<option value=\""+track.binsize+"\">"+track.binsize+"</option>";
									$("#idBinsize").append(option);
								}else{
									if(track.binsize == tbinval){
										tmpmodel = track;
									}
									
								}
								
									
								
							}
							
						}
						
						
						
						
					}
					
					var table = $("#idPhyModelFeature");
					table.empty();
					
					var fname="";
					if(mname.indexOf("BACH") > -1 || mname.indexOf("MOGEN") > -1){
								var idex = mname.indexOf("_");
								mname = mname.substring(idex+1,mname.length);
							f_mname = modelval.substring(idex+1,modelval.length);
						}
					
					var t_pmap = null;
					if( phymodelMap[mname] != null ){
						t_pmap = phymodelMap[mname] ;
							
					}else if(phymodelMap[fname] != null ){
						t_pmap = phymodelMap[fname] ;						
					}
					
					if(t_pmap != null){
						flength = t_pmap.length;
						tr=$("<tr></tr>");
						tr.appendTo(table);
							for(var i=0 ;i < flength;i++){
							
								var track = t_pmap[i];
								if(track.glyph == "peak" || track.glyph == "tad" || track.glyph=="gene" || track.glyph=="circle"){
									
									var tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" >"+track.key+"</td>";
									td=$(tdval);
									td.appendTo(tr);//width=\"33%\"
								
								}						
						}	
							
					}
									
				}
		
	}
	
	if(modelval == "3dmodel"){
							$("#chromid").find("option[value='11']").attr("selected",true);
							$("#curpos").val("11:4500000..6500000");
						
					}
		
}


	//need to transfer a track height 
	function createCategory(index,value){
		var div = $("<div>",{
		css:{
			'background' : '#ffffff',
			'border' : '1px solid #eeeeee',
			'margin-top' :'5px',
			'margin-bottom' :'5px'
		}});
		//div.css("class","header_content");
		var catid = value.name;
		
		catid = catid.replace(/\s+/g,"_");
		catid = catid.replace("/","_");
		catid = catid.replace(/\(/g,"_");
		catid = catid.replace(/\)/,"_");
		
		var modeltext= $('#idPhyModel option:selected').text();
		var idx1 = modeltext.indexOf("(") ;
		var idx2 = modeltext.indexOf(")") ;
		var tmp_organism= "" ;
		
		var iden_demo_3dmodel=0;
		
		if( idx1 > -1 && idx2 > -1 ){
			tmp_organism = modeltext.substring(idx1+1,idx2).trim();  
		}
		
		var p = $("<p class=\"tracktitle\" style='padding-left:10px;background:#eeeeee'><img id='fold_"+catid+"' src='/deltaar/images/plus.jpg' onclick='showTrackPanel(\""+catid+"\")'/>"+value.name+"</p>");
		//alert(" value.organism="+ value.organism) ;
		if(tmp_organism != "" ){
		
			if(tmp_organism == value.organism){
			
				p.appendTo(div);
			}
		}else{
			p.appendTo(div);
		}
		
		
		//table
		var table=$("<table>").attr("cellspacing","0").css("display","none").attr("id","panel_"+catid);//width=\"100%\"
		var tr;
		var td;
		var cindex = index *10 ;
		for(i=0;i<value.trackList.length;i++){
			var track = value.trackList[i];			
			   tr=$("<tr></tr>");
			   tr.appendTo(table);
			   var tdval="";
			   if(track.category == "Custom Track"){
				   if(track.glyph == "3dmodel"){
					   var option="<option value=\""+track.key+"\">"+track.key+"("+track.organism+")</option>";
						$("#idPhyModel").append(option);
						
						option = "<option value=\""+track.binsize+"\">"+track.binsize+"</option>";
						$("#idBinsize").append(option);
							//here, we need to store the interaction and TAD track of this 3dmodel
						if(phymodelMap[track.category] == null){
						   phymodelMap[track.category]= new Array();
						   phymodelMap[track.category].push(track); // 3dmodel
						}
				   }else{
					  tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',"+cindex+",1)\">"+track.key; 
				   }
				   
			   }else if (track.category == "Custom Annotated Track"){
				    tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',"+cindex+",1)\">"+track.key; 	
				//	console.log("===============Custom Annotated Track");
			   }else if(track.category == "My Track"||track.category == "maternal_50000"||track.category == "paternal_50000"){
				   if(track.glyph == "3dmodel"){
					   /*if(iden_demo_3dmodel ==0 ){
							var option="<option value=\"3dmodel\">3dmodel("+track.organism+")</option>";
							$("#idPhyModel").append(option);
							
							option = "<option value=\""+track.binsize+"\">"+track.binsize+"</option>";
							$("#idBinsize").append(option);
							iden_demo_3dmodel = 1;
						
						}*/
					   
							//here, we need to store the interaction and TAD track of this 3dmodel
						if(phymodelMap[track.category] == null){
						   phymodelMap[track.category]= new Array();
						   phymodelMap[track.category].push(track); // 3dmodel
						}else{
							   phymodelMap[track.category].push(track); // 3dmodel
						}
				   }else{
						if(phymodelMap[track.category] != null){
							phymodelMap[track.category].push(track);
					   }else{
						   phymodelMap[track.category]= new Array();
							phymodelMap[track.category].push(track);
					   }
				   }
				   
			   }else{
				  if(track.key=="ensembl_gene"){
				   cindex++;
				   //add a input textbox
				   tdval="<td><input type='text' id='idtext_ensembl_gene' /><input type='button' value='GO' onclick='showSearchGene(\"idtext_ensembl_gene\",0)' /> <input type='checkbox' id='idfocusgene' onclick='focusGivenGene()'  />Pin<br/>";
				   tdval += "<input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',"+cindex+",1)\">show genes all";
				   tdval+=" <input type='checkbox' id='tlst_"+track.key+"_showname' value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleGenename()\" />show name";
			   } else if(track.glyph == "3dmodel"){			   
				  
				 //  var option="<option value=\""+track.category+","+track.key+","+track.color+"\">"+track.key+"</option>";
				//	$("#idPhyModel").append(option);	
					
					/*if(track.category == "My Track"){
						var option="<option value=\""+track.key+"\">"+track.key+"("+track.organism+")</option>";
						$("#idPhyModel").append(option);
						
						option = "<option value=\""+track.binsize+"\">"+track.binsize+"</option>";
						$("#idBinsize").append(option);
						
					}*/
					//here, we need to store the interaction and TAD track of this 3dmodel
					if(phymodelMap[track.category] == null){
					   phymodelMap[track.category]= new Array();
					   phymodelMap[track.category].push(track); // 3dmodel
					}

					
			   }else if((track.glyph == "peak" || track.glyph == "tad") && track.file != "tb_k562_ChiaPetCTCF" && track.file != "tb_k562_ChiaPetPol2" && track.file != "tb_helas3_ChiaPetPol2" ) {
				   if(phymodelMap[track.category] != null){
					    phymodelMap[track.category].push(track);
				   }else{
					   phymodelMap[track.category]= new Array();
					    phymodelMap[track.category].push(track);
				   }
			   }
			   
			   else {
					//get the accordingly organism tracks
				
					if(tmp_organism != "" ){
						if(track.organism == tmp_organism){
							tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',"+cindex+",1)\">"+track.key+" <img src='/deltaar/images/help.gif' onclick=\"window.location='/deltaar/pages/dataset/dataset.jsp#"+track.key;
							var tmpkey = track.key;
							if(tmpkey.indexOf("ChIA-PET") <0){
								tdval += "_signal ";
							}
							  tdval += "'\" />";
							
							
						}
						
					}else{
						tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',"+cindex+",1)\">"+track.key+" <img src='/deltaar/images/help.gif' onclick=\"window.location='/deltaar/pages/dataset/dataset.jsp#"+track.key+"_signal'\" />";
						
					}
					
					
				   				   
			   }
				   
			   }

			   
			   td=$(tdval+"</td>");
			   td.appendTo(tr);//width=\"33%\"
			   
			 cindex++;
		}
		
		if(tmp_organism != "" ){
			if(value.organism == tmp_organism){
				table.appendTo(div);
				if(value.name=="Custom Annotated Track"){
					//console.log("=="+phymodelMap[value.name]);
				}
				
				if(typeof(phymodelMap[value.name]) != "undefined" && phymodelMap[value.name] != null){
					
				}else{
					$("#trackidlist").append(div);
				}
			}
		}else{
			table.appendTo(div);
			//console.log( phymodelMap[value.name].length+",,"+value.trackList.length);
			if(typeof(phymodelMap[value.name]) != "undefined" && phymodelMap[value.name] != null){
				
			}else{
				$("#trackidlist").append(div);
			}
		}
		
		
		
	}

//this is used to choose 3model when there is a given model name and given bin size
function choose3DmodelByBinsizeFunc(){
	var modelval = $("#idPhyModel").val();
	var tbinval = $("#idBinsize").val();
	var mname = modelval+"_"+tbinval;
	if(modelval.indexOf("3dmodel") > -1 ){
		mname="My Track";
	}
	//removeTADColorMap();
	$("#featuremapid").empty();
	if(phymodelMap[mname] != null){
					
					var f_mname="";
					if(mname.indexOf("BACH") > -1 || mname.indexOf("MOGEN") > -1){
								var idex = mname.indexOf("_");
								mname = mname.substring(idex+1,mname.length);
								f_mname = modelval.substring(idex+1,modelval.length);
						}
					
					var table = $("#idPhyModelFeature");
					table.empty();
					
					
					var t_pmap = null;
					if( phymodelMap[mname] != null ){
						t_pmap = phymodelMap[mname] ;
							
					}else if(phymodelMap[f_mname] != null ){
						t_pmap = phymodelMap[f_mname] ;						
					}
					
					if(t_pmap != null){
						flength = t_pmap.length;
						tr=$("<tr></tr>");
						tr.appendTo(table);
							for(var i=0 ;i < flength;i++){
							
								var track = t_pmap[i];
								if(track.glyph == "peak" || track.glyph == "tad" || track.glyph=="gene" || track.glyph=="circle"){
									//alert(track.label);
									var tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" >"+track.label+"</td>";
									td=$(tdval);
									td.appendTo(tr);//width=\"33%\"
									
								}						
						}	
							
					}
					
					
					
	}

}

//this is used to get organism from 3dmodel
function getOrganismFromModel(){
	
	var tmp_organism=$("#organismid").val();
	return tmp_organism;
	
}
	

//add selected track to hisheatmapid
function ShowTrackColorMap(trackkey){
	var hhobj = $("#hm"+trackkey);
	var td = null ;
	if(hhobj.length>0){
		hhobj.remove();	
		
	}
	if(trackkey.indexOf("TAD")> -1 ||trackkey.indexOf("Interaction")>-1 ){
		
	}else{
		td = $("#featuremapid");
	
		var spantext="<div style='padding-left:5px;padding-top:5px;padding-bottom:5px;' id='hm"+trackkey+"'>"+trackkey+"</div>";
			
		if(td != null ){
			td.append(spantext);
		}	
	}
}

//remove select track from hisheatmapid
function removeTrackColorMap(trackkey){
	$("#hm"+trackkey).remove();
}



//add selected track to hisheatmapid
function ShowCNCBTrackColorMap(trackkey){
	var hhobj = $("#hm"+trackkey);
	var td = null ;
	if(hhobj.length>0){
		hhobj.remove();	
		
	}
	if(trackkey.indexOf("TAD")> -1 ||trackkey.indexOf("Interaction")>-1 ){
		
	}else{
		td = $("#CNCBfeaturemapid");
	
		var spantext="<div style='padding-left:5px;padding-top:5px;padding-bottom:5px;' id='hm"+trackkey+"'>"+trackkey+"</div>";
			
		if(td != null ){
			td.append(spantext);
		}	
	}
}

//remove select track from hisheatmapid
function removeCNCBTrackColorMap(trackkey){
	$("#hm"+trackkey).remove();
}



function callDeltaAR(jobid,mo,bin,sep,pos,track,hololensid){
		
			
			bin = parseInt(bin);
	
			
			//Cookies.set("deltar.ar.model", mo, { path: 'deltar_physical'  }) ;	
		//	Cookies.set("deltar.ar.bin", bin, { path: 'deltar_physical'  }) ;
		//	Cookies.set("deltar.ar.organism", sep, { path: 'deltar_physical'  }) ;
			
			
			var index1 = pos.indexOf(":");
			var index2 = pos.indexOf(".");
			var chrtmp = pos.substring(0,index1);
			
			var pos_starttmp = pos.substring(index1+1,index2);
			var pos_endtmp = pos.substring(index2+2,pos.length);
			
			pos_starttmp = parseInt(pos_starttmp);
			
			pos_endtmp = parseInt(pos_endtmp);
			
			//identifiy the atom of 3dmodel can not super than 100
			var posrange = pos_endtmp -  pos_starttmp ;
			if(posrange > 0 ){
						
					
				//	alert(posrange);
					var t_html="";
					
					
					var threfurl="/deltaar/ar/changex.action";
					
					//through ajax send request
					var params={"jobid":jobid,"modelname":mo,"binsize":bin,"species":sep,"track":track,"chrom":chrtmp,"start":pos_starttmp,"end":pos_endtmp,"hololensid":hololensid};
					$.ajax({
						url : threfurl, // change to find gff3
						type : 'post',
						data : params,
						async: false,
						success : function(data){
						//	alert("Success");
							console.log("AR success");
						},
						error : function (){
							console.log("AR error");
							//alert("Error");
						}
					});
					return 0;
					
				
				
				
			}
			
}