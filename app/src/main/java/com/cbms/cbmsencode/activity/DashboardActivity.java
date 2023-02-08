package com.cbms.cbmsencode.activity;

import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;
import static android.os.Build.VERSION.SDK_INT;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.Settings;
import android.text.Html;
import android.text.Spanned;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.GeolocationPermissions;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.webkit.WebViewAssetLoader;

import com.cbms.cbmsencode.R;
import com.cbms.cbmsencode.helper.FileManager;
import com.cbms.cbmsencode.helper.MyJavaScriptInterface;

import java.io.File;

public class DashboardActivity extends AppCompatActivity {

    private static final int PERMISSION_REQUEST_CODE = 500;
    public static Context DashboardContext;
    public static WebView wv;
    public static SharedPreferences prefs;
    boolean doubleBackToExitPressedOnce = false;
    private String homeURL = "https://appassets.androidplatform.net/assets/www/index.html";
    private String currentURL = "";
    private boolean canExit;
    FileManager fileManager;

    // You can do the assignment inside onAttach or onCreate, i.e, before the activity is displayed
    ActivityResultLauncher<Intent> activityResultLauncher = registerForActivityResult(
            new ActivityResultContracts
                    .StartActivityForResult(),
            new ActivityResultCallback<ActivityResult>() {
                @Override
                public void onActivityResult(ActivityResult result) {
                    if (result.getResultCode() == 2296) {
                        if (SDK_INT >= Build.VERSION_CODES.R) {
                            if (Environment.isExternalStorageManager()) {
                                fileManager.getInstanceList();
                                Toast.makeText(DashboardActivity.this, "Access granted.", Toast.LENGTH_LONG).show();
                            } else {
                                Spanned alertMsg = Html.fromHtml("If you cannot save an encoded HPQ." +
                                        "<br>Go to <b>Settings</b> -> <b>Apps Permissions</b> -> and grant this App <b>Allow management of all files</b> permission." +
                                        "<br>This is because the folder <b>Internal Storage/Documents/CBMSEncode</b> was already created by a previous installation of this App.");
                                final AlertDialog alert = new AlertDialog.Builder(DashboardActivity.this)
                                        .setIcon(R.drawable.icon)
                                        .setTitle("Permission denied")
                                        .setMessage(alertMsg)
                                        .setPositiveButton("Okay", (dialogInterface, i) -> dialogInterface.dismiss())
                                        .show();
                            }
                        }
                    }

                }
            }
    );

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        DashboardContext = this.getApplicationContext();
        fileManager = new FileManager(this);
        final File publicDir = new File(DashboardContext.getCacheDir(), "raster");
        final File rasterFile = new File(String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)));

        Thread getPrefs = new Thread(() -> prefs = getSharedPreferences(getPackageName() + "_preferences", MODE_PRIVATE));
        getPrefs.start();

        // Host "files/public/" in app's data directory under:
        // http://appassets.androidplatform.net/public/...
        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .addPathHandler("/raster/", new WebViewAssetLoader.InternalStoragePathHandler(DashboardContext, publicDir))
                .build();

        wv = findViewById(R.id.webView1);

        WebSettings webSettings = wv.getSettings();
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadsImagesAutomatically(true);
        webSettings.setLoadWithOverviewMode(true);
        // Below required for geolocation
        webSettings.setJavaScriptEnabled(true);

        webSettings.setDatabaseEnabled(true);
        String databasePath = wv.getContext().getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath();
        webSettings.setGeolocationEnabled(true);
        webSettings.setGeolocationDatabasePath(databasePath);

        webSettings.setAppCacheEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        String cachePath = wv.getContext().getApplicationContext().getDir("cache", Context.MODE_PRIVATE).getPath();
        webSettings.setAppCachePath(cachePath);

        webSettings.setDomStorageEnabled(true);

        wv.setWebChromeClient(new MyChromeWebViewClient());

        wv.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                wv.loadUrl("https://appassets.androidplatform.net/assets/www/404.html");
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                currentURL = view.getUrl();
            }
        });
        wv.addJavascriptInterface(new MyJavaScriptInterface(this), "Android");

        wv.loadUrl("https://appassets.androidplatform.net/assets/www/start.html");

        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) !=
                        PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, 2);
        }

        if (!checkPermission()) {
            requestPermission();
        } else {
            fileManager.getInstancelistThread.start();
            fileManager.copyRasterThread.start();
        }

    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event)  {
        if (Integer.parseInt(android.os.Build.VERSION.SDK) > 5
                && keyCode == KeyEvent.KEYCODE_BACK
                && event.getRepeatCount() == 0) {
            Log.d("CDA", "onKeyDown Called");
            onBackPressed();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }


    @Override
    public void onBackPressed() {
        // if not home page go to home page.
        if(homeURL == currentURL){

            if(canExit)
                super.onBackPressed();
            else{
                canExit = true;
                Toast.makeText(getApplicationContext(), "Press again", Toast.LENGTH_SHORT).show();
            }
            mHandler.sendEmptyMessageDelayed(1, 2000);
        }
    }

    @SuppressLint("HandlerLeak")
    public Handler mHandler = new Handler(){

        public void handleMessage(android.os.Message msg) {

            switch (msg.what) {
                case 1:
                    canExit = false;
                    break;
                default:
                    break;
            }
        }
    };
    private boolean checkPermission() {
        if (SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        } else {
            int result = ContextCompat.checkSelfPermission(DashboardActivity.this, READ_EXTERNAL_STORAGE);
            int result1 = ContextCompat.checkSelfPermission(DashboardActivity.this, WRITE_EXTERNAL_STORAGE);
            return result == PackageManager.PERMISSION_GRANTED && result1 == PackageManager.PERMISSION_GRANTED;
        }

    }

    private void requestPermission() {
        Spanned alertMsg = Html.fromHtml("Please grant <b>Allow management of all files</b> " +
                "permission if there are files created by previous installation of this App.");
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setIcon(R.drawable.icon);
        builder.setTitle("Grant storage access");
        builder.setMessage(alertMsg);
        builder.setPositiveButton("Okay", (dialogInterface, i) -> {

            if (SDK_INT >= Build.VERSION_CODES.R) {

                try {
                    Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
                    intent.addCategory("android.intent.category.DEFAULT");
                    intent.setData(Uri.parse(String.format("package:%s", getApplicationContext().getPackageName())));
                    activityResultLauncher.launch(intent);
                } catch (Exception e) {
                    Intent intent = new Intent();
                    intent.setAction(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
                    activityResultLauncher.launch(intent);
                }
            } else {
                //below android 11
                ActivityCompat.requestPermissions(DashboardActivity.this, new String[]{WRITE_EXTERNAL_STORAGE}, PERMISSION_REQUEST_CODE);
            }

            dialogInterface.dismiss();
        });
        builder.setNegativeButton("Cancel", (dialogInterface, i) -> {

            dialogInterface.dismiss();
            if (ContextCompat.checkSelfPermission(DashboardActivity.this, READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(DashboardActivity.this, new String[]{READ_EXTERNAL_STORAGE}, 100);
            }

        });
        final AlertDialog alert = builder.show();

    }

    private static class MyChromeWebViewClient extends WebChromeClient implements com.cbms.cbmsencode.activity.MyChromeWebViewClient {

        public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
            callback.invoke(origin, true, false);
        }

        @Override
        public void onPermissionRequest(PermissionRequest request) {
            super.onPermissionRequest(request);
        }
    }

}