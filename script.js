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
        var minElt;
        var readElt;
        let nbComp = 0;
        let stock;
        let i = 0;



        function myLoop() {
            setTimeout(function() {
                //  your code here
                console.log(numbersElt.children[i]);
                console.log('i=' + i);
                minNumber = numbers[i];
                minElt = numbersElt.children[i];
                readElt = numbersElt.children[i];
                minElt.classList.add("min");
                readElt.classList.add("active");

                mySecondLoop(i + 1);

                //incrementation : bouclage ou fin - délayée d'un temps suffisant à la complétion de mySecondLoop
                setTimeout(function() {

                    i++;
                    if (i <= 8) {
                        myLoop();
                    } else {
                        console.log("I terminé!");

                    }
                }, (450 / speedElt.value) * (9 - i));
            }, 500 / speedElt.value);

        }

        function mySecondLoop(j) {

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

                    mySecondLoop(j);
                } else { //Fin ici
                    numbers[i - 1] = minNumber;
                    minElt.classList.remove("min");
                    let lastElt = numbersElt.lastChild;
                    setTimeout(() => {
                        lastElt.classList.remove("active")
                    }, 100);


                    numbersElt.children[i - 1].classList.add("done");
                    //Fin du prgm
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
            }, 500 / speedElt.value);
        }
        myLoop();
    }

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
    const selectText = "<br/><p>On parcours la liste en comparant un nombre avec tous les suivants.</p> <p>Si un nombre est plus petit que le nombre initialement comparé, c'est celui-ci qui est comparé avec le nombre suivant.</p> <p>Une fois toute la liste parcourue, on obtient forcément le nombre le plus petit de la liste, et on le place en début de liste.</p> <p>On recommence l'opération sans reparcourir les éléments déjà triés.</p> <br/> "
    const selectTextEnd = "<p>Ce chiffre est prévisible et demeure indépendant de la disposition des nombres </p> <p>Pour n nombres dans la liste, il y aura (n-1) parcours de la liste et (n-1)! comparaisons.</p> <br> <p>Vous n'avez rien compris 😄 ? Voici un <a href='https://www.youtube.com/watch?v=0-W8OEwLebQ' target='_blank' > lien vidéo</a> pour vous aider. </p>"

    const bubbleText = "<br><p>Prout</p>";

    //Variables
    let choice = 1;
    var step = 0;
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    speedElt.value = 2;
    descriptionElt.innerHTML = selectText;
    endTextElt.innerHTML = "Sélectionnez votre méthode de tri et mélangez !";
    createNumbers(numbers);

    //Events
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
                nextElt.innerHTML = "....Calculations...";
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

                nextElt.setAttribute("disabled", "true");
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

}




main();