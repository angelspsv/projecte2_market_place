package com.roc.localconnect

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class StartActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.start_activity)

        findViewById<Button>(R.id.login_button).setOnClickListener()
        { startActivity(Intent(this, LogInActivity::class.java)) }

        findViewById<Button>(R.id.start_register).setOnClickListener()
        { startActivity(Intent(this, RegisterActivity::class.java)) }

    }
}
