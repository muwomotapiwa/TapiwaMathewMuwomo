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
        const progressBar = document.querySelector('.audio-progress-bar');
        let isPlaying = false;
        let isUserInteraction = false;

        // Initialize audio
        audioPlayer.volume = 0.7; // Set default volume
        audioPlayer.preload = 'metadata';

        // Play/pause function
        function togglePlay() {
            if (isPlaying) {
                audioPlayer.pause();
                playIcon.classList.replace('fa-pause', 'fa-play');
            } else {
                // On first interaction, ensure audio is loaded
                if (!isUserInteraction) {
                    audioPlayer.load();
                    isUserInteraction = true;
                }
                audioPlayer.play()
                    .then(() => {
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
                    })
                    .catch(error => {
                        console.error('Playback failed:', error);
                        const playerMessage = document.querySelector('.player-message span');
                        playerMessage.textContent = 'Click to enable audio (browser may block autoplay)';
                        playerMessage.style.color = '#ff9900';
                        
                        // For Safari iOS which requires direct user interaction
                        if (error.name === 'NotAllowedError') {
                            alert('Please tap the play button to start audio. iOS requires this interaction.');
                        }
                    });
            }
            isPlaying = !isPlaying;
        }

        // Update progress bar
        function updateProgress() {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Click on progress bar to seek
        document.querySelector('.audio-progress')?.addEventListener('click', function(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (clickX / width) * duration;
        });

        // Event listeners
        playBtn.addEventListener('click', togglePlay);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', function() {
            playIcon.classList.replace('fa-pause', 'fa-play');
            isPlaying = false;
            progressBar.style.width = '0%';
        });
        audioPlayer.addEventListener('pause', function() {
            if (isPlaying) {
                playIcon.classList.replace('fa-pause', 'fa-play');
                isPlaying = false;
            }
        });

        // Error handling
        audioPlayer.addEventListener('error', function() {
            console.error('Audio Error:', audioPlayer.error);
            const playerMessage = document.querySelector('.player-message span');
            if (playerMessage) {
                playerMessage.textContent = 'Audio unavailable - Please try again later';
                playerMessage.style.color = '#ff4444';
            }
            playBtn.disabled = true;
        });

        // Mobile interaction helper
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', function() {
                // This helps unlock audio on iOS
            }, { once: true });
        }
    };

    // =============================================
    // Welcome Message
    // =============================================
    const showWelcomeMessage = () => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `
            <div class="welcome-content">
                <i class="fas fa-music" aria-hidden="true"></i>
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

// Update copyright year automatically
document.getElementById('current-year').textContent = new Date().getFullYear();