package com.roc.localconnect

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.roc.localconnect.databinding.ActivityMainBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var userAuth = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)

        // Consumir el endpoint GET /items/{id}
//        RetrofitClient.apiService.getUsuariById(1).enqueue(object : Callback<Usuari> {
//
//            override fun onResponse(call: Call<Usuari>, response: Response<Usuari>) {
//                if (response.isSuccessful) {
//                    val usuari = response.body()
//                    if (usuari != null) {
//                        Log.println(Log.DEBUG, "USERNAME", "USER NAME: " + usuari.nom)
//                    } else {
//                        Log.e("API", "Error en la respuesta: ${response.errorBody()?.string()}")
//                    }
//                } else {
//                    Log.e("API", "Error en la respuesta HTTP: Código ${response.code()}")
//                }
//            }
//
//            override fun onFailure(call: Call<Usuari>, t: Throwable) {
//                Log.e("API", "Fallo en la llamada: ${t.message}", t)
//            }
//        })

        if (userAuth == false) {
            startActivity(Intent(this, StartActivity::class.java))
        } else {
//            setContentView(binding.root)
//            replaceFragment(Home())
        }

        binding.bottomNavigationView.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.nav_menu_home -> replaceFragment(Home())
                R.id.nav_menu_options -> replaceFragment(Options())
                R.id.nav_menu_profile -> replaceFragment(Profile())

                else -> {}
            }

            true
        }

    }

    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction().replace(R.id.fragmentContainer, fragment).commit()
    }

}