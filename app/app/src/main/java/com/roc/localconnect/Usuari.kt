package com.roc.localconnect

data class Usuari (
    val dni: String,
    val nom: String,
    val cognom: String,
    val email: String,
    val contrasenya: String,
    val telefon: Int,
    val comarca: String,
    val tipusUsuaris: Boolean,
    val compteBanc: String
)