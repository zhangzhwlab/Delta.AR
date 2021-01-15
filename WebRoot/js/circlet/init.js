var MAX_TRACK_COUNT=5;
var defaultTracks = getQueryString("tracks"); // used to get default tracks

//used to load datasets
function loadInitCircos(){
var conf = getQueryString("conf");
var params={"conf":conf};
$("#twaitimgid").css("display","block");	
$("#container").removeClass();
$("#container").addClass("transparent_class");	
$.ajax({
			url:'/deltaar/ajax/initCircos.action',
			type:'post',
			dataType:'json',
			data:params,
			async: false,
			success:function(data){
				$("#cdset").empty();
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
	$("#cdset").append(option);
	
	 var c_ds = Cookies.get("topo_dataset");
		if(c_ds != null){
					//alert("dataset"+c_ds);
				$("#cdset").val(c_ds);
		}
	
	
	
}


//used to parse given datasets configurations,get the chromosome information,create the track category page
function loadInitTrack(){
	
	var curconf = $("#cdset").val();
	var params={"curDataset":curconf};
	//reset the canvas
	pageReset();


	$.ajax({
		url : '/deltaar/ajax/initTrack.action',
		type : 'post',
		dataType : 'json',
		data : params,
		async: false,
		success : function(data){
			config.toomany_threshold = parseInt(data.threshValue);
		//	console.log(config.toomany_threshold);
			config.ideogramJson = data.ideogramJson;
			
			var selectvar ;
			if(data.speciesJson != undefined && data.speciesJson != null ){
				$("#chromid").empty();
				chrom_lst=[];

			    $.get(data.speciesJson,function(result){
					result = eval(result);

					for(i=0;i<result.length;i++){
						var chromdata = result[i];
						//alert(chromdata.name);
						var option = "<option value='"+chromdata.name+"'>"+chromdata.name+"</option>";
						if(i==0){
							selectvar = chromdata.name;
						}
						$("#chromid").append(option);
						//{'chr':'hs1','start':1,'end':249250621}
						var temp_start = parseInt(chromdata.start) +1;
						var temp_end = parseInt(chromdata.end)+1;
						var chrom_arr={"chr":chromdata.name,"start":temp_start,"end":temp_end,"rgradian":0,"rgoffset":0};
						chrom_lst.push(chrom_arr);

						
					}
					
						$("#chromid").find("option[text='"+selectvar+"']").attr("selected",true);
						 //init data track
						$("#trackid").empty();
						if(data.categoryList !=undefined && data.categoryList != null){
							$.each(data.categoryList,createCategory);			
						}	
						ChooseChrom(1);
				        cookiesOperate();
						//if default selected tracks is not null,then need to toggle on
				});
			}
			$("#twaitimgid").css("display","none");	
			$("#container").removeClass("transparent_class");
		},
		error : function(){
			alert("load tracks data error!");
		}
	});
}


//need to transfer a track height 
function createCategory(index,value){
	var div = $("<div>",{
		css:{
			'background' : '#ffffff',
			'border' : '1px solid #eeeeee',
			'margin-top' :'5px',
			'margin-bottom' :'5px'
		}
	});
	//div.css("class","header_content");
	var catid = value.name;
		
			catid = catid.replace(/\s+/g,"_");
			catid = catid.replace("/","_");
			catid = catid.replace(/\(/g,"_");
			catid = catid.replace(/\)/,"_");
			
		
	var p = $("<p class=\"tracktitle\" style='padding-left:10px;background:#eeeeee'><img id='fold_"+catid+"' src='/deltaar/images/plus.jpg' onclick='showTrackPanel(\""+catid+"\")'/>"+value.name+"</p>");
	p.appendTo(div);
	
	//table
	var table=$("<table>").attr("cellspacing","0").css("display","none").attr("id","panel_"+catid);//width=\"100%\"
	var tr;
	var td;
	var cindex = index *10 ;
	for(i=0;i<value.trackList.length;i++){
		var track = value.trackList[i];
		//var cindex = index *10 + i ;
		//if(i%2 == 0 ){ // track height
		   tr=$("<tr></tr>");
		   tr.appendTo(table);
		   var tdval = "<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+cindex+"\" onclick=\"topotoggleTrack('"+track.category+"','"+track.key+"',"+cindex+")\">"+track.key+" <img src='/deltaar/images/help.gif' onclick=\"window.location='/deltaar/pages/dataset/dataset.jsp#"+track.key;
		   var tmpkey = track.key;
		   if(tmpkey.indexOf("ChIA-PET") <0){
			   tdval += "_signal ";
		   }
		   tdval += "'\" />";
		   
		   if(track.key=="ensembl_gene"){
			   cindex++;
			   tdval+=" <input type='checkbox' id='tlst_"+track.key+"_showname' onclick=\"topotoggleTrack('"+track.category+"','"+track.key+"',"+cindex+")\" />show name";
		   }else if(track.key=="transcript"){
			    cindex++;
			   tdval+=" <input type='checkbox' id='tlst_"+track.key+"_showname' onclick=\"topotoggleTrack('"+track.category+"','"+track.key+"',"+cindex+")\" />show name";
		   }
		   
		   td=$(tdval+"</td>");
		   td.appendTo(tr);//width=\"33%\"
		    cindex++;
	}
	table.appendTo(div);

	$("#trackid").append(div);

}



//this used to change chrom information
//flag 2 identify from the select event
//flag 1 identify initialize
function ChooseChrom(flag){
	
	var idsession = getQueryString("session");
	if(idsession != null ){
			var sessionurl="/deltaar/session/"+idsession+".json";
			
		    $.get(sessionurl,function(result){
					result = eval(result);
					if(result[0] == null ){
						return;
					}
					
					var c_pos="";
					var defaultTracks="";
					//alert(result[0].loc+" "+result[0].tracks+" "+result[0].zoom);
					if(result[0].loc != null ){
						c_pos = result[0].loc;
					}
					if(result[0].tracks != null ){
						defaultTracks = result[0].tracks;
					}
					var index1 = c_pos.indexOf(":");
					var index2 = c_pos.indexOf(".");
					chr = c_pos.substring(0,index1);
					pos_start = c_pos.substring(index1+1,index2);	
					pos_end = c_pos.substring(index2+2,c_pos.length);
					
					
					ideogram_start = pos_start;
					ideogram_end = pos_end ;
					
					var query_pos = chr+":"+ideogram_start+".."+ideogram_end;
					
					$("#curpos").val(query_pos);		
					$("#chromid").val(chr);
					cur_chr = chr;
					
					var queryscope = ideogram_end - ideogram_start;
					var queryfmt = formatNumber(queryscope);
					$("#formatscopeid").html(queryfmt+" bp");		
					computeRegionRadian();	
					ajax_getbandlst(config.ideogramJson,cur_chr);
					
					if(defaultTracks != null){
				if(defaultTracks.indexOf(",") > -1){
					var trackarry = defaultTracks.split(",");
					for(var i=0;i<trackarry.length;i++){
						var dtrack = trackarry[i];
						$("#tlst_"+dtrack).attr("checked",true);
					}
				}else{
					$("#tlst_"+defaultTracks).attr("checked",true);
				}
				
			}
					
					reDrawAllSelectedTrack();
					
					
					
					
					
					
			});
	}
	else{
		 
		//identify use which position to initialize whole scene
		if(flag == 1 && getQueryString("loc") != null){ // first we identify the loc param from url
			var c_pos = getQueryString("loc");
			if(c_pos != null){
					var index1 = c_pos.indexOf(":");
					if(index1 > -1){
						var index2 = c_pos.indexOf(".");
						chr = c_pos.substring(0,index1);
						pos_start = c_pos.substring(index1+1,index2);	
						pos_end = c_pos.substring(index2+2,c_pos.length);

						ideogram_start = pos_start;
						ideogram_end = pos_end ;
						
						var query_pos = chr+":"+ideogram_start+".."+ideogram_end;
						$("#curpos").val(query_pos);		
	
						$("#chromid").val(chr);
						cur_chr = chr;
						
					}else{
						cur_chr = c_pos;
						for(i=0;i<chrom_lst.length;i++){
							var chrom_data = chrom_lst[i];
							var s_chr = chrom_data.chr+"";
							if(s_chr == cur_chr){
								chr = cur_chr;
								ideogram_start = parseInt(chrom_data.start);
								ideogram_end = parseInt(chrom_data.end);
								var tquerypos = s_chr+":"+ideogram_start+".."+ideogram_end;
								$("#curpos").val(tquerypos);
								$("#chromid").val(chr);
								break;	
							}
						}
					}
					
				}
		}
		
		
		else {
			
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
					 chr = cur_chr;
					 ideogram_start = parseInt(chrom_data.start);
					 ideogram_end = parseInt(chrom_data.end);
					var tquerypos = s_chr+":"+ideogram_start+".."+ideogram_end;
					$("#curpos").val(tquerypos);
					break;	
				}
			}
		
		
			
		}		
	}

		var queryscope = ideogram_end - ideogram_start;
		var queryfmt = formatNumber(queryscope);
		$("#formatscopeid").html(queryfmt+" bp");		
	    computeRegionRadian();	
		ajax_getbandlst(config.ideogramJson,cur_chr);
	
	
		if(flag == 1){ //first time start or refresh
			//frist identify the default tracks from url
			var dtrackarry = [];
			if(defaultTracks != null){
				if(defaultTracks.indexOf(",") > -1){
					var trackarry = defaultTracks.split(",");
					for(var i=0;i<trackarry.length;i++){
						var dtrack = trackarry[i];
						dtrackarry.push(dtrack);
						$("#tlst_"+dtrack).attr("checked",true);
					}
				}else{
					dtrackarry.push(defaultTracks);
					$("#tlst_"+defaultTracks).attr("checked",true);
				}
				
			}
			
			//get initial hololens ar tracks
			//add by tangbx, show default checked delta.ar tracks
			var hololensid =  getQueryString("hololensid");
			if(hololensid == null || hololensid==""){	
				hololensid = Cookies.get("delta.ar.hololensid");
			} 
			var tracks ="";
			var url ="/deltaar/exchange/"+hololensid+".json?time="+new Date().getTime();
			var idenflag= 0;					
			$.get(url,function(result){
				result = eval(result);
				tracks = result.track;
				
				if(tracks != null && tracks.length > 0 ){
										if(tracks.indexOf(",") > -1 ){
											var flag = 0 ;
											var trass = tracks.split(","); //ar tracks
											for(var j=0;j<dtrackarry.length;j++){
												var curtrack=dtrackarry[j];
												for(var ti=0;ti<trass.length;ti++){
													var t_tr = trass[ti];
													if(t_tr == curtrack){
														if(artracks[curtrack] ==null){
															artracks[curtrack] = curtrack;
														}
														break;
													 }
												  }
											}	
										}else{
											var flag = 0 ;
											for(var j=0;j<dtrackarry.length;j++){
												var curtrack=dtrackarry[j];
												
												if(tracks == curtrack){
													
													if(artracks[curtrack] ==null){
															artracks[curtrack] = curtrack;
													}
													break;
												}
												
											}
											
											
										}
					console.log("initial tracks");
					console.log(artracks);					
					
				}	
			});

			
		}
		reDrawAllSelectedTrack();
		
	}
	 
		
}

