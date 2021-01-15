package cn.ac.bigd.deltaar.util.Network;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.List;
import java.util.ArrayList;

import net.sf.json.JSONArray;
public class Network {

	private int maxsize = 0 ;
	private List<Node> nodes;
	private List<Edge> edges;
	
	private List<Pie> pies;
	private List<Group> groups;
	
	public Network(){
		
	}
	
	
	
	public int getMaxsize() {
		return maxsize;
	}



	public void setMaxsize(int maxsize) {
		this.maxsize = maxsize;
	}



	public List<Group> getGroups() {
		return groups;
	}



	public void setGroups(List<Group> groups) {
		this.groups = groups;
	}



	public List<Node> getNodes() {
		return nodes;
	}


	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}


	public List<Edge> getEdges() {
		return edges;
	}


	public void setEdges(List<Edge> edges) {
		this.edges = edges;
	}


	public List<Pie> getPies() {
		return pies;
	}

	public void setPies(List<Pie> pies) {
		this.pies = pies;
	}

	public static void main(String [] args){
		Network network = new Network();
		network.setMaxsize(50);
		float x = -539.5f;
		float y = -400f;
		
		int LENGTH_MAIN = 350;
		
		List<Node> nodes = new ArrayList<Node>();
		List<Edge> edges = new ArrayList<Edge>();
	/*	Node node = new Node(1,"HUBEI",x,y+400,50,"#000000");
		nodes.add(node);
		node = new Node(2,"HUBEI",x,y+200,20,"#000000");
		nodes.add(node);
		
		Edge edge = new Edge(1,2,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(205,"THANLAND",x-60,y+150,14,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,205,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(202,"THANLAND",x-25,y+120,16,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,202,LENGTH_MAIN);
		edges.add(edge);
		

		node = new Node(203,"THANLAND",x+30,y+60,5,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,203,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(206,"THANLAND",x+60,y+150,5,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,206,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(201,"THANLAND",x+250,y+110,5,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,201,LENGTH_MAIN);
		edges.add(edge);
		
		node = new Node(10,"GUANGDONG",x+100,y+400,10,"#C5000B");
		nodes.add(node);
		edge = new Edge(1,10,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(11,"GUANGDONG",x+200,y+425,4,"#000000");
		nodes.add(node);
		edge = new Edge(1,11,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(12,"GUANGDONG",x+190,y+450,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,12,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(13,"GUANGDONG",x+170,y+480,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,13,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(14,"GUANGDONG",x+140,y+500,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,14,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(15,"GUANGDONG",x+30,y+480,4,"#e30013");
		nodes.add(node);
		edge = new Edge(1,15,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(29,"GUANGDONG",x+110,y+540,2,"#800000");
		nodes.add(node);
		edge = new Edge(15,29,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(30,"GUANGDONG",x+80,y+555,2,"#800000");
		nodes.add(node);
		edge = new Edge(15,30,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(31,"GUANGDONG",x+70,y+620,3,"#0707ff");
		nodes.add(node);
		edge = new Edge(15,31,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(16,"GUANGDONG",x-30,y+500,2,"#0080c1");
		nodes.add(node);
		edge = new Edge(1,16,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(17,"GUANGDONG",x-60,y+480,15,"#800000");
		nodes.add(node);
		edge = new Edge(1,17,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(18,"GUANGDONG",x-200,y+500,4,"#000000");
		nodes.add(node);
		edge = new Edge(1,18,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(19,"GUANGDONG",x-100,y+415,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,19,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(20,"GUANGDONG",x-95,y+385,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,20,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(21,"GUANGDONG",x-80,y+355,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,21,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(22,"GUANGDONG",x-60,y+330,2,"#800000");
		nodes.add(node);
		edge = new Edge(1,22,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(23,"GUANGDONG",x-30,y+300,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,23,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(24,"GUANGDONG",x+20,y+290,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,24,LENGTH_MAIN);
		edges.add(edge);
		
		node = new Node(25,"GUANGDONG",x+50,y+310,2,"#fe0000");
		nodes.add(node);
		edge = new Edge(1,25,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(26,"GUANGDONG",x+75,y+330,2,"#7f00ff");
		nodes.add(node);
		edge = new Edge(1,26,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(27,"GUANGDONG",x+90,y+355,2,"#838800");
		nodes.add(node);
		edge = new Edge(1,27,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(28,"GUANGDONG",x+110,y+375,2,"#838800");
		nodes.add(node);
		edge = new Edge(1,28,LENGTH_MAIN);
		edges.add(edge);
		*/
		
		
		Node node = new Node(1,"HUBEI",0,0,50,"#000000");
		nodes.add(node);
		node = new Node(2,"HUBEI",x,y+200,20,"#000000");
		nodes.add(node);
		
		Edge edge = new Edge(1,2,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(205,"THANLAND",0,0,14,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,205,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(202,"THANLAND",0,0,16,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,202,LENGTH_MAIN);
		edges.add(edge);
		

		node = new Node(203,"THANLAND",0,0,5,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,203,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(206,"THANLAND",0,0,5,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,206,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(201,"THANLAND",0,0,5,"#2B7CE9");
		nodes.add(node);
		edge = new Edge(2,201,LENGTH_MAIN);
		edges.add(edge);
		
		node = new Node(10,"GUANGDONG",0,0,10,"#C5000B");
		nodes.add(node);
		edge = new Edge(1,10,LENGTH_MAIN);
		edges.add(edge);
		
		
		node = new Node(11,"GUANGDONG",0,0,4,"#000000");
		nodes.add(node);
		edge = new Edge(1,11,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(12,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,12,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(13,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,13,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(14,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,14,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(15,"GUANGDONG",0,0,4,"#e30013");
		nodes.add(node);
		edge = new Edge(1,15,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(29,"GUANGDONG",0,0,2,"#800000");
		nodes.add(node);
		edge = new Edge(15,29,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(30,"GUANGDONG",0,0,2,"#800000");
		nodes.add(node);
		edge = new Edge(15,30,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(31,"GUANGDONG",0,0,3,"#0707ff");
		nodes.add(node);
		edge = new Edge(15,31,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(16,"GUANGDONG",0,0,2,"#0080c1");
		nodes.add(node);
		edge = new Edge(1,16,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(17,"GUANGDONG",0,0,15,"#800000");
		nodes.add(node);
		edge = new Edge(1,17,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(18,"GUANGDONG",0,0,4,"#000000");
		nodes.add(node);
		edge = new Edge(1,18,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(19,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,19,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(20,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,20,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(21,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,21,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(22,"GUANGDONG",0,0,2,"#800000");
		nodes.add(node);
		edge = new Edge(1,22,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(23,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,23,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(24,"GUANGDONG",0,0,2,"#000000");
		nodes.add(node);
		edge = new Edge(1,24,LENGTH_MAIN);
		edges.add(edge);
		
		node = new Node(25,"GUANGDONG",0,0,2,"#fe0000");
		nodes.add(node);
		edge = new Edge(1,25,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(26,"GUANGDONG",0,0,2,"#7f00ff");
		nodes.add(node);
		edge = new Edge(1,26,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(27,"GUANGDONG",0,0,2,"#838800");
		nodes.add(node);
		edge = new Edge(1,27,LENGTH_MAIN);
		edges.add(edge);
		node = new Node(28,"GUANGDONG",0,0,2,"#838800");
		nodes.add(node);
		edge = new Edge(1,28,LENGTH_MAIN);
		edges.add(edge);
		
		
		List<Pie> pies = new ArrayList<Pie>();
		
		float [] data = new float[]{400f, 200f, 200f, 100f,150f};
		String [] colors = new String[]{"#000000", "#804040", "#850305", "#400000","#ff00fe"};
		
		Pie pie = new Pie(1,50,data,colors);
		pies.add(pie);
		
		
		data = new float[]{400, 200, 200};
	    colors = new String[]{"#000000", "#2c8fa4", "#8c0083"};
	    pie = new Pie(2,20,data,colors);
	    pies.add(pie);
	    
	    List<Group> groups = new ArrayList<Group>();
	    String [] groupIds = new String[]{"1","11","12","13","14"};
	    Group group = new Group("HUBEI","#333333",groupIds);
	    groups.add(group);
	    
	    groupIds = new String[]{"25","15"};
	    group = new Group("GUANGDONG","#fe0000",groupIds);
	    groups.add(group);
	    
	    groupIds = new String[]{"16","205"};
	    group = new Group("THANLAND","#2B7CE9",groupIds);
	    groups.add(group);
	    
	    groupIds = new String[]{"27","28"};
	    group = new Group("CHONGQING","#7f8000",groupIds);
	    groups.add(group);
	    
	    
	    
	    network.setGroups(groups);
	    network.setPies(pies);
		
		network.setEdges(edges);
		network.setNodes(nodes);
		
		
		
		
		
		
		
		
		
		
		
		
		
		String jsonstr = JSONArray.fromObject(network).toString();
		String outfile = "E:\\tangbx\\工作日志\\病毒\\network\\demo\\data.json";
		try{
			BufferedWriter bw = new BufferedWriter(new FileWriter(outfile));
			bw.write(jsonstr) ;
			bw.close();
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		
		
	}

}
