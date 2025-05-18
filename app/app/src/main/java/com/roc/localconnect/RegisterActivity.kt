package com.roc.localconnect;

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.FrameLayout
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    private var currentStep = 0
    private var user = User(
        dni = "",
        nom = "",
        cognom = "",
        email = "",
        contrasenya = "",
        telefon = 0,
        comarca = "",
        tipusUsuari = false,
        iban = ""
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.register_activity)

        loadStep(currentStep)
    }

    private fun loadStep(step: Int) {
        val container = findViewById<FrameLayout>(R.id.container)
        container.removeAllViews()

        when (step) {
            0 -> loadStep1(container)
            1 -> loadStep2(container)
            else -> finishRegistration()
        }
    }

    private fun loadStep1(container: FrameLayout) {
        val view = layoutInflater.inflate(R.layout.register_type, container, false)

        val checkBoxV = view.findViewById<CheckBox>(R.id.register_type_check_box_v)
        val checkBoxC = view.findViewById<CheckBox>(R.id.register_check_box_c)
        val nextButton = view.findViewById<ImageButton>(R.id.register_type_next_button)
        var isSeller = false

        checkBoxV.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                checkBoxC.isChecked = false
                isSeller = true
            }
        }

        checkBoxC.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                checkBoxV.isChecked = false
                isSeller = false
            }
        }

        nextButton.setOnClickListener {
            user.tipusUsuari = isSeller
            currentStep++
            loadStep(currentStep)
        }

        container.addView(view)
    }

    private fun loadStep2(container: FrameLayout) {
        val view = layoutInflater.inflate(R.layout.register_data, container, false)

        val dniEditText = view.findViewById<EditText>(R.id.register_data_dni)
        val nomEditText = view.findViewById<EditText>(R.id.register_data_name)
        val cognomEditText = view.findViewById<EditText>(R.id.register_data_surname)
        val emailEditText = view.findViewById<EditText>(R.id.register_data_email)
        val contrasenyaEditText = view.findViewById<EditText>(R.id.register_data_password)
        val telefonEditText = view.findViewById<EditText>(R.id.register_data_phone)
        val comarcaEditText = view.findViewById<EditText>(R.id.register_data_comarca)
        val ibanEditText = view.findViewById<EditText>(R.id.register_data_iban)

        val submitButton = view.findViewById<Button>(R.id.register_data_submit_button)

        submitButton.setOnClickListener {
            val dni = dniEditText.text.toString()
            val nom = nomEditText.text.toString()
            val cognom = cognomEditText.text.toString()
            val email = emailEditText.text.toString()
            val contrasenya = contrasenyaEditText.text.toString()
            val telefon = telefonEditText.text.toString()
            val comarca = comarcaEditText.text.toString()
            val iban = ibanEditText.text.toString()

            when {

                dni.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'DNI' no pot estar buit",
                    Toast.LENGTH_SHORT
                ).show()

                !Regex("^\\d{8}[a-zA-Z]$").matches(dni) -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'DNI' ha de tenir 8 digits seguits d'una lletra",
                    Toast.LENGTH_SHORT
                ).show()


                nom.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Nom' no pot estar buit",
                    Toast.LENGTH_SHORT
                ).show()


                cognom.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Cognom' no pot estar buit",
                    Toast.LENGTH_SHORT
                ).show()


                email.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Email' no pot estar buit",
                    Toast.LENGTH_SHORT
                ).show()

                !Regex("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$").matches(email)-> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Email' ha de tenir un format vàlid",
                    Toast.LENGTH_SHORT
                ).show()


                contrasenya.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Contrasenya' no pot estar buit",
                    Toast.LENGTH_SHORT
                ).show()

                !Regex("^(?=.*[A-Z])(?=.*[!@#\$%^&*(),.?\":{}|<>]).{6,}$").matches(contrasenya) -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Contrasenya' ha de tenir almenys 6 caràcters, una majúscula i un caràcter especial",
                    Toast.LENGTH_SHORT
                ).show()


                telefon.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Telèfon' no pot estar buit",
                    Toast.LENGTH_SHORT
                ).show()

//                telefon.toIntOrNull() == null -> Toast.makeText(
//                    this,
//                    "El camp 'Telèfon' ha de ser un número",
//                    Toast.LENGTH_SHORT
//                ).show()

                !Regex("^\\d{9}$").matches(telefon) -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Telèfon' ha de tenir 9 dígits",
                    Toast.LENGTH_SHORT
                ).show()


                comarca.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'Comarca' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()

                iban.isEmpty() -> Toast.makeText(
                    this@RegisterActivity,
                    "El camp 'IBAN' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()

                else -> {
                    user = user.copy(
                        dni = dni,
                        nom = nom,
                        cognom = cognom,
                        email = email,
                        contrasenya = contrasenya,
                        telefon = telefon.toInt(),
                        comarca = comarca,
                        iban = iban
                    )
                    finishRegistration()
                }
            }

        }
        container.addView(view)
    }

    private fun finishRegistration() {
        RetrofitClient.apiService.postUser(user).enqueue(object : Callback<Map<String, Any>> {
            override fun onResponse(
                call: Call<Map<String, Any>>,
                response: Response<Map<String, Any>>
            ) {
                if (response.isSuccessful) {

                    Toast.makeText(
                        this@RegisterActivity,
                        "Registre completat amb èxit",
                        Toast.LENGTH_SHORT
                    ).show()

                    val intent = Intent(this@RegisterActivity, LogInActivity::class.java)
                    startActivity(intent)
                    finish()

                } else {

                    Log.e(
                        "API",
                        "Error en completar el registre: ${response.errorBody()?.string()}"
                    )

                    Toast.makeText(
                        this@RegisterActivity,
                        "Error en completar el registre",
                        Toast.LENGTH_SHORT
                    ).show()

                }
            }

            override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                Log.e("API", "Error de connexió: ${t.message}")
                Toast.makeText(
                    this@RegisterActivity,
                    "No s'ha pogut completar el registre",
                    Toast.LENGTH_SHORT
                ).show()
            }
        })
    }

}
