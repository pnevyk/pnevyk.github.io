(function () {
    const progress = document.getElementById('progress');

    if (progress !== null) {
        window.addEventListener('scroll', setProgress);
        setProgress();

        function setProgress() {
            const height = Math.max(document.body.scrollHeight, document.body.offsetHeight) - window.innerHeight;
            const scrollFromTop = window.scrollY;
            const width = (scrollFromTop / height) * 100;

            progress.style.width = width + '%';
        }
    }
})();
