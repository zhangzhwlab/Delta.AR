package cn.ac.big.circos.action.ar;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import cn.ac.big.circos.po.ar.MessageARBean;
import cn.ac.big.msg.po.AnoTrack;
import cn.ac.big.msg.po.Hololens;
import cn.ac.big.msg.po.HololensJson;
import cn.ac.big.msg.po.ViewModel;

import com.opensymphony.xwork2.ActionSupport;

/**************************************
 * this is used to process delta ar interactive operation
 * @author lenovo
 *
 */
public class DeltaARAction extends ActionSupport implements ServletResponseAware, ServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String organism;
	private String loc;
	private String tracks;
	private String resolution;
	private String sb;
	private String event;
	private String hololensid;
	
	private HttpServletResponse response;
	
	/***********************************************
	 * this is used to process delta_ar exhange message
	 * path: download/delta_ar
	 * 
	 * exchange 	HoloLens端参数更改通知服务
	 * 
	 * HololensJson
	 */
	public void execARExchangeMsgFunc(){
		HttpServletRequest request= ServletActionContext.getRequest() ;
		String path = request.getRealPath("/");
		String outpath = path+File.separator+"/download/delta_ar";
		StringBuffer sb = new StringBuffer();
		System.out.println("receive exchange msg...........");
		try{
			
			HololensJson  hololensJson = new HololensJson();
			
			AnoTrack annotation = new AnoTrack();
			ViewModel model = new ViewModel();
			Hololens hololens = new Hololens();
			
		//	MessageARBean msg = new MessageARBean();
			if(this.event != null ){
				annotation.setEvent(this.event);
				//msg.setEvent(this.event);
			}else{
				//msg.setEvent("");
				annotation.setEvent("");
			}
			
			if(this.organism != null ){
				//msg.setOrganism(this.organism) ;
				model.setOrganism(this.organism);
			}else{
				//msg.setOrganism("");
				model.setOrganism("");
			}
			
			
			if(this.loc != null ){
				if(this.loc.lastIndexOf("\\r") > -1 ){
					int index = this.loc.lastIndexOf("\\r");
					this.loc = this.loc.substring(0, index);
				}
				//msg.setLoc(this.loc);
				model.setLoc(this.loc);
			}else{
				//msg.setLoc("");
				model.setLoc("");
			}
			
			
			if(this.tracks != null ){
				String tmptrack = this.tracks;
				String tttrack = "";
				if(tmptrack != null ){
					if(tmptrack.indexOf(",")> -1){
						String [] trackarrys = tmptrack.split(",");
						
						if(trackarrys != null && trackarrys.length > 0 ){
							for(String t: trackarrys){
								if(t.indexOf("TAD")== -1 && t.indexOf("Interaction")==-1 && t.indexOf("Interaction")==-1 ){
									tttrack += t+"_signal,";
								}else{
									tttrack += t+",";
								}
							}
						}
						
						if(tttrack!= null && tttrack.length() > 0 ){
							tttrack = tttrack.substring(0, tttrack.length() -1);
						}
					}else{
						if(tmptrack.indexOf("TAD")== -1 && tmptrack.indexOf("Interaction")==-1 && tmptrack.indexOf("Interaction")==-1 ){
							tttrack += tmptrack+"_signal";
						}else{
							tttrack += tmptrack;
						}
					}
				}
				//msg.setTracks(this.tracks) ;
			//	msg.setTracks(tttrack);
				annotation.setCurrentTrack(tttrack);
			}else{
				annotation.setCurrentTrack("");
				//msg.setTracks("");
			}
			
			if(this.resolution != null ){
				model.setResolution(this.resolution) ;
				//msg.setResolution(this.resolution) ;
			}else{
				model.setResolution("");
				//msg.setResolution("");
			}
			
			if(this.sb != null ){
			//	msg.setSb(this.sb) ;
				model.setBinStart(this.sb);
			}else{
				//msg.setSb("");
				model.setBinStart("");
			}
			
			
			if(this.hololensid != null ){
			//	msg.setHololensid(this.hololensid);
				hololens.setHololensid(this.hololensid);
			}else{
				//msg.setHololensid("");
				hololens.setHololensid("");
			}
			
			
			hololensJson.setAnnotation(annotation);
			hololensJson.setHololens(hololens);
			hololensJson.setModel(model);

			//String jsonstr = JSONArray.fromObject(msg).toString();
			String jsonstr = JSONArray.fromObject(hololensJson).toString();
			String outfile = outpath+File.separator+this.hololensid+".json";
			System.out.println(outfile);
			BufferedWriter bw = new BufferedWriter(new FileWriter(outfile));
			bw.write(jsonstr) ;
			bw.close();
			
			//output 
			sb.append("success");
			
			
		}catch(Exception ex){
			ex.printStackTrace();
			sb.append("error");
		}
		
		 this.response.reset();
         try {
           PrintWriter pr = this.response.getWriter();
           pr.print(sb.toString());
           pr.close();
         } catch (IOException e) {
           e.printStackTrace();
         }
		
	}
	
	/********************************************
	 * THIS IS USED TO delete message
	 * @return
	 */
	public String execDeleteMsgFunc(){
		HttpServletRequest request= ServletActionContext.getRequest() ;
		String path = request.getRealPath("/");
		String outpath = path+File.separator+"/download/delta_ar/"+this.hololensid+".json";
		System.out.println("del msg path="+outpath);
		try{
			File file = new File(outpath);
			if(file.exists() == true){
				file.delete();
			}
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		return SUCCESS;
	}
	

	public String getOrganism() {
		return organism;
	}



	public void setOrganism(String organism) {
		this.organism = organism;
	}



	public String getLoc() {
		return loc;
	}



	public void setLoc(String loc) {
		this.loc = loc;
	}



	public String getTracks() {
		return tracks;
	}



	public void setTracks(String tracks) {
		this.tracks = tracks;
	}



	public String getResolution() {
		return resolution;
	}



	public void setResolution(String resolution) {
		this.resolution = resolution;
	}



	public String getSb() {
		return sb;
	}



	public void setSb(String sb) {
		this.sb = sb;
	}



	public String getEvent() {
		return event;
	}



	public void setEvent(String event) {
		this.event = event;
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

	public String getHololensid() {
		return hololensid;
	}

	public void setHololensid(String hololensid) {
		this.hololensid = hololensid;
	}

	
	
}
