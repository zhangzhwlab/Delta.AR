var chrom=1;
var pos_start=1;
var pos_end=42000000;	
var MAX_TRACK_COUNT=6;//4
var organism="";		

var bin_size=1000000;//1mb
var start_bin=17;//
var move_flag = false;
var mv_sx=-1;
var mv_sy=-1;
var mv_ex=-1;
var mv_ey=-1;

var sphere_radius=0.03;
var bond_width=0.005;
var model_line_width=1;
var url_modelbin =0;


var glviewer = null;
var cmodel= null; // consencus model
var view_model=-1;
var moldata = null;
var cur3dmodel = null ;
var cur3dmodel_obj = null ;

var glviewer1 = null;
var initCameraZd = 1;


var colorMap=["red","lime","blue","orange","yellow","purple"];
var bin3radius=[0.015,0.001,0.045];
var bin5radius=[0.029,0.02,0.01,0.04,0.05];
var bin10radius=[0.029,0.025,0.02,0.015,0.01,0.035,0.04,0.045,0.05,0.055];

var SELECTATOM=null;

/*
*this is used to store the circle of each selected histone mark, which will be used for delete circle when uncheck this histone mark
*/
var cylinderMap={};
var cylinderShapes=[]; // all shapes
var focusAtom;

/*
*this is used to store the index of histone mark, so when we first check one histone,it will be drawn at right position around the sphere
*******************************/
var histoneCylinderIndex={};
//this is used to store the delete index of histone mark, when add new track, need to get index from this array
var delHidstoneCylinderIndex=[];
var atomDrawnGeneIndexIndex=[];

//this is used to cache gene xy position and information
var cachetrackpos={};//store cache track position
cachetrackpos["ensembl_gene"]= new Array();
cachetrackpos["ensembl_gene_label"] = new Array();
cachetrackpos["atom_label"] = new Array();
cylinderMap["peakline"]=[];

var phymodelMap={};

var iden_demo_3dmodel=0;


