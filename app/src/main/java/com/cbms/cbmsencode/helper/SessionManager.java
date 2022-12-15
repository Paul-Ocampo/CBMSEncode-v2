package com.cbms.cbmsencode.helper;

import com.cbms.cbmsencode.activity.DashboardActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class SessionManager {

    public void setLoggedIn(String isLoggedIn,
                            Integer user_id,
                            String first_name,
                            String mid_name,
                            String last_name,
                            String username,
                            String cpnumber,
                            String birth_date,
                            String brgy,
                            String accessLevel) {
        DashboardActivity.prefs.edit().putString("isLoggedIn", isLoggedIn).commit();
        DashboardActivity.prefs.edit().putInt("user_id", user_id).commit();
        DashboardActivity.prefs.edit().putString("first_name", first_name).commit();
        DashboardActivity.prefs.edit().putString("mid_name", mid_name).commit();
        DashboardActivity.prefs.edit().putString("last_name", last_name).commit();
        DashboardActivity.prefs.edit().putString("user", username).commit();
        DashboardActivity.prefs.edit().putString("cpnumber", cpnumber).commit();
        DashboardActivity.prefs.edit().putString("birth_date", birth_date).commit();
        DashboardActivity.prefs.edit().putString("brgy", brgy).commit();
        DashboardActivity.prefs.edit().putString("accessLevel", accessLevel).commit();
    }

    public String isUserLoggedIn() {
        return DashboardActivity.prefs.getString("isLoggedIn","");
    }
    public String loggedInUser(){

        JSONObject userDetails = new JSONObject();

        try {
            userDetails.put("user_id", DashboardActivity.prefs.getInt( "user_id", 0));
            userDetails.put("first_name", DashboardActivity.prefs.getString( "first_name", ""));
            userDetails.put("mid_name", DashboardActivity.prefs.getString( "mid_name", ""));
            userDetails.put("last_name", DashboardActivity.prefs.getString( "last_name", ""));
            userDetails.put("username", DashboardActivity.prefs.getString( "user", ""));
            userDetails.put("cpnumber", DashboardActivity.prefs.getString( "cpnumber", ""));
            userDetails.put("birth_date", DashboardActivity.prefs.getString( "birth_date", ""));
            userDetails.put("brgy", DashboardActivity.prefs.getString( "brgy", ""));
            userDetails.put("accessLevel", DashboardActivity.prefs.getString( "accessLevel", ""));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return String.valueOf(userDetails);
    }

}