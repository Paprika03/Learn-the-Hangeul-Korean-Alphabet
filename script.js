// script.js

// --- 1. DONNÉES DU JEU ---
const NIVEAU_1_VOYELLES = [
    { hangeul: 'ㅏ', roman: 'a' },
    { hangeul: 'ㅓ', roman: 'eo' },
    { hangeul: 'ㅗ', roman: 'o' },
    { hangeul: 'ㅜ', roman: 'ou' },
    { hangeul: 'ㅣ', roman: 'i' },
    { hangeul: 'ㅡ', roman: 'eu' }
];

const NIVEAU_2_CONSONNES = [
    { hangeul: 'ㄱ', roman: 'g / k' },
    { hangeul: 'ㄴ', roman: 'n' },
    { hangeul: 'ㄷ', roman: 'd / t' },
    { hangeul: 'ㄹ', roman: 'r / l' },
    { hangeul: 'ㅁ', roman: 'm' },
    { hangeul: 'ㅂ', roman: 'b / p' },
    { hangeul: 'ㅅ', roman: 's' },
    { hangeul: 'ㅇ', roman: 'ng' }, // ou silencieux au début
    { hangeul: 'ㅈ', roman: 'j' }
];

// --- 2. ÉLÉMENTS DU DOM (Référence à tous les éléments interactifs) ---
const menuPrincipal = document.getElementById('menu-principal');
const jeuMemory = document.getElementById('jeu-memory');
const jeuQuiz = document.getElementById('jeu-quiz');
const jeuSyllabe = document.getElementById('jeu-syllabe');

// Boutons du menu
const btnMemory = document.getElementById('btn-memory');
const btnQuiz = document.getElementById('btn-quiz');
const btnSyllabe = document.getElementById('btn-syllabe');

// Éléments du Mémory
const plateauJeuMemory = document.getElementById('plateau-jeu-memory');
const memoryPairesTrouveesEl = document.getElementById('memory-paires-trouvees');
const memoryResetButton = document.getElementById('memory-reset-button');
const memoryRetourMenuBtn = document.getElementById('memory-retour-menu');

// Éléments du Quiz
const quizScoreEl = document.getElementById('quiz-score');
const quizTimerEl = document.getElementById('quiz-timer');
const quizStartButton = document.getElementById('quiz-start-button');
const quizRetourMenuBtn = document.getElementById('quiz-retour-menu');
const quizCurrentCardEl = document.getElementById('quiz-current-card');
const quizMessageEl = document.getElementById('quiz-message');

// Éléments de la Pêche aux Syllabes
const syllabeCompteurEl = document.getElementById('syllabe-compteur');
const syllabePiocheButton = document.getElementById('syllabe-pioche-button');
const syllabeRetourMenuBtn = document.getElementById('syllabe-retour-menu');
const syllabeConsonneEl = document.getElementById('syllabe-consonne');
const syllabeVoyelleEl = document.getElementById('syllabe-voyelle');
const syllabeResultatEl = document.getElementById('syllabe-resultat');

// --- 3. FONCTIONS UTILITAIRES GLOBALES ---