/*
*this is used to store the serial of histone mark atom  when the zoom is less than ,when uncheck, it will be recover 
************************************/
var histoneAtomIndex={};
var histoneHasDrawn={}; // used to identify whether this histone mark has been colored
var defaultTracks = getQueryString("tracks"); // used to get default tracks
var defaultZoom = getQueryString("zoom");

	//used to load datasets
	function loadInitCircos(){

		//set gldiv width
		mylayout = $('#container').layout(
		   {
		panes: {
		   resizable:true,
		   slidable:true,
		   PaneResizing:true,
		   spacing_open:6,
			spacing_closed :6}
		,
		  /* west:{
			   onclose_end:function(){			        
				   resizeCanvasSize();			     
		      },
			   onopen_end:function(){
				   resizeCanvasSize();			       
		      },
			   onresize_end:function(){			   
				   resizeCanvasSize();					
		     }
			  
		   },*/
		   
		  east:{
			  onclose_end:function(){
					resizeCanvasSize();			 
			   },
				 onopen_end:function(){
					resizeCanvasSize();						
			   },
			   onresize_end:function(){				   
					 resizeCanvasSize();						
			   }
			  
		    }
		  }
   
   );
		mylayout.hide('east');
	//	mylayout.sizePane("west", "20%");
		mylayout.sizePane("center", "90%");
		
		var ishowtracklist = getQueryString("tracklist") ;
		ishowtracklist = parseInt(ishowtracklist);
		if(ishowtracklist == 0){
			mylayout.hide('west');
			
		}
		
		resizeCanvasSize();
		if(glviewer == null){
			glviewer = $3Dmol.createViewer("gldiv");
			glviewer.setBackgroundColor(0x000000);	
		}

		
		
		//window vertical size
			$("#windowsize-vertical").slider({
			  orientation: "vertical",
			  range: "min",
			  min: 100,
			  step: 0.5,
			  max: 150,
			  showLabels:true,
			  showScale:true,
			  value: 120,
			  slide: function( event, ui ) {
			  $( "#windownamount" ).val(ui.value);
				$( "#windowsize-vertical" ).find("a").css("font-size","12px").css("color","#ff0000").css("width","25px").text(ui.value);				
			  },
			  stop: function( event, ui ) {
				if(glviewer != null ){
					//console.log("reset camera position="+ui.value);
					glviewer.setZoomZ(ui.value);
					reDrawAllSelectedForHistoneTrack();
				}
				
			  }
			});
			var windowlabel = "<p style='font-size:10px;padding-top:0px;margin-left:0px;padding-left:10px;color:#ffffff;'>150</p>";
			$("#windowsize-vertical").append(windowlabel);
			windowlabel = "<p style='font-size:10px;padding-top:170px;margin-left:0px;padding-left:15px;color:#ffffff;'>100</p>";
			$("#windowsize-vertical").append(windowlabel);
			windowlabel = "<p style='font-size:10px;padding-top:5px;margin-left:0px;padding-left:0px;color:#ffffff;'>Zoom</p>";
			$("#windowsize-vertical").append(windowlabel);
			
			
			$( "#windownamount" ).val( $( "#windowsize-vertical" ).slider( "value" ) );
			$( "#windowsize-vertical" ).find("a").css("font-size","12px").css("color","#ff0000").css("width","25px").text(120 );
		
		
		
		
		
		var conf = getQueryString("conf");
		var pos = getQueryString("loc");
		$("#idppos").html("<b>Organism:</b> "+conf+"<br/><b>Location:</b> "+pos);
		
		var t_tracks= getQueryString("tracks");
		//here
		var u_tracks="";
		if(t_tracks != null && t_tracks.length>0){
			if(t_tracks.indexOf(",") > -1 ){
				var u_array = t_tracks.split(",");
				for(var ut=0; ut < u_array.length ; ut++){
					var c_utrack = u_array[ut];
					if((c_utrack.indexOf("GSE63525") > -1 || c_utrack.indexOf("GSE35156") > -1 ||c_utrack.indexOf("GSE18199") > -1 )&&  c_utrack.indexOf("Interaction") > -1 ){
						u_tracks += "Interaction,";
					}else if((c_utrack.indexOf("GSE63525") > -1 || c_utrack.indexOf("GSE35156") > -1 ||c_utrack.indexOf("GSE18199") > -1 )&&  c_utrack.indexOf("TAD") > -1 ){
						u_tracks += "TAD,";
					}else {
						u_tracks += c_utrack+",";
					}
				}
			}else{
				u_tracks = t_tracks +",";
			}
		}
		if(u_tracks != null && u_tracks.length > 0 ){
			u_tracks =u_tracks.substring(0,u_tracks.length-1);
		}
				
		$("#idptracks").html(u_tracks);
		
		var t_model = getQueryString("model");
		var t_bin = getQueryString("bin");
		$("#idpmodel").html("<b>Name:</b> "+t_model+"<br/><b>Resolution:</b> "+t_bin);
		
		
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
		//then we add mouse move action for canvas
		
		
		var curcanvas =document.querySelector('#gldiv canvas') ;
		curcanvas.addEventListener("mousemove",function(e){
			
			var lefttop=get_page_left_top();
			var canvaspos=absolutePosition(curcanvas);
			
			var mx=e.clientX+lefttop[0] ;
			var my=e.clientY+lefttop[1] ;	
			
			var viewwidth = $("#gldiv").css("width");
			viewwidth = parseInt(viewwidth);
		
			var cachename = cachetrackpos["ensembl_gene"];
			
			var t_div=$("#tracktext");
			
			if(cachename!= null && cachename.length>0){
					for(var i=0;i<cachename.length;i++){
						var cacheobj = cachename[i];
						var cachradius = cacheobj[0];
						var cachpos = cacheobj[1];
						var cachobj = cacheobj[2];
						
					//	console.log("camerapos"+camerapos);
						var cx = cachpos[0];
						var cy = cachpos[1];
					
						var computerate = cachradius;
						
						var computeradius = computerate *viewwidth*0.5;
						
						var mouse_radius = Math.sqrt((my-cy)*(my-cy)+(mx-cx)*(mx-cx));
						
						var strand = cachobj.strand;
					
						
						//cx+computeradius
						if(mx >= (cx-1) && mx<=(cx+1) && my >= (cy-1) && my <=(cy+1)){
							
							var t_div_text="Gene Name:"+cachobj.synonym+"<br/>Strand:"+cachobj.strand+"<br/>Position:"+cachobj.chrom+":"+cachobj.start+".."+cachobj.end;
							
							var jumpurl = getJumpLink(cachobj.chrom,cachobj.start,cachobj.end);
							
						
							
							if($("#gviewid").prop("checked")){
								var gurl = getJumpLinkWithTrack(cachobj.chrom,cachobj.start,cachobj.end,"ensembl_gene");
								t_div_text +="<br/><a href='javascript:jumpGenomeView(\""+gurl+"\")' style='color:blue;'>Genome View</a>";
							
							}else{
								t_div_text +="<br/><a target='_blank' href='"+jumpurl[0]+"' style='color:blue;'>Genome View</a>";
							}
							t_div_text +="<br/><a  target='_blank' href='"+jumpurl[1]+"' style='color:blue;'>Topological View</a>";
							t_div.css("left",mx-canvaspos[0]).css("top",my-canvaspos[1]).css("width",250).css("display","block");
							
							t_div.html(t_div_text);
							
							
							
							//console.log("mouse:"+mx+","+my+",gene="+cx+","+cy+","+computeradius+","+cachobj.strand+","+cachobj.synonym+","+cachobj.chrom+","+cachobj.start+","+cachobj.end);
							break;
						}else{
							t_div.css("display","none");
						}
					
					}
			}
			
			
			
			
		});
		
		var isshowgenome = getQueryString("showGenome");
		if(isshowgenome != null && isshowgenome.indexOf("1") > -1){
			$("#gviewid").attr("checked","checked");
			showGenomeView();
		
		}
		
		//$("#idbuttontrack").draggable();
		
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
		//reset the canvas
		pageReset();
		$("#sgeneid").val("OR4G11P,RPL23AP21");		
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
				/*$("#chromid").empty();
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
							var option = "<option value=\""+physicalbean.modelName+"\">"+physicalbean.modelName+"("+physicalbean.species+")</option>";
							$("#idPhyModel").append(option);			
						}					
					}

					
				});*/
					if(data.categoryList !=undefined && data.categoryList != null){
						$.each(data.categoryList,createCategory);			
					}
						
					ChooseChrom(1);
				}
			},
			error : function(){
				alert("load tracks data error!");
			}
		});
	}
	
	
	function loadInitTrackFilterCategory(){
		var curconf = $("#dset").val();
		var params={"curDataset":curconf};
		$.ajax({
			url : '/deltaar/ajax/loadPysicalTrack.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: false,
			success : function(data){
				
				$("#trackidlist").empty();
				if(data.categoryList !=undefined && data.categoryList != null){
						$.each(data.categoryList,createCategoryFilter);			
				}
				//ChooseChrom(1);

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
		}});
		//div.css("class","header_content");
		var catid = value.name;
		
		catid = catid.replace(/\s+/g,"_");
		catid = catid.replace("/","_");
		catid = catid.replace(/\(/g,"_");
		catid = catid.replace(/\)/,"_");
		
		/*var modeltext= $('#idPhyModel option:selected').text();
		var idx1 = modeltext.indexOf("(") ;
		var idx2 = modeltext.indexOf(")") ;
		var tmp_organism= "" ;
		if( idx1 > -1 && idx2 > -1 ){
			tmp_organism = modeltext.substring(idx1+1,idx2).trim();  
		}*/
		
		var tmp_organism = getQueryString("conf");
		
		var iden_demo_3dmodel=0;
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
					   /*var option="<option value=\""+track.key+"\">"+track.key+"("+track.organism+")</option>";
						$("#idPhyModel").append(option);
						
						option = "<option value=\""+track.binsize+"\">"+track.binsize+"</option>";
						$("#idBinsize").append(option);*/
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
					  /* if(iden_demo_3dmodel ==0 ){
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
					 //  alert("3dmodel mytarkc");
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

	//filter the catergory by the organism 
	function createCategoryFilter(index,value){
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
		
	/*	var modeltext= $('#idPhyModel option:selected').text();
		var idx1 = modeltext.indexOf("(") ;
		var idx2 = modeltext.indexOf(")") ;
		var tmp_organism= "" ;
		if( idx1 > -1 && idx2 > -1 ){
			tmp_organism = modeltext.substring(idx1+1,idx2).trim();  
		}*/
		var tmp_organism = getQueryString("conf");
		
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
			   if(track.key=="ensembl_gene"){
				   cindex++;
				   //add a input textbox
				   tdval="<td><input type='text' id='idtext_ensembl_gene' /><input type='button' value='GO' onclick='showSearchGene(\"idtext_ensembl_gene\",0)' /> <input type='checkbox' id='idfocusgene' onclick='focusGivenGene()'  />Pin<br/>";
				   tdval += "<input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',"+cindex+",1)\">show genes all";
				   tdval+=" <input type='checkbox' id='tlst_"+track.key+"_showname' value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleGenename()\" />show name";
			   }
			   else if( (track.glyph == "peak"  && track.file == "tb_k562_ChiaPetCTCF" && track.file == "tb_k562_ChiaPetPol2" && track.file == "tb_helas3_ChiaPetPol2")   || (track.glyph != "tad" && typeof(phymodelMap[track.category]) == "undefined")  || track.glyph != "3dmodel") {
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
						tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',"+cindex+",1)\">"+track.key+" <img src='/deltaar/images/help.gif' onclick=\"window.location='/deltaar/pages/dataset/dataset.jsp#"+track.key;
						 var tmpkey = track.key;
						   if(tmpkey.indexOf("ChIA-PET") <0){
							   tdval += "_signal ";
						   }
						   tdval += "'\" />";
					}
					
					
				   				   
			   }
			   
			   td=$(tdval+"</td>");
			   td.appendTo(tr);//width=\"33%\"
			   
			 cindex++;
			
		
		
		
		}
		
		
		
	
		
		if(tmp_organism != "" ){
			if(value.organism == tmp_organism){
				table.appendTo(div);
				//console.log( phymodelMap[value.name].length+",,"+value.trackList.length);
				if(typeof(phymodelMap[value.name]) != "undefined" && phymodelMap[value.name] != null && phymodelMap[value.name].length>0 ){
					
				}else{
					
					$("#trackidlist").append(div);
				}
			}
		}else{
			table.appendTo(div);
			//console.log( phymodelMap[value.name].length+",,"+value.trackList.length);
			if(typeof(phymodelMap[value.name]) != "undefined" && phymodelMap[value.name] != null && phymodelMap[value.name].length>0){
				
			}else{
				$("#trackidlist").append(div);
			}
		}
		
		
		
		
	}

	// this used to turn on draw track picture or turn off
	//genome flag : 1 represent use genome view, 0 reperesent not use this function 

	function toggleTrack(category,track,index,genomeflag){
		//alert("physical view");
		//identify the histone mark number need less than maximum selected track	
		var checktracklist = $("#trackid input:checkbox:checked"); // 
		var neededtracknumber = checktracklist.length ; //annotated tracks number
		if(neededtracknumber > MAX_TRACK_COUNT){
			$('<div></div>').appendTo('body')
							  .html('<div style=\"margin-top:10px;\"><h6>The suggested maximum number of checked annotated tracks for Hololens is <strong> '+MAX_TRACK_COUNT+'</strong></h6></div>')
							  .dialog({
								  modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
								  width: 'auto', resizable: false,						 
								  close: function (event, ui) {
									  //remove from cookie
									  $("#tlst_"+track).attr("checked",false);
									  $("#ctlst_"+track).attr("checked",false);
									  deleteTrackFromCookie(track);	
									    $("#idpwait").css("display","none");
									  $(this).remove();
								  }
							});
			return;
	  }
		$("#waitimgid").css("display","");	
		$("#container").removeClass();
		$("#container").addClass("transparent_class");	
		$("#container").addClass("ui-layout-container");
		
	
		var check = $("#tlst_"+track).prop('checked');
	
		var conf = $("#dset").val();
		var t_dataid = $("#dset option:selected").text();
		//get current model organism
		var t_org = getOrganismFromModel();
		
		
		$.get("/deltaar/"+conf+".json",function(result){
		   
			var json_obj = eval(result);
		
			for(i=0 ; i<json_obj.length;i++){
				var ca_obj = json_obj[i];
			//	alert(t_org);
				if(category == ca_obj.name && ca_obj.organism != "" &&  ca_obj.organism == t_org ){
				   // alert(category);
					for(j=0;j<ca_obj.trackList.length;j++){
						
						var track_obj = ca_obj.trackList[j];
						track_obj.trackid = t_dataid;
					//	alert(track_obj.key);
						//alert("track code="+track+","+track_obj.key);
						if(track_obj.key == track){ // have found this track	
							
							if(track_obj.glyph =="3dmodel"){	
								//if(check){
									cur3dmodel_obj = null ;
									uncheck3Dmodel();
									//remove track from cookie
								   deleteTrackFromCookie(track);
									
								    cur3dmodel =  track;
									cur3dmodel_obj = track_obj;
									if(track_obj.binsize != null){
										bin_size = track_obj.binsize;
									}
									if(track_obj.startBin != null){
										start_bin = track_obj.startBin;
									}
									
									draw3dmodel(track_obj.file,track_obj.storage,index);// here index identify whether redrawtracks	
									
									//set cookie
									addTrackToCookie(track);
								//}else{
								//	cur3dmodel_obj = null ;
								//	uncheck3Dmodel();
									//remove track from cookie
								//	deleteTrackFromCookie(track);
								//}
								
							}else if(track_obj.glyph =="sphere"){	//change view mode to shpere										
								if(check){
									var cur_track=$("#track_"+track_obj.key);							
									drawSphere(track_obj.file);	
									addTrackToCookie(track);		
								}else{
									//get the track height
									uncheckDrawSphere(track_obj.file);
									//remove track from cookie
									deleteTrackFromCookie(track);
								}
								
							}else if(track_obj.glyph =="line"){	//change view mode to line					
								if(check){
									drawTADTrack(track_obj.file);
									
									//set cookie
									addTrackToCookie(track);
									
									//send exchange data
									
									
									
								}else{							
									uncheckDrawTADTrack(track_obj.file);
									
									//remove track from cookie
									deleteTrackFromCookie(track);
								}					
							}else if(track_obj.glyph =="gene"){ //show gene around shpere
								if(check){
									//check show gene name
									 if($("#tlst_"+track).is(":checked")){
										cachetrackpos[track] = new Array();
										loadKnownGene(track,track_obj.organism,track_obj);											
									}
									if(genomeflag == 1){
											if($("#gviewid").prop("checked")){
											  var jumptracks = [];
											  jumptracks.push(track_obj.key);
											  
											  var iframe = document.getElementById("gviewframeid");
											  if (iframe) {
												   var iframeContent = (iframe.contentWindow || iframe.contentDocument);												 
												   iframeContent.AddTracks(jumptracks);
											  }											  
											}											
									}	

								//	callDeltaAR();
																		
								}else{
									//need to set genedrawn flag to 0
										clearCylinderByKey(track_obj.key);
										var geneblearry = cachetrackpos[track+"_label"];
										if(geneblearry!= null && geneblearry.length>0){
											for(var mcindex =0 ;mcindex<geneblearry.length;mcindex++){
												var rmlabel = geneblearry[mcindex];		
												if(rmlabel != null){
													glviewer.removeLabel(rmlabel);
												}
												
											}										
										}
										cachetrackpos[track+"_label"]=new Array();	
										
										
										glviewer.render();
								//		$("#sgeneid").val("RPL23AP21");
									//	$("#idtext_ensembl_gene").val("");
										cachetrackpos[track] = new Array();
										removeTrackColorMap("ensembl_gene");
										removeTrackColorMap(track);
										focusAtom = null;
										
										
										//callDeltaAR();
								}
							}
							
							
							else if(track_obj.glyph =="circle"){ // this will draw a circle around sphere
								var zoomval = glviewer.getZoomZ();
								if(check){	
								//alert("circle track="+track);
								//call show histone mark
										hasdrawn =0;
										var track_index;
										if(histoneCylinderIndex[track_obj.key] != null){
											track_index = histoneCylinderIndex[track_obj.key];
										}else if(histoneCylinderIndex!=null ){
											//track_index = Object.keys(histoneCylinderIndex).length ;	
											if(delHidstoneCylinderIndex.length>0){
											
												track_index = delHidstoneCylinderIndex[0];
												histoneCylinderIndex[track_obj.key] =track_index;
											    delHidstoneCylinderIndex.splice(0,1);
												
											}else{
											
												track_index = Object.keys(histoneCylinderIndex).length ;	
												histoneCylinderIndex[track_obj.key] = track_index;
											}
										}
										
										//here we need to add a track to draw board
									//	console.log("drawn track index="+track_index);
										var track_color = "red";
										if(track_index < 6){
											track_color = colorMap[track_index];
										}
											
										
										ShowTrackColorMap(ca_obj.name,track_obj.key,track_color,track_obj.glyph); //category, trackkey, trackcolor
										if(track_obj.category == "My Track"){
											drawCircleFromFile(track_obj.file,track_obj.storage,track_obj.key,track_color,track_obj.organism,track_index);
										}else{
											drawCircleAroundSphere(track_obj.file,track_obj.storage,track_obj.key,track_color,track_obj.organism,track_index);
										}
										
									    
										
										
										//set cookie
											
										//callDeltaAR();
								}else{
									
									//remove circle around shpere of this track
									removeTrackColorMap(track_obj.key);
									if( histoneCylinderIndex[track_obj.key] != null ){ // store delete track index
										delHidstoneCylinderIndex.push(histoneCylinderIndex[track_obj.key]);
										delete histoneCylinderIndex[track_obj.key] ;
									}
									if(zoomval<144){
										if(histoneAtomIndex[track_obj.key] != null && histoneAtomIndex[track_obj.key].length>0){
											
										var hisarry = histoneAtomIndex[track_obj.key];
										for(var mcindex =0 ;mcindex<hisarry.length;mcindex++){
											var atomindex =hisarry[mcindex];
											glviewer.setStyle({serial:atomindex},{sphere:{radius:sphere_radius,color:"white",clickable: true, callback: showJumpMenu},stick:{radius:bond_width,color:"white"}});	
										}
										
										delete histoneAtomIndex[track_obj.key];
									 }
									}else{
										clearCylinderByKey(track_obj.key);
									}
									glviewer.render();
																								
									
									//callDeltaAR();
								}
							}else if(track_obj.glyph =="peak"){ //Peak	
								//alert(track);
								if(check){
								//	alert("draw peak");
									
									drawPeakTrack(track_obj);									
									
									
									ShowTrackColorMap(ca_obj.name,track_obj.key,"red","dashedline"); 	
									//callDeltaAR();
								}else{							
									uncheckDrawPeakTrack(track_obj);									

									removeTrackColorMap(track_obj.key);
								//	callDeltaAR();
								}																			
							}else if(track_obj.glyph =="tad"){ //TAD
								if(check){
									drawTADSurfaceTrack(track_obj);									
										//callDeltaAR();
								}else{							
									uncheckDrawTADSurfaceTrack(track_obj);									
									removeTrackColorMap(track_obj.key);
									
								
									//callDeltaAR();	
								}			
							}		
							break;
						}
					}
					break;
				}
			}
			$("#idpwait").css("display","none"); //child window
			$("#waitimgid").css("display","none");	
			$("#container").removeClass("transparent_class");	
			
		}); //.get

	}
	
	
	function toggleGenename(){
		
		var geneblearry = cachetrackpos["ensembl_gene_label"];
		if(geneblearry!= null && geneblearry.length>0){
			for(var mcindex =0 ;mcindex<geneblearry.length;mcindex++){
				var rmlabel = geneblearry[mcindex];	
				if(rmlabel != null ){
					try{
						glviewer.removeLabel(rmlabel);
					}catch(e){
						console.log("remove gene label error");
					}
					
				}
				
			}																																	
			glviewer.render();	
		}
		cachetrackpos["ensembl_gene_label"]=new Array();	
		
		var t_cachetrackpos={};
		t_cachetrackpos["ensembl_gene"]=new Array();
		if($("#tlst_ensembl_gene_showname").prop('checked')){
			//show gene label
			var cachename = cachetrackpos["ensembl_gene"];

			if(cachename!= null && cachename.length>0){
				
				for(var i=0;i<cachename.length;i++){
					var cacheobj = cachename[i];												
					var geneobj = cacheobj[2];
					var genepos =cacheobj[3]; 
					var fontcolor="red";
					if(geneobj.strand.indexOf("-1") > -1){ //minus strand
						fontcolor="blue";	
					}
					
					
					var genelabel = glviewer.addLabel(geneobj.synonym,{fontSize: 10,padding: 5,fontColor:fontcolor, position: {x:genepos.x, y: genepos.y, z: genepos.z},showBackground:'0' , inFront: true,backgroundColor:"rgb(255,255,255,1)"});
					
					
					var cachearry=new Array(0,0,geneobj,genepos);//length
					t_cachetrackpos["ensembl_gene"].push(cachearry);	
					
					cachetrackpos["ensembl_gene_label"].push(genelabel);
				}
				glviewer.render();	
			}
			cachetrackpos["ensembl_gene"]=[];	
			cachetrackpos["ensembl_gene"] = t_cachetrackpos["ensembl_gene"];	
		}
	}
	
	/*****
	**here we only process the histone mark, since it will be drawn automatically when zoom
	***********************************/
	
	function toggleAutoTrack(category,track,trackindex){
		var check = $("#tlst_"+track).prop('checked');
		var conf = $("#dset").val();

		var t_dataid = $("#dset option:selected").text();
		var t_org = getOrganismFromModel();
		$.get("/deltaar/"+conf+".json",function(result){
			var json_obj = eval(result);
			
			for(i=0 ; i<json_obj.length;i++){
				var ca_obj = json_obj[i];
				if(category == ca_obj.name && ca_obj.organism != "" &&  ca_obj.organism == t_org){
				  
					for(j=0;j<ca_obj.trackList.length;j++){
		
						var track_obj = ca_obj.trackList[j];
						track_obj.trackid = t_dataid;
					
						if(track_obj.key == track){
							
		
						// have found this track					
							if(track_obj.glyph =="circle"){ // this will draw a circle around sphere
								if(check){
									// we do not use track color itself, but assign a given color
									
									var track_index;
										if(histoneCylinderIndex[track_obj.key] != null){
											track_index = histoneCylinderIndex[track_obj.key];
											
										}else if(histoneCylinderIndex!=null ){
										
											if(delHidstoneCylinderIndex.length>0){
												
												track_index = delHidstoneCylinderIndex[0];
												histoneCylinderIndex[track_obj.key] =track_index;
											    delHidstoneCylinderIndex.splice(0,1);
												
											}else{
											
												track_index = Object.keys(histoneCylinderIndex).length ;	
												histoneCylinderIndex[track_obj.key] = track_index;
											}
										}
										
										//here we need to add a track to draw board
									//	console.log("drawn track index="+track_index);
										var track_color = "red";
										if(track_index < 6){
											track_color = colorMap[track_index];
										}
										
										
									ShowTrackColorMap(ca_obj.name,track_obj.key,track_color,track_obj.glyph); //category, trackkey, trackcolor
									if(track_obj.category == "My Track"){
										drawCircleFromFile(track_obj.file,track_obj.storage,track_obj.key,track_color,track_obj.organism,trackindex);
									}else{
									//	console.log("============draw circle around sphere ==============="+track_obj.key);
										drawCircleAroundSphere(track_obj.file,track_obj.storage,track_obj.key,track_color,track_obj.organism,trackindex);
										
									}
									
									
								}else{
									//remove cylinder circle
												//console.log("===========================draw circle uncheck======================");
								}
							}else if(track_obj.glyph =="gene"){
								if(check){
									
									var zoomval = glviewer.getZoomZ();
									if(zoomval >= 145 && zoomval <=149.2 ){
								
										showKnownGene(track,track_obj.organism,track_obj);	
									}
								}																
							}		
							break;
						}
					}
					break;
				}
			}
			
			
			
			

		}); //.get

	}
	

	//drawBACH("/deltaar/json/physical/GSE43070/batch_modify.xyz");
	//draw3dmodel("/deltaar/json/physical/GSE43070/batch.json");
	function draw3dmodel(file,storage,flag){
			
			//clear the current 3dmodel 
			if(glviewer != null){
				glviewer.removeAllShapes();
				glviewer.removeModel(cmodel);		
				glviewer.clear();				
			}
		
			file = resolveURL(file);
			$.get(file,function(value){
			
					var xyzval = value;
					
					
					moldata = data = xyzval;

					if(glviewer == null){
						glviewer = $3Dmol.createViewer("gldiv");
					}
					
					
					view_model =2;
					glviewer.setBackgroundColor(0x000000);
				//	console.log("==========storage ==="+storage);
			
					cmodel = m = glviewer.addModel(data, storage);
				
					
					if(storage == "xyz"){
						glviewer.setStyle({},{sphere:{radius:sphere_radius,wireframe:true,color:"white",clickable: true, callback: showJumpMenu},stick:{radius:bond_width,color:"white"}});
					
						var posarry = parseCurrentGenomePosition();
					
						queryAtomsByPos(posarry[0],posarry[1],posarry[2]);
						
					}
					
					var mzval = $("#windownamount").val();
					
					if(defaultZoom != null ){
						mzval = defaultZoom ;
						if(defaultZoom >= 100 && defaultZoom<=150){
							var bottom = (defaultZoom - 100)/50 *100;
						
						
							var vtext= defaultZoom+"";
							if(vtext.indexOf(".") > -1 ){
								var idex = vtext.indexOf(".") ;
								var v1 = vtext.substring(0,idex);
								var v2 = vtext.substring(idex+1,idex+3);
								vtext = v1+"."+v2;
							}
						
							$( "#windowsize-vertical" ).find("a").css("font-size","12px").css("color","#ff0000").css("width","25px").css("bottom",bottom+"%").text(vtext );
						}
					}
					glviewer.zoomTo({});
					glviewer.setZoomZ(mzval);
					glviewer.render();
					//glviewer.setStyle({},{sphere:{radius:sphere_radius,wireframe:true,color:"white",clickable: true, callback: showJumpMenu},line:{linewidth:"20",color:"white",wireframe:true}});
					if(flag > 0 ){
							reDrawAllSelectedTrack(1,1);
					}
				
					//here, checked default tracks
					if(defaultTracks != null){
						var trackarry = defaultTracks.split(",");
						for(var i=0;i<trackarry.length;i++){
							var dtrack = trackarry[i];
							
							if(dtrack.indexOf('3dmodel')<0){
							
								$("#tlst_"+dtrack).attr("checked",true);
							}
							
						}
						reDrawAllSelectedTrack(0,1);
					}
				
				
					
					
				});
	}

	function uncheck3Dmodel(){
		glviewer.removeAllShapes();
		glviewer.removeModel(cmodel);
		
		glviewer.clear();
		//cmodel = null;
	}


	function drawQuery3D(){
		
		//var pos = $("#curpos").val();
		var pos = getQueryString("loc");
		var dataset = $("#dset").val();
		var params = {"position":pos,"dataset":dataset};
		var index1 = pos.indexOf(":");
		var index2 = pos.indexOf(".");
		var chrtmp = pos.substring(0,index1);
		$("#chromid").val(chrtmp);
		var pos_starttmp = pos.substring(index1+1,index2);
		var pos_endtmp = pos.substring(index2+2,pos.length);
		
		pos_starttmp = parseInt(pos_starttmp);
		
		pos_endtmp = parseInt(pos_endtmp);
		if(pos_starttmp > pos_endtmp || pos_starttmp <0 || pos_endtmp <0 ){
				$('<div></div>').appendTo('body')
						  .html('<div style=\"margin-top:20px;\"><h6>The end position should larger than the start position </h6></div>')
						  .dialog({
							  modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
							  width: 'auto', resizable: false,						 
							  close: function (event, ui) {
								  $(this).remove();
							  }
			});
			
			return ;
		}
		
		chrom=chrtmp;
		pos_start= pos_starttmp;
		pos_end= pos_endtmp;
		//console.log("==========="+cur3dmodel_obj+",");
		if(cur3dmodel_obj != null){
			var zoomval = glviewer.getZoomZ();
			if(cur3dmodel_obj.startBin != null){
					start_bin = cur3dmodel_obj.startBin;
			}
			draw3dmodel(cur3dmodel_obj.file,cur3dmodel_obj.storage,1);	//redraw all tracks
			glviewer.setZoomZ(zoomval);			
		}

		var checked = $("#gviewid");
		if(checked.prop("checked")){	
			var jumptracks = synchronizeAllToGenomeViewTracksName();
			var iframe = document.getElementById("gviewframeid");
			if (iframe) {			
				var iframeContent = (iframe.contentWindow || iframe.contentDocument);	
				if(chrom == "X"){
					iframeContent.RefreshGenomeView("chr"+pos,jumptracks);
				}else{
					iframeContent.RefreshGenomeView(pos,jumptracks);
				}
				
			}					
		}						
		
		
	//	Cookies.set("physical_position",pos, { path: 'physical'  });
	//	Cookies.set("physical_dataset",dataset, { path: 'physical'  });
		
	}
	
	function queryAtomsByPos(querychr,querystart,queryend){
		//console.log(querychr+","+querystart+","+queryend);
		if(cmodel != null){
		var ratoms=[];
			var atoms = cmodel.selectedAtoms({});
		//	console.log("=================atoms========="+atoms.length);
			for(i=0;i<atoms.length;i++){
				var atomprop = atoms[i].properties;				
				if(atomprop.chr== querychr && atomprop.start>= querystart && atomprop.end <= queryend){				
					ratoms.push(atoms[i]);
				}
			
			}
			//clear the drawn track at the same time for the remove atoms
			
			cmodel.removeAtoms(atoms);
			cmodel.addAtoms(ratoms);
			glviewer.render();
		}
	
	}
	
	function drawSphere(jsonfile){		
			//here, we need to represent the value as different coclor in the physical model
			//first, we need to load the value, may be float value 1,2,3,4,5,6,7 for each atoms 
			jsonfile = resolveURL(jsonfile);
			$.get(jsonfile,function(value){
				if(value != null ){
					var arry= value.split(",");
					for(var i=0;i<arry.length;i++){
						//then change the value to heatmap color
						var cr = getHeatmapColor(arry[i]);
						glviewer.setStyle({serial:i}, {sphere:{radius:sphere_radius,color:cr},stick:{radius:bond_width,color:"white"}});						
						//glviewer.setStyle({},{sphere:{radius:0.05,color:"white",clickable: true, callback: showJumpMenu},line:{linewidth:1,color:"white"}});
			
						glviewer.render();
					}
				}
			});
		
	}
	
	
	function uncheckDrawSphere(jsonfile){

			jsonfile = resolveURL(jsonfile);
			$.get(jsonfile,function(value){
				if(value != null ){
					var arry= value.split(",");
					for(var i=0;i<arry.length;i++){
						//then change the value to heatmap color
						
						glviewer.setStyle({serial:i}, {sphere:{radius:sphere_radius,color:"white"},stick:{radius:bond_width,color:"white"}});						
						//glviewer.setStyle({},{sphere:{radius:0.05,color:"white",clickable: true, callback: showJumpMenu},line:{linewidth:1,color:"white"}});
			
						glviewer.render();
					}
				}
			});
	}
	
	
	//this is used to draw tad tarck
	function drawTADTrack(jsonfile){
		//glviewer.removeAllShapes();

			jsonfile = resolveURL(jsonfile);
			$.get(jsonfile,function(value){
				if(value != null){
						var arry = value.split("|");
						for(i=0;i<arry.length;i++){
							var tad_domain = arry[i].split(";"); // on color for each one
							
							var paint_color = getColor(i);
							
							//we need to identify the TAD color and the atom
							//if line model ,we need to draw lineHeight
							// if sphere , we need to set color
							for(j=0;j<tad_domain.length;j++){
								var tad_elem = tad_domain[j].split(",");
								var atomarry =[];
								for(k=0;k<tad_elem.length;k++){
									
									var ai= tad_elem[k];
									
									if(view_model == 2){ //sphare
										glviewer.setStyle({serial:ai}, {sphere:{radius:sphere_radius,color:paint_color},stick:{radius:bond_width,color: "white"}});
									}else{ //line										
											atomarry.push(ai);																				
									}
								}
								
								if(view_model == 1){
									glviewer.setStyle({serial:atomarry}, {stick:{radius:bond_width,color: paint_color}});
									
								}
								glviewer.render();
							
							}	
						
						}
				}
			});	
		
	}
	
	
	
	function uncheckDrawTADTrack(jsonfile){

			jsonfile = resolveURL(jsonfile);
		    $.get(jsonfile,function(value){
				if(value != null){
						var arry = value.split("|");
						for(i=0;i<arry.length;i++){
							var tad_domain = arry[i].split(";"); // on color for each one
							
							var paint_color = getColor(i);
							
							//we need to identify the TAD color and the atom
							//if line model ,we need to draw lineHeight
							// if sphere , we need to set color
							for(j=0;j<tad_domain.length;j++){
								var tad_elem = tad_domain[j].split(",");
								var atomarry =[];
								for(k=0;k<tad_elem.length;k++){
									
									var ai= tad_elem[k];
									
									if(view_model == 2){ //sphare
										glviewer.setStyle({serial:ai}, {sphere:{radius:sphere_radius,color:"white"},stick:{radius:bond_width,color: "white"}});
									}else{ //line
									   atomarry.push(ai);											
									}
								}
								if(view_model ==1){
									glviewer.setStyle({serial:atomarry}, {stick:{radius:bond_width,color: "white"}});
								
								}
									
								glviewer.render();
							
							}	
						
						}
				}
			});	
	}
	
	function getColor(index){
		
		var colorbrewer = {
				YlOrRd: {
					3: ["#ffeda0","#feb24c","#f03b20"],
					4: ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
					5: ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
					6: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
					7: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
					8: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
					9: ["0xffffcc","0xffeda0","0xfed976","0xfeb24c","0xfd8d3c","0xfc4e2a","0xe31a1c","0xbd0026","0x800026"]
				}
	   		};
		var colors = colorbrewer.YlOrRd[9];
		return colors[index];
	
	}
	
	//show a menu of chrom position
	//position: chr1:1...120000
	//link: jbrowse/physical
	//we will use this.x this.y this.z to link to the source position of this atom
	function showJumpMenu(){
		//get the position of the seletcted item
		
		/*var jumpArry= getJumpLink(this.properties.chr,this.properties.start,this.properties.end);
		//console.log("click position="+this.properties.chr+","+this.properties.start+","+this.properties.end);
		$("#idgenomelink").attr("href",jumpArry[0]);
		$("#idcircletlink").attr("href",jumpArry[1]);
		
		
		var item_pos = "Position:"+this.properties.chr+":"+this.properties.start+".."+this.properties.end;
		$("#itempos").html(item_pos);*/
		//var shape = new $3Dmol.GLShape(this);
		//glviewer.addSphere({center:{x:this.x,y:this.y,z:this.z},radius:sphere_radius,wireframe:true,color:"red",opcity:0.9,clickable: false});
		
		//glviewer.render();
		if(SELECTATOM == null ){
			SELECTATOM = this;
		}else{
			glviewer.setStyle({serial:SELECTATOM.serial}, {sphere:{radius:sphere_radius,color:"white"},stick:{radius:bond_width,color: "white"}}); //reset last selectd atom
			SELECTATOM = this;
		}
		
		
		var selectradius= sphere_radius;
		
		glviewer.setStyle({serial:this.serial}, {sphere:{radius:selectradius,color:"teal",alpha:0.1},stick:{radius:bond_width,color: "white"}});
		
		glviewer.render();
		
		var item_pos = this.properties.chr+":"+this.properties.start+".."+this.properties.end;
		//when genome view check,need to synchronized to genome view
		var checked = $("#gviewid");
		if(checked.prop("checked")){
			
			var jumptracks = synchronizeAllToGenomeViewTracksName();
			var iframe = document.getElementById("gviewframeid");
			if (iframe) {
				var iframeContent = (iframe.contentWindow || iframe.contentDocument);												 
					//iframeContent.RefreshGenomeView(item_pos,jumptracks);
					if(this.properties.chr == "X"){
						iframeContent.HighlightGenomeView("chr"+item_pos,jumptracks);
					}else{
						iframeContent.HighlightGenomeView(item_pos,jumptracks);
					}
					
			}					
			// $("#gviewframeid").attr("src",jumpArry[0]);
		}
	}

	

	
	
	
	function getHeatmapColor(quality){
	
	
			var colorbrewer = {
				YlOrRd: {
					3: ["#ffeda0","#feb24c","#f03b20"],
					4: ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
					5: ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
					6: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
					7: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
					8: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
					9: ["0xffffcc","0xffeda0","0xfed976","0xfeb24c","0xfd8d3c","0xfc4e2a","0xe31a1c","0xbd0026","0x800026"]
				},
				Reds:{
						1:["#fee0d2","#fc9272","#de2d26"]
				}
	   		};
	
			var color_range = colorbrewer.YlOrRd[9];
			var min_val = 0;
			var max_val = 1;
			var qual_score =  quality;
			var tc = parseInt((qual_score-min_val)*8/(max_val-min_val));
			var tc_color = color_range[tc];
			return tc_color;
	}
	
	
	
	//this is used to draw the 3d position as sphare
	function changeSphareModel(){
				view_model=2;
				glviewer.removeAllShapes();
				glviewer.render();
								
				glviewer.setStyle({},{sphere:{radius:sphere_radius,color:"white",clickable: true, callback: showJumpMenu},stick:{radius:bond_width,color:"white"}});
				glviewer.render();
	}
	
	
	
	//this is used to draw the 3d position as line and color
	function changeLineModel(){
		glviewer.removeAllShapes();
		glviewer.render();
		view_model=1;
		
		glviewer.setStyle({},{line:{linewidth:model_line_width,color:"white"}});			
		   // glviewer.setStyle({},{line:{linewidth:1,color:"blue"}}); 
		glviewer.render();
}
		
	
	// this is used to show or hide atoms labels
	// we will the serial number
	// view line 24070  
	function showOrHideLabel(){
		//identify whether the checkbox has been selected
		if($("#labelid").is(':checked')){
			//alert("checked");
			if( cmodel != null ){
			var atoms = cmodel.selectedAtoms({});
			cachetrackpos["atom_label"]=new Array();
			for(var i=0;i< atoms.length;i++){
				var atom = atoms[i];
				var labelText = atom.serial;
				
				var t_label = glviewer.addLabel(labelText, {fontSize: 12,fontColor:"blue", position: {x:atom.x, y: atom.y, z: atom.z },showBackground:'0' , inFront: true,backgroundColor:"rgb(255,255,255,1)"});
				cachetrackpos["atom_label"].push(t_label);
			
			 }
		 }
		
		}else{
			//here, we only need to remove the atom label
			var t_lables = cachetrackpos["atom_label"];
			for (var i = 0; i < t_lables.length; i++) {
				var t_label = t_lables[i];
				if(t_label != null){
					glviewer.removeLabel(t_label);
				}
				 
			}

			glviewer.render();
		
		}
	}
	
