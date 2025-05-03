package com.roc.localconnect
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    // Endpoint GET /
    @GET("/")
    fun getRoot(): Call<Map<String, String>>

    // Endpoint GET /usuaris
    @GET("usuaris")
    fun getAllUsuaris(): Call<List<Map<String, Any>>>

    // Endpoint GET /usuari/{id}
    @GET("usuari/{id}")
    fun getUsuariById(@Path("id") id: Int): Call<Usuari>

    // Endpoint GET /login/{email}
    @GET("login/{email}")
    fun getLogin(@Path("email") email: String): Call<LoginResponse>

    // Endpoint GET /productes/{id}
    @GET("productes/{id}")
    suspend fun getProductsByUserId(@Path("id") userId: Int): Map<String, List<List<Any>>>

    // Endpoint POST /nou_usuari/
    @POST("nou_usuari/")
    fun createUsuari(@Body usuari: Usuari): Call<Map<String, Any>>

    // Endpoint POST /nou_producte/
    @POST("nou_producte/")
    fun createProducte(@Body producte: Producte): Call<Map<String, Any>>
}