//Fonction pour mélanger les éléments d'une liste
const randomizeTab = (tab) => {
    let i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}

function main() {

    //variables du DOM
    const numbersElt = document.getElementById("numbers");
    const nextElt = document.getElementById("next");
    const endTextElt = document.getElementById("end-text");
    const titleElt = document.getElementById("title");
    const descriptionElt = document.getElementById("description");
    titleElt.innerHTML = "select";
    const textElt = document.querySelector(".description");
    const selectElt = document.querySelector(".btn-select");
    const bubbleElt = document.querySelector(".btn-bubble");
    const speedElt = document.getElementById("speed");
    //textes
    const selectText = "<br/><p>On parcourt la liste en comparant un nombre avec tous les suivants.</p> <p>Si un nombre est plus petit que le nombre initialement comparé, c'est celui-ci qui est comparé avec le nombre suivant.</p> <p>Une fois toute la liste parcourue, on obtient forcément le nombre le plus petit de la liste, et on le place en début de liste.</p> <p>On recommence l'opération sans reparcourir les éléments déjà triés.</p> <br/> "
    const selectTextEnd = "<p>Ce chiffre est variable selon le nombre d'éléments à comparer et demeure indépendant de la disposition des nombres. </p> <p>Pour n nombres dans la liste, il y aura (n-1) parcours de la liste et (n-1)! comparaisons.</p> <br> <p>Vous n'avez rien compris 😄 ? Voici un <a href='https://www.youtube.com/watch?v=0-W8OEwLebQ' target='_blank' > lien vidéo</a> pour vous aider. </p>"
    const bubbleText = "<br><p>On parcourt la liste en comparant les éléments côtes à côtes. On les intervertit de façon à déplacer le plus gros nombre vers la fin de la liste. </p> <p> Lorsque plus aucun élément n'interchange avec un autre, c'est que tout est remis en ordre. </p>";
    const bubbleTextEnd = "<br><p>Ce chiffre peut varier selon la disposition des nombres au lancement ; la résolution peut être ainsi plus ou moins longue ! </p><br><p> Si vous n'avez rien compris 😄 , voici un <a href='https://www.youtube.com/watch?v=lyZQPjUT5B4' target='_blank' > lien vidéo</a> pour vous aider. </p>";
    //Variables
    let choice = 1;
    var step = 0;
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    speedElt.value = 2;
    descriptionElt.innerHTML = selectText;
    endTextElt.innerHTML = "Sélectionnez votre méthode de tri et mélangez !";
    createNumbers(numbers);
    //Events click boutons haut-gauche
    selectElt.addEventListener("click", () => {
        step = 0;
        choice = 1;
        titleElt.innerHTML = "select";
        textElt.innerHTML = selectText;
        selectElt.setAttribute("disabled", "true");
        bubbleElt.removeAttribute("disabled");

    });
    bubbleElt.addEventListener("click", () => {
        step = 0;
        choice = 2;
        titleElt.innerHTML = "bubble";
        textElt.innerHTML = bubbleText;
        bubbleElt.setAttribute("disabled", "true");
        selectElt.removeAttribute("disabled");

    });
    //event bouton bas
    nextElt.addEventListener("click", () => {
        switch (step) {
            case 0:
                nextElt.innerHTML = "Start";

                selectElt.setAttribute("disabled", "true");
                bubbleElt.setAttribute("disabled", "true");
                speedElt.setAttribute("disabled", "true");
                endTextElt.innerHTML = 'Mélange effectué. Vous pouvez lancer ! ';
                randomizeTab(numbers);
                fillNumbers(numbers);
                step++;
                break;
            case 1:
                nextElt.innerHTML = "....Calculs...";
                nextElt.setAttribute("disabled", "true");
                //LANCER L ANIM
                switch (choice) {
                    case 1:
                        selectSort(numbers);

                        break;
                    case 2:
                        bubbleSort(numbers);
                        break;
                    case 1:
                        sortSort(numbers);
                        break;

                    default:
                        console.log("erreur");
                        break;
                }
                break;
            case 2:
                endTextElt.innerHTML = "Sélectionnez votre méthode de tri et mélangez !";
                nextElt.innerHTML = "Mélangez";
                numbersElt.innerHTML = '';
                switch (choice) {
                    case 1:
                        descriptionElt.innerHTML = selectText;
                        bubbleElt.removeAttribute("disabled");
                        break;
                    case 2:
                        descriptionElt.innerHTML = bubbleText;
                        selectElt.removeAttribute("disabled");
                        break;
                    default:
                        break;
                }
                createNumbers(numbers);
                step = 0;
                break
            default:
                console.log("error");
                break;
        }
    })


    //Création des blocs
    function createNumbers(liste) {
        for (const number of liste) {
            const newBlocElt = document.createElement("li");
            numbersElt.appendChild(newBlocElt);
        }
        fillNumbers(liste);
    }

    //Afficher les bloc / chiffres
    function fillNumbers(liste) {
        for (const number of liste) {
            numbersElt.children[number].innerHTML = liste[number];
        }
    }

    // =============================== Select sort ========================================
    function selectSort(numbers) {
        let minNumber;
        let readNumber;
        let minElt;
        let readElt;
        let nbComp = 0;
        let stock;
        let i = 0;

        myBigLoop();

        function myBigLoop() {
            setTimeout(function() {
                //  your code here
                console.log(numbersElt.children[i]);
                console.log('i=' + i);
                minNumber = numbers[i];
                minElt = numbersElt.children[i];
                readElt = numbersElt.children[i];
                minElt.classList.add("min");
                readElt.classList.add("active");

                myShortLoop(i + 1);

                //incrementation : bouclage ou fin - délayée d'un temps suffisant à la complétion de myShortLoop
                setTimeout(function() {

                    i++;
                    if (i <= 8) {
                        myBigLoop();
                    } else {
                        console.log("I terminé!");

                    }
                }, (900 / speedElt.value) * (9 - i));
            }, 1000 / speedElt.value);

        }

        function myShortLoop(j) {

            setTimeout(function() {
                //  code here
                nbComp++;
                readNumber = numbers[j - 1];

                console.log('j=' + j);
                console.log(minNumber);
                console.log(readNumber);

                readElt.classList.remove("active");
                readElt = numbersElt.children[j];
                readElt.classList.add("active");
                if (numbers[j] < minNumber) {

                    stock = minNumber;
                    minNumber = numbers[j];
                    minElt.classList.remove("min");
                    minElt = numbersElt.children[j];
                    minElt.classList.add("min");
                    numbers[j] = stock;

                } else {

                }
                // incrementation : bouclage ou fin
                j++;

                if (j <= 9) {

                    myShortLoop(j);
                } else { //Fin ici
                    numbers[i - 1] = minNumber;
                    minElt.classList.remove("min");
                    let lastElt = numbersElt.lastChild;
                    setTimeout(() => {
                        lastElt.classList.remove("active")
                    }, 200);


                    numbersElt.children[i - 1].classList.add("done");
                    //Fin du tri
                    if (i === (numbers.length) - 1) {
                        numbersElt.children[i].classList.add("done");
                        nextElt.removeAttribute("disabled");
                        endTextElt.innerHTML = "Fini !";
                        nextElt.innerHTML = "Redémarrer";
                        descriptionElt.innerHTML = "<br><p> L'algorithme a effectué <strong>" + nbComp + "</strong> comparaisons </p>" + selectTextEnd;
                        step = 2;
                        speedElt.removeAttribute("disabled");

                    }
                    fillNumbers(numbers);


                    console.log("J terminé!");
                    console.log("Tri :")
                    console.log(numbers);
                    console.log('Nombre de comparaisons : ' + nbComp);

                }
            }, 1000 / speedElt.value);
        }

    }

    function bubbleSort(numbers) {


        let readElt;
        let readElt2;
        let stock;
        let inOrder;
        let nbComp = 0;
        let lastsOk = 0;
        let i = 0;

        myBigLoop();

        function myBigLoop() {
            inOrder = true;
            myShortLoop();
        }


        function myShortLoop() {

            readElt = numbersElt.children[i];
            if (numbersElt.children[i] !== numbersElt.lastChild) {
                readElt2 = numbersElt.children[i + 1];
            }
            readElt.classList.add("active", "true");
            readElt2.classList.add("active", "true");
            setTimeout(function() {
                nbComp++;
                i++;
                readElt.classList.remove("active");

                //Comparaison de 2 éléments ( le lu et celui d'avant )
                if (numbers[i - 1] > numbers[i]) {
                    inOrder = false;
                    //Inversion de 2 éléments  
                    stock = numbers[i - 1];
                    numbers[i - 1] = numbers[i];
                    numbers[i] = stock;
                    readElt.classList.add("swap");
                    readElt2.classList.add("swap");
                    fillNumbers(numbers);
                } else { // On regarde si les 2 derniers éléments sont bien  triés pour réduire la liste
                    if (i === (numbers.length - 1 - lastsOk)) {
                        lastsOk++;
                        numbersElt.children[i - 1].classList.add("done");
                    }
                }
                // Liste pas entièrement lue 
                if (i < numbers.length - 1 - lastsOk) {
                    myShortLoop();
                } else { //Liste entièrement lue
                    lastsOk++;
                    numbersElt.children[i].classList.add("done");
                    numbersElt.childNodes.forEach(el => {
                        el.classList.remove("swap");
                        el.classList.remove("active");
                    })
                    console.log(inOrder);
                    //Si en désordre on recommence une boucle, sinon on donne le résultat
                    if (!inOrder) {
                        i = 0;
                        myBigLoop();
                    } else {
                        //Tri fini
                        numbersElt.childNodes.forEach(el => {
                            el.classList.add("done");
                        })
                        nextElt.removeAttribute("disabled");
                        endTextElt.innerHTML = "Fini !";
                        nextElt.innerHTML = "Redémarrer";
                        descriptionElt.innerHTML = "<br><p> L'algorithme a effectué <strong>" + nbComp + "</strong> comparaisons </p>" + bubbleTextEnd;
                        step = 2;
                        speedElt.removeAttribute("disabled");
                    }
                }

            }, 1000 / speedElt.value);
        }
    }

}




main();