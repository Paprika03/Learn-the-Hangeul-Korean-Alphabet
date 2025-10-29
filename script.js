// script.js

// --- 0. TRADUCTIONS (i18n) ---
const translations = {
    fr: {
        // Menu Principal
        main_title: "🇰🇷 Apprenez le Hangeul en vous amusant !",
        menu_subtitle: "Choisissez un mode de jeu :",
        menu_memory: "🧠 Mémory (Niveau 1)",
        menu_quiz: "⚡ Quiz Éclair (Niveau 1)",
        menu_syllable: "🎣 Pêche aux Syllabes (Niveaux 1 & 2)",
        menu_vocab: "📚 Dictionnaire Hangeul",
        menu_description: "Sélectionnez un mode pour commencer l'apprentissage !",
        // Boutons
        btn_restart: "Recommencer",
        btn_menu: "Menu Principal",
        btn_start_quiz: "Démarrer le Quiz",
        btn_next_card: "Prochaine carte",
        btn_draw: "Piocher",
        // Textes de jeu
        pairs_found: "Paires",
        score: "Score",
        time_left: "Temps",
        syllables_built: "Syllabes",
        // Mode Mémory
        memory_title: "🧠 Mémory Hangeul (Voyelles de Base)",
        memory_desc: "Associez le caractère Hangeul à sa romanisation.",
        memory_congrats: "Félicitations ! Vous avez maîtrisé le Mémory des Voyelles de Base ! 🎉",
        // Mode Quiz
        quiz_title: "⚡ Quiz Éclair (Voyelles de Base)",
        quiz_desc: "Dites le son du caractère avant que le temps ne s'écoule !",
        quiz_correct: "Correct ! C'est",
        quiz_incorrect: "Incorrect ! C'était",
        quiz_complete: "Quiz terminé ! Votre score final :",
        // Mode Syllabe
        syllable_title: "🎣 Pêche aux Syllabes (Voyelles & Consonnes)",
        syllable_desc: "Formez des syllabes simples avec les cartes piochées.",
        syllable_info: 'Dites la syllabe à voix haute (ici : "Ga")',
        syllable_all_drawn: "Vous avez épuisé toutes les combinaisons de base ! Recommencez pour de nouvelles syllabes.",
        // Dictionnaire
        vocab_title: "📚 Dictionnaire Hangeul",
        vocab_consonants_basic: "Consonnes de base (14)",
        vocab_consonants_double: "Consonnes doubles (5)",
        vocab_vowels_basic: "Voyelles de base (10)",
        vocab_vowels_compound: "Voyelles composées (11)",
        vocab_phrases: "Phrases et Mots de Base",
        vocab_hangeul: "Hangeul",
        vocab_roman: "Romanisation",
        vocab_meaning: "Signification",
        // Données des phrases (pour génération dynamique)
        vocab_data: [
            { h: "네", r: "Ne", m: "Oui" },
            { h: "아니요", r: "Aniyo", m: "Non" },
            { h: "안녕하세요", r: "Annyeonghaseyo", m: "Bonjour (formel)" },
            { h: "감사합니다", r: "Gamsahamnida", m: "Merci (formel)" },
            { h: "죄송합니다", r: "Joesonghamnida", m: "Désolé (formel)" },
            { h: "주세요", r: "Juseyo", m: "Donnez-moi, s'il vous plaît" },
            { h: "물", r: "Mul", m: "Eau" },
            { h: "커피", r: "Keopi", m: "Café" },
            { h: "이거 뭐예요?", r: "Igeo mwoyeyo?", m: "Qu'est-ce que c'est ?" },
            { h: "안녕히 가세요", r: "Annyeonghi gaseyo", m: "Au revoir (à qqn qui part)" },
            { h: "안녕히 계세요", r: "Annyeonghi gyeseyo", m: "Au revoir (à qqn qui reste)" },
        ]
    },
    en: {
        // Main Menu
        main_title: "🇰🇷 Learn Hangeul with Fun!",
        menu_subtitle: "Choose a game mode:",
        menu_memory: "🧠 Memory Game (Level 1)",
        menu_quiz: "⚡ Flash Quiz (Level 1)",
        menu_syllable: "🎣 Syllable Builder (Level 1 & 2)",
        menu_vocab: "📚 Hangeul Dictionary",
        menu_description: "Select a mode to start learning!",
        // Buttons
        btn_restart: "Restart",
        btn_menu: "Main Menu",
        btn_start_quiz: "Start Quiz",
        btn_next_card: "Next Card",
        btn_draw: "Draw",
        // Game Text
        pairs_found: "Pairs",
        score: "Score",
        time_left: "Time",
        syllables_built: "Syllables",
        // Memory Mode
        memory_title: "🧠 Hangeul Memory (Basic Vowels)",
        memory_desc: "Match the Hangeul character to its romanization.",
        memory_congrats: "Congratulations! You've mastered the Basic Vowels Memory Game! 🎉",
        // Quiz Mode
        quiz_title: "⚡ Flash Quiz (Basic Vowels)",
        quiz_desc: "Say the character's sound before the time runs out!",
        quiz_correct: "Correct! It's",
        quiz_incorrect: "Incorrect! It was",
        quiz_complete: "Quiz complete! Your final score:",
        // Syllable Mode
        syllable_title: "🎣 Syllable Builder (Vowels & Consonants)",
        syllable_desc: "Form simple syllables with the drawn cards.",
        syllable_info: 'Say the syllable out loud (e.g., "Ga")',
        syllable_all_drawn: "You've used all basic combinations! Restarting for new syllables.",
        // Dictionary
        vocab_title: "📚 Hangeul Dictionary",
        vocab_consonants_basic: "Basic Consonants (14)",
        vocab_consonants_double: "Double Consonants (5)",
        vocab_vowels_basic: "Basic Vowels (10)",
        vocab_vowels_compound: "Compound Vowels (11)",
        vocab_phrases: "Basic Words and Phrases",
        vocab_hangeul: "Hangeul",
        vocab_roman: "Romanization",
        vocab_meaning: "Meaning",
        // Phrase Data (for dynamic generation)
        vocab_data: [
            { h: "네", r: "Ne", m: "Yes" },
            { h: "아니요", r: "Aniyo", m: "No" },
            { h: "안녕하세요", r: "Annyeonghaseyo", m: "Hello (formal)" },
            { h: "감사합니다", r: "Gamsahamnida", m: "Thank you (formal)" },
            { h: "죄송합니다", r: "Joesonghamnida", m: "Sorry (formal)" },
            { h: "주세요", r: "Juseyo", m: "Please give me" },
            { h: "물", r: "Mul", m: "Water" },
            { h: "커피", r: "Keopi", m: "Coffee" },
            { h: "이거 뭐예요?", r: "Igeo mwoyeyo?", m: "What is this?" },
            { h: "안녕히 가세요", r: "Annyeonghi gaseyo", m: "Goodbye (to someone leaving)" },
            { h: "안녕히 계세요", r: "Annyeonghi gyeseyo", m: "Goodbye (to someone staying)" },
        ]
    }
};

