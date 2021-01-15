package cn.ac.bigd.deltaar.util.Network;

public class Pie {

	private int nodeId;
	private int size;
	private float [] data;
	private String [] colors;
	
	
	public Pie(int nodeId,int size,float[] data,String []colors){
		this.nodeId = nodeId;
		this.size = size;
		this.data = data;
		this.colors = colors;
	}
	
	
	
	public int getSize() {
		return size;
	}



	public void setSize(int size) {
		this.size = size;
	}



	public int getNodeId() {
		return nodeId;
	}
	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
	}
	public float[] getData() {
		return data;
	}
	public void setData(float[] data) {
		this.data = data;
	}
	public String[] getColors() {
		return colors;
	}
	public void setColors(String[] colors) {
		this.colors = colors;
	}
	
	
	
	
}
