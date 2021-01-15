var cash_pos = [];


function draw4cplot(dataset,resolution,location,expandRegion,startbin,flag){

	
		if(flag == true){
			$("#idwait").css("display","block");
			if(ctx != null){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			$("#idtext").html("");
			$("#idalignline").css("display","none");
			var canvas1 = document.getElementById("idannotecanvas");
			var ctx1 = canvas1.getContext('2d');
			ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
			
			var gburl = $("#idgburl").val();
			if(gburl.length == 0 ){
				$("#idgbrowse").attr("src","#"); //http://delta.big.ac.cn/jbrowse/index.html?data=1478854512827&loc=11%3A1..252600&tracks=&highlight=
				$("#iddivframe").css("display","none");
			}else{
				var loc = null;
				
				if($("#iddelta").prop("checked")){
					 loc = getQueryStringURL(gburl,"loc"); //
					 
					if(location.indexOf(":") > -1 ){
						var arr = location.split(":");
						var pos1 = parseInt(arr[1]);
						var tspan = parseInt(expandRegion);
						if(tspan.length ==0 ){
							tspan = 500000;
						}
						var posleft = pos1 - tspan;
						if(posleft <0){
							posleft = 0 ;
						}
						var posright = pos1 + tspan;
						var loc_left = arr[0]+"%3A"+posleft+".."+posright;
						if(loc != null){
							loc = loc.replace(":","%3A");
						
							gburl = gburl.replace(loc,loc_left);
						}else{
							gburl += "&loc="+loc;
						}
						
						
					}
					$("#idgbrowse").attr("src",gburl);
					$("#iddivframe").css("display","block");
				}else if($("#iducsc").prop("checked")){
					   loc = getQueryStringURL(gburl,"position");
					
						if(location.indexOf(":") > -1 ){
						var arr = location.split(":");
						var pos1 = parseInt(arr[1]);
						var tspan = parseInt(expandRegion);
						if(tspan.length ==0 ){
							tspan = 500000;
						}
						var posleft = pos1 - tspan;
						if(posleft <0){
							posleft = 0 ;
						}
						var posright = pos1 + tspan;
						
						var loc_left = "chr"+arr[0]+"%3A"+posleft+".."+posright;
						if(loc != null){
							loc = loc.replace(":","%3A");
							gburl = gburl.replace(loc,loc_left);
						}else{
							gburl +="&position=chr"+arr[0]+"%3A"+posleft+"-"+posright;
						}
					}
				
					$("#idgbrowse").attr("src",gburl);
					$("#iddivframe").css("display","block");
					
				}else if($("#idbnone").prop("checked")){
					$("#idgbrowse").attr("src",""); //http://delta.big.ac.cn/jbrowse/index.html?data=1478854512827&loc=11%3A1..252600&tracks=&highlight=
					$("#iddivframe").css("display","none");
				}
				
			}
			$("#idpaper").html("");
			if(dataset.indexOf("GSE18199") > -1 ){
				$("#idpaper").html("Virtual 4C constructed <b> "+dataset+"</b> is from \"Comprehensive mapping of long-range interactions reveals folding principles of the human genome. \" <a href=\"http://www.ncbi.nlm.nih.gov/pubmed/19815776\" target=\"_blank\">PMID</a>");
				
			}else if (dataset.indexOf("GSE35156") > -1 ){
				$("#idpaper").html("Virtual 4C constructed <b> "+dataset+"</b> is from \"Topological domains in mammalian genomes identified by analysis of chromatin interactions. \" <a href=\"http://www.ncbi.nlm.nih.gov/pubmed/22495300\" target=\"_blank\">PMID</a>");
				
			}else if(dataset.indexOf("GSE63525") > -1 ){
				$("#idpaper").html("Virtual 4C constructed <b> "+dataset+"</b> is from \" A 3D map of the human genome at kilobase resolution reveals principles of chromatin looping. \" <a href=\"http://www.ncbi.nlm.nih.gov/pubmed/25497547\" target=\"_blank\">PMID</a>");
			}
			draw4cplotfunc(dataset,resolution,location,expandRegion,startbin);
	}
}

function draw4cplotfunc(dataset,resolution,location,expandRegion,startbin){
		var params ={"dataset":dataset,"resolution":resolution,"location":location,"expandRegion":expandRegion,"startbin":startbin};
			
			$.ajax({
				url:'/deltaar/ajax/ajaxVirtual4CDraw.action',
				type:'post',
				dataType:'json',
				sync: false,
				data:params,
				success:function(value){
					$("#idwait").css("display","none");
					if(value.fourcPlot != undefined || value.fourcPlot !=null ){
						if(ctx != null ){
							
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							var data = value.fourcPlot ;
							
							if(data.x != null && data.y != null ){
								x_pos_list = [];
								y_pos_list = [];
								cash_pos= [];
								
								//here,we need to load the data
								const WIDTH = canvas.width;
								const HEIGHT = canvas.height;
								// 3. 定义坐标轴相对画布的内边距
								var padding = 20;//初始化内边距
								var paddingLeft = 60;//至少大于绘制文字的宽度
								var paddingBottom = 30;//至少大于绘制文字的高度
								// 4. 定义绘制坐标轴的关键点的坐标值
								var axisY = {// y轴的起点坐标值
									x : paddingLeft,
									y : padding
								};
								var origin = {// 原点坐标值(x轴与y轴相交点)
									x : paddingLeft,
									y : HEIGHT - paddingBottom
								};
								var axisX = {
									x : WIDTH - padding,
									y : HEIGHT - paddingBottom
								};

								
								ctx.save();
								ctx.translate(origin.x,origin.y);
								ctx.rotate(-0.5*Math.PI);
								ctx.fillStyle = "rgba(0,0,0,1)";
								var y_label = "Observed Reads Count";
								ctx.fillText(y_label, HEIGHT/2-50, -35 );
								ctx.restore();
								
								ctx.fillStyle = "rgba(255,0,0,1)";								
								ctx.strokeStyle = "rgba(0,0,0,1)";
								ctx.beginPath();
								ctx.moveTo(axisY.x,0);
								ctx.lineTo(origin.x,origin.y);
								ctx.lineTo(axisX.x,axisX.y);
								ctx.lineTo(axisX.x,0);
								ctx.lineTo(axisY.x,0);
								ctx.stroke();

								var pointsX = [];						
								var month = {
									x : paddingLeft,
									y : HEIGHT - paddingBottom
								}
								
								
								var tss_x = {x:-1,y:-1};								
								
								//draw x ticks
								var x_min = Math.min.apply(Math, data.x);
								var x_max = Math.max.apply(Math, data.x);
								var  x_range = x_max - x_min;
								var data_start = data.start;
								var data_endin = data.end;
								var x_tick_size =0;
								/////////////////////////////////////////
								//////draw x-axis labels (chromosome coordinates)
								/////////////////////////////////////////
								sigfig = getnihe(x_range);
								if (x_range / sigfig >= 2) x_tick_size = sigfig;
								else x_tick_size = sigfig/2;

								var cur_x_tick = Math.ceil( data_start / x_tick_size ) * x_tick_size;
						
								while (cur_x_tick < data_endin ){
										cur_x = (cur_x_tick - data_start)/x_range * (axisX.x - origin.x) + origin.x;
										
										//draw ticks
										ctx.beginPath();
										ctx.moveTo(cur_x, axisX.y  );
										ctx.lineTo(cur_x, axisX.y -5);
										
										ctx.strokeStyle = "rgba(0,0,0,1)";
										ctx.stroke();

										//draw number labels
										ctx.fillStyle = "rgba(0,0,0,1)";
										text =  cur_x_tick ;

										
										ctx.fillText(text, cur_x-ctx.measureText(text).width/2-1, axisX.y +15);
										cur_x_tick += x_tick_size;
									
								}	
										

							//draw y ticks
										
								var y_max = Math.max.apply(Math,data.y);
								var y_min = Math.min.apply(Math, data.y);
								var y_step = 0;
								if (y_min >= 0 && y_max >= 0)
								{
									sigfig = getnihe(y_max);
									y_max = Math.ceil(y_max / sigfig) * sigfig;
									y_min = 0;
									y_step = sigfig;
								}
								
								var  y_range = Math.abs(y_max-y_min);

								var y_tick_num = Math.max(10, y_range/y_step) ;
								for (i = 0; i <= y_tick_num; i++)
								{
									//draw ticks
									ctx.beginPath();
									
									ctx.moveTo( axisY.x  ,origin.y- origin.y / y_tick_num * i);
									ctx.lineTo( axisY.x+5, origin.y -origin.y / y_tick_num * i);
									ctx.strokeStyle = "rgba(0,0,0,1)";
									ctx.stroke();

									//draw number labels
									ctx.fillStyle = "rgba(0,0,0,1)";
									text = "" + (y_min + y_range/y_tick_num * i);
									if (i < y_tick_num ){
										if(i != 0 ){
											ctx.fillText(text, axisY.x-30,origin.y- origin.y/y_tick_num * i +1 );
										}
									}	
									else
										ctx.fillText(text, axisY.x-30,origin.y- origin.y/y_tick_num * i ); 
								}
								
								
								//draw actual point and line


									ctx.beginPath();
									ctx.strokeStyle = "rgba(0,0,255,1)";
									var tss_index = -1;
									var plot_start_x = origin.x ;
									var plot_endin_x = axisX.x;
									var plot_endin_y = axisX.y;
									var plot_start_y = axisY.y;
									var cur_x = plot_start_x;
									for (i = 0; i < data.x.length; i++)
									{
										if(i >0 && data.x[i] == 0 ){
											break;
										}
										if (data.x[i] == data.centerpos) { tss_index = i; }
										var x_val = data.x[i];
										var y_val = data.y[i];
										var cur_y = plot_endin_y - (y_val-y_min)/y_range * (plot_endin_y - plot_start_y);

										if(data.start >0 && data.x[i] > 0){
											if (i == 0){
												ctx.moveTo(cur_x, cur_y);
											}
											else{
												ctx.lineTo(cur_x, cur_y);
											}
										}else if(data.start ==0 ){
											if (i == 0){
												ctx.moveTo(cur_x, cur_y);
											}
											else{
												ctx.lineTo(cur_x, cur_y);
											}
										}
										

										x_pos_list.push(cur_x);
										y_pos_list.push(cur_y);
										var endbin = data.x[i] + data.resolution;
										var cash_d = {x: cur_x,y:cur_y,ocount:data.y[i],startbin:data.x[i],endbin:endbin,pvalue:data.pvalue[i]};
										cash_pos.push(cash_d);

										if (i < data.x.length - 1)
										{
											cur_x += (data.x[i+1] - x_val)/x_range * (plot_endin_x - plot_start_x);
										}
										else
										{
											cur_x = plot_endin_x;
										}
									}
									ctx.stroke();
								
								//draw anchor point
									var tss_x ={x:-1,y:-1};
									if(tss_index != -1){
										tss_x.x = cash_pos[tss_index].x;
										tss_x.y = cash_pos[tss_index].y;
									}
									
									if(tss_x.x !=-1){
									//	console.log("tss_x "+tss_x.x+","+tss_x.y);
										ctx.beginPath();
										ctx.moveTo(tss_x.x, 5);
										ctx.lineTo(tss_x.x, plot_endin_y );
										ctx.strokeStyle = "rgba(255,0,0,0.5)";
										ctx.stroke();

										ctx.fillStyle = "rgba(255,0,0,1)";
										var anchortext="anchor "+cash_pos[tss_index].startbin+"-"+cash_pos[tss_index].endbin;
										ctx.fillText(anchortext, tss_x.x - ctx.measureText(anchortext).width/2 , 10);
									}
							}
							
							
							
						}	  
					}
					if($("#id4cwait").length>0){
						$("#id4cwait").css("display","none");	
					}	
				},
				error:function(e){
					alert("error");
					}
				});	
}


function draw4cplotfunccirclet(dataset,resolution,location,pos_start,pos_end,startbin){
		var params ={"dataset":dataset,"resolution":resolution,"location":location,"expandStartRegion":pos_start,"expandEndRegion":pos_end,"startbin":startbin};
			
			$.ajax({
				url:'/deltaar/ajax/ajaxVirtual4CDraw.action',
				type:'post',
				dataType:'json',
				sync: false,
				data:params,
				success:function(value){
					$("#idwait").css("display","none");
					var canvastt = document.getElementById("id4ccanvas");
					var ctxtt = canvastt.getContext('2d');	
					if(value.fourcPlot != undefined || value.fourcPlot !=null ){
						if(ctxtt != null ){
							
							ctxtt.clearRect(0, 0, canvastt.width, canvastt.height);
							var data = value.fourcPlot ;
							
							if(data.x != null && data.y != null ){
								x_pos_list = [];
								y_pos_list = [];
								cash_pos= [];
								
								//here,we need to load the data
								const WIDTH = canvastt.width;
								const HEIGHT = canvastt.height;
								// 3. 定义坐标轴相对画布的内边距
								var padding = 20;//初始化内边距
								var paddingLeft = 60;//至少大于绘制文字的宽度
								var paddingBottom = 30;//至少大于绘制文字的高度
								// 4. 定义绘制坐标轴的关键点的坐标值
								var axisY = {// y轴的起点坐标值
									x : paddingLeft,
									y : padding
								};
								var origin = {// 原点坐标值(x轴与y轴相交点)
									x : paddingLeft,
									y : HEIGHT - paddingBottom
								};
								var axisX = {
									x : WIDTH - padding,
									y : HEIGHT - paddingBottom
								};

								
								ctxtt.save();
								ctxtt.translate(origin.x,origin.y);
								ctxtt.rotate(-0.5*Math.PI);
								ctxtt.fillStyle = "rgba(0,0,0,1)";
								var y_label = "Observed Reads Count";
								ctxtt.fillText(y_label, HEIGHT/2-50, -35 );
								ctxtt.restore();
								
								ctxtt.fillStyle = "rgba(255,0,0,1)";								
								ctxtt.strokeStyle = "rgba(0,0,0,1)";
								ctxtt.beginPath();
								ctxtt.moveTo(axisY.x,0);
								ctxtt.lineTo(origin.x,origin.y);
								ctxtt.lineTo(axisX.x,axisX.y);
								ctxtt.lineTo(axisX.x,0);
								ctxtt.lineTo(axisY.x,0);
								ctxtt.stroke();

								var pointsX = [];						
								var month = {
									x : paddingLeft,
									y : HEIGHT - paddingBottom
								}
								
								
								var tss_x = {x:-1,y:-1};								
								
								//draw x ticks
								var x_min = Math.min.apply(Math, data.x);
								var x_max = Math.max.apply(Math, data.x);
								var  x_range = x_max - x_min;
								var data_start = data.start;
								var data_endin = data.end;
								var x_tick_size =0;
								/////////////////////////////////////////
								//////draw x-axis labels (chromosome coordinates)
								/////////////////////////////////////////
								sigfig = getnihe(x_range);
								if (x_range / sigfig >= 2) x_tick_size = sigfig;
								else x_tick_size = sigfig/2;

								var cur_x_tick = Math.ceil( data_start / x_tick_size ) * x_tick_size;
						
								while (cur_x_tick < data_endin ){
										cur_x = (cur_x_tick - data_start)/x_range * (axisX.x - origin.x) + origin.x;
										
										//draw ticks
										ctxtt.beginPath();
										ctxtt.moveTo(cur_x, axisX.y  );
										ctxtt.lineTo(cur_x, axisX.y -5);
										
										ctxtt.strokeStyle = "rgba(0,0,0,1)";
										ctxtt.stroke();

										//draw number labels
										ctxtt.fillStyle = "rgba(0,0,0,1)";
										text =  cur_x_tick ;

										
										ctxtt.fillText(text, cur_x-ctxtt.measureText(text).width/2-1, axisX.y +15);
										cur_x_tick += x_tick_size;
									
								}	
										

							//draw y ticks
										
								var y_max = Math.max.apply(Math,data.y);
								var y_min = Math.min.apply(Math, data.y);
								var y_step = 0;
								if (y_min >= 0 && y_max >= 0)
								{
									sigfig = getnihe(y_max);
									y_max = Math.ceil(y_max / sigfig) * sigfig;
									y_min = 0;
									y_step = sigfig;
								}
								
								var  y_range = Math.abs(y_max-y_min);

								var y_tick_num = Math.max(10, y_range/y_step) ;
								for (i = 0; i <= y_tick_num; i++)
								{
									//draw ticks
									ctxtt.beginPath();
									
									ctxtt.moveTo( axisY.x  ,origin.y- origin.y / y_tick_num * i);
									ctxtt.lineTo( axisY.x+5, origin.y -origin.y / y_tick_num * i);
									ctxtt.strokeStyle = "rgba(0,0,0,1)";
									ctxtt.stroke();

									//draw number labels
									ctxtt.fillStyle = "rgba(0,0,0,1)";
									text = "" + (y_min + y_range/y_tick_num * i);
									if (i < y_tick_num ){
										if(i != 0 ){
											ctxtt.fillText(text, axisY.x-30,origin.y- origin.y/y_tick_num * i +1 );
										}
									}	
									else
										ctxtt.fillText(text, axisY.x-30,origin.y- origin.y/y_tick_num * i ); 
								}
								
								
								//draw actual point and line


									ctxtt.beginPath();
									ctxtt.strokeStyle = "rgba(0,0,255,1)";
									var tss_index = -1;
									var plot_start_x = origin.x ;
									var plot_endin_x = axisX.x;
									var plot_endin_y = axisX.y;
									var plot_start_y = axisY.y;
									var cur_x = plot_start_x;
									for (i = 0; i < data.x.length; i++)
									{
										if(i >0 && data.x[i] == 0 ){
											break;
										}
										if (data.x[i] == data.centerpos) { tss_index = i; }
										var x_val = data.x[i];
										var y_val = data.y[i];
										var cur_y = plot_endin_y - (y_val-y_min)/y_range * (plot_endin_y - plot_start_y);

										if(data.start >0 && data.x[i] > 0){
											if (i == 0){
												ctxtt.moveTo(cur_x, cur_y);
											}
											else{
												ctxtt.lineTo(cur_x, cur_y);
											}
										}else if(data.start ==0 ){
											if (i == 0){
												ctxtt.moveTo(cur_x, cur_y);
											}
											else{
												ctxtt.lineTo(cur_x, cur_y);
											}
										}
										

										x_pos_list.push(cur_x);
										y_pos_list.push(cur_y);
										var endbin = data.x[i] + data.resolution;
										var cash_d = {x: cur_x,y:cur_y,ocount:data.y[i],startbin:data.x[i],endbin:endbin,pvalue:data.pvalue[i]};
										cash_pos.push(cash_d);

										if (i < data.x.length - 1)
										{
											cur_x += (data.x[i+1] - x_val)/x_range * (plot_endin_x - plot_start_x);
										}
										else
										{
											cur_x = plot_endin_x;
										}
									}
									ctxtt.stroke();
								
								//draw anchor point
									var tss_x ={x:-1,y:-1};
									if(tss_index != -1){
										tss_x.x = cash_pos[tss_index].x;
										tss_x.y = cash_pos[tss_index].y;
									}
									
									if(tss_x.x !=-1){
									//	console.log("tss_x "+tss_x.x+","+tss_x.y);
										ctxtt.beginPath();
										ctxtt.moveTo(tss_x.x, 5);
										ctxtt.lineTo(tss_x.x, plot_endin_y );
										ctxtt.strokeStyle = "rgba(255,0,0,0.5)";
										ctxtt.stroke();

										ctxtt.fillStyle = "rgba(255,0,0,1)";
										var anchortext="anchor "+cash_pos[tss_index].startbin+"-"+cash_pos[tss_index].endbin;
										ctxtt.fillText(anchortext, tss_x.x - ctxtt.measureText(anchortext).width/2 , 10);
									}
							}
							
							
							
						}	  
					}
					if($("#id4cwait").length>0){
						$("#id4cwait").css("display","none");	
					}	
				},
				error:function(e){
					alert("error");
					}
				});	
}





function draw4cplotfunc1(dataset,resolution,location,pos_start,pos_end,startbin){
		var params ={"dataset":dataset,"resolution":resolution,"location":location,"expandStartRegion":pos_start,"expandEndRegion":pos_end,"startbin":startbin};
			
			$.ajax({
				url:'/deltaar/ajax/ajaxVirtual4CDraw.action?time='+new Date().getTime(),
				type:'post',
				dataType:'json',
				sync: false,
				data:params,
				success:function(value){
					$("#idwait").css("display","none");
					var canvastt = document.getElementById("id4ccanvas");
					var ctxtt = canvastt.getContext('2d');	
					if(value.fourcPlot != undefined || value.fourcPlot !=null ){
						if(ctxtt != null ){
							
							ctxtt.clearRect(0, 0, canvastt.width, canvastt.height);
							var ycanvas = document.getElementById("idyaix");
							var yctx = ycanvas.getContext('2d');
							yctx.clearRect(0, 0, ycanvas.width, ycanvas.height);
							
							//here,we need to compute bpx 
							var static_viewregion=0;
							var static_viewregion_width = 0 ;
							var zoomwidth = $("#zoomContainer").width();
							var staticblock = $("#static_track .block .pos-label");
							var firstblock =0;
							var secblock =0 ;
							var bpx = 0 ;
							var block_index = 0 ;
							if(staticblock.length >0 ){
								for(var i=0;i< staticblock.length;i++){
									
									var first1 = $(staticblock[i]).html();
									if(first1.indexOf(",") > -1){
											first1 = first1.replace(/,/g,'');
									}
									firstblock = parseInt(first1);
									if(firstblock > 0 ){
										var sec = $(staticblock[i+1]).html();
										if(sec.indexOf(",") > -1){
											sec = sec.replace(/,/g,'');
										}
										secblock = parseInt(sec);
										block_index = i+1;
										break;
										
									}
									
									
								}
							}
							
							
							if(firstblock >0 && secblock >0 ){
								static_viewregion = secblock - firstblock;
							}
							
							staticblock = $("#static_track .block");
							if(staticblock.length>0){
								static_viewregion_width = $(staticblock[block_index]).css("width");
								if(static_viewregion_width.indexOf("px") > -1){
									var sindex = static_viewregion_width.indexOf("px");
									
									static_viewregion_width = static_viewregion_width.substring(0,sindex);
								}
							}
							 
							//console.log("static_viewregion_width="+static_viewregion_width+",static_viewregion="+static_viewregion);								
							if(static_viewregion > 0 ){
								bpx = static_viewregion_width / static_viewregion ;		
								//console.log("===================bpx ======"+bpx);								
							}
			
							
							
							
							var data = value.fourcPlot ;
							
							if(data.x != null && data.y != null ){
								x_pos_list = [];
								y_pos_list = [];
								cash_pos= [];
								
								//here,we need to load the data
								const WIDTH = parseInt(canvastt.width);
								const HEIGHT = parseInt(canvastt.height);
								// 3. 定义坐标轴相对画布的内边距
								var padding = 20;//初始化内边距
								var paddingLeft = 0;//至少大于绘制文字的宽度
								var paddingLeftY = 60;
								var paddingBottom = 30;//至少大于绘制文字的高度
								// 4. 定义绘制坐标轴的关键点的坐标值
								var axisY = {// y轴的起点坐标值
									x : paddingLeftY,
									y : padding
								};
								var origin = {// 原点坐标值(x轴与y轴相交点)
									x : paddingLeft, //paddingLeft
									y : HEIGHT - paddingBottom
								};
								var axisX = {
									x : WIDTH - padding,
									y : HEIGHT - paddingBottom
								};

								
								ctxtt.save();
								ctxtt.translate(WIDTH,origin.y);
								ctxtt.rotate(-0.5*Math.PI);
								ctxtt.fillStyle = "rgba(0,0,0,1)";
								var y_label = "Observed Reads Count";
								ctxtt.fillText(y_label, HEIGHT/2-50, -35 );
								ctxtt.restore();
								
								ctxtt.fillStyle = "rgba(255,0,0,1)";								
								ctxtt.strokeStyle = "rgba(0,0,0,1)";
								ctxtt.beginPath();
								ctxtt.moveTo(WIDTH,0);
								ctxtt.lineTo(WIDTH,origin.y);
								ctxtt.stroke();
								ctxtt.closePath();
								ctxtt.beginPath();
								
								ctxtt.moveTo(origin.x,axisX.y);
								ctxtt.lineTo(WIDTH,axisX.y);
							
								ctxtt.stroke();

								var pointsX = [];						
								var month = {
									x : paddingLeft,
									y : HEIGHT - paddingBottom
								}
								
								
								var tss_x = {x:-1,y:-1};								
								
								//draw x ticks
								var x_min = Math.min.apply(Math, data.x);
								var x_max = Math.max.apply(Math, data.x);
								var  x_range = x_max - x_min;
								var data_start = data.start;
								var data_endin = data.end;
								var x_tick_size =0;
								/////////////////////////////////////////
								//////draw x-axis labels (chromosome coordinates)
								/////////////////////////////////////////
								sigfig = getnihe(x_range);
								
								/*var bpx = 0;
								if(data_endin > data_start ){
									var drange = data_endin - data_start;
									bpx = WIDTH/drange;
									
								}*/
								
							//	console.log("===============4cplot bpx="+bpx+"===================");
								
								if (x_range / sigfig >= 2) x_tick_size = sigfig;
								else x_tick_size = sigfig/2;

								var cur_x_tick = data_start ;
								
								
								/*for(var idex=0;idex<data.x.length;idex++){
									var xpos = data.x[idex];
									var cur_x = xpos * bpx;
									
									//draw ticks
										ctx.beginPath();
										ctx.moveTo(cur_x, axisX.y  );
										ctx.lineTo(cur_x, axisX.y -5);
										
										ctx.strokeStyle = "rgba(0,0,0,1)";
										ctx.stroke();

										//draw number labels
										ctx.fillStyle = "rgba(0,0,0,1)";
										text =  cur_x_tick ;

										
										ctx.fillText(text, cur_x-ctx.measureText(text).width/2-1, axisX.y +15);
									
								}*/
						
						
								//here, need to compute draw pixel by bpx
								staticblock = $("#static_track .block .pos-label");
								var p_pos = getQueryString("loc"); 
								var urlpos_start="";
								if(p_pos!=null){
									if(p_pos.indexOf("..")>-1){
										var idex = p_pos.indexOf("..");
										var idex1 = p_pos.indexOf(":");
										urlpos_start = p_pos.substring(idex1+1,idex);
										urlpos_start = parseInt(urlpos_start);
									}
								}
													
								if(staticblock.length >0 ){
									for(var i=0;i< staticblock.length;i++){
										
										var first1 = $(staticblock[i]).html();
										if(first1.indexOf(",") > -1){
											first1 = first1.replace(/,/g,'');
										}
										firstblock = parseInt(first1);
										if(firstblock > urlpos_start){
											var cur_x = (firstblock - urlpos_start) * bpx;
											ctxtt.beginPath();
											ctxtt.moveTo(cur_x, axisX.y  );
											ctxtt.lineTo(cur_x, axisX.y -5);
											
											ctxtt.strokeStyle = "rgba(0,0,0,1)";
											ctxtt.stroke();

											//draw number labels
											ctxtt.fillStyle = "rgba(0,0,0,1)";
											text =  firstblock ;
											
											var textpx = cur_x-ctxtt.measureText(text).width/2-1;
											if(textpx < 0 ){
												textpx = 0 ;
											}
											if(cur_x > axisX.x){
												textpx = cur_x-ctxtt.measureText(text).width-1;
											}
											
											ctxtt.fillText(text, textpx, axisX.y +15);
										}
									}
								}
								
								//draw y ticks
								var y_max = Math.max.apply(Math,data.y);
								var y_min = Math.min.apply(Math, data.y);
								var y_step = 0;
								if (y_min >= 0 && y_max >= 0){
									sigfig = getnihe(y_max);
									y_max = Math.ceil(y_max / sigfig) * sigfig;
									y_min = 0;
									y_step = sigfig;
								}
								
								var  y_range = Math.abs(y_max-y_min);
								var y_tick_num = Math.max(10, y_range/y_step) ;
								for (i = 0; i <= y_tick_num; i++){
									//draw ticks
									yctx.beginPath();
									
									yctx.moveTo( axisY.x-5 ,origin.y- origin.y / y_tick_num * i);
									yctx.lineTo( axisY.x, origin.y -origin.y / y_tick_num * i);
									yctx.strokeStyle = "rgba(0,0,0,1)";
									yctx.stroke();

									//draw number labels
									yctx.fillStyle = "rgba(0,0,0,1)";
									text = "" + (y_min + y_range/y_tick_num * i);
									if (i < y_tick_num ){
										if(i != 0 ){
											yctx.fillText(text, axisY.x-30,origin.y- origin.y/y_tick_num * i +1 );
										}
									}	
									else
										yctx.fillText(text, axisY.x-30,origin.y- origin.y/y_tick_num * i ); 
								}
								
								
								//draw actual point and line


									ctxtt.beginPath();
									ctxtt.strokeStyle = "rgba(0,0,255,1)";
									var tss_index = -1;
									var plot_start_x = origin.x ;
									var plot_endin_x = axisX.x;
									var plot_endin_y = axisX.y;
									var plot_start_y = axisY.y;
									//var cur_x = plot_start_x;
									var cur_x = 0 ;
									for (i = 0; i < data.x.length; i++){
										if(i >0 && data.x[i] == 0 ){
											break;
										}
										if (data.x[i] == data.centerpos) { tss_index = i; }
										var x_val = data.x[i];
										var y_val = data.y[i];
										var cur_y = plot_endin_y - (y_val-y_min)/y_range * (plot_endin_y - plot_start_y);
										if (i == 0){
												cur_x = (x_val - urlpos_start) * bpx;
												if(cur_x < 0 ){
													cur_x = 0;
												}
												ctxtt.moveTo(cur_x, cur_y);
										}
										else{
												ctxtt.lineTo(cur_x, cur_y);
										}
										
										//alert("draw point cur_x="+cur_x);

										x_pos_list.push(cur_x);
										y_pos_list.push(cur_y);
										var endbin = data.x[i] + data.resolution;
										var cash_d = {x: cur_x,y:cur_y,ocount:data.y[i],startbin:data.x[i],endbin:endbin,pvalue:data.pvalue[i]};
										cash_pos.push(cash_d);

										if (i < (data.x.length - 1)){
											//cur_x += (data.x[i+1] - x_val)/x_range * (plot_endin_x - plot_start_x);
											cur_x += (data.x[i+1] - x_val)*bpx;
										}
										else
										{
											cur_x = axisX.x;
										}
									}
									ctxtt.stroke();
								
								//draw anchor point
									var tss_x ={x:-1,y:-1};
									if(tss_index != -1){
										tss_x.x = cash_pos[tss_index].x;
										tss_x.y = cash_pos[tss_index].y;
									}
									
									if(tss_x.x !=-1){
									//	console.log("tss_x "+tss_x.x+","+tss_x.y);
										ctxtt.beginPath();
										var apx = tss_x.x ;
										//ctx.moveTo(tss_x.x, 5);
										//ctx.lineTo(tss_x.x, plot_endin_y );
										ctxtt.moveTo(apx, 5);
										ctxtt.lineTo(apx, plot_endin_y );
										ctxtt.strokeStyle = "rgba(255,0,0,0.5)";
										ctxtt.stroke();

										ctxtt.fillStyle = "rgba(255,0,0,1)";
										var anchortext="anchor "+cash_pos[tss_index].startbin+"-"+cash_pos[tss_index].endbin;
										ctxtt.fillText(anchortext, apx-ctxtt.measureText(anchortext).width+5  , 10); //apx+5
									}
							}
							
							
							
						}	  
					}
					if($("#id4cwait").length>0){
						$("#id4cwait").css("display","none");	
					}	
				},
				error:function(e){
					alert("error");
					}
				});	
}


//get nihe number
function getnihe(num){
    return Math.pow(10, Math.floor(Math.log10(num)));
}



//extend canvas mouse move
function extend_canvas_mouse_move1(e){
	
	var mx=e.clientX;
	var my=e.clientY;	
	var canvastt = document.getElementById("id4ccanvas");
	var pos=absolutePosition(canvastt);
	var lefttop = get_page_left_top();
	var m_mx = mx +lefttop[0] - pos[0];
	var m_my = my+lefttop[1] - pos[1];
	if(cash_pos.length>0){
		for(var i=0;i<cash_pos.length;i++){
			var x = cash_pos[i].x;
			var y = cash_pos[i].y;
			//var dx = Math.sqrt((x-m_mx)*(x-m_mx)+(y-m_my)*(y-m_my));
			//console.log("===dx="+dx+"mx,"+mx+",my="+my+",pos[0]="+pos[0]+",pos[1]="+pos[1]+",m_my="+m_my+",m_mx="+m_mx+",x="+x+",y="+y+",i="+i);
			if( m_mx >= (x-2) && m_mx <= (x+2) ){
				//then draw a circos
				$("#idalignline").css("display","block");
				$("#idalignline").css("left",x-3);
				var text="Matrix Bin:"+cash_pos[i].startbin+"-"+cash_pos[i].endbin+"<br/>Observed Reads Count:"+cash_pos[i].ocount;
				if(cash_pos[i].pvalue != "N"){
					text += "<br/>P Value:"+cash_pos[i].pvalue;
				}
				$("#idtext").html(text);
				
				//make anchor
				var dataset=$("#idembed4cdataset").val();
				var resolution = $("#idembed4cbin").val();
				var t_pos=$("#idembed4cpos").val();
				var startbin = $("#idembed4cstartbin").val();
				var startregion = $("#idembed4cexpandStartRegion").val();
				var endregion = $("#idembed4cexpandEndRegion").val();
				
				
				var chr="";
				if(t_pos.indexOf(":")>-1){
					var idex = t_pos.indexOf(":");
					chr = t_pos.substring(0,idex);
				}
				var location = chr+":"+cash_pos[i].startbin;

				text = '<a style="cursor:hand;color:red;" href="javascript:draw4cplotfunc1(\''+dataset+'\',\''+resolution+'\',\''+location+'\',\''+startregion+'\',\''+endregion+'\',\''+startbin+'\')" onclick="javascript:draw4cplotfunc1(\''+dataset+'\',\''+resolution+'\',\''+location+'\',\''+startregion+'\',\''+endregion+'\',\''+startbin+'\')">Make Anchor</a>';
		
				$("#idanchor").html(text);
				
				break;
			}
		}
		
	}
	
	
}

//extend canvas mouse move
function extend_canvas_mouse_move2(e){
	
	var mx=e.clientX;
	var my=e.clientY;	
	var canvastt = document.getElementById("id4ccanvas");
	var pos=absolutePosition(canvastt);
	var lefttop = get_page_left_top();
	var m_mx = mx +lefttop[0] - pos[0];
	var m_my = my+lefttop[1] - pos[1];
	if(cash_pos.length>0){
		for(var i=0;i<cash_pos.length;i++){
			var x = cash_pos[i].x;
			var y = cash_pos[i].y;
			//var dx = Math.sqrt((x-m_mx)*(x-m_mx)+(y-m_my)*(y-m_my));
			//console.log("===dx="+dx+"mx,"+mx+",my="+my+",pos[0]="+pos[0]+",pos[1]="+pos[1]+",m_my="+m_my+",m_mx="+m_mx+",x="+x+",y="+y+",i="+i);
			if( m_mx >= (x-2) && m_mx <= (x+2) ){
				//then draw a circos
				$("#idalignline").css("display","block");
				$("#idalignline").css("left",x-3);
				var text="Matrix Bin:"+cash_pos[i].startbin+"-"+cash_pos[i].endbin+"<br/>Observed Reads Count:"+cash_pos[i].ocount;
				if(cash_pos[i].pvalue != "N"){
					text += "<br/>P Value:"+cash_pos[i].pvalue;
				}
				$("#idtext").html(text);
				
				//make anchor
				var dataset=$("#idembed4cdataset").val();
				var resolution = $("#idembed4cbin").val();
				var t_pos=$("#idembed4cpos").val();
				var startbin = $("#idembed4cstartbin").val();
				var startregion = $("#idembed4cexpandStartRegion").val();
				var endregion = $("#idembed4cexpandEndRegion").val();
				
				
				var chr="";
				if(t_pos.indexOf(":")>-1){
					var idex = t_pos.indexOf(":");
					chr = t_pos.substring(0,idex);
				}
				var location = chr+":"+cash_pos[i].startbin;

				text = '<a style="cursor:hand;color:red;" href="javascript:draw4cplotfunccirclet(\''+dataset+'\',\''+resolution+'\',\''+location+'\',\''+startregion+'\',\''+endregion+'\',\''+startbin+'\')" onclick="javascript:draw4cplotfunccirclet(\''+dataset+'\',\''+resolution+'\',\''+location+'\',\''+startregion+'\',\''+endregion+'\',\''+startbin+'\')">Make Anchor</a>';
		
				$("#idanchor").html(text);
				
				break;
			}
		}
		
	}
	
	
}


function showCell(){
	var orga = $("#id4orga").val();
	var urlconf =  getQueryString("conf"); 
	if(urlconf == null ){
		urlconf =  getQueryString("data"); 	
	}
	var url_org =  getQueryString("organism"); 
	var url_bin = getQueryString("resolution"); 
	if(orga == "hg18"){
		
		$("#id4dataset").empty();
		$("#id4resolution").empty();
		var option = "<option value='GSE18199_GM06690' selected='selected'>GSE18199_GM06690</option>";
		$("#id4dataset").append(option);
		option = "<option value='GSE18199_K562'>GSE18199_K562</option>";
		$("#id4dataset").append(option);
		option = "<option value='GSE35156_IMR90'>GSE35156_IMR90</option>";
		$("#id4dataset").append(option);
		
		option = "<option value='1000000'>1mb</option>";
		$("#id4resolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#id4resolution").append(option);
		if(url_org == "hg18"){
			option = "<option value='"+urlconf+"'>"+urlconf+"</option>";
			$("#id4dataset").append(option);
			option = "<option value='"+url_bin+"'>"+url_bin+"</option>";
			$("#id4resolution").append(option);
		
		}
		
	}else if(orga == "hg19"){
		$("#id4dataset").empty();
		$("#id4resolution").empty();
		var option = "<option value='GSE63525_K562_combined_raw' selected='selected'>GSE63525_K562_combined_raw</option>";
		$("#id4dataset").append(option);
	
		option = "<option value='GSE63525_GM12878_combined_raw'>GSE63525_GM12878_combined_raw</option>";
		$("#id4dataset").append(option);
		option = "<option value='GSE63525_HUVEC_combined_raw'>GSE63525_HUVEC_combined_raw</option>";
		$("#id4dataset").append(option);
		option = "<option value='GSE63525_HMEC_combined_raw'>GSE63525_HMEC_combined_raw</option>";
		$("#id4dataset").append(option);
		option = "<option value='GSE63525_IMR90_combined_raw'>GSE63525_IMR90_combined_raw</option>";
		$("#id4dataset").append(option);
		option = "<option value='GSE63525_KBM7_combined_raw'>GSE63525_KBM7_combined_raw</option>";
		$("#id4dataset").append(option);
		
		option = "<option value='1000000'>1mb</option>";
		$("#id4resolution").append(option);
		option = "<option value='500000'>500kb</option>";
		$("#id4resolution").append(option);
		option = "<option value='250000'>250kb</option>";
		$("#id4resolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#id4resolution").append(option);
		//option = "<option value='50000'>50kb</option>";
	//	$("#id4resolution").append(option);
	//	option = "<option value='25000'>25kb</option>";
	//	$("#id4resolution").append(option);
	//	option = "<option value='5000'>5kb</option>";
	//	$("#id4resolution").append(option);
		if(url_org == "hg19"){
			option = "<option value='"+urlconf+"'>"+urlconf+"</option>";
			$("#id4dataset").append(option);
			option = "<option value='"+url_bin+"'>"+url_bin+"</option>";
			$("#id4resolution").append(option);
		
		}
		

	}
}

function showDataset(){
	var dataset = $("#id4dataset").val();
	$("#id4resolution").empty();
	var urlconf =  getQueryString("conf"); 
	if(urlconf == null ){
		urlconf =  getQueryString("data"); 	
	}
	var url_bin = getQueryString("resolution"); 
	if(dataset.indexOf("GSE18199") > -1 ){
	
		var option = "<option value='1000000'>1mb</option>";
		$("#id4resolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#id4resolution").append(option);
	}else if(dataset.indexOf("GSE35156") > -1){

		var option = "<option value='40000'>40kb</option>";
		$("#id4resolution").append(option);
	}else if(dataset.indexOf("GSE63525") > -1){
		var option = "<option value='1000000'>1mb</option>";
		$("#id4resolution").append(option);
		option = "<option value='500000'>500kb</option>";
		$("#id4resolution").append(option);
		option = "<option value='250000'>250kb</option>";
		$("#id4resolution").append(option);
		option = "<option value='100000'>100kb</option>";
		$("#id4resolution").append(option);
		//option = "<option value='50000'>50kb</option>";
		//$("#id4resolution").append(option);
	//	option = "<option value='25000'>25kb</option>";
		//$("#id4resolution").append(option);
		//option = "<option value='5000'>5kb</option>";
		//$("#id4resolution").append(option);
	}else if(dataset == urlconf){
		option = "<option value='"+url_bin+"'>"+url_bin+"</option>";
		$("#id4resolution").append(option);
	}

}


function showVirtual4C(){
			$("#virtualpanel").css("display","");
			//var containerwidth = $(document.body).width();
			/*if(containerwidth.indexOf("px")>-1){
				var idex = containerwidth.indexOf("px");
				containerwidth = containerwidth.substring(0,idex);
			}
			alert(containerwidth);*/
			//$("#id4ccanvas").attr("width",containerwidth);
			//var pl = parseInt(containerwidth) - 60;
			//$("#idyaxisdiv").css("margin-left",pl+"px");
			
			//here, we need to comput jbrowse bpx and then draw x-axis
			
			loadVirtual4C();
}

function showPanelVirtual4C(){
	$("#virtualpanel").css("display","");
	if(document.getElementById("idshowpbtn").style.display==""){ //physical view embed mode
		loadVirtual4C();
	}
	
}

		
function hideVirutal4C(){
	$("#virtualpanel").css("display","none");
	$("#4cplot-dialog").css("height","30px");
}
function closeVirtual4C(){
			$("#4cplot-dialog").css("display","none");
			$("#4cplot-dialog").css("height","0px");
		}
