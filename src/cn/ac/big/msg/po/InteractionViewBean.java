package cn.ac.big.msg.po;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class InteractionViewBean {
	private String chrom;
	private int minStart;
	private int maxEnd;
	private int anchorStart;
	private int anchorEnd;
	private int targetStart;
	private int targetEnd;
	
	
	public int getMinStart() {
		return minStart;
	}
	public void setMinStart(int minStart) {
		this.minStart = minStart;
	}
	public int getMaxEnd() {
		return maxEnd;
	}
	public void setMaxEnd(int maxEnd) {
		this.maxEnd = maxEnd;
	}
	public String getChrom() {
		return chrom;
	}
	public void setChrom(String chrom) {
		this.chrom = chrom;
	}
	public int getAnchorStart() {
		return anchorStart;
	}
	public void setAnchorStart(int anchorStart) {
		this.anchorStart = anchorStart;
	}
	public int getAnchorEnd() {
		return anchorEnd;
	}
	public void setAnchorEnd(int anchorEnd) {
		this.anchorEnd = anchorEnd;
	}
	public int getTargetStart() {
		return targetStart;
	}
	public void setTargetStart(int targetStart) {
		this.targetStart = targetStart;
	}
	public int getTargetEnd() {
		return targetEnd;
	}
	public void setTargetEnd(int targetEnd) {
		this.targetEnd = targetEnd;
	}
	

}
