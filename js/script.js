// Simple animation for achievement cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const achievementCards = document.querySelectorAll('.achievement-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    achievementCards.forEach(card => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Parallax effect for certification badges
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const badges = document.querySelectorAll('.cert-badge-bg');
        badges.forEach((badge, index) => {
            const speed = 0.01 + (index * 0.01);
            const xPos = x * 20 * speed;
            const yPos = y * 20 * speed;
            badge.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${index % 2 ? '-' : ''}${5 + (index * 2)}deg)`;
        });
    });

    // Music Player Functionality
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    
    if (audioPlayer && playBtn) {
        const playIcon = playBtn.querySelector('i');
        let isPlaying = false;

        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                audioPlayer.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            } else {
                audioPlayer.play()
                    .then(() => {
                        playIcon.classList.remove('fa-play');
                        playIcon.classList.add('fa-pause');
                    })
                    .catch(error => {
                        console.error('Audio playback failed:', error);
                        // Show a friendly message to the user
                        const playerMessage = document.querySelector('.player-message span');
                        if (playerMessage) {
                            playerMessage.textContent = 'Click to enable audio (browser may block autoplay)';
                        }
                    });
            }
            isPlaying = !isPlaying;
        });

        // When audio ends, reset the button
        audioPlayer.addEventListener('ended', function() {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            isPlaying = false;
        });
    }

    // Show a welcome message that fades out
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <div class="welcome-content">
            <i class="fas fa-music"></i>
            <span>Welcome to my CV! Feel free to play some music while browsing</span>
        </div>
    `;
    document.body.appendChild(welcomeMessage);

    setTimeout(() => {
        welcomeMessage.classList.add('fade-out');
        setTimeout(() => welcomeMessage.remove(), 1000);
    }, 4000);
});