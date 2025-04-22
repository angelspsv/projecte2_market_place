document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");
    
    
    //fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_venedor.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Pujar nou producte", link: "pujar_producte.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" }
    ];

    //bucle per generar dinamicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.textContent = button.text;
        btnElement.href = button.link;
        btnElement.classList.add("btn");
        //inserim els botons al contenidor creat per aquests
        buttonsContainer.appendChild(btnElement);
    });


    //codi per recuperar la cookie
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) {   
            let cookieValue = parts.pop().split(";").shift();
            console.log(`Cookie ${name} trobada:`, cookieValue);  //verifiquem que la coookie hi es
            return cookieValue;
        }
        console.log(`Cookie ${name} no encontrada`);
        return null;
    }



    //recuperar cookie
    const userEmail = getCookie('user_email');
    const userName = getCookie('user_name');
    const userType = getCookie('user_type');
    const userId = getCookie('user_id');

    console.log('Email:', userEmail);
    console.log('Nombre:', userName);
    console.log('Tipo de usuario:', userType);
    console.log('ID usuari:', userId);
    

    //salutacio al usuari
    let nom = userName;  //hauria de mostrar el nom del usuari real
    const nom_usuari = document.querySelector('.username');
    const id_usuari = userId;

    //si nom i nom_usuari no son buits, mostrem l'opcio del IF
    if (nom_usuari && nom) {
        nom_usuari.textContent = `Hola, ${nom.toUpperCase()}`;
    } else {
        console.error('Problema con el nombre del usuario');
        nom_usuari.textContent = 'Hola!';
    }


    //funcio asincrona que carrega els productes del venedor cridant el endpoint /productes_venedor/{id}
    mostrarProductesVenedor(id_usuari);

});




//funcio encara per desenvolupar
//coneixent qui es el venedor es cridara el endpoint per retornar tots els seus productes
async function mostrarProductesVenedor(id_venedor){
    try{

        const tmp = document.getElementById('productes_venedor');
        tmp.textContent = `Aqui mostrem els articles del venedor amb id: ${id_venedor}`;

        //obtenir la llista de productes de l'usuari
        //fetch per obtenir els productes del venedor 
        const response = await fetch(`http://127.0.0.1:8000/productes_venedor/${id_venedor}`);

        if (!response.ok) {
            throw new Error('Usuari no trobat');
        }

        //obtenim la llista d'objectes de productes
        const dataProductes = await response.json();
        console.log(dataProductes);


        //cridar funcio per mostrar cada producte
        //fare servir createElements per visualitzar cada producte
        //dos productes per linia



    }catch (error){
        console.log('error en el fetch', error.message);
    }


}
