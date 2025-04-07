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

document.addEventListener("DOMContentLoaded", function () {
    //variables del formulari
    const input_mail = document.createElement('input');
    const input_passwd = document.createElement('input');
    
    //assignar propitats dels inputs
    input_mail.type = 'email';
    input_mail.placeholder = 'Entra el teu correu';
    input_passwd.type = 'password';
    input_passwd.placeholder = 'Entra la teva contrasenya';
    
    //agregar inputs al HTML
    document.getElementById('per_email').appendChild(input_mail);
    document.getElementById('per_contrasenya').appendChild(input_passwd);

    //crear el boto de inici de sessio
    const btn_inici_sessio = document.createElement('button');
    btn_inici_sessio.textContent = 'Inici de sessió';
    btn_inici_sessio.addEventListener('click', async function() {
        //agafar les dades de l'input de correu i contrasenya
        let passwd_entrat = input_passwd.value.trim();
        let email_entrat = input_mail.value.trim().toLowerCase();

        //validacio basica de camps
        if (passwd_entrat.length == 0 || email_entrat.length == 0) {
            alert('Camp de correu i/o contrasenya està buit');
            return;
        }

        //validacio del email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_entrat)) {
            alert('El correu electrònic entrat no és vàlid!');
            return;
        }

        //validacio de la contrasenya
        if (passwd_entrat.length < 6) {
            alert('La contrasenya és massa curta!');
            return;
        }

        //realitzar la peticio GET per verificar l'existencia de l'usuari
        try {
            const response = await fetch(`http://127.0.0.1:8000/login/${email_entrat}`);

            if (!response.ok) {
                throw new Error('Usuari no trobat');
            }

            //obtenim les dades de l'usuari
            const userData = await response.json();
            console.log("Dades de l'usuari:", userData); //depuracio


            function setCookie(name, value) {
                // Establecemos la cookie con path="/" para que esté disponible en todas las páginas del dominio.
                document.cookie = `${name}=${value}; path=/`;
            }

            //compara la contrasenya amb la de la base de dades
            if (userData.contrasenya === passwd_entrat) {
                alert('Sessió iniciada correctament!');

                document.cookie = `user_id=${userData.id_usuari}; path=/;`;
                document.cookie = `user_email=${userData.email}; path=/;`;
                document.cookie = `user_name=${userData.nom}; path=/;`;
                document.cookie = `user_type=${userData.tipus_usuaris}; path=/`;

                //desar dades de l'usuari en cookies
                setCookie('user_id', userData.id_usuari);
                setCookie('user_email', userData.email);
                setCookie('user_name', userData.nom);
                setCookie('user_type', userData.tipus_usuaris);


                //redirigir segons tipus d'usuari on 0 = comprador i 1 = venedor
                if (userData.tipus_usuaris === 0) {
                    window.location.href = 'comprador_menu_inici.html';
                } else if (userData.tipus_usuaris === 1) {
                    window.location.href = 'venedor_menu_inici.html';
                }
            } else {
                alert('Contrasenya incorrecta');
            }
        } catch (error) {
            alert('Error en el login: ' + error.message);
        }
    });
    
    //afegir el boto de inici de sessió al div corresponent
    document.getElementById('per_botons').appendChild(btn_inici_sessio);

    //crear el boto per recuperar la contrasenya
    const passwd_forget = document.createElement('span');
    passwd_forget.textContent = 'Has oblidat la contrasenya';
    passwd_forget.addEventListener('click', function() {
        window.location.href = 'contrasenya_oblidada.html';
    });
    document.getElementById('per_botons').appendChild(passwd_forget);
});