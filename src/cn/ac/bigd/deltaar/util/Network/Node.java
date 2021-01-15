package cn.ac.bigd.deltaar.util.Network;

public class Node {
	private int id;
	private String group;
	private float x;
	private float y;
	private float size;
	private String color;
	private boolean physics=false;
	private boolean fixed = true;
	
	public Node(int id,String group,float x,float y,float size,String color){
		this.id = id;
		this.group = group;
		this.x = x;
		this.y = y;
		this.size = size;
		this.color =color;
		physics = false;
		fixed = true;
	}
	
	
	public boolean isPhysics() {
		return physics;
	}


	public void setPhysics(boolean physics) {
		this.physics = physics;
	}


	public boolean isFixed() {
		return fixed;
	}


	public void setFixed(boolean fixed) {
		this.fixed = fixed;
	}


	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public float getX() {
		return x;
	}
	public void setX(float x) {
		this.x = x;
	}
	public float getY() {
		return y;
	}
	public void setY(float y) {
		this.y = y;
	}
	public float getSize() {
		return size;
	}
	public void setSize(float size) {
		this.size = size;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
}
