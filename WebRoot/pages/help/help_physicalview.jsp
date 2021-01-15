<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="/deltaar/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/deltaar/js/menu.js"></script>
<title>Delta</title>
</head>


<body>
<div id="container">
	<jsp:include page="/inc/header.jsp" />
	<div id="content">
    	
    
		<div id="right-column1" style="margin-left:5px;width:250px;">
		  <div class="header_border">
				
			<div class="block"><img src="/deltaar/images/breadcrumb.gif" />4.	Physical View </div>
			<ul>
			<li><a href="/deltaar/pages/help/help_physicalview.jsp#41">4.1	Add custom tracks</a></li>
					<li><a href="/deltaar/pages/help/help_physicalview.jsp#42">4.2 Annotating 3D model</a></li>
					<li><a href="/deltaar/pages/help/help_physicalview.jsp#43">4.3 Dual model</a></li>
	
					<li><a href="/deltaar/pages/help/help_physicalview.jsp#45">4.4 Jumping to Genome View and Topological View</a></li>
			</ul>	
				
		  </div>
	  </div>
	  
	  <div id="left-column1" style="margin-left:10px;width:980px;margin-top:10px;">
	  	<div class="header_border" style="padding-top:0px;margin-top:0px;">
	  	  <div class="header_content">
				<p class="tracktitle" id="physical">4.Physical View</p>
				<div><br/>
				  <br/>
					<img src="/deltaar/images/help/FigureS1.jpg"  width="800" >
			</div>
				<div id="41" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">4.1	Add custom tracks</div>
				<div>To add a custom track, users can click on “Upload”, a web page will be shown like the following:<br/>
				<img src="/deltaar/images/help/physical_upload.png" /> <br/>
				
				<div style="color:blue; font-weight:bold; padding-top:5px; padding-bottom:5px;">1) The 3D model file format</div>	
				
				<div>
				Delta accepts XYZ and JSON format for 3D model.<br/>
				
				Example<br/>
4<br/>
xyz<br/>
C 0.00 0.00 0.00 1:1..1000000<br/>
C 0.00 1.00 0.00 1:1000000..2000000<br/>
C 0.00 1.00 1.00 1:2000000..3000000<br/>
C 0.00 0.00 1.00 1:3000000..4000000<br/>
Example <br/>
A JSON file <br/>
[{"name":"C1","chr":"1","start":1,"end":10000,"x":0.0000,"y":0.0000,"z":0.0000},{"name":"C2","chr":"1","start":10001,"end":20000,"x":0.2123,"y":0.0000,"z":0.0000},{"name":"C3","chr":"1","start":20001,"end":30000,"x":0.1291,"y":0.1493,"z":0.0000}]<br/>

				</div>
				<div style="color:blue; font-weight:bold; padding-top:5px; padding-bottom:5px;">2) The GFF3 format for Gene</div>
			
				<div>
				11	ensembl	protein_coding	4072500	4116681	.	+	.	ID=RRM1;Name=RRM1<br/>
11	ensembl	protein_coding	4219862	4220446	.	-	.	ID=AC018793.12-1;Name=AC018793.12-1<br/>
11	ensembl	protein_coding	4307671	4308255	.	+	.	ID=AC018793.12-2;Name=AC018793.12-2<br/>
11	ensembl	protein_coding	4345157	4346101	.	-	.	ID=OR52B4;Name=OR52B4<br/>

				</div>
				<div style="color:blue; font-weight:bold; padding-top:5px; padding-bottom:5px;">3) The GFF3 format for annotated feature</div>
				<div>
				11	encode	histone	4449556	4452889	1.7674419	.	.	ID=1336;Name=1336;Min=0.0;Max=37<br/>
11	encode	histone	4452889	4456222	2.409863	.	.	ID=1337;Name=1337;Min=0.0;Max=37<br/>
11	encode	histone	4456222	4459555	1.3539394	.	.	ID=1338;Name=1338;Min=0.0;Max=37<br/>
11	encode	histone	4459555	4462888	1.435	.	.	ID=1339;Name=1339;Min=0.0;Max=37<br/>
11	encode	histone	4462888	4466221	1.3724136	.	.	ID=1340;Name=1340;Min=0.0;Max=37<br/>


				</div>	
				
				<div style="color:blue; font-weight:bold; padding-top:5px; padding-bottom:5px;">4) The GFF3 format for Interaction </div>
				<div>
			11   hic  arc     4600000 5050000  .       .       .       ID=87;Name=87;Note=11:4600000-4650000|11:5000000-5050000<br/>
11      hic     arc     4600000 5100000 .       .       .   ID=88;Name=88;Note=11:4600000-4650000|11:5050000-5100000<br/>
11      hic     arc     4600000 5150000 .       .       .   ID=89;Name=89;Note=11:4600000-4650000|11:5100000-5150000<br/>
			</div>	
				
				<div style="color:blue; font-weight:bold; padding-top:5px; padding-bottom:5px;">5) The GFF3 format for TAD </div>
				<div>
			11	hic	tad	4500000	4650000	.	.	.	ID=1;Name=1;<br/>
