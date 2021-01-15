
//when users checked show genome view, this will be called
function showGenomeView(){
			var checked = $("#gviewid");
			if(checked.prop("checked")){
				//identify load genome view or topological view
				if($("#iddmodegenome").is(":checked")){ //genome view
								//alert("genome view");
								mylayout.show('east');
								//mylayout.sizePane("west", "20%");
								mylayout.sizePane("east", "45%");
								mylayout.sizePane("center", "45%");
							
								$("#genomeviewid").css("display","block");
								
								
								var p_pos = $("#curpos").val(); 
								if(p_pos.indexOf("X")>-1){
									p_pos= "chr"+p_pos;
								}
								var conf = getQueryString("conf");
								
								var pdataset=$("#idPhyModel").val();
								var presolution=$("#idBinsize").val();
								var ploc = "";
								if(p_pos.length > 0 ){
									var idex = p_pos.indexOf("..");
									if(idex > -1){
										ploc = p_pos.substring(0,idex);
									}
								}
								
								
								$("#4cpos").val(ploc);
								$("#4cstartbin").val(start_bin);
								
								if(pdataset.indexOf("BACH")> -1 || pdataset.indexOf("MOGEN") > -1 ){
									var idex = pdataset.indexOf("GSE");
									if(idex > -1){
										pdataset = pdataset.substring(idex,pdataset.length);
									}
									
								}else{
									pdataset = getQueryString("conf");
								}
								
								$("#4cdataset").val(pdataset);
								$("#4cbin").val(presolution);


								
								var jumptrack="";
								
								
								$("#trackid input[type='checkbox']").each(function(){				
											if ($(this).is(":checked")) {
												var checkval = $(this).val();
												if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
													
													var arrys = checkval.split(",");					
													if(arrys[1].indexOf('3dmodel') < 0) {
														if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
														|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
														||arrys[1].indexOf("HeLa-S3")>-1 ){
															jumptrack += arrys[1]+"_signal," ;	
														}else{
															jumptrack += arrys[1]+"," ;	
														}
																			
													}
												}
												
											}
								});
								if(jumptrack.length > 0){
									jumptrack = jumptrack.substring(0,jumptrack.length-1);	
								}
							
							
								if(conf != null){
									var torg = getOrganismFromModel();
									var defaulm = "3dmodel("+torg+")";
									var modeltext= $('#idPhyModel option:selected').text();
									if(modeltext == defaulm ){
										
									}else{
										conf = torg;
									}
									
								   var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&nav=1&overview=0&menu=0&loc="+p_pos+"&notGotoPhysical=1&showembedTopo=1";
									
									ghrefurl+="&tracks="+jumptrack;
									
								
								
									$("#gviewframeid").attr("src",ghrefurl);
								}else{
									var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=hg19&nav=1&overview=0&menu=0&loc="+p_pos+"&notGotoPhysical=1&showembedTopo=1";
									
									ghrefurl+="&tracks="+jumptrack;
									
					
									$("#gviewframeid").attr("src",ghrefurl);
								}
							
								//set cookie
								addTrackToCookie("genomeview");
								
				}else if($("#iddmodetopo").is(":checked")){ //topological view
							//alert("topological view");
							
							mylayout.show('east');
							//mylayout.sizePane("west", "20%");
							mylayout.sizePane("east", "45%");
							mylayout.sizePane("center", "45%");
							
							$("#genomeviewid").css("display","block");
				
							var p_pos = $("#curpos").val(); 				
							var conf = getQueryString("conf");
								
							var pdataset=$("#idPhyModel").val();
							var presolution=$("#idBinsize").val();
							var ploc = "";
							if(p_pos.length > 0 ){
									var idex = p_pos.indexOf("..");
									if(idex > -1){
										ploc = p_pos.substring(0,idex);
									}
							}
								
								
							$("#4cpos").val(ploc);
							$("#4cstartbin").val(start_bin);
								
							if(pdataset.indexOf("BACH")> -1 || pdataset.indexOf("MOGEN") > -1 ){
									var idex = pdataset.indexOf("GSE");
									if(idex > -1){
										pdataset = pdataset.substring(idex,pdataset.length);
									}
									
							}else{
									pdataset = getQueryString("conf");
							}
								
							$("#4cdataset").val(pdataset);
							$("#4cbin").val(presolution);


								
							var jumptrack="";
								
								
							$("#trackid input[type='checkbox']").each(function(){				
											if ($(this).is(":checked")) {
												var checkval = $(this).val();
												if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
													
													var arrys = checkval.split(",");					
													if(arrys[1].indexOf('3dmodel') < 0) {
														if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
														|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
														||arrys[1].indexOf("HeLa-S3")>-1 ){
															jumptrack += arrys[1]+"," ;	
														}else{
															jumptrack += arrys[1]+"," ;	
														}
																			
													}
												}
												
											}
								});
							if(jumptrack.length > 0){
								jumptrack = jumptrack.substring(0,jumptrack.length-1);	
							}
							
							
							  if(conf != null){
									var torg = getOrganismFromModel();
									var defaulm = "3dmodel("+torg+")";
									var modeltext= $('#idPhyModel option:selected').text();
									if(modeltext == defaulm ){
										
									}else{
										conf = torg;
									}
									
									var threfurl="";
									threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf="+conf+"&loc="+p_pos+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";			
									threfurl+="&tracks="+jumptrack;	

								  
								
									$("#gviewframeid").attr("src",threfurl);
							}else{
									
								var threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf=hg19&loc="+p_pos+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";
								threfurl+="&tracks="+jumptrack;	

								$("#gviewframeid").attr("src",ghrefurl);
							}
							
								//set cookie
							addTrackToCookie("genomeview");
							clearCookies("topo");
				}
			}else{
				mylayout.hide('east');
				
				$("#genomeviewid").css("display","none");
				$("#genepanelid").css("padding-top","800px");
				deleteTrackFromCookie("genomeview");
			}		
}