let currentLanguage = 'fr'; // Langue par défaut

// --- 1. DONNÉES DU JEU (Universelles) ---
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
    { hangeul: 'ㅇ', roman: 'ng' },
    { hangeul: 'ㅈ', roman: 'j' }
];

// --- 2. ÉLÉMENTS DU DOM ---
const langFrButton = document.getElementById('lang-fr');
const langEnButton = document.getElementById('lang-en');

const menuPrincipal = document.getElementById('menu-principal');
const jeuMemory = document.getElementById('jeu-memory');
const jeuQuiz = document.getElementById('jeu-quiz');
const jeuSyllabe = document.getElementById('jeu-syllabe');
const ecranVocab = document.getElementById('ecran-vocab');

// ... (tous les autres éléments comme avant) ...
const btnMemory = document.getElementById('btn-memory');
const btnQuiz = document.getElementById('btn-quiz');
const btnSyllabe = document.getElementById('btn-syllabe');
const btnVocab = document.getElementById('btn-vocab');

// Mémory
const plateauJeuMemory = document.getElementById('plateau-jeu-memory');
const memoryPairesTrouveesEl = document.getElementById('memory-paires-trouvees');
const memoryResetButton = document.getElementById('memory-reset-button');
const memoryRetourMenuBtn = document.getElementById('memory-retour-menu');

