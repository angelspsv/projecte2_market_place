document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");


    //faig el logo-home que si rep click portara el usuari a la pagina index / inici
    const logo = document.createElement('img');
    logo.src = 'imatges_angel/sprout_346246.png';
    logo.alt = 'GO to home';
    logo.addEventListener('click', function(){
    window.location.href = 'venedor_menu_inici.html';
    });
    document.getElementById('logo_home').appendChild(logo);




    //fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_venedor.html" },
        { text: "Les meves comandes", link: "venedor_comandes.html" },
        { text: "Pujar nou producte", link: "pujar_producte.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" }
    ];

    //obtenim el nom del fitxer actual
    const currentPage = window.location.pathname.split("/").pop(); 

    //bucle per generar dinamicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.textContent = button.text;
        btnElement.href = button.link;
        btnElement.classList.add("btn");

        //si la pagina actual es la mateixa que el link, marquem el boto com actiu
        if (currentPage === button.link) {
            btnElement.classList.add("active");
            btnElement.removeAttribute("href"); //evita que el usuari pugui fer click ovament al boto
        }

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



    //recuperar dades cookie
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

    //si nom i nom_usuari no son buits, mostrem l'opcio del IF
    if (nom_usuari && nom) {
        nom_usuari.textContent = `Hola, ${nom.toUpperCase()}`;
    } else {
        console.error('Problema con el nombre del usuario');
        nom_usuari.textContent = 'Hola!';
    }

    // ruta endpoint: /usuari/{id}
    //fem el fetch amb el id de l'usuari per obtenir les dades de l'usuari i mostrar-les
    //realitzar la peticio GET per verificar l'existencia de l'usuari
    const user_data = obtenimDadesUsuari(userId);


});



//fem el fetch amb el id de l'usuari per obtenir les dades de l'usuari i mostrar-les
//realitzar la peticio GET per verificar l'existencia de l'usuari
async function obtenimDadesUsuari(id){
    try {
        const response = await fetch(`http://127.0.0.1:8000/usuari/${id}`);

        if (!response.ok) {
            throw new Error('Usuari no trobat');
        }

        //obtenim les dades de l'usuari
        const userData = await response.json();
        console.log("Dades de l'usuari:", userData); //depuracio

        //cridem la funcio per mostrar les dades de l'usuari
        mostrarDadesVenedor(userData);
    
    } catch (error) {
        console.log('error en el fetch', error.message);
    }
}




//funcio per visualitzar les dades de l'usuari. Rep un json amb les dades de l'usuari
function mostrarDadesVenedor(dadesUsuari) {
    const container = document.getElementById("dades_venedor");
    container.innerHTML = ""; // netegem el contenidor

    const titol = document.createElement('p');
    titol.textContent = 'Les teves dades';
    container.appendChild(titol);

    //recorrem totes les claus menys 'id_usuari'
    for (const [key, value] of Object.entries(dadesUsuari)) {
        //saltar aquest camp que no es d'interes per l'usuari
        if (key === "id_usuari") continue; 
        if (key === "tipus_usuaris") continue;

        //crear label
        const label = document.createElement("label");
        label.textContent = key;
        label.setAttribute("for", key);
        label.style.display = "block";
        label.style.marginTop = "10px";

        //crear input
        const input = document.createElement("input");
        input.type = "text";
        input.id = key;
        input.name = key;
        input.value = value;
        input.style.width = "100%";

        //afegir al contenidor
        container.appendChild(label);
        container.appendChild(input);
    }

    //crear boto 'Editat i actualitzar'
    const btnActualizar = document.createElement("button");
    btnActualizar.textContent = "Editat i actualitzar";
    btnActualizar.className = "btn-verd";
    btnActualizar.onclick = function () {
        const dadesActualitzades = {};

        for (const key in dadesUsuari) {
            if (key === "id_usuari") continue;
            const input = document.getElementById(key);
            if (input) {
                dadesActualitzades[key] = input.value;
            }
        }

        /*
        // Aquí hauries de posar la URL del teu endpoint d'actualització
        fetch("https://api.exemple.com/usuaris/" + dadesUsuari.id_usuari, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadesActualitzades),
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al actualitzar");
            return response.json();
        })
        .then(data => {
            alert("Dades actualitzades correctament!");
        })
        .catch(error => {
            console.error(error);
            alert("Hi ha hagut un error en actualitzar les dades.");
        });
        */
    };


    //crear boto per Tornar al menú d'usuari
    const btnTornar = document.createElement("button");
    btnTornar.textContent = "Tornar al menú";
    btnTornar.className = "btn-verd btn-marge-esquerra";
    btnTornar.onclick = function () {
        window.location.href = "venedor_menu_inici.html";
    };

    //afegim els botons al contenidor
    container.appendChild(btnActualizar);
    container.appendChild(btnTornar);
}
