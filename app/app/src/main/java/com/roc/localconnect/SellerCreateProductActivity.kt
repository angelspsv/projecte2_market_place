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

class SellerCreateProductActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.seller_create_product_activity)

        val nameEditText: EditText = findViewById(R.id.seller_create_product_name)
        val descEditText: EditText = findViewById(R.id.seller_create_product_desc)
        val stockEditText: EditText = findViewById(R.id.seller_create_product_stock)
        val priceEditText: EditText = findViewById(R.id.seller_create_product_price)
        val urlEditText: EditText = findViewById(R.id.seller_create_product_url)
        val saveButton: Button = findViewById(R.id.seller_create_product_save_button)

        // Al fer clic en el botó de guardar processem i validem les dades intrduïdes i
        // persistim el nou producte a la base de dades
        saveButton.setOnClickListener {

            // Obtenim els valors dels camps
            val name = nameEditText.text.toString().trim()
            val description = descEditText.text.toString().trim()
            val stock = stockEditText.text.toString().trim()
            val price = priceEditText.text.toString().trim()
            val imageUrl = urlEditText.text.toString().trim()

            // Identifiquem si hi ha algun valor erroni i mostrem el missatge corresponent
            when {

                name.isEmpty() -> Toast.makeText(
                    this,
                    "El camp 'Nom' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                description.isEmpty() -> Toast.makeText(
                    this,
                    "El camp 'Descripció' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()


                price.isEmpty() -> Toast.makeText(
                    this,
                    "El camp 'Preu' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()

                price.toDoubleOrNull() == null -> Toast.makeText(
                    this,
                    "El camp 'Preu' ha de ser un número.",
                    Toast.LENGTH_SHORT
                ).show()

                price.toDouble() < 0 -> Toast.makeText(
                    this,
                    "El camp 'Preu' ha de ser 0 o major que 0.",
                    Toast.LENGTH_SHORT
                ).show()


                stock.isEmpty() -> Toast.makeText(
                    this,
                    "El camp 'Stock' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()

                stock.toIntOrNull() == null -> Toast.makeText(
                    this,
                    "El camp 'Stock' ha de ser un número.",
                    Toast.LENGTH_SHORT
                ).show()

                stock.toInt() < 0 -> Toast.makeText(
                    this,
                    "El camp 'Stock' ha de ser 0 o major que 0.",
                    Toast.LENGTH_SHORT
                ).show()


                imageUrl.isEmpty() -> Toast.makeText(
                    this,
                    "El camp 'URL de la imatge' no pot estar buit.",
                    Toast.LENGTH_SHORT
                ).show()

                else -> {

                    // Si no hi ha cap error assignem els valors validats a un nou objecte
                    val product = NewProduct(
                        id_venedor = UserSession.userId!!,
                        nom = nameEditText.text.toString(),
                        descripcio = descEditText.text.toString(),
                        stock = stockEditText.text.toString().toInt(),
                        preu = priceEditText.text.toString().toDouble(),
                        url_imatge = urlEditText.text.toString()
                    )

                    // Persistim l'objecte a la base de dades
                    createProduct(product)
                }
            }

        }

    }

    // Consumeix l'enpoint de creació de producte de l'API i gestiona possibles errors
    private fun createProduct(product: NewProduct) {
        RetrofitClient.apiService.postProduct(product)
            .enqueue(object : Callback<Map<String, Any>> {
                override fun onResponse(
                    call: Call<Map<String, Any>>,
                    response: Response<Map<String, Any>>
                ) {
                    if (response.isSuccessful) {
                        Toast.makeText(
                            this@SellerCreateProductActivity,
                            "Producte afegit correctament",
                            Toast.LENGTH_SHORT
                        ).show()
                        finish()
                    } else {
                        Log.e(
                            "API",
                            "Error al afegir producte: ${response.errorBody()?.string()}"
                        )
                        Toast.makeText(
                            this@SellerCreateProductActivity,
                            "Error al afegir producte",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }

                override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                    Log.e("API", "Error de connexió: ${t.message}")
                    Toast.makeText(
                        this@SellerCreateProductActivity,
                        "Error de connexió al afegir producte",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            })
    }

}
