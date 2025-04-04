package com.roc.localconnect

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LogInActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.login)

        val emailEditText = findViewById<EditText>(R.id.login_user)
        val passwordEditText = findViewById<EditText>(R.id.login_password)
        val loginButton = findViewById<Button>(R.id.login_button)

        loginButton.setOnClickListener {
            val email = emailEditText.text.toString()
            val inputPassword = passwordEditText.text.toString()

            when {
                email.isBlank() -> {
                    showToast("Introdueix un email")
                }
                inputPassword.isBlank() -> {
                    showToast("Introdueix una contrasenya")
                }
                else -> {
                    RetrofitClient.apiService.getLogin(email).enqueue(object : Callback<Map<String, String?, Boolean?>> {

                        override fun onResponse(call: Call<Map<String, String?, Boolean?>>, response: Response<Map<String, String?, Boolean?>>) {
                            if (response.isSuccessful) {
                                val password = response.body()?.get("contrasenya")
                                val userType = response.body()?.get("user_type")
                                handleLoginResult(password, inputPassword, userType)
                            } else {
                                Log.e("API", "Error en la respuesta HTTP: Código ${response.code()}")
                            }
                        }

                        override fun onFailure(call: Call<Map<String, String?, Boolean?>>, t: Throwable) {
                            Log.e("API", "La call ha fallat pel següent motiu: ${t.message}", t)
                        }

                    })
                }
            }
        }
    }

    private fun handleLoginResult(password: String?, inputPassword: String, userType: Boolean) {
        when {
            password == null -> showToast("Credencials incorrectes")
            inputPassword == password -> {
                Log.d("LOGIN_RESULT", "SUCCESS!!!!!")
                if (userType)
                // Redirigir el user al seu landing
            }
            else -> showToast("Contrasenya incorrecta")
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this@LogInActivity, message, Toast.LENGTH_SHORT).show()
    }
}
