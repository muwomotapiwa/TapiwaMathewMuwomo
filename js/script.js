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

let audio = new Audio('assets/audio/Snowfall_and_you_relax.mp3');
let isPlaying = false;
let currentTrack = 0;
const tracks = document.querySelectorAll('.track');
const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

function loadTrack(index) {
  tracks.forEach(t => t.classList.remove('active'));
  tracks[index].classList.add('active');
  audio.src = tracks[index].dataset.src;
  audio.load();
}

function playTrack() {
  audio.play();
  playButton.innerHTML = '⏸';
  isPlaying = true;
}

function pauseTrack() {
  audio.pause();
  playButton.innerHTML = '▶';
  isPlaying = false;
}

function togglePlay() {
  isPlaying ? pauseTrack() : playTrack();
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentTimeSpan.textContent = formatTime(audio.currentTime);
  durationSpan.textContent = formatTime(audio.duration);
}

function formatTime(time) {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

// Event listeners
playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) playTrack();
});
nextButton.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) playTrack();
});
document.querySelector('.progress-container').addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => nextButton.click());
loadTrack(currentTrack);

// Printer //
// Add this to your script.js file or in a script tag
function prepareForPrint() {
  // Clone the container to avoid modifying the original
  const printContent = document.querySelector('.container').cloneNode(true);
  
  // Remove elements we don't want in print
  const elementsToRemove = printContent.querySelectorAll('.music-player-wrapper, .music-disclaimer');
  elementsToRemove.forEach(el => el.remove());
  
  // Create a print-specific stylesheet
  const printStyles = document.createElement('style');
  printStyles.innerHTML = `
    @page {
      size: auto;
      margin: 0.5in;
    }
    
    body {
      background: white !important;
      color: black !important;
    }
    
    /* Add all the print CSS from above here */
    ${document.querySelector('style[media="print"]').innerHTML}
  `;
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${document.title}</title>
        <style>${printStyles.innerHTML}</style>
      </head>
      <body>
        ${printContent.innerHTML}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          };
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

// Add a print button to your HTML (optional)
const printButton = document.createElement('button');
printButton.textContent = 'Print CV';
printButton.style.position = 'fixed';
printButton.style.bottom = '20px';
printButton.style.right = '20px';
printButton.style.zIndex = '1000';
printButton.style.padding = '10px 20px';
printButton.style.backgroundColor = '#032D60';
printButton.style.color = 'white';
printButton.style.border = 'none';
printButton.style.borderRadius = '4px';
printButton.style.cursor = 'pointer';
printButton.addEventListener('click', prepareForPrint);
document.body.appendChild(printButton);
