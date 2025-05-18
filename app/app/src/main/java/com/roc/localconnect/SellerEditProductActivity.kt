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

class SellerEditProductActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.seller_edit_product_activity)

        val productId = intent.getIntExtra(EXTRA_PRODUCT_ID, -1)

        val nameEditText: EditText = findViewById(R.id.seller_edit_product_name)
        val descEditText: EditText = findViewById(R.id.seller_edit_product_desc)
        val stockEditText: EditText = findViewById(R.id.seller_edit_product_stock)
        val priceEditText: EditText = findViewById(R.id.seller_edit_product_price)
        val urlEditText: EditText = findViewById(R.id.seller_edit_product_url)
        val saveButton: Button = findViewById(R.id.seller_edit_product_save_button)
        val deleteButton: Button = findViewById(R.id.seller_edit_product_delete_button)

        // Obtenim les dades ja existents del producte
        getProduct(productId) { product ->
            if (product != null) {
                loadProductData(
                    product,
                    nameEditText,
                    descEditText,
                    stockEditText,
                    priceEditText,
                    urlEditText
                )
            } else {
                Toast.makeText(
                    this@SellerEditProductActivity,
                    "Error al obtenir producte",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

        // Al fer clic en el botó de guardar processem i validem les dades intrduïdes i
        // persistim el producte editat a la base de dades
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
                    // Assignem els valors validats a un nou objecte
                    val updatedProduct = Product(
                        id = productId,
                        id_venedor = UserSession.userId!!,
                        nom = name,
                        descripcio = description,
                        stock = stock.toInt(),
                        preu = price.toDouble(),
                        url_imatge = imageUrl
                    )

                    // Persistim els canvis a la base de dades
                    updateProduct(productId, updatedProduct)
                }
            }
        }

        // Definim un listener per al botó d'esborrar
        deleteButton.setOnClickListener {
            deleteProduct(productId)
        }

    }

    // Retorna un objecte Product segons una id determinada
    private fun getProduct(productId: Int, callback: (Product?) -> Unit) {
        RetrofitClient.apiService.getProduct(productId).enqueue(object : Callback<Product> {
            override fun onResponse(call: Call<Product>, response: Response<Product>) {
                if (response.isSuccessful) {
                    callback(response.body())
                } else {
                    Log.e("API", "Error al carregar producte: ${response.errorBody()?.string()}")
                    callback(null)
                }
            }

            override fun onFailure(call: Call<Product>, t: Throwable) {
                Log.e("API", "Fallo en la API: ${t.message}")
                callback(null)
            }
        })
    }

    // Carrega les dades d'un objecte Product als diferents camps de la vista
    private fun loadProductData(
        product: Product,
        name: EditText,
        desc: EditText,
        stock: EditText,
        price: EditText,
        url: EditText
    ) {
        name.setText(product.nom)
        desc.setText(product.descripcio)
        stock.setText(product.stock.toString())
        price.setText(product.preu.toString())
        url.setText(product.url_imatge)
    }

    // Persisteix l'objecte Product editat a la base de dades
    private fun updateProduct(productId: Int, product: Product) {
        RetrofitClient.apiService.putProduct(productId, product)
            .enqueue(object : Callback<Map<String, Any>> {
                override fun onResponse(
                    call: Call<Map<String, Any>>,
                    response: Response<Map<String, Any>>
                ) {
                    if (response.isSuccessful) {
                        Toast.makeText(
                            this@SellerEditProductActivity,
                            "Producte actualitzat correctament",
                            Toast.LENGTH_SHORT
                        ).show()
                        finish()
                    } else {
                        Log.e(
                            "API",
                            "Error al actualitzar producte: ${response.errorBody()?.string()}"
                        )
                        Toast.makeText(
                            this@SellerEditProductActivity,
                            "Error al actualitzar producte",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }

                override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                    Log.e("API", "Error de connexió: ${t.message}")
                    Toast.makeText(
                        this@SellerEditProductActivity,
                        "Error de connexió al actualitzar producte",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            })
    }

    // Elimina l'objecte Product de la base de dades segons el seu id
    private fun deleteProduct(productId: Int) {
        RetrofitClient.apiService.deleteProduct(productId)
            .enqueue(object : Callback<Map<String, Any>> {
                override fun onResponse(
                    call: Call<Map<String, Any>>,
                    response: Response<Map<String, Any>>
                ) {
                    if (response.isSuccessful) {
                        Toast.makeText(
                            this@SellerEditProductActivity,
                            "Producte eliminat correctament",
                            Toast.LENGTH_SHORT
                        ).show()
                        finish()
                    } else {
                        Log.e(
                            "API",
                            "Error al eliminar producte: ${response.errorBody()?.string()}"
                        )
                        Toast.makeText(
                            this@SellerEditProductActivity,
                            "Error al eliminar producte",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }

                override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                    Log.e("API", "Error de connexió al eliminar producte: ${t.message}")
                    Toast.makeText(
                        this@SellerEditProductActivity,
                        "Error de connexió",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            })
    }

    companion object {
        const val EXTRA_PRODUCT_ID = "product_id"
    }
}
