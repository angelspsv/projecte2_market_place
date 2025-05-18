package com.roc.localconnect

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val prefs = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        val email = prefs.getString("email", null)
        val userType = prefs.getInt("user_type", -1)
        val userId = prefs.getInt("user_id", -1)

        if (email == null || userType == -1 || userId == -1) {
            startActivity(Intent(this, StartActivity::class.java))
        } else {
            UserSession.userId = userId
            val intent = when (userType) {
                0 -> Intent(this, BuyerMainActivity::class.java)
                1 -> Intent(this, SellerMainActivity::class.java)
                else -> Intent(this, StartActivity::class.java)
            }
            startActivity(intent)
            finish()
        }

    }

}