// Quiz
const quizScoreEl = document.getElementById('quiz-score');
const quizTimerEl = document.getElementById('quiz-timer');
const quizStartButton = document.getElementById('quiz-start-button');
const quizRetourMenuBtn = document.getElementById('quiz-retour-menu');
const quizCurrentCardEl = document.getElementById('quiz-current-card');
const quizMessageEl = document.getElementById('quiz-message');

// Syllabe
const syllabeCompteurEl = document.getElementById('syllabe-compteur');
const syllabePiocheButton = document.getElementById('syllabe-pioche-button');
const syllabeRetourMenuBtn = document.getElementById('syllabe-retour-menu');
const syllabeConsonneEl = document.getElementById('syllabe-consonne');
const syllabeVoyelleEl = document.getElementById('syllabe-voyelle');
const syllabeResultatEl = document.getElementById('syllabe-resultat');

// Vocabulaire
const vocabRetourMenuBtn = document.getElementById('vocab-retour-menu');
// ... (juste après la ligne 'const vocabRetourMenuBtn = ...')
const mainTitleButton = document.getElementById('main-title-button'); // NOUVEAU
const vocabTablePhrasesBody = document.querySelector('#vocab-table-phrases tbody');


// --- 3. FONCTIONS UTILITAIRES GLOBALES ---

