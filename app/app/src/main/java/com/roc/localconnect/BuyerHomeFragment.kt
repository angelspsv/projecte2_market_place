package com.roc.localconnect

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class BuyerHomeFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.buyer_home_fragment, container, false)

//        val recyclerView: RecyclerView = view.findViewById(R.id.recycler_view)

//        val productList = listOf(
//            Producte(1, "Producto 1","", 19.99, 10, ""),
//            Producte(2, "Producto 2","", 19.99, 10, ""),
//            Producte(3, "Producto 3","", 19.99, 10, ""),
//        )

//        val adapter = ProductAdapter(productList)
//
//        recyclerView.layoutManager = LinearLayoutManager(requireContext())
//        recyclerView.adapter = adapter

        return view
    }

}