//reset page
function pageReset(){
	$("div[id^='track_']").remove();	
}
	
	
//save track and chrom position
function addcookie(){
		
		
}
	
//this used to change chrom information 
//flag == 1 , from initialize or else need to change chrom directly
function ChooseChrom(flag){
	

	//var c_pos = Cookies.get("physical_position"); 
	
	var loc = getQueryString("loc");
	if(flag == 1 &&loc != null){ // first identify url param
	//	$("#curpos").val(loc);
		
		var index1 = loc.indexOf(":");
		var index2 = loc.indexOf(".");
		var chrtmp = loc.substring(0,index1);
		//$("#chromid").val(chrtmp);
		var pos_starttmp = loc.substring(index1+1,index2);
		var pos_endtmp = loc.substring(index2+2,loc.length);
		chrom=chrtmp;
		pos_start= pos_starttmp;
		pos_end= pos_endtmp;
		
	}else{
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
	
	var dtrack = getQueryString("model");;
		
	if(dtrack!=null){
		if(cur3dmodel == null){
			cur3dmodel = dtrack;		
		}
	}
	
	

	
	if(cur3dmodel != null){
		//$("#tlst_"+cur3dmodel).prop("checked",true);
		//here, set default 3dmodel from dataset list
		
		if(cur3dmodel_obj != null ){
			cur3dmodel = cur3dmodel_obj.code;
		}
		uncheck3Dmodel();
		chooseGiven3DmodelFunc(cur3dmodel,flag);		
	}
	
	

}

//show upload dialog
function showUploadDialog(){
	$("#physical-upload").dialog({
		"title": "upload track",
		"width" : 650,
		"height" : 500
	});
	
	
}



function loadKnownGene(code,organism,trackobj){
	var checked = $("#tlst_"+code);
	if(checked.prop("checked")){
				if(trackobj.category == "My Track"||trackobj.category == "paternal_50000"||trackobj.category == "maternal_50000"){
					showKnownGene(code,organism,trackobj);
				}else{
						$('<div></div>').appendTo('body')
					  .html('<div style=\"margin-top:10px;font-size:14px;\">To active "Show Genes All" funtion will wait for a long time. <br/>Are you sure continue?</div>')
					  .dialog({
						  modal: true, title: 'Warning', zIndex: 10000, autoOpen: true,
						  width: 'auto', resizable: false,
						  buttons: {
							  Yes: function () {
								showKnownGene(code,organism,trackobj);
								 $(this).dialog("close");
							  },
							  No: function () { 
								 $("#tlst_"+code).attr("checked",false);
								 deleteTrackFromCookie("ensembl_gene");
								 $(this).dialog("close");
							  }
						  },
						  close: function (event, ui) {
							  
							  $(this).remove();
						  }
					});	
				}		
	}
}

//show known gene
function showKnownGene(code,organism,trackobj){
		
		var checked = $("#tlst_"+code);
		if(checked.prop("checked")){
	
		$("#sgeneid").val("");		
		$("#waitimgid").css("display","");	
		$("#container").removeClass();
		$("#container").addClass("transparent_class");	
		$("#container").addClass("ui-layout-container");
		
		processKnownGeneModel(code,organism,trackobj); 
		

	

		ShowTrackColorMap(trackobj.category,trackobj.key,trackobj.color,trackobj.glyph); //ShowTrackColorMap(category,trackkey,trackcolor)
	}

}


//show search gene  limit 50
function showSearchGene(gtextid,focusflag){

     var genename = $("#"+gtextid).val();
	if(genename != null && genename.length > 0){
		
		
		processGeneMap3DModel(1,200,-1,genename,focusflag);
		
		//glviewer.render();
		//glviewer.zoom(zoomscale);
	}else{
		$('<div></div>').appendTo('body')
					  .html('<div style=\"margin-top:10px;\"><h6>please input gene name</h6></div>')
					  .dialog({
						  modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
						  width: 'auto', resizable: false,						 
						  close: function (event, ui) {
							  $(this).remove();
						  }
		});
	}
	
	ShowTrackColorMap("human/Ensembl Gene","ensembl_gene","","gene"); 
	
}


function processKnownGeneModel(track,organism,trackobj){
	
	$("#idgenetable").empty();
	var table = $("<table></table>",{
					id: "genet5",
					css:{
						"text-align": "center"
					}}).addClass("table5");
					var th = $("<tr><th>Gene Name</th><th>Chrom</th><th>Start</th><th>End</th><th>Strand</th><th>Atom serial</th><th>X</th><th>Y</th><th>Z</th><th>Atom Region</th></tr>");
	table.append(th);
    $("#idgenetable").append(table);
	var atoms = glviewer.getAvailableAtoms(track,organism,trackobj);
	
}




function processGeneMap3DModel(pageNo,pageSize,rowCount,genename,focusflag){
	//var p_pos = $("#curpos").val();
	var p_pos = getQueryString("loc");
	var focusgene = genename;
	if(genename.indexOf(",") > -1) {
		var genearry = genename.split(",");
		if(genearry != null && genearry.length>0 ){
			focusgene = genearry[0];
		}
		
	}
	
	var t_org = getOrganismFromModel();
	var params={"position":p_pos,"organism":t_org,"param":genename,"pageNo":pageNo,"pageSize":pageSize,"totalCount":rowCount};
	$.ajax({
			url : '/deltaar/ajax/ajaxSearchGene.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: true,
			success : function(data){
				//console.log(data.genelist);		
				//need to identify the tss 
				$("#idgenetable").html("");
							
				if(data.genelist != null){
					
					//show gene list in table 
					var table = $("<table></table>",{
					css:{
						"text-align": "center"
					}}).addClass("table5");
					var th = $("<tr><th>Gene Name</th><th>Chrom</th><th>Start</th><th>End</th><th>Strand</th><th>Atom serial</th><th>X</th><th>Y</th><th>Z</th><th>Atom Region</th></tr>");
					table.append(th);
				
					
					//show gene list in items 
					var atoms = cmodel.selectedAtoms({});
					
					var f_count = -1 ;
					if(cylinderMap["ensembl_gene"] == null ){
						cylinderMap["ensembl_gene"] = [];
					}
					
					//here ,we need to get current view region scope
					var genomepos = parseCurrentGenomePosition();
				
				    for(i=0;i<atoms.length;i++){
							var p_atom = atoms[i];
							
							var atomprop = p_atom.properties;
							var padding=8;
							for(j=0;j<data.genelist.length;j++){
								
									var geneobj = data.genelist[j]; //each gene
									var fontcolor="red"; //forward strand
									var circlecolor="0xFF69B4";//DeepPink
									var genestart = geneobj.start;
									var geneend = geneobj.end;
									
									if(geneobj.strand.indexOf("-1") > -1){ //minus strand
										//fontcolor="blue";
										circlecolor="0x6495ED";//Navy	
										genestart = geneobj.end;
										geneend = geneobj.start;
									}
									
							         var cyradius = 0 ; 
									 //
									 
								
									 
									if( (atomprop.chr == genomepos[0] && !(atomprop.end < genomepos[1]|| atomprop.start > genomepos[2]) ) && atomprop.chr == geneobj.chrom){	
									
									
										if( genestart >= atomprop.start && genestart <= atomprop.end){
											cyradius = (genestart - atomprop.start)/(atomprop.end - atomprop.start) * sphere_radius *2;
										}else if( geneend >= atomprop.start && geneend <= atomprop.end ){
											cyradius = (geneend - atomprop.start)/(atomprop.end - atomprop.start) * sphere_radius *2;
										}else if( (genestart < atomprop.start && geneend > atomprop.end)||(geneend < atomprop.start && genestart > atomprop.end) ){
											cyradius = 0.02;
										}
									
										if( cyradius >0 ){
												
												if(f_count <0 && focusgene.indexOf(geneobj.synonym) > -1){
													f_count = 0 ;
													focusAtom = p_atom;
													
												}
											
												//need to add gene label																			
												var preatom;
												var natom;
												
												if(i>0 && i< (atoms.length-1)){
													preatom = atoms[i-1];
													natom = atoms[i+1];
												}else if(i==0){
													preatom = atoms[2];
													natom = atoms[1];
												} else if( i == (atoms.length-1)){
													preatom = atoms[i-1];
													natom = atoms[i-2];
												}
												
												var res =getCircleVector(cyradius,preatom,p_atom,natom);
												cyradius = Math.abs(cyradius);
												var usecyradius = cyradius -sphere_radius>0 ?(cyradius -sphere_radius)/2: cyradius/2;
												
												var yaxis = Math.sqrt(sphere_radius * sphere_radius - usecyradius * usecyradius);
												
												var start = res[0];
												var end = res[1];
											
												//whether can transform to two dimension
																						
												if(start != null && end != null){
													var drawradius = yaxis + 0.002;
													var cynlinder = glviewer.addCylinder({start: start,end: end,radius:drawradius, tocap:true,color:circlecolor});
													cylinderShapes.push(cynlinder);
													cylinderMap["ensembl_gene"].push(cynlinder);
													var screenpos = glviewer.toScreenPosition(cynlinder);						
												}
												
												//glviewer.addArrow({start:start ,end: end,radius:0.05});
												if(end != null){
													var glabel = glviewer.addLabel(geneobj.synonym,{fontSize: 10,padding: padding,fontColor:fontcolor, position: {x:end.x, y: end.y, z: end.z},showBackground:'0' , inFront: true,backgroundColor:"rgb(255,255,255,1)"});		
													cachetrackpos["ensembl_gene_label"].push(glabel);
													if($("#tlst_ensembl_gene_showname").prop("checked") == false){
														$("#tlst_ensembl_gene_showname").prop("checked",true) ;
													}
													
												}																				
												var row=$("<tr><td>"+geneobj.synonym+"</td><td>"+geneobj.chrom+"</td><td>"+geneobj.start+"</td><td>"+geneobj.end+"</td><td>"+geneobj.strand+"</td><td>"+p_atom.serial+"</td><td>"+p_atom.x+"</td><td>"+p_atom.y+"</td><td>"+p_atom.z+"</td><td>"+atomprop.chr+":"+atomprop.start+".."+atomprop.end+"</td></tr>")
												table.append(row);																							
										}																				
									}
						}
						
					}
					
					$("#idgenetable").append(table);
					glviewer.render();
					if(focusAtom != null){
						var zoomval = glviewer.getZoomZ();
						if($("#idfocusgene").prop("checked") == true){
							glviewer.zoomTo({serial:focusAtom.serial},zoomval);

						}else{
						
							glviewer.zoomTo({},zoomval);
						}			
					}
				}	
			}
	});
}



function focusGivenGene(){
	if(focusAtom != null){
		var zoomval = glviewer.getZoomZ();
		if($("#idfocusgene").prop("checked") == true){
			
			
			//updateStype
			//var sphere = new $3Dmol.Sphere();
									// console.log(child.intersectionShape.sphere.length);
			//sphere.copy(focusAtom.intersectionShape.sphere[0]);
			
		//sphere.updateStyle({sphere:{radius:sphere_radius,color:"maroon",alpha:0.1},stick:{radius:bond_width,color: "white"}});
			//glviewer.setStyle({serial:focusAtom.serial}, {sphere:{radius:sphere_radius,color:"maroon",alpha:0.1},stick:{radius:bond_width,color: "white"}});
			//glviewer.render();	
			
			glviewer.zoomTo({serial:focusAtom.serial},zoomval);
			
			

		}else{
			//glviewer.setStyle({serial:focusAtom.serial}, {sphere:{radius:sphere_radius,color:"white",alpha:0.1},stick:{radius:bond_width,color: "white"}});
		//	glviewer.render();	
			glviewer.zoomTo({},zoomval);
		}
						
					
	}
	
	
}

//show histone mark
function showHistoneMark(){
	/*
	if(glviewer == null || cmodel ==null){
		$('<div></div>').appendTo('body')
					  .html('<div style=\"margin-top:10px;\"><h6>please first load 3D physical data</h6></div>')
					  .dialog({
						  modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
						  width: 'auto', resizable: false,						 
						  close: function (event, ui) {
							  $(this).remove();
						  }
					});
		return ;
	}*/		
	glviewer.setStyle({},{sphere:{radius:sphere_radius,color:"white",clickable: true, callback: showJumpMenu},stick:{radius:bond_width,color:"white"}});
	glviewer.render();
	
	var p_his = $("#hisid").val();
	var p_orga = $("#orgaid").val();
	var p_cell = $("#cellid").val();
	var code=p_orga+"_"+p_cell+"_"+p_his;
	execShowHistoneMark(code,p_his,"red",p_orga,p_cell);
	
}

/************************************************
* this is used to show histone mark, get according data and then color
*/
function execShowHistoneMark(code,hisname,dcolor,p_orga,p_cell){
	//var p_pos = $("#curpos").val();
	var p_pos = getQueryString("loc");
	
	var params={"position":p_pos,"organism":p_orga,"cellname":p_cell,"histonename":hisname};
	
	$.ajax({
			url : '/deltaar/ajax/ajaxSearchHistone.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: false,
			success : function(data){
				//console.log(data.genelist);		
				//need to identify the tss 
				if(data.hisList != null){
					var temphistone=[];
					var atoms = cmodel.selectedAtoms({});
					if(atoms != null){
						var focusatom;
						var genomepos = parseCurrentGenomePosition();
							for(i=0;i<atoms.length;i++){
								var p_atom = atoms[i];
								var atomprop = p_atom.properties;
								
								for(j=0;j<data.hisList.length;j++){								
									var hisobj = data.hisList[j]; //each gene
									if((atomprop.chr == genomepos[0] && atomprop.start >= genomepos[1] && atomprop.start <= genomepos[2] ) && atomprop.chr == parseInt(hisobj.chrom) && hisobj.start >= atomprop.start && hisobj.start <= atomprop.end){								
										//console.log("find it="+p_atom.serial);
										//glviewer.setColorByElement({serial:p_atom.serial},colors);
										//p_atom.color="red";
										//console.log("-------serial="+p_atom.serial);
										glviewer.setStyle({serial:p_atom.serial},{sphere:{radius:sphere_radius,color:dcolor,clickable: true, callback: showJumpMenu},stick:{radius:bond_width,color:"white"}});									
										//glviewer.setColorByElement({serial:p_atom.serial},colors);
										temphistone.push(p_atom.serial);
										break;
									}
							}
						}
						glviewer.render();
						histoneAtomIndex[code]=temphistone;
					}
					
				}	
			}
	});	
	
}


function chooseCellType(){
	
	var org = $("#orgaid").val();
	var params={"param1": org};
	$("#cellid").empty();
	$("#hisid").empty();
	$.ajax({
			url : '/deltaar/ajax/ajaxPhyCell.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: true,
			success : function(data){
				if(data.cellList != null){
					for(i=0;i<data.cellList.length;i++){
						var celltype = data.cellList[i];
						var option="<option value='"+celltype.cellName+"'>"+celltype.cellName+"</option>";
						$("#cellid").append(option);
					}
					
				}
			}
	});
	
}


function chooseHisMark(cellname){
	var org = $("#orgaid").val();
	var cell = $("#cellid").val();
	if(cellname != ""){
		cell = cellname;
	}
	var params={"param1": org,"param2":cell};
	$("#hisid").empty();
	$.ajax({
			url : '/deltaar/ajax/ajaxPhyHis.action',
			type : 'post',
			dataType : 'json',
			data : params,
			async: true,
			success : function(data){
				if(data.cellList != null){
					for(i=0;i<data.cellList.length;i++){
						var celltype = data.cellList[i];
						var option="<option value='"+celltype.hisName+"'>"+celltype.hisName+"</option>";
						$("#hisid").append(option);
					}
					
				}
				
				
			}
	});
	
}

function resolveURL(url){
	//var t_chr = $("#chromid").val();

	
	var pos = getQueryString("loc");
		
		var index1 = pos.indexOf(":");
		var index2 = pos.indexOf(".");
		var chrtmp = pos.substring(0,index1);
	
	url = url.replace(new RegExp("{refseq}","g"),chrtmp);
	
	return url;
}

//from given url get substring val
function getQueryStringFromString(url,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//from window location get val
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function get_vertical_biVector2( a1, a2, a3, b1, b2, b3, c1, c2, c3,direction){
		
		var re = null ;
		
		var x=0;
		var y=0;
		var z=0;

		var m = Math.sqrt((a1-b1)*(a1-b1)+(a2-b2)*(a2-b2)+(a3-b3)*(a3-b3)) ;
		var m1= Math.sqrt((c1-b1)*(c1-b1)+(c2-b2)*(c2-b2)+(c3-b3)*(c3-b3));
		
		var k1 = (a3-b3)/ m ;
		var k2 = (c3-b3)/ m1;
		var k3 = (a1-b1)/m;
		var k4 = (c1-b1)/m1;
		
		var k5 = (a2-b2)/m;
		var k6 = (c2-b2)/m1;
		
		
		if(k1==0 && k2 ==0){ //z=0		  
			re = [1,1,0];
		}else if(k3==0 && k4==0){ //x=0;
			re = [0,1,1];
		}else if(k5==0&&k6==0){ // y=0
			re = [1,0,1];
		}else {
			var x_fenzi=((-a3*b1+c3*b1+a1*b3+a3*c1-b3*c1-a1*c3)*((a3*b2-c3*b2-a2*b3-a3*c2+b3*c2+a2*c3)*(k1+k2)-(a2*b1-c2*b1-a1*b2-a2*c1+b2*c1+a1*c2)*(k3+k4)));
			var x_fenmu = ((a3*b2-c3*b2-a2*b3-a3*c2+b3*c2+a2*c3)*((a3*b2-c3*b2-a2*b3-a3*c2+b3*c2+a2*c3)*(k5+k6)-(-a3*b1+c3*b1+a1*b3+a3*c1-b3*c1-a1*c3)*(k3+k4)));
			
			
			x = x_fenzi/x_fenmu - (a2*b1-c2*b1-a1*b2-a2*c1+b2*c1+a1*c2)/(a3*b2-c3*b2-a2*b3-a3*c2+b3*c2+a2*c3) ;
			
			
			var x2_fenzi = -((a3*b2-c3*b2-a2*b3-a3*c2+b3*c2+a2*c3)*(k1+k2)-(a2*b1-c2*b1-a1*b2-a2*c1+b2*c1+a1*c2)*(k3+k4));
			var x2_fenmu = ((a3*b2-c3*b2-a2*b3-a3*c2+b3*c2+a2*c3)*(k5+k6)-(-a3*b1+c3*b1+a1*b3+a3*c1-b3*c1-a1*c3)*(k3+k4));
			 y =  x2_fenzi/x2_fenmu;
			z = 1;
			re = [x,y,z];
		}
			
		return re;		
}


function getCircleVectorForHistonemark(cyradius,preatom,p_atom,natom,direction,cr_interval){

	var R = cyradius;
															
	var end1 = new $3Dmol.Vector3(p_atom.x,p_atom.y,p_atom.z);
	var start = null;
	var end = null;
	if(preatom != null){
											
		var newvi = get_vertical_biVector2(preatom.x,preatom.y,preatom.z,p_atom.x,p_atom.y,p_atom.z,natom.x,natom.y,natom.z,direction);
		if(newvi != null){
			var m = Math.sqrt(newvi[0]*newvi[0] + newvi[1]*newvi[1] + newvi[2]*newvi[2])  ;
											    
			if(direction == 1){
				var x = p_atom.x+newvi[0]/m *R;
				var y = p_atom.y+newvi[1]/m *R;
				var z = p_atom.z+newvi[2]/m *R;
														
				start = new $3Dmol.Vector3(x,y,z);
				var R1 = R + cr_interval; //0.001
				x = p_atom.x+newvi[0]/m *R1;
				y = p_atom.y+newvi[1]/m *R1;
				z = p_atom.z+newvi[2]/m *R1;
				end = new $3Dmol.Vector3(x,y,z);
			}else if(direction<0){
				var x = p_atom.x-newvi[0]/m *R;
				var y = p_atom.y-newvi[1]/m *R;
				var z = p_atom.z-newvi[2]/m *R;
														
				start = new $3Dmol.Vector3(x,y,z);
				var R1 = R + cr_interval; //0.001
				x = p_atom.x-newvi[0]/m *R1;
				y = p_atom.y-newvi[1]/m *R1;
				z = p_atom.z-newvi[2]/m *R1;
				end = new $3Dmol.Vector3(x,y,z);
			}
		}									
	}
	
	var res=[start,end];
	return res;
}


function getCircleVector(cyradius,preatom,p_atom,natom){
	
	cyradius = Math.abs(cyradius);
										//console.log("cylinder radius="+cyradius);
	var direction = -1; //bottom
	if(cyradius > sphere_radius){ //top
		direction = 1;
		cyradius = cyradius - sphere_radius;
	}
	cyradius = cyradius/2;
	var R = cyradius;
															
	var end1 = new $3Dmol.Vector3(p_atom.x,p_atom.y,p_atom.z);
	var start = null;
	var end = null;
	if(preatom != null){
											
		var newvi = get_vertical_biVector2(preatom.x,preatom.y,preatom.z,p_atom.x,p_atom.y,p_atom.z,natom.x,natom.y,natom.z,direction);
		if(newvi != null){
			var m = Math.sqrt(newvi[0]*newvi[0] + newvi[1]*newvi[1] + newvi[2]*newvi[2])  ;
											    
			if(direction == 1){
				var x = p_atom.x+newvi[0]/m *R;
				var y = p_atom.y+newvi[1]/m *R;
				var z = p_atom.z+newvi[2]/m *R;
														
				start = new $3Dmol.Vector3(x,y,z);
				var R1 = R + 0.001;
				x = p_atom.x+newvi[0]/m *R1;
				y = p_atom.y+newvi[1]/m *R1;
				z = p_atom.z+newvi[2]/m *R1;
				end = new $3Dmol.Vector3(x,y,z);
			}else if(direction<0){
				var x = p_atom.x-newvi[0]/m *R;
				var y = p_atom.y-newvi[1]/m *R;
				var z = p_atom.z-newvi[2]/m *R;
														
				start = new $3Dmol.Vector3(x,y,z);
				var R1 = R + 0.001;
				x = p_atom.x-newvi[0]/m *R1;
				y = p_atom.y-newvi[1]/m *R1;
				z = p_atom.z-newvi[2]/m *R1;
				end = new $3Dmol.Vector3(x,y,z);
			}
		}									
	}
	
	var res=[start,end];
	return res;
}

//this is used to draw circle from file
function drawCircleFromFile(file,storage,code,dcolor,organism,trackindex){
		if(histoneHasDrawn[code] != null){
			histoneHasDrawn[code].hasDrawn = 0;
		}
		
		var renderflag = 0 ;
		if(histoneAtomIndex!= null && Object.keys(histoneAtomIndex).length>0){
			glviewer.setStyle({},{sphere:{radius:sphere_radius,color:"white",clickable: true, callback: showJumpMenu},stick:{radius:bond_width,color:"white"}});	
			renderflag = 1;
		}
		
		if(cylinderMap != null ){
			clearCylinderByKey(code);
			renderflag = 1;
		}
		
		
		if(renderflag == 1){
			glviewer.render();
		}
		//we will draw a circle around sphere
		//var p_pos = $("#curpos").val();
		var p_pos= getQueryString("loc");
		var index1 = p_pos.indexOf(":");
		var chrtmp = p_pos.substring(0,index1);
		file = file.replace("{refseq}",chrtmp);
		
		var params ={};
		var ajaxurl="";
		if(storage == "mysql"){ // this is a mysql table
			params={"param1":file,"param2":p_pos,"binsize":bin_size,"perbin":bin_interval,"track":code};
			ajaxurl="/deltaar/ajax/ajaxFindHistoneDFromMysql.action" ;
		}else{			
			params={"param1":file,"param2":p_pos};	
			ajaxurl="/deltaar/ajax/ajaxFindHistoneDensity.action" ;			
		}
		$.ajax({
			url : ajaxurl, // change to find gff3
			type : 'post',
			dataType : 'json',
			data : params,
			async: false,
			success : function(data){
				
				if(data.peaklist != null){
					
					
					var tempcylinder=[];
					var atoms = cmodel.selectedAtoms({});
					var genomepos = parseCurrentGenomePosition();
				      for(i=0;i<atoms.length;i++){
							var p_atom = atoms[i];
							var atomprop = p_atom.properties;
							
							var circlecount = 0 ;
							
							for(j=0;j<data.peaklist.length;j++){								
								var gffobj = data.peaklist[j]; //each gene
								
								if((atomprop.chr == genomepos[0] && atomprop.start >= genomepos[1] && atomprop.start <= genomepos[2]) && atomprop.chr == parseInt(gffobj.chrom) && gffobj.end >= atomprop.start && gffobj.end <= atomprop.end){		  //compute 

									var drawcolor="red";
									var cyradius =0;
									var genestart = gffobj.start;
									var geneend = gffobj.end;
									//the gene need to located in the view scope
									if( genestart >= atomprop.start && genestart <= atomprop.end){
											cyradius = (genestart - atomprop.start)/(atomprop.end - atomprop.start) * sphere_radius *2;
										}else if( geneend >= atomprop.start && geneend <= atomprop.end ){
											cyradius = (geneend - atomprop.start)/(atomprop.end - atomprop.start) * sphere_radius *2;
										}else if( (genestart < atomprop.start && geneend > atomprop.end)||(geneend < atomprop.start && genestart > atomprop.end) ){
											cyradius = 0.04;
									}
									
									if(cyradius > 0 ){
										cyradius = Math.abs(cyradius);
										
										cyradius = cyradius/2;
										
										var usecyradius = cyradius -sphere_radius>0 ?(cyradius -sphere_radius)/2: cyradius/2;
										
										
										
										var preatom;
										var natom;
											
										if(i>0 && i< (atoms.length-1)){
											preatom = atoms[i-1];
											natom = atoms[i+1];
										}else if(i==0){
											preatom = atoms[2];
											natom = atoms[1];
										} else if( i == (atoms.length-1)){
											preatom = atoms[i-1];
											natom = atoms[i-2];
										}
										
										

										//var usecyradius = cyradius -sphere_radius>0 ?(cyradius -sphere_radius)/2: cyradius/2;
										
										var yaxis = Math.sqrt(sphere_radius * sphere_radius - usecyradius * usecyradius);
										var res =getCircleVectorForHistonemark(usecyradius,preatom,p_atom,natom,1,0.001);
										var start = res[0];
										var end = res[1];
										
										
										var drawradius = yaxis+0.002 ;
										if(isNaN(drawradius)){
											drawradius = 0.0001;
										}else if(drawradius > sphere_radius){
											drawradius = sphere_radius;
										}
										
										
										if(start != null && end != null){
											var cylinder=glviewer.addCylinder({start: start,end: end,radius: drawradius, tocap:true,color:drawcolor});	
											
											cylinderShapes.push(cylinder);		
											tempcylinder.push(cylinder);
										}						
											
										
										
									}
														
							}
						}
						
				    }
					cylinderMap[code] = tempcylinder;
				   glviewer.render();
				}
			},
			error: function(){
				alert("get histone data error");
			}
	  });
	
}


/*
*this is used to draw a circle around sphere
* this function will be actived by click checkbox
************************************/
function drawCircleAroundSphere(file,storage,code,dcolor,organism,trackindex){
	var useradius;
	//var p_pos = $("#curpos").val();
	
	var p_pos = getQueryString("loc");
	var zoomval = glviewer.getZoomZ(); // maxmum val is 150
	
	if(zoomval ==0 ){
		zoomval = getQueryString("zoom");
		zoomval = parseInt(zoomval);
	}
	var bin_interval = 0;
	if(zoomval > 148 && zoomval <= 150){
		bin_interval = 10;
		useradius = bin10radius;
	}else if(zoomval >146 && zoomval <= 148){
		bin_interval= 5;
		useradius = bin5radius;
	}else if(zoomval> 144 && zoomval <=146){
		bin_interval = 3;
		useradius = bin3radius;
	}
	//console.log("code="+code+",zoom val"+zoomval+",bin="+bin_interval);
	//alert(bin_interval);
	if(bin_interval ==0){
		//only color the whole sphere		
		//if(histoneHasDrawn[code] == null || histoneHasDrawn[code].hasDrawn==0){
		if(histoneHasDrawn[code] == null ){
			histoneHasDrawn[code]={"hasDrawn":0};
			histoneHasDrawn[code].hasDrawn = 1;
		
			var p_his = $("#tlst_"+code).val();
			var arrys = p_his.split(",");
			var code =arrys[1];
			if(code != null){
				var keys = code.split("_");
				if(keys!=null &&keys.length==2){
					execShowHistoneMark(code,keys[1],dcolor,organism,keys[0]);//(code,hisname,dcolor,p_orga,p_cell)
				}
			}
		}			
									
		
	}else if(bin_interval>0){

		
		if(histoneHasDrawn[code] != null){
			histoneHasDrawn[code].hasDrawn = 0;
		}
		
		var renderflag = 0 ;
		if(histoneAtomIndex!= null && Object.keys(histoneAtomIndex).length>0){
			glviewer.setStyle({},{sphere:{radius:sphere_radius,color:"white",clickable: true, callback: showJumpMenu},stick:{radius:bond_width,color:"white"}});	
			renderflag = 1;
		}
		
		if(cylinderMap != null ){
			clearCylinderByKey(code);
			renderflag = 1;
		}
		
		
		if(renderflag == 1){
			glviewer.render();
		}
		//we will draw a circle around sphere
		//bin_size = $("#idBinsize").val();
		bin_size = getQueryString("bin");
		var index1 = p_pos.indexOf(":");
		var chrtmp = p_pos.substring(0,index1);
		file = file.replace("{refseq}",chrtmp);
		file = file.replace("{zoom}",bin_interval);
		file =  file.replace("{binsize}",bin_size);
		
		var params ={};
		var ajaxurl="";
		if(storage == "mysql"){ // this is a mysql table
			params={"param1":file,"param2":p_pos,"binsize":bin_size,"perbin":bin_interval,"track":code};
			ajaxurl="/deltaar/ajax/ajaxFindHistoneDFromMysql.action" ;
		}else{			
			params={"param1":file,"param2":p_pos};	
			ajaxurl="/deltaar/ajax/ajaxFindHistoneDensity.action" ;			
		}
		
		if(cmodel != null ){
			
		
		
		$.ajax({
			url : ajaxurl, // change to find gff3
			type : 'post',
			dataType : 'json',
			data : params,
			async: false,
			success : function(data){
				
				if(data.peaklist != null){
					
					
					var tempcylinder=[];
					var atoms = cmodel.selectedAtoms({});
					var genomepos = parseCurrentGenomePosition();
				      for(i=0;i<atoms.length;i++){
							var p_atom = atoms[i];
							var atomprop = p_atom.properties;
							
							var circlecount = 0 ;
							
							for(j=0;j<data.peaklist.length;j++){								
								var gffobj = data.peaklist[j]; //each gene
								
								if((atomprop.chr == genomepos[0] && atomprop.start >= genomepos[1] && atomprop.start <= genomepos[2]) && atomprop.chr == parseInt(gffobj.chrom) && gffobj.end >= atomprop.start && gffobj.end <= atomprop.end){		  //compute 						
								    var note = gffobj.note;
									
								    var chrmaxval = -1; 
									var chrminval = -1 ; 
									
									var notearry = note.split(";"); //ID=1327;Name=1327;Min=0.0;Max=41.268593
									if(notearry != null && notearry.length == 4){
										chrmaxval = notearry[3].substring(4,notearry[3].length);
										chrminval =notearry[2].substring(4,notearry[2].length);
									}
									if(chrmaxval ==  -1){
										chrmaxval = 1;
									}
									
									if(chrminval == -1){
										chrminval = 0;
										
									}
									
									//console.log("gffobj.score ="+gffobj.score);
									if(gffobj.score == 0 || gffobj.score == "."){
										
										gffobj.score = 1;
									}
							
								    if(gffobj.score >0){
							
										var drawcolor=getCircleColor(dcolor,gffobj.score,chrminval,chrmaxval);
								
									//compute the data drawn position
									
									var interval =  parseInt((atomprop.end - atomprop.start)/bin_interval);
									circlecount = (gffobj.end - atomprop.start) / interval;
									circlecount = parseInt(circlecount);
									var minuscount = 0 ;
									var preatom;
									var natom;
										
									if(i>0 && i< (atoms.length-1)){
										preatom = atoms[i-1];
										natom = atoms[i+1];
									}else if(i==0){
										preatom = atoms[2];
										natom = atoms[1];
									} else if( i == (atoms.length-1)){
										preatom = atoms[i-1];
										natom = atoms[i-2];
									}
									
									if(i>0 ){
										if(p_atom.x < preatom.x ){ // minus
											circlecount = (bin_interval - 1) - circlecount;
										}
									}
									
									//console.log(p_atom.serial+","+gffobj.start+","+gffobj.end+","+gffobj.score+","+circlecount);
									
									//console.log("circlecount="+circlecount+","+gffobj.score);
									var cyradius = useradius[circlecount];
									
									
									var direction=-1;
									if(cyradius > sphere_radius){ //top
										cyradius = cyradius - sphere_radius;
										direction = 1;
									}
									var bin_radius=0.02;
									if(bin_interval ==3){
										bin_radius = 0.03;
									}
									else if(bin_interval==10){
										bin_radius=0.01;
									}
									
									cyradius = cyradius + trackindex* bin_radius/(trackindex+1) ;
									//console.log("compute bin radius="+cyradius+",track index="+trackindex);
									//cyradius = cyradius+trackindex*0.0015;
									var ratevalue = gffobj.score/chrmaxval ; 
									
									var cr_interval = ratevalue * bin_radius/(trackindex+1);
									
									var res =getCircleVectorForHistonemark(cyradius,preatom,p_atom,natom,direction,cr_interval);
									var start = res[0];
									var end = res[1];
									

									//var usecyradius = cyradius -sphere_radius>0 ?(cyradius -sphere_radius)/2: cyradius/2;
									var usecyradius = cyradius;
									var yaxis = Math.sqrt(sphere_radius * sphere_radius - usecyradius * usecyradius);
									
									
									var drawradius = yaxis+0.002 ;
									if(isNaN(drawradius)){
										drawradius = 0.0001;
									}else if(drawradius > sphere_radius){
										drawradius = sphere_radius;
									}
									
								
									//console.log("atom "+p_atom.serial+",drawcolor="+drawcolor+",cyradius="+cyradius+",drawradius="+drawradius+",start="+gffobj.start+",circlecount="+circlecount+",cr_interval="+cr_interval+",ratevalue="+ratevalue+",bin_radius="+bin_radius+",trackindex="+trackindex+",chrmaxval="+chrmaxval+",gffobj.score="+gffobj.score);
									
								
									
									
									if(start != null && end != null){
										var cylinder=glviewer.addCylinder({start: start,end: end,radius: drawradius, tocap:true,color:drawcolor});	
										
										cylinderShapes.push(cylinder);		
										tempcylinder.push(cylinder);
									}										
								}
														
							}
						}
						
				    }
					cylinderMap[code] = tempcylinder;
				   glviewer.render();
				   
				   $("#waitimgid").css("display","none");	
				   $("#container").removeClass("transparent_class");
				}
			},
			error: function(){
				alert("get histone data error");
			}
	  });	
	  
	  }
	  
	}	
	
	//$("body").removeClass("transparent_class");
}


/********************************
*this is used to draw checked histone mark when mouse wheel
***********************************************/
var old_autodraw_bin_interval = 0 ;

function reDrawAllSelectedForHistoneTrack(){

var seltrack_count = 0 ;

if(glviewer == null || cmodel ==null){
		$('<div></div>').appendTo('body')
					  .html('<div style=\"margin-top:10px;\"><h6>please first load 3D model </h6></div>')
					  .dialog({
						  modal: true, title: 'Warn', zIndex: 10000, autoOpen: true,
						  width: 'auto', resizable: false,						 
						  close: function (event, ui) {
							  $(this).remove();
						  }
					});
		return ;
}
//we will warn user whether need to redraw a histone mark or gene?
var zoomval = glviewer.getZoomZ(); // maxmum val is 150
var bin_interval = 0;
	if(zoomval > 148 && zoomval <= 150){
		bin_interval = 10;
		useradius = bin10radius;
}else if(zoomval >146 && zoomval <= 148){
		bin_interval= 5;
		useradius = bin5radius;
}else if(zoomval>= 144 && zoomval <=146){
		bin_interval = 3;
		useradius = bin3radius;
}

var seltracks_number = $("#trackid input:checkbox:checked").length;
//console.log("======seltracks_number==="+seltracks_number);

$("#waitimgid").css("display","");	
$("#container").removeClass();
$("#container").addClass("transparent_class");	
$("#container").addClass("ui-layout-container");

				
if(bin_interval>0 && bin_interval != old_autodraw_bin_interval && seltracks_number >= 1){
								  
		//var isdrawtrack= $('input[type="radio"][name="redrawtrack"]:checked').val();
		var isdrawtrack = 2;
		if(isdrawtrack == 1){
						var t_html= "";
						if(seltracks_number > MAX_TRACK_COUNT){
										
										
						  $("#trackid input[type='checkbox']").each(function(){
													if ($(this).is(":checked")) {
														var checkval = $(this).val();
														var arrys = checkval.split(",");
														t_html += '<input class=\"re_select_track\" type=\"checkbox\" value=\"'+checkval+'\"  />'+arrys[1]+"<br/>";
													}
											});
									
											$('<div></div>').appendTo('body')
												 .html('<div style=\"margin-top:10px;font-size:12px;\">The suggested maximum number of checked tracks for physical view is <strong>'+MAX_TRACK_COUNT+'</strong><br/>Please choose from the following tracks:<br/>'+t_html+'</div>')
												 .dialog({
												 modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
													width: 'auto', 
													resizable: false,						 
													close: function (event, ui) {
														/*$(".re_select_track:checkbox").each(function(){
																	var checkval = $(this).val();
																	var arrys = checkval.split(",");									
																	$("#tlst_"+arrys[1]).attr("checked",false);
																	$("#ctlst_"+arrys[1]).attr("checked",false);
																	//delete from cookie
																	deleteTrackFromCookie(arrys[1]);										
																	
															});*/
														$(this).remove();
													},
													buttons: {
														OK: function () {							
															//I will check the selected track number. if everything is ok, then call
											seltracks_number = $(".re_select_track:checked").length ;
											if(seltracks_number< MAX_TRACK_COUNT){								
												//first, uncheck all the uncheck track from here
												
												$(".re_select_track:checkbox").each(function(){
													var checkval = $(this).val();
													var arrys = checkval.split(",");
													if ($(this).is(":checked") == false) {
														$("#tlst_"+arrys[1]).attr("checked",false);
														//delete from cookie
														deleteTrackFromCookie(arrys[1]);										
													}
												});
												
												
												clearAllCylinder();

												$(".re_select_track:checkbox").each(function(){
													var checkval = $(this).val();
													var arrys = checkval.split(",");
													
													if ($(this).is(":checked")) {
														var checkval = $(this).val();
													var arrys = checkval.split(","); // catagory,code,color	
													var code = arrys[1] ;
													histoneCylinderIndex[code] = seltrack_count;
													toggleAutoTrack(arrys[0],arrys[1],seltrack_count); //category,track,trackindex
													
													seltrack_count ++;
													}
												});	
												$(this).remove();								
											}							
										},
										Cancel: function () {
											/*$(".re_select_track:checkbox").each(function(){
													var checkval = $(this).val();
													var arrys = checkval.split(",");									
													$("#tlst_"+arrys[1]).attr("checked",false);
													$("#ctlst_"+arrys[1]).attr("checked",false);
													//delete from cookie
													deleteTrackFromCookie(arrys[1]);										
													
											});*/
											$(this).remove();
										}
								   }
										});		
									}else{
										//identify the redraw tracks
										$("#trackid input[type=checkbox]").each(function(){
													if ($(this).is(":checked")) {
														
														var checkval = $(this).val();
														var arrys = checkval.split(","); // catagory,code,color	
														var code = arrys[1] ;
														//console.log("=======auto redraw tracks ==="+checkval);
														histoneCylinderIndex[code] = seltrack_count;
														toggleAutoTrack(arrys[0],arrys[1],seltrack_count); //category,track,trackindex
														
														seltrack_count ++;
													}
											});						
									}
									
									
								}else{
									$("#waitimgid").css("display","none");	
									$("#container").removeClass("transparent_class");
								}
								
								
							
						
					
}else{
	$("#waitimgid").css("display","none");	
	$("#container").removeClass("transparent_class");
}

old_autodraw_bin_interval = bin_interval ;

}



/***************************************************
*this is used to realize color gradiant
*maxium quality(histone mark count) is 1000
************************************************/

function getCircleColor(sourceC,quality,minval,maxval){
	
	var drawcolor = sourceC;
	var colorindex = 1-(quality-minval)/(maxval-minval) ;
	
	//console.log("colorindex="+colorindex);
	var h;
	var s;
	var l=parseInt(colorindex*100);
	if(l <= 50){
		l=50;
	}
	//console.log("color index="+colorindex);
	if(sourceC=="red"){	
		h=0;
		s=100;										
    }else if(sourceC=="blue"){
		h=240;
		s=100;
	}else if(sourceC=="lime"){
		h=120;
		s=100;
	}else if(sourceC=="yellow"){
		h=60;
		s=100;
	}else if(sourceC=="purple"){
		h=300;
		s=100;
	}else if(sourceC=="cyan"){
		h=180;
		s=100;
	}else if(sourceC=="orange"){		
		h=39;
		s=100;
	}
	
	var carry=hsl2rgb(h,s,l);
	drawcolor = rgb2color(carry);
	return drawcolor;
}


//the light or dark of given color
function ColorLuminance(sourceC, quality, maxval) {
	
	var hex="";
	var lum = quality/maxval;
	if(sourceC=="red"){	
		hex="#ff0000";	   								
    }else if(sourceC=="blue"){
		hex="#0000ff";
	}else if(sourceC=="lime"){
		hex="#00ff00";
	}else if(sourceC=="yellow"){
		hex="#ffff00";
	}else if(sourceC=="purple"){
		hex="#800080";	
	}else if(sourceC=="orange"){
		hex="#ffa500";
	}else if(sourceC=="cyan"){
		hex="#00ffff"
	}
	

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}




// color gradient 500 value
function gradient(startcolor,endcolor)
{

 var Step = 500;
 
 var colorArry = [];
 var A = color2rgb(startcolor);
 var B = color2rgb(endcolor);
 for (var N = 0; N <= Step; N++)
 {
  var Gradient = new Array(3);
  for (var c = 0; c < 3; c++) 
  {
   Gradient[c] = A[c] + (B[c]-A[c]) / Step * N;
  }
  var color = rgb2color(Gradient) ;

  colorArry.push(color);
 }
 
 return colorArry ;
}


// change color #FF00FF to Array(255,0,255)
function color2rgb(color)
{
 var r = parseInt(color.substr(1, 2), 16);
 var g = parseInt(color.substr(3, 2), 16);
 var b = parseInt(color.substr(5, 2), 16);
 return new Array(r, g, b);
}
// change Array(255,0,255)to color #FF00FF
function rgb2color(rgb)
{
 var s = "0x";
 for (var i = 0; i < 3; i++)
 {
  var c = Math.round(rgb[i]).toString(16);
  if (c.length == 1)
   c = '0' + c;
  s += c;
 }
 return s.toUpperCase();
}


//HSL to rgb
function hsl2rgb (h, s, l) {

    var r, g, b, m, c, x;

    if (!isFinite(h)) h = 0;
    if (!isFinite(s)) s = 0;
    if (!isFinite(l)) l = 0;

    h /= 60;
    if (h < 0) h = 6 - (-h % 6);
    h %= 6;

    s = Math.max(0, Math.min(1, s / 100));
    l = Math.max(0, Math.min(1, l / 100));

    c = (1 - Math.abs((2 * l) - 1)) * s;
    x = c * (1 - Math.abs((h % 2) - 1));

    if (h < 1) {
        r = c;
        g = x;
        b = 0;
    } else if (h < 2) {
        r = x;
        g = c;
        b = 0;
    } else if (h < 3) {
        r = 0;
        g = c;
        b = x;
    } else if (h < 4) {
        r = 0;
        g = x;
        b = c;
    } else if (h < 5) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    m = l - c / 2;
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
	//console.log("r,g,b"+r+","+g+","+b);
     return new Array(r, g, b) ;
    //return { r: r, g: g, b: b }

}


/**
*Cookies opreation
*********************************/
//this is used to add one track to cookie
function addTrackToCookie(name){
	var c_track = Cookies.get("physical_track");
	if(c_track == null ){
		var c_trackstr = name;
	//	Cookies.set("physical_track",c_trackstr, { path: 'physical'  });
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
			//Cookies.set("physical_track",c_track, { path: 'physical' });
		}
	}
}


//this is used to delete one track from cookie
function deleteTrackFromCookie(name){
	//alert("delete track");
	var c_track = Cookies.get("physical_track");
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
			//Cookies.set("physical_track", track_str, { path: 'physical'  }) ;		
		}
		
		
	}
}

