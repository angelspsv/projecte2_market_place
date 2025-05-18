package com.roc.localconnect

import android.content.Intent
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
        setContentView(R.layout.login_activity)

        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        val savedUserId = sharedPref.getInt("user_id", -1)
        if (savedUserId != -1) {
            UserSession.userId = savedUserId
        }

        val emailEditText = findViewById<EditText>(R.id.login_user)
        val passwordEditText = findViewById<EditText>(R.id.login_password)
        val loginButton = findViewById<Button>(R.id.start_activity_login_button)

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
                    RetrofitClient.apiService.getLogin(email).enqueue(object : Callback<LoginResponse> {

                        override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {

                            if (response.isSuccessful) {

                                val loginResponse = response.body()
//                                Log.d("RESPONSE_BODY", response.body().toString())

                                val password = loginResponse?.password
//                                Log.d("PASSWORD", password?.toString() ?: "NULL")

                                val userType = loginResponse?.userType
//                                Log.d("USERTYPE", userType?.toString() ?: "NULL")

                                val userId = loginResponse?.id

                                handleLoginResult(password, inputPassword, userType, email, userId)

                            } else {

                                Log.e("API", "Error en la respuesta HTTP: Código ${response.code()}")

                            }

                        }

                        override fun onFailure(call: Call<LoginResponse>, t: Throwable) {

                            Log.e("API", "La call ha fallat pel següent motiu: ${t.message}", t)

                        }

                    })
                }
            }
        }
    }

    private fun handleLoginResult(password: String?, inputPassword: String, userType: Int?, userEmail: String?, userId: Int?) {

        when {
            password == null -> showToast("Credencials incorrectes")
            inputPassword == password -> {

                Log.d("LOGIN_RESULT", "SUCCESS")

                UserSession.userId = userId

                val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
                with(sharedPref.edit()) {
                    putInt("user_id", userId!!)
                    putString("email", userEmail)
                    putInt("user_type", userType!!) // "buyer" o "seller"
                    apply()
                }

                // Redirigir el user al seu landing
                val intent = when (userType) {
                    1 -> Intent(this, SellerMainActivity::class.java) // Venedor
                    0 -> Intent(this, BuyerMainActivity::class.java) // Comprador
                    else -> Intent(this, LogInActivity::class.java)  // Fallback
                }
                startActivity(intent)
                finish()

            }
            else -> showToast("Contrasenya incorrecta")
        }

    }

    private fun showToast(message: String) {
        Toast.makeText(this@LogInActivity, message, Toast.LENGTH_SHORT).show()
    }
}