function showGenomeViewWithPosition(startregion,endregion){
			var checked = $("#gviewid");
		//	alert("showGenomeViewWithPosition");
			if(checked.prop("checked")){
				
				//identify genome view
				if($("#iddmodegenome").is(":checked")){ 
				
				//	alert("showGenomeViewWithPosition checked");
					mylayout.show('east');
					//mylayout.sizePane("west", "20%");
					mylayout.sizePane("east", "45%");
					mylayout.sizePane("center", "45%");
				
					$("#genomeviewid").css("display","block");
					
					var p_chrom = $("#chromid").val();
					if(p_chrom.indexOf("X") > -1 ){
						p_chrom = "chr"+p_chrom;
					}
									
					var conf = getQueryString("conf");							
					var jumptrack="";
					
					$("#trackid input[type='checkbox']").each(function(){				
								if ($(this).is(":checked")) {
									var checkval = $(this).val();
									if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
										
										var arrys = checkval.split(",");					
										if(arrys[1].indexOf('3dmodel') < 0) {
											if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
											|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
											||arrys[1].indexOf("HeLa-S3")>-1 ){
												jumptrack += arrys[1]+"_signal," ;	
											}else{
												jumptrack += arrys[1]+"," ;	
											}
																
										}
									}
									
								}
					});
					if(jumptrack.length > 0){
						jumptrack = jumptrack.substring(0,jumptrack.length-1);	
					}
				
				
					if(conf != null){
						var torg = getOrganismFromModel();
						var defaulm = "3dmodel("+torg+")";
						var modeltext= $('#idPhyModel option:selected').text();
						if(modeltext == defaulm ){
							
						}else{
							conf = torg;
						}
						
					   var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&nav=1&overview=0&menu=0&loc="+p_chrom+"%3A"+startregion+".."+endregion+"&notGotoPhysical=1&showembedTopo=1";
						
						ghrefurl+="&tracks="+jumptrack;
						
					
					
						$("#gviewframeid").attr("src",ghrefurl);
					}else{
						var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=hg19&nav=1&overview=0&menu=0&loc="+p_chrom+"%3A"+startregion+".."+endregion+"&notGotoPhysical=1&showembedTopo=1";
						
						ghrefurl+="&tracks="+jumptrack;
						
		
						$("#gviewframeid").attr("src",ghrefurl);
					}
				
					//set cookie
					addTrackToCookie("genomeview");
				}else if($("#iddmodetopo").is(":checked")){ //topological view
							//alert("topological view");
							
							mylayout.show('east');
							//mylayout.sizePane("west", "20%");
							mylayout.sizePane("east", "45%");
							mylayout.sizePane("center", "45%");
							
							$("#genomeviewid").css("display","block");
				
							//var p_pos = $("#curpos").val(); 				
							var conf = getQueryString("conf");
								
							
							
							var p_chrom = $("#chromid").val();
							
							var p_pos=p_chrom+":"+startregion+".."+endregion;
								
								
							var jumptrack="";
								
								
							$("#trackid input[type='checkbox']").each(function(){				
											if ($(this).is(":checked")) {
												var checkval = $(this).val();
												if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
													
													var arrys = checkval.split(",");					
													if(arrys[1].indexOf('3dmodel') < 0) {
														if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
														|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
														||arrys[1].indexOf("HeLa-S3")>-1 ){
															jumptrack += arrys[1]+"," ;	
														}else{
															jumptrack += arrys[1]+"," ;	
														}
																			
													}
												}
												
											}
								});
							if(jumptrack.length > 0){
								jumptrack = jumptrack.substring(0,jumptrack.length-1);	
							}
							
							
							if(conf != null){
									var torg = getOrganismFromModel();
									var defaulm = "3dmodel("+torg+")";
									var modeltext= $('#idPhyModel option:selected').text();
									if(modeltext == defaulm ){
										
									}else{
										conf = torg;
									}
									
									var threfurl="";
									threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf="+conf+"&loc="+p_pos+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";			
									threfurl+="&tracks="+jumptrack;	

									$("#gviewframeid").attr("src",threfurl);
							}else{
									
								var threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf=hg19&loc="+p_pos+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";
								threfurl+="&tracks="+jumptrack;	

								$("#gviewframeid").attr("src",ghrefurl);
							}
							
								//set cookie
							addTrackToCookie("genomeview");
							clearCookies("topo");
				}
				
			
			}else{
				mylayout.hide('east');
				
				$("#genomeviewid").css("display","none");
				$("#genepanelid").css("padding-top","800px");
				deleteTrackFromCookie("genomeview");
			}		
}





