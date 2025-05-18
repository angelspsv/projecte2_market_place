package com.roc.localconnect

data class Product(
    val id: Int,
    val id_venedor: Int,
    val nom: String,
    val descripcio: String,
    val stock: Int,
    val preu: Double,
    val url_imatge: String,
)
