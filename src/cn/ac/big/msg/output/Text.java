package cn.ac.big.msg.output;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.awt.Color;
import java.awt.GradientPaint;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.image.BufferedImage;

import javax.ws.rs.core.MediaType;

import cn.ac.big.circos.util.BIGWebServiceClientFactory;
import cn.ac.big.msg.po.ColorRamp;
import cn.ac.big.msg.po.Interaction;
import cn.ac.big.msg.po.InteractionViewBean;
import cn.ac.big.msg.po.Jiyinhuan;
import cn.ac.big.msg.po.Xyz;
import cn.ac.big.msg.po.Zhilianghuan;

import com.mysql.jdbc.ResultSetMetaData;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.representation.Form;

public class Text {
	private  String Model = "MOGEN_GSE35156_IMR90";
	private  String type, table;
	// public static String Model="3DModel";
	private  String b = "40000";
	private  String c, d;
	private  String Track = "", org = "hg18";// H1-hESC_CTCF
	private  String Ranse = "11";
	private  String JobId = "";
	private  String Start = "14500000", End = "16500000";
	private String hololensid ="";
	
	// public static String Start="54500000",End="55500000";
	private  String TadPath, InPath;
	private  List<String> S = new ArrayList<String>(); //
	private  List<String> E = new ArrayList<String>();
	private  List<String> IS = new ArrayList<String>(); // Interaction start (local file)
	private  List<String> IE = new ArrayList<String>();  // Interaction end   (local file)
	private  List<String> IFO = new ArrayList<String>(); // after data transformation,Interaction information
	private  List<String> TS = new ArrayList<String>();  // TAD start
	private  List<String> TE = new ArrayList<String>();   // TAD end
	private  List<Xyz> zuobiao = new ArrayList<Xyz>();   //  after data transformation, 3d model
	private  List<Jiyinhuan> Jyh = new ArrayList<Jiyinhuan>(); // read source gene data
	private  List<Jiyinhuan> Jyhz = new ArrayList<Jiyinhuan>(); // after data transformation, gene
	private  List<Zhilianghuan> Zlh = new ArrayList<Zhilianghuan>(); // read source histone mark
	private  List<Zhilianghuan> Zlhz = new ArrayList<Zhilianghuan>(); // after data transformation, histone mark
	private  List<Interaction> Tin = new ArrayList<Interaction>(); // interaction

	
	public Text(){
		
	}
	
	public Text(String model,String binsize,String track,String org, String chrom,String jobid,String start,String end,String hololensid){
		
		Clear();
		this.Model = model;
		this.b = binsize;
		this.Track = track;
		this.org = org;
		this.Ranse = chrom;
		this.JobId = jobid;
		this.Start = start;
		this.End = end;
		this.hololensid = hololensid;
		
	}
	

	// public static int i=0;
	public void dataprocess() {
	//	Clear();
		
		Connection con = null;
		// 驱动程序名
		String driver = "com.mysql.jdbc.Driver";
		// URL指向要访问的数据库名mydata
		//String url = "jdbc:mysql://11.11.0.1:3306/hicbrowser_20160607_1?useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;autoReconnect=true&amp;failOverReadOnly=false";
		String url = "jdbc:mysql://localhost:3307/hicbrowser_20160607_1?useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;autoReconnect=true&amp;failOverReadOnly=false";

		// MySQL配置时的用户名
		String user = "hic";
		// MySQL配置时的密码
		String password = "hic";

		// TODO Auto-generated method stub
		// a="hello";
		try {
			// 加载驱动程序
			Class.forName(driver);
			// 1.getConnection()方法，连接MySQL数据库！！
			con = DriverManager.getConnection(url, user, password);
			if (!con.isClosed())
				System.out.println("Succeeded connecting to the Database!");
			// 2.创建statement类对象，用来执行SQL语句！！
			
			MysqlModel(con);
			
			
			System.out.println(Duxyz(c));
			
			//3dmodle
			d = Duxyz(c);
			
			if(this.Track != null && this.Track.length() > 0 ){
				
				if(this.Track.contains(",")){
					String [] a_tracks = this.Track.split(",");
					if(a_tracks != null && a_tracks.length>0){
						for(String curtrack: a_tracks){
							MysqlProcessTrack(con,curtrack);
							//read TAD src data from web server
							if (curtrack.endsWith("TAD")) { //TAD
								// System.out.println(TadPath);
								System.out.println(TadDuqu(TadPath));
							}
							
							
							// read Interaction src data from web server
							if (Model.equals("3dmodel") && curtrack.indexOf("Interaction") > -1) {
								// System.out.println(InPath);
								System.out.println(InDuqu(InPath));
							}
						}
					}
					
					
				}else{
					String curtrack = this.Track;
					MysqlProcessTrack(con,curtrack);
					//read TAD src data from web server
					if (curtrack.endsWith("TAD")) { //TAD
						// System.out.println(TadPath);
						System.out.println(TadDuqu(TadPath));
					}
					
					
					
					// read Interaction src data from web server
					if (Model.equals("3dmodel") && curtrack.indexOf("Interaction") > -1) {
						// System.out.println(InPath);
						System.out.println(InDuqu(InPath));
					}
					
				}
				
				
			}
			
			con.close();
			
			
			
			
			
			System.out.println(Tin.size());
			
			// System.out.println(Tinzhuanhuan());
			d = d + Tinzhuanhuan();
			d = d + Tadzhuanhuan();
			// d=d+"#4 "+"\n";
			// d=d+"#5 ";
			System.out.println(Jyh.size());
			Jyzhuanhuan();
			Zlhzhuanhuan();
			/*
			 * for(int f=0;f<=Jyh.size()-1;f++) {
			 * System.out.println(Jyh.get(f).ID+" "
			 * +Jyh.get(f).Name+" "+Jyh.get(f).Start
			 * +" "+Jyh.get(f).End+" "+Jyh.get(f).Zf);
			 * //System.out.println(zuobiao.get
			 * (f).x+" "+zuobiao.get(f).y+" "+zuobiao.get(f).z); }
			 */
			System.out.println(Jyhz.size());
			System.out.println(Zlhz.size());
			for (int f = 0; f <= Jyhz.size() - 1; f++) {
				System.out.println(Jyhz.get(f).Name + " " + Jyhz.get(f).Weizhi
						+ " " + Jyhz.get(f).Start + " " + Jyhz.get(f).End);
			}
			for (int f = 0; f <= Zlhz.size() - 1; f++) {
				System.out.println(Zlhz.get(f).note + " " + Zlhz.get(f).wz + " "
						+ Zlhz.get(f).start + " " + Zlhz.get(f).end);
			}
			// Jyhjiexi();
			d = d + Jyhjiexi();
			d = d + Zlhjiexi();
			
			
			
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			if(con != null ){
				try{
					con.close();
				}catch(Exception ext){
					ext.printStackTrace();
				}
				
			}
		}
		

		// ceshi();

	}