function resizeCanvasSize(){
	var westsize = $("#westid").width();
	var eastsize = $("#eastid").width();
	if($("#eastid").css('display') == 'none'){
		eastsize =0;
	}
	if($("#westid").css('display') == 'none'){
		westsize =0;
	}
							
	var containerwidth = $(document.body).width();
	var centersize = containerwidth - westsize -eastsize-100;
	$("#gldiv").css("width",centersize+"px");
	if(glviewer != null){
		glviewer.resize();
		//when canvas size changed, if ensembl_gene is checked, it need to redraw.
		
		//showKnownGene("ensembl_gene",organism);
	}
	
	//resize virtual4c canvas
	var virtual4cpanel =document.getElementById('gviewframeid').contentWindow.document.getElementById("virtualpanel"); //virtualpanel
	if(virtual4cpanel != null && virtual4cpanel.style.display != "none"){
		var virtual4cc =document.getElementById('gviewframeid').contentWindow.document.getElementById("id4ccanvas"); 
	

			if(virtual4cc!= null ){
				
				virtual4cc.width = eastsize;
				window.frames["gviewframeid"].contentWindow.loadVirtual4C();
				var pl = parseInt(eastsize) - 60;
				
				var idyaxisdiv = document.getElementById('gviewframeid').contentWindow.document.getElementById("idyaxisdiv");
				idyaxisdiv.style.marginLeft = pl+"px";
			
			}
		
	}
	
}