var track_index = 0 ;

// this used to turn on draw track picture or turn off
function topotoggleTrack(category,track,index){
		//alert("topological view");
		//identify the histone mark number need less than 6
		var checktracklist = $("#trackid input:checkbox:checked");
	
		if(checktracklist.length > MAX_TRACK_COUNT){//including interaction
		
				var warnselect = Cookies.get("topo_maxselecttrack");
				warnselect = parseInt(warnselect);
				if(warnselect != null && warnselect ==1){
					toggleTrackDrawn(category,track,index);	
					
				}else{
				var embedhtml = "<div style=\"margin-top:10px;\"><h6>The suggested maximum number of selected tracks is "+MAX_TRACK_COUNT;
				 
			 
				$('<div></div>').appendTo('body')
				 .html(embedhtml)
				 .dialog({
				 modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
					width: 'auto', resizable: false,						 
					close: function (event, ui) {
						$("#idtwait").css("display","none");
						$("#tctlst_"+track).attr("checked",false);
						$(this).remove();
					},
					buttons: {
						Yes: function () {	
							$("#tlst_"+track).attr("checked",false);
							$("#tctlst_"+track).attr("checked",false);
							$("#idtwait").css("display","none");
							$(this).remove();  
						},
						No: function () {
							$("#tlst_"+track).attr("checked",false);
							$("#tctlst_"+track).attr("checked",false);
							$("#idtwait").css("display","none");
							$(this).remove();  
						}
				   }					
			});
					
				}
		
						
		}else{			
			toggleTrackDrawn(category,track,index);			
		}
}


