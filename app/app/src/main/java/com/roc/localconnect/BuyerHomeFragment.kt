package com.roc.localconnect

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class BuyerHomeFragment : Fragment() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: BuyerProductAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.buyer_home_fragment, container, false)

        recyclerView = view.findViewById(R.id.buyer_home_recycler_view)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        adapter = BuyerProductAdapter(emptyList())
        recyclerView.adapter = adapter

        return view
    }

    override fun onResume() {
        super.onResume()
        updateProductList()
    }

    private fun updateProductList() {
        RetrofitClient.apiService.getAllProducts().enqueue(object : Callback<List<Product>> {
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