//position: chrom:start..end
function getChromPosition(pos){
	var index1 = pos.indexOf(":");
	var index2 = pos.indexOf(".");
	var chrtmp = pos.substring(0,index1);
	var pos_starttmp = pos.substring(index1+1,index2);
	var pos_endtmp = pos.substring(index2+2,pos.length);
	return [chrtmp,pos_starttmp,pos_endtmp];
}


/**
*get left and top of current page
******/
function get_page_left_top(){
	var pagepos=[0,0];
	
	if (document.compatMode == "BackCompat") {	
		pagepos[0] = document.body.scrollLeft;
		pagepos[1] = document.body.scrollTop;
	}
	else { //document.compatMode == \"CSS1Compat\"	
		pagepos[0] = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
		pagepos[1] = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
	}
	
	return pagepos;
	
}


/*this used to get absolute position of given object
*/
function absolutePosition(obj)
{
	var c = [0,0];
	if(obj.offsetParent) {
		var o2 = obj;
		do {
			var b=parseInt(o2.style.borderLeftWidth);
			c[0] += o2.offsetLeft+(isNaN(b)?0:b);
			b=parseInt(o2.style.borderTopWidth);
			c[1] += o2.offsetTop+(isNaN(b)?0:b);
		} while(o2 = o2.offsetParent);
	}
	return c;
}
 
 
function jumpGenomeView(url){
	$("#gviewframeid").attr("src",url);
}