	public  void MysqlModel(Connection con) {

		
		try {
			
			Statement statement = con.createStatement();
			// 要执行的SQL语句
			String sql = "select * from tb_3dmodel where model_name='" + Model
					+ "'" + " and bin_size='" + b + "'";
			if (Model.equals("3dmodel")) {
				sql = "select * from tb_3dmodel where model_name='" + Model
						+ "'";

			}
			// 3.ResultSet类，用来存放获取的结果集！！
			System.out.println(sql);
			ResultSet rs = statement.executeQuery(sql);
			System.out.println("执行结果如下所示:");
			// String job = null;
			// String id = null;
			while (rs.next()) {
				// 获取stuname这列数据
				c = rs.getString("file");
				TadPath = rs.getString("tad_path");
				if (Model.equals("3dmodel")) {
					InPath = rs.getString("interaction_path");
				}
				// org=rs.getString("species");

				// 获取stuid这列数据
				// id = rs.getString("strand");

				// 输出结果
				System.out.println(c);
				System.out.println(TadPath);
				System.out.println(InPath);

			}
			rs.close();

		} catch (SQLException e) {
			// 数据库连接失败异常处理
			e.printStackTrace();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			System.out.println("数据库数据成功获取！！");
		}

	}
	
	
	public void MysqlProcessTrack(Connection con,String curtrack){
		try{
			
			Statement statement = con.createStatement();
			
			if (curtrack.length() != 0) {
				String sql1 = "select * from tb_" + org
						+ "_meta_physical where name='" + curtrack + "'"
						+ " and organism='" + org + "'";
				String sql2;
				System.out.println(sql1);
				ResultSet rs1 = statement.executeQuery(sql1);
				while (rs1.next()) {
					// 获取stuname这列数据
					table = rs1.getString("data mysql table");
					type = rs1.getString("data visualization type");
					// String t="'"+table+"'";

					/*
					 * sql2.replaceAll("\\{start\\}", t);
					 * sql2.replaceAll("\\{chr\\}", r);
					 * sql2.replaceAll("\\{end\\}", en);
					 * sql2.replaceAll("\\{start\\}", st);
					 */
					System.out.println(type);
					// 获取stuid这列数据
					// id = rs.getString("strand");

					// 输出结果

				}
				if (Integer.parseInt(type) == 1) {// gene
					String r = "'" + Ranse + "'";
					String en = "'" + End + "'";
					String st = "'" + Start + "'";
					sql2 = "select distinct ens_gene_id,synonym,ens_gene_chr,ens_gene_start,ens_gene_end,strand  from "
							+ table
							+ " where ens_gene_chr="
							+ r
							+ " and ( (ens_gene_start >= "
							+ st
							+ " and ens_gene_start <= "
							+ en
							+ ") or (ens_gene_end >= "
							+ st
							+ " and ens_gene_end <= "
							+ en
							+ " or (ens_gene_start <"
							+ st
							+ " and ens_gene_end>" + en + ")))";
					System.out.println(sql2);
					// System.out.println(type);
					ResultSet rs2 = statement.executeQuery(sql2);
					while (rs2.next()) {
						Jiyinhuan q = new Jiyinhuan();
						q.ID = rs2.getString("ens_gene_id");
						q.Name = rs2.getString("synonym");
						q.Start = rs2.getString("ens_gene_start");
						q.End = rs2.getString("ens_gene_end");
						q.Zf = rs2.getString("strand");
						Jyh.add(q);
					}
					rs2.close();
				}
				if (Integer.parseInt(type) == 2) { // histone mark quality
					// b="50000";
					String r = "'" + Ranse + "'";
					String en = "'" + End + "'";
					String st = "'" + Start + "'";
					String p = "'" + "5" + "'";
					String Bin = "'" + b + "'";
					// table="tb_h1hesc_ctcf";
					sql2 = "select chrom,start,end,score,note from " + table
							+ " where binsize=" + Bin + " and perbin=" + p
							+ " and chrom=" + r + " and start >=" + st
							+ " and end <=" + en + "";
					System.out.println(sql2);
					ResultSet rs2 = statement.executeQuery(sql2);
					while (rs2.next()) {
						Zhilianghuan q = new Zhilianghuan();
						q.chr = rs2.getString("chrom");
						q.sc = rs2.getString("score");
						q.start = rs2.getString("start");
						q.end = rs2.getString("end");
						q.note = rs2.getString("note");
						Zlh.add(q);
					}
					rs2.close();
				}
				if (Integer.parseInt(type) == 3) { // interaction
					String sq1 = "", sq2 = "";
					String r = "'" + Ranse + "'";
					String en = "'" + End + "'";
					String st = "'" + Start + "'";
					String Bin = "'" + b + "'";
					
					//get interaction from mysql table
					if(table != null && table.length()>0 && table.startsWith("tb")== true ){
						sql2 = "select * from  " + table + " where chrom=" + r
								+ " and ((start>=" + st + " and start<=" + en
								+ ") and (end>=" + st + " and end<=" + en + "))";
						System.out.println(sql2);
						ResultSet rs2 = statement.executeQuery(sql2);
						ResultSetMetaData rsmd = (ResultSetMetaData) rs2
								.getMetaData();
						int count = rsmd.getColumnCount();
						String[] name = new String[count];
						for (int i = 0; i < count; i++) {
							name[i] = rsmd.getColumnName(i + 1);
						}
						rs2.close();
						for (int i = 0; i < count; i++) {
							// System.out.println(name[i]);
							if (name[i].equals("binsize")) {
								sq1 = sql2 + " and binsize=" + Bin;
								System.out.println(sq1);
							}
						}
						ResultSet rs3 = statement.executeQuery(sq1);
						while (rs3.next()) {
							Interaction q = new Interaction();
							q.end = rs3.getString("end");
							q.inf = rs3.getString("note");
							q.start = rs3.getString("start");
							Tin.add(q);
						}
						rs3.close();
						if (Tin.size() < 1) {
							for (int i = 0; i < count; i++) {
								// System.out.println(name[i]);
								if (name[i].equals("binsize")) {
									sq2 = sql2 + " and binsize=" + "-1";
									System.out.println(sq2);
								}
							}
							ResultSet rs4 = statement.executeQuery(sq2);
							while (rs4.next()) {
								Interaction q = new Interaction();
								q.end = rs4.getString("end");
								q.inf = rs4.getString("note");
								q.start = rs4.getString("start");
								Tin.add(q);
							}
							rs4.close();
						}
					}else if(table!= null && table.length()>0 && (table.startsWith("http") == true || table.startsWith("https") == true)){
						//here call web service to get data
						String wsurl = table;
						Client client = BIGWebServiceClientFactory.getClient();
				        WebResource webr = client.resource(wsurl);
				        Form param = new Form();
				    
				        param.add("organism",org);
				        param.add("chrom", Ranse);
				        param.add("start", Start);
				        param.add("end", End);
				        
				        ClientResponse response =   webr.accept(MediaType.APPLICATION_XML).post(ClientResponse.class, param);
				        System.out.println(response.toString());
				        List<InteractionViewBean> info =  response.getEntity(new GenericType<List<InteractionViewBean>>() {}) ;
				        if(info != null && info.size() > 0 ){
				        	int icount = 0 ;
				        	for(InteractionViewBean inter: info){
				        		icount ++;
				        		Interaction q = new Interaction();
				        		q.start = inter.getMinStart()+"";
				        		q.end = inter.getMaxEnd()+"";
				        		
				        		//ID=1;Name=1;Note=10:100180000-100190000|10:100410000-100420000
				        		q.inf = "ID="+icount+";Name="+icount+";Note="+inter.getChrom()+":"+inter.getAnchorStart()+"-"+inter.getAnchorEnd()+"|"+inter.getChrom()+":"+inter.getTargetStart()+"-"+inter.getTargetEnd();
				        		System.out.println(q.inf);
				        		Tin.add(q);
				        	}
				        	
				        }

					}
				}
				
				
				rs1.close();
			}
		} catch (SQLException e) {
			// 数据库连接失败异常处理
			e.printStackTrace();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			System.out.println("数据库数据成功获取！！");
		}

		
	}
	
	

