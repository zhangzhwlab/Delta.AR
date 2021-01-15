package cn.ac.big.circos.action.ajax;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;

import cn.ac.big.circos.po.CellHisBean;
import cn.ac.big.circos.po.EnclosePeakBean;
import cn.ac.big.circos.po.GFF3Format;
import cn.ac.big.circos.po.MetaPhysicalBean;
import cn.ac.big.circos.po.PeakBean;
import cn.ac.big.circos.po.PubGeneBean;
import cn.ac.big.circos.po.SessionBean;
import cn.ac.big.circos.service.IBaseService;
import cn.ac.big.circos.util.BIGMemCachedClient;
import cn.ac.big.circos.util.CatalogBean;
import cn.ac.big.circos.util.CatalogClass;
import cn.ac.big.circos.util.CatalogItem;
import cn.ac.big.circos.util.CategoryTrack;
import cn.ac.big.circos.util.CircosTrack;
import cn.ac.big.circos.util.MetaBean;
import cn.ac.big.circos.util.ParseOutput;


import com.danga.MemCached.MemCachedClient;
import com.opensymphony.xwork2.ActionSupport;

/*************************************
 * to execute ajax action in physical view
 * @author lenovo
 *
 */
public class AjaxPhysicalView extends ActionSupport{
	
	private List<CellHisBean> cellList;
	
	@Resource(name="baseService")
	private IBaseService baseService;
	
	private String param1;
	private String param2;

	
	private String perbin;
	private String binsize;
	private String track;
	private String position;
	private String zoom;
	private String organism;
	
	
	private List<GFF3Format> gffList;
	private List<PeakBean> peaklist;
	private List<PubGeneBean> genelist;
	
