package cn.ac.bigd.deltaar.util.Network;

public class Edge {
	private int from;
	private int to;
	private float length;
	
	public Edge(int from,int to,float length){
		this.from=from;
		this.to=to;
		this.length=length;
	}
	
	
	public int getFrom() {
		return from;
	}
	public void setFrom(int from) {
		this.from = from;
	}
	public int getTo() {
		return to;
	}
	public void setTo(int to) {
		this.to = to;
	}
	public float getLength() {
		return length;
	}
	public void setLength(float length) {
		this.length = length;
	}
	
}
