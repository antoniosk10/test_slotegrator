document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-btn');
    const languageSelectInput = document.querySelector('input[id="dropdown"]');

    closeBtn.addEventListener('click', () => {
        languageSelectInput.checked = false
    });
});




