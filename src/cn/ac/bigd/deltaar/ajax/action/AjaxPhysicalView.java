package cn.ac.bigd.deltaar.ajax.action;

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




import cn.ac.bigd.deltaar.service.IBaseService;
import cn.ac.bigd.deltaar.util.CatalogBean;
import cn.ac.bigd.deltaar.util.CatalogClass;
import cn.ac.bigd.deltaar.util.CatalogItem;
import cn.ac.bigd.deltaar.util.CircosTrack;
import cn.ac.bigd.deltaar.util.MetaBean;

import com.danga.MemCached.MemCachedClient;
import com.opensymphony.xwork2.ActionSupport;

/*************************************
 * to execute ajax action in physical view
 * @author lenovo
 *
 */
public class AjaxPhysicalView extends ActionSupport{
	

	
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
	
	


	
	private	List<CatalogBean> catalist;
	private List<CatalogClass> cataTypeList;
	
	
	private String[] plist;

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
	

	
}
