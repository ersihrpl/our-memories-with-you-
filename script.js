/* =================================
   DATA MEMORY
================================= */

const memories = [

    {
        type: "image",

        src: "memories/foto1.jpg",

        date: "MEMORY 01",

        title: "The Beginning",

        description:
            "Satu momen kecil yang ingin selalu diingat."
    },

    {
        type: "image",

        src: "memories/foto2.jpg",

        date: "MEMORY 02",

        title: "Little Things",

        description:
            "Hal sederhana yang ternyata menjadi kenangan besar."
    },

    {
        type: "video",

        src: "memories/video1.mp4",

        date: "MEMORY 03",

        title: "A Moving Memory",

        description:
            "Biarkan videonya bercerita sendiri."
    },

    {
        type: "video",

        src: "memories/video2.mp4",

        date: "MEMORY 04",

        title: "Keep This Moment",

        description:
            "Dan semoga masih banyak cerita setelah ini."
    }

];


/* =================================
   ELEMENT
================================= */

const opening =
    document.getElementById("opening");

const website =
    document.getElementById("website");

const image =
    document.getElementById("memoryImage");

const video =
    document.getElementById("memoryVideo");

const currentNumber =
    document.getElementById("currentNumber");

const totalNumber =
    document.getElementById("totalNumber");

const memoryDate =
    document.getElementById("memoryDate");

const memoryTitle =
    document.getElementById("memoryTitle");

const memoryDescription =
    document.getElementById("memoryDescription");

const playButton =
    document.getElementById("playButton");

const dots =
    document.getElementById("dots");

const music =
    document.getElementById("backgroundMusic");


/* =================================
   VARIABLES
================================= */

let currentIndex = 0;

let slideshowRunning = false;

let slideshowTimer;


/* =================================
   TOTAL MEMORY
================================= */

totalNumber.textContent =
    String(memories.length).padStart(2, "0");


/* =================================
   CREATE DOTS
================================= */

memories.forEach((memory, index) => {

    const dot =
        document.createElement("span");

    dot.className = "dot";

    dot.onclick = function () {

        showMemory(index);

    };

    dots.appendChild(dot);

});


/* =================================
   SHOW MEMORY
================================= */

function showMemory(index) {

    currentIndex =
        (index + memories.length)
        % memories.length;


    const memory =
        memories[currentIndex];


    image.classList.remove("active");

    video.classList.remove("active");

    video.pause();


    if (memory.type === "image") {

        image.src =
            memory.src;

        image.classList.add("active");

    }


    else if (memory.type === "video") {

        video.src =
            memory.src;

        video.classList.add("active");

        video.muted = false;

        if (slideshowRunning) {

            video.play()
                .catch(() => {});

        }

    }


    currentNumber.textContent =
        String(currentIndex + 1)
        .padStart(2, "0");


    memoryDate.textContent =
        memory.date;


    memoryTitle.textContent =
        memory.title;


    memoryDescription.textContent =
        memory.description;


    document
        .querySelectorAll(".dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });


    startTimer();

}


/* =================================
   NEXT
================================= */

function nextMemory() {

    showMemory(
        currentIndex + 1
    );

}


/* =================================
   PREVIOUS
================================= */

function previousMemory() {

    showMemory(
        currentIndex - 1
    );

}


/* =================================
   SLIDESHOW
================================= */

function toggleSlideshow() {

    slideshowRunning =
        !slideshowRunning;


    if (slideshowRunning) {

        playButton.textContent =
            "Ⅱ";

        startTimer();

        if (
            memories[currentIndex].type
            === "video"
        ) {

            video.play()
                .catch(() => {});

        }

    }

    else {

        playButton.textContent =
            "▶";

        clearTimeout(
            slideshowTimer
        );

        video.pause();

    }

}


/* =================================
   AUTO NEXT
================================= */

function startTimer() {

    clearTimeout(
        slideshowTimer
    );


    if (!slideshowRunning) {
        return;
    }


    const memory =
        memories[currentIndex];


    if (memory.type === "image") {

        slideshowTimer =
            setTimeout(() => {

                nextMemory();

            }, 5000);

    }

}


/* =================================
   VIDEO SELESAI
================================= */

video.addEventListener(
    "ended",
    function () {

        if (slideshowRunning) {

            nextMemory();

        }

    }
);


/* =================================
   OPEN WEBSITE
================================= */

function openMemory() {

    opening.style.opacity = "0";


    setTimeout(() => {

        opening.style.display =
            "none";

        website.style.display =
            "block";


        window.scrollTo(
            0,
            0
        );


        music.play()
            .catch(() => {});


        slideshowRunning =
            true;

        playButton.textContent =
            "Ⅱ";

        showMemory(0);

    }, 700);

}


/* =================================
   MUSIC
================================= */

function toggleMusic() {

    if (music.paused) {

        music.play();

        document.getElementById(
            "musicButton"
        ).textContent = "♫";

    }

    else {

        music.pause();

        document.getElementById(
            "musicButton"
        ).textContent = "♩";

    }

}


/* =================================
   INITIAL
================================= */

showMemory(0);
