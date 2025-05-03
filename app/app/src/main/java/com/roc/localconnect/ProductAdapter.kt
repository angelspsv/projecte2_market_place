package com.roc.localconnect

import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ProductAdapter(private val productList: List<Producte>) : RecyclerView.Adapter<ProductAdapter.ProductViewHolder>() {

    class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage: ImageView = itemView.findViewById(R.id.product_image)
        val productName: TextView = itemView.findViewById(R.id.product_name)
        val productPrice: TextView = itemView.findViewById(R.id.product_price)
        val addToCartButton: ImageButton = itemView.findViewById(R.id.add_to_cart_button)

        fun loadImageFromUrl(url: String) {
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val inputStream = java.net.URL(url).openStream()
                    val bitmap = android.graphics.BitmapFactory.decodeStream(inputStream)
                    withContext(Dispatchers.Main) {
                        productImage.setImageBitmap(bitmap)
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_item, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = productList[position]
        holder.productName.text = product.nom
        holder.productPrice.text = "€${product.preu}"

        product.urlImatge?.let { url ->
            holder.loadImageFromUrl(url)
        }

        holder.addToCartButton.setOnClickListener {
            // Lógica para añadir al carrito
        }
    }

    override fun getItemCount(): Int = productList.size
}
