package com.cbms.cbmsencode.helper;
/**
 * Author: Ravi Tamada
 * URL: www.androidhive.info
 * twitter: http://twitter.com/ravitamada
 * */

import static com.cbms.cbmsencode.activity.DashboardActivity.DashboardContext;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.math.BigInteger;
import java.security.MessageDigest;

public class SQLiteHandler extends SQLiteOpenHelper {

    private static final String TAG = SQLiteHandler.class.getSimpleName();

    // All Static variables
    // Database Version
    private static final int DATABASE_VERSION = 2;

    // Database Name
    private static final String DATABASE_NAME = "android_api";

    // Login table name
    private static final String TABLE_USER = "user";

    // Login Table Columns names
    private static final String KEY_ID = "id";
    private static final String KEY_FNAME = "first_name";
    private static final String KEY_MNAME = "mid_name";
    private static final String KEY_LNAME = "last_name";
    private static final String KEY_USERNAME = "username";
    private static final String KEY_PASSWORD = "pword";
    private static final String KEY_CPNUMBER = "cpnumber";
    private static final String KEY_BIRTH_DATE = "birth_date";
    private static final String KEY_BRGY = "brgy";
    private static final String KEY_ACCESS_LEVEL = "access_level";
    private static final String KEY_STAT = "stat";

    SessionManager sessionManager;
    FileManager fileManager;

    public SQLiteHandler(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    // Creating Tables
    @Override
    public void onCreate(SQLiteDatabase db) {
        String CREATE_LOGIN_TABLE = "CREATE TABLE " + TABLE_USER + "("
                + KEY_ID + " INTEGER,"
                + KEY_FNAME + " TEXT,"
                + KEY_MNAME + " TEXT,"
                + KEY_LNAME + " TEXT,"
                + KEY_USERNAME + " TEXT UNIQUE,"
                + KEY_PASSWORD + " TEXT,"
                + KEY_CPNUMBER + " TEXT,"
                + KEY_BIRTH_DATE + " DATE,"
                + KEY_BRGY + " TEXT,"
                + KEY_ACCESS_LEVEL + " TEXT,"
                + KEY_STAT + " INTEGER" + ")";
        db.execSQL(CREATE_LOGIN_TABLE);

        Log.d(TAG, "Database tables created");
    }

    // Upgrading database
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Drop older table if existed
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_USER);

