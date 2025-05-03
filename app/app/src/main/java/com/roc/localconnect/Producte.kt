package com.roc.localconnect

import java.time.LocalDateTime
import java.util.Date

data class Producte (
    val id: Int,
    val idVenedor: Int,
    val nom: String,
    val descripcio: String,
    val preu: Double,
    val stock: Int,
    val urlImatge: String,
    val dataCreacio: LocalDateTime
)