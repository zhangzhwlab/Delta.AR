package cn.ac.big.msg.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import cn.ac.big.msg.output.Text;
import cn.ac.big.msg.po.AnoTrack;
import cn.ac.big.msg.po.Hololens;
import cn.ac.big.msg.po.PhysicalModel;
import cn.ac.big.msg.po.Msgparambean;
import cn.ac.big.msg.po.Portal;
import cn.ac.big.msg.po.PortalJson;

import com.opensymphony.xwork2.ActionSupport;

public class DataExchangeAction extends ActionSupport implements ServletResponseAware, ServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String modelname;
	private String binsize;
	private String species;
	private String track;
	private String chrom;
	private String start;
	private String end;
	private String jobid;
	private String hololensid;

	
	private HttpServletResponse response;
	/*****************************************************
	 * this is used to  generate data for hololens
	 * the holoens request this data need with hololensid parameter
	 * 
	 * @return
	 */
	public void execGenerateDataFunc(){
		
		HttpServletRequest request= ServletActionContext.getRequest() ;
		String path = request.getRealPath("/");
		String infile = path+File.separator+"exchange"+File.separator+this.hololensid+".json";
		System.out.println("inpath="+infile);
		try{
			File file = new File(infile);
			if(file.exists() == true){
				BufferedReader br = new BufferedReader(new FileReader(infile));
				String line="";
				StringBuffer sb = new StringBuffer();
				while((line=br.readLine()) != null){
					sb.append(line);
				}
				br.close();
				
				String jsonstr = sb.toString();
				JSONObject jsonobject = JSONObject.fromObject(jsonstr);
				
				PortalJson portalJson = (PortalJson) JSONObject.toBean(jsonobject,PortalJson.class);
				String modelname="";
				String binsize="";
				String track="";
				String organism="";
				String chrom="";
				String jobid="";
				String start="";
				String end="";
				String hololensid="";
				
				if(portalJson != null){
					Portal portal = portalJson.getPortal();
					Hololens hololens = portalJson.getHololens();
					PhysicalModel model = portalJson.getModel();
					AnoTrack annotation = portalJson.getAnnotation();
					
					if(model != null){
						modelname = model.getName();
						binsize = model.getBin();
						organism = model.getOrganism();
						chrom = model.getChrom();
						start = model.getStart();
						end = model.getEnd();
					}
					
					if(hololens != null ){
						hololensid = hololens.getHololensid();
					}
					
					if(portal != null ){
						jobid = portal.getJobId();
					}
					
					if(annotation != null ){
						track = annotation.getCurrentTrack();
					}

				}
				
				/*Msgparambean msg = (Msgparambean) JSONObject.toBean(jsonobject,
						Msgparambean.class);
				*/
				
				//public Text(String model,String binsize,String track,String org, String chrom,String jobid,String start,String end,String hololensid){
				//	this.b = binsize;
			
				
			//	Text text = new Text(msg.getModel(),msg.getB(),msg.getTrack(),msg.getOrg(),msg.getRanse(),msg.getJobId(),msg.getStart(),msg.getEnd(),msg.getHololensid());
				
				Text text = new Text(modelname, binsize, track, organism, chrom, jobid, start, end, hololensid);
				//System.out.println("===============model name=========="+msg.getModel()+", text model=" + text.);
				//text.Clear();
				System.out.println();
				text.dataprocess();
				
				String data = text.getD();
				this.response.reset();
		        try {
		          PrintWriter pr = this.response.getWriter();
		          pr.print(data);
		          
		          pr.close();
		        } catch (IOException e) {
		          e.printStackTrace();
		        }
				
				
				
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		

	}
	
	
	
	/******************************************************
	 * this is used to change parameter will be actived by delta ar web client
	 * 
	 * changex 
	 * 
	 * PortalJson
	 * 
	 * @return
	 */
	public void execChangeParameterFuncByAR(){
		
		int res = 0 ;
		HttpServletRequest request= ServletActionContext.getRequest() ;
		String path = request.getRealPath("/");
		
		PortalJson portalJson = new PortalJson();
		Portal portal = new Portal();
		portal.setJobId(this.jobid);
		Hololens hololens = new Hololens();
		hololens.setHololensid(this.hololensid);
		PhysicalModel model= new PhysicalModel();
		model.setBin(this.binsize);
		model.setChrom(this.chrom);
		model.setName(this.modelname);
		model.setOrganism(this.species);
		model.setStart(this.start);
		model.setEnd(this.end);
		
		AnoTrack anoTrack = new AnoTrack();
		anoTrack.setCurrentTrack(this.track);
		
		portalJson.setPortal(portal);
		portalJson.setHololens(hololens);
		portalJson.setModel(model);
		portalJson.setAnnotation(anoTrack);

		
		
	/*	Msgparambean mbean = new Msgparambean();
		mbean.setModel(this.modelname);//
		mbean.setB(this.binsize);//
		mbean.setOrg(this.species);//
		mbean.setTrack(this.track); //
		mbean.setRanse(this.chrom);//
		mbean.setStart(this.start);//
		mbean.setEnd(this.end);//
		mbean.setJobId(this.jobid);//
		mbean.setHololensid(this.hololensid);//
		*/
		
		//need to inject track information in table tb_hg19_meta_physical 带着数据的远程访问接口
		//gff3 小文件可以直接读取
		
		//bigwig信号数据需要转换，并且写入表中
		
		
		//generate json bean
	//	String jsonstr = JSONObject.fromObject(mbean).toString();
		String jsonstr = JSONObject.fromObject(portalJson).toString();
		String outfile = path+File.separator+"exchange"+File.separator+this.hololensid+".json";
		System.out.println(outfile);
		try{
			BufferedWriter bw = new BufferedWriter(new FileWriter(outfile));
			bw.write(jsonstr) ;
			bw.close();
		}catch(Exception ex){
			ex.printStackTrace();
			res = -1;
		}
		
		this.response.reset();
        try {
          PrintWriter pr = this.response.getWriter();
          if(res == 0 ){
        	  pr.print("change success");
          }else{
        	  pr.print("change fail");
          }
          
          pr.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
		
	}
	
	
	//the request url need with param hololensid=xxxx ======== Jiben
	public void execGetParameterChangeByHololensFunc(){
		HttpServletRequest request= ServletActionContext.getRequest() ;
		String path = request.getRealPath("/");
		String infile = path+File.separator+"exchange"+File.separator+this.hololensid+".json";
		try{
			File file = new File(infile);
			if(file.exists() == true){
				BufferedReader br = new BufferedReader(new FileReader(infile));
				String line="";
				StringBuffer sb = new StringBuffer();
				while((line=br.readLine()) != null){
					sb.append(line);
				}
				br.close();
				
				String jsonstr = sb.toString();
				JSONObject jsonobject = JSONObject.fromObject(jsonstr);
				
				PortalJson portalJson = (PortalJson) JSONObject.toBean(jsonobject,PortalJson.class);
				
				String m = "";
				if(portalJson != null ){
					
					Hololens hololens = portalJson.getHololens();
					PhysicalModel model = portalJson.getModel();
					AnoTrack annotation = portalJson.getAnnotation();
					
					
					if(hololens != null ){
						m = "";
					}
					
					if(model != null ){
						m += model.getName() +" " + model.getBin() +" "+model.getOrganism() +" "+model.getStart()+" "+model.getEnd() +" "+model.getChrom();
					}
					
					if(annotation != null ){
						m += " "+annotation.getCurrentTrack();
					}
					
				}
				
			/*	Msgparambean msg = (Msgparambean) JSONObject.toBean(jsonobject,
						Msgparambean.class);
				
				
				String m = msg.getModel() + " " + msg.getB() + " " + msg.getOrg() + " " + msg.getStart() + " " + msg.getEnd() + " " + msg.getRanse()
						+ " " + msg.getTrack();
				*/
				
				
				
				this.response.reset();
		          try {
		            PrintWriter pr = this.response.getWriter();
		            pr.print(m);
		            pr.close();
		          } catch (IOException e) {
		            e.printStackTrace();
		          }
				
				
			}else{
				this.response.reset();
		          try {
		            PrintWriter pr = this.response.getWriter();
		            pr.print("error");
		            pr.close();
		          } catch (IOException e) {
		            e.printStackTrace();
		          }
			}
			
		}catch(Exception ex){
			ex.printStackTrace();
		}

		
	}


	public String getModelname() {
		return modelname;
	}


	public void setModelname(String modelname) {
		this.modelname = modelname;
	}


	public String getBinsize() {
		return binsize;
	}


	public void setBinsize(String binsize) {
		this.binsize = binsize;
	}


	public String getSpecies() {
		return species;
	}


	public void setSpecies(String species) {
		this.species = species;
	}


	public String getTrack() {
		return track;
	}


	public void setTrack(String track) {
		this.track = track;
	}


	public String getChrom() {
		return chrom;
	}


	public void setChrom(String chrom) {
		this.chrom = chrom;
	}


	public String getStart() {
		return start;
	}


	public void setStart(String start) {
		this.start = start;
	}


	public String getEnd() {
		return end;
	}


	public void setEnd(String end) {
		this.end = end;
	}


	public String getJobid() {
		return jobid;
	}


	public void setJobid(String jobid) {
		this.jobid = jobid;
	}


	public String getHololensid() {
		return hololensid;
	}


	public void setHololensid(String hololensid) {
		this.hololensid = hololensid;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;
	}
	
	
	
}