	//process 3dmodel
	public  String Duxyz(String path) {
		S.clear();
		E.clear();
		String a = "#1\n";
		int i = 0;
		try {
			String encoding = "ASCII";
			path = "/share/backup2/deltabakcup/circosweb2016" + path;
			path = path.replaceAll("\\{refseq\\}", Ranse);
			path = path.replaceAll("\\{jobid\\}", JobId);
			System.out.println(path);

			File file = new File(path);
			if (file.isFile() && file.exists()) { // 判断文件是否存在
				InputStreamReader read = new InputStreamReader(
						new FileInputStream(file), encoding);// 考虑到编码格式
				BufferedReader bufferedReader = new BufferedReader(read);
				String lineTxt = null;
				bufferedReader.readLine();
				bufferedReader.readLine();
				while ((lineTxt = bufferedReader.readLine()) != null) {
					// System.out.println(lineTxt);
					String[] l;
					l = lineTxt.split(":");
					// System.out.println(l[1]);
					String[] m;
					m = l[1].split("\\.\\.");
					// System.out.println(m[1]);
					if (Integer.parseInt(m[0]) >= Integer.parseInt(Start)
							&& Integer.parseInt(m[1]) >= Integer
									.parseInt(Start)
							&& Integer.parseInt(m[1]) <= Integer.parseInt(End)
							&& Integer.parseInt(m[0]) <= Integer.parseInt(End)) {

						a = a + lineTxt + " " + i + "\n";
						S.add(m[0]);
						E.add(m[1]);
						String[] k;
						k = lineTxt.split(" ");
						Xyz r = new Xyz();
						r.x = k[1];
						r.y = k[2];
						r.z = k[3];
						zuobiao.add(r);
					}
					if (Integer.parseInt(m[1]) > Integer.parseInt(End)) {
						break;
					}
					i++;
				}

				read.close();
				// return a;
			} else {
				System.out.println("找不到指定的文件");
			}
		} catch (Exception e) {
			System.out.println("读取文件内容出错");
			e.printStackTrace();
		}
		return a;

	}

	//process TAD data
	public  String TadDuqu(String path) {
		TS.clear();
		TE.clear();
		String a = "";
		int i = 0;
		try {
			String encoding = "ASCII";
			// path="D:"+path;
			path = path.replaceAll("\\{refseq\\}", Ranse);
			path = path.replaceAll("\\{jobid\\}", JobId);
			System.out.println(path);

			File file = new File(path);
			if (file.isFile() && file.exists()) { // 判断文件是否存在
				InputStreamReader read = new InputStreamReader(
						new FileInputStream(file), encoding);// 考虑到编码格式
				BufferedReader bufferedReader = new BufferedReader(read);
				String lineTxt = null;
				// bufferedReader.readLine();
				// bufferedReader.readLine();
				while ((lineTxt = bufferedReader.readLine()) != null) {
					// System.out.println(lineTxt);
					String[] l;
					l = lineTxt.split("\\s+");
					// System.out.println(l[3]);
					// System.out.println(l[4]);
					// String[] m;
					// m=l[1].split("\\.\\.");
					// System.out.println(m[1]);
					if (Integer.parseInt(l[3]) >= Integer.parseInt(Start)
							&& Integer.parseInt(l[4]) >= Integer
									.parseInt(Start)
							&& Integer.parseInt(l[4]) <= Integer.parseInt(End)
							&& Integer.parseInt(l[3]) <= Integer.parseInt(End)) {
						TS.add(l[3]);
						TE.add(l[4]);
						a = a + lineTxt + " " + i + "\n";
					}
					if (Integer.parseInt(l[4]) > Integer.parseInt(End)) {
						break;
					}
					i++;
				}

				read.close();
				// return a;
			} else {
				System.out.println("找不到指定的文件");
			}
		} catch (Exception e) {
			System.out.println("读取文件内容出错");
			e.printStackTrace();
		}
		return a;

	}

	//process Interaction data
	public  String InDuqu(String path) {
		IS.clear();
		IE.clear();
		IFO.clear();
		String a = "";
		int i = 0;
		try {
			String encoding = "ASCII";
			// path="D:"+path;
			path = path.replaceAll("\\{refseq\\}", Ranse);
			path = path.replaceAll("\\{jobid\\}", JobId);
			System.out.println(path);
			// System.out.println();

			File file = new File(path);
			if (file.isFile() && file.exists()) { // 判断文件是否存在
				InputStreamReader read = new InputStreamReader(
						new FileInputStream(file), encoding);// 考虑到编码格式
				BufferedReader bufferedReader = new BufferedReader(read);
				String lineTxt = null;
				// bufferedReader.readLine();
				// bufferedReader.readLine();
				while ((lineTxt = bufferedReader.readLine()) != null) {
					// System.out.println(lineTxt);
					String[] l;
					l = lineTxt.split("\\s+");
					// System.out.println(l[3]);
					// System.out.println(l[4]);
					// String[] m;
					// m=l[1].split("\\.\\.");
					// System.out.println(m[1]);
					if (Integer.parseInt(l[3]) >= Integer.parseInt(Start)
							&& Integer.parseInt(l[4]) >= Integer
									.parseInt(Start)
							&& Integer.parseInt(l[4]) <= Integer.parseInt(End)
							&& Integer.parseInt(l[3]) <= Integer.parseInt(End)) {
						/*
						 * Interaction u=new Interaction(); u.start=l[3];
						 * u.end=l[4]; u.inf=lineTxt; Tin.add(u);
						 */
						/*
						 * System.out.println("helloworld"); IS.add(l[3]);
						 * IE.add(l[4]); System.out.println(IS.size());
						 * System.out.println(IE.size());
						 * //System.out.println(path); String[]
						 * m=lineTxt.split("Note="); String[]
						 * x=m[1].split("\\|"); IFO.add(x[0]+" "+x[1]);
						 * a=a+lineTxt+" "+i+"\n";
						 */
						Interaction q = new Interaction();
						q.start = l[3];
						q.end = l[4];
						q.inf = l[8];
						Tin.add(q);
					}
					if (Integer.parseInt(l[3]) > Integer.parseInt(End)) {
						break;
					}
					i++;
				}

				read.close();
				// return a;
			} else {
				System.out.println("找不到指定的文件");
			}
		} catch (Exception e) {
			System.out.println("读取文件内容出错");
			e.printStackTrace();
		}
		return a;
	}

