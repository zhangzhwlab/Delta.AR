package cn.ac.bigd.deltaar.util.Network;

public class Group {
	
	private String color;
	private String name;
	private String [] groupIds;
	
	
	public Group(String name,String color,String [] groupIds){
		this.name = name;
		this.color = color;		
		this.groupIds = groupIds;
	}
	
	
	

	public String[] getGroupIds() {
		return groupIds;
	}






	public void setGroupIds(String[] groupIds) {
		this.groupIds = groupIds;
	}






	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