11	hic	tad	5300000	5450000	.	.	ID=2;Name=2;<br/>
11	hic	tad	5450000	5650000	.	.	.	ID=3;Name=3;<br/>
11	hic	tad	6200000	6400000	.	.	.	ID=4;Name=4;<br/>

			</div>	
				
				</div>
				
				
				<div id="42" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">4.2 Annotating 3D model	</div>
				<div>Four types of tracks (quantitative, regional, labeling, and connective) are currently supported.<br/>
				<b>The quantitative feature,</b> as the major category of features that covers the output of a wide spectrum of biochemical assays, e.g. ChIP-seq, DNase-seq, RNA-seq, is represented as a colored stripe on the beads. <b>The brightness and width of the stripe represents the strength of the feature. Delta can automatically determine to display summarized data or raw data points according to the current zooming level. For example, when the mode is fully zoomed out, the mean value of the feature within the genome region of a bead is painted onto the whole bead, while zooming in, more and more detailed features will emerge.</b> Ideally, i.e the model was built with sufficient small bin size, each annotated ChIP-seq peaks shall be presented when zoom into the highest resolution. However, because the highest resolution 3D physical models that possibly generated from current Hi-C data is about hundreds of kilobases, we only allow maximal 10 bins within a bead for any quantitative features.<br/><br/>
				<img src="/deltaar/images/Figure2_1.jpg" /> <br/><br/>
			
	<b>A regional feature is visualized as a colored shadow covering the beads within the domain.</b> The minimal unit in displaying regional feature is a bead, in another word, when a domain cover a region less than a bead represented, the whole bead will be shadowed. If there are more than two domains need to be shown in the current visual field, Delta will shadow the domains with two alternating colors. Users can upload their customized domain data as well. <br/><br/>
	<img src="/deltaar/images/Figure2_2.jpg" /> <br/><br/>
	
	<b>The labeling feature is represented as plain text marked next to the genomic features.</b>  The most commonly used labeling feature is gene name. Although having all genes labelled is supported, it is not recommended as the labels will be overlapping with each other and can be hardly distinguished. Users can label the selected genes by inputting the names. In fact, Delta takes the gene annotations as both quantitative and labeling features. When the view is extremely zoomed out, Delta will take the genes as quantitative features with brightness of color represents the gene density in the genome region, when the view is sufficiently zoomed in, the gene features will be turned into labeling, in which each gene can be presented as individual stripe with gene name labeled, the orientation of the gene is indicated by the color of stripe. <br/><br/>
		<img src="/deltaar/images/Figure2_3.jpg" /> <br/><br/>
	<b>Connective features is the dashed arcs linking two beads, representing the chromatin loops</b>  . Delta displays intra-region (visual field) loops, i.e. the loops connecting to the beads out of current visual field will be omitted. This setting can help users focus on the selected partners in a clear vision. The arcs can be highlighted using mouse click with &quot;shift&quot; key down. Highlighting an arc will refresh the conjunct genome/circlet browser (see below). This is rather useful when comparing the two connected loci with multiple epigenetic features. <br/><br/>
		<img src="/deltaar/images/Figure2_4.jpg" /> <br/>
		<br/>
	<br/>
	
</div>
				<div id="43" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">4.3	Dual View Mode</div>
				<div> To enter the dual-mode, <b>users can click on the check box named &quot;Enter Dual-mode&quot; in the 3D physical view page.</b> Once entering into entered the dual-mode, the data displayed in the conjunctive genome or topological view is always synchronized with the physical view. For example, if you select a part of the physical model by drawing mouse left key with &quot;Alt&quot; key down, the synchronized genome or topological view will zoom into the region automatically. When one highlight an object in the physical view, e.g. a bead or an arc, the corresponding region will also be highlighted in the conjunctive view immediately.<br/><br/>
				<img src="/deltaar/images/Figure3.jpg" width="800" height="600" /> <br/><br/>
				<strong>Physical View & Topological View</strong> <br/><br/>
				Click "Goto topological" button from genome view in dual-mode with physical view, a topological view will be displayed as follows.<br/>
				<br/>
				
				 <img src="/deltaar/images/physical_circlet.jpg" width="900" height="700" /> <br/>
					
				
				<br/>
				<br/>
				</div>
				
				<div id="45" style="padding-top:10px; padding-bottom:10px; font-weight:bold;">4.5 Jumping to Genome View and Topological View</div>
			<div>Users can click the &quot;Goto Genome&quot; or &quot;Goto Topological&quot; button to go to the Genome View or Physical View respectively. </div>
				
		  </div>
	  	</div>
		
      </div>
		
	</div>
	<jsp:include page="/inc/footer.jsp" />
</div>

<script type="text/javascript" language="javascript">
		showTabs('5');
</script>
</body>
</html>
