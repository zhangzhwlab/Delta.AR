package cn.ac.big.msg.po;

public class Msgparambean {
	private  String Model = "MOGEN_GSE35156_IMR90";
	private  String type, table;
	// public static String Model="3DModel";
	private  String b = "40000";
	private  String Track = "", org = "hg18";// H1-hESC_CTCF
	private  String Ranse = "11";
	private  String JobId = "";
	private  String Start = "14500000", End = "16500000";
	private String hololensid ="";
	

	
	public String getModel() {
		return Model;
	}

	public void setModel(String model) {
		Model = model;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	public String getB() {
		return b;
	}
	public void setB(String b) {
		this.b = b;
	}
	
	public String getTrack() {
		return Track;
	}
	public void setTrack(String track) {
		Track = track;
	}
	public String getOrg() {
		return org;
	}
	public void setOrg(String org) {
		this.org = org;
	}
	public String getRanse() {
		return Ranse;
	}
	public void setRanse(String ranse) {
		Ranse = ranse;
	}
	public String getJobId() {
		return JobId;
	}
	public void setJobId(String jobId) {
		JobId = jobId;
	}
	public String getStart() {
		return Start;
	}
	public void setStart(String start) {
		Start = start;
	}
	public String getEnd() {
		return End;
	}
	public void setEnd(String end) {
		End = end;
	}
	public String getHololensid() {
		return hololensid;
	}
	public void setHololensid(String hololensid) {
		this.hololensid = hololensid;
	}
	
	
	
}
