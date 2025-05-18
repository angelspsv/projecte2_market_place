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

class BuyerEditProfileActivity : AppCompatActivity() {

    private val userId = UserSession.userId ?: -1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.buyer_edit_profile_activity)

        val fieldMap = mutableMapOf<String, EditText>()

        fieldMap["dni"] = findViewById(R.id.buyer_edit_profile_dni)
        fieldMap["name"] = findViewById(R.id.buyer_edit_profile_name)
        fieldMap["surname"] = findViewById(R.id.buyer_edit_profile_surname)
        fieldMap["email"] = findViewById(R.id.buyer_edit_profile_email)
        fieldMap["password"] = findViewById(R.id.buyer_edit_profile_password)
        fieldMap["phone"] = findViewById(R.id.buyer_edit_profile_phone)
        fieldMap["comarca"] = findViewById(R.id.buyer_edit_profile_comarca)
        fieldMap["iban"] = findViewById(R.id.buyer_edit_profile_iban)

        val saveButton: Button = findViewById(R.id.buyer_edit_profile_save_button)

        // Obtenim les dades ja existents de l'usuari
        getUser(userId) { user ->
            if (user != null) {
                loadUserData(
                    user, fieldMap
                )
            } else {
                Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "Error al obtenir usuari",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

        // Al fer clic en el botó de guardar processem i validem les dades intrduïdes i
        // persistim l'usuari modificad a la base de dades
        saveButton.setOnClickListener {

            // Obtenim els valors introduïts per l'usuari
            val dni = fieldMap["dni"]?.text.toString().trim()
            val name = fieldMap["name"]?.text.toString().trim()
            val surname = fieldMap["surname"]?.text.toString().trim()
            val email = fieldMap["email"]?.text.toString().trim()
            val password = fieldMap["password"]?.text.toString().trim()
            val phone = fieldMap["phone"]?.text.toString().trim()
            val comarca = fieldMap["comarca"]?.text.toString().trim()
            val iban = fieldMap["iban"]?.text.toString().trim()

            // Identifiquem si hi ha algun valor erroni i mostrem el missatge corresponent
            when {

                dni.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'DNI' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                name.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'Nom' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                surname.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'Cognom' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                email.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'Email' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                password.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'Contrasenya' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                phone.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'Telèfon' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                comarca.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'Comarca' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                iban.isEmpty() -> Toast.makeText(
                    this@BuyerEditProfileActivity,
                    "El camp 'IBAN' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()

                else -> {

                    // Assignem els valors validats a un nou objecte
                    val updatedUser = User(
                        dni = dni,
                        nom = name,
                        cognom = surname,
                        email = email,
                        contrasenya = password,
                        telefon = phone.toInt(),
                        comarca = comarca,
                        tipusUsuari = true,
                        iban = iban
                    )

                    // Persistim els canvis a la base de dades
                    updateUser(UserSession.userId!!, updatedUser)
                }
            }
        }

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
                Log.e("API", "Error a la API geteando el getteo: ${t.message}")
                callback(null)
            }
        })
    }


    // Carrega les dades d'un objecte User als diferents camps de la vista
    private fun loadUserData(
        user: User,
        fieldMap: Map<String, EditText>
    ) {
        fieldMap["dni"]?.setText(user.dni)
        fieldMap["name"]?.setText(user.nom)
        fieldMap["surname"]?.setText(user.cognom)
        fieldMap["email"]?.setText(user.email)
        fieldMap["password"]?.setText(user.contrasenya)
        fieldMap["phone"]?.setText(user.telefon.toString())
        fieldMap["comarca"]?.setText(user.comarca)
        fieldMap["iban"]?.setText(user.iban)
    }


    // Consumeix l'enpoint de modificació d'usuari de l'API i gestiona possibles errors
    private fun updateUser(userId: Int, updatedUser: User) {
        RetrofitClient.apiService.putUser(userId, updatedUser)
            .enqueue(object : Callback<Map<String, Any>> {
                override fun onResponse(
                    call: Call<Map<String, Any>>,
                    response: Response<Map<String, Any>>
                ) {
                    if (response.isSuccessful) {
                        Toast.makeText(
                            this@BuyerEditProfileActivity,
                            "Perfil actualitzat correctament",
                            Toast.LENGTH_SHORT
                        ).show()
                        finish()
                    } else {
                        Log.e(
                            "API",
                            "Error al actualitzar el perfil: ${response.errorBody()?.string()}"
                        )
                        Toast.makeText(
                            this@BuyerEditProfileActivity,
                            "Error al actualitzar el perfil",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }

                override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                    Log.e("API", "Error de connexió: ${t.message}")
                    Toast.makeText(
                        this@BuyerEditProfileActivity,
                        "Error de connexió al actualitzar el perfil",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            })
    }

}
