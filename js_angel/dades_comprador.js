document.addEventListener("DOMContentLoaded", function() {
    const buttonsContainer = document.getElementById("buttons-container");

    //faig el logo-home que si rep click portara el usuari a la pagina index / inici
    const logo = document.createElement('img');
    logo.src = 'imatges_angel/sprout_346246.png';
    logo.alt = 'GO to home';
    logo.addEventListener('click', function(){
        window.location.href = 'comprador_menu_inici.html';
    });
    document.getElementById('logo_home').appendChild(logo);


    //obtenim el nom del fitxer actual per deshabilitar el boto corresponent
    const currentPage = window.location.pathname.split("/").pop();

    //fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_comprador.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" },
        { imgSrc: "imatges_angel/216477_shopping_cart_icon.png", link: "cistella_resum_comanda.html" }
    ];

    //bucle per generar dinàmicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.href = button.link;
        btnElement.classList.add("btn");

        if (button.imgSrc) {
            let imgElement = document.createElement("img");
            imgElement.src = button.imgSrc;
            imgElement.alt = "Carrito";
            imgElement.classList.add("icono-cistella"); // Afegim classe CSS
            btnElement.appendChild(imgElement);
        } else {
            btnElement.textContent = button.text;
        }

        // Si el botó és el de la pàgina actual, afegim classe "active" i eliminem l'enllaç
        if (currentPage === button.link) {
            btnElement.classList.add("active");
            btnElement.removeAttribute("href"); // Evita que l'usuari pugui fer clic de nou
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

    //si nom i nom_usuari no son buits, mostrem l'opcio del IF
    if (nom_usuari && nom) {
        nom_usuari.textContent = `Hola, ${nom.toUpperCase()}`;
    } else {
        console.error('Problema con el nombre del usuario');
        nom_usuari.textContent = 'Hola!';
    }


    //ruta endpoint: GET /usuari/{id}
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
        mostrarDadesComprador(userData);

    } catch (error) {
        console.log('error en el fetch', error.message);
    }
}



//funcio per visualitzar les dades de l'usuari. Rep un json amb les dades de l'usuari
function mostrarDadesComprador(dadesUsuari) {
    const container = document.getElementById("dades_comprador");
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
    
    //funció per actualitzar les dades de l'usuari
    btnActualizar.onclick = async function() {
        const dadesActualitzades = {};

        //afegim al nou objecte les dades de ID i tipus_usuaris
        dadesActualitzades.id_usuari = dadesUsuari.id_usuari;  
        dadesActualitzades.tipus_usuaris = dadesUsuari.tipus_usuaris;
        

        //recollim les dades dels inputs i validem dins del bucle
        for (const key in dadesUsuari) {
            const input = document.getElementById(key);
            if (input) {
                let valor = input.value.trim();

                //validacio per a cada camp
                switch (key) {
                    case "nom":
                    case "cognom":
                        //validacio del nom i cognom (no poden estar buits)
                        if (!valor) {
                            alert(`${key} no pot estar buit.`);
                            return;
                        }
                        dadesActualitzades[key] = valor.toLowerCase();
                        break;

                    case "email":
                        //validacio email
                        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(valor)) {
                            alert("El correu electrònic entrat no és vàlid!");
                            return;
                        }
                        dadesActualitzades[key] = valor.toLowerCase();
                        break;

                    case "contrasenya":
                        //validacio de la contrasenya (minim 6 chars)
                        if (valor.length < 6) {
                            alert("La contrasenya és massa curta!");
                            return;
                        }
                        dadesActualitzades[key] = valor;
                        break;

                    case "telefon":
                        //validacio del telefon (ha de tenir 9 nums)
                        if (!/^\d{9}$/.test(valor)) {
                            alert("El telèfon ha de tenir 9 dígits.");
                            return;
                        }
                        dadesActualitzades[key] = valor;
                        break;

                    case "dni":
                        //validacio del DNI (8 nums + 1 lletra)
                        if (!/^\d{8}[a-zA-Z]$/.test(valor)) {
                            alert("DNI no vàlid.");
                            return;
                        }
                        dadesActualitzades[key] = valor;
                        break;

                    case "comarca":
                        //comarca no pot estar buit
                        if (!valor) {
                            alert("La comarca no pot estar buida.");
                            return;
                        }
                        dadesActualitzades[key] = valor;
                        break;

                    case "iban":
                        //validacio del compte bancari (IBAN)
                        if (!/^[a-zA-Z]{2}\d{22}$/.test(valor)) {
                            alert("IBAN no vàlid.");
                            return;
                        }

                        //validacio de la longitud de 24 chars
                        if (valor.length !== 24) {
                            alert("El IBAN ha de tenir exactament 24 caràcters.");
                            return;
                        }

                        dadesActualitzades[key] = valor;
                        break;

                    default:
                        //si no es cap dels camps especifics, afegim el valor sense validacio addicional
                        dadesActualitzades[key] = valor;
                }
            }
        }

        try {
            //mostrem per la consola l'objecte amb les noves dades
            console.log(dadesActualitzades);
            //realitzem peticio PUT per actualitzar les dades de l'usuari
        
            const response = await fetch(`http://127.0.0.1:8000/usuari_put/${dadesUsuari.id_usuari}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadesActualitzades), //enviem les dades actualitzades com a JSON
            });

            //comprovem si la resposta ha estat correcta
            if (!response.ok) {
                throw new Error("Error en actualitzar les dades");
            }

            //si tot va be, mostrem un alert i actualitzem la vista amb les noves dades
            const data = await response.json();
            alert("Dades actualitzades correctament!");
            //mostrem la resposta de l'API
            console.log("Resposta de la API:", data); 

            //actualitzar la vista amb les noves dades de l'usuari
            //mostrarDadesVenedor(data); 
        } catch (error) {
            console.error("Error al actualitzar les dades:", error.message);
            alert("Hi ha hagut un error en actualitzar les dades.");
        }
    };



    //crear boto per Tornar al menú d'usuari
    const btnTornar = document.createElement("button");
    btnTornar.textContent = "Tornar al menú";
    btnTornar.className = "btn-verd btn-marge-esquerra";
    btnTornar.onclick = function () {
        window.location.href = "comprador_menu_inici.html";
    };

    //afegim els botons al contenidor
    container.appendChild(btnActualizar);
    container.appendChild(btnTornar);
}