	private	List<CatalogBean> catalist;
	private List<CatalogClass> cataTypeList;
	private List<MetaPhysicalBean> metaphysicalList;
	
	
	private String[] plist;
	
	
	/********************************************************************************
	 * ajax get cell type for given organism
	 * @return
	 */
	public String execGetCellTypeFunc(){
		//search cell
		Map map = new HashMap();
		map.put("orgname", param1);
		cellList= (List<CellHisBean>)baseService.findResultList("cn.ac.big.circos.selectCellTypeByOrg", param1);
		
		return SUCCESS;
	}
	
	
	/*************************************************************************
	 * to get histone mark for given organism and cell type
	 * @return
	 */
	public String execGetHisMarkFunc(){
		Map map = new HashMap();
		map.put("orgname", param1);
		map.put("cellname", param2);
		
		cellList= (List<CellHisBean>)baseService.findResultList("cn.ac.big.circos.selectHismarkByOrgCell", map);
		return SUCCESS;
	}
	
	
	
	
	/******************************************************************
	 * this is used to parse a given gff3 file and return a gff3 list 
	 * both end in the given range
	 * param1  store file
	 * param2  store position
	 * @return
	 */
	public String execParseGFF3File(){
		try{
			if(this.param1 != null){
				
				
				
				File file = new File(this.param1);
				if(file.exists() == true){
					String chrom= null;
					int start =0;
					int end =0 ;
					if (this.param2 != null) {
						String[] arrys = this.param2.split(":");
						if (arrys != null && arrys.length == 2) {
							chrom = arrys[0];
							
							String[] pos = arrys[1].split("\\.+"); // split can not use ..
							if (pos != null && pos.length == 2) {
								start = Integer.parseInt(pos[0]);
								end = Integer.parseInt(pos[1]);							
							}						
						}
					}
					
					gffList = new ArrayList<GFF3Format>();
					
					
					ParseOutput parseout = new ParseOutput();
					
					BufferedReader br = new BufferedReader(new FileReader(this.param1));
					String line = "";
					while((line=br.readLine()) != null){
						GFF3Format gff3line = parseout.parseGff3(line);
						int stat_start = Integer.parseInt(gff3line.getStart()) ;
						int stat_end = Integer.parseInt(gff3line.getEnd()) ;
						if(gff3line.getSeq().equals(chrom) == true){
							if(stat_start >= start && stat_start<=end && stat_end >= start && stat_end<=end){ // filter
								gffList.add(gff3line) ;
							}
						}
					}
					
					br.close();
				}
			}
			
		}catch(Exception ex ){
			ex.printStackTrace();
		}
		
		return SUCCESS;
	}
	
	
	/******************************************************************
	 * this is used to parse a given gff3 file and return a gff3 list 
	 * 
	 * one end in the given range
	 * param1  store file
	 * param2  store position
	 * @return
	 */
	public String execGetPeakGFF3File(){
		try{
			if(this.param1 != null){
				
			
				
				
				
				
				File file = new File(this.param1);
				if(file.exists() == true){
					
					
					String memkey=this.param1+"_"+param2+"_peak";
					MemCachedClient memcacheclient = BIGMemCachedClient.getMemCacheClient();
					if(memcacheclient.get(memkey) != null ){
						EnclosePeakBean closepeak = (EnclosePeakBean)memcacheclient.get(memkey);
						gffList = closepeak.getGffList();
						peaklist = closepeak.getPeaklist();
						genelist = closepeak.getGenelist();
					}else{
						String chrom= null;
						int start =0;
						int end =0 ;
						if (this.param2 != null) {
							String[] arrys = this.param2.split(":");
							if (arrys != null && arrys.length == 2) {
								chrom = arrys[0];
								
								String[] pos = arrys[1].split("\\.+"); // split can not use ..
								if (pos != null && pos.length == 2) {
									start = Integer.parseInt(pos[0]);
									end = Integer.parseInt(pos[1]);							
								}						
							}
						}
						
						gffList = new ArrayList<GFF3Format>();
						peaklist = new ArrayList<PeakBean>();
						genelist = new ArrayList<PubGeneBean>();
						
						ParseOutput parseout = new ParseOutput();
						
						BufferedReader br = new BufferedReader(new FileReader(this.param1));
						String line = "";
						while((line=br.readLine()) != null){
							GFF3Format gff3line = parseout.parseGff3(line);
							PeakBean peakbean = new PeakBean();
							PubGeneBean genebean = new PubGeneBean();
							int stat_start = Integer.parseInt(gff3line.getStart()) ;
							int stat_end = Integer.parseInt(gff3line.getEnd()) ;
							//if(start == 130850000){
							///	System.out.println(line +","+start+","+end);
							//}
							if(gff3line.getSeq().equals(chrom) == true){
								if((stat_start >= start && stat_start<=end) || (stat_end >= start && stat_end<=end) ||( start >= stat_start && end<=stat_end)){ // filter
								//	System.out.println(gff3line+","+start+","+end);
									gffList.add(gff3line) ;
									genebean.setChrom(gff3line.getSeq());
									genebean.setStrand(gff3line.getStrand());
									genebean.setStart(Integer.parseInt(gff3line.getStart()));
									genebean.setEnd(Integer.parseInt(gff3line.getEnd()));
									genebean.setSynonym(gff3line.getId());
									peakbean.setChrom(gff3line.getSeq());
									peakbean.setStart(Integer.parseInt(gff3line.getStart()));
									peakbean.setEnd(Integer.parseInt(gff3line.getEnd()));
									peakbean.setNote(gff3line.getCols9());
									peakbean.setScore(gff3line.getScore());
									peaklist.add(peakbean);
									genelist.add(genebean);
								}
							}
						}
						
						br.close();
						
						EnclosePeakBean eclosebean = new EnclosePeakBean();
						eclosebean.setGenelist(genelist);
						eclosebean.setGffList(gffList);
						eclosebean.setPeaklist(peaklist);
						memcacheclient.set(memkey, eclosebean);
					}
					
					

				}
			}
			
		}catch(Exception ex ){
			ex.printStackTrace();
		}
		
		return SUCCESS;
	}
	
