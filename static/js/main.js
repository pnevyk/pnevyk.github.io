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

    document.querySelectorAll('.tabs > .tabs-header > .tab-label:first-of-type').forEach((labelElement) => {
        const tabId = labelElement.getAttribute("data-tab-id");
        const tabContext = labelElement.parentElement.parentElement.getAttribute("data-tab-context");
        selectTab(tabContext, tabId);
    });

    document.querySelectorAll('.tabs > .tabs-header > .tab-label').forEach((labelElement) => {
        labelElement.addEventListener("click", () => {
            const tabId = labelElement.getAttribute("data-tab-id");
            const tabContext = labelElement.parentElement.parentElement.getAttribute("data-tab-context");
            selectTab(tabContext, tabId);
        });
    });

    function selectTab(tabContext, tabId) {
        document.querySelectorAll(`.tabs[data-tab-context="${tabContext}"]`).forEach(contextElement => {
            contextElement.querySelectorAll(".tab-label, .tab-content").forEach(element => {
                element.classList.remove("active");
            });

            contextElement.querySelectorAll(`[data-tab-id="${tabId}"`).forEach(element => {
                element.classList.add("active");
            });
        })
    }
})();