//fold or unfold track panel of left navigate bar
function showTrackPanel(panelid){
	
	if($("#panel_"+panelid).css("display") == "none"){
			$("#panel_"+panelid).css("display","block");
			$("#fold_"+panelid).attr("src","/deltaar/images/bnus.jpg");
	}else{
		$("#panel_"+panelid).css("display","none");
			$("#fold_"+panelid).attr("src","/deltaar/images/plus.jpg");
		
	}
}




//add selected track to hisheatmapid
function ShowTrackColorMap(category,trackkey,trackcolor,glyph){
	var hhobj = $("#hm"+trackkey);
	var td = null ;
	if(hhobj.length>0){
		hhobj.remove();	
		
	}
	td = $("#featuremapid");
	
	//console.log("==========ShowTrackColorMap glyph"+glyph+"  "+trackcolor);
	/*else{
		
		var spantext="<td style='padding-left:5px;' id='hm"+trackkey+"'><img src='/deltaar/images/tabClose.png' onclick='untoggleTrack(\""+category+"\",\""+trackkey+"\")'>"+trackkey+"<img src='/deltaar/images/"+trackcolor+".gif' /></td>";
		$("#hisheatmapid tr").append(spantext);
	}*/
	
		if(glyph == "gene"){
			var spantext="<span style='padding-left:5px;' id='hm"+trackkey+"'><img src='/deltaar/images/tabClose.png' onclick='untoggleTrack(\""+category+"\",\""+trackkey+"\")'>"+trackkey;
			if(trackcolor == undefined ||trackcolor == null || trackcolor.length == 0){
				spantext += "<img src='/deltaar/images/hotpink.png' />Forward&nbsp;<img src='/deltaar/images/cornflowerblue.png' />Reverse</span>";
			}else{
				spantext += "<img src='/deltaar/images/tad"+trackcolor+".gif' /></span>";
			}
			
			
		}else if(glyph == "dashedline"){
			var spantext="<span style='padding-left:5px;' id='hm"+trackkey+"'><img src='/deltaar/images/tabClose.png' onclick='untoggleTrack(\""+category+"\",\""+trackkey+"\")'>"+trackkey;
			spantext += "<img src='/deltaar/images/dashedline.gif' /></span>";
		}else{
			var spantext="<span style='padding-left:5px;' id='hm"+trackkey+"'><img src='/deltaar/images/tabClose.png' onclick='untoggleTrack(\""+category+"\",\""+trackkey+"\")'>"+trackkey+"<img src='/deltaar/images/"+trackcolor+".png' /></span>";
		}
		if(td != null ){
			td.append(spantext);
		}	

}


