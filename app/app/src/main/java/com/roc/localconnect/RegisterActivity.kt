package com.roc.localconnect;

import android.os.Bundle
import android.widget.CheckBox
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.register_type)

        val checkBoxV = findViewById<CheckBox>(R.id.register_type_check_box_v)
        val checkBoxC = findViewById<CheckBox>(R.id.register_check_box_c)

        checkBoxV.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                checkBoxC.isChecked = false
            }
        }

        checkBoxC.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                checkBoxV.isChecked = false
            }
        }

        //Fa falta fer una nova ACTIVITY per a portar-me a register_data?¿¿?¿?¿?
        findViewById<ImageButton>(R.id.reg_type_button).setOnClickListener { setContentView(R.layout.register_data) }

    }
}