function toggleTrackDrawn(category,track,index){
var check = $("#tlst_"+track).prop('checked');
var conf = $("#cdset").val();
var t_dataid = $("#cdset option:selected").text();
//console.log("==========toggleTrackDrawn===check"+check);
$("#twaitimgid").css("display","");	
$("#container").removeClass();
$("#container").addClass("transparent_class");	

$.get("/deltaar/json/"+conf+".json",function(result){
	var json_obj = eval(result);
	
	for(i=0 ; i<json_obj.length;i++){
		var ca_obj = json_obj[i];
	//	console.log("=====category="+category+",ca_obj.name="+ca_obj.name);
		if(category == ca_obj.name){
		   // alert(category);
			for(j=0;j<ca_obj.trackList.length;j++){
				
				var track_obj = ca_obj.trackList[j];
				track_obj.trackid = t_dataid;
			//	console.log("=====track_obj.key"+track_obj.key+",track="+track);
				if(track_obj.key == track){ // have found this track					
					if(track_obj.glyph =="arc"){						
						if(check){
							track_index++;
							var cur_track=$("#track_"+track_obj.key);
							if(cur_track.length <=0){
								track_create(track_obj,track_index);
								
							}	
							ajax_getInteractiondata(track_obj);
							
							//set cookie
							addTrackToCookie(track);
							ShowTrackColorMap(ca_obj.name,track_obj.key,"",track_obj.glyph);
							
						}else{
							$("#track_"+track_obj.key).remove();
							track_index--;
							$("#right_menu_"+track_obj.key).remove();
							
							deleteTrackFromCookie(track);
							 removeTrackColorMap(track_obj.key);
						}
						
					}else if(track_obj.glyph =="histogram"){	
					//	console.log("======track_obj==="+track);
						if(check){
							track_index++;
							var cur_track=$("#track_"+track_obj.key);
							if(cur_track.length <=0){
								track_create(track_obj,track_index);
							}
							var canvas1 = document.getElementById("canvas_"+track);
							
							var ctx1 = canvas1.getContext('2d');
							ctx1.clearRect(0,0,canvas1.width, canvas1.height);
							
							ajax_getTabixGff3Data(track_obj);
							
							addTrackToCookie(track);
							
							ShowTrackColorMap(ca_obj.name,track_obj.key,"",track_obj.glyph);
							
							//callDeltaARByCirclet();
							
						}else{
							//get the track height
							$("#track_"+track_obj.key).remove();
							track_index--;
							var track_arry=findTrackRadius(track) ;
							var track_radius = parseInt(track_arry[0]);
							var track_height = parseInt(track_arry[1]); 
							adjustCircletLayout(track,track_radius,track_height);
							 $("#right_menu_"+track_obj.key).remove();
							 
							 deleteTrackFromCookie(track);
							 if(cachetrackpos[track]!=null){
								 delete cachetrackpos[track];
							 }
							 
							  removeTrackColorMap(track_obj.key);
							//  callDeltaARByCirclet();
						}
						
					}else if(track_obj.glyph =="gene"){
						if(check){
							track_index++;
							var cur_track=$("#track_"+track_obj.key);
							if(cur_track.length <=0){
								track_create(track_obj,track_index);
							}
							var canvas1 = document.getElementById("canvas_"+track);
							
							var ctx1 = canvas1.getContext('2d');
							ctx1.clearRect(0,0,canvas1.width, canvas1.height);
							
							ajax_getGeneData(track_obj);
							
							addTrackToCookie(track);
							
							ShowTrackColorMap(ca_obj.name,track_obj.key,"",track_obj.glyph);
							//callDeltaARByCirclet();
						}else{
							//get the track height
							$("#track_"+track_obj.key).remove();
							track_index--;
							var track_arry=findTrackRadius(track) ;
							var track_radius = parseInt(track_arry[0]);
							var track_height = parseInt(track_arry[1]); 
							adjustCircletLayout(track,track_radius,track_height);
							 $("#right_menu_"+track_obj.key).remove();
							 
							 deleteTrackFromCookie(track);
							 if(cachetrackpos[track]!=null){
								 delete cachetrackpos[track];
							 }
							 removeTrackColorMap(track_obj.key);
							// callDeltaARByCirclet();
						}
						
					}
				
					break;
				}
			
			}
			break;
		}
	}
	$("#idtwait").css("display","none"); //child window
	$("#twaitimgid").css("display","none");	
	$("#container").removeClass("transparent_class");
}); //.get
	
	
}


function singleChrom(){
	show_mode =1;
	var querypos = $("#curpos").val();
	var index1 = querypos.indexOf(":");
	var index2 = querypos.indexOf(".");
	chr = querypos.substring(0,index1);
	pos_start = querypos.substring(index1+1,index2);
	pos_end = querypos.substring(index2+2,querypos.length);
	pos_start = parseInt(pos_start);
	pos_end = parseInt(pos_end);
		
	var res = zoomin(pos_start,pos_end,1);
	if(res <0){		
			return ;
	}
		
	querypos = chr+":"+ideogram_start+".."+ideogram_end;
	$("#curpos").val(querypos);
			
		
	var queryscope = ideogram_end - ideogram_start;
	var queryfmt = formatNumber(queryscope);
	$("#formatscopeid").html(queryfmt+" bp");
	reDrawAllSelectedTrack();
}




//zoom in
function zoomin_func(fold){
	if(show_mode ==1){//single	
		var querypos = $("#curpos").val();
		var index1 = querypos.indexOf(":");
		var index2 = querypos.indexOf(".");
		chr = querypos.substring(0,index1);
		pos_start = querypos.substring(index1+1,index2);
		pos_end = querypos.substring(index2+2,querypos.length);
		pos_start = parseInt(pos_start);
		pos_end = parseInt(pos_end);
		
		var res = zoomin(pos_start,pos_end,fold);
		if(res <0){		
			return ;
		}
		
		querypos = chr+":"+ideogram_start+".."+ideogram_end;
		$("#curpos").val(querypos);
		
		
		
		
		var queryscope = ideogram_end - ideogram_start;
		var queryfmt = formatNumber(queryscope);
		$("#formatscopeid").html(queryfmt+" bp");
		reDrawAllSelectedTrack();
		var dset = $("#cdset").val();
		//Cookies.set("topo_position",querypos, { path: 'topo'});
		//Cookies.set("topo_dataset",dset, { path: 'topo'});
		zoomupdatear(chr,ideogram_start,ideogram_end);
	
	}else if(show_mode ==2){
		genome_zoomin(fold);
	}
}
//zoom out
function zoomout_func(fold){
	if(show_mode ==1){
		var querypos = $("#curpos").val();
		var index1 = querypos.indexOf(":");
		var index2 = querypos.indexOf(".");
		chr = querypos.substring(0,index1);
		pos_start = querypos.substring(index1+1,index2);
		pos_end = querypos.substring(index2+2,querypos.length);
		pos_start = parseInt(pos_start);
		pos_end = parseInt(pos_end);
		
		zoomout(pos_start,pos_end,fold);
		
		querypos = chr+":"+ideogram_start+".."+ideogram_end;
		$("#curpos").val(querypos);	
		
		
		
		var queryscope = ideogram_end - ideogram_start;
		var queryfmt = formatNumber(queryscope);
		$("#formatscopeid").html(queryfmt+" bp");
		
		reDrawAllSelectedTrack();	

		//Cookies.set("topo_position",querypos, { path: 'topo' });
	//	Cookies.set("topo_dataset",dset, { path: 'topo' });
		zoomupdatear(chr,ideogram_start,ideogram_end);
	}else if(show_mode ==2){
		genome_zoomout(fold);
	}
	
}

