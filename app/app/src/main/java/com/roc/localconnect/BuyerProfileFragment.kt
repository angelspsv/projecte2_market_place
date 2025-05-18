package com.roc.localconnect

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class BuyerProfileFragment : Fragment() {

    private val userId = UserSession.userId ?: -1

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.buyer_profile_fragment, container, false)
        val titleTextView = view.findViewById<TextView>(R.id.buyer_profile_title)

        getUser(userId) { user ->
            if (user != null) {
                titleTextView.text = ("Hola, " + user.nom + "!")
            } else {
                Toast.makeText(
                    requireContext(),
                    "Error al obtenir usuari",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

        val editButton: Button = view.findViewById(R.id.buyer_profile_edit_button)
        val logoffButton: Button = view.findViewById(R.id.buyer_profile_logoff_button)

        editButton.setOnClickListener {
            val intent = Intent(requireContext(), BuyerEditProfileActivity::class.java)
            startActivity(intent)
        }

        logoffButton.setOnClickListener {
            logOff()
        }

        return view
    }

    // Retorna un objecte User segons la id de l'usuari actual
    private fun getUser(userId: Int, callback: (User?) -> Unit) {
        RetrofitClient.apiService.getUser(userId).enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful) {
                    callback(response.body())
                } else {
                    Log.e("API", "Error al obtenir usuari: ${response.errorBody()?.string()}")
                    callback(null)
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                Log.e("API", "Error a la API: ${t.message}")
                callback(null)
            }
        })
    }

    // Tanca la sessió i redirigeix a la loginActivity
    private fun logOff() {
        val sharedPref = requireContext().getSharedPreferences("UserPrefs", AppCompatActivity.MODE_PRIVATE)
        with(sharedPref.edit()) {
            remove("user_id")
            remove("email")
            remove("user_type")
            apply()
        }

        UserSession.userId = null

        val intent = Intent(requireContext(), LogInActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)

        requireActivity().finish()
    }
}