/** Change la langue de l'application */
function setLanguage(lang) {
    if (lang !== 'fr' && lang !== 'en') return;
    currentLanguage = lang;

    // Met à jour les boutons de langue
    langFrButton.classList.toggle('active', lang === 'fr');
    langEnButton.classList.toggle('active', lang === 'en');
    document.documentElement.lang = lang; // Met à jour l'attribut lang de la page

    // Traduit tous les éléments statiques avec data-lang-key
    const elementsToTranslate = document.querySelectorAll('[data-lang-key]');
    elementsToTranslate.forEach(el => {
        const key = el.dataset.langKey;
        if (translations[lang][key]) {
            // Gère les textes dynamiques qui ont un texte par défaut
            if (el.id === 'memory-paires-trouvees' || el.id === 'quiz-score' || el.id === 'quiz-timer' || el.id === 'syllabe-compteur') {
                el.textContent = el.dataset.defaultText.replace(/^[a-zA-ZÀ-ú\s]+/, translations[lang][key]);
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Génère dynamiquement la table des phrases du dictionnaire
    generateVocabPhraseTable();
}

/** Génère la table des phrases du dictionnaire dans la langue actuelle */
function generateVocabPhraseTable() {
    const langData = translations[currentLanguage].vocab_data;
    vocabTablePhrasesBody.innerHTML = ''; // Vide la table
    
    langData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.h}</td>
            <td>${item.r}</td>
            <td>${item.m}</td>
        `;
        vocabTablePhrasesBody.appendChild(row);
    });
}

/** Mélange un tableau */
function melanger(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/** Affiche un écran de jeu et cache les autres */
function afficherEcran(ecranToShow) {
    const ecrans = [menuPrincipal, jeuMemory, jeuQuiz, jeuSyllabe, ecranVocab];
    ecrans.forEach(ecran => {
        ecran.classList.toggle('hidden', ecran !== ecranToShow);
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
    // Texte dynamique traduit
    memoryPairesTrouveesEl.textContent = `${translations[currentLanguage].pairs_found} : 0 / ${memoryTotalPaires}`;
    memoryPairesTrouveesEl.dataset.defaultText = memoryPairesTrouveesEl.textContent; // Met à jour le texte par défaut pour setLanguage

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
        carte.innerHTML = `<div class="face">${item.valeur}</div><div class="dos">?</div>`;
        carte.addEventListener('click', retournerCarteMemory);
        plateauJeuMemory.appendChild(carte);
    });
}

function retournerCarteMemory() {
    if (memoryVerrouillerPlateau || this === memoryPremiereCarte) return;
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
        // Texte dynamique traduit
        memoryPairesTrouveesEl.textContent = `${translations[currentLanguage].pairs_found} : ${memoryPairesTrouvees} / ${memoryTotalPaires}`;
        desactiverCartesMemory();
        verifierFinJeuMemory();
    } else {
        cacherCartesMemory();
    }
}

function desactiverCartesMemory() {
    memoryPremiereCarte.removeEventListener('click', retournerCarteMemory);
    secondeCarte.removeEventListener('click', retournerCarteMemory);
    memoryPremiereCarte.classList.add('match');
    secondeCarte.classList.add('match');
    reinitialiserTourMemory();
}

function cacherCartesMemory() {
    setTimeout(() => {
        memoryPremiereCarte.classList.remove('retournee');
        secondeCarte.classList.remove('retournee');
        reinitialiserTourMemory();
    }, 1000);
}

function reinitialiserTourMemory() {
    [memoryPremiereCarte, memorySecondeCarte, memoryVerrouillerPlateau] = [null, null, false];
}

function verifierFinJeuMemory() {
    if (memoryPairesTrouvees === memoryTotalPaires) {
        setTimeout(() => {
            // Alerte traduite
            alert(translations[currentLanguage].memory_congrats);
        }, 500);
    }
}

// --- 5. LOGIQUE DU MODE QUIZ ÉCLAIR ---
let quizCartes = [];
let quizIndexCarteActuelle = 0;
let quizScore = 0;
const quizTempsParCarte = 3;
let quizTempsRestant;
let quizInterval;

function initialiserQuiz() {
    quizScore = 0;
    quizIndexCarteActuelle = 0;
    // Textes dynamiques traduits
    quizScoreEl.textContent = `${translations[currentLanguage].score} : 0`;
    quizTimerEl.textContent = `${translations[currentLanguage].time_left} : ⌛`;
    quizScoreEl.dataset.defaultText = quizScoreEl.textContent;
    quizTimerEl.dataset.defaultText = quizTimerEl.textContent;
    
    quizMessageEl.textContent = '';
    quizCurrentCardEl.textContent = '?';
    quizStartButton.disabled = false;
    quizStartButton.textContent = translations[currentLanguage].btn_start_quiz;
    quizCartes = melanger(NIVEAU_1_VOYELLES.map(v => v.hangeul));
    if (quizInterval) clearInterval(quizInterval);
}

function demarrerQuiz() {
    quizStartButton.disabled = true;
    quizScore = 0;
    quizIndexCarteActuelle = 0;
    quizScoreEl.textContent = `${translations[currentLanguage].score} : 0`;
    quizMessageEl.textContent = '';
    quizStartButton.textContent = translations[currentLanguage].btn_next_card;
    prochaineCarteQuiz();
}

function prochaineCarteQuiz() {
    if (quizIndexCarteActuelle >= quizCartes.length) {
        finQuiz();
        return;
    }

    quizCurrentCardEl.textContent = quizCartes[quizIndexCarteActuelle];
    quizMessageEl.textContent = '';
    quizMessageEl.classList.remove('correct', 'incorrect');
    quizTempsRestant = quizTempsParCarte;
    quizTimerEl.textContent = `${translations[currentLanguage].time_left} : ${quizTempsRestant}s`;

    if (quizInterval) clearInterval(quizInterval);
    quizInterval = setInterval(() => {
        quizTempsRestant--;
        quizTimerEl.textContent = `${translations[currentLanguage].time_left} : ${quizTempsRestant}s`;
        if (quizTempsRestant <= 0) {
            clearInterval(quizInterval);
            verifierReponseQuiz(null);
        }
    }, 1000);
}

function verifierReponseQuiz(reponseUtilisateur) {
    clearInterval(quizInterval);
    const carteActuelleHangeul = quizCartes[quizIndexCarteActuelle];
    const paireAttendue = NIVEAU_1_VOYELLES.find(v => v.hangeul === carteActuelleHangeul);

    // Simulation de réponse correcte
    const estCorrect = true; 

    if (estCorrect) {
        quizScore++;
        quizScoreEl.textContent = `${translations[currentLanguage].score} : ${quizScore}`;
        // Message traduit
        quizMessageEl.textContent = `${translations[currentLanguage].quiz_correct} "${paireAttendue.roman}"`;
        quizMessageEl.classList.add('correct');
        quizMessageEl.classList.remove('incorrect');
    } else {
        quizMessageEl.textContent = `${translations[currentLanguage].quiz_incorrect} "${paireAttendue.roman}"`;
        quizMessageEl.classList.add('incorrect');
        quizMessageEl.classList.remove('correct');
    }

    quizIndexCarteActuelle++;
    setTimeout(prochaineCarteQuiz, 1500);
}

function finQuiz() {
    // Alerte traduite
    alert(`${translations[currentLanguage].quiz_complete} ${quizScore} / ${quizCartes.length} 🎉`);
    initialiserQuiz();
}

// --- 6. LOGIQUE DU MODE PÊCHE AUX SYLLABES ---
let syllabeCompteur = 0;
let syllabeConsonnesDisponibles = [];
let syllabeVoyellesDisponibles = [];

function initialiserSyllabe() {
    syllabeCompteur = 0;
    // Texte dynamique traduit
    syllabeCompteurEl.textContent = `${translations[currentLanguage].syllables_built} : 0`;
    syllabeCompteurEl.dataset.defaultText = syllabeCompteurEl.textContent;
    
    syllabeConsonnesDisponibles = melanger(NIVEAU_2_CONSONNES.map(c => c.hangeul));
    syllabeVoyellesDisponibles = melanger(NIVEAU_1_VOYELLES.map(v => v.hangeul));

    syllabeConsonneEl.textContent = '?';
    syllabeVoyelleEl.textContent = '?';
    syllabeResultatEl.textContent = '?';

    piocherSyllabe();
}

function piocherSyllabe() {
    if (syllabeConsonnesDisponibles.length === 0 || syllabeVoyellesDisponibles.length === 0) {
        // Alerte traduite
        alert(translations[currentLanguage].syllable_all_drawn);
        initialiserSyllabe();
        return;
    }

    const consonne = syllabeConsonnesDisponibles.shift();
    const voyelle = syllabeVoyellesDisponibles.shift();

    syllabeConsonneEl.textContent = consonne;
    syllabeVoyelleEl.textContent = voyelle;

    let resultat = (consonne === 'ㅇ') ? voyelle : (consonne + voyelle);
    syllabeResultatEl.textContent = resultat;

    syllabeCompteur++;
    syllabeCompteurEl.textContent = `${translations[currentLanguage].syllables_built} : ${syllabeCompteur}`;

    if (syllabeConsonnesDisponibles.length === 0) {
        syllabeConsonnesDisponibles = melanger(NIVEAU_2_CONSONNES.map(c => c.hangeul));
    }
    if (syllabeVoyellesDisponibles.length === 0) {
        syllabeVoyellesDisponibles = melanger(NIVEAU_1_VOYELLES.map(v => v.hangeul));
    }
}

// --- 7. GESTION DES ÉVÉNEMENTS ---

// Sélecteurs de langue
langFrButton.addEventListener('click', () => setLanguage('fr'));
langEnButton.addEventListener('click', () => setLanguage('en'));

// Menu Principal
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
btnVocab.addEventListener('click', () => {
    afficherEcran(ecranVocab);
});

// Boutons "Retour Menu"
// Boutons "Retour Menu" (y compris le titre)
[memoryRetourMenuBtn, quizRetourMenuBtn, syllabeRetourMenuBtn, vocabRetourMenuBtn, mainTitleButton].forEach(btn => {
    btn.addEventListener('click', () => {
        if (quizInterval) clearInterval(quizInterval); // Arrête le timer du quiz si on quitte
        afficherEcran(menuPrincipal);
    });
});

// Boutons de jeu
memoryResetButton.addEventListener('click', initialiserMemory);
quizStartButton.addEventListener('click', () => {
    const btnText = translations[currentLanguage].btn_start_quiz;
    if (quizStartButton.textContent === btnText) {
        demarrerQuiz();
    } else {
        verifierReponseQuiz('correct_dummy_response');
    }
});
syllabePiocheButton.addEventListener('click', piocherSyllabe);

// --- DÉMARRAGE DU JEU ---
setLanguage(currentLanguage); // Applique la langue par défaut au chargement
afficherEcran(menuPrincipal);