	//interaction transform 
	public  String Inzhuanhuan() {
		String a = "#2 " + "\n";
		int size = IS.size();
		for (int i = 0; i <= size - 1; i++) {
			String sta = IS.get(i);
			String end = IE.get(i);
			for (int m = 0; m <= S.size() - 1; m++) {
				if (Integer.parseInt(sta) >= Integer.parseInt(S.get(m))
						&& Integer.parseInt(sta) < Integer.parseInt(E.get(m))) {
					/*
					 * System.out.println(sta); System.out.println(S.get(m));
					 * System.out.println(E.get(m));
					 */
					a = a + m;
				}
				if (Integer.parseInt(end) > Integer.parseInt(S.get(m))
						&& Integer.parseInt(end) <= Integer.parseInt(E.get(m))) {
					a = a + " " + m + " " + IFO.get(i) + "\n";
				}
			}
		}

		return a;

	}

	//TAD data transform
	public  String Tadzhuanhuan() {
		String a = "#3 " + "\n";

		int size = TS.size();
		int se = 2;
		for (int i = 0; i <= size - 1; i++) {
			int sl = 0, e = 0;

			String ST = TS.get(i);
			// System.out.println(ST);
			String ED = TE.get(i);
			// System.out.println(ED);
			for (int m = 0; m <= S.size() - 1; m++) {
				if (Integer.parseInt(ST) >= Integer.parseInt(S.get(m))
						&& Integer.parseInt(ST) <= Integer.parseInt(E.get(m))) {
					sl = m;
					// System.out.println(ST);
					break;
				}
			}
			for (int m = 0; m <= S.size() - 1; m++) {
				if (Integer.parseInt(ED) >= Integer.parseInt(S.get(m))
						&& Integer.parseInt(ED) <= Integer.parseInt(E.get(m))) {
					e = m;
					// System.out.println(ED);
					for (int l = sl; l < e; l++) { // System.out.println(sl);
						a = a + l + " " + (l + 1) + " " + se % 2 + "\n";
					}
					se++;
					break;
				}
			}
		}

		return a;
	}

	
	//jiyin transform
	public  void Jyzhuanhuan() {

		for (int i = 0; i <= Jyh.size() - 1; i++) {
			int sta = 0, e = -1;
			for (int q = 0; q <= S.size() - 1; q++) { /*
													 * if(Integer.parseInt(S.get(
													 * q
													 * ))<=Integer.parseInt(Jyh.
													 * get
													 * (i).Start)&&Integer.parseInt
													 * (
													 * S.get(q))<=Integer.parseInt
													 * (
													 * Jyh.get(i).End)&&Integer.
													 * parseInt
													 * (E.get(q))>=Integer
													 * .parseInt
													 * (Jyh.get(i).Start
													 * )&&Integer
													 * .parseInt(E.get(
													 * q))>=Integer
													 * .parseInt(Jyh.
													 * get(i).End)) {
													 * System.out.
													 * println(S.get(q
													 * )+" "+E.get
													 * (q)+" "+Jyh.get
													 * (i).Name+" "
													 * +Jyh.get(i).Start
													 * +" "+Jyh.get(i).End+" ");
													 * }
													 * if(Integer.parseInt(Jyh.
													 * get
													 * (i).Start)<=Integer.parseInt
													 * (
													 * S.get(q))&&Integer.parseInt
													 * (
													 * Jyh.get(i).Start)<=Integer
													 * .
													 * parseInt(E.get(q))&&Integer
													 * .
													 * parseInt(Jyh.get(i).End)>=
													 * Integer
													 * .parseInt(S.get(q))
													 * &&Integer
													 * .parseInt(Jyh.get
													 * (i).End)>=
													 * Integer.parseInt
													 * (E.get(q))){
													 * System.out.println
													 * (S.get(q
													 * )+" "+E.get(q)+" "
													 * +Jyh.get
													 * (i).Name+" "+Jyh.get
													 * (i).Start
													 * +" "+Jyh.get(i).End+" ");
													 * }
													 */

				if (Integer.parseInt(S.get(q)) <= Integer
						.parseInt(Jyh.get(i).Start)
						&& Integer.parseInt(E.get(q)) > Integer.parseInt(Jyh
								.get(i).Start)) {
					sta = q;
					// if(Jyh.get(i).Name=="RP11-290F24.3"){
					// System.out.println(sta);
					// }

				}
				if (Integer.parseInt(S.get(q)) <= Integer
						.parseInt(Jyh.get(i).End)
						&& Integer.parseInt(E.get(q)) >= Integer.parseInt(Jyh
								.get(i).End)) {
					e = q;
					// if(Jyh.get(i).Name=="RP11-290F24.3"){
					// System.out.println(e);}
				}

			}
			for (int r = sta; r <= e; r++) { // System.out.println(e+" "+sta+" "+r+" "+Jyh.get(i).Name);
				Jiyinhuan a = new Jiyinhuan();
				a.Name = Jyh.get(i).Name;
				a.Weizhi = Integer.toString(r);
				a.End = Jyh.get(i).End;
				a.Start = Jyh.get(i).Start;
				a.Zf = Jyh.get(i).Zf;
				a.ID = Jyh.get(i).ID;
				Jyhz.add(a);

				// System.out.println(S.get(r)+" "+E.get(r)+" "+Jyh.get(i).Name+" "+Jyh.get(i).Start+" "+Jyh.get(i).End+" ");
			}
			if (sta != 0 && e == -1) {
				Jiyinhuan a = new Jiyinhuan();
				a.Name = Jyh.get(i).Name;
				a.Weizhi = Integer.toString(sta);
				a.End = Jyh.get(i).End;
				a.Start = Jyh.get(i).Start;
				a.Zf = Jyh.get(i).Zf;
				a.ID = Jyh.get(i).ID;
				Jyhz.add(a);
				// System.out.println(S.get(sta)+" "+E.get(sta)+" "+Jyh.get(i).Name+" "+Jyh.get(i).Start+" "+Jyh.get(i).End+" ");
			}

		}
	}

