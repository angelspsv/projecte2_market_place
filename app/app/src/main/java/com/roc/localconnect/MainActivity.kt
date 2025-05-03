package com.roc.localconnect

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment


class MainActivity : AppCompatActivity() {

//    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val prefs = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        val email = prefs.getString("email", null)
        val userType = prefs.getInt("user_type", -1)

//        binding = ActivityMainBinding.inflate(layoutInflater)

        if (email == null || userType == -1) {
            startActivity(Intent(this, StartActivity::class.java))
            Log.d("ACTIVITY", "StartActivity")
        } else {
            val intent = when (userType) {
                0 -> Intent(this, BuyerMainActivity::class.java)
                1 -> Intent(this, SellerMainActivity::class.java)
                else -> Intent(this, StartActivity::class.java)
            }
            startActivity(intent)
            finish()
        }

//        binding.bottomNavigationView.setOnItemSelectedListener {
//            when (it.itemId) {
//                R.id.nav_menu_home -> replaceFragment(Home())
//                R.id.nav_menu_options -> replaceFragment(Options())
//                R.id.nav_menu_profile -> replaceFragment(Profile())
//
//                else -> {}
//            }
//
//            true
//        }

    }

//    private fun replaceFragment(fragment: Fragment) {
//        supportFragmentManager.beginTransaction().replace(R.id.fragmentContainer, fragment).commit()
//    }

}