function zoomupdatear(chrtmp,v_start,v_end){
		var hololensid =  getQueryString("hololensid");
	if(hololensid == null || hololensid==""){	
		hololensid = Cookies.get("delta.ar.hololensid");			
	}
	var model = getQueryString("model");		
	var binsize = getQueryString("binsize");	
	var bin = parseInt(binsize);
	var organism = getQueryString("organism");	
	var pos_starttmp = parseInt(v_start);
	var pos_endtmp = parseInt(v_end);
	
	var posrange = pos_endtmp -  pos_starttmp ;
	var atomcount = posrange/bin;
	if(atomcount >=5 && atomcount<=60){
		//show dialog 
		$('<div></div>').appendTo('body')
							  .html('<div style=\"margin-top:10px;\">Update Delta.AR with this genome region?</div>')
							  .dialog({
								  modal: true, title: 'Info', zIndex: 10000, autoOpen: true,
								  width: 'auto', resizable: false,						 
								  close: function (event, ui) {
									  //remove from cookie	
									  			
									  $( this ).dialog( "close" );
								  },
								  buttons:{
									  Ok: function(){
									    	var tracks ="";
											var length  = Object.keys(artracks).length ;
											if(length>0){
												for(key in artracks){  
													tracks+= artracks[key]+","; 
												}  
											}
											if(tracks.length > 0){
												tracks = tracks.substring(0,tracks.length-1);
											}
											var jumptrack = tracks;
																					
											var threfurl="/deltaar/ar/changex.action";				
											//through ajax send request
											var params={"jobid":organism,"modelname":model,"binsize":binsize,"species":organism,"track":jumptrack,"chrom":chrtmp,"start":pos_starttmp,"end":pos_endtmp,"hololensid":hololensid};
											$.ajax({
													url : threfurl, // change to find gff3
													type : 'post',
													data : params,
													success : function(data){
														//alert("Update AR Success");
														console.log("Circlet View Update Show.AR Success");
													},
													error : function (){
																												
														//alert("Update AR Error");
														console.log("Circlet View Update Show.AR Error");
													}
											});
												
									    $( this ).dialog( "close" );
										
									  },
									  Cancel: function() {
										  $( this ).dialog( "close" );
										}
								  }
							});
		
	
	}
	
	
	
	
}


function changeScope(){
	var scope = $("#scopeid").val();
	var querypos = $("#curpos").val();
	var index1 = querypos.indexOf(":");
	var index2 = querypos.indexOf(".");
	chr = querypos.substring(0,index1);
	pos_start = querypos.substring(index1+1,index2);	
	pos_start = parseInt(pos_start);
	scope = parseInt(scope);
	pos_end = pos_start + scope;
	
	ideogram_start = pos_start;
	ideogram_end = pos_end ;
	
	querypos = chr+":"+ideogram_start+".."+ideogram_end;
	$("#curpos").val(querypos);
	
	//format scope
	var queryscope = ideogram_end - ideogram_start;
	var queryfmt = formatNumber(queryscope);
	$("#formatscopeid").html(queryfmt+" bp");

	//Cookies.set("topo_position",querypos, { path: 'topo' });
	computeRegionRadian();	
	
	var cur_chr=$("#chromid").val();
	ajax_getbandlst(config.ideogramJson,cur_chr);
	
	reDrawAllSelectedTrack();
}


//redraw all enable tracks when the view region changed
//we need to remove all the existed tracks first.
//then reset the cur_radius = radius  to draw all the tracks
/*
$("#track_"+track_obj.key).remove();
							track_index--;
							var track_arry=findTrackRadius(track) ;
							var track_radius = parseInt(track_arry[0]);
							var track_height = parseInt(track_arry[1]); 
							adjustCircletLayout(track,track_radius,track_height);
							 $("#right_menu_"+track_obj.key).remove();
*/
function reDrawAllSelectedTrack(){
//identify the redraw tracks
var trackCount =0;
var trackH = 20;
cur_radius = radius+30;
track_index =0 ;

var seltracks_number = $("#trackid input:checkbox:checked").length;
var t_html= "";

$("#twaitimgid").css("display","");	
$("#container").removeClass();
$("#container").addClass("transparent_class");	



if(seltracks_number > MAX_TRACK_COUNT){
	var whether_warn = Cookies.get("topo_maxtrack");
	whether_warn = parseInt(whether_warn);
	if(whether_warn != null && whether_warn == 1){
		$("#twaitimgid").css("display","none");	
		$("#container").removeClass("transparent_class");
			$("#trackid input[type='checkbox']").each(function(){
					if ($(this).is(":checked")) {
						var curTrackH = trackCount * trackH;
						var checkval = $(this).val();
						var arrys = checkval.split(",");
						var cur_track=$("#track_"+arrys[1]);
						if(cur_track.length >0){
								cur_track.remove();
								remove_selectTrack(arrys[1]);		
						}	
						topotoggleTrack(arrys[0],arrys[1],arrys[2],curTrackH);
						trackCount++;
					}
			});	
	}else{
			//show a warn dialog
	$("#trackid input[type='checkbox']").each(function(){
			if ($(this).is(":checked")) {
				var checkval = $(this).val();
				var arrys = checkval.split(",");
				t_html += '&nbsp;&nbsp;<input class=\"re_select_track\" type=\"checkbox\" value=\"'+checkval+'\"  />'+arrys[1]+"<br/>";
			}
   	});
	if(t_html.length>0){	
	
			var embedhtml="<div style=\"margin-top:10px;font-size:12px;\"><div>The suggested maximum number of checked tracks is <strong>"+MAX_TRACK_COUNT+"</strong><div><div>Please choose from the following tracks:<br/><br/></div>";
			 embedhtml += "<div><input id='id_show_warn_maxtrack' type='checkbox' value='1' /><b>Do not show this warning any more</b> </div><div id='id_maxtrack_panel'>";
			 embedhtml += t_html+"</div></div>";
			$('<div></div>').appendTo('body')
				 .html(embedhtml)
				 .dialog({
				 modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
					width: 'auto', 
					resizable: false,						 
					close: function (event, ui) {
						
						$(this).remove();
					},
					buttons: {
						OK: function () {							
							//I will check the selected track number. if everything is ok, then call
							
							//whether users have checked the do not show any more checkbox
							var warn_check =0;
							if($("#id_show_warn_maxtrack").is(":checked")){
								warn_check = 1;
								//Cookies.set("topo_maxtrack",warn_check, { path: 'topo'});
								
							}
						
								seltracks_number = $(".re_select_track:checked").length;
								seltracks_number = parseInt(seltracks_number);
								if(seltracks_number>0 && seltracks_number <= MAX_TRACK_COUNT){								
									//first, uncheck all the uncheck track from here
									
									$(".re_select_track:checkbox").each(function(){
										var checkval = $(this).val();
										var arrys = checkval.split(",");
										if ($(this).is(":checked") == false) {
											$("#tlst_"+arrys[1]).attr("checked",false);
											//delete from cookie
											deleteTrackFromCookie(arrys[1]);	
											$("#track_"+arrys[1]).remove();
											$("#right_menu_"+arrys[1]).remove();	
											remove_selectTrack(arrys[1]);	
											removeTrackColorMap(arrys[1]);		
										}
									});
									
									
									$(".re_select_track:checkbox").each(function(){
										var checkval = $(this).val();
										var arrys = checkval.split(",");
										
										if ($(this).is(":checked")) {
											var curTrackH = trackCount * trackH;
											var cur_track=$("#track_"+arrys[1]);
											if(cur_track.length >0){
												cur_track.remove();
												remove_selectTrack(arrys[1]);	
												removeTrackColorMap(arrys[1]);													
											}	
											topotoggleTrack(arrys[0],arrys[1],arrys[2],curTrackH);
											trackCount++;
										}
									});	
									
																
								}
							
							
							 $(this).dialog('close'); 
							    							
						},
						Cancel: function () {
							//if users choose cancer or close, default to remove all tracks
							$(".re_select_track:checkbox").each(function(){
									var checkval = $(this).val();
									var arrys = checkval.split(",");									
									$("#tlst_"+arrys[1]).attr("checked",false);
									//delete from cookie
									deleteTrackFromCookie(arrys[1]);	
									$("#track_"+arrys[1]).remove();
									$("#right_menu_"+arrys[1]).remove();
									remove_selectTrack(arrys[1]);		
									
							});
							$(this).dialog('close');  
						
						}
				   }
	});
	}else{
		$("#twaitimgid").css("display","none");	
		$("#container").removeClass("transparent_class");
		
	}
	}


	
	
}else{
	$("#twaitimgid").css("display","none");	
	$("#container").removeClass("transparent_class");
		$("#trackid input[type='checkbox']").each(function(){
				if ($(this).is(":checked")) {
					var curTrackH = trackCount * trackH;
					var checkval = $(this).val();
					var arrys = checkval.split(",");
					var cur_track=$("#track_"+arrys[1]);
					if(cur_track.length >0){
							cur_track.remove();
							remove_selectTrack(arrys[1]);		
					}	
					topotoggleTrack(arrys[0],arrys[1],arrys[2],curTrackH);
					trackCount++;
				}
		});	
	
}


}





