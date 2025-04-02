// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Achievement Cards Animation
    // =============================================
    const animateAchievementCards = () => {
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
    };

    // =============================================
    // Certification Badges Parallax Effect
    // =============================================
    const setupParallaxEffect = () => {
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
    };

    // =============================================
    // Music Player Functionality (Enhanced)
    // =============================================
    const setupMusicPlayer = () => {
        const audioPlayer = document.getElementById('audioPlayer');
        const playBtn = document.getElementById('playBtn');
        
        if (!audioPlayer || !playBtn) return;

        const playIcon = playBtn.querySelector('i');
        let isPlaying = false;

        // Preload audio and handle errors
        audioPlayer.load();
        audioPlayer.addEventListener('error', function() {
            console.error('Audio Error:', audioPlayer.error);
            const playerMessage = document.querySelector('.player-message span');
            if (playerMessage) {
                playerMessage.textContent = 'Audio unavailable - Please try again later';
                playerMessage.style.color = '#ff4444';
            }
            playBtn.disabled = true;
        });

        // Click handler with improved feedback
        playBtn.addEventListener('click', async function() {
            try {
                if (isPlaying) {
                    await audioPlayer.pause();
                    playIcon.classList.replace('fa-pause', 'fa-play');
                } else {
                    await audioPlayer.play();
                    playIcon.classList.replace('fa-play', 'fa-pause');
                    
                    // Update metadata for browsers that show media controls
                    if ('mediaSession' in navigator) {
                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: 'Follow Me Home | A Feels Mix',
                            artist: 'Karmaxis ft ILLENIUM, Nurko & Friends',
                            artwork: [
                                { src: 'https://example.com/cover.jpg', sizes: '96x96', type: 'image/jpeg' }
                            ]
                        });
                    }
                }
                isPlaying = !isPlaying;
            } catch (error) {
                console.error('Playback Error:', error);
                const playerMessage = document.querySelector('.player-message span');
                if (playerMessage) {
                    playerMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Click to enable audio';
                    playerMessage.style.color = '#ff9900';
                }
                
                // For Safari iOS which requires direct user interaction
                if (error.name === 'NotAllowedError') {
                    alert('Please tap the play button to start audio. iOS requires this interaction.');
                }
            }
        });

        // Handle audio ending
        audioPlayer.addEventListener('ended', function() {
            playIcon.classList.replace('fa-pause', 'fa-play');
            isPlaying = false;
        });

        // Handle playback interruptions
        audioPlayer.addEventListener('pause', function() {
            if (isPlaying) {
                playIcon.classList.replace('fa-pause', 'fa-play');
                isPlaying = false;
            }
        });
    };

    // =============================================
    // Welcome Message
    // =============================================
    const showWelcomeMessage = () => {
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
    };

    // =============================================
    // Initialize All Functions
    // =============================================
    animateAchievementCards();
    setupParallaxEffect();
    setupMusicPlayer();
    showWelcomeMessage();

    // Additional helper for mobile devices
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
});