	public  String Jyhjiexi() {
		String lee = "#4 " + "\n";
		double cyradius = 0;
		double r = 0;
		if (Jyhz.size() != 0) {
			for (int i = 0; i <= Jyhz.size() - 1; i++) {

				int wz = Integer.parseInt(Jyhz.get(i).Weizhi);
				// ///////////change by tangbx start
				double sphere_radius = 0.03;
				// ///////////change by tangbx start
				double genestart = Double.parseDouble(Jyhz.get(i).Start);
				double geneend = Double.parseDouble(Jyhz.get(i).End);
				double start = Double.parseDouble(S.get(Integer.parseInt(Jyhz
						.get(i).Weizhi)));
				double end = Double.parseDouble(E.get(Integer.parseInt(Jyhz
						.get(i).Weizhi)));
				if (Integer.parseInt(Jyhz.get(i).Zf) == -1) {
					genestart = Double.parseDouble(Jyhz.get(i).End);
					geneend = Double.parseDouble(Jyhz.get(i).Start);
					System.out.println(genestart + "    " + geneend + "   "
							+ Jyhz.get(i).Name);
				}
				if (genestart >= start && genestart <= end) {
					cyradius = (genestart - start) / (end - start)
							* sphere_radius * 2;
				} else if (geneend >= start && geneend <= end) {
					cyradius = (geneend - start) / (end - start)
							* sphere_radius * 2;
				} else if ((genestart < start && geneend > end)
						|| (geneend < start && genestart > end)) {
					cyradius = 0.04f;
				}
				System.out.println(cyradius);
				if (cyradius > 0) {
					cyradius = Math.abs(cyradius);
					// //////////////////////////////////////// change by tangbx
					// start

					int direction = -1; // bottom
					if (cyradius > sphere_radius) { // top
						direction = 1;
					}

					cyradius = cyradius / 2;

					double usecyradius = cyradius - sphere_radius > 0 ? (cyradius - sphere_radius) / 2
							: cyradius / 2; // 此处是在判断 这个圆环是要画在 球的顶面和底面
											// （因为我使用的是webgl， 球是有方向的）
					double yaxis = Math.sqrt(sphere_radius * sphere_radius
							- usecyradius * usecyradius);
					// /////////////////////////////// change by tangbx end

					double[] st = { 0, 0, 0 };
					double[] en = { 0, 0, 0 };
					double Px;
					double Py;
					double Pz;
					double Cx;
					double Cy;
					double Cz;
					double Nx;
					double Ny;
					double Nz;
					if (wz == 0) {
						Px = Double.parseDouble(zuobiao.get(wz + 2).x);
						Py = Double.parseDouble(zuobiao.get(wz + 2).y);
						Pz = Double.parseDouble(zuobiao.get(wz + 2).z);
						Cx = Double.parseDouble(zuobiao.get(wz).x);
						Cy = Double.parseDouble(zuobiao.get(wz).y);
						Cz = Double.parseDouble(zuobiao.get(wz).z);
						Nx = Double.parseDouble(zuobiao.get(wz + 1).x);
						Ny = Double.parseDouble(zuobiao.get(wz + 1).y);
						Nz = Double.parseDouble(zuobiao.get(wz + 1).z);
						System.out.println(Px + " " + Py + " " + Pz + " " + Cx
								+ " " + Cy + " " + Cz + " " + Nx + " " + Ny
								+ " " + Nz);

					} else if (wz == zuobiao.size() - 1) {
						Px = Double.parseDouble(zuobiao.get(wz - 1).x);
						Py = Double.parseDouble(zuobiao.get(wz - 1).y);
						Pz = Double.parseDouble(zuobiao.get(wz - 1).z);
						Cx = Double.parseDouble(zuobiao.get(wz).x);
						Cy = Double.parseDouble(zuobiao.get(wz).y);
						Cz = Double.parseDouble(zuobiao.get(wz).z);
						Nx = Double.parseDouble(zuobiao.get(wz - 2).x);
						Ny = Double.parseDouble(zuobiao.get(wz - 2).y);
						Nz = Double.parseDouble(zuobiao.get(wz - 2).z);
						System.out.println(Px + " " + Py + " " + Pz + " " + Cx
								+ " " + Cy + " " + Cz + " " + Nx + " " + Ny
								+ " " + Nz);
					} else {
						Px = Double.parseDouble(zuobiao.get(wz - 1).x);
						Py = Double.parseDouble(zuobiao.get(wz - 1).y);
						Pz = Double.parseDouble(zuobiao.get(wz - 1).z);
						Cx = Double.parseDouble(zuobiao.get(wz).x);
						Cy = Double.parseDouble(zuobiao.get(wz).y);
						Cz = Double.parseDouble(zuobiao.get(wz).z);
						Nx = Double.parseDouble(zuobiao.get(wz + 1).x);
						Ny = Double.parseDouble(zuobiao.get(wz + 1).y);
						Nz = Double.parseDouble(zuobiao.get(wz + 1).z);
						// System.out.println(Px+" "+Py+" "+Pz+" "+Cx+" "+Cy+" "+Cz+" "+Nx+" "+Ny+" "+Nz);
					}

					// ///////////////////add by tangbx start
					double R = usecyradius;
					// ///////////////////add by tangbx end
					double[] newvi = get_vertical_biVector2(Px, Py, Pz, Cx, Cy,
							Cz, Nx, Ny, Nz);
					if (newvi != null) {
						double m = Math.sqrt(newvi[0] * newvi[0] + newvi[1]
								* newvi[1] + newvi[2] * newvi[2]);
						if (direction == 1) {
							System.out.println(newvi[0] + " " + newvi[1] + " "
									+ newvi[2] + " " + m + " " + R);
							double x = Cx + newvi[0] / m * R;
							double y = Cy + newvi[1] / m * R;
							double z = Cz + newvi[2] / m * R;

							st[0] = x;
							st[1] = y;
							st[2] = z;
							double R1 = R + 0.001; // h为圆环高度
							x = Cx + newvi[0] / m * R1;
							y = Cy + newvi[1] / m * R1;
							z = Cz + newvi[2] / m * R1;
							en[0] = x;
							en[1] = y;
							en[2] = z;
						} else if (direction < 0) {
							System.out.println(newvi[0] + " " + newvi[1] + " "
									+ newvi[2] + " " + m + " " + R);
							double x = Cx - newvi[0] / m * R;
							double y = Cy - newvi[1] / m * R;
							double z = Cz - newvi[2] / m * R;

							st[0] = x;
							st[1] = y;
							st[2] = z;
							double R1 = R + 0.001;// h 为圆环高度
							x = Cx - newvi[0] / m * R1;
							y = Cy - newvi[1] / m * R1;
							z = Cz - newvi[2] / m * R1;
							en[0] = x;
							en[1] = y;
							en[2] = z;
						}

						// System.out.println(st[0]+" "+st[1]+" "+st[2]+" "+m);
						// System.out.println(en[0]+" "+en[1]+" "+en[2]);
						double[] xin = { (st[0] + en[0]) / 2,
								(st[1] + en[1]) / 2, (st[2] + en[2]) / 2 };

						/*
						 * double p=en[0]-st[0]; double q=en[1]-st[1]; double t=
						 * en[2]-st[2];
						 * 
						 * double l = Math.sqrt(p*p+q*q+t*t); double cxa =
						 * Math.sin(p/l); double cya = Math.sin(q/l); double cza
						 * = Math.sin(t/l); double xa =
						 * 2*Math.PI+Math.acos(cxa); double ya =
						 * 2*Math.PI+Math.acos(cya); double za =
						 * 2*Math.PI+Math.acos(cza);
						 */
						// System.out.println(Jyhz.get(i).Name+" "+xin[0]+" "+xin[1]+" "+xin[2]+" "+"0.6"+" "+"0.6"+" "+"0.6"+" "+xa+" "+ya+" "+za);

						double xp = en[0] - st[0];
						double xq = en[1] - st[1];
						double xr = en[2] - st[2];
						double deltarl = Math.sqrt(xp * xp + xq * xq + xr * xr);
						double vx = Math.abs(xp);
						double sinx = vx / deltarl;
						double hx = Math.asin(sinx);
						double anglex = hx / Math.PI * 180;

						double vy = Math.abs(xq);
						double siny = vy / deltarl;
						double hy = Math.asin(siny);
						double angley = hy / Math.PI * 180;
						double vz = Math.abs(xr);
						double sinz = vz / deltarl;
						double hz = Math.asin(sinz);
						/*
						 * if(hz > Math.PI/2 && hz <= Math.PI){ hz = Math.PI -
						 * hz; }
						 */
						double p = xin[0] - Cx;
						double q = xin[1] - Cy;
						double t = xin[2] - Cz;

						double anglez = hz / Math.PI * 180;
						String jyh = xin[0] + " " + zuobiao.get(wz).y + " "
								+ zuobiao.get(wz).z + " " + "0.6" + " " + "0.6"
								+ " " + "0.6" + " " + p + " " + q + " " + t
								+ " " + Jyhz.get(i).Name + " " + Jyhz.get(i).Zf
								+ "\n";
						lee = lee + jyh;

					}

				}
			}
		}
		return lee;

	}

