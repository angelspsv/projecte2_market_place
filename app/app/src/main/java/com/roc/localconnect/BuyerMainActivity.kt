package com.roc.localconnect

import android.os.Bundle
import android.util.Log
import com.google.android.material.bottomnavigation.BottomNavigationView

class BuyerMainActivity : UserBaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.buyer_landing_view)

        Log.d("ACTIVITY", "BuyerActivity")

        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.buyer_bottom_navigation_view)

        bottomNavigationView.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.buyer_nav_menu_home -> replaceFragment(BuyerHomeFragment(), R.id.fragmentContainer)
                R.id.buyer_nav_menu_options -> replaceFragment(BuyerOptionsFragment(), R.id.fragmentContainer)
                R.id.buyer_nav_menu_profile -> replaceFragment(BuyerProfileFragment(), R.id.fragmentContainer)
                else -> {}
            }
            true
        }

    }

}