        // Create tables again
        onCreate(db);
    }

    /**
     * Storing user details in database
     * */
    public void addUsers(Integer id,
                         String first_name,
                         String mid_name,
                         String last_name,
                         String username,
                         String pword,
                         String cpnumber,
                         String birth_date,
                         String brgy,
                         String access_level,
                         String stat) {
        SQLiteDatabase db = this.getWritableDatabase();

        ContentValues values = new ContentValues();
        values.put(KEY_ID, id);
        values.put(KEY_FNAME, first_name);
        values.put(KEY_MNAME, mid_name);
        values.put(KEY_LNAME, last_name);
        values.put(KEY_USERNAME, username);
        values.put(KEY_PASSWORD, pword);
        values.put(KEY_CPNUMBER, cpnumber);
        values.put(KEY_BIRTH_DATE, birth_date);
        values.put(KEY_BRGY, brgy);
        values.put(KEY_ACCESS_LEVEL, access_level);
        values.put(KEY_STAT, stat);

        // Inserting Row
        db.insert(TABLE_USER, null, values);
        db.close(); // Closing database connection

        Log.d(TAG, "New user inserted into sqlite: " + id);
    }

     /**
     * Re crate database Delete all tables and create them again
     * */
    public void deleteUsers() {
        SQLiteDatabase db = this.getWritableDatabase();
        // Delete All Rows
        db.delete(TABLE_USER, null, null);
        db.close();

        Log.d(TAG, "Deleted all user info from sqlite");
    }

    public String checkUser(String username, String password) {

        Integer user_id;
        String first_name;
        String mid_name;
        String last_name;
        String cpnumber;
        String birth_date;
        String brgy;
        String accessLvl;
        Integer stat;
        String pass = md5hashing(password);

        // array of columns to fetch
        String[] columns = {KEY_ID, KEY_FNAME, KEY_MNAME, KEY_LNAME, KEY_USERNAME, KEY_PASSWORD, KEY_CPNUMBER, KEY_BIRTH_DATE, KEY_BRGY, KEY_ACCESS_LEVEL, KEY_STAT};
        SQLiteDatabase db = this.getReadableDatabase();
        // selection criteria
        String selection = KEY_USERNAME + " = ?" + " AND " + KEY_PASSWORD + " = ?";
        // selection arguments
        String[] selectionArgs = {username, pass};
        // query user table with conditions

        Cursor cursor = db.query(TABLE_USER, //Table to query
                columns,                    //columns to return
                selection,                  //columns for the WHERE clause
                selectionArgs,              //The values for the WHERE clause
                null,                //group the rows
                null,                 //filter by row groups
                null);                //The sort order
        int cursorCount = cursor.getCount();
        if (cursorCount > 0 && cursor.moveToFirst()) {

            user_id = cursor.getInt(0);
            first_name = cursor.getString(1);
            mid_name = cursor.getString(2);
            last_name = cursor.getString(3);
            cpnumber = cursor.getString(6);
            birth_date = cursor.getString(7);
            brgy = cursor.getString(8);
            accessLvl = String.valueOf(cursor.getInt(9));
            stat = cursor.getInt(10);
            cursor.close();
            db.close();

            if (stat == 0){
                fileManager = new FileManager(DashboardContext);
                fileManager.copyRasterThread.start();
                sessionManager = new SessionManager();
                sessionManager.setLoggedIn("true",
                        user_id,
                        first_name,
                        mid_name,
                        last_name,
                        username,
                        cpnumber,
                        birth_date,
                        brgy,
                        accessLvl);
            }

            return stat.toString();
        }
        cursor.close();
        db.close();
        return "2";
    }
    public static String md5hashing(String text) {

        StringBuilder hashtext = null;
        try
        {
            String plaintext = text;
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.reset();
            m.update(plaintext.getBytes());
            byte[] digest = m.digest();
            BigInteger bigInt = new BigInteger(1,digest);
            hashtext = new StringBuilder(bigInt.toString(16));
            // Now we need to zero pad it if you actually want the full 32 chars.
            while(hashtext.length() < 32 ){
                hashtext.insert(0, "0");
            }
        } catch (Exception e1)
        {
            // TODO: handle exception
            Log.d("Hash5",e1.getClass().getName() + ": " + e1.getMessage());
        }
        return hashtext.toString();
    }
     public String getAllUser() {
        // array of columns to fetch
         String[] columns = {KEY_ID, KEY_FNAME, KEY_MNAME, KEY_LNAME, KEY_USERNAME, KEY_PASSWORD, KEY_CPNUMBER, KEY_BIRTH_DATE, KEY_BRGY, KEY_ACCESS_LEVEL, KEY_STAT};
        // sorting orders
        String sortOrder = KEY_ID + " ASC";
        SQLiteDatabase db = this.getReadableDatabase();
        // query the user table
        /**
         * Here query function is used to fetch records from user table this function works like we use sql query.
         * SQL query equivalent to this query function is
         * SELECT user_id,user_name,user_email,user_password FROM user ORDER BY user_name;
         */
        Cursor cursor = db.query(TABLE_USER, //Table to query
                columns,                    //columns to return
                null,              //columns for the WHERE clause
                null,          //The values for the WHERE clause
                null,            //group the rows
                null,            //filter by row groups
                sortOrder);           //The sort order
        // Traversing through all rows and adding to list
         JSONArray resultSet = new JSONArray();
         JSONObject returnObj = new JSONObject();

         cursor.moveToFirst();
         while (cursor.isAfterLast() == false) {

             int totalColumn = cursor.getColumnCount();
             JSONObject rowObject = new JSONObject();

             for (int i = 0; i < totalColumn; i++) {
                 if (cursor.getColumnName(i) != null) {

                     try {

                         if (cursor.getString(i) != null) {
                             Log.d("TAG_NAME", cursor.getString(i));
                             rowObject.put(cursor.getColumnName(i), cursor.getString(i));
                         } else {
                             rowObject.put(cursor.getColumnName(i), "");
                         }
                     } catch (Exception e) {
                         Log.d("TAG_NAME", e.getMessage());
                     }
                 }

             }

             resultSet.put(rowObject);
             cursor.moveToNext();
         }

         cursor.close();
         db.close();
         Log.d("TAG_NAME", resultSet.toString());

         return resultSet.toString();

    }
}