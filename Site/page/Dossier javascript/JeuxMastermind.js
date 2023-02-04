let tab1=new Array(4);// tableau où est rangée la solution
let tab2=new Array(4);// tableau où on teste different code pour trouver la solution

let nb_test = 0;

function changerCouleur(Classname, tableau) { // choisir une couleur et enregistrer dans les tableaux
    let c = prompt("Donner une couleur : ");
    if (c === "y" || c === "yellow") c = "yellow";
    else if (c === "r" || c === "red") c = "red";
    else if (c === "g" || c === "green") c = "green";
    else if (c === "b" || c === "blue") c = "blue";
    else if (c === "p" || c === "purple") c = "purple";
    else if (c === "o" || c === "orange") c = "orange";
    else return
    //console.log(c)
    //var quad = document.querySelector(".c31");
    const quad = document.querySelector(Classname);
    quad.style.backgroundColor = c; // applique la couleur
    if (tableau === 1) { // enregistrer la couleur dans les tableaux
        tab1[Classname.slice(2)-29] = c // ".c31" => "31" puis on enlève 29 pour que ce soit comprit entre 0 et 4
    } else {
        tab2[Classname.slice(2)-25] = c
    }
}

// on récupère les éléments (div ou boutton)
let ButtonStart = document.getElementById("ButtonStart")
let ButtonValider = document.getElementById("ButtonValider")
let ChoixCode = document.querySelector(".ChoixCode")
let ValiderCode = document.querySelector(".ValiderCode")

ButtonStart.addEventListener("click", function() { // toggle l'affichage choix et valider code
    if (tab1[0] && tab1[1] && tab1[2] && tab1[3]){ // 4 éléments du tableau définit
        if (getComputedStyle(ChoixCode).display !== 'none'){ // on désactive choixCode
            ChoixCode.style.display="none";
            ValiderCode.style.display="block";
            for (let i=29; i<=32; i++) document.querySelector(".c"+i).style.backgroundColor = "white";
        }
    }
})

ButtonValider.addEventListener("click", function (){
    // test pour faire que si les 4 couleurs sont données
    if (tab2[0] && tab2[1] && tab2[2] && tab2[3]) {
        for (let i = 0; i < 4; i++) {
            //console.log(".c" + (25 + i + 4*nb_test))
            // copier tab2 dans .c
            document.querySelector(".c" + (1 + i + 4*nb_test)).style.backgroundColor = tab2[i]
            if (tab1[i] === tab2[i]) { // bonne position
                document.querySelector(".po" + (1 + i + 4*nb_test)).style.backgroundColor = 'green'
            } else if (tab1.includes(tab2[i])) { // mauvaise position
                document.querySelector(".po" + (1 + i + 4*nb_test)).style.backgroundColor = 'orange'
            } else { // pas de couleur présente
                document.querySelector(".po" + (1 + i + 4*nb_test)).style.backgroundColor = "red"
            }
            let query = document.querySelector(".c" + (i + 25))
            //console.log("query", query)
            if (query) query.style.backgroundColor = 'white' // reset color
        }
        nb_test++;
        if(compareArrays(tab1,tab2)){ // victoire
            alert("Vous avez gagné !!!!!")
            reset()
        }
        else if(nb_test>5){ // défaite
            alert("Vous avez perdu !!!!!")
            reset()
        }
        tab2 = new Array(4); // reset tab2
    }
})

function compareArrays(tab1, tab2) {
    if (tab1.length !== tab2.length) {
        return false;
    }
    for (let i = 0; i < tab1.length; i++) {
        if (tab1[i] !== tab2[i]) {
            return false;
        }
    }
    return true;
}

function reset(){
    tab1 = new Array(4)
    nb_test = 0
    for (let i=1; i<=24; i++){
        document.querySelector(".c"+i).style.backgroundColor = "white"
        document.querySelector(".po"+i).style.backgroundColor = "white"
    }
    ChoixCode.style.display = "block";
    ValiderCode.style.display="none";
}

for(let i=1; i<=6; i++){ // historique partie gauche
    const div = document.createElement('div')
    div.classList.add('e'+i)
    for(let j=1; j<=4; j++){
        div.innerHTML += `
            <div class="c${(i-1)*4+j}"></div>
        `;
    }
    document.getElementById("historique").appendChild(div)
}

for(let i=1; i<=6; i++){ // historique partie droite
    const div = document.createElement('div')
    div.classList.add('s'+i)
    for(let j=1; j<=4; j++){ //<div>...</div> innerHTML écrit dans les ...
        div.innerHTML += `
            <div class="po${(i-1)*4+j}"></div>
        `;
    }
    document.getElementById("historique").appendChild(div)
}

for (let i=25; i<=28; i++){ // ValiderCode
    const div = document.createElement('div')
    div.onclick = () => changerCouleur('.c'+i,2)
    div.innerHTML = `
                  <div class="c${i} ChoisirCode">
                  </div>
                `;
    document.getElementById("groupe-valide").appendChild(div)
}

for (let i=29; i<=32; i++){ // ChoixCode
    const div = document.createElement('div')
    div.onclick = () => changerCouleur('.c'+i,1)
    div.innerHTML = `
                  <div class="c${i} ChoisirCode">  
                  </div>
                `;
    document.getElementById("groupe-couleurs").appendChild(div)
}

