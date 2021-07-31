window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const el = document.getElementById(selector);
        if (el) el.innerText = text;
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
})