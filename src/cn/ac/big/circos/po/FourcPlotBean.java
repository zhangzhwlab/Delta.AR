package cn.ac.big.circos.po;

/**********************************************
 * this is used to store virtual 4c plot
 * @author lenovo
 *
 */
public class FourcPlotBean {
	private int start;
	private int end;
	private int centerpos;
	private int resolution;
	private double[] x;
	private double[] y;
	private String[] pvalue;
		
	public int getResolution() {
		return resolution;
	}
	public void setResolution(int resolution) {
		this.resolution = resolution;
	}
	
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getEnd() {
		return end;
	}
	public void setEnd(int end) {
		this.end = end;
	}
	public int getCenterpos() {
		return centerpos;
	}
	public void setCenterpos(int centerpos) {
		this.centerpos = centerpos;
	}
	public double[] getX() {
		return x;
	}
	public void setX(double[] x) {
		this.x = x;
	}

	public String[] getPvalue() {
		return pvalue;
	}
	public void setPvalue(String[] pvalue) {
		this.pvalue = pvalue;
	}
	public double[] getY() {
		return y;
	}
	public void setY(double[] y) {
		this.y = y;
	}
}
