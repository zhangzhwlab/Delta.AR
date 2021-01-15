package cn.ac.bigd.deltaar.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;


import cn.ac.bigd.deltaar.bean.PhysicalModelBean;
import cn.ac.bigd.deltaar.service.IBaseService;

import com.danga.MemCached.MemCachedClient;
import com.opensymphony.xwork2.ActionSupport;

/**********************************************************************
 * this used to process physical view operation
 * @author jacky
 *
 */
public class PhysicalViewAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2267862243456324268L;
	

	private String param;

	@Resource(name="baseService")
	private IBaseService baseSerivce;


	private List<PhysicalModelBean> physicalModelList;
	
	/************************************************
	 * this is used to get bin size of given physical model
	 * @return
	 */
	public String execGetPhysicalModelBinSizeFunc(){
		if(this.param != null ){
			this.physicalModelList = (List<PhysicalModelBean>) this.baseSerivce.findResultList("cn.ac.big.deltaar.selectGivenPhysicalModelBinList", this.param);
		}
		
		return SUCCESS;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public List<PhysicalModelBean> getPhysicalModelList() {
		return physicalModelList;
	}

	public void setPhysicalModelList(List<PhysicalModelBean> physicalModelList) {
		this.physicalModelList = physicalModelList;
	}
	
	
	
}
