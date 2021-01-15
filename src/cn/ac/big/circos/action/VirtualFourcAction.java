package cn.ac.big.circos.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.LineNumberReader;

import cn.ac.big.circos.po.FourcPlotBean;
import cn.ac.big.circos.po.PipeBean;
import cn.ac.big.circos.util.XmlHander;

import com.opensymphony.xwork2.ActionSupport;

public class VirtualFourcAction  extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String organism; // organism
	private String dataset; // select dataset
	private String resolution; // data resolution size
	private String location; // genename or input position
	private String expandRegion; // expand region
	private String expandStartRegion;
	private String expandEndRegion;
	
	private int startbin;
	private int readscount;
	private String pvalue;
	private FourcPlotBean fourcPlot;
	
	/**************************************************
	 * this is used to get virtual 4c data
	 * 
	 * @return
	 */
	public String execGetVirual4CData(){
		
		try{
			String datapath="";
			String [] chrs = new String[2];
			if(dataset != null){
				if(location !=null && location.indexOf(":") > -1 ){ // position
					 chrs = location.split(":"); // chrom:position
					if(chrs != null && chrs.length == 2){
						datapath += chrs[0]+"_"+resolution+".matrix";
					}
				}
				if(dataset.indexOf("_")> -1 ){
					
					
					
					String []arrs = dataset.split("_");
					if(arrs != null && arrs.length >= 2){
						String geo= arrs[0];
						String cell = arrs[1];
					
						if(geo.equals("GSE18199") == true){
							datapath="/share/backup2/deltabakcup/visualization/download_data/GSE18199/"+cell+"/fithic/"+this.resolution+"/"+chrs[0]+"/"+"fithic_"+chrs[0]+"_"+this.resolution+".matrix";	
						 //  datapath= "E:\\tangbx\\工作日志\\circosweb\\data\\GSE18199\\K562\\";
						}else if(geo.equals("GSE35156") == true){
							datapath="/share/backup2/deltabakcup/visualization/download_data/GSE35156/"+cell+"/fithic/"+this.resolution+"/"+chrs[0]+"/"+"fithic_"+chrs[0]+"_"+this.resolution+".matrix";							
						}else if(geo.equals("GSE63525") == true){
							datapath="/share/backup2/deltabakcup/visualization/download_data/GSE63525_3dmap/combined/fithic/"+cell+"/"+this.resolution+"/"+chrs[0]+"/"+"fithic_"+chrs[0]+"_"+this.resolution+".matrix";
						}	
						
						
						
					}
				}else{ // jobid
					datapath = "/share/backup2/deltabakcup/circosweb2016/circosweb/data/"+dataset+"/fasthic/fithic_"+chrs[0]+"_"+this.resolution+".matrix";
					if(dataset.equals("1499137860032")){
						if(resolution.equals("5000")){
							datapath = "/share/backup2/deltabakcup/circosweb2016/circosweb/data/"+dataset+"/fasthic_5k/fithic_11_5000.matrix";
						}
					}
					else if(dataset.equals("1478854512827")){
						if(resolution.equals("5000")){
							datapath = "/share/backup2/deltabakcup/circosweb2016/circosweb/data/1478854512827/fasthic_5k/fithic.matrix";
							 // datapath= "E:\\tangbx\\工作日志\\circosweb\\data\\testdata\\11_5000.matrix";
						}
					}
				 // datapath= "E:\\tangbx\\工作日志\\circosweb\\data\\testdata\\fithic.matrix";
				}
				if(location != null && location.indexOf(":") > -1 ){ // position
					 chrs = location.split(":"); // chrom:position	
				}

				System.out.println("virtual datapath="+datapath);
				File file = new File(datapath);
				if(file.exists() == true){
							BufferedReader br = new BufferedReader(new FileReader(datapath));
							String line="";
							int count = 0 ;
							int position = Integer.parseInt(chrs[1]);
							int iresolution = Integer.parseInt(resolution);
							int row_index = position/iresolution + 1; //here, need to compute row index
							if(this.startbin != 0 ){
								row_index = (position/iresolution-startbin) + 1;
								if(row_index <=0){
									row_index = 1;
								}
							}
							
							while(true){
								
								if(count < row_index){
									line=br.readLine();
								}else{
									break;
								}
								count ++;
								
							}
							br.close();
							
							if(line != null ){
								String [] darrs = line.split("\t");
								
								if(darrs != null ){ // span region
									int iexpand = 500000; //500kb
									int left_index =0;
									int right_index = 0 ;
									
									if(this.expandRegion != null ){
										iexpand = Integer.parseInt(this.expandRegion) ;	
										int iexpand_index = iexpand/iresolution ;										
										if(row_index < iexpand_index){
											left_index = 1;
											right_index = row_index+ iexpand_index ;
										}else if(row_index >= iexpand_index){
											left_index = row_index - iexpand_index;
											if(left_index<=0){
												left_index = 1;
											}
											right_index = row_index + iexpand_index;
										}
									}
									
									if(this.expandStartRegion != null ){
										left_index = Integer.parseInt(this.expandStartRegion)/iresolution + 1;
										if(this.startbin != 0 ){
											left_index = left_index - this.startbin;
										}
										if(left_index <=0){
											left_index = 1;
										}
									}
									
									if(this.expandEndRegion != null ){
										right_index = Integer.parseInt(this.expandEndRegion)/iresolution +1;
										if(this.startbin != 0 ){
											right_index = right_index - this.startbin;
										}
										if(right_index <=0){
											right_index = 1;
										}
									}
									
									
									
									
									int start = (left_index-1) * iresolution;
									if(this.startbin != 0 ){
										start = (left_index-1 + this.startbin) * iresolution; 
									}
									if(this.expandStartRegion != null ){
										start = Integer.parseInt(this.expandStartRegion) ;
									}
									int end = (right_index-1) * iresolution;
									if(this.startbin != 0 ){
										end = (right_index-1+ this.startbin) * iresolution;
									}
									if(this.expandEndRegion != null ){
										end = Integer.parseInt(this.expandEndRegion) ;
									}
									
									int centerpos = (row_index-1) * iresolution;
									if(this.startbin != 0 ){
										centerpos = (row_index-1+ this.startbin) * iresolution;
									}
									
									
									fourcPlot = new FourcPlotBean();
									fourcPlot.setStart(start);
									fourcPlot.setEnd(end);
									fourcPlot.setCenterpos(centerpos);
									fourcPlot.setResolution(iresolution); // resolution
									double[] x_axis = new double[right_index-left_index+1];
									double[] y_axis = new double[right_index-left_index+1]; 
									String[] pvalue = new String[right_index-left_index+1];
									
									System.out.println("left_index="+left_index+",right_index"+right_index+",darr length="+darrs.length);
									
									int val_count = 0 ;
									for(int t=left_index-1;t<=right_index-1;t++){
										// observ frequency
										if( t< darrs.length){
											//System.out.println("============t="+t+",left="+left_index+",right="+right_index);
											double dx = t*iresolution;
											if(this.startbin != 0 ){
												dx = (t+startbin)*iresolution ;
											}
											x_axis[val_count] = dx;
											String spvalue = darrs[t];
											if(spvalue != null && spvalue.equals("N") == false&&spvalue.length() > 0 ){
												String dy = "";
												String dp = "";
												if(spvalue.indexOf(",")> -1) {
													String [] ps = spvalue.split(",");
													
													if(ps != null && ps.length == 2){
														dy = ps[0];
														dp = ps[1];
													}	
												}else{
													dy = spvalue;
													if(spvalue == null || spvalue.length() ==0 ){
														dy = "0" ;
													}
													dp="N";
												}
																						
												if(t == (row_index-1)){
													dy = "0" ;
												}
												y_axis[val_count] = Double.parseDouble(dy);
												pvalue[val_count] = dp;
											}else{
												y_axis[val_count] = 0;
												pvalue[val_count] = "N";
											}
											
											x_axis[val_count] = dx;
											
											val_count ++;
										}	
									}
									fourcPlot.setX(x_axis);
									fourcPlot.setY(y_axis);		
									fourcPlot.setPvalue(pvalue);
								}
							}
						}
					
					
				}else { // gene name
					
				}
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		
		
		return SUCCESS;
	}
	
	
	/***********************************************
	 * this is used to compute the pvalue of given peak signal
	 * need distance
	 * @return
	 */
	/*public String execComputePvalue(){
	
		
		//compute the distance index
		int distance = 0;
		int d_index = 0 ;
		if(this.expandRegion != null ){ // distance
			distance = Integer.parseInt(this.expandRegion);
			int iresolution = Integer.parseInt(resolution);
			d_index = distance /iresolution;
		}
		
		
		//get matrix file
		String datapath = "";
		String []chrs = new String[2];
		try{
			if(dataset.indexOf("_")> -1 ){
				String []arrs = dataset.split("_");
				if(arrs != null && arrs.length >= 2){
					String geo= arrs[0];
					String cell = arrs[1];
				
					if(geo.equals("GSE18199") == true){
						datapath="/share/backup2/deltabakcup/visualization/download_data/GSE18199/"+cell+"/matrix/";	
					 
					}else if(geo.equals("GSE35156") == true){
						datapath="/share/backup2/deltabakcup/visualization/download_data/GSE35156/"+cell+"/matrix/";							
					}else if(geo.equals("GSE63525") == true){
						datapath="/share/backup2/deltabakcup/visualization/download_data/GSE63525_3dmap/combined/matrix/"+cell+"/";
					}	
					
					if(location !=null && location.indexOf(":") > -1 ){ // position
						 chrs = location.split(":"); // chrom:position
						if(chrs != null && chrs.length == 2){
							datapath += chrs[0]+"_"+resolution+".matrix";
						}
					}
					
				}
			}else{ // jobid
				datapath = "/share/backup2/deltabakcup/circosweb2016/circosweb/data/"+dataset+"/"+dataset+".xml";
				File tfile = new File(datapath);
				if(tfile.exists() == true){
					PipeBean pipeBean = (PipeBean)XmlHander.xmlString2Object(datapath, "cn.ac.big.circos.po.PipeBean");
					String matrixfile = pipeBean.getMatrixFile();
					if(matrixfile != null ){
						if(matrixfile.lastIndexOf("/") > -1 ){
							datapath = matrixfile;
						}else{
							datapath = "/share/backup2/deltabakcup/circosweb2016/circosweb/data/"+dataset+"/upload/"+matrixfile;
						}
						
					}
					if(dataset.equals("1478854512827")){
						if(resolution.equals("5000")){
							datapath = "/share/backup2/deltabakcup/visualization/download_data/GSE63525_3dmap/K562_2m/11_5000.matrix";
							  datapath= "E:\\tangbx\\工作日志\\circosweb\\data\\testdata\\11_5000.matrix";
						}
					}
				  datapath= "E:\\tangbx\\工作日志\\circosweb\\data\\testdata\\50k.matrix";
						
				}
				if(dataset.equals("1478854512827")){
					if(resolution.equals("5000")){
						datapath = "/share/backup2/deltabakcup/visualization/download_data/GSE63525_3dmap/K562_2m/11_5000.matrix";
						  datapath= "E:\\tangbx\\工作日志\\circosweb\\data\\testdata\\11_5000.matrix";
					}
				}
			  datapath= "E:\\tangbx\\工作日志\\circosweb\\data\\testdata\\50k.matrix";
			}
			
		
			File file = new File(datapath);
			if(file.exists() == true){
				BufferedReader br = new BufferedReader(new FileReader(datapath));
				String line= br.readLine() ;
				String [] cells = null;
				if(line != null ){
					cells = line.split("\t");
				}
				
				int rownumber = 0;
				if(cells != null ){
					rownumber = cells.length;
				}
				float init_observ= -1 ;
				int total_number = 0 ;
				int statics_number = 0 ;
				if(rownumber > 0 ){
					if(d_index<cells.length){
						init_observ = Float.parseFloat(cells[d_index]);
						if(init_observ > this.readscount){
							statics_number = 1;
						}
						total_number =1;
					}
					
				}
				int row_index = 1 ;
				float observ_count = 0 ;
				while((line = br.readLine()) != null){
					cells = line.split("\t");
					int col_index = row_index + d_index;
					if(col_index >= rownumber){
						break;
					}else{
						observ_count = Float.parseFloat(cells[col_index]);
						total_number ++;
						if(observ_count > this.readscount){
							statics_number ++;
						}
					}
				}
				br.close();
				
				if(total_number > 0 ){
					String s_number = statics_number + "";
					float tvalue = Float.parseFloat(s_number)/total_number;
					pvalue = tvalue+"";
				}
			}
			
			
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		

		
		
		
		
		
		return SUCCESS;
	}*/
	

	public String getExpandRegion() {
		return expandRegion;
	}


	public void setExpandRegion(String expandRegion) {
		this.expandRegion = expandRegion;
	}

	public String getOrganism() {
		return organism;
	}


	public void setOrganism(String organism) {
		this.organism = organism;
	}


	public String getDataset() {
		return dataset;
	}


	public void setDataset(String dataset) {
		this.dataset = dataset;
	}


	public String getResolution() {
		return resolution;
	}


	public void setResolution(String resolution) {
		this.resolution = resolution;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public FourcPlotBean getFourcPlot() {
		return fourcPlot;
	}


	public void setFourcPlot(FourcPlotBean fourcPlot) {
		this.fourcPlot = fourcPlot;
	}


	public int getStartbin() {
		return startbin;
	}


	public void setStartbin(int startbin) {
		this.startbin = startbin;
	}


	public int getReadscount() {
		return readscount;
	}


	public void setReadscount(int readscount) {
		this.readscount = readscount;
	}


	public String getPvalue() {
		return pvalue;
	}


	public void setPvalue(String pvalue) {
		this.pvalue = pvalue;
	}


	public String getExpandStartRegion() {
		return expandStartRegion;
	}


	public void setExpandStartRegion(String expandStartRegion) {
		this.expandStartRegion = expandStartRegion;
	}

	public String getExpandEndRegion() {
		return expandEndRegion;
	}

	public void setExpandEndRegion(String expandEndRegion) {
		this.expandEndRegion = expandEndRegion;
	}
}
