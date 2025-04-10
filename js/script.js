// Simple animation for achievement cards on scroll
document.addEventListener('DOMContentLoaded', function () {
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
    window.addEventListener('mousemove', function (e) {
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
});
