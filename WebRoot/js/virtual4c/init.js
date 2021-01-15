var canvas = null;
var ctx = null ;

var x_pos_list = [];
var y_pos_list = [];


//load layout
function loadLayout(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');	
	
	var p_organism = getQueryString("organism");
	if(p_organism != null){
		if(p_organism == "hg18" || p_organism=="hg19"){
			$("#idorga").val(p_organism);
			showCell();
		}
	}
	var p_position = getQueryString("loc");
	if(p_position != null ){
		$("#idposition").val(p_position)
	}
	var p_dataset = getQueryString("dataset");
	if( p_dataset != null ){
		$("#iddataset").val(p_dataset);
		
	}else{
		showCell();
	}
	
	var p_resolution = getQueryString("resolution");
	if(p_resolution != null ){
		$("#idresolution").val(p_resolution);
	}
	
	
	var p_expand = getQueryString("expand");
	if(p_expand != null ){
		 $("#idexpand").val(p_expand);
	}else{
		$("#idexpand").val("500000");
	}
	
	var p_gburl =  getQueryString("gurl");
	if( p_gburl != null ){
		$("#idgburl").val(p_gburl) ;
	}
	
	
	$("#windowsize-vertical").slider({
		
			  range: "min",
			  min: 1,
			  step: 1,
			  max: 20,
			  showLabels:true,
			  showScale:true,
			  value: 1,
			  slide: function( event, ui ) {
			  $( "#windownamount" ).val(ui.value);
				$( "#windowsize-vertical" ).find("a").css("font-size","12px").css("color","#ff0000").css("width","25px").text(ui.value);				
			  },
			  stop: function( event, ui ) { //ui.value
				//draw 4c plot
				var zoom = parseInt(ui.value);
				var dataset = $("#iddataset").val();
				var resolution = $("#idresolution").val();
				var location = $("#idposition").val();
				var expandRegion = $("#idexpand").val();
				expandRegion = parseInt(expandRegion) * zoom;
				var flag = true;
				if(location == "" || location.length ==0){
					flag = false;
				}
				
				draw4cplot(dataset,resolution,location,expandRegion,0,flag);
			  }
			});
	
	
		$( "#windownamount" ).val( $( "#windowsize-vertical" ).slider( "value" ) );
		$( "#windowsize-vertical" ).find("a").css("font-size","12px").css("color","#ff0000").css("width","25px").text(1);
	
	initdraw4cplot();
	//first get data
	canvas.addEventListener("mousemove",extend_canvas_mouse_move,false);

}

//organism,loc,dataset,resolution,expand,gurl
function initdraw4cplot(){
	
	var dataset = $("#iddataset").val();
	var resolution = $("#idresolution").val();
	var location = $("#idposition").val();
	var expandRegion = $("#idexpand").val();
	
	var flag = true;
	if(location == "" || location.length ==0){
		flag = false;
	}
	
	draw4cplot(dataset,resolution,location,expandRegion,0,flag,canvas,ctx);
}


//extend canvas mouse move
function extend_canvas_mouse_move(e){

	var mx=e.clientX;
	var my=e.clientY;	
	var pos=absolutePosition(canvas);
	var lefttop = get_page_left_top();
	var m_mx = mx +lefttop[0] - pos[0];
	var m_my = my+lefttop[1] - pos[1];
	
	$("#idanchor").html("");
	$("#idanchor").css("left",m_mx-10).css("top",m_my);
	
	if(cash_pos.length>0){
		for(var i=0;i<cash_pos.length;i++){
			var x = cash_pos[i].x;
			var y = cash_pos[i].y;
			//var dx = Math.sqrt((x-m_mx)*(x-m_mx)+(y-m_my)*(y-m_my));
			//console.log("===dx="+dx+"mx,"+mx+",my="+my+",pos[0]="+pos[0]+",pos[1]="+pos[1]+",m_my="+m_my+",m_mx="+m_mx+",x="+x+",y="+y+",i="+i);
			if( m_mx >= (x-2) && m_mx <= (x+2) ){
				//then draw a circos
				
				$("#idalignline").css("display","block");
				$("#idalignline").css("left",x-5);
				$("#iddivframe").css("margin-top","-610px");
				
				var canvas1 = document.getElementById("idannotecanvas");
				var ctx1 = canvas1.getContext('2d');
				ctx1.lineWidth=1;
				ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
				ctx1.strokeStyle='rgba(255,0,0,1)';
				ctx1.beginPath();
				ctx1.arc(x,y+20,5,0,Math.PI*2,false);
				ctx1.stroke();
				var text="Matrix Bin:"+cash_pos[i].startbin+"-"+cash_pos[i].endbin+"<br/>Observed Frequency:"+cash_pos[i].ocount;
				$("#idtext").html(text);
				
				//anchor
				
				$("#idanchor").css("display","");
				var zoom = $("#windownamount").val();
				var dataset = $("#iddataset").val();
				var resolution = $("#idresolution").val();
				var t_pos = $("#idposition").val();
				var chr="";
				if(t_pos.indexOf(":")>-1){
					var idex = t_pos.indexOf(":");
					chr = t_pos.substring(0,idex);
				}
				var location = chr+":"+cash_pos[i].startbin;
				var expandRegion = $("#idexpand").val();
				expandRegion = parseInt(expandRegion) * zoom;
				
				
				
				var text = '<a style="cursor:hand" href="javascript:draw4cplotfunc(\''+dataset+'\',\''+resolution+'\',\''+location+'\',\''+expandRegion+'\',0)" onclick="javascript:draw4cplotfunc(\''+dataset+'\',\''+resolution+'\',\''+location+'\',\''+expandRegion+'\',0)">Make Anchor</a>';
		
				$("#idanchor").html(text);
				
				break;
			}else{
				
				$("#idalignline").css("display","none");
				$("#iddivframe").css("margin-top","10px");
				$("#idanchor").css("display","none");
				$("#idanchor").html("");
			}
		}	
	}	
}






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

//from given url get parameter
function getQueryStringURL(url,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


//from window location get val
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


//gbrowse url
function showgburl(){
	var location = $("#idposition").val();
	var expandRegion = $("#idexpand").val();
	var url  = getQueryString("gurl");
	if($("#iddelta").prop("checked")){
		if(url == null ){
			url = "http://deltaar.big.ac.cn/jbrowse/delta_index.html?data=1478854512827&tracks=&highlight=";
		}
			     
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
			var loc = getQueryString("loc");
			if(loc != null){
				loc = loc.replace(":","%3A");	
				url = gburl.replace(loc,loc_left);
			}else{
				url += "&loc="+loc_left;	
			}
		}
		$("#idgburl").val(url);		
		
	}else if($("#iducsc").prop("checked")){
		if(url == null ){
			url = "http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&hgsid=598579649_3L6lAjAoBwHsq1TTKuJCjSbqhZgw";
		}

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
			var loc_left = "chr"+arr[0]+"%3A"+posleft+"-"+posright;
			var loc = getQueryString("loc");
			if(loc != null){
				loc = loc.replace(":","%3A");	
				url = gburl.replace(loc,loc_left);
			}else{
				url += "&position="+loc_left;			
			}
		}
		$("#idgburl").val(url);
		
	}else if($("#idbnone").prop("checked")){
		$("#idgburl").val("");			
	}
	
}