	public  double[] get_vertical_biVector2(double a1, double a2,
			double a3, double b1, double b2, double b3, double c1, double c2,
			double c3) {
		double[] re = { 0, 0, 0 };
		double x = 0;
		double y = 0;
		double z = 0;

		double m = Math.sqrt((a1 - b1) * (a1 - b1) + (a2 - b2) * (a2 - b2)
				+ (a3 - b3) * (a3 - b3));
		double m1 = Math.sqrt((c1 - b1) * (c1 - b1) + (c2 - b2) * (c2 - b2)
				+ (c3 - b3) * (c3 - b3));

		double k1 = (a3 - b3) / m;
		double k2 = (c3 - b3) / m1;
		double k3 = (a1 - b1) / m;
		double k4 = (c1 - b1) / m1;

		double k5 = (a2 - b2) / m;
		double k6 = (c2 - b2) / m1;

		if (k1 == 0 && k2 == 0) { // z=0
			re[0] = 1;
			re[1] = 1;
			re[2] = 0;
		} else if (k3 == 0 && k4 == 0) { // x=0;
			re[0] = 0;
			re[1] = 1;
			re[2] = 1;
		} else if (k5 == 0 && k6 == 0) { // y=0
			re[0] = 1;
			re[1] = 0;
			re[2] = 1;
		} else {
			double x_fenzi = ((-a3 * b1 + c3 * b1 + a1 * b3 + a3 * c1 - b3 * c1 - a1
					* c3) * ((a3 * b2 - c3 * b2 - a2 * b3 - a3 * c2 + b3 * c2 + a2
					* c3)
					* (k1 + k2) - (a2 * b1 - c2 * b1 - a1 * b2 - a2 * c1 + b2
					* c1 + a1 * c2)
					* (k3 + k4)));
			double x_fenmu = ((a3 * b2 - c3 * b2 - a2 * b3 - a3 * c2 + b3 * c2 + a2
					* c3) * ((a3 * b2 - c3 * b2 - a2 * b3 - a3 * c2 + b3 * c2 + a2
					* c3)
					* (k5 + k6) - (-a3 * b1 + c3 * b1 + a1 * b3 + a3 * c1 - b3
					* c1 - a1 * c3)
					* (k3 + k4)));

			x = x_fenzi
					/ x_fenmu
					- (a2 * b1 - c2 * b1 - a1 * b2 - a2 * c1 + b2 * c1 + a1
							* c2)
					/ (a3 * b2 - c3 * b2 - a2 * b3 - a3 * c2 + b3 * c2 + a2
							* c3);

			double x2_fenzi = -((a3 * b2 - c3 * b2 - a2 * b3 - a3 * c2 + b3
					* c2 + a2 * c3)
					* (k1 + k2) - (a2 * b1 - c2 * b1 - a1 * b2 - a2 * c1 + b2
					* c1 + a1 * c2)
					* (k3 + k4));
			double x2_fenmu = ((a3 * b2 - c3 * b2 - a2 * b3 - a3 * c2 + b3 * c2 + a2
					* c3)
					* (k5 + k6) - (-a3 * b1 + c3 * b1 + a1 * b3 + a3 * c1 - b3
					* c1 - a1 * c3)
					* (k3 + k4));
			y = x2_fenzi / x2_fenmu;
			z = 1;
			re[0] = x;
			re[1] = y;
			re[2] = z;

		}

		System.out.println(re[0] + " " + re[1] + " " + re[2]);
		return re;

	}

	public  void Zlhzhuanhuan() {

		for (int i = 0; i <= Zlh.size() - 1; i++) {
			int sta = 0, e = -1;
			for (int q = 0; q <= S.size() - 1; q++) { /*
													 * if(Integer.parseInt(S.get(
													 * q
													 * ))<=Integer.parseInt(Jyh.
													 * get
													 * (i).Start)&&Integer.parseInt
													 * (
													 * S.get(q))<=Integer.parseInt
													 * (
													 * Jyh.get(i).End)&&Integer.
													 * parseInt
													 * (E.get(q))>=Integer
													 * .parseInt
													 * (Jyh.get(i).Start
													 * )&&Integer
													 * .parseInt(E.get(
													 * q))>=Integer
													 * .parseInt(Jyh.
													 * get(i).End)) {
													 * System.out.
													 * println(S.get(q
													 * )+" "+E.get
													 * (q)+" "+Jyh.get
													 * (i).Name+" "
													 * +Jyh.get(i).Start
													 * +" "+Jyh.get(i).End+" ");
													 * }
													 * if(Integer.parseInt(Jyh.
													 * get
													 * (i).Start)<=Integer.parseInt
													 * (
													 * S.get(q))&&Integer.parseInt
													 * (
													 * Jyh.get(i).Start)<=Integer
													 * .
													 * parseInt(E.get(q))&&Integer
													 * .
													 * parseInt(Jyh.get(i).End)>=
													 * Integer
													 * .parseInt(S.get(q))
													 * &&Integer
													 * .parseInt(Jyh.get
													 * (i).End)>=
													 * Integer.parseInt
													 * (E.get(q))){
													 * System.out.println
													 * (S.get(q
													 * )+" "+E.get(q)+" "
													 * +Jyh.get
													 * (i).Name+" "+Jyh.get
													 * (i).Start
													 * +" "+Jyh.get(i).End+" ");
													 * }
													 */

				if (Integer.parseInt(S.get(q)) <= Integer
						.parseInt(Zlh.get(i).start)
						&& Integer.parseInt(E.get(q)) > Integer.parseInt(Zlh
								.get(i).start)) {
					sta = q;
					// if(Jyh.get(i).Name=="RP11-290F24.3"){
					// System.out.println(sta);
					// }

				}
				if (Integer.parseInt(S.get(q)) <= Integer
						.parseInt(Zlh.get(i).end)
						&& Integer.parseInt(E.get(q)) >= Integer.parseInt(Zlh
								.get(i).end)) {
					e = q;
					// if(Jyh.get(i).Name=="RP11-290F24.3"){
					// System.out.println(e);}
				}

			}
			for (int r = sta; r <= e; r++) { // System.out.println(e+" "+sta+" "+r+" "+Jyh.get(i).Name);
				Zhilianghuan a = new Zhilianghuan();
				a.chr = Zlh.get(i).chr;
				a.wz = r;
				a.end = Zlh.get(i).end;
				a.start = Zlh.get(i).start;
				a.sc = Zlh.get(i).sc;
				a.note = Zlh.get(i).note;
				Zlhz.add(a);

				// System.out.println(S.get(r)+" "+E.get(r)+" "+Jyh.get(i).Name+" "+Jyh.get(i).Start+" "+Jyh.get(i).End+" ");
			}
			if (sta != 0 && e == -1) {
				Zhilianghuan a = new Zhilianghuan();
				a.chr = Zlh.get(i).chr;
				a.wz = sta;
				a.end = Zlh.get(i).end;
				a.start = Zlh.get(i).start;
				a.sc = Zlh.get(i).sc;
				a.note = Zlh.get(i).note;
				Zlhz.add(a);
				// System.out.println(S.get(sta)+" "+E.get(sta)+" "+Jyh.get(i).Name+" "+Jyh.get(i).Start+" "+Jyh.get(i).End+" ");
			}

		}
	}