//this is used to show circlet view
function showCircletView(){
	      var checked = $("#cviewid");
			if(checked.prop("checked")){
				mylayout.show('east');
				//mylayout.sizePane("west", "20%");
				mylayout.sizePane("east", "45%");
				mylayout.sizePane("center", "45%");
			
				$("#genomeviewid").css("display","block");
				
				var p_pos = $("#curpos").val(); 
								
				var conf = getQueryString("conf");							
				var jumptrack="";
				
				$("#trackid input[type='checkbox']").each(function(){				
							if ($(this).is(":checked")) {
								var checkval = $(this).val();
								if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
									
									var arrys = checkval.split(",");					
									if(arrys[1].indexOf('3dmodel') < 0) {
										if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
										|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
										||arrys[1].indexOf("HeLa-S3")>-1 ){
											jumptrack += arrys[1]+"_signal," ;	
										}else{
											jumptrack += arrys[1]+"," ;	
										}
															
									}
								}
								
							}
				});
				if(jumptrack.length > 0){
					jumptrack = jumptrack.substring(0,jumptrack.length-1);	
				}
			
			
				if(conf != null){
				   var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&nav=1&overview=0&menu=0&loc="+p_pos+"&notGotoPhysical=1&showembedTopo=1";
					
					ghrefurl+="&tracks="+jumptrack;
					
				
				
					$("#gviewframeid").attr("src",ghrefurl);
				}else{
					var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=human&nav=1&overview=0&menu=0&loc="+p_pos+"&notGotoPhysical=1&showembedTopo=1";
					
					ghrefurl+="&tracks="+jumptrack;
					
	
					$("#gviewframeid").attr("src",ghrefurl);
				}
			
				//set cookie
				addTrackToCookie("genomeview");
				
			
			}else{
				mylayout.hide('east');
				
				$("#genomeviewid").css("display","none");
				$("#genepanelid").css("padding-top","800px");
				deleteTrackFromCookie("genomeview");
			}		
	
}


//when check on one track,we need to synchronized to genome view
function synchronizeAllToGenomeView(tchr,tstart,tend){
	var jumptracks="";
	$("#trackid input[type='checkbox']").each(function(){				
				if ($(this).is(":checked")) {
					var checkval = $(this).val();
					var arrys = checkval.split(",");					
					if(arrys[1].indexOf('3dmodel') < 0) {	//	arrys[1] != '3dmodel'			
						if(arrys[1] != 'ensembl_gene'){
							jumptracks += arrys[1]+"_signal," ;	
						}else{
							jumptracks += arrys[1]+"," ;	
						}						
					}
				}
	});
	if(jumptracks.length > 0){
		jumptracks = jumptracks.substring(0,jumptracks.length-1);
	}
	
	return getJumpLinkWithTrack(tchr,tstart,tend,jumptracks);
	
}



