document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const card = document.getElementById('card');
    const content = document.getElementById('content');
    const passwordContainer = document.getElementById('password-container');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmitButton = document.getElementById('password-submit-button');
    const passwordError = document.getElementById('password-error');
    const surpriseButton = document.getElementById('surprise-button');
    const surpriseContent = document.getElementById('surprise-content');
    const playAudioButton = document.getElementById('play-audio-button');
    const birthdayAudio = document.getElementById('birthday-audio');
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
        }, 4000);
    });

    passwordSubmitButton.addEventListener('click', () => {
        if (passwordInput.value === correctPassword) {
            passwordError.classList.add('hidden');
            passwordContainer.style.display = 'none';
            content.style.display = 'block';
            typeText(document.getElementById('birthday-message'), 'Happy Birthday Lalitha 🎉');
        } else {
            passwordError.classList.remove('hidden');
        }
    });

    // Handle touch events for password submission
    passwordSubmitButton.addEventListener('touchstart', () => {
        if (passwordInput.value === correctPassword) {
            passwordError.classList.add('hidden');
            passwordContainer.style.display = 'none';
            content.style.display = 'block';
            typeText(document.getElementById('birthday-message'), 'Happy Birthday Lalitha 🎉');
        } else {
            passwordError.classList.remove('hidden');
        }
    });

    surpriseButton.addEventListener('click', () => {
        surpriseContent.classList.toggle('hidden');
        playAudioButton.classList.toggle('hidden');
    });

    // Handle touch events for surprise button
    surpriseButton.addEventListener('touchstart', () => {
        surpriseContent.classList.toggle('hidden');
        playAudioButton.classList.toggle('hidden');
    });

    playAudioButton.addEventListener('click', () => {
        birthdayAudio.classList.toggle('hidden');
        birthdayAudio.play();
    });

    // Handle touch events for play audio button
    playAudioButton.addEventListener('touchstart', () => {
        birthdayAudio.classList.toggle('hidden');
        birthdayAudio.play();
    });
});

function startBalloons() {
    const canvas = document.getElementById('balloons');
    const ctx = canvas.getContext('2d');
    const balloonColors = ['#FF6A88', '#FFB6C1', '#FF69B4', '#FFA07A', '#FF4500'];
    const balloons = [];

    for (let i = 0; i < 20; i++) {
        balloons.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * canvas.height,
            r: Math.random() * 20 + 10,
            color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
            speed: Math.random() * 2 + 1
        });
    }

    function drawBalloon(balloon) {
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.r, 0, Math.PI * 2);
        ctx.fillStyle = balloon.color;
        ctx.fill();
        ctx.closePath();
    }

    function updateBalloons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const balloon of balloons) {
            balloon.y -= balloon.speed;
            if (balloon.y + balloon.r < 0) {
                balloon.y = canvas.height + balloon.r;
                balloon.x = Math.random() * canvas.width;
            }
            drawBalloon(balloon);
        }
        requestAnimationFrame(updateBalloons);
    }

    updateBalloons();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