	public  String Tinzhuanhuan() {

		String a = "#2 " + "\n";

		int size = Tin.size();
		for (int i = 0; i <= size - 1; i++) {
			// boolean has=false;
			int o = 0;
			String qaa = "";
			String sta = Tin.get(i).start;
			String end = Tin.get(i).end;
			String[] x = Tin.get(i).inf.split("Note=");
			String[] ifo = x[1].split("\\|");
			for (int m = 0; m <= S.size() - 1; m++) {
				int ss = 0;
				if (Integer.parseInt(sta) >= Integer.parseInt(S.get(m))
						&& Integer.parseInt(sta) < Integer.parseInt(E.get(m))) {
					if (o == 0) {

						o = 1;
					}
					/*
					 * System.out.println(sta); System.out.println(S.get(m));
					 * System.out.println(E.get(m));
					 */
					qaa = qaa + m;
					ss = m;

				}
				if (Integer.parseInt(end) > Integer.parseInt(S.get(m))
						&& Integer.parseInt(end) <= Integer.parseInt(E.get(m))
						&& o == 1) {
					// a=a+" "+m+" "+ifo[0]+" "+ifo[1]+"\n";
					qaa = qaa + " " + m + " " + ifo[0] + " " + ifo[1] + "\n";
					if (m != ss) {
						a = a + qaa;

					}
				}
			}
		}

		return a;

	}

	public  String jiben() {
		String m = null;
		m = Model + " " + b + " " + org + " " + Start + " " + End + " " + Ranse
				+ " " + Track;
		return m;
	}

	public  void change() {
		Model = "3DModel";
		b = "50000";
		org = "hg19";
		Start = "4500000";
		End = "6500000";

	}

	public  void change1() {
		Model = "3DModel";
		b = "50000";
		org = "hg19";
		Start = "4500000";
		End = "5500000";

	}

	public  void Clear() {
		S.clear();
		E.clear();
		IS.clear();
		IE.clear();
		IFO.clear();
		TS.clear();
		TE.clear();
		zuobiao.clear();
		Jyh.clear();
		Jyhz.clear();
		Zlh.clear();
		Zlhz.clear();
		Tin.clear();
		d = "";
		table = "";
		type = "";
		TadPath = "";
		InPath = "";

	}

