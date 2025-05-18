package com.roc.localconnect

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SellerHomeFragment : Fragment() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: SellerProductAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.seller_home_fragment, container, false)
        val createProductButton: ImageButton = view.findViewById(R.id.seller_create_product_button)

        createProductButton.setOnClickListener {
            val intent = Intent(requireContext(), SellerCreateProductActivity::class.java)
            startActivity(intent)
        }

        recyclerView = view.findViewById(R.id.seller_home_recycler_view)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        adapter = SellerProductAdapter(emptyList()) { product ->
            val intent = Intent(requireContext(), SellerEditProductActivity::class.java)
            intent.putExtra(SellerEditProductActivity.EXTRA_PRODUCT_ID, product.id)
            startActivity(intent)
        }
        recyclerView.adapter = adapter

        return view
    }

    override fun onResume() {
        super.onResume()
        updateProductList()
    }

    private fun updateProductList() {
        RetrofitClient.apiService.getProducts(UserSession.userId!!).enqueue(object : Callback<List<Product>> {
            override fun onResponse(call: Call<List<Product>>, response: Response<List<Product>>) {
                if (response.isSuccessful) {
                    val productList = response.body() ?: emptyList()
                    Log.d("PRODUCT_LIST", productList.toString())

                    adapter.updateProducts(productList)
                } else {
                    Log.e("API", "Error en la resposta HTTP: Codi ${response.code()}")
                }
            }

            override fun onFailure(call: Call<List<Product>>, t: Throwable) {
                Log.e("API", "La call ha fallat pel següent motiu: ${t.message}", t)
            }
        })
    }
}
