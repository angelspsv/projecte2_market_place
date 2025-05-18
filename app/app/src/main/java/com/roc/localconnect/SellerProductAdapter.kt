package com.roc.localconnect

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

class SellerProductAdapter(
    private var productList: List<Product>,
    private val onItemClick: (Product) -> Unit
) : RecyclerView.Adapter<SellerProductAdapter.ProductViewHolder>() {

    class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val productName: TextView = itemView.findViewById(R.id.seller_product_name)
        val productDesc: TextView = itemView.findViewById(R.id.seller_product_desc)
        val productStock: TextView = itemView.findViewById(R.id.seller_product_stock)
        val productPvp: TextView = itemView.findViewById(R.id.seller_product_pvp)
        val productImage: ImageView = itemView.findViewById(R.id.seller_product_image)

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
        val view = LayoutInflater.from(parent.context).inflate(R.layout.seller_product_item, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = productList[position]
        holder.productName.text = product.nom
        holder.productDesc.text = product.descripcio
        holder.productStock.text = "${product.stock}kg"
        holder.productPvp.text = "€${product.preu}"

        var urlImatge: String? = product.url_imatge
//        Log.e("URL", urlImatge ?: "URL is null")

        if (!urlImatge.isNullOrEmpty()) {
            holder.loadImageFromUrl(product.url_imatge)
        } else {
            holder.productImage.setImageResource(R.drawable.product_image_placeholder)
        }

        holder.itemView.setOnClickListener {
            onItemClick(product)
        }

    }

    fun updateProducts(newProductList: List<Product>) {
        productList = newProductList
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int = productList.size

}