//show TAD color
function ShowTADColorMap(category,trackkey,trackindex,idflag,trackcolor){
	
    var td = $("#featuremapid");
	
	var spantext="";
	
	var idflag1 = parseInt(idflag);

	if(idflag1 == 0){
			spantext="<span style='padding-left:5px;' id='hm"+trackkey+"' ><img src='/deltaar/images/tabClose.png' onclick='untoggleTrack(\""+category+"\",\""+trackkey+"\")'>"+trackkey+"</span>" ;
			td.append(spantext);
			
	}
	var hhobj = $("#hm"+trackkey);
	if(hhobj.length > 0 ){
		spantext =" "+trackindex+"<img src='/deltaar/images/tad"+trackcolor+".gif' />";
		hhobj.append(spantext);
	}	
}




//remove select track from hisheatmapid
function removeTrackColorMap(trackkey){
	$("#hm"+trackkey).remove();
}

//remove tad color map
function removeTADColorMap(trackkey){
	$(".color"+trackkey).each(function(){
		this.remove();		
	});
}

//when click close gif, the track will be deleted from 3dmodel
function untoggleTrack(category,track){
	$("#tlst_"+track).attr("checked",false);
	toggleTrack(category,track,-1,1);	
}


//synchronized from genome view
function refereshLocationFromGenomeView(conf,loc,defaultTracks){
		
		var poschange= 0;
		var oldpos = $("#curpos").val();
		if(loc != null && loc.length> 0 && oldpos.length>0 && oldpos.indexOf(loc) <0){
			$("#curpos").val(loc);
		
			var index1 = loc.indexOf(":");
			var index2 = loc.indexOf(".");
			var chrtmp = loc.substring(0,index1);
			$("#chromid").val(chrtmp);
			var pos_starttmp = loc.substring(index1+1,index2);
			var pos_endtmp = loc.substring(index2+2,loc.length);
			chrom=chrtmp;
			pos_start= pos_starttmp;
			pos_end= pos_endtmp;
			poschange = 1;
			
		}
		
		toggleGenename();
		
		//reload 3dmodel, need to change according to the position
		reload3Dmodel(-1);
		
		//here, if the select tracks large than 5 ,need to warn
		
		
		
		if(defaultTracks!= null && defaultTracks.length>0){
			if(defaultTracks.indexOf(",") > -1){
				var trackarry = defaultTracks.split(",");
				
			
			    if(trackarry!=null&& trackarry.length >MAX_TRACK_COUNT ){
					var t_html= "";		
					
					for(var i=0;i<trackarry.length;i++){
						var dtrack = trackarry[i];
						var checkval = $("#tlst_"+dtrack).val();
						var arrys = checkval.split(",");
						t_html += '<input class=\"re_select_track\" type=\"checkbox\" value=\"'+checkval+'\"  />'+arrys[1]+"<br/>";
						
					}
					var seltrack_count = 0 ;
									
					$('<div></div>').appendTo('body')
					.html('<div style=\"margin-top:10px;font-size:12px;\">The suggested maximum number of checked tracks for physical view is <strong>'+MAX_TRACK_COUNT+'</strong><br/>Please choose from the following tracks:<br/>'+t_html+'</div>')
					.dialog({
						modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
						width: 'auto', 
						resizable: false,						 
						close: function (event, ui) {
							/*$(".re_select_track:checkbox").each(function(){
								var checkval = $(this).val();
								var arrys = checkval.split(",");									
								$("#tlst_"+arrys[1]).attr("checked",false);
								$("#ctlst_"+arrys[1]).attr("checked",false);
								//delete from cookie
								deleteTrackFromCookie(arrys[1]);										
																	
							});*/
							$(this).remove();
						},
						buttons: {
								OK: function () {							
															//I will check the selected track number. if everything is ok, then call
											seltracks_number = $(".re_select_track:checked").length ;
											if(seltracks_number<= MAX_TRACK_COUNT){								
												//first, uncheck all the uncheck track from here
												
												$(".re_select_track:checkbox").each(function(){
													var checkval = $(this).val();
													var arrys = checkval.split(",");
													if ($(this).is(":checked") == false) {
														$("#tlst_"+arrys[1]).attr("checked",false);
													    $("#ctlst_"+arrys[1]).attr("checked",false);
														untoggleTrack(arrys[0],arrys[1]);
														//delete from cookie
														deleteTrackFromCookie(arrys[1]);										
													}
												});
												
												
												clearAllCylinder();

												$(".re_select_track:checkbox").each(function(){
													var checkval = $(this).val();
													var arrys = checkval.split(",");
													
													if ($(this).is(":checked")) {
														var checkval = $(this).val();
														var arrys = checkval.split(","); // catagory,code,color	
														var code = arrys[1] ;
														$("#tlst_"+code).prop("checked",true);
														toggleTrack(arrys[0],arrys[1],arrys[2],0);
													
													}
												});	
												$(this).remove();								
											}
								}
						}
					});
				
				
				
				
			}else{
				//console.log("defulat tracks====="+defaultTracks);
			
			$("#trackid input[type='checkbox']").each(function(){
			
				if ($(this).is(":checked")) {
					
					var checkval = $(this).val();
					var arrys = checkval.split(",");
				
					if(arrys != null ){
						if(arrys[1].indexOf('3dmodel') < 0 ) {	//	arrys[1] != '3dmodel'	
							var idenc_t=0;
							if(defaultTracks.indexOf(",") > -1){
								var trackarry1 = defaultTracks.split(",");
								for(var i=0;i<trackarry1.length;i++){
									var dtrack = trackarry1[i];
									
									if(dtrack === arrys[1]){
										idenc_t = 1;
										break;
									}
								}
							}else if(defaultTracks === arrys[1]){
								idenc_t = 1;
							}
							//console.log(" =====idenc_t==="+idenc_t+"  track panel"+arrys[1]);
							if(idenc_t == 0){
								
								$(this).prop("checked",false);
								toggleTrack(arrys[0],arrys[1],arrys[2],0);
							}
							
						}
					}
					
				}
			});
			if(defaultTracks.indexOf(",") > -1){
				var trackarry = defaultTracks.split(",");
				for(var i=0;i<trackarry.length;i++){
					var dtrack = trackarry[i];
					var checkval = $("#tlst_"+dtrack).val();
					if(checkval != null){
						var arrys = checkval.split(",");
						$("#tlst_"+dtrack).prop("checked",true);
						toggleTrack(arrys[0],arrys[1],arrys[2],0);	
					}
									
				}
			}
				
			}
			
			}else{
			
		        $("#trackid input[type='checkbox']").each(function(){
			
				if ($(this).is(":checked")) {
					
					var checkval = $(this).val();
					var arrys = checkval.split(",");
				
					if(arrys != null ){
						if(arrys[1].indexOf('3dmodel') < 0 ) {	//	arrys[1] != '3dmodel'	
							var idenc_t=0;
							if(defaultTracks === arrys[1]){
								idenc_t = 1;
							}
							
							if(idenc_t == 0){
								
								$(this).prop("checked",false);
								toggleTrack(arrys[0],arrys[1],arrys[2],0);
							}
							
						}
					}
					
				}
			});
				
				var checkval = $("#tlst_"+defaultTracks).val();
				if(checkval != null ){
					var arrys = checkval.split(",");
					$("#tlst_"+defaultTracks).prop("checked",true);
					toggleTrack(arrys[0],arrys[1],arrys[2],0);
				}
				
			
				
				
			}
		

												
		}else{ // none of the tracks in genome view
			
			$("#trackid input[type='checkbox']").each(function(){
				
				if ($(this).is(":checked")) {
					var checkval = $(this).val();
					var arrys = checkval.split(",");					
					if(arrys[1].indexOf('3dmodel') < 0 && defaultTracks.indexOf(arrys[1]) < 0 ) {	//	arrys[1] != '3dmodel'			
						$(this).prop("checked",false);
						toggleTrack(arrys[0],arrys[1],arrys[2],0);
					}
				}
			});
			
		}

}

	// flag 1 not referesent initialize 3d model, 0 represent all checked tracks need to be redrawn
	function reDrawAllSelectedTrack(flag,genomeflag){
	//identify the redraw tracks
	//here we need to pop up a dialog to show all of current checked  tracks 
	
	var seltracks_number = $("#trackid input:checkbox:checked").length;
	seltracks_number = seltracks_number ;
	var t_html= "";
	if(seltracks_number > MAX_TRACK_COUNT){
		
		
			$("#trackid input[type='checkbox']").each(function(){
					if ($(this).is(":checked")) {
						var checkval = $(this).val();
						var arrys = checkval.split(",");
						if(arrys[1] != "3dmodel"){
							t_html += '<input class=\"re_select_track\" type=\"checkbox\" value=\"'+checkval+'\"  />'+arrys[1]+"<br/>";
						}						
					}
			});
	
			$('<div></div>').appendTo('body')
				 .html('<div style=\"margin-top:10px;font-size:12px;\">The suggested maximum number of checked tracks for physical view is <strong> '+MAX_TRACK_COUNT+'</strong><br/>Please choose from the following tracks:<br/>'+t_html+'</div>')
				 .dialog({
				 modal: true, title: 'warn', zIndex: 10000, autoOpen: true,
					width: 'auto', 
					resizable: false,						 
					close: function (event, ui) {
						/*$(".re_select_track:checkbox").each(function(){
									var checkval = $(this).val();
									var arrys = checkval.split(",");									
									$("#tlst_"+arrys[1]).attr("checked",false);
									$("#ctlst_"+arrys[1]).attr("checked",false);
									//delete from cookie
									deleteTrackFromCookie(arrys[1]);										
									
							});*/
						$(this).remove();
					},
					buttons: {
						OK: function () {							
							//I will check the selected track number. if everything is ok, then call
							seltracks_number = $(".re_select_track:checked").length;
							if(seltracks_number< MAX_TRACK_COUNT){								
								//first, uncheck all the uncheck track from here
								
								$(".re_select_track:checkbox").each(function(){
									var checkval = $(this).val();
									var arrys = checkval.split(",");
									if ($(this).is(":checked") == false) {
										$("#tlst_"+arrys[1]).attr("checked",false);
										$("#ctlst_"+arrys[1]).attr("checked",false);
										//delete from cookie
										deleteTrackFromCookie(arrys[1]);										
									}
								});
								
								//should first load 3dmodel
							/*	var tmp_conf = getQueryString("conf");
								if(tmp_conf == null ||(tmp_conf != null && tmp_conf=="human")){
										toggleTrack('HiC','3dmodel',0);
								}else{
									toggleTrack('My Track','3dmodel',0);
								}*/
								
								
								$(".re_select_track:checkbox").each(function(){
									var checkval = $(this).val();
									var arrys = checkval.split(",");
									
									if ($(this).is(":checked")) {
										var checkval = $(this).val();
										var arrys = checkval.split(",");
										
										if(flag == 1 ) {
											if(arrys[1] != '3dmodel'){ 
												toggleTrack(arrys[0],arrys[1],arrys[2],genomeflag);
											}
										}					
										else if(flag ==0){
											toggleTrack(arrys[0],arrys[1],arrys[2],genomeflag);
										}
									}
								});	
								$(this).remove();								
							}							
						},
						Cancel: function () {
						/*	$(".re_select_track:checkbox").each(function(){
									var checkval = $(this).val();
									var arrys = checkval.split(",");									
									$("#tlst_"+arrys[1]).attr("checked",false);
									$("#ctlst_"+arrys[1]).attr("checked",false);
									//delete from cookie
									deleteTrackFromCookie(arrys[1]);										
									
							});*/
							$(this).remove();
						}
				   }
	    });		
	}else{
		$("#trackid input[type='checkbox']").each(function(){
				
				if ($(this).is(":checked")) {
					var checkval = $(this).val();
					var arrys = checkval.split(",");
					if(flag == 1 ) {
						if(arrys[1].indexOf('3dmodel') < 0){ // != '3dmodel' 
							toggleTrack(arrys[0],arrys[1],arrys[2],genomeflag);
						}
					}					
					else if(flag ==0){ //initialize
						toggleTrack(arrys[0],arrys[1],arrys[2],genomeflag);
					}
				}
		});	
		
	}	
}






