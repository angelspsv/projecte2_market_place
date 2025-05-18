package com.roc.localconnect

import android.os.Bundle
import android.util.Log
import com.google.android.material.bottomnavigation.BottomNavigationView

class BuyerMainActivity : FragmentManagerBaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.buyer_landing_view)
        replaceFragment(BuyerHomeFragment(), R.id.fragmentContainer)

        Log.d("ACTIVITY", "BuyerMainActivity")
        Log.d("LOGGED_USER_ID", UserSession.userId.toString())

        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.buyer_bottom_navigation_view)
        Log.d("NAV_BAR", "BottomNavigationView initialized")

        bottomNavigationView.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.buyer_nav_menu_home -> {
                    Log.d("NAVIGATION", "Home selected")
                    replaceFragment(BuyerHomeFragment(), R.id.fragmentContainer)
                }
                R.id.buyer_nav_menu_profile -> {
                    Log.d("NAVIGATION", "Profile selected")
                    replaceFragment(BuyerProfileFragment(), R.id.fragmentContainer)
                }
                else -> {
                    Log.d("NAVIGATION", "Unknown menu item selected")
                }
            }
            true
        }

    }

}
