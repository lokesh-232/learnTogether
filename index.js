// Smooth scroll to section when clicking on button
document.querySelector('.get-started-btn').addEventListener('click', function() {
    document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
});

// Smooth scroll to section when clicking on navigation link


// Smooth transition for about section
window.addEventListener('scroll', function() {
    const aboutSection = document.querySelector('#about');
    const aboutSectionPosition = aboutSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (aboutSectionPosition < screenHeight * 0.75) {
        aboutSection.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.group-video');

    videos.forEach(video => {
        video.addEventListener('mouseover', function() {
            // Remove blur effect from all videos
            this.play();
            videos.forEach(v => {
                v.classList.add('blur');
                v.classList.remove('highlight');
            });

            // Remove blur effect from the selected video and add spotlight
            video.classList.remove('blur');
            video.classList.add('highlight');
        });

        video.addEventListener('mouseout', function() {
            // Remove highlight class from all videos
            this.pause();
            videos.forEach(v => {
                v.classList.remove('highlight');
            });

            // Remove blur effect from all videos
            videos.forEach(v => {
                v.classList.remove('blur');
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.group-video');

    videos.forEach(video => {
        video.addEventListener('mouseover', function() {
            // Pause animation for all videos
            videos.forEach(v => {
                v.style.animationPlayState = 'paused';
            });
        });

        video.addEventListener('mouseout', function() {
            // Resume animation for all videos
            videos.forEach(v => {
                v.style.animationPlayState = 'running';
            });
        });
    });
});