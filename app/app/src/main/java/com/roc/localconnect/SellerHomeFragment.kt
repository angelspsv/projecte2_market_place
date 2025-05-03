package com.roc.localconnect

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class SellerHomeFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.seller_home_fragment, container, false)

        val recyclerView: RecyclerView = view.findViewById(R.id.recycler_view)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        val userId = 3 // Exemple

        CoroutineScope(Dispatchers.IO).launch {
            val response = RetrofitClient.apiService.getProductsByUserId(userId)
            val rawProductList = response["productes"] as? List<List<Any>> ?: emptyList()

            val productList = rawProductList.map


            val productList = rawProductList.map { product ->
                Producte(
                    id = product[0] as Int,
                    idVenedor = product[1] as Int,
                    nom = product[2] as String,
                    descripcio = product[3] as String,
                    preu = (product[4] as String).toDouble(),
                    stock = product[5] as Int,
                    urlImatge = product[6] as String,
                    dataCreacio = (product[7] as String).toDate()?: LocalDateTime.now()
                )
            }

            withContext(Dispatchers.Main) {
                val adapter = ProductAdapter(productList)
                recyclerView.adapter = adapter
            }
//            try {
//
//            } catch (e: Exception) {
//                withContext(Dispatchers.Main) {
//                    Toast.makeText(requireContext(), "Error al obtenir els productes: ${e.message}", Toast.LENGTH_SHORT).show()
//                    e.printStackTrace()
//                }
//            }
        }

        return view
    }

    private fun String.toDate(): LocalDateTime? {
        return try {
            LocalDateTime.parse(this, DateTimeFormatter.ISO_DATE_TIME)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

}
