document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const card = document.getElementById('card');
    const surpriseButton = document.getElementById('surprise-button');
    const surpriseContent = document.getElementById('surprise-content');
    const playAudioButton = document.getElementById('play-audio-button');
    const birthdayAudio = document.getElementById('birthday-audio');
    const greetingMessage = document.getElementById('greeting-message');
    const backButton = document.getElementById('back-button');
    const passwordContainer = document.getElementById('password-container');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmitButton = document.getElementById('password-submit-button');
    const passwordError = document.getElementById('password-error');
    const audioContainer = document.getElementById('audio-container');

    const correctPassword = "290503"; // Set your password here
    const typingSpeed = 100; // Adjust typing speed here

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
            typeText(birthdayMessage, 'Happy Birthday Lalitha 🎉', () => {
                // Show the greeting message
                greetingMessage.style.display = 'block';
            });
        }, 4000);
    });

    surpriseButton.addEventListener('click', () => {
        greetingMessage.classList.add('hidden');
        surpriseContent.classList.remove('hidden');
        backButton.classList.remove('hidden');
        surpriseButton.classList.add('hidden');
    });

    backButton.addEventListener('click', () => {
        greetingMessage.classList.remove('hidden');
        surpriseContent.classList.add('hidden');
        backButton.classList.add('hidden');
        surpriseButton.classList.remove('hidden');
        audioContainer.classList.add('hidden');
        passwordContainer.classList.add('hidden');
        playAudioButton.classList.remove('hidden');
        birthdayAudio.pause();
    });

    playAudioButton.addEventListener('click', () => {
        playAudioButton.classList.add('hidden');
        passwordContainer.classList.remove('hidden');
    });

    // Handle password submission
    passwordSubmitButton.addEventListener('click', () => {
        if (passwordInput.value === correctPassword) {
            passwordError.classList.add('hidden');
            passwordContainer.classList.add('hidden');
            audioContainer.classList.remove('hidden');
            birthdayAudio.classList.remove('hidden');
            birthdayAudio.play();
        } else {
            passwordError.classList.remove('hidden');
            // Prevent form submission on mobile
            event.preventDefault();
        }
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
        requestAnimationFrame(updateBalloons);
    }

    function initBalloons() {
        for (let i = 0; i < numBalloons; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloons.push({ x,
