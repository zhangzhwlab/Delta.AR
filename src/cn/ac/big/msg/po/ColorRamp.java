/* Decompiled by Mocha from ColorRamp.class */
/* Originally compiled from ColorRamp.java */
package cn.ac.big.msg.po;
import java.awt.Color;
import java.awt.GradientPaint;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.image.BufferedImage;

public class ColorRamp
{
    double x1 = -1; //min
    double x2 = 1; //max
    Color c1;
    Color c2;
    Color [] colors;
    double delta;
    public ColorRamp(double d1, double d2, Color color1, Color color2)
    {
    	if(d1 == 0){
    		d1 = 1;
    	}
        x1 = d1;
        x2 = d2;
        c1 = color1;
        c2 = color2;
        
       colors = new Color[2000];
   	   delta = ((this.x2 - this.x1) / colors.length);
   
        for (int i = 0; i < colors.length; i++)
        {
          float x = (float)(this.x1 + i * delta);
          colors[i] = renderColor(x);
        }
        
    }

    public Color getLinearColor(double d1)
    {
        double d2 = (d1 - x1) / (x2 - x1);
        if (x1 < x2)
        {
            if (d1 >= x2)
                d2 = 1.0;
            else if (d1 <= x1)
                d2 = 0.0;
        }
        else if (d1 <= x2)
            d2 = 1.0;
        else if (d1 >= x1)
            d2 = 0.0;
        int i = (int)((double)c1.getRed() + d2 * (c2.getRed() - c1.getRed()));
        int j = (int)((double)c1.getGreen() + d2 * (c2.getGreen() - c1.getGreen()));
        int k = (int)((double)c1.getBlue() + d2 * (c2.getBlue() - c1.getBlue()));
        int  newA = (int) (c1.getAlpha() + d2 * (c2.getAlpha() - c1.getAlpha()));
        
        
        return new Color(i, j, k , newA);
    }

    public Color getLogarithmicColor(double d1)
    {
        double d2 = (Math.log(d1) - Math.log(x1)) / (Math.log(x2) - Math.log(x1));
        if (x1 < x2)
        {
            if (d1 >= x2)
                d2 = 1.0;
            else if (d1 <= x1)
                d2 = 0.0;
        }
        else if (d1 <= x2)
            d2 = 1.0;
        else if (d1 >= x1)
            d2 = 0.0;
        int i = (int)((double)c1.getRed() + d2 * (c2.getRed() - c1.getRed()));
        int j = (int)((double)c1.getGreen() + d2 * (c2.getGreen() - c1.getGreen()));
        int k = (int)((double)c1.getBlue() + d2 * (c2.getBlue() - c1.getBlue()));
        
        
        int a1 = c1.getAlpha();
        int a2 = c2.getAlpha();
        
       // int  newA = (int) (a1 + d2 * (a2 - a1));
        
        return new Color(i, j, k);
    }
    
    public  Color interpolate(Color start, Color end, float p) { // (curval - minval)/(maxval-minval)
        float[] startHSB = Color.RGBtoHSB(start.getRed(), start.getGreen(), start.getBlue(), null);
        float[] endHSB = Color.RGBtoHSB(end.getRed(), end.getGreen(), end.getBlue(), null);

        float brightness = (startHSB[2] + endHSB[2]) / 2;
        float saturation = (startHSB[1] + endHSB[1]) / 2;

        float hueMax = 0;
        float hueMin = 0;
        if (startHSB[0] > endHSB[0]) {
            hueMax = startHSB[0];
            hueMin = endHSB[0];
        } else {
            hueMin = startHSB[0];
            hueMax = endHSB[0];
        }

        float hue = ((hueMax - hueMin) * p) + hueMin;

        return Color.getHSBColor(hue, saturation, brightness);
    }
    
    
    
    
    public Color changeHSL(Color color,double d1){  
    	
    	double d2 = (Math.log(d1) - Math.log(x1)) / (Math.log(x2) - Math.log(x1));
        if (x1 < x2)
        {
            if (d1 >= x2)
                d2 = 1.0;
            else if (d1 <= x1)
                d2 = 0.0;
        }
        else if (d1 <= x2)
            d2 = 1.0;
        else if (d1 >= x1)
            d2 = 0.0;
    	
    	
    	String hex = Integer.toHexString(color.getRGB() & 0xffffff);

    	while (hex.length() < 6) {
    	    hex = "0" + hex;
    	}
    	
  
    	int i=0;
    	int[] rgb = new int[3];
    	int c=0;
    	
    	for (i = 0; i < 3; i++) {
    		String subhex =hex.substring(i*2,i*2+2) ;
    		
    		if(subhex.length() > 0 ){
    			c = Integer.parseInt(subhex,16);
    			c = Math.round(Math.min(Math.max(0, c + (int)(c * d2)), 255));
        		rgb[i] = c;
    		}
    		
    		
    	}
    	
    	return new Color(rgb[0], rgb[1], rgb[2]);
    	
    	
    }
    
    
    public Color getColor(float score){
    	
    	if(score > 0.0F){
    		score /= this.x2;
    		int R = (int)(255.0F *Math.min(score, 1.0F));
    		int G=0;
    		int B=0;
    		return new Color(R,G,B);
    	}
    	if(score < 0.0F){
    		score /= this.x1;
    		if(score < 0.0F){
    			score = - score;
    		}
    		int R=0;
    		int G= 0 ;
    		int B= (int)(255.0F *Math.min(score, 1.0F));
    		return new Color(R,G,B);
    	}
    	
    	return Color.BLACK;    	
    }
    
    
    public Color getContinousColor(double qual_score){
    	 
    	 
          double negStart = Math.max(0.0D, this.x1);
         double posStart = negStart;
           if ((qual_score >= 1.0001D * negStart) && (qual_score <= 1.0001D * posStart)) {
             return Color.WHITE;
           }
           int index = (int)Math.round((qual_score- this.x1) /delta);
           index = Math.max(0, Math.min(index, colors.length - 1));
           return colors[index];
    	
    }
    
    
    public Color renderColor(float score){
    	double span = this.x2 - this.x1;
        int colorIndex = 0;
        if (score <= this.x1) {
          colorIndex = 0;
        } else if (score >= this.x2) {
          colorIndex = 255;
        } else {
          colorIndex = (int)((score - this.x1) / span * 255.0D);
        }
        
        BufferedImage posImage = createGradientImage(Color.WHITE, Color.RED);
        int rgb = posImage.getRGB(colorIndex, 0);
    	
    	return new Color(rgb);
    	
    }
    
    private BufferedImage createGradientImage(Color color1, Color color2)
    {
    	//HeadlessGraphicsEnvironment 
    	
      //BufferedImage image = GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice().getDefaultConfiguration().createCompatibleImage(256, 1);
      BufferedImage image = new BufferedImage(256 , 1,BufferedImage.TYPE_INT_ARGB);
      
      Graphics2D graphics = image.createGraphics();
      GradientPaint gp = new GradientPaint(0.0F, 0.0F, color1, 255.0F, 0.0F, color2);
      
      graphics.setPaint(gp);
      graphics.drawRect(0, 0, 255, 1);
      graphics.dispose();
      
      return image;
    }
    
    
    
}

