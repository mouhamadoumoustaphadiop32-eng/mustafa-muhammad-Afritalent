//annee dynamique
document.getElementById('annee').textContent=new Date().getFullYear();
//dark mode 
const darkmodebtn =document.createElement('button');
darkmodebtn.textContent='🌙';
darkmodebtn.className='mode-sombre';
darkmodebtn.style.cssText='background:purple; color:white; border:none; padding:10px 15px; border-radius:50%; cursor:pointer; margin-left:10px;';
const nav=document.querySelector('nav');
const rejoindrebtn=document.querySelector('nav button');
if(nav&&rejoindrebtn){
    rejoindrebtn.insertAdjacentElement('afterend',darkmodebtn);
}
if(localStorage.getItem('darkMode')==='enabled'){
        document.body.classList.add('dark-mode');
        darkmodebtn.textContent='☀️';
    }
darkmodebtn.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('darkMode','enabled');
        darkmodebtn.textContent='☀️';
    }else{
        localStorage.setItem('darkMode','disabled');
        darkmodebtn.textContent='🌙';
    }
});
//bouton retour
const retourenhaut=document.createElement('button');
retourenhaut.textContent='↑';
retourenhaut.className='retour-en-haut';
retourenhaut.style.cssText='position:fixed; bottom:20px; right:20px; background:purple; color:white; border:none; width:50px; height:50px; border-radius:50%; font-size:24px; cursor:pointer; display:none; z-index:1000;';
document.body.appendChild(retourenhaut);
window.addEventListener('scroll',() =>{
    if(window.scrollY > 300){
        retourenhaut.style.display='block';
    }else{
        retourenhaut.style.display='none';
    }
});
retourenhaut.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior: 'smooth'});
});
//c7
const cpt=document.querySelectorAll('.cartestatistique p:first-child,.hero-content p');
const animercpt=()=>{
    cpt.forEach(compteur=>{
        const texte=compteur.textContent;
        const valeur=parseInt(texte.replace(/[^0-9]/g,''));
        if(!isNaN(valeur)&& !compteur.dataset.anime){
            const rect=compteur.getBoundingClientRect();
            if(rect.top<window.innerHeight-100){
                compteur.dataset.anime='true';
                let actuel=0;
                const increment=valeur/50;
                const temps=setInterval(()=>{
                    actuel+=increment;
                    if(actuel>=valeur){
                        compteur.textContent=texte.replace(valeur,Math.floor(valeur));
                        clearInterval(temps);
                    }else{
                        compteur.textContent=texte.replace(valeur,Math.floor(actuel));
                    }
                },30);
            }
        }
    });
};
//animation scroll
const section=document.querySelectorAll('section,.hero,.bento-grid,.categories-grid');
const animation=()=>{
    section.forEach(section=>{
        const rect=section.getBoundingClientRect();
        if(rect.top<window.innerHeight-100){
            section.classList.add('visible');
        }
    });
};
//ajouter la class aux section
section.forEach(section=>{
    section.classList.add('fade-in');
});
//ecouter le scroll
window.addEventListener('scroll',()=>{
    animercpt();
    animation();
});
//declencher une fois au changement
animercpt();
animation();
//c8
//filtre des freelances
const filtrebtn=document.querySelectorAll('.filtre button');
const cartesfreelance=document.querySelectorAll('.cartefreelance');
if(filtrebtn.length>0){
    filtrebtn.forEach(btn=>{
        btn.addEventListener('click',()=>{
            const categorie=btn.textContent;
            cartesfreelance.forEach(carte=>{
                const specialite=carte.querySelector('p:first-of-type').textContent;
                if(categorie==='Tous' || specialite===categorie){
                    carte.style.display='block';
                }else{
                    carte.style.display='none';
                }
            });
        });
    });
}
//formulaire
const form=document.getElementById('formecontact');
if(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        let isValid = true;
        //validation du nom
        const nom=document.getElementById('nom');
        const nomErreur=document.getElementById('nomErreur');
        if(nom.value.trim()===''){
            nomErreur.textContent='Le nom est requis';
            isvalid=false;
        }else{
            nomErreur.textContent='';
        }
        //validation du prenom
        const prenom=document.getElementById('prenom');
        const prenomErreur=document.getElementById('prenomErreur');
        if(prenom.value.trim()===''){
            prenomErreur.textContent='Le prenom est requis';
            isvalid=false;
        }else{
            prenomErreur.textContent='';
        }
        // Validation de l'email
        const email = document.getElementById('email');
        const emailErreur = document.getElementById('emailErreur');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            emailErreur.textContent = 'L\'email est requis';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailErreur.textContent = 'Email invalide (ex: nom@domaine.com)';
            isValid = false;
        } else {
            emailErreur.textContent = '';
        }
         // Validation du message (minimum 20 caractères)
        const message = document.getElementById('message');
        const messageErreur = document.getElementById('messageErreur');
        if (message.value.trim().length < 20) {
            messageErreur.textContent = 'Le message doit contenir au moins 20 caractères';
            isValid = false;
        } else {
            messageErreur.textContent = '';
        }
        // Message de succès
        const messageSucces = document.getElementById('messageSucces');
        if (isValid) {
            messageSucces.textContent = '✅ Message envoyé avec succès ! Nous vous contacterons rapidement.';
            form.reset();
            setTimeout(() => {
                messageSucces.textContent = '';
            }, 5000);
        } else {
            messageSucces.textContent = '';
        }
    })
}