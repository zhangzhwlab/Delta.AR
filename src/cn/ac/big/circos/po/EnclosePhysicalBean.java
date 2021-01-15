package cn.ac.big.circos.po;

import java.util.List;

import cn.ac.big.circos.util.CategoryTrack;

public class EnclosePhysicalBean implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String speciesJson;
	private String organism;
	private List<CategoryTrack> categoryList;
	public String getSpeciesJson() {
		return speciesJson;
	}
	public void setSpeciesJson(String speciesJson) {
		this.speciesJson = speciesJson;
	}
	public String getOrganism() {
		return organism;
	}
	public void setOrganism(String organism) {
		this.organism = organism;
	}
	public List<CategoryTrack> getCategoryList() {
		return categoryList;
	}
	public void setCategoryList(List<CategoryTrack> categoryList) {
		this.categoryList = categoryList;
	}
	
	
}
