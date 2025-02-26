//faig el logo-home que si rep click portara el usuari a la pagina index / inici
const logo = document.createElement('img');
logo.src = 'imatges_angel/sprout_346246.png';
logo.alt = 'GO to home';
logo.addEventListener('click', function(){
    window.location.href = 'index.html';
});
document.getElementById('logo_home').appendChild(logo);


//fare un contenidor pel titol de la pagina
const titol = document.createElement('h1');
titol.textContent = 'Inici de sessió';
document.getElementById('titol').appendChild(titol);

//crear contenedor pel email i contrasenya
const emailContainer = document.createElement('label');
const passwdContainer = document.createElement('label');

//posar text al input del correu
const titol_mail = document.createElement('span');
titol_mail.textContent = 'Correu electrònic: ';
//posar text al input de contrasenya
const titol_passwd = document.createElement('span');
titol_passwd.textContent = 'Contrasenya: ';

//fer input pel email
const input_mail = document.createElement('input');
input_mail.type = 'email';
input_mail.placeholder = 'Entra el teu correu';

//fer input per contrasenya
const input_passwd = document.createElement('input');
input_passwd.type = 'password';
input_passwd.placeholder = 'Entra la teva contrasenya';

//afegim el text i el input al contenedor
emailContainer.appendChild(titol_mail);
emailContainer.appendChild(input_mail);
passwdContainer.appendChild(titol_passwd);
passwdContainer.appendChild(input_passwd);

//afegim el contenedor al div en el HTML
document.getElementById('per_email').appendChild(emailContainer);
document.getElementById('per_contrasenya').appendChild(passwdContainer);

//botons de inici de sessió
const btn_inici_sessio = document.createElement('button');
btn_inici_sessio.textContent = 'Inici de sessió';
btn_inici_sessio.addEventListener('click', function(){
    //agafem les dades des del imput correu i contrasenya
    let passwd_entrat = input_passwd.value.trim();
    let email_entrat = input_mail.value.trim().toLowerCase();
    
    //validacio bàsica de camps amb dades
    if(passwd_entrat.length == 0 || email_entrat.length == 0){
        alert('Camp de correu i/o contrasenya està buit');
        return;
    }
    //validacio del email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email_entrat)){
        alert('El correu electrònic entrat no és vàlid!');
        return;
    }
    //validacio de la contrasenya entrada: minim 6 caracters
    if(passwd_entrat.length < 6){
        alert('La contrasenya és massa corta!');
        return;
    }

    //aqui cridem la API per fer la consulta i verificar si existeix aquest usuari o no

    //si usuari existeix anem a pagina sessio_iniciada / perfil propi
    window.location.href = 'sessio_iniciada.html';
});
document.getElementById('per_botons').appendChild(btn_inici_sessio); 


const passwd_forget = document.createElement('span');
passwd_forget.textContent = 'Has oblidat la contrasenya';
passwd_forget.addEventListener('click', function(){
    window.location.href = 'contrasenya_oblidada.html';
});
document.getElementById('per_botons').appendChild(passwd_forget);