//botons de inici i de registre de nou usuari
const btn_inici = document.createElement('button');
btn_inici.textContent = 'Inici de sessió';
btn_inici.addEventListener('click', function(){
    window.location.href = 'inici_sessio.html';
});
document.getElementById('per_botons').appendChild(btn_inici); 


const btn_registre = document.createElement('button');
btn_registre.textContent = 'Nou usuari';
btn_registre.addEventListener('click', function(){
    window.location.href = 'nou_usuari.html';
});
document.getElementById('per_botons').appendChild(btn_registre);

//definim la imatge
const img = document.createElement('img');
img.src = 'imatges_angel/logo2.jpg';
img.alt = 'Local Connect';
document.getElementById('per_imatge').appendChild(img);