//when check on one track,we need to synchronized to genome view
function synchronizeAllToGenomeViewTracksName(){
	var jumptracks="";
	$("#trackid input[type='checkbox']").each(function(){				
				if ($(this).is(":checked")) {
					var checkval = $(this).val();
					if(checkval != "on" ){
						if(checkval.indexOf(",") > -1 ){
							var arrys = checkval.split(",");					
							if(arrys[1].indexOf('3dmodel') < 0 ) { //arrys[1] != '3dmodel'			
								if(arrys[1] != 'ensembl_gene'){
									jumptracks += arrys[1]+"_signal," ;	
								}else{
									jumptracks += arrys[1]+"," ;	
								}						
							}
							
						}
						
					}
					
				}
	});
	if(jumptracks.length > 0){
		jumptracks = jumptracks.substring(0,jumptracks.length-1);
	}
	return jumptracks;
	
	
}



// jump link to genome view with track
function getJumpLinkWithTrack(chr,start,end,jumptrack){
	var conf = getQueryString("conf");
	var ghrefurl;
	if(conf == null){
			ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=human&loc="+chr+"%3A"+start+".."+end;			
			ghrefurl+="&tracks="+jumptrack;
						
	}else{
			ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&loc="+chr+"%3A"+start+".."+end;			
			ghrefurl+="&tracks="+jumptrack;
						
	}
	return ghrefurl;
}

//jump link without track name, this will be used when uncheck one track
function getJumpLinkWithoutTrack(chr,start,end,curtrack){
	
	//remove given track from current
				
		var jumptrack="";
		$("#trackid input[type='checkbox']").each(function(){				
					if ($(this).is(":checked")) {
						var checkval = $(this).val();
						var arrys = checkval.split(",");					
						if(arrys[1].indexOf('3dmodel') < 0) {	//arrys[1] != '3dmodel'
							if(arrys[1] != 'ensembl_gene'){
								if(arrys[1] !=curtrack ){
									jumptrack += arrys[1]+"_signal," ;	
								}								
							}else{
								jumptrack += arrys[1]+"," ;	
							}						
						}
					}
		});
		if(jumptrack.length>0){
			jumptrack = jumptrack.substring(0,jumptrack.length-1);
		}
		
		
		
		var conf = getQueryString("conf");	
		if(conf == null){
			ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=human&loc="+chr+"%3A"+start+".."+end;
			
			ghrefurl+="&tracks="+jumptrack;
						
		}else{
			ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&loc="+chr+"%3A"+start+".."+end;
			
			ghrefurl+="&tracks="+jumptrack;
						
		}
	console.log(ghrefurl);
	
	return ghrefurl;
}

//jump link to genome view and circlet view
function getJumpLink(chr,start,end){
		var conf = getQueryString("conf");
		//we need to get the selected tracks from physical view itself
		
		var jumptrack="";
		$("#trackid input[type='checkbox']").each(function(){				
					if ($(this).is(":checked")) {
						var checkval = $(this).val();
						var arrys = checkval.split(",");					
						if(arrys[1].indexOf('3dmodel') < 0) { //arrys[1] != '3dmodel'

							if(arrys[1] != 'ensembl_gene'){
								jumptrack += arrys[1]+"_signal," ;	
							}else{
								jumptrack += arrys[1]+"," ;	
							}												
						}
					}
		});
		if(jumptrack.length>0){
			jumptrack = jumptrack.substring(0,jumptrack.length-1);
		}
		
		var ghrefurl,threfurl;
		if(conf == null){
			ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=human&loc="+chr+"%3A"+start+".."+end;			
			ghrefurl+="&tracks="+jumptrack;
			
			threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?loc="+chr+"%3A"+start+".."+end;
			if(jumptrack.length >0){
				threfurl+="&tracks=Interaction,"+jumptrack;
			}
		}else{
			ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&loc="+chr+"%3A"+start+".."+end;			
			ghrefurl+="&tracks="+jumptrack;
			
			
		
			threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf="+conf+"&loc="+chr+"%3A"+start+".."+end;
			if(jumptrack.length >0){
				threfurl+="&tracks=Interaction,"+jumptrack;
			}
						
		}
				
		return [ghrefurl,threfurl];
		
}


