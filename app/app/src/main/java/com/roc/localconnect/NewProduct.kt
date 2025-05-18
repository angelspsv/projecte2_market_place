package com.roc.localconnect

data class NewProduct(
    val id_venedor: Int,
    val nom: String,
    val descripcio: String,
    val stock: Int,
    val preu: Double,
    val url_imatge: String,
)
