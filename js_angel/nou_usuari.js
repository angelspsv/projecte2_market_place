// Treballem amb el formulari
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("nou_usuari_form");
    const btnTornar = document.getElementById("tornar");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitem enviar el formulari automàticament

        // Obtenim valors i netegem les dades
        const nom_entrat = document.getElementById("nom").value.trim().toLowerCase();
        const cognom_entrat = document.getElementById("cognom").value.trim().toLowerCase();
        const email_entrat = document.getElementById("email").value.trim().toLowerCase();
        const contrasenya_entrada = document.getElementById("contrasenya").value.trim();
        const telefon_entrat = document.getElementById("telefon").value.trim();
        const dni_entrat = document.getElementById("dni").value.trim();
        const comarca = document.getElementById("comarca").value;
        let usuari_select = document.getElementById("tipus_usuari").value;
        const iban_entrat = document.getElementById("iban").value.trim().toLowerCase();


        //assignem valor numeric al valor del select de venedor/comprador
        const tipus_usuari = (usuari_select === "venedor") ? 1 : (usuari_select === "comprador" ? 0 : null);

        // Per les proves
        console.log(nom_entrat, cognom_entrat, email_entrat, contrasenya_entrada, telefon_entrat, dni_entrat, comarca, tipus_usuari, iban_entrat);

        // Si hi ha algun camp buit, error
        
        if (!nom_entrat || !cognom_entrat || !email_entrat || !contrasenya_entrada || !telefon_entrat || !dni_entrat || !comarca || tipus_usuari === null || !iban_entrat) {
            alert("Tots els camps són obligatoris.");
            return;
        }
        

        // Validació del email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_entrat)) {
            alert('El correu electrònic entrat no és vàlid!');
            return;
        }

        // Validació de la contrasenya: mínim 6 caràcters
        if (contrasenya_entrada.length < 6) {
            alert('La contrasenya és massa curta!');
            return;
        }

        // Validació del telèfon: ha de tenir 9 dígits
        if (!/^\d{9}$/.test(telefon_entrat)) {
            alert("El telèfon ha de tenir 9 dígits.");
            return;
        }

        // Validació del DNI: 8 números + 1 lletra
        if (!/^\d{8}[a-zA-Z]$/.test(dni_entrat)) {
            alert("DNI no vàlid.");
            return;
        }

        // Validació del compte bancari (IBAN)
        if (!/^[a-zA-Z]{2}\d{22}$/.test(iban_entrat)) {
            alert("IBAN no vàlid.");
            return;
        }

        // Construir objecte nou usuari
        const new_user = {
            dni: dni_entrat,
            nom: nom_entrat,
            cognom: cognom_entrat,
            email: email_entrat,
            contrasenya: contrasenya_entrada,
            telefon: telefon_entrat,
            comarca: comarca,
            tipus_usuaris: tipus_usuari,
            compte_banc: iban_entrat,
        };

        console.log("Dades a enviar:", JSON.stringify(new_user)); // Depuració

        // Enviar les dades amb fetch i await
        try {
            const response = await fetch("http://127.0.0.1:8000/nou_usuari/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(new_user)
            });

            console.log("Resposta de la API:", response.status, response.statusText); // Depuració

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log("Resposta JSON:", data); // Depuració

            if (data.detail) {
                alert("Error al registre: " + data.detail);
            } else {
                alert("Usuari creat correctament!");
                form.reset();
                window.location.href = "inici_sessio.html";
            }
        } catch (error) {
            alert("Error en el registre. " + error.message);
            console.error("Error detallat:", error);
        }
    });

    // Botó per tornar
    btnTornar.addEventListener('click', function () {
        window.location.href = "index.html";
    });
});