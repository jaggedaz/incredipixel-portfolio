import ScrollSpy from './modules/ScrollSpy';

function init() {
    fetch('../../portfolio.config.json')
        .then(response => response.json())
        .then(config => {
            document.title = config.siteTitle;
            document.getElementById('name').textContent = config.name;
            document.getElementById('about-photo').innerHTML = `<img src="../images/${ config.about.photo }" />`;
            document.getElementById('about-description').innerHTML = config.about.description;
            
            ScrollSpy.init();
        });
}

if (document.readyState !== 'complete') {
    window.addEventListener('load', () => init());
} else {
    init();
}