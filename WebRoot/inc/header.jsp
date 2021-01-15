<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
</head>
<body>
	<div id="logo">		
    <div align="left">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
             <td width="70%" height="40" style="font-size:28px; font-weight:bold;">Delta.AR : a platform for augmented reality assisted 3D genome data visualization</td>
          </tr>
          </tbody>
          </table>
    </div>
  </div>
<div id="menu" style=" ">
		
	      <div align="left">
		       <ul>
			  	<li><a id="menu0" class="on" href="/deltaar/index.jsp">Home</a></li>
				<li><a id="menu6" href="/deltaar/pages/ar/ar.jsp">AR Configure</a></li>
				<!--<li><a id="menu3" class="off" href="javascript:setpmenu()" >Physical View</a></li> -->
		      <!--  <li><a id="menu1" class="off" href="javascript:setgmenu()"  >Genome View</a></li>
		        <li><a id="menu2" class="off" href="javascript:settmenu()" >Topological View</a></li> -->
				<!--
				<li><a id="menu7" class="off" href="/deltaar/pages/visualization/virtual_4c.jsp?organism=hg18&loc=1:10000000&dataset=GSE18199_K562&resolution=1000000&expand=10000000">Virtual 4C</a></li> -->
				
		        <li><a id="menu4" class="off" href="/deltaar/pages/download/download.jsp">Download</a></li>
		        <li><a id="menu5" href="/deltaar/pages/help/help.jsp">Help</a>
					<ul style="position:relative;z-index:999999;top:2px;">
						<li style="position:absolute; top:0px;"><a  href="/deltaar/pages/help/FAQ.jsp">FAQ</a></li>
						<li style="position:absolute; top:20px;"><a  href="/deltaar/pages/help/help.jsp">How to use</a></li>
						<li style="position:absolute;top:40px;"><a  href="/deltaar/pages/dataset/dataset.jsp">Public Dataset</a></li>
						
					</ul>
				</li>
	        </ul>
      </div>
</div>

	<!--<script type="text/javascript" src="/deltaar/js/cookie.js"></script> -->
	<!--<script type="text/javascript">
		function setpmenu(){
				var hololensid =  getQueryStringt("hololensid");
				if(hololensid == null || hololensid==""){	
					hololensid = Cookies.get("delta.ar.hololensid");
					if(hololensid == null || hololensid==""){
						alert("Please configure AR first!");
					}
				} 
				
				var href="/deltaar/pages/visualization/physical_view.jsp?conf=hg19&loc=11%3A4500000..6500000&tracks=3dmodel,TAD,Interaction,LCR_Gene&zoom=146&hololensid="+hololensid;
				$("#menu3").attr("href",href);
		}
		
		function setgmenu(){
				var hololensid =  getQueryStringt("hololensid");
				if(hololensid == null || hololensid==""){	
					hololensid = Cookies.get("delta.ar.hololensid");
					if(hololensid == null || hololensid==""){
						alert("Please configure AR first!");
					}
				} 
				var href="/deltaar/jbrowse/delta_index.html?data=hg19&loc=11%3A1..13250000&tracks=TAD%2CInteraction%2CLCR_Gene%2CLCR%2CGM12878_H2AZ_signal%2Cresolution=50000&organism=hg19&sb=90&hololensid="+hololensid;
				$("#menu1").attr("href",href);
		}
		
		function settmenu(){
				var hololensid =  getQueryStringt("hololensid");
				if(hololensid == null || hololensid==""){	
					hololensid = Cookies.get("delta.ar.hololensid");
					if(hololensid == null || hololensid==""){
						alert("Please configure AR first!");
					}
				} 
				var href="/deltaar/pages/visualization/topo_viewm.jsp?conf=hg19&loc=11%3A4500000..6500000&tracks=Interaction,GM12878_H2AZ,IMR90_RAD21&resolution=50000&organism=hg19&sb=90&hololensid="+hololensid;
				$("#menu2").attr("href",href);	
		}
		
		function getQueryStringt(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		}
	
	</script> -->
 </body>
 </html>