	public  String Zlhjiexi() {
		String lee = "#5 " + "\n";
		double cyradius = 0;
		double r = 0;
		if (Zlhz.size() != 0) {
			for (int i = 0; i <= Zlhz.size() - 1; i++) {
				String[] note = Zlhz.get(i).note.split(";");
				String[] SMax = note[3].split("=");
				String[] SMin = note[2].split("=");
				double Min = Double.parseDouble(SMin[1]);
				double Max = Double.parseDouble(SMax[1]);
				double sour = Double.parseDouble(Zlhz.get(i).sc);
				System.out.println("min=" + Min + " Max=" + Max + " s="
						+ Zlhz.get(i).sc);
				double zlz = 50.0 * sour / Max;
				int wz = Zlhz.get(i).wz;
				// ///////////change by tangbx start
				double sphere_radius = 0.03;
				// ///////////change by tangbx start
				double genestart = Double.parseDouble(Zlhz.get(i).start);
				double geneend = Double.parseDouble(Zlhz.get(i).end);
				double start = Double.parseDouble(S.get(Zlhz.get(i).wz));
				double end = Double.parseDouble(E.get(Zlhz.get(i).wz));

				if (genestart >= start && genestart <= end) {
					cyradius = (genestart - start) / (end - start)
							* sphere_radius * 2;
				} else if (geneend >= start && geneend <= end) {
					cyradius = (geneend - start) / (end - start)
							* sphere_radius * 2;
				} else if ((genestart < start && geneend > end)
						|| (geneend < start && genestart > end)) {
					cyradius = 0.04f;
				}
				System.out.println(cyradius);
				if (cyradius > 0) {
					cyradius = Math.abs(cyradius);
					// //////////////////////////////////////// change by tangbx
					// start

					int direction = -1; // bottom
					if (cyradius > sphere_radius) { // top
						direction = 1;
					}

					cyradius = cyradius / 2;

					double usecyradius = cyradius - sphere_radius > 0 ? (cyradius - sphere_radius) / 2
							: cyradius / 2; // 此处是在判断 这个圆环是要画在 球的顶面和底面
											// （因为我使用的是webgl， 球是有方向的）
					double yaxis = Math.sqrt(sphere_radius * sphere_radius
							- usecyradius * usecyradius);
					// /////////////////////////////// change by tangbx end

					double[] st = { 0, 0, 0 };
					double[] en = { 0, 0, 0 };
					double Px;
					double Py;
					double Pz;
					double Cx;
					double Cy;
					double Cz;
					double Nx;
					double Ny;
					double Nz;
					if (wz == 0) {
						Px = Double.parseDouble(zuobiao.get(wz + 2).x);
						Py = Double.parseDouble(zuobiao.get(wz + 2).y);
						Pz = Double.parseDouble(zuobiao.get(wz + 2).z);
						Cx = Double.parseDouble(zuobiao.get(wz).x);
						Cy = Double.parseDouble(zuobiao.get(wz).y);
						Cz = Double.parseDouble(zuobiao.get(wz).z);
						Nx = Double.parseDouble(zuobiao.get(wz + 1).x);
						Ny = Double.parseDouble(zuobiao.get(wz + 1).y);
						Nz = Double.parseDouble(zuobiao.get(wz + 1).z);
						System.out.println(Px + " " + Py + " " + Pz + " " + Cx
								+ " " + Cy + " " + Cz + " " + Nx + " " + Ny
								+ " " + Nz);

					} else if (wz == zuobiao.size() - 1) {
						Px = Double.parseDouble(zuobiao.get(wz - 1).x);
						Py = Double.parseDouble(zuobiao.get(wz - 1).y);
						Pz = Double.parseDouble(zuobiao.get(wz - 1).z);
						Cx = Double.parseDouble(zuobiao.get(wz).x);
						Cy = Double.parseDouble(zuobiao.get(wz).y);
						Cz = Double.parseDouble(zuobiao.get(wz).z);
						Nx = Double.parseDouble(zuobiao.get(wz - 2).x);
						Ny = Double.parseDouble(zuobiao.get(wz - 2).y);
						Nz = Double.parseDouble(zuobiao.get(wz - 2).z);
						System.out.println(Px + " " + Py + " " + Pz + " " + Cx
								+ " " + Cy + " " + Cz + " " + Nx + " " + Ny
								+ " " + Nz);
					} else {
						Px = Double.parseDouble(zuobiao.get(wz - 1).x);
						Py = Double.parseDouble(zuobiao.get(wz - 1).y);
						Pz = Double.parseDouble(zuobiao.get(wz - 1).z);
						Cx = Double.parseDouble(zuobiao.get(wz).x);
						Cy = Double.parseDouble(zuobiao.get(wz).y);
						Cz = Double.parseDouble(zuobiao.get(wz).z);
						Nx = Double.parseDouble(zuobiao.get(wz + 1).x);
						Ny = Double.parseDouble(zuobiao.get(wz + 1).y);
						Nz = Double.parseDouble(zuobiao.get(wz + 1).z);
						System.out.println(Px + " " + Py + " " + Pz + " " + Cx
								+ " " + Cy + " " + Cz + " " + Nx + " " + Ny
								+ " " + Nz);
					}

					// ///////////////////add by tangbx start
					double R = usecyradius;
					// ///////////////////add by tangbx end
					double[] newvi = get_vertical_biVector2(Px, Py, Pz, Cx, Cy,
							Cz, Nx, Ny, Nz);
					if (newvi != null) {
						double m = Math.sqrt(newvi[0] * newvi[0] + newvi[1]
								* newvi[1] + newvi[2] * newvi[2]);
						if (direction == 1) {
							System.out.println(newvi[0] + " " + newvi[1] + " "
									+ newvi[2] + " " + m + " " + R);
							double x = Cx + newvi[0] / m * R;
							double y = Cy + newvi[1] / m * R;
							double z = Cz + newvi[2] / m * R;

							st[0] = x;
							st[1] = y;
							st[2] = z;
							double R1 = R + 0.001; // h为圆环高度
							x = Cx + newvi[0] / m * R1;
							y = Cy + newvi[1] / m * R1;
							z = Cz + newvi[2] / m * R1;
							en[0] = x;
							en[1] = y;
							en[2] = z;
						} else if (direction < 0) {
							System.out.println(newvi[0] + " " + newvi[1] + " "
									+ newvi[2] + " " + m + " " + R);
							double x = Cx - newvi[0] / m * R;
							double y = Cy - newvi[1] / m * R;
							double z = Cz - newvi[2] / m * R;

							st[0] = x;
							st[1] = y;
							st[2] = z;
							double R1 = R + 0.001;// h 为圆环高度
							x = Cx - newvi[0] / m * R1;
							y = Cy - newvi[1] / m * R1;
							z = Cz - newvi[2] / m * R1;
							en[0] = x;
							en[1] = y;
							en[2] = z;
						}
						// System.out.println(st[0]+" "+st[1]+" "+st[2]+" "+m);
						// System.out.println(en[0]+" "+en[1]+" "+en[2]);
						double[] xin = { (st[0] + en[0]) / 2,
								(st[1] + en[1]) / 2, (st[2] + en[2]) / 2 };

						/*
						 * double p=en[0]-st[0]; double q=en[1]-st[1]; double t=
						 * en[2]-st[2];
						 * 
						 * double l = Math.sqrt(p*p+q*q+t*t); double cxa =
						 * Math.sin(p/l); double cya = Math.sin(q/l); double cza
						 * = Math.sin(t/l); double xa =
						 * 2*Math.PI+Math.acos(cxa); double ya =
						 * 2*Math.PI+Math.acos(cya); double za =
						 * 2*Math.PI+Math.acos(cza);
						 */
						// System.out.println(Zlhz.get(i).Name+" "+xin[0]+" "+xin[1]+" "+xin[2]+" "+"0.6"+" "+"0.6"+" "+"0.6"+" "+xa+" "+ya+" "+za);

						double xp = en[0] - st[0];
						double xq = en[1] - st[1];
						double xr = en[2] - st[2];
						double deltarl = Math.sqrt(xp * xp + xq * xq + xr * xr);
						double vx = Math.abs(xp);
						double sinx = vx / deltarl;
						double hx = Math.asin(sinx);
						double anglex = hx / Math.PI * 180;

						double vy = Math.abs(xq);
						double siny = vy / deltarl;
						double hy = Math.asin(siny);
						double angley = hy / Math.PI * 180;
						double vz = Math.abs(xr);
						double sinz = vz / deltarl;
						double hz = Math.asin(sinz);
						/*
						 * if(hz > Math.PI/2 && hz <= Math.PI){ hz = Math.PI -
						 * hz; }
						 */

						double anglez = hz / Math.PI * 180;
						// int[] co=computeColor(Min,Max,sour) ;
						String jyh = xin[0] + " " + zuobiao.get(wz).y + " "
								+ zuobiao.get(wz).z + " " + "0.6" + " " + "0.6"
								+ " " + zlz + " " + sour + " " + Max + " "
								+ Min + "\n";
						lee = lee + jyh;

					}

				}
			}
		}
		return lee;

	}

	@SuppressWarnings("null")
	public static int[] computeColor(double minval, double maxval,
			double qual_score) {
		int[] co = { 0, 0, 0 };
		float min_val = (float) minval;
		float max_val = (float) maxval;
		ColorRamp colormap = new ColorRamp(min_val, max_val, Color.WHITE,
				Color.ORANGE);

		Color tc_color = colormap.getContinousColor(qual_score);
		co[0] = tc_color.getRed();
		co[1] = tc_color.getGreen();
		co[2] = tc_color.getBlue();
		return co;
	}

	public String getD() {
		return d;
	}

	public void setD(String d) {
		this.d = d;
	}

	
	public static void main(String [] args){
		
		String wsurl = "http://3cdb.big.ac.cn/ws/interaction/locuslist";
		try{
			Client client = BIGWebServiceClientFactory.getClient();
	        WebResource webr = client.resource(wsurl);
	        Form param = new Form();
	        param.add("organism", "hg19");
	        param.add("chrom", "8");
	        param.add("start", "128000000");
	        param.add("end", "129000000");
	        
	        ClientResponse response =   webr.accept(MediaType.APPLICATION_XML).post(ClientResponse.class, param);
	        System.out.println(response.toString());
	        List<InteractionViewBean> info =  response.getEntity(new GenericType<List<InteractionViewBean>>() {}) ;
	        if(info != null && info.size() > 0 ){
	        	
	        	System.out.println(info.size());
	        }
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		
	}
	
}