//open genome view in a new window
function gotoGenome(){
	var p_pos = getQueryString("loc"); 

	var conf = getQueryString("conf");
	var ghrefurl;
	var hololensid =  getQueryString("hololensid");
	if(hololensid == null || hololensid==""){	
		hololensid = Cookies.get("delta.ar.hololensid");
	}
	
	var mo=getQueryString("model");
	var bin = getQueryString("bin");
	var sep=organism;
	
	//get tracks from hololensid
	var tracks ="";
	var trackarray=[];
	var url ="/deltaar/exchange/"+hololensid+".json?time="+new Date().getTime();
	$.get(url,function(result){
		result = eval(result);
		tracks = result.track;
		if(tracks != null && tracks.length > 0 ){
			if(tracks.indexOf(",") > -1 ){
									var trass = tracks.split(",");
									for(var ti=0;ti<trass.length;ti++){
										var t_tr = trass[ti];
										trackarray.push(t_tr);
									}
									
			}else{
				trackarray.push(tracks);				
			}

		}
	});
	
	
	
	var jumptrack="";
	var jumparray=[];
	$("#trackid input[type='checkbox']").each(function(){				
					if ($(this).is(":checked")) {
						var checkval = $(this).val();
						//console.log("===goto genome="+checkval);
						var arrys = checkval.split(",");					
						if(arrys[1].indexOf('3dmodel') < 0) { //arrys[1] != '3dmodel'
								if(arrys[1].indexOf("GSE63525")>-1 || arrys[1].indexOf("GSE35156")>-1 || arrys[1].indexOf("GSE63525")>-1){
									jumptrack += arrys[1]+"," ;	
									jumparray.push(arrys[1]);
								}
								else if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
										|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
										||arrys[1].indexOf("HeLa-S3")>-1 ){
											jumptrack += arrys[1]+"_signal," ;	
											jumparray.push(arrys[1]+"_signal,");
								}else{
											jumptrack += arrys[1]+"," ;	
											jumparray.push(arrys[1]);
								}								
						}
						
						
						
					}
		});
		
		
		//identify whether hololens track existed in current physical view tracks
		if(trackarray != null && trackarray.length > 0 ){
			for(var i=0;i<trackarray.length;i++){
				var artrack = trackarray[i];
				var aflag = 0 ;
				if(jumparray != null && jumparray.length>0){
					for(var j=0;j<jumparray.length;j++){
						var jumpt = jumparray[j];
						if(artrack ==jumpt ){
							aflag =1;
						}
					}
				}
				
				if(aflag ==0 ){
					jumptrack += artrack+",";
				}
				
			}
			
		}
		
		
		
		if(jumptrack.length>0){
			jumptrack = jumptrack.substring(0,jumptrack.length-1);
		}
		
		
		
	
	
	if(conf != null){
	   ghrefurl="http://"+window.location.host+"/jbrowse/delta_index.html?data="+conf+"&nav=1&overview=0&menu=1&loc="+p_pos+"&tracks="+jumptrack+"&hololensid="+hololensid+"&model="+mo+"&binsize="+bin+"&organism="+sep;					
	}else{
	   ghrefurl="http://"+window.location.host+"/jbrowse/delta_index.html?data=human&nav=1&overview=0&menu=1&loc="+p_pos+"&tracks="+jumptrack+"&hololensid="+hololensid+"&model="+mo+"&binsize="+bin+"&organism="+sep;		
	}
	var a = document.getElementById("goto");
	if(a == null){
		$('body').append('<a href="" id="goto" target="_blank"></a>');
	}

	$('#goto').attr('href', ghrefurl);
	$('#goto').get(0).click();

}


