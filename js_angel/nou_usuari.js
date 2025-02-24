document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("nou_usuari_form");
    const btnTornar = document.getElementById("tornar");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente

        // Obtener valores
        const nom = document.getElementById("nom").value.trim();
        const cognom = document.getElementById("cognom").value.trim();
        const email = document.getElementById("email").value.trim();
        const contrasenya = document.getElementById("contrasenya").value.trim();
        const telefon = document.getElementById("telefon").value.trim();
        const dni = document.getElementById("dni").value.trim();
        const comarca = document.getElementById("comarca").value;
        const tipusUsuari = document.getElementById("tipus_usuari").value;
        const iban = document.getElementById("iban").value.trim();

        //si hi ha algun camp buit, error
        if (!nom || !cognom || !email || !contrasenya || !telefon || !dni || !comarca || !tipusUsuari || !iban) {
            alert("Tots els camps són obligatoris.");
            return;
        }

        //el movil ha de tenir 9 chars, sino invalid
        if (telefon.length != 9) {
            alert("El telèfon ha de tenir 9 dígits.");
            return;
        }

        //prova, si dni no te 8 chars, invalid
        if(dni.length != 9){
            alert("DNI no vàlid.");
            return;
        }

        //prova per els compte bancari
        if (!/^[A-Z]{2}\d{22}$/.test(iban)) {
            alert("IBAN no vàlid.");
            return;
        }

        // Construir objeto de usuario
        const nouUsuari = {
            nom,
            cognom,
            email,
            contrasenya,
            telefon,
            dni,
            comarca,
            tipusUsuari,
            iban
        };

        //enviem les dades cridant la API 
        fetch("http://127.0.0.1:8000/nou_usuari/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nouUsuari)
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuari creat correctament!");
            form.reset();
        })
        .catch(error => {
            alert("Error en el registre. Torna-ho a intentar.");
            console.error("Error:", error);
        });
    });

    // Botón para volver
    btnTornar.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});