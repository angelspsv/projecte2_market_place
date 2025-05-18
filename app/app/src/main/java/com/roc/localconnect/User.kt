package com.roc.localconnect

import com.google.gson.annotations.SerializedName

data class User (
    var dni: String,
    var nom: String,
    var cognom: String,
    var email: String,
    var contrasenya: String,
    var telefon: Int,
    var comarca: String,

    @SerializedName("tipus_usuaris")
    var tipusUsuari: Boolean,

    @SerializedName("compte_banc")
    var iban: String
)