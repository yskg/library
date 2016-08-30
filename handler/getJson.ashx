<%@ WebHandler Language="C#" Class="getJson" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;

public class getJson : IHttpHandler {
    CommonClass cc = new CommonClass();
    public void ProcessRequest (HttpContext context) {
        string meth = context.Request["method"].ToString();
        switch (meth) { 
            case "getbar":
                get_bar(context);
                break;
            case "geturl":
                get_json(context);
                break;
            case "question":
                int age=int.Parse(context.Request["age"].ToString());
                string edu = context.Request["edu"].ToString();
                string pre = context.Request["pre"].ToString();
                string infor = context.Request["infor"].ToString();
                string sug = context.Request["sug"].ToString();
                question(context,age,edu,pre,infor,sug);
                break;
            case "getprovince":
                get_province(context);
                break;
        }
    }
    private void get_province(HttpContext context)
    {
        SqlConnection con = cc.GetConnection();
        con.Open();
        string querysite = "select COUNT(1),province from place group by province";
        SqlDataAdapter da = new SqlDataAdapter(querysite, con);
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        ds.Reset();
        da.Fill(ds);
        dt = ds.Tables[0];
        con.Close();
        string json = "";
        if (ds.Tables.Count > 0)
        {
            json = JsonConvert.SerializeObject(dt);
        }
        context.Response.Write(json);
    
    }
    
    private void get_json(HttpContext context)
    {
        string url = "";
        System.Net.HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(url);
        System.Net.HttpWebResponse response = (System.Net.HttpWebResponse)request.GetResponse();
        System.IO.Stream responseStream = response.GetResponseStream();
        System.IO.StreamReader sr = new System.IO.StreamReader(responseStream, System.Text.Encoding.GetEncoding("utf-8"));
        string responseText = sr.ReadToEnd();
        sr.Close();
        sr.Dispose();
        responseStream.Close();
        string jsonData = responseText; //JsonConvert.SerializeObject(responseText);
        context.Response.Write(jsonData);
       
    }
    private void get_bar(HttpContext  context) {
        SqlConnection con = cc.GetConnection();
        con.Open();
        string querysite = "select FamilyName,count from family_count ";
        SqlDataAdapter da = new SqlDataAdapter(querysite, con);
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        ds.Reset();
        da.Fill(ds);
        dt = ds.Tables[0];
        con.Close();
        string json = "";
        if (ds.Tables.Count > 0)
        {
            json = JsonConvert.SerializeObject(dt);
        }
        context.Response.Write(json);
    
    }
    private void question(HttpContext context,int age,string edu,string pre,string infor,string sug) {

        SqlConnection con = cc.GetConnection();
        con.Open();
        string insertstr = "insert into visitor(age,education,profession,information,suggestion) values(" + age + ",'" + edu + "','" + pre + "','" + infor +"','"+sug+ "')";
        SqlCommand cmd = new SqlCommand(insertstr, con);
        int var = cmd.ExecuteNonQuery();
        if (var > 0)        //判断数据库命令是否执行成功
        {
           context.Response.Write("成功");
            
        }
        else
        {
            context.Response.Write("失败");
            
        }
        con.Close();
        cmd.Dispose();
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}