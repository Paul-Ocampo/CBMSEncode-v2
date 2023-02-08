package com.cbms.cbmsencode.helper;

import static com.cbms.cbmsencode.activity.DashboardActivity.DashboardContext;

import android.content.Context;
import android.content.res.AssetManager;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;

import com.cbms.cbmsencode.activity.DashboardActivity;
import com.google.firebase.crashlytics.buildtools.reloc.org.apache.commons.io.IOUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FileManager {

    // path used to save encoded HPQs
    //static File formsPath = new File(loginContext.getExternalFilesDir("data"),"CBMSEncode/instances/");
    static final File formsPath = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS),"CBMSEncode/instances/");
    // path used to save instancelist
    //static File instancelistPath = new File(loginContext.getExternalFilesDir("data"),"CBMSEncode/");
    static final File instancelistPath = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS),"CBMSEncode/");
    public final File publicDir = new File(DashboardContext.getCacheDir(), "raster");
    public final File rasterFile = new File(String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)));
    final Context cntxt;
    MyJavaScriptInterface myJavaScriptInterface;
    JSONObject instancelistJSON_data = new JSONObject();
    JSONObject instancelistJSON = new JSONObject();
    JSONObject hpqData = new JSONObject();
    String instancelistString;
    String file_name;
    // variables for reading instances
    String file_content;
    JSONObject instanceEntryFromFile = new JSONObject();

    public FileManager(Context context) {
        cntxt = context;
    }
    public String getInstanceList() {

        File instancelistFile = new File(instancelistPath + "/instancelist.json");

        if(instancelistFile.exists()) { // check if there is a file "instancelist.json"
            instancelistString = readFromFile(instancelistFile);
            try {
                instancelistJSON = new JSONObject(instancelistString);
                instancelistJSON_data = instancelistJSON.getJSONObject("data");
            } catch (JSONException e) {
                e.printStackTrace();
            }
        } else { // create a new file
            if (createEmptyInstancelist()) getInstanceList();
            else return "file_not_found";
        }
        return instancelistString;
    }
    public boolean createEmptyInstancelist(){
        JSONObject emptyInstancelist = new JSONObject();
        try {
            emptyInstancelist.put("data","");
            if (writeToFile(emptyInstancelist.toString(), instancelistPath, "instancelist.json")){
                return true;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return false;
    }
    public boolean recoverInstancelist(){
        File instancelistFile = new File(instancelistPath + "/instancelist.json");
        if(instancelistFile.exists()) {
            if(!instancelistFile.delete()) Log.w("Delete failed", instancelistFile.toString());
        }
        File directory = new File(String.valueOf(formsPath));
        File[] files = directory.listFiles();
        if(directory.canRead() && files!=null) {
            for (File file : files) {
                try {
                    hpqData = new JSONObject(readFromFile(file.getAbsoluteFile()));
                    fetchAndInsertData();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            return saveInstancelist();
        }
        return false;
    }
    public void saveHPQToFile(String data){
        myJavaScriptInterface = new MyJavaScriptInterface(cntxt);
        try {
            hpqData = new JSONObject(data);
            file_name = hpqData.getString("filename") + ".json";
            if(writeToFile(data, formsPath, file_name)){
                getInstanceList();
                if(fetchAndInsertData()) {
                    saveInstancelist();
                    myJavaScriptInterface.saveResponseCallback(0);
                }
            } else myJavaScriptInterface.saveResponseCallback(1);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    public void autoSaveHPQToFile(String data){
        myJavaScriptInterface = new MyJavaScriptInterface(cntxt);
        try {
            hpqData = new JSONObject(data);
            file_name = hpqData.getString("filename") + ".json";
            if(writeToFile(data, formsPath, file_name)){
                getInstanceList();
                if(fetchAndInsertData()) {
                    saveInstancelist();
                }
            } else {
                myJavaScriptInterface.saveResponseCallback(2);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    public boolean fetchAndInsertData() {
        JSONObject formDetail = new JSONObject();
        JSONObject instanceData = new JSONObject();
        // variables for instanceData and formDetail
        String instanceID;
        Integer encoder;
        String hpq_id;
        String brgy;
        String purok;
        Integer hcn;
        String respondent;
        String int_date;
        Integer hpq_stat;

        try {
            instanceID = hpqData.getString("filename");
            encoder = hpqData.getInt("encoder");
            brgy = hpqData.getString("brgy");
            purok = hpqData.getString("purok");
            hcn = hpqData.getInt("hcn");
            respondent = hpqData.getString("respondent");
            int_date = hpqData.getString("int_date");
            hpq_stat = hpqData.getInt("hpq_stat");
            hpq_id = hpqData.getString("hpq_id");

            formDetail.put("hpq_id", hpq_id);
            formDetail.put("brgy", brgy);
            formDetail.put("purok", purok);
            formDetail.put("hcn", hcn);
            formDetail.put("respondent", respondent);

            instanceData.put("encoder", encoder);
            instanceData.put("int_date", int_date);
            instanceData.put("hpq_stat", hpq_stat);
            instanceData.put("formDetail", formDetail);
            instanceData.put("instanceID", instanceID);
            instanceData.put("fileName", instanceID + ".json");

            instancelistJSON_data.put(instanceID, instanceData);
            return true;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return false;
    }
    public boolean writeToFile(String data, @NonNull File path, String file_name) {
        if(!path.exists()) {
            if(!path.mkdirs()) {
                Log.d("Failed creating folder",  path.toString());
                return false;
            }
        }
        try {
            Log.d("Creating file",  path + "/" + file_name);
            FileOutputStream fileOutputStream = new FileOutputStream(path + "/" + file_name, false);
            fileOutputStream.write(data.getBytes());
            fileOutputStream.close();
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    public boolean saveInstancelist(){
        try {
            instancelistJSON.put("data", instancelistJSON_data);
            if(writeToFile(instancelistJSON.toString(), instancelistPath, "instancelist.json")){
                return true;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return false;
    }
    public String readFromFile(File file_name) {
        String myString = "";

        try {
                InputStream inputStream = new FileInputStream(file_name);
                myString = IOUtils.toString(inputStream, "UTF-8");

                inputStream.close();
            }
            catch (FileNotFoundException e) {
                Log.e("FileToJson", "File not found: " + e);
            } catch (IOException e) {
                Log.e("FileToJson", "Can not read file: " + e);
            }

        return myString;
    }
    public String getInstance(String file_name) {
        String instanceData = "";
        File instanceFile = new File(formsPath + "/" + file_name);
        if(instanceFile.exists()){
            instanceData = readFromFile(instanceFile);
        } else { // create a new file
            return "file_not_found";
        }
        return instanceData;
    }
    public boolean deleteFile(String file_name) {

        File file_to_delete = new File(formsPath + "/" + file_name);
        if(file_to_delete.delete()) {
            Log.d("Deleted file", file_to_delete.toString());
            removeFromInstancelist(file_name);
            return true;
        }
        Log.d("Delete file failed", file_to_delete.toString());
        return false;
    }
    public void removeFromInstancelist(String item) {

        String itemToRemove = item.replace(".json", "");
        getInstanceList();
        instancelistJSON_data.remove(itemToRemove);
        saveInstancelist();

    }
    public void updateUploadedHPQ(String fileName) {

        JSONObject hpq_main;

        try {
            hpq_main = new JSONObject(getInstance(fileName + ".json"));
            hpq_main.put("hpq_stat", 3);
            saveHPQToFile(hpq_main.toString());

        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
    public Thread getInstancelistThread = new Thread(() -> {
        getInstanceList();
    });
    public Thread copyRasterThread = new Thread(() -> {
        copyRaster(rasterFile, publicDir);
    });
    public void copyRaster(File fromPath, File toPath) {

        InputStream inputStream = null;
        OutputStream outputStream = null;

        File rasterFileToCopy = new File(fromPath + "/raster.mbtiles");
        File oldRasterFile = new File(toPath + "/raster.mbtiles");

        try {
            //create output directory if it doesn't exist
            if (!toPath.exists()) {
                toPath.mkdirs();
            }
            if(rasterFileToCopy.exists()) {
                if(!oldRasterFile.exists()){

                    inputStream = new FileInputStream(fromPath + "/raster.mbtiles");
                    outputStream = new FileOutputStream(toPath + "/raster.mbtiles");

                    long lenghtOfFile = rasterFileToCopy.length();
                    byte[] buffer = new byte[1024];
                    int read;
                    long total = 0;
                    while ((read = inputStream.read(buffer)) != -1) {
                        total += read;
                        outputStream.write(buffer, 0, read);
                        Log.d("copyRaster", "Copying raster - " + (int)((total*100)/lenghtOfFile) + "%");
                    }
                    inputStream.close();
                    inputStream = null;

                    // write the output file (You have now copied the file)
                    outputStream.flush();
                    outputStream.close();
                    outputStream = null;
                }
            }
        }  catch (FileNotFoundException fnfe1) {
            Log.e("tag", fnfe1.getMessage());
        }
        catch (Exception e) {
            Log.e("tag", e.getMessage());
        }
    }

}
