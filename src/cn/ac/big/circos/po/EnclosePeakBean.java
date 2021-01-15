package cn.ac.big.circos.po;

import java.util.List;

public class EnclosePeakBean  implements java.io.Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<GFF3Format> gffList;
	private List<PeakBean> peaklist;
	private List<PubGeneBean> genelist;
	public List<GFF3Format> getGffList() {
		return gffList;
	}
	public void setGffList(List<GFF3Format> gffList) {
		this.gffList = gffList;
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
	
	
}