//clear cylinder by track code
function clearCylinderByKey(trackkey){

	if(cylinderMap != null && cylinderMap[trackkey] != null ){
		var cylinderarry = cylinderMap[trackkey] ;
		for(var mcindex =0 ;mcindex<cylinderarry.length;mcindex++){
			var cshape = cylinderarry[mcindex];
			if(cshape != null ){
				glviewer.removeShape(cshape);
			}
			
		}	
				
		cylinderMap[trackkey]=[];										
	}	
		
	
}


//clear all cylinders
function clearAllCylinder(){
	if(cylinderShapes != null && cylinderShapes.length>0){
		for(var i=0;i<cylinderShapes.length;i++){
		var cylinder = cylinderShapes[i];
		if(cylinder != null ){
			glviewer.removeShape(cylinder);
		}
		
	}
	cylinderShapes=[]; //clear								
  }	
}

function PinAtom(zoomval){
			if(SELECTATOM != null){
				if(glviewer != null ){
					
					//glviewer.setStyle({serial:SELECTATOM.serial}, {sphere:{radius:sphere_radius,color:"maroon",alpha:0.1},stick:{radius:bond_width,color: "white"}});
					//glviewer.render();
					glviewer.zoomTo({serial:SELECTATOM.serial},zoomval);
				}
			}
			
}

//unpin a given atom
function UnPinAtom(zoomval){	
	if(SELECTATOM != null){
				if(glviewer != null ){
					 glviewer.setStyle({serial:SELECTATOM.serial}, {sphere:{radius:sphere_radius,color:"white"},stick:{radius:bond_width,color: "white"}});
					glviewer.zoomTo({},zoomval);	
					glviewer.render();
					SELECTATOM = null ;
				}
	}
   
}



//parse current genome position from #curpos
function parseCurrentGenomePosition(){
		var pos = getQueryString("loc");
		var index1 = pos.indexOf(":");
		var index2 = pos.indexOf(".");
		var chrtmp = pos.substring(0,index1);
		var pos_starttmp = pos.substring(index1+1,index2);
		var pos_endtmp = pos.substring(index2+2,pos.length);
	
		return [chrtmp,pos_starttmp,pos_endtmp];
}

//this is used to choose a 3d model
function choose3DmodelFunc(flag){
	//var modelval = $("#idPhyModel").val();
	var modelval= getQueryString("model");
	//still load the inittrack;
	loadInitTrackFilterCategory();
	
	//remove color tad 
	
	//removeTADColorMap();
	$("#featuremapid").empty();
	
	//console.log("modelval==="+modelval);
	if(modelval.indexOf("3dmodel") <= -1){
			//use this model name to get binsize
		
	
				//var tbinval=$("#idBinsize").val();
				
				var tbinval= getQueryString("bin");
				var mname = modelval+"_"+tbinval;
			
				//load 3d model
				if(phymodelMap[mname] != null){
					var flength =phymodelMap[mname].length;
					if(flength > 0 ){
						var track = phymodelMap[mname][0];						
						if(track.glyph == "3dmodel"){
								//toggleTrack(track.category,track.key,0,0);	
								cur3dmodel_obj = track;
								if(track.startBin != null){
									start_bin = track.startBin;
								}
							draw3dmodel(track.file,track.storage,0);
							//addTrackToCookie(track.key);
											
						}						
					}
					
						    
				}

	}else{
		if($("#hmLCR1").length > 0 ){
			$("#hmLCR1").remove();
		}
		
		//var tbinval=$("#idBinsize").val();
		var tbinval= getQueryString("bin");		
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
							//$("#idBinsize").empty();
						}
						var tmpmodel = null;
						for(var it=0;it<flength;it++){
							var track = phymodelMap[mname][it];
							
							if(track.glyph == "3dmodel"){
								
								if(flag == 1){
									if(it ==0){
										tmpmodel = track;
									}
									
									//var option = "<option value=\""+track.binsize+"\">"+track.binsize+"</option>";
								//	$("#idBinsize").append(option);
								}else{
									if(track.binsize == tbinval){
										tmpmodel = track;
									}
									
								}
								
									
								
							}/*else{
								if(glviewer != null ){
										if($("#tlst_"+track.key).prop("checked")){
										untoggleTrack(track.category,track.key);
									}
								}
							
								
				
							}*/
							
						}
						
						if(tmpmodel != null ){
							//toggleTrack(tmpmodel.category,tmpmodel.code,0,0);
							cur3dmodel_obj = tmpmodel;
							
						//	addTrackToCookie(track.key);
							if(cur3dmodel_obj.startBin != null){
									start_bin = cur3dmodel_obj.startBin;
								}
							draw3dmodel(tmpmodel.file,tmpmodel.storage,0);
						}
						
						
					}
					
				}
		
	}
	

	
	//callDeltaAR();	
}


//this is used to choose 3model when there is a given model name and given bin size
function choose3DmodelByBinsizeFunc(){
	//var modelval = $("#idPhyModel").val();
	var modelval = getQueryString("model");
	var tbinval = $("#idBinsize").val();
	var mname = modelval+"_"+tbinval;
	if(modelval.indexOf("3dmodel") > -1 ){
		mname="My Track";
	}
	//removeTADColorMap();
	$("#featuremapid").empty();
	
	if(phymodelMap[mname] != null){
					var flength =phymodelMap[mname].length;
					if(flength > 0 ){
						for(var it=0;it<flength;it++){
							var track = phymodelMap[mname][it];
							if(track.glyph == "3dmodel"){
								
								if(track.binsize == tbinval){
									cur3dmodel_obj = track;
									if(cur3dmodel_obj.startBin != null){
									start_bin = cur3dmodel_obj.startBin;
								}
									draw3dmodel(track.file,track.storage,0);//
										//toggleTrack(track.category,track.key,0,0);
										
								}
								
							}else{
								
								if($("#tlst_"+track.key).prop("checked")){
									untoggleTrack(track.category,track.key);
								}
								
				
							}
						}
						
						
					}
					
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
									
									var tdval="<td ><input type=\"checkbox\" id=\"tlst_"+track.key+"\" value=\""+track.category+","+track.key+","+track.color+"\" onclick=\"toggleTrack('"+track.category+"','"+track.key+"',0,1)\">"+track.key+"</td>";
									td=$(tdval);
									td.appendTo(tr);//width=\"33%\"
									
								}						
						}	
							
					}
					
	}
	//callDeltaAR();
}

//this is used to choose given 3d model,can be triggled by select chromosome , init flag =1 means initialize
function chooseGiven3DmodelFunc(modelname,initflag){
	//	console.log("==============chooseGiven3DmodelFunc==="+modelname);
		if(modelname != null ){
			
			//generate hic features
					var tmp="3dmodel";
					var tmp1 = "custom_3dmodel";
					if(modelname == tmp ){
						modelname = "My Track";
						
					}else if(modelname.indexOf(tmp1) > -1){
						modelname = "Custom Track";
					}
					else if(modelname.substring(modelname.length-tmp.length)== tmp ){
						modelname = modelname.substring(0,modelname.length-tmp.length-1);
						
					}

					if(phymodelMap[modelname] != null){
						var flength =phymodelMap[modelname].length;

						if(flength > 0 ){
							var track = null;
							if(modelname == "My Track"){
								for(var it=0;it<flength;it++){
									var tmpmodel = phymodelMap[modelname][it];
									if(tmpmodel.glyph == "3dmodel"){
										track = tmpmodel;
										break;
									}
								}
							}else{
								track = phymodelMap[modelname][0];
							}
							
							
							/*if(track.glyph == "3dmodel"){
								//set default model and bin size
								var lastidx = modelname.lastIndexOf("_");
								if(lastidx > -1 ){
									var qmodelname = modelname.substring(0, lastidx);
									//url_modelbin = modelname.substring(lastidx+1,modelname.length);
									//selected
									
									//$("#idPhyModel option[value='"+qmodelname+"']").attr("selected",true);
								 $("#idPhyModel").find("option[value='"+qmodelname+"']").prop("selected",true);
									//$("#chromid").find("option[text='"+selectvar+"']").attr("selected",true);
								}else{
									//$("#idPhyModel option[value='"+tmp+"']").attr("selected",true);
									//console.log("selcted show 3dmodel="+tmp);
									 $("#idPhyModel").find("option[value='"+tmp+"']").prop("selected",true);
								}
								
						
								
							}*/
						}
					}
		}
		
		choose3DmodelFunc(initflag); // choose bin size then load a 3d model
		
}

//reload 3dmodel according to current 3dmodel name and binsize and position, flag 0 , means when reload 3dmodel, not redraw tracks
function reload3Dmodel(flag){
	//var modelval = $("#idPhyModel").val();
	//var tbinval=$("#idBinsize").val();
		
	var modelval = getQueryString("model");
	var tbinval = getQueryString("bin");
	var mname = modelval+"_"+tbinval;
	var tmp1 = "custom_3dmodel";
	if(modelval == "3dmodel"){
		mname = "My Track";	
	}else if(modelval.indexOf(tmp1) > -1){
		mname = "Custom Track";
	}
	 	
    //generate hic features
	if(phymodelMap[mname] != null){
		var flength =phymodelMap[mname].length;
		if(flength > 0 ){
			
			
			var track = null;
			if(mname == "My Track"){
					for(var it=0;it<flength;it++){
						var tmpmodel = phymodelMap[mname][it];
							if(tmpmodel.glyph == "3dmodel" && tmpmodel.binsize == tbinval){
								track = tmpmodel;
								break;
							}
						}
			}else{
				track = phymodelMap[mname][0];
			}
			if(track != null && track.glyph == "3dmodel"){
								//alert("======="+track);
				//toggleTrack(track.category,track.key,flag,0);
				cur3dmodel_obj = track;
				if(cur3dmodel_obj.startBin != null){
									start_bin = cur3dmodel_obj.startBin;
								}
				draw3dmodel(track.file,track.storage,flag);//				
			}
			
		}
	}
	
	
}

//this is used to get organism from 3dmodel
function getOrganismFromModel(){
	
	/*var modeltext= $('#idPhyModel option:selected').text();
		var idx1 = modeltext.indexOf("(") ;
		var idx2 = modeltext.indexOf(")") ;
		var tmp_organism= "" ;
		if( idx1 > -1 && idx2 > -1 ){
			tmp_organism = modeltext.substring(idx1+1,idx2).trim();  
		}*/
	var tmp_organism = getQueryString("organism");
	return tmp_organism;
	
}


		

