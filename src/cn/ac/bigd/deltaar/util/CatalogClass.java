package cn.ac.bigd.deltaar.util;

import java.util.ArrayList;
import java.util.List;

public class CatalogClass {
	private String typename;
	private List<CatalogItem> itemlist = new ArrayList<CatalogItem>();
	
	public String getTypename() {
		return typename;
	}
	public void setTypename(String typename) {
		this.typename = typename;
	}
	public List<CatalogItem> getItemlist() {
		return itemlist;
	}
	public void setItemlist(List<CatalogItem> itemlist) {
		this.itemlist = itemlist;
	}
	
	public void addItem(CatalogItem item){
		itemlist.add(item);
	}
	
}
