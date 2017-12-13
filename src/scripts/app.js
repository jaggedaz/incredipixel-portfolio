import ScrollSpy from './modules/ScrollSpy';

function init() {
    fetch('../../portfolio.config.json')
        .then(response => response.json())
        .then(config => {
            document.title = config.siteTitle;
            document.getElementById('name').textContent = config.name;
            document.getElementById('about-photo').innerHTML = `<img src="../images/${ config.about.photo }" />`;
            document.getElementById('about-description').innerHTML = config.about.description;
            config.portfolio.projects.forEach(project => {
                const projectContainer = document.createElement('div');

                const projectName = document.createElement('div');
                projectName.className = 'project-name';
                projectName.textContent = project.name;
                projectContainer.appendChild(projectName);

                const projectDescription = document.createElement('div');
                projectDescription.className = 'project-description';
                projectDescription.innerHTML = project.description;
                projectContainer.appendChild(projectDescription);

                const projectScreenshots = document.createElement('div');
                projectScreenshots.className = 'project-screenshots';
                project.screenshots.forEach(screenshot => {
                    const projectScreenshot = document.createElement('img');
                    projectScreenshot.className = 'project-screenshot';
                    projectScreenshot.setAttribute('src', screenshot);
                    projectScreenshots.appendChild(projectScreenshot);
                });
                projectContainer.appendChild(projectScreenshots);

                document.getElementById('portfolio-section').appendChild(projectContainer);
            });
            
            ScrollSpy.init();
        });
}

if (document.readyState !== 'complete') {
    window.addEventListener('load', () => init());
} else {
    init();
}