//open topological view in a new window
function gotoTopoView(){
	clearCookies("topo");
	//active hololens
	
	var p_pos = getQueryString("loc"); 
	var conf = getQueryString("conf");
	var hololensid =  getQueryString("hololensid");
	if(hololensid == null || hololensid==""){
		
		hololensid = Cookies.get("delta.ar.hololensid");
	}
	
	var mo=getQueryString("model");
	var bin = getQueryString("bin");
	var sep=organism;
	
	
	//get tracks from hololensid
	var tracks ="";
	var trackarray=[];
	var url ="/deltaar/exchange/"+hololensid+".json?time="+new Date().getTime();
	$.get(url,function(result){
		result = eval(result);
		tracks = result.track;
		if(tracks != null && tracks.length > 0 ){
			if(tracks.indexOf(",") > -1 ){
									var trass = tracks.split(",");
									for(var ti=0;ti<trass.length;ti++){
										var t_tr = trass[ti];
										trackarray.push(t_tr);
									}
									
			}else{
				trackarray.push(tracks);				
			}

		}
	});
	
	var jumptrack="";
	var jumparray=[];
	$("#trackid input[type='checkbox']").each(function(){				
		if ($(this).is(":checked")) {
						var checkval = $(this).val();
						var arrys = checkval.split(",");					
						if(arrys[1] != '3dmodel') {
							jumptrack += arrys[1]+"," ;	
							jumparray.push(arrys[1]);							
						}
		}
	});
	

	//identify whether hololens track existed in current physical view tracks
	if(trackarray != null && trackarray.length > 0 ){
		for(var i=0;i<trackarray.length;i++){
			var artrack = trackarray[i];
			var aflag = 0 ;
			if(jumparray != null && jumparray.length>0){
					for(var j=0;j<jumparray.length;j++){
						var jumpt = jumparray[j];
						if(artrack ==jumpt ){
							aflag =1;
						}
					}
			}
				
			if(aflag ==0 ){
				jumptrack += artrack+",";
			}
				
		}
			
	}
		

	
	if(jumptrack.length>0){
		jumptrack = jumptrack.substring(0,jumptrack.length-1);
	}
	
		
	var threfurl;
	if(conf == null){			
		threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?loc="+p_pos+"&hololensid="+hololensid;			
		threfurl+="&tracks="+jumptrack+"&model="+mo+"&binsize="+bin+"&organism="+sep;			
	}else{		
		threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf="+conf+"&loc="+p_pos+"&hololensid="+hololensid;
		threfurl+="&tracks="+jumptrack+"&model="+mo+"&binsize="+bin+"&organism="+sep;			
	}
	var a = document.getElementById("goto");
	if(a == null){
		$('body').append('<a href="" id="goto" target="_blank"></a>');
	}
	
	$('#goto').attr('href', threfurl);
	$('#goto').get(0).click();
	
}

//save the whole canvas image as pdf
function savePageAs(){
	if(glviewer != null ){
		var exportcanvas = glviewer.get3dmodelCanvas();
		
		var imgWidth = 210; 
		var pageHeight = 295;  
		var imgHeight = exportcanvas.height * imgWidth / exportcanvas.width;
		var heightLeft = imgHeight;

		
		var pdf = new jsPDF('p', 'mm');
		var imgData = exportcanvas.toDataURL('image/png');

		// due to lack of documentation; try setting w/h based on unit
		pdf.addImage(imgData,'PNG',0,0,imgWidth,imgHeight); 
		
		/*
		heightLeft -= pageHeight;

		  while (heightLeft >= 0) {
			position = heightLeft - imgHeight;
			doc.addPage();
			doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;
		  }
		*/
		
		pdf.save('image.pdf'); //the generated pdf that contains the image gets trimmed
		
		
	}
	
}


function clearCookies(rpath){
	
	Cookies.remove(rpath+'_track', { path: rpath });
	Cookies.remove(rpath+'_dataset', { path: rpath });
	Cookies.remove(rpath+'_position', { path: rpath });
	
}

function refereshEmbedTopology(conf,loc,defaultTracks){
	var threfurl="";
	 if(conf == null){			
		threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?loc="+loc+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";			
		threfurl+="&tracks="+defaultTracks;			
	}else{		
		threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf="+conf+"&loc="+loc+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";
		threfurl+="&tracks="+defaultTracks;			
	}
	$("#gviewframeid").attr("src",threfurl);
}