/** Mélange un tableau (algorithme Fisher-Yates) */
function melanger(array) {
    const newArray = [...array]; // Crée une copie pour ne pas modifier l'original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/** Affiche un écran de jeu et cache les autres */
function afficherEcran(ecranToShow) {
    const ecrans = [menuPrincipal, jeuMemory, jeuQuiz, jeuSyllabe];
    ecrans.forEach(ecran => {
        if (ecran === ecranToShow) {
            ecran.classList.remove('hidden');
        } else {
            ecran.classList.add('hidden');
        }
    });
}

// --- 4. LOGIQUE DU MODE MÉNORY ---
let memoryPremiereCarte = null;
let memorySecondeCarte = null;
let memoryVerrouillerPlateau = false;
let memoryPairesTrouvees = 0;
const memoryTotalPaires = NIVEAU_1_VOYELLES.length;

function initialiserMemory() {
    memoryPairesTrouvees = 0;
    memoryPremiereCarte = null;
    memorySecondeCarte = null;
    memoryVerrouillerPlateau = false;
    plateauJeuMemory.innerHTML = '';
    memoryPairesTrouveesEl.textContent = `Paires : 0 / ${memoryTotalPaires}`;

    let cartes = [];
    NIVEAU_1_VOYELLES.forEach(paire => {
        cartes.push({ valeur: paire.hangeul, paireId: paire.roman });
        cartes.push({ valeur: paire.roman, paireId: paire.roman });
    });

    let cartesMelangees = melanger(cartes);

    cartesMelangees.forEach(item => {
        const carte = document.createElement('div');
        carte.classList.add('carte');
        carte.dataset.paireId = item.paireId;

        carte.innerHTML = `
            <div class="face">${item.valeur}</div>
            <div class="dos">?</div>
        `;
        carte.addEventListener('click', retournerCarteMemory);
        plateauJeuMemory.appendChild(carte);
    });
}

function retournerCarteMemory() {
    if (memoryVerrouillerPlateau) return;
    if (this === memoryPremiereCarte) return;

    this.classList.add('retournee');

    if (!memoryPremiereCarte) {
        memoryPremiereCarte = this;
        return;
    }

    memorySecondeCarte = this;
    memoryVerrouillerPlateau = true;

    verifierPaireMemory();
}

function verifierPaireMemory() {
    const estUnePaire = memoryPremiereCarte.dataset.paireId === memorySecondeCarte.dataset.paireId;

    if (estUnePaire) {
        memoryPairesTrouvees++;
        memoryPairesTrouveesEl.textContent = `Paires : ${memoryPairesTrouvees} / ${memoryTotalPaires}`;
        desactiverCartesMemory();
        verifierFinJeuMemory();
    } else {
        cacherCartesMemory();
    }
}

function desactiverCartesMemory() {
    memoryPremiereCarte.removeEventListener('click', retournerCarteMemory);
    memorySecondeCarte.removeEventListener('click', retournerCarteMemory);
    memoryPremiereCarte.classList.add('match');
    memorySecondeCarte.classList.add('match');
    reinitialiserTourMemory();
}

function cacherCartesMemory() {
    setTimeout(() => {
        memoryPremiereCarte.classList.remove('retournee');
        memorySecondeCarte.classList.remove('retournee');
        reinitialiserTourMemory();
    }, 1000);
}

function reinitialiserTourMemory() {
    [memoryPremiereCarte, memorySecondeCarte, memoryVerrouillerPlateau] = [null, null, false];
}

function verifierFinJeuMemory() {
    if (memoryPairesTrouvees === memoryTotalPaires) {
        setTimeout(() => {
            alert('Félicitations ! Vous avez maîtrisé le Mémory des Voyelles de Base ! 🎉');
        }, 500);
    }
}

// --- 5. LOGIQUE DU MODE QUIZ ÉCLAIR ---
let quizCartes = [];
let quizIndexCarteActuelle = 0;
let quizScore = 0;
let quizTimer;
const quizTempsParCarte = 3; // secondes
let quizTempsRestant;
let quizInterval;

function initialiserQuiz() {
    quizScore = 0;
    quizIndexCarteActuelle = 0;
    quizScoreEl.textContent = `Score : 0`;
    quizTimerEl.textContent = `Temps : ⌛`;
    quizMessageEl.textContent = '';
    quizCurrentCardEl.textContent = '?';
    quizStartButton.disabled = false;
    quizCartes = melanger(NIVEAU_1_VOYELLES.map(v => v.hangeul)); // On ne garde que le Hangeul
    if (quizInterval) clearInterval(quizInterval); // S'assurer qu'aucun timer ne tourne
}

function demarrerQuiz() {
    quizStartButton.disabled = true;
    quizScore = 0;
    quizIndexCarteActuelle = 0;
    quizScoreEl.textContent = `Score : 0`;
    quizMessageEl.textContent = '';
    prochaineCarteQuiz();
}

function prochaineCarteQuiz() {
    if (quizIndexCarteActuelle >= quizCartes.length) {
        finQuiz();
        return;
    }

    quizCurrentCardEl.textContent = quizCartes[quizIndexCarteActuelle];
    quizCurrentCardEl.classList.remove('correct', 'incorrect');
    quizMessageEl.textContent = '';
    quizTempsRestant = quizTempsParCarte;
    quizTimerEl.textContent = `Temps : ${quizTempsRestant}s`;

    if (quizInterval) clearInterval(quizInterval);
    quizInterval = setInterval(() => {
        quizTempsRestant--;
        quizTimerEl.textContent = `Temps : ${quizTempsRestant}s`;
        if (quizTempsRestant <= 0) {
            clearInterval(quizInterval);
            verifierReponseQuiz(null); // Temps écoulé
        }
    }, 1000);
}

// Fonction pour simuler la réponse de l'utilisateur (on pourrait ajouter un champ de saisie)
// Pour l'instant, c'est juste une démo, le joueur doit dire le son à voix haute.
function verifierReponseQuiz(reponseUtilisateur) {
    clearInterval(quizInterval); // Arrête le timer
    const carteActuelleHangeul = quizCartes[quizIndexCarteActuelle];
    const paireAttendue = NIVEAU_1_VOYELLES.find(v => v.hangeul === carteActuelleHangeul);

    // Dans un vrai jeu, l'utilisateur taperait la romanisation.
    // Ici, nous simulons la correction pour démonstration.
    // Le joueur doit dire la réponse à voix haute.
    // Pour que le jeu avance, on considérera toujours "correct" pour le moment.
    const estCorrect = true; // Placeholder: on assume que le joueur a dit la bonne réponse

    if (estCorrect) {
        quizScore++;
        quizScoreEl.textContent = `Score : ${quizScore}`;
        quizMessageEl.textContent = `Correct ! C'est "${paireAttendue.roman}"`;
        quizMessageEl.classList.add('correct');
        quizMessageEl.classList.remove('incorrect');
    } else {
        quizMessageEl.textContent = `Incorrect ! C'était "${paireAttendue.roman}"`;
        quizMessageEl.classList.add('incorrect');
        quizMessageEl.classList.remove('correct');
    }

    quizIndexCarteActuelle++;
    setTimeout(prochaineCarteQuiz, 1500); // Passe à la suivante après un délai
}

function finQuiz() {
    alert(`Quiz terminé ! Votre score final : ${quizScore} / ${quizCartes.length} 🎉`);
    initialiserQuiz(); // Réinitialise pour un nouveau jeu
}

// Pour le Quiz, nous avons besoin d'un moyen de passer à la carte suivante
// Pour le moment, on utilise un bouton de 'start' qui fait aussi office de 'next'
quizStartButton.addEventListener('click', () => {
    if (quizStartButton.textContent === 'Démarrer le Quiz') {
        demarrerQuiz();
        quizStartButton.textContent = 'Prochaine carte'; // Change le texte du bouton
    } else {
        // Si le quiz est déjà en cours, ce bouton permet de "passer"
        // On considère que le joueur a répondu (correctement pour l'instant)
        verifierReponseQuiz("dummy_response_correct"); // Simule une réponse correcte
    }
});


// --- 6. LOGIQUE DU MODE PÊCHE AUX SYLLABES ---
let syllabeCompteur = 0;
let syllabeConsonnesDisponibles = [];
let syllabeVoyellesDisponibles = [];

function initialiserSyllabe() {
    syllabeCompteur = 0;
    syllabeCompteurEl.textContent = `Syllabes : 0`;
    syllabeConsonnesDisponibles = melanger(NIVEAU_2_CONSONNES.map(c => c.hangeul));
    syllabeVoyellesDisponibles = melanger(NIVEAU_1_VOYELLES.map(v => v.hangeul));

    syllabeConsonneEl.textContent = '?';
    syllabeVoyelleEl.textContent = '?';
    syllabeResultatEl.textContent = '?';

    // Afficher une première pioche au démarrage
    piocherSyllabe();
}

function piocherSyllabe() {
    if (syllabeConsonnesDisponibles.length === 0 || syllabeVoyellesDisponibles.length === 0) {
        alert("Vous avez épuisé toutes les combinaisons de base ! Recommencez pour de nouvelles syllabes.");
        initialiserSyllabe();
        return;
    }

    const consonne = syllabeConsonnesDisponibles.shift(); // Prend le premier et le retire
    const voyelle = syllabeVoyellesDisponibles.shift();

    syllabeConsonneEl.textContent = consonne;
    syllabeVoyelleEl.textContent = voyelle;

    // La formation de la syllabe est simplifiée pour l'affichage
    // Normalement, il faudrait gérer la complexité des batchim et des jamo
    let resultat = consonne + voyelle;
    // Si la consonne est 'ㅇ' au début, elle est muette, donc on affiche juste la voyelle
    if (consonne === 'ㅇ') {
        resultat = voyelle;
    }
    syllabeResultatEl.textContent = resultat;

    syllabeCompteur++;
    syllabeCompteurEl.textContent = `Syllabes : ${syllabeCompteur}`;

    // On réapprovisionne les cartes si besoin pour continuer à piocher
    if (syllabeConsonnesDisponibles.length === 0) {
        syllabeConsonnesDisponibles = melanger(NIVEAU_2_CONSONNES.map(c => c.hangeul));
    }
    if (syllabeVoyellesDisponibles.length === 0) {
        syllabeVoyellesDisponibles = melanger(NIVEAU_1_VOYELLES.map(v => v.hangeul));
    }
}


// --- 7. GESTION DES ÉVÉNEMENTS (LIENS ENTRE HTML et JS) ---

// --- Menu Principal ---
btnMemory.addEventListener('click', () => {
    afficherEcran(jeuMemory);
    initialiserMemory();
});

btnQuiz.addEventListener('click', () => {
    afficherEcran(jeuQuiz);
    initialiserQuiz();
});

btnSyllabe.addEventListener('click', () => {
    afficherEcran(jeuSyllabe);
    initialiserSyllabe();
});

// --- Mémory ---
memoryResetButton.addEventListener('click', initialiserMemory);
memoryRetourMenuBtn.addEventListener('click', () => {
    afficherEcran(menuPrincipal);
});

// --- Quiz ---
quizStartButton.addEventListener('click', () => {
    // Si le quiz est déjà démarré, le bouton agit comme un "passer"
    if (quizStartButton.textContent === 'Démarrer le Quiz') {
        demarrerQuiz();
        quizStartButton.textContent = 'Prochaine carte';
    } else {
        // Pour l'instant, on considère que le joueur a répondu correctement pour avancer
        verifierReponseQuiz('correct_dummy_response');
    }
});
quizRetourMenuBtn.addEventListener('click', () => {
    // Arrêter le timer avant de quitter le mode
    if (quizInterval) clearInterval(quizInterval);
    afficherEcran(menuPrincipal);
});


// --- Pêche aux Syllabes ---
syllabePiocheButton.addEventListener('click', piocherSyllabe);
syllabeRetourMenuBtn.addEventListener('click', () => {
    afficherEcran(menuPrincipal);
});

// --- DÉMARRAGE DU JEU ---
afficherEcran(menuPrincipal); // Affiche le menu au chargement de la page