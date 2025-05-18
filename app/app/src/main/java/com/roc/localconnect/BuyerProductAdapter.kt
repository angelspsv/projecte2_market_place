package com.roc.localconnect

import android.graphics.BitmapFactory
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.net.URL

class BuyerProductAdapter(
    private var productList: List<Product>,
) : RecyclerView.Adapter<BuyerProductAdapter.ProductViewHolder>() {

    class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val productName: TextView = itemView.findViewById(R.id.buyer_product_name)
        val productPrice: TextView = itemView.findViewById(R.id.buyer_product_price)
        val productImage: ImageView = itemView.findViewById(R.id.buyer_product_image)

        fun loadImageFromUrl(url: String) {
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val inputStream = URL(url).openStream()
                    val bitmap = BitmapFactory.decodeStream(inputStream)
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
        val view = LayoutInflater.from(parent.context).inflate(R.layout.buyer_product_item, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = productList[position]
        holder.productName.text = product.nom
        holder.productPrice.text = "€${product.preu}"

        var urlImatge: String? = product.url_imatge
//        Log.e("URL", urlImatge ?: "URL is null")

        if (!urlImatge.isNullOrEmpty()) {
            holder.loadImageFromUrl(product.url_imatge)
        } else {
            holder.productImage.setImageResource(R.drawable.product_image_placeholder)
        }

    }

    fun updateProducts(newProductList: List<Product>) {
        productList = newProductList
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int = productList.size

}