//refresh iframe from circlet view
function refereshEmbedGenome(conf,loc,defaultTracks){
	if(conf != null){
				   var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&nav=1&overview=0&menu=0&loc="+loc+"&notGotoPhysical=1&showembedTopo=1";
					
					ghrefurl+="&tracks="+defaultTracks;
					
					$("#gviewframeid").attr("src",ghrefurl);
				}else{
					var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=human&nav=1&overview=0&menu=0&loc="+loc+"&notGotoPhysical=1&showembedTopo=1";
					
					ghrefurl+="&tracks="+defaultTracks;
					
	
					$("#gviewframeid").attr("src",ghrefurl);
				}
	
}


//this is used to open virtual 4c plot
function gotoVirtual4C(){
	
	//organism
	var virtualurl="http://"+window.location.host+"/pages/visualization/virtual_4c.jsp";
	var p_pos = $("#curpos").val(); 
	if(p_pos.length >0){
		if(p_pos.indexOf("..")>-1){
			var idex = p_pos.indexOf("..");
			p_pos = p_pos.substring(0,idex);
		}
	}
	
	var organism="";
	var resolution = $("#idBinsize").val();
	var pdataset = $("#idPhyModel").find("option:selected").text();
	if(pdataset.length >0 ){
		var lindex = pdataset.indexOf("(");
		var rindex = pdataset.indexOf(")");
		if(lindex > -1 && rindex > -1 ){
			organism = pdataset.substring(lindex+1,rindex);
		}
		
	}
	
	if(pdataset.indexOf("BACH")> -1 || pdataset.indexOf("MOGEN") > -1 ){
		var idex = pdataset.indexOf("GSE");
		var lindex = pdataset.indexOf("(");
		if(idex > -1){
			pdataset = pdataset.substring(idex,lindex);
			if(pdataset.indexOf("GSE63525") > -1 ){
				pdataset += "_raw";
			}
		}
		
	}else if(pdataset.indexOf("3dmodel")> -1){
		pdataset="GSE63525_K562_combined_raw" ;
	}
	
	var expand = parseInt(resolution)*20;
	
	
	
	virtualurl += "?organism="+organism+"&loc="+p_pos+"&resolution="+resolution+"&dataset="+pdataset+"&expand="+expand;
	
	var a = document.getElementById("goto");
	if(a == null){
		a=document.createElement('a');
		a.id="goto";
		document.body.appendChild(a);
	}
					
	a.href = virtualurl;
	a.target="_blank";
			
	document.getElementById("goto").click();	
}

//show dual genome view with physical view
function showDualGenomeView(){
	
	if($("#iddmodegenome").is(":checked")){ //genome view
								//alert("genome view");
			var checked = $("#gviewid");
			if(checked.prop("checked")){
								mylayout.show('east');
								//mylayout.sizePane("west", "20%");
								mylayout.sizePane("east", "45%");
								mylayout.sizePane("center", "45%");
							
								$("#genomeviewid").css("display","block");
								
								
								var p_pos = $("#curpos").val(); 				
								var conf = getQueryString("conf");
								
								var pdataset=$("#idPhyModel").val();
								var presolution=$("#idBinsize").val();
								var ploc = "";
								if(p_pos.length > 0 ){
									var idex = p_pos.indexOf("..");
									if(idex > -1){
										ploc = p_pos.substring(0,idex);
									}
								}
								
								
								$("#4cpos").val(ploc);
								$("#4cstartbin").val(start_bin);
								
								if(pdataset.indexOf("BACH")> -1 || pdataset.indexOf("MOGEN") > -1 ){
									var idex = pdataset.indexOf("GSE");
									if(idex > -1){
										pdataset = pdataset.substring(idex,pdataset.length);
									}
									
								}else{
									pdataset = getQueryString("conf");
								}
								
								$("#4cdataset").val(pdataset);
								$("#4cbin").val(presolution);


								
								var jumptrack="";
								
								
								$("#trackid input[type='checkbox']").each(function(){				
											if ($(this).is(":checked")) {
												var checkval = $(this).val();
												if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
													
													var arrys = checkval.split(",");					
													if(arrys[1].indexOf('3dmodel') < 0) {
														if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
														|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
														||arrys[1].indexOf("HeLa-S3")>-1 ){
															jumptrack += arrys[1]+"_signal," ;	
														}else{
															jumptrack += arrys[1]+"," ;	
														}
																			
													}
												}
												
											}
								});
								if(jumptrack.length > 0){
									jumptrack = jumptrack.substring(0,jumptrack.length-1);	
								}
							
							
								if(conf != null){
									var torg = getOrganismFromModel();
									var defaulm = "3dmodel("+torg+")";
									var modeltext= $('#idPhyModel option:selected').text();
									if(modeltext == defaulm ){
										
									}else{
										conf = torg;
									}
									
								   var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data="+conf+"&nav=1&overview=0&menu=0&loc="+p_pos+"&notGotoPhysical=1&showembedTopo=1";
									
									ghrefurl+="&tracks="+jumptrack;
									
								
								
									$("#gviewframeid").attr("src",ghrefurl);
								}else{
									var ghrefurl="http://"+window.location.host+"/jbrowse/index.html?showPhysical=1&data=hg19&nav=1&overview=0&menu=0&loc="+p_pos+"&notGotoPhysical=1&showembedTopo=1";
									
									ghrefurl+="&tracks="+jumptrack;
									
					
									$("#gviewframeid").attr("src",ghrefurl);
								}
							
								//set cookie
								addTrackToCookie("genomeview");
			}			
		}
}


