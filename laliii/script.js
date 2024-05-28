document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const card = document.getElementById('card');
    const surpriseButton = document.getElementById('surprise-button');
    const surpriseContent = document.getElementById('surprise-content');
    const playAudioButton = document.getElementById('play-audio-button');
    const birthdayAudio = document.getElementById('birthday-audio');

    const typingSpeed = 150; // Adjust typing speed here

    function typeText(element, text, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // Show the preloader with typing effect
    typeText(preloaderText, 'Welcome To VENUS...', () => {
        setTimeout(() => {
            preloader.style.display = 'none';
            card.style.display = 'block';
            startBalloons();

            // Show the birthday message with typing effect
            const birthdayMessage = document.getElementById('birthday-message');
            typeText(birthdayMessage, 'Happy Birthday Lalitha 🎉');
        }, 500);
    });

    surpriseButton.addEventListener('click', () => {
        surpriseContent.classList.toggle('hidden');
        if (!surpriseContent.classList.contains('hidden')) {
            surpriseButton.textContent = '←'; // Unicode for left arrow symbol
            playAudioButton.classList.remove('hidden');
        } else {
            surpriseButton.textContent = 'Message For You';
        }
    });

    playAudioButton.addEventListener('click', () => {
        birthdayAudio.classList.remove('hidden');
        birthdayAudio.play();
        playAudioButton.style.display = 'none';
    });
});

function startBalloons() {
    const canvas = document.getElementById('balloons');
    const ctx = canvas.getContext('2d');
    const balloonColors = ['#FF5733', '#FFBD33', '#FF33E6', '#337DFF', '#33FFC4'];
    const balloonRadius = 30;
    const threadLength = 150;
    const numBalloons = 10;
    let balloons = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawBalloon(x, y, color) {
        // Balloon body
        ctx.beginPath();
        ctx.arc(x, y, balloonRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();

        // Balloon thread
        ctx.beginPath();
        ctx.moveTo(x, y + balloonRadius);
        ctx.lineTo(x, y + balloonRadius + threadLength);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function updateBalloons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balloons.forEach(balloon => {
            balloon.y -= 1; // Adjust speed
            if (balloon.y + balloonRadius + threadLength < 0) {
                // Reset balloon position if it goes off-screen
                balloon.y = canvas.height + threadLength + balloonRadius;
            }
            drawBalloon(balloon.x, balloon.y, balloon.color);
        });
    }

    function initBalloons() {
        for (let i = 0; i < numBalloons; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloons.push({ x, y, color });
        }
    }

    function animateBalloons() {
        requestAnimationFrame(animateBalloons);
        updateBalloons();
    }

    initBalloons();
    animateBalloons();
}