function loadWholeGenomePage(){
	$("#chromdiv").html("");
	configWholeChrom();
		$("#dialog_chrom").dialog(
			{ 
			  title: "Choose Chroms",
			  width:500,
			  height: 500, 
			  modal: true
			}); 
	
	//window.open("/deltaar/pages/visualization/circos/chrom.jsp","Choose Chromosome","width=400,height=400,scrollbars=no,status=no,menubar=no,titlebar=no,toolbar=no");
}

function loadConfigPage(){
			$("#dialog_config").dialog(
			{ 
			  title: "Configuration",
			  width:500,
			  height: 250, 
			  modal: true
			}); 
	//window.open("/deltaar/pages/visualization/circos/config.jsp","Config Param","width=400,height=400,scrollbars=no,status=no,menubar=no,titlebar=no,toolbar=no");
}

	
function parent_getChromLst(){
	return chrom_lst;
}
	
function parent_getRegionLst(){
	return region_lst;
}
	
function parent_drawWholeGenome(sel_chrom_lst){
	draw_wholeGenome(sel_chrom_lst);
}
	
	
	
function toggleGenomeView(){
	var checkg = $("#genomech").is(":checked");
	if(checkg == true){
		$("#genomeid").css("display","block");
		var url = "http://jbrowse.big.ac.cn/index.html?data=3cdb%2Fjson%2Fhuman&loc=5%3A1..53714931&tracks=ARC&highlight=" ;
		$("#genomeframe").attr("src",url);
	}else{
			$("#genomeid").css("display","none");
			$("#genomeframe").attr("src","#");
	}
}

function findNearestRadiusAccordingDistance(distance){
	var t_dataid = $("#cdset option:selected").text();
	if(selectedTrack.length>0){
		for(k=0;k<selectedTrack.length;k++){
			var selObj = selectedTrack[k];
			//console.log(selObj.track.trackid+" "+t_dataid);
			if(selObj.track.trackid == t_dataid){
				var t_cur = selObj.radius;
				if(selObj.key=="ensembl_gene"){
					if(distance > (t_cur+12) && distance <= (t_cur+selObj.height+10)){
					return selObj.key;
					}
				}else{
					if(distance > (t_cur+12) && distance <= (t_cur+MCI+10)){
					return selObj.key;
					}
				}
				
			}
			
		}
	}
	return null;
}

//this is used to find radius of given track
function findTrackRadius(name){
	//alert(name+","+selectedTrack.length);
	var iden = 0 ;
	var found =0;
	var track_radius=0;
	var track_height = 0 ;
	var t_dataid = $("#cdset option:selected").text();
	if(selectedTrack.length>0){
		for(k=0;k<selectedTrack.length;k++){
			var selObj = selectedTrack[k];
				if(selObj.key == name && selObj.track.trackid == t_dataid){//track
					iden = k ;
					found = 1;
					track_radius = selObj.radius;
					track_height = selObj.height;
					break;
				}
		}							
    }
	
	return [track_radius,track_height];
}

//when remove one track, you need to adjust the radius of all the existed tracks except the inner cirlet interaction
function adjustCircletLayout(track,track_radius,track_height){
	//console.log(track+","+track_radius);
	//cur_radius = track_radius - MCI/2;
	if(track_radius >0){
		
		var sub_adjust_radius = track_height;
		cur_radius = cur_radius - sub_adjust_radius;
		if(cur_radius < radius){
			cur_radius = radius + 30;
		}
		if(selectedTrack.length>0){
			for(k=0;k<selectedTrack.length;k++){
				var selObj = selectedTrack[k];
				if(selObj!=null){
					//console.log("current track "+selObj.key+",current radius="+selObj.radius );
					if(selObj.radius > track_radius){
						if(selObj.track !== undefined){
							if(selObj.track.glyph =="histogram"){
								selObj.radius = selObj.radius - track_height;
								
								
								ajax_getTabixGff3Data(selObj.track);					
							}else if(selObj.track.glyph =="gene"){
								selObj.radius = selObj.radius - track_height;
								
								ajax_getTabixGff3Data(selObj.track);
							}	
						}									
					}
				}			
			}							
		}
		remove_selectTrack(track);
		
		
		//console.log("need adjust radius="+cur_radius+",delete track "+track+" radius="+track_radius);
		//after delete
		if(selectedTrack.length>0){
			for(k=0;k<selectedTrack.length;k++){
				var selObj = selectedTrack[k];
				console.log("current track "+selObj.key+",current radius="+selObj.radius );
			}
		}
	}
	

}

