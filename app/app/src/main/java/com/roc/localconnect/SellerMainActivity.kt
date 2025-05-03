package com.roc.localconnect

import android.os.Bundle
import android.util.Log
import com.google.android.material.bottomnavigation.BottomNavigationView

class SellerMainActivity : UserBaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.seller_landing_view)

        Log.d("ACTIVITY", "SellerActivity")

        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.seller_bottom_navigation_view)
        Log.d("DEBUG", "BottomNavigationView initialized")

        bottomNavigationView.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.seller_nav_menu_home -> {
                    Log.d("NAVIGATION", "Home selected")
                    replaceFragment(SellerHomeFragment(), R.id.fragmentContainer)
                }
                R.id.seller_nav_menu_options -> {
                    Log.d("NAVIGATION", "Options selected")
                    replaceFragment(SellerOptionsFragment(), R.id.fragmentContainer)
                }
                R.id.seller_nav_menu_profile -> {
                    Log.d("NAVIGATION", "Profile selected")
                    replaceFragment(SellerProfileFragment(), R.id.fragmentContainer)
                }
                else -> {
                    Log.d("NAVIGATION", "Unknown menu item selected")
                }
            }
            true
        }

    }

}
