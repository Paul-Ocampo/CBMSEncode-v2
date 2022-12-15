package com.cbms.cbmsencode.app;

public class AppConfig {

    static final String ipAdd = "192.168.0.101";

    /**
     * URLs for using localhost server
     */
    public static final String URL_SYNC = "http://" + ipAdd + "/cbms.com/main/sync_db.php";     // Server user syncDB url
    public static final String URL_UPLOAD = "http://" + ipAdd + "/cbms.com/upload.php";    // Server HPQ upload url

    /** URLs for using cloud server
     public static String URL_SYNC = "https://cbms-tc.000webhostapp.com/app/encoding/main/sync_db.php";     // Server user login url
     public static String URL_UPLOAD = "http://cbms-tc.000webhostapp.com/app/encoding/upload.php";      // Server HPQ upload url
     */
}