//this is used to add one track to cookie
function addTrackToCookie(name){
	var c_track = Cookies.get("topo_track");
	if(c_track == null ){
		var c_trackstr = name;
		//Cookies.set("topo_track",c_trackstr, { path: 'topo' });
	}else{
		var c_track_array = c_track.split(",");
		var found =0;
		for(i=0;i<c_track_array.length;i++){
			if(name == c_track_array[i]){
				found =1;
				break;
			}
		}
		if(found ==0){
			c_track += ","+name;			
		//	Cookies.set("topo_track",c_track, { path: 'topo'});
		}
	}
}


//this is used to delete one track from cookie
function deleteTrackFromCookie(name){
	//alert("delete track");
	var c_track = Cookies.get("topo_track");
	if(c_track != null){
		var c_track_array = c_track.split(",");
		var found = -1;
		//alert("before delete"+c_track_array.length);
		for(i=0;i<c_track_array.length;i++){
			if(name == c_track_array[i]){
				found =i;
				break;
			}
		}
		if(found > -1){
			c_track_array.splice(found,1);
			//alert("after delete "+found+",length="+c_track_array.length);
			//merge trackList
			var track_str="";
			for(i=0;i<(c_track_array.length -1);i++){
				track_str += c_track_array[i] +",";
			}
			track_str += c_track_array[c_track_array.length -1];
		//	Cookies.set("topo_track", track_str, { path: 'topo' }) ;		
		}
		
		
	}
}






//this is used to do some cookies operation
//we do not think about the multiple chroms
function cookiesOperate(){
	//if cookie exist, then we need to load cookie dataset,track and query position
				//dataset selected				
				//whether position exist, this is single chromsome mode				
				//default view_mode is 1, if mutiple chroms are choosen, then value reset to 2 				
}

// this will reset page to the situation of current dataset 
function pageReset(){
	$("div[id^='track_']").remove();
	
}

function uploadTrackDialog(){
	$("#utrackid").dialog({
		"title":"Add track" ,
		"width":500,
		"height":500
		
		
	});
}


//Configuration page
function showConfigDialog(){
	$("#dialog_config").dialog({
		"title":"Configuration" ,
		"width":500,
		"height":350
		
		
	});	
		
}



function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function formatNumber(value) { 
    var value = value.toString(); 
    if (value.length <= 3) { 
        return value; 
    } else { 
        return formatNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3); 
    } 
} 



 function translate(x,y){
        matrix[4] += matrix[0] * x + matrix[2] * y;
        matrix[5] += matrix[1] * x + matrix[3] * y;
}

    // do the scale to the array
function scale(x,y){
        matrix[0] *= x;
        matrix[1] *= x;
        matrix[2] *= y;
        matrix[3] *= y;    
}

    // do the rotate to the array
   function rotate(radians){
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var m11 = matrix[0] * cos + matrix[2] * sin;
        var m12 = matrix[1] * cos + matrix[3] * sin;
        var m21 = -matrix[0] * sin + matrix[2] * cos;
        var m22 = -matrix[1] * sin + matrix[3] * cos;
        matrix[0] = m11;
        matrix[1] = m12;
        matrix[2] = m21;
        matrix[3] = m22;   
    }

function showTrackPanel(panelid){
	
	if($("#panel_"+panelid).css("display") == "none"){
			$("#panel_"+panelid).css("display","block");
			$("#fold_"+panelid).attr("src","/deltaar/images/bnus.jpg");
	}else{
		$("#panel_"+panelid).css("display","none");
			$("#fold_"+panelid).attr("src","/deltaar/images/plus.jpg");
		
	}
	
}

function deleteOneTrackFromCanvas(trackkey,trackglyph){
	var deltrack = $("#track_"+trackkey);
	if(deltrack != null && deltrack.length >0 ){
		$("#track_"+trackkey).remove();	
		//reset checkbox
		$("#trackid input[type='checkbox']").each(function() {
			if ($(this).is(":checked")) {				
				var checkval = $(this).val();
				var arrys = checkval.split(",");
				if(arrys[1] == trackkey){
					$(this).attr("checked",false);
					
				}			
			}
   		 });
		 //exclude innter interaction, we do not need to adjust the features layout
		 if(trackglyph !="arc"){
			
			
			var track_arry=findTrackRadius(trackkey) ;
			var track_radius = parseInt(track_arry[0]);
			var track_height = parseInt(track_arry[1]);
			adjustCircletLayout(trackkey,track_radius,track_height); 
		 }
			
		//if the track is the deltaar track, then we need to update hololens view	
		if($("#idshowar"+trackkey).prop("checked")){
			$("#idshowar"+trackkey).prop("checked",false);
			operateARFunc(trackkey);
		}
		 //remove from cookie
		deleteTrackFromCookie(trackkey);
		 //remove right menu-
		 //remove track map
		 removeTrackColorMap(trackkey);
		 
		//callDeltaARByCirclet();
		
		
		
		
		
		
	}

}


//this used to clear all track from circlet view 
function resetCircetView(){
		//reset checkbox
		$("#trackid input[type='checkbox']").each(function() {
			if ($(this).is(":checked")) {				
				var checkval = $(this).val();
				var arrys = checkval.split(",");
				var trackkey = arrys[1] ;
				$("#track_"+trackkey).remove();	
				$(this).attr("checked",false);			
			}
   		 });	
		 //reset track cookies
		clearCookies("topo");
		//clear select tracks
		selectedTrack=[];		
		cur_radius=radius+30; 
		track_radius_set=[];
		//chrom_lst=[];
		region_lst=[];
		bararry=[]; // multiple bar store
		cachetrackpos={};//store cache track position
}


//save the whole canvas image as pdf
function savePageAs(){

	var p_pos = $("#curpos").val(); 
	var conf = getQueryString("conf");
	var ghrefurl;
	
	var jumptrack="";
	$("#trackid input[type='checkbox']").each(function(){				
					if ($(this).is(":checked")) {
						var checkval = $(this).val();
						var arrys = checkval.split(",");	
						
						jumptrack += arrys[1]+"," ;
						
						
					}
		});
	if(jumptrack.length>0){
			jumptrack = jumptrack.substring(0,jumptrack.length-1);
	}
	
	if(conf != null){
	   ghrefurl="http://"+window.location.host+"/deltaar/pages/visualization/topo_viewm.jsp?conf="+conf+"&loc="+p_pos+"&tracks="+jumptrack+"&tracklist=0";					
	}else{
		 ghrefurl="http://"+window.location.host+"/deltaar/pages/visualization/topo_viewm.jsp?loc="+p_pos+"&tracks="+jumptrack+"&tracklist=0";	
	}
	$("#waitexport").css("display","");

	var url =encodeURIComponent(ghrefurl);		
			
	var params = {"url":url,"renderType":'pdf',"zoomFactor":4};
	$.ajax({
				   url:'/deltaar/ajax/ajaxExportPDF.action',
				   type:'post',
				   dataType:'json',
				   data:params,
				   success:function(value){
						var a = document.getElementById("goto");
						if(a == null){
							a=document.createElement('a');
							a.id="goto";
							document.body.appendChild(a);
						}
						a.href = value.exportURL; // Set the file name.
						a.target="_blank";
						a.style.display = 'none';
							$("#waitexport").css("display","none");
						document.getElementById("goto").click();
						delete a;								
					},
				   error:function(e){
							alert("Export error");
						}
				   }); 				



		
	
}

