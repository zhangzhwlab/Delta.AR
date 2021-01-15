package cn.ac.big.msg.po;

public class PortalJson {

	private Portal portal;
	private Hololens hololens;
	private PhysicalModel model;
	private AnoTrack annotation;
	
	public Portal getPortal() {
		return portal;
	}
	public void setPortal(Portal portal) {
		this.portal = portal;
	}
	
	
	public Hololens getHololens() {
		return hololens;
	}
	public void setHololens(Hololens hololens) {
		this.hololens = hololens;
	}
	public PhysicalModel getModel() {
		return model;
	}
	public void setModel(PhysicalModel model) {
		this.model = model;
	}
	public AnoTrack getAnnotation() {
		return annotation;
	}
	public void setAnnotation(AnoTrack annotation) {
		this.annotation = annotation;
	}
	
	
}
