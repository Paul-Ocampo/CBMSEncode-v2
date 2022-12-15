package com.cbms.cbmsencode.helper;

import android.app.Activity;
import android.content.Context;
import android.os.Environment;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.android.volley.Request;
import com.android.volley.toolbox.StringRequest;
import com.cbms.cbmsencode.activity.DashboardActivity;
import com.cbms.cbmsencode.app.AppConfig;
import com.cbms.cbmsencode.app.AppController;
import com.google.firebase.crashlytics.buildtools.reloc.org.apache.commons.io.FileUtils;
import com.google.firebase.crashlytics.buildtools.reloc.org.apache.commons.io.IOUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MyJavaScriptInterface {

    public final SQLiteHandler db;
    final FileManager fileManager;
    final Uploader uploader;
    final SessionManager sessionManager;
    private final Context context;

    public MyJavaScriptInterface(Context c) {

        context = c;
        db = new SQLiteHandler(context);
        fileManager = new FileManager(context);
        sessionManager = new SessionManager();
        uploader = new Uploader(context);

    }

    @JavascriptInterface
    public String checkLogin(final String username, final String password) {
        return db.checkUser(username, password);
    }

    @JavascriptInterface
    public void SyncDB(String command) {
        // Tag used to cancel the request
        String tag_string_req = "req_sync";

        StringRequest strReq = new StringRequest(Request.Method.POST,
                AppConfig.URL_SYNC, response -> {
            try {
                JSONObject jObj = new JSONObject(response);
                boolean error = jObj.getBoolean("error");
                // Check for error node in json
                if (!error) {
                    //loop through JSON array to insert user's data one by one
                    JSONArray users = jObj.getJSONArray("users");
                    db.deleteUsers();
                    for (int i = 0; i < users.length(); i++) {
                        JSONObject obj = users.getJSONObject(i);
                        Integer id = obj.getInt("id");
                        String first_name = obj.getString("first_name");
                        String mid_name = obj.getString("mid_name");
                        String last_name = obj.getString("last_name");
                        String username = obj.getString("username");
                        String pword = obj.getString("pword");
                        String cpnumber = obj.getString("cpnumber");
                        String birth_date = obj.getString("birth_date");
                        String brgy = obj.getString("brgy");
                        String access_level = obj.getString("access_level");
                        String stat = obj.getString("stat");
                        // Inserting row in users table
                        db.addUsers(id, first_name, mid_name, last_name, username, pword, cpnumber, birth_date, brgy, access_level, stat);
                    }
                    syncResponseCallback(0);
                } else {
                    syncResponseCallback(1);
                }
            } catch (JSONException e) {
                syncResponseCallback(1);
            }
        }, error -> syncResponseCallback(2)) {
            @Override
            protected Map<String, String> getParams() {
                // Posting parameters to login url
                Map<String, String> params = new HashMap<>();
                params.put("command", command);
                return params;
            }
        };

        // Adding request to request queue
        AppController.getInstance().addToRequestQueue(strReq, tag_string_req);
    }

    @JavascriptInterface
    public String checkLoggedIn() {
        return sessionManager.isUserLoggedIn();
    }

    @JavascriptInterface
    public String getLoggedInUser() {
        return sessionManager.loggedInUser();
    }

    @JavascriptInterface
    public void logout() {
        sessionManager.setLoggedIn("false", 0, null, null, null, null, null, null, null, null);
    }

    @JavascriptInterface
    public String getInstancelist() {
        return fileManager.getInstanceList();
    }

    @JavascriptInterface
    public boolean recoverInstancelist() {
        return fileManager.recoverInstancelist();
    }

    @JavascriptInterface
    public void saveHPQ(String hpqData) {
        fileManager.saveHPQToFile(hpqData);
    }

    @JavascriptInterface
    public void autoSaveHPQ(String hpqData) {
        fileManager.autoSaveHPQToFile(hpqData);
    }

    @JavascriptInterface
    public String openHPQ(String filename) {
        return fileManager.getInstance(filename);
    }

    @JavascriptInterface
    public boolean deleteHPQ(String filename) {
        return fileManager.deleteFile(filename);
    }

    @JavascriptInterface
    public void uploadHPQ(String instances) {
        uploader.upload_hpq(instances);
    }

    @JavascriptInterface
    public void openConnection() {
        uploader.openConnection();
    }

    public void saveResponseCallback(Integer response) {
        ((Activity) context).runOnUiThread(() -> DashboardActivity.wv.evaluateJavascript("saveResponse(" + response + ");", null));
    }

    public void syncResponseCallback(Integer response) {
        ((Activity) context).runOnUiThread(() -> DashboardActivity.wv.evaluateJavascript("syncResponse(" + response + ");", null));
    }

    @JavascriptInterface
    public void setTemp(String tempFileName, String object) {

        File tempFolder = new File(context.getCacheDir(), "hpq");
        File tempFile = new File(tempFolder + "/" + tempFileName + ".temp");
        if (!tempFolder.exists()) {
            tempFolder.mkdirs();
        }
        try {
            Log.d("setTemp", "Write temp file " + tempFile);
            FileOutputStream fileOutputStream = new FileOutputStream(tempFile);
            fileOutputStream.write(object.getBytes());
            fileOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public String getTemp(String tempFileName) {
        String obj = "";
        try {
            File tempFolder = new File(context.getCacheDir(), "hpq");
            File tempFile = new File(tempFolder + "/" + tempFileName + ".temp");

            if (tempFile.exists()) {
                Log.d("getTemp", "Read temp file " + tempFile);
                InputStream inputStream = new FileInputStream(tempFile);
                obj = IOUtils.toString(inputStream, "UTF-8");
                inputStream.close();
                return obj;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "[]";
    }

    @JavascriptInterface
    public void clearTemp() {

        File tempFolder = new File(context.getCacheDir(), "hpq");

        try {
            FileUtils.cleanDirectory(tempFolder);
        } catch (Exception ex) {
            Log.e("Failed delete contents", ex.getMessage());
        }
    }

}