//add track by key,using by physical dual-mode
function AddTracks(trackkey){
	if(trackkey != null ){
		for(var i=0 ; i< trackkey.length ;i++){
		var curkey = trackkey[i].trim();
		
		if(curkey.indexOf('_signal') > 0 ){
			curkey = curkey.substring(0,curkey.length-7);
		}
		
		$("#tlst_"+curkey).prop("checked",true);
		var checkval = $("#tlst_"+curkey).val();
	//	console.log("checkval="+checkval+",curkey="+curkey);
		if(checkval != null ){
			    var arrys = checkval.split(",");
										
				if ($("#tlst_"+curkey).is(":checked")) {
					var curTrackH = 20;
					var cur_track=$("#track_"+arrys[1]);
					if(cur_track.length >0){
						cur_track.remove();
						remove_selectTrack(arrys[1]);		
					}	
					topotoggleTrack(arrys[0],arrys[1],arrys[2],curTrackH);
				}
			
		}

	}
	
	}
	
}

//remove track by key, using by physical view dual-mode
function RemoveTracks (trackkey){
	
	if(trackkey != null ){
		for(var i=0 ; i< trackkey.length ;i++){
		var curkey = trackkey[i];
		
		
		if(curkey.indexOf('_signal') > 0 ){
			curkey = curkey.substring(0,curkey.length-7);
		}
		$("#tlst_"+curkey).prop("checked",false);
		var checkval = $("#tlst_"+curkey).val();
		if(checkval != null ){
			var arrys = checkval.split(",");									
			//delete from cookie
			deleteTrackFromCookie(arrys[1]);	
			$("#track_"+arrys[1]).remove();
			$("#right_menu_"+arrys[1]).remove();
			
			removeTrackColorMap(arrys[1]);

			//then need to adjust circlet layout
			var trackglyph="track";
			if(trackglyph !="arc"){
				
				
				var track_arry=findTrackRadius(curkey) ;
				var track_radius = parseInt(track_arry[0]);
				var track_height = parseInt(track_arry[1]);
				adjustCircletLayout(curkey,track_radius,track_height); 
			 }	
			
			remove_selectTrack(arrys[1]);	
			
		}
		
		
		
		
	}	
	}
}

//this is used to show track name 
function ShowTrackColorMap(category,trackkey,trackcolor,glyph){
	var hhobj = $("#hm"+trackkey);
	var td = null ;
	if(hhobj.length>0){
		hhobj.remove();	
		
	}
	td = $("#featuremapid");

	var spantext="<span style='padding-left:5px;padding-right:5px;' id='hm"+trackkey+"' onclick=\"showARFunc('"+trackkey+"')\"><img src='/deltaar/images/tabClose.png' onclick='deleteOneTrackFromCanvas(\""+trackkey+"\",\""+glyph+"\")'>"+trackkey+"</span>";
		
	if(td != null ){
		td.append(spantext);
	}	
}


//remove select track from hisheatmapid
function removeTrackColorMap(trackkey){
	$("#hm"+trackkey).remove();
}


function searchGivenGene(){
	var genename=$("#idgenesearch").val();
	var params={"organism":"hg19","param":genename,"pageNo":0,"pageSize":0,"totalCount":-1};
		$.ajax({
				url : '/deltaar/ajax/ajaxSearchGene.action',
				type : 'post',
				dataType : 'json',
				data : params,
				async: true,
				success : function(data){
				
					if(data.genelist != null){
						//show gene name
						var geneobj = data.genelist[0];
						if(geneobj!= null){
							
							var genestart = geneobj.start;
							var geneend = geneobj.end;
							 chr = geneobj.chrom;
							 $("#chromid").val(chr);
							 
							
							pos_start = parseInt(genestart)-20;
							pos_end = parseInt(geneend)+20;
							
							ideogram_start = pos_start;
							ideogram_end = pos_end;
							querypos = chr+":"+ideogram_start+".."+ideogram_end;
							$("#curpos").val(querypos);
							
							var res = zoomin(pos_start,pos_end,1);
							if(res <0){		
								return ;
							}
							
							
							var queryscope = ideogram_end - ideogram_start;
							var queryfmt = formatNumber(queryscope);
							$("#formatscopeid").html(queryfmt+" bp");
							reDrawAllSelectedTrack();
						}
						
					}	
				}
		});
	
}

	
function callDeltaARByCirclet(){
		
			var hololensid =  getQueryString("hololensid");
			if(hololensid == null || hololensid==""){	
				hololensid = Cookies.get("delta.ar.hololensid");			
			} 
			
			var model = getQueryString("model");		
			var binsize = getQueryString("binsize");	
			var organism = getQueryString("organism");
						
			
			var pos = $("#curpos").val();
	
			var index1 = pos.indexOf(":");
			var index2 = pos.indexOf(".");
			var chrtmp = pos.substring(0,index1);
			
			var pos_starttmp = pos.substring(index1+1,index2);
			var pos_endtmp = pos.substring(index2+2,pos.length);
			
			pos_starttmp = parseInt(pos_starttmp);
			
			pos_endtmp = parseInt(pos_endtmp);
			
			var jumptrack="";
			var jobid = getQueryString("conf");
			
			var hololensid = getQueryString("hololensid");
			
			$("#trackid input[type='checkbox']").each(function(){				
							if ($(this).is(":checked")) {
								var checkval = $(this).val();
								var arrys = checkval.split(",");
								var tr = arrys[1];

								if( parseInt(tr.indexOf("Interaction") ) <0 ){
									jumptrack += tr+"," ;											
								}	
								
							}
				});
			
			
			if(jumptrack.length > 0){
				jumptrack = jumptrack.substring(0,jumptrack.length-1);	
			}
			
			var track=jumptrack; //,
			
			
		/*	var threfurl="http://deltaar.big.ac.cn/deltaar/ar/changex.action?jobid="+jobid+"&modelname="+model+"&binsize="+binsize+"&species="+organism+"&track="+track+"&chrom="+chrtmp+"&start="+pos_starttmp+"&end="+pos_endtmp+"&hololensid="+hololensid;
			
			var popup = window.open('', '');
			popup.location.href=threfurl;
			setTimeout(function() {popup.close();}, 100);*/
			
			var threfurl="/ar/changex.action";
					
			//through ajax send request
			var params={"jobid":jobid,"modelname":model,"binsize":binsize,"species":organism,"track":track,"chrom":chrtmp,"start":pos_starttmp,"end":pos_endtmp,"hololensid":hololensid};
			$.ajax({
						url : threfurl, // change to find gff3
						type : 'post',
						data : params,
						success : function(data){
							alert("Update AR Success");
						},
						error : function (){
							
							alert("Update AR Error");
						}
					});
			
		
														
			/*var a = document.getElementById("hidengoto");
			if(a == null){
				a=document.createElement('a');
				a.id="hidengoto";
				document.body.appendChild(a);
			}
														
			a.href = threfurl;
		//	a.target="_blank";
														
			document.getElementById("hidengoto").click();	*/			
			
		}

