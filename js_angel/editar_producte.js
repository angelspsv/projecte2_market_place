document.addEventListener("DOMContentLoaded", async function (){
    //recuperem ID del producte que volem editar des de la url
    const urlParams = new URLSearchParams(window.location.search);
    const producteId = urlParams.get('id');

    //si ID esta buit
    if (!producteId) {
        alert("ID de producte no especificat!");
        return;
    }

    await carregarDadesProducte(producteId);
});

//funcio async-await per obtenir les dades del producte a partir del ID producte
async function carregarDadesProducte(id){
    try {
        const response = await fetch(`http://127.0.0.1:8000/producte/${id}`);

        if (!response.ok) {
            throw new Error('Producte no trobat');
        }

        const dadesProducte = await response.json();
        console.log("Dades del producte:", dadesProducte);

        //cridem funcio per mostrar les dades del producte que l'usuari-venedor vol editar
        mostrarFormulariEdicio(dadesProducte);

    } catch (error) {
        console.error("Error al carregar les dades:", error.message);
        alert("No s'han pogut carregar les dades del producte.");
    }
}



//funcio per mostrar les dades del producte que l'usuari-venedor vol editar
function mostrarFormulariEdicio(dadesProducte) {
    const container = document.getElementById("dades_producte");
    container.innerHTML = "";

    const titol = document.createElement("p");
    titol.textContent = 'Aquí pots editar el teu producte';
    titol.className = "titol-edit-prod";
    container.appendChild(titol);

    //dades del producte que es podran editar
    const campsEditables = ["nom", "descripcio", "preu", "stock", "url_imatge"];
    //generem els camps del formulari
    campsEditables.forEach(clau => {
        const label = document.createElement("label");
        label.textContent = clau.charAt(0).toUpperCase() + clau.slice(1);
        label.setAttribute("for", clau);

        const input = document.createElement("input");
        input.type = "text";
        input.id = clau;
        input.name = clau;
        input.value = dadesProducte[clau] || "";

        container.appendChild(label);
        container.appendChild(input);
    });

    //botons
    //boto actualitzar dades fa una peticio al servidor per actualitzar el producte
    const btnActualitzar = document.createElement("button");
    btnActualitzar.textContent = "Actualitzar producte";
    btnActualitzar.className = "btn-verd";
    btnActualitzar.onclick = function (){
        actualitzarProducte(dadesProducte.id, dadesProducte.id_venedor);
    };

    //boto tornar envia a l'usuari a la pagina de menu d'inici del venedor
    const btnTornar = document.createElement("button");
    btnTornar.textContent = "Tornar al menú";
    btnTornar.className = "btn-verd btn-marge-esquerra";
    btnTornar.onclick = function (){
        window.location.href = "venedor_menu_inici.html";
    };

    container.appendChild(btnActualitzar);
    container.appendChild(btnTornar);
}


//funcio que valida el preu entrat si te un format correcte
function comprovacioPreu(entrada) {
    let precioString = entrada.replace(",", ".").trim();

    if (/^\d+(\.\d{1,2})?$/.test(precioString)) {
        let precioNumero = parseFloat(precioString);
        if (!isNaN(precioNumero) && precioNumero > 0) {
            return precioNumero;
        } else {
            alert("El preu ha de ser un número positiu.");
            return -1;
        }
    } else {
        alert("El preu introduït no és vàlid!");
        return -1;
    }
}


//funcio async await per editar un producte (PUT/UPDATE)
async function actualitzarProducte(id, id_venedor) {
    const nom = document.getElementById("nom").value.trim();
    const descripcio = document.getElementById("descripcio").value.trim();
    const preuInput = document.getElementById("preu").value.trim();
    const stockInput = document.getElementById("stock").value.trim();
    const url_imatge = document.getElementById("url_imatge").value.trim();


    //validacions basiques dades
    if (!nom || !descripcio || !preuInput || !stockInput || !url_imatge) {
        alert("Tots els camps han d'estar plens.");
        return;
    }

    const preu = comprovacioPreu(preuInput);
    if (preu === -1) return;

    const stock = parseInt(stockInput);
    if (isNaN(stock) || stock < 0) {
        alert("Stock ha de ser un número enter positiu.");
        return;
    }

    const dadesActualitzades = {
        nom,
        descripcio,
        preu: preu.toFixed(2),
        stock,
        url_imatge,
        id_venedor
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/producte_put/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadesActualitzades),
        });

        if (!response.ok) {
            throw new Error("Error en actualitzar el producte");
        }

        const data = await response.json();
        alert("Producte actualitzat correctament!");
        console.log("resposta del servidor:", data);
        //retornem l'usuari a la pagina d'inici del menu
        window.location.href = "venedor_menu_inici.html";

    } catch (error) {
        console.error("Error:", error.message);
        alert("No s'ha pogut actualitzar el producte.");
    }
}