//show dual topological view with physical view
function showDualTopoView(){
	if($("#iddmodetopo").is(":checked")){ //topological view
							//alert("topological view");
			var checked = $("#gviewid");
			if(checked.prop("checked")){			
							mylayout.show('east');
							//mylayout.sizePane("west", "20%");
							mylayout.sizePane("east", "45%");
							mylayout.sizePane("center", "45%");
							
							$("#genomeviewid").css("display","block");
				
							var p_pos = $("#curpos").val(); 				
							var conf = getQueryString("conf");
								
							var pdataset=$("#idPhyModel").val();
							var presolution=$("#idBinsize").val();
							var ploc = "";
							if(p_pos.length > 0 ){
									var idex = p_pos.indexOf("..");
									if(idex > -1){
										ploc = p_pos.substring(0,idex);
									}
							}
								
								
							$("#4cpos").val(ploc);
							$("#4cstartbin").val(start_bin);
								
							if(pdataset.indexOf("BACH")> -1 || pdataset.indexOf("MOGEN") > -1 ){
									var idex = pdataset.indexOf("GSE");
									if(idex > -1){
										pdataset = pdataset.substring(idex,pdataset.length);
									}
									
							}else{
									pdataset = getQueryString("conf");
							}
								
							$("#4cdataset").val(pdataset);
							$("#4cbin").val(presolution);


								
							var jumptrack="";
								
								
							$("#trackid input[type='checkbox']").each(function(){				
											if ($(this).is(":checked")) {
												var checkval = $(this).val();
												if(checkval !== undefined && checkval.length>0 && checkval.indexOf(",")> -1){
													
													var arrys = checkval.split(",");					
													if(arrys[1].indexOf('3dmodel') < 0) {
														if( arrys[1].indexOf("IMR90") >-1 || arrys[1].indexOf("K562") >-1 || arrys[1].indexOf("HUVEC")>-1 
														|| arrys[1].indexOf("H1-hESC")>-1 || arrys[1].indexOf("HepG2")>-1 || arrys[1].indexOf("GM12878")>-1
														||arrys[1].indexOf("HeLa-S3")>-1 ){
															jumptrack += arrys[1]+"," ;	
														}else{
															jumptrack += arrys[1]+"," ;	
														}
																			
													}
												}
												
											}
								});
							if(jumptrack.length > 0){
								jumptrack = jumptrack.substring(0,jumptrack.length-1);	
							}
							
							
							  if(conf != null){
									var torg = getOrganismFromModel();
									var defaulm = "3dmodel("+torg+")";
									var modeltext= $('#idPhyModel option:selected').text();
									if(modeltext == defaulm ){
										
									}else{
										conf = torg;
									}
									
									var threfurl="";
									threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf="+conf+"&loc="+p_pos+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";			
									threfurl+="&tracks="+jumptrack;	

								  
								
									$("#gviewframeid").attr("src",threfurl);
							}else{
									
								var threfurl="http://"+window.location.host+"/pages/visualization/topo_viewm.jsp?conf=hg19&loc="+p_pos+"&menu=0&showPhysical=1&notGotoPhysical=1&embedGenome=1";
								threfurl+="&tracks="+jumptrack;	

								$("#gviewframeid").attr("src",ghrefurl);
							}
							//remove topological view cookie
							
							
							//set cookie
							addTrackToCookie("genomeview");
							clearCookies("topo");
							
			}
	}
}