function showARFunc(trackname){
	
	var html="<input id='idshowar"+trackname+"' type='checkbox' value='1' onclick=\"operateARFunc('"+trackname+"')\"/>Show in Delta.AR";;
	
	var length  = Object.keys(artracks).length ;
	if(length>0){
		for(key in artracks){  
			var ttrack = artracks[key];
			if(trackname == ttrack){
				html="<input id='idshowar"+trackname+"' type='checkbox' value='1' checked='checked' onclick=\"operateARFunc('"+trackname+"')\"/>Show in Delta.AR";
				break;
			}
			
		}  
	}
	var hm="hm"+trackname;
		var hmobj = document.getElementById(hm);
		
		var td = $("#featuremapshowarid");
		
		var pos0=hmobj.offsetLeft;
		var pos1 = hmobj.offsetTop;
		
		td.html(html).css("padding-left",pos0+"px");	

	
}


//here call deltaar , the same as genome view
function operateARFunc(trackname){
		var hololensid =  getQueryString("hololensid");
			if(hololensid == null || hololensid==""){	
				hololensid = Cookies.get("delta.ar.hololensid");			
			} 
			
			var model = getQueryString("model");		
			var binsize = getQueryString("binsize");	
			var bin = parseInt(binsize);
			var organism = getQueryString("organism");
						
			
			var pos = $("#curpos").val();
	
			var index1 = pos.indexOf(":");
			var index2 = pos.indexOf(".");
			var chrtmp = pos.substring(0,index1);
			
			var pos_starttmp = pos.substring(index1+1,index2);
			var pos_endtmp = pos.substring(index2+2,pos.length);
			
			pos_starttmp = parseInt(pos_starttmp);
			
			pos_endtmp = parseInt(pos_endtmp);
			
			//identifiy the atom of 3dmodel can not super than 100
		var posrange = pos_endtmp -  pos_starttmp ;
									
		var atomcount = posrange/bin;
		if(atomcount > 60 || atomcount<5){			
			$('<div></div>').appendTo('body')
			.html('<div style=\"margin-top:10px;\">The number of balls showed in you model should between 5 and 60. Please re-define your genome region.</div>')
			.dialog({
				modal: true, title: 'Warn', zIndex: 10000, autoOpen: true,
				width: 'auto', resizable: false,						 
				close: function (event, ui) {									  	
					$(this).remove();
				},
				buttons:{
					Ok: function(){	
						$(this).remove();
					}
				}
			});	
		}else{
			var jumptrack="";
			var jobid = getQueryString("conf");
			var curtrack = trackname;
			var deltrack="";
			if($("#idshowar"+trackname).is(":checked")){
								//identifiy whether this track GM12878 tracks,if yes, then other gm12878 tracks should not be checked
												
												if(curtrack.startWith("GM12878")||curtrack.startWith("H1-hESC")||curtrack.startWith("HUVEC")||curtrack.startWith("HeLa-S3")||curtrack.startWith("HepG2")||curtrack.startWith("IMR90")||curtrack.startWith("K562")){
													for(key in artracks){  
														var ttrack = artracks[key];
														//other key with signal track
														if(ttrack.startWith("GM12878")||ttrack.startWith("H1-hESC")||ttrack.startWith("HUVEC")||ttrack.startWith("HeLa-S3")||ttrack.startWith("HepG2")||ttrack.startWith("IMR90")||ttrack.startWith("K562")){
															//checked false
															deltrack =ttrack+","; 
															
															delete artracks[key];
															
														}
													}  
													
												}

											
												if(artracks[curtrack] == null){
													
													artracks[curtrack] = curtrack;
													console.log("new checked");
													console.log(artracks);
												}
											
																	//need to get tracks from exchange hololensid fileCreatedDate
												var tracks ="";
												var length  = Object.keys(artracks).length ;
												if(length>0){
													for(key in artracks){  
														var ttrack = artracks[key];
														if(ttrack.indexOf("signal") > -1){
															ttrack = ttrack.substring(0,ttrack.length-7);				
														}
														tracks+= ttrack+","; 
													}  
												}
												if(tracks.length > 0){
													tracks = tracks.substring(0,tracks.length-1);
												}
												jumptrack = tracks;
								
								
									var threfurl="/deltaar/ar/changex.action";
									
									//through ajax send request
									var params={"jobid":jobid,"modelname":model,"binsize":binsize,"species":organism,"track":jumptrack,"chrom":chrtmp,"start":pos_starttmp,"end":pos_endtmp,"hololensid":hololensid};
									$.ajax({
												url : threfurl, // change to find gff3
												type : 'post',
												data : params,
												success : function(data){
													//alert("Update AR Success");
													console.log("Circlet Update AR Success");
													if(deltrack!="" && deltrack.length > 0 ){
														deltrack = deltrack.substring(0,deltrack.length-1);
														$("#idshowar"+deltrack).prop("checked",false);
													}
													
												},
												error : function (){
													
													//alert("Update AR Error");
													console.log("Circlet Update AR Error");
												}
											});
						
		
			
			
		
							
	}else{
			
		if(artracks[trackname] != null){
			delete artracks[trackname] ;
			$("#idshowar"+deltrack).prop("checked",false);
			console.log("not checked");
			console.log(artracks);
		}
		//need to get tracks from exchange hololensid fileCreatedDate
		var tracks ="";
		var length  = Object.keys(artracks).length ;
		if(length>0){
				for(key in artracks){ 
						var ttrack = artracks[key];
						if(ttrack.indexOf("signal") > -1){
							ttrack = ttrack.substring(0,ttrack.length-7);				
						}
						tracks+= ttrack+","; 													
															
				}  
		}
		if(tracks.length > 0){
			tracks = tracks.substring(0,tracks.length-1);
		}
		jumptrack = tracks;
		var threfurl="/deltaar/ar/changex.action";
									
		//through ajax send request
		var params={"jobid":jobid,"modelname":model,"binsize":binsize,"species":organism,"track":jumptrack,"chrom":chrtmp,"start":pos_starttmp,"end":pos_endtmp,"hololensid":hololensid};
		$.ajax({
			url : threfurl, // change to find gff3
			type : 'post',
			data : params,
			success : function(data){
				console.log("Circlet Update AR Success");
			},
			error : function (){							
				console.log("Circlet Update AR Error");
			}
		});

		}
    }

}


String.prototype.startWith = function(str){
			  if(str == null || str== "" || this.length== 0 || str.length > this.length){
				 return false;
			  } 
			  if(this.substr(0,str.length) == str){
				 return true;
			  }else{
				 return false;
			   }       
			  return true; 
			}
