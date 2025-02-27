//treballem amb el formulari
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("nou_usuari_form");
    const btnTornar = document.getElementById("tornar");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); //evitem enviar el formulari automaticament

        //obtenim valors i netegem les dades: sense espais i en minuscules per assegurar 
        //la cohesio de les dades i facilitar la cerca. La contrasenya no.
        const nom_entrat = document.getElementById("nom").value.trim().toLowerCase();
        const cognom_entrat = document.getElementById("cognom").value.trim().toLowerCase();
        const email_entrat = document.getElementById("email").value.trim().toLowerCase();
        const contrasenya_entrada = document.getElementById("contrasenya").value.trim();
        const telefon_entrat = document.getElementById("telefon").value.trim();
        const dni_entrat = document.getElementById("dni").value.trim();
        const comarca = document.getElementById("comarca").value;
        const tipus_usuari = document.getElementById("tipus_usuari").value;
        const iban_entrat = document.getElementById("iban").value.trim().toLowerCase();

        //per les proves
        console.log(nom_entrat);
        console.log(cognom_entrat);
        console.log(email_entrat);
        console.log(contrasenya_entrada);
        console.log(telefon_entrat);
        console.log(dni_entrat);
        console.log(comarca);
        console.log(tipus_usuari);
        console.log(iban_entrat);

        //si hi ha algun camp buit, error
        if (!nom_entrat || !cognom_entrat || !email_entrat || !contrasenya_entrada || !telefon_entrat || !dni_entrat || !comarca || !tipus_usuari || !iban_entrat) {
            alert("Tots els camps són obligatoris.");
            return;
        }

        //validacio del email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email_entrat)){
            alert('El correu electrònic entrat no és vàlid!');
            return;
        }

        //validacio de la contrasenya entrada: minim 6 caracters
        if(contrasenya_entrada.length < 6){
            alert('La contrasenya és massa corta!');
            return;
        }

        //el movil ha de tenir 9 chars, sino invalid
        if (!/^\d{9}$/.test(telefon_entrat)) {
            alert("El telèfon ha de tenir 9 dígits.");
            return;
        }

        //prova, si dni no te 9 chars o que el darrer no sigui una lletra, invalid
        if(!/^\d{8}[a-zA-Z]$/.test(dni_entrat)){
            alert("DNI no vàlid.");
            return;
        }

        //prova pel compte bancari
        if (!/^[a-zA-Z]{2}\d{22}$/.test(iban_entrat)) {
            alert("IBAN no vàlid.");
            return;
        }

        //construir objecte nou usuari
        const nou_usuari = {
            nom_entrat,
            cognom_entrat,
            email_entrat,
            contrasenya_entrada,
            telefon_entrat,
            dni_entrat,
            comarca,
            tipus_usuari,
            iban_entrat
        };

        console.log(nou_usuari);

        /*
        //enviem les dades cridant la API 
        fetch("http://127.0.0.1:8000/nou_usuari/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nou_usuari)
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuari creat correctament!");
            form.reset();
            window.location.href = "inici_sessio.html";
        })
        .catch(error => {
            alert("Error en el registre. Torna-ho a intentar.");
            console.error("Error:", error);
        });
        */
        //temporalment, mentre no funciones l'endpoint
        window.location.href = "inici_sessio.html";
    });

    //boto per tornar
    btnTornar.addEventListener('click', function () {
        window.location.href = "index.html";
    });
});