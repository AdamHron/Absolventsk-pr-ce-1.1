document.getElementById("myPieChart").style.display = "none";
document.getElementById("button3").style.display = "none";
document.getElementById("button4").style.display = "none";

const words = [
    { english: "apple", czech: "jablko" },
    { english: "dog", czech: "pes" },
    { english: "book", czech: "kniha" },
    { english: "cat", czech: "kočka" },
    { english: "house", czech: "dům" },
    { english: "car", czech: "auto" },
    { english: "tree", czech: "strom" },
    { english: "sky", czech: "nebe" }
];

let currentWord = null;
let previousWord = null;
let active = true;
let numberOfAnswers = 0;
let numberOfCorrectAnswers = 0;

function getRandomWord() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
    } while (previousWord === currentWord);

    document.getElementById("h2").textContent = currentWord.english;
    previousWord = currentWord;
}

function updateChart() {
    // Aktualizujte data grafu podle počtu správných a nesprávných odpovědí
    myPieChart.data.datasets[0].data = [numberOfCorrectAnswers, numberOfAnswers + 1 - numberOfCorrectAnswers];
    myPieChart.update(); // Aktualizujte graf, aby se změny projevily
}


function button() {
    const userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
    const correctAnswer = currentWord.czech.toLowerCase().trim();
    const result = document.getElementById("result");

    if (active) {
        if (userAnswer === "") {
            result.innerHTML = "Vyplňte pole";
            result.style.color = "red";
        } else if (userAnswer === correctAnswer) {
            result.innerHTML = "Správně!";
            result.style.color = "green";
            numberOfCorrectAnswers++;
            document.getElementById("button2").style.display = "block";
            active = false;
        } else {
            result.innerHTML = `Špatně. Správná odpověď je: ${currentWord.czech}`;
            result.style.color = "red";
            document.getElementById("button2").style.display = "block";
            active = false;
        }
        updateChart();
    }
    else{

    }
    
}

getRandomWord();
document.getElementById("button2").style.display = "none";

function finish() {
    document.getElementById("button2").style.display = "none";
    document.getElementById("button1").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("userAnswer").style.display = "none";
    document.getElementById("tabulka").style.display = "none";
    document.getElementById("h2").style.display = "none";
    document.getElementById("překlad-nápis").style.display = "none";

        const nadpis = document.getElementById("nadpis");
        nadpis.innerHTML = `Vyhodnocení`;

    document.getElementById("myPieChart").style.display = "block";

    document.getElementById("numberOfCorrectAnswers").innerHTML = `Správně: ${numberOfCorrectAnswers}`;
    document.getElementById("numberOfIncorrectAnswers").innerHTML = `Špatně: ${15 - numberOfCorrectAnswers}`;
    document.getElementById("úspěšnost").innerHTML = `Úspěšnost: ${Math.round(numberOfCorrectAnswers / 15 * 100)}%`;

    document.getElementById("button3").style.display = "block";
    document.getElementById("button4").style.display = "block";    
}


function next() {    
    numberOfAnswers++;

    const button2 = document.getElementById("button2");
    if (numberOfAnswers === 14) {
        button2.innerHTML = `Dokončit`;
    }
    else if(numberOfAnswers === 15) {
        finish();
    }
    else {
        button2.innerHTML = `Další`;
    }

    document.getElementById("userAnswer").value = "";
    result.innerHTML = ``;
    getRandomWord();
    document.getElementById("button2").style.display = "none";
    document.getElementById("userAnswer").value = "";
    active = true;
}




        // Data pro koláčový graf
        const data = {
            labels: ['Správně', 'Špatně'],
            datasets: [{
                data: [numberOfCorrectAnswers, 15 - numberOfCorrectAnswers], // Počet nebo procenta
                backgroundColor: ['#33FF57', '#FF5733'], // Barvy pro jednotlivé díly
                borderColor: ['#fff', '#fff'], // Barvy okrajů
                borderWidth: 2
            }]
        };

        // Možnosti grafu (volitelné)
        const options = {
            responsive: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true, // Zobrazit tooltip při najetí na graf
                }
            }
        };

        // Vytvoření grafu
        const ctx = document.getElementById('myPieChart').getContext('2d');
        const myPieChart = new Chart(ctx, {
            type: 'pie',  // Typ grafu: 'pie' pro kulatý graf
            data: data,
            options: options
        });