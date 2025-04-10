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





//variable conectada amb el contenidor html
const espaiDivTancarSessio = document.getElementById('per_elements_tancar_sessio');

//faig contenidor pel boto, text i tot
const contenidor = document.createElement('div');

//element <p> pel text indicatiu de quina es aquesta pagina
const textExplocatiu = document.createElement('p');
textExplocatiu.textContent = 'Estàs a punt de sortir de la pàgina...';

//afegim codi per boto de tancar la sessio d'usuari i eliminar la cookie d'usuari
const botoTancar = document.createElement('button');
botoTancar.textContent = 'Tancar sessió';
botoTancar.addEventListener('click', tancarSessio);

//afegim el boto i espai per text al contenidor virtual
contenidor.appendChild(textExplocatiu);
contenidor.appendChild(botoTancar);

//afegim el contenidor al espai/contenidor html
espaiDivTancarSessio.appendChild(contenidor);



//funcio per esborrar la cookie i redirigir l'usuari cap la pagina d'inici
//confirma decisio usuari, rescriure cookie, regirigir pagina inici
function tancarSessio(){
    //demanem consentiment a l'usuari
    if (confirm('Vols tancar sessió?')){
        //reescriure la cookie amb data del passat
        document.cookie = "user_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "user_type=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        //redirigim l'usuari cap a la pagina d'inici
        window.location.href = 'index.html';
    }else{
        //enviem l'usuari a la seva pagina d'inici segons el seu tipus d'usuari 1: venedor i 0: comprador
        if(userType === 1){
            window.location.href = 'venedor_menu_inici.html';
        }else{
            window.location.href = 'comprador_menu_inici.html';
        }
    }
}