	/*******************************************************************
	 * this is used to get histone density mark from mysql
	 * @return
	 */
	public String execGetHistoneDensityFromMysqlFunc(){
		try{
			
			String chrom= null;
			int start =0;
			int end =0 ;
			if (this.param2 != null) {
					String[] arrys = this.param2.split(":");
					if (arrys != null && arrys.length == 2) {
						chrom = arrys[0];
						
						String[] pos = arrys[1].split("\\.+"); // split can not use ..
						if (pos != null && pos.length == 2) {
							start = Integer.parseInt(pos[0]);
							end = Integer.parseInt(pos[1]);							
						}						
					}
				}		
			
			String table = this.param1;
			/*if(this.track != null){
				if(this.track.indexOf("_") > -1){
					int idex = this.track.indexOf("_");
					if(idex > -1){
						this.track = this.track.substring(idex+1,this.track.length());
					}
					
				}
				
				if(this.track !=null){
					String keyname = this.track ;
					if(keyname.equals("RNA-seq_minus")){
						keyname = "RnaSeqMinus";
					}else if(keyname.equals("RNA-seq_plus")){
						keyname = "RnaSeqPlus";
					}else if(keyname.equals("DNase-seq")){
						keyname = "Dnase";
					}else if(keyname.equals("RIP-seq")){
						keyname = "RIPinput";
					}else if(keyname.equals("ChIA-PET_CTCF")){
						keyname = "ChiaPetCTCF";
					}else if(keyname.equals("ChIA-PET_Pol2")){
						keyname = "ChiaPetPol2";
					}
					table += "_"+keyname;
				}
			}*/
			
			
			Map map = new HashMap();
			map.put("chrom", chrom);
			map.put("start",start);
			map.put("end",end);
			map.put("perbin",perbin);
			map.put("binsize", binsize);
			map.put("table", table);
			System.out.println("mysql table="+table);
			
			
			String memkey=chrom+"_"+start+"_"+end+"_"+perbin+"_"+binsize+"_"+table;
			
			MemCachedClient memcacheclient = BIGMemCachedClient.getMemCacheClient();
			if(memcacheclient.get(memkey) != null ){
				peaklist = (List<PeakBean>)memcacheclient.get(memkey);
			}else{
				//here find from the database			
				 peaklist = (List<PeakBean>)baseService.findResultList("cn.ac.big.circos.selectHistoneList", map);
				 memcacheclient.set(memkey, peaklist) ;
			}
			

			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		return SUCCESS;
	}
	
	
	
	/*************************************************************
	 * this is used to get peak data from mysql table 
	 * either anchor end in the give scope
	 * @return
	 */
	public String execGetPeakFromMysqlFunc(){
		try{
		
			String chrom= null;
			int start =0;
			int end =0 ;
			if (this.param2 != null) {
					String[] arrys = this.param2.split(":");
					if (arrys != null && arrys.length == 2) {
						chrom = arrys[0];
						
						String[] pos = arrys[1].split("\\.+"); // split can not use ..
						if (pos != null && pos.length == 2) {
							start = Integer.parseInt(pos[0]);
							end = Integer.parseInt(pos[1]);							
						}						
					}
				}
			
			Map map = new HashMap();
			map.put("table", param1);
			if(this.param1 != null && this.param1.equals("tb_k562_ChiaPetCTCF") == false && this.param1.equals("tb_k562_ChiaPetPol2") == false 
					&& this.param1.equals("tb_helas3_ChiaPetPol2") == false){
				if(binsize.equals("-1") == false){
					map.put("binsize", binsize);
				}			
			}
			

			map.put("chrom", chrom);
			map.put("start",start);
			map.put("end",end);
			List<PeakBean> peaklist = (List<PeakBean>)baseService.findResultList("cn.ac.big.circos.selectPeakAnchorList", map);
			gffList = new ArrayList<GFF3Format>();
			
			if(peaklist!= null){
				ParseOutput parseout = new ParseOutput();
				for(PeakBean peakbean:peaklist){
					String line= peakbean.getChrom()+" 0 0 "+peakbean.getStart()+" "+peakbean.getEnd()+" . . . "+peakbean.getNote();
					GFF3Format gff3line = parseout.parseGff3(line);
					
					gffList.add(gff3line) ;
				}
				
				
			}
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		return SUCCESS;
		
	}
	
	/***************************************************
	 * this is used to get meta data of organism
	 * @return
	 */
	public String ajaxGetCategoryData(){


		try{	
			
			//Read the circos track
			catalist = new ArrayList<CatalogBean>();
			Map catamap = new HashMap();
			Map cusmap = new HashMap();
			List<MetaBean> metalist = null;
			HttpServletRequest request= ServletActionContext.getRequest() ;
			String path = request.getRealPath("/");
			String filepath = path+File.separator+this.param1;
			System.out.println(filepath);
		
				File file = new File(filepath);
				if(file.exists() == true ){
					BufferedReader br = new BufferedReader(new FileReader(filepath));
					String line = "";
				
					
					while((line = br.readLine()) != null ){
						if(line.startsWith("#")){
							continue ;
						}
						if(line.startsWith("trackmeta") == true){
							String [] arr = line.split("=");
							if(arr != null && arr.length ==2){
								
								String table= arr[1];
								System.out.println("table="+table);
								Map map = new HashMap();
								if(plist != null){
									int catacount =0 ;
									for(String tval:plist){
										System.out.println("tval = "+tval);
										StringBuffer sb = new StringBuffer();
										if(tval!= null && tval.length() > 0 ){
											if(tval.indexOf(";")>-1){
												String [] vals = tval.split(";");
												
												if(vals != null){
													int vcount = 0 ;
													for(String val:vals){
														if(vcount == 0 ){
															sb.append("'").append(val).append("'");
														}else{
															sb.append(",'").append(val).append("'");
														}
														vcount ++;
													}
												}
											}else {
												sb.append("'").append(tval).append("'");
											}
										}
										
										
										System.out.println("condition="+sb.toString()+"catacount="+catacount);
										
										
										if(catacount ==0 && sb.toString().length() > 0){
											map.put("catalist",sb.toString());
										}else if(catacount == 1&& sb.toString().length() > 0){
											map.put("celllist",sb.toString());
										}else if(catacount == 2&& sb.toString().length() > 0){
											map.put("antilist",sb.toString());
										}else if(catacount == 3&& sb.toString().length() > 0){
											map.put("lablist",sb.toString());					
										}else if(catacount == 4&& sb.toString().length() > 0){
											map.put("datatypelist",sb.toString());
										}
										
										catacount ++;
									}
									
									map.put("table", table);
									if(this.param2!= null ){
										map.put("organism", this.param2);
									}
									
								    metalist = baseService.findResultList("cn.ac.big.circos.selectMetaData", map);
									if(metalist != null ){
										for(MetaBean meta:metalist){
											if(meta.getOrganism() != null && meta.getOrganism().length()>0 ){
												catamap.put(meta.getLabel()+"_"+meta.getOrganism(), meta);
											}else{
												catamap.put(meta.getLabel(), meta);
											}
											
										}
									}
									
									cataTypeList = new ArrayList<CatalogClass>();
									map.put("field", "data_category");
									List<CatalogItem> itemlist =  baseService.findResultList("cn.ac.big.circos.selectMetaCount", map);
									if(itemlist != null ){
										CatalogClass catalogClass = new CatalogClass();
										catalogClass.setTypename("Data Category");
										for(CatalogItem item:itemlist){
											CatalogItem nitem = new CatalogItem();
											nitem.setName(item.getName());
											nitem.setCount(item.getCount());
											nitem.setCatagory("datacategory");
											catalogClass.addItem(nitem);
										}
										cataTypeList.add(catalogClass);
									}
									
									map.put("field", "cell");
									 itemlist =  baseService.findResultList("cn.ac.big.circos.selectMetaCount", map);
									if(itemlist != null ){
										CatalogClass catalogClass = new CatalogClass();
										catalogClass.setTypename("Cell");
										
										for(CatalogItem item:itemlist){
											CatalogItem nitem = new CatalogItem();
											nitem.setName(item.getName());
											nitem.setCount(item.getCount());
											nitem.setCatagory("cell");
											catalogClass.addItem(nitem);
											
										}
										cataTypeList.add(catalogClass);
									}
									map.put("field", "antibody");
									itemlist =  baseService.findResultList("cn.ac.big.circos.selectMetaCount", map);
									if(itemlist != null ){
										CatalogClass catalogClass = new CatalogClass();
										catalogClass.setTypename("Antibody");
										for(CatalogItem item:itemlist){
											CatalogItem nitem = new CatalogItem();
											nitem.setName(item.getName());
											nitem.setCount(item.getCount());
											nitem.setCatagory("antibody");
											catalogClass.addItem(nitem);
										;
										}
										cataTypeList.add(catalogClass);
									}
									map.put("field", "lab");
								    itemlist =  baseService.findResultList("cn.ac.big.circos.selectMetaCount", map);
									if(itemlist != null ){
										CatalogClass catalogClass = new CatalogClass();
										catalogClass.setTypename("Lab");
										for(CatalogItem item:itemlist){
										
											CatalogItem nitem = new CatalogItem();
											nitem.setName(item.getName());
											nitem.setCount(item.getCount());
											nitem.setCatagory("lab");
											catalogClass.addItem(nitem);
										}
										cataTypeList.add(catalogClass);
									}
									map.put("field", "data_type");
									itemlist =  baseService.findResultList("cn.ac.big.circos.selectMetaCount", map);
									if(itemlist != null ){
										CatalogClass catalogClass = new CatalogClass();
										catalogClass.setTypename("Data Type");
										for(CatalogItem item:itemlist){

											CatalogItem nitem = new CatalogItem();
											nitem.setName(item.getName());
											nitem.setCount(item.getCount());
											nitem.setCatagory("datatype");
											catalogClass.addItem(nitem);
										
										}
										cataTypeList.add(catalogClass);
									}
									
									
									
							}
							
						}
						}
						
						if(line.startsWith("[") && line.endsWith("]")){
							CircosTrack track = new CircosTrack();
							
							while((line = br.readLine())!=null && (line.length()>0)){
								String [] arrs = line.split("=");
								if(arrs[0].startsWith("feature")){
								   track.setFeature(arrs[1]) ;	
								}else if(arrs[0].startsWith("glyph_type")){
									track.setGlyph(arrs[1]) ;
								}else if(arrs[0].startsWith("storage")){
									track.setStorage(arrs[1]);
								}else if(arrs[0].startsWith("color")){
									track.setColor(arrs[1]) ;
								}else if(arrs[0].startsWith("key")){
									track.setKey(arrs[1]);
								}else if(arrs[0].startsWith("category")){
									track.setCategory(arrs[1]) ;
								}else if(arrs[0].startsWith("height")){
									track.setHeight(arrs[1]);
								}else if(arrs[0].startsWith("pcolor")){
									track.setPcolor(arrs[1]);
								}else if(arrs[0].startsWith("ncolor")){
									track.setNcolor(arrs[1]);
								}else if(arrs[0].startsWith("line_width")){
									track.setLineWidth(arrs[1]);
								}else if(arrs[0].startsWith("statis_file")){
									track.setStatisFile(arrs[1]); // statistics file
								}else if(arrs[0].startsWith("histone_bin")){
									track.setHistoneBin(Integer.parseInt(arrs[1])) ;
								}else if(arrs[0].startsWith("fileClass")){
									//System.out.println("storageclass="+arrs[1]);
									track.setStoreclass(arrs[1]) ;
								}else if(arrs[0].startsWith("toomany")){
									track.setToomany(Integer.parseInt(arrs[1]));
								}else if(arrs[0].startsWith("bin_size")){
									track.setBinsize(arrs[1].trim());
								}else if(arrs[0].startsWith("table")){
									track.setTable(arrs[1].trim());
								}
								else if(arrs[0].startsWith("organism")){
									track.setOrganism(arrs[1]) ;								
								}else if(arrs[0].startsWith("meta") == true){ //meta data
									if(arrs[1] != null ){
										MetaBean metabean = new MetaBean();
										
										if(cusmap.get(track.getCategory()) != null){
											for(CatalogClass catalog:cataTypeList){
												if(catalog.getTypename().equals("Data Category")){
													CatalogClass catalogClass = catalog;
													List<CatalogItem> tlist =(List<CatalogItem>)	catalogClass.getItemlist();
													if(tlist != null ){
														CatalogItem titem = tlist.get(0);
														int tc = titem.getCount();
														titem.setCount(tc+1);
													}
													break;
												}
											}
											
										}else{
											CatalogItem nitem = new CatalogItem();
											nitem.setName(track.getCategory());
											nitem.setCount(1);
											nitem.setCatagory("datacategory");
										
											cusmap.put(track.getCategory(), track.getCategory());
											if(cataTypeList != null ){
												for(CatalogClass catalog:cataTypeList){
													if(catalog.getTypename().equals("Data Category")){
														CatalogClass catalogClass = catalog;
														catalogClass.addItem(nitem);
														break;
													}
												}
											}
										}
									
										
										String [] metas = arrs[1].split(";");
										if(metas != null ){
											for(String meta:metas){
												if(meta.indexOf(":") > -1){
													String[] tmetas= meta.split(":");
													if(tmetas != null ){
														
														if(tmetas[0].equals("label")){
															metabean.setLabel(tmetas[1]);
														}
														if(tmetas[0].equals("name")){
															metabean.setName(tmetas[1]);
														}
														if(tmetas[0].equals("data_category")){
															metabean.setData_category(tmetas[1]);
														}
														
														if(tmetas[0].equals("organism")){
															metabean.setOrganism(tmetas[1]);
														}
														if(tmetas[0].equals("cell")){
															metabean.setCell(tmetas[1]);
														}
														if(tmetas[0].equals("data_type")){
															metabean.setData_type(tmetas[1]);
														}
														if(tmetas[0].equals("lab")){
															metabean.setLab(tmetas[1]);
														}
														if(tmetas[0].equals("antibody")){
															metabean.setAntibody(tmetas[1]);
														}
														if(tmetas[0].equals("peaks")){
															metabean.setPeaks(tmetas[1]);
														}
														if(tmetas[0].equals("replicate_number")){
															metabean.setReplicate_number(tmetas[1]);
														}
														if(tmetas[0].equals("file_type")){
															
															metabean.setFileType(tmetas[1]);
														}
													}
												}
											}
										}
										CatalogBean catalogBean = new CatalogBean();
										catalogBean.setKey(track.getKey());
										catalogBean.setMeta(metabean);
										catalogBean.setTrack(track);
										catalist.add(catalogBean);
									}
									
										
								}
							}
							
							if(catamap!=null && catamap.size() > 0 ){
								if(track.getOrganism() != null && track.getOrganism().length() > 0 ){
									if(catamap.get(track.getKey()+"_"+track.getOrganism()) != null ){
										//
										//System.out.println(track.getKey());
										CatalogBean catalogBean = new CatalogBean();
										catalogBean.setKey(track.getKey());
										catalogBean.setMeta((MetaBean)catamap.get(track.getKey()+"_"+track.getOrganism()));
										catalogBean.setTrack(track);
										catalist.add(catalogBean);
									}
								}else{
									if(catamap.get(track.getKey()) != null ){
										//
										//System.out.println(track.getKey());
										CatalogBean catalogBean = new CatalogBean();
										catalogBean.setKey(track.getKey());
										catalogBean.setMeta((MetaBean)catamap.get(track.getKey()));
										catalogBean.setTrack(track);
										catalist.add(catalogBean);
									}
								}
								
								
							}
							
							
						}
					}
			
			
				}
			

			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		return SUCCESS;
		
	}
	
	
	
	/**************************************************
	 * this is used to get meta data from tb_hg19_meta_physical
	 * @return
	 */
	public String ajaxGetPhysicalMetaDataFunc(){
		try{
			Map map = new HashMap();
			String table="";
			if(organism != null && organism.length() >0 ){
				table="tb_"+organism+"_meta_physical";
				map.put("table", table);
			}
			
			if(param1 != null && param1.length() > 0 ){
				map.put("datacategory", param1) ;
			}
			
			this.metaphysicalList = baseService.findResultList("cn.ac.big.circos.metaphysical.selectGivenMetaPhysical",map);
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		return SUCCESS;
	}

	/*****************************************************************************
	 * THIS IS USED TO Share session with others
	 * @return
	 */
	public String execShareSession(){
		
		//first generate session id MD5
		try{
				Calendar calendar = Calendar.getInstance();
				Date now = calendar.getTime();
				String curtime = now.getTime() +"" ;
				String uuid = UUID.randomUUID().toString();
				String key = param1+"$"+uuid+"$"+ curtime;
				
				 MessageDigest md = MessageDigest.getInstance("MD5");
			     
			     md.update(key.getBytes());
				
				String digitalSignature = new BigInteger(1, md.digest()).toString(16);
				if(digitalSignature != null && digitalSignature.length() > 8){
					digitalSignature = digitalSignature.substring(0, 8);
				}
				//session id
				this.param2 = digitalSignature;
				
				HttpServletRequest request= ServletActionContext.getRequest() ;
				String path = request.getRealPath("/");
				String filepath = path+File.separator+"session";
				File file = new File(filepath);
				if(file.exists() == false){
					file.mkdirs();
				}
				
				SessionBean sessionBean = new SessionBean();
				if(this.position != null)
				sessionBean.setLoc(this.position) ;
				if(this.param1 != null)
				sessionBean.setConf(this.param1);
				if(this.track != null)
				sessionBean.setTracks(this.track);
				if(this.zoom != null){
					sessionBean.setZoom(this.zoom);
				}
				
				
				
				String jsonstr = JSONArray.fromObject(sessionBean).toString();
				String outfile = filepath+File.separator+digitalSignature+".json";
				System.out.println(outfile);
				BufferedWriter bw = new BufferedWriter(new FileWriter(outfile));
				bw.write(jsonstr) ;
				bw.close();
				
		}catch(Exception ex){
			ex.printStackTrace();
			
		}	
		

		
		return SUCCESS;
	}
	
	
	

	public List<CatalogClass> getCataTypeList() {
		return cataTypeList;
	}


	public void setCataTypeList(List<CatalogClass> cataTypeList) {
		this.cataTypeList = cataTypeList;
	}


	public void setBaseService(IBaseService baseService) {
		this.baseService = baseService;
	}

	public String getParam1() {
		return param1;
	}

	public void setParam1(String param1) {
		this.param1 = param1;
	}

	public String getParam2() {
		return param2;
	}

	public void setParam2(String param2) {
		this.param2 = param2;
	}



	public List<CellHisBean> getCellList() {
		return cellList;
	}



	public void setCellList(List<CellHisBean> cellList) {
		this.cellList = cellList;
	}


	public List<GFF3Format> getGffList() {
		return gffList;
	}


	public void setGffList(List<GFF3Format> gffList) {
		this.gffList = gffList;
	}


	public String getPerbin() {
		return perbin;
	}


	public void setPerbin(String perbin) {
		this.perbin = perbin;
	}


	public String getBinsize() {
		return binsize;
	}


	public void setBinsize(String binsize) {
		this.binsize = binsize;
	}


	public String getTrack() {
		return track;
	}


	public void setTrack(String track) {
		this.track = track;
	}


	public List<PeakBean> getPeaklist() {
		return peaklist;
	}


	public void setPeaklist(List<PeakBean> peaklist) {
		this.peaklist = peaklist;
	}


	public List<PubGeneBean> getGenelist() {
		return genelist;
	}


	public void setGenelist(List<PubGeneBean> genelist) {
		this.genelist = genelist;
	}


	public String[] getPlist() {
		return plist;
	}


	public void setPlist(String[] plist) {
		this.plist = plist;
	}


	public List<CatalogBean> getCatalist() {
		return catalist;
	}


	public void setCatalist(List<CatalogBean> catalist) {
		this.catalist = catalist;
	}


	public String getPosition() {
		return position;
	}


	public void setPosition(String position) {
		this.position = position;
	}


	public String getZoom() {
		return zoom;
	}


	public void setZoom(String zoom) {
		this.zoom = zoom;
	}


	public String getOrganism() {
		return organism;
	}


	public void setOrganism(String organism) {
		this.organism = organism;
	}


	public List<MetaPhysicalBean> getMetaphysicalList() {
		return metaphysicalList;
	}


	public void setMetaphysicalList(List<MetaPhysicalBean> metaphysicalList) {
		this.metaphysicalList = metaphysicalList;
	}
	
	
	
	
	



	
	
}
