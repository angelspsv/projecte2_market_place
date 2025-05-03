package com.roc.localconnect

import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment

open class UserBaseActivity : AppCompatActivity() {

    protected fun replaceFragment(fragment: Fragment, containerId: Int) {
        supportFragmentManager.beginTransaction().replace(containerId, fragment).commit()
    }

}
