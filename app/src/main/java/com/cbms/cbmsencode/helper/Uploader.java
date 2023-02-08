package com.cbms.cbmsencode.helper;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.cbms.cbmsencode.activity.DashboardActivity;
import com.cbms.cbmsencode.app.AppConfig;
import com.cbms.cbmsencode.app.AppController;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class Uploader {

    final Context context;
    FileManager fileManager;
    String hpq_data;
    Boolean waitingResponse;

    public Uploader(Context c) {
        context = c;
    }

    public void openConnection() {
        String tag_string_req = "req_login";
        StringRequest strReq = new StringRequest(Request.Method.POST,
                AppConfig.URL_UPLOAD,
                response -> connectionResponse(response), error -> {
                    JSONObject err = new JSONObject();
                    try {
                        err.put("error", true);
                        err.put("data", String.valueOf(error.getMessage()));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    connectionResponse(String.valueOf(err));
                }) {
            @Override
            protected Map<String, String> getParams() {
                // Posting parameters to register url
                Map<String, String> params = new HashMap<>();
                params.put("data", "test");
                return params;
            }
        };
        AppController.getInstance().addToRequestQueue(strReq, tag_string_req);
    }

    public void connectionResponse(String response) {

        final String res = response;
        ((Activity) context).runOnUiThread(() -> DashboardActivity.wv.evaluateJavascript("serverResponse('" + res + "');", null));
    }

    public void upload_hpq(String instances) {

        fileManager = new FileManager(context);

        try {
            JSONObject jObj = new JSONObject(instances);

            JSONArray instanceslist = jObj.getJSONArray("instances");

            for (int i = 0; i < instanceslist.length(); i++) {

                String instance_ID = instanceslist.getString(i);
                waitingResponse = true;
                Log.d("Uploading form", instance_ID);
                hpq_data = fileManager.getInstance(instance_ID + ".json");
                send_hpq(hpq_data, instance_ID);

                while (waitingResponse) {

                }

            }
            send_hpq("end", "end");

        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    public void send_hpq(String hpq_data, String file_name) {

        String tag_string_req = "req_upload";
        StringRequest strReq = new StringRequest(Request.Method.POST, AppConfig.URL_UPLOAD,
                response -> uploadResponse(response),
                error -> {
                    Log.d("Upload failed", String.valueOf(error.getMessage()));
                    JSONObject jsonResponse = new JSONObject();

                    try {
                        jsonResponse.put("error", true);
                        jsonResponse.put("data", error.getMessage());
                        uploadResponse(jsonResponse.toString());
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }) {


            protected Response<String> parseNetworkResponse(NetworkResponse response) {
                return super.parseNetworkResponse(response);

            }

            @Override
            protected Map<String, String> getParams() {

                Map<String, String> params = new HashMap<>();
                params.put("data", hpq_data);

                return params;
            }

        };
        // Adding request to request queue
        AppController.getInstance().addToRequestQueue(strReq, tag_string_req);
    }

    public void uploadResponse(String response) {

        waitingResponse = false;

        Log.i("uploadResponse", "[" + response + "]");

        final String finalRes = response;
        try {
            JSONObject upRes = new JSONObject(response);
            if (!upRes.getBoolean("error")) {
                //if(!upRes.getString("data").equals("all_files_uploaded"))
                //fileManager.updateUploadedHPQ(upRes.getString("data"));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        ((Activity) context).runOnUiThread(() -> DashboardActivity.wv.evaluateJavascript("uploadResponse('" + finalRes + "');", null));
    }

}
