package cn.ac.big.msg.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.ac.big.msg.output.Text;


/**
 * Servlet implementation class Changex
 */
@WebServlet("/Changex")
public class Changex extends HttpServlet {
	public boolean i=true;
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Changex() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// public string mo, bin, sep, track, rens, start, end;
	/*	Text.Model=request.getParameter("modelname");
		Text.b=request.getParameter("binsize");
		Text.org=request.getParameter("sepcies");
		Text.Track=request.getParameter("track");
		Text.Ranse=request.getParameter("rense");
		Text.Start=request.getParameter("start");
		Text.End=request.getParameter("end");
		Text.JobId=request.getParameter("jobid");*/
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().write("change success");	
	}

}
