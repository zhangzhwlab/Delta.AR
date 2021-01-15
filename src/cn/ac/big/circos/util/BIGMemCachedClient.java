package cn.ac.big.circos.util;

import com.danga.MemCached.MemCachedClient;
import com.danga.MemCached.SockIOPool;

public class BIGMemCachedClient {
	
	public static MemCachedClient memCacheClient;
	


	public static MemCachedClient getMemCacheClient() {
		
		if(memCacheClient == null ){

			String [] addr ={"192.168.118.15:11211"};  
	        Integer [] weights = {3};  
	        SockIOPool pool = SockIOPool.getInstance();  
	        pool.setServers(addr);  
	        pool.setWeights(weights);  
	        pool.setInitConn(5);  
	        pool.setMinConn(5);  
	        pool.setMaxConn(200);  
	        pool.setMaxIdle(1000*30*30);  
	        pool.setMaintSleep(30);  
	        pool.setNagle(false);  
	        pool.setSocketTO(30);  
	        pool.setSocketConnectTO(0);  
	        pool.initialize();  
	        memCacheClient = new MemCachedClient(); 
	    
		}
		
		return memCacheClient;
	
	}

	public static void setMemCacheClient(MemCachedClient memCacheClient) {
		BIGMemCachedClient.memCacheClient = memCacheClient;
	}
	
	
	
	
	
	
	
	
}
