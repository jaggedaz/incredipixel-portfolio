import ScrollSpy from './modules/ScrollSpy';
import Modal from './modules/Modal';
import Slideshow from './modules/Slideshow';

let config;
let projectModal;
let projectSlideshow;

function init() {
    fetch('../../portfolio.config.json')
        .then(response => response.json())
        .then(response => {
            config = response;

            document.title = config.siteTitle;

            loadHeader();
            loadAbout();
            loadPortfolio();
            loadContact();
            loadFooter();

            ScrollSpy.init();
        });
}

function loadHeader() {
    document.getElementById('name').textContent = config.name;
}

function loadAbout() {
    document.getElementById('about-photo').innerHTML = `<img src="../images/${ config.about.photo }" />`;
    document.getElementById('about-description').innerHTML = config.about.description;
}

function loadPortfolio() {
    config.portfolio.projects.forEach(project => {
        const projectContainer = document.createElement('div');
        projectContainer.className = 'project';

        const projectThumbnail = document.createElement('div');
        projectThumbnail.className = 'project-thumbnail';

        const projectThumbnailImg = document.createElement('img');
        projectThumbnailImg.setAttribute('src', project.thumbnail);
        projectThumbnail.appendChild(projectThumbnailImg);
        projectContainer.appendChild(projectThumbnail);

        const projectName = document.createElement('div');
        projectName.className = 'project-name';
        projectName.textContent = project.name;
        projectContainer.appendChild(projectName);

        const projectDescription = document.createElement('div');
        projectDescription.className = 'project-description';
        projectDescription.innerHTML = project.description;
        projectContainer.appendChild(projectDescription);
        
        projectContainer.addEventListener('click', () => handleProjectClick(project));

        document.getElementById('portfolio-section').appendChild(projectContainer);
    });
}

function loadContact() {
    // Make sure that the contact section is tall enough that it triggers scrollspy to
    // highlight the Contact navigation item when the navigation item is selected
    const headerHeight = document.getElementById('header').offsetHeight;
    const setContactSectionHeight = () => {
        document.getElementById('contact-section').style.minHeight = `${ window.innerHeight - headerHeight }px`;
    };
    window.addEventListener('resize', setContactSectionHeight);
    setContactSectionHeight();

    document.getElementById('contact-description').innerHTML = config.contact.description;

    config.contact.socialLinks.forEach(socialLink => {
        const socialLinkLink = document.createElement('a');
        socialLinkLink.href = socialLink.url;

        const socialLinkIcon = document.createElement('span');
        socialLinkIcon.className = `socicon-${ socialLink.siteName }`;
        socialLinkLink.appendChild(socialLinkIcon);

        document.getElementById('contact-social-links').appendChild(socialLinkLink);
    });
}

function loadFooter() {
    document.getElementById('footer').innerHTML = config.footerDescription;
}

function handleProjectClick(project) {
    if (!projectModal) { projectModal = new Modal('#project-modal'); }

    // Update the displayed project info
    document.getElementById('project-modal-project-name').textContent = project.name;
    document.getElementById('project-modal-project-roles').textContent = project.roles.join(', ');
    document.getElementById('project-modal-project-technologies').textContent = project.technologies.join(', ');
    document.getElementById('project-modal-project-description').innerHTML = project.description;

    if (!projectSlideshow) {
        projectSlideshow = new Slideshow('#project-modal-project-screenshots', project.screenshots);
    } else {
        projectSlideshow.setSlides(project.screenshots);
    }

    projectModal.show();
}

if (document.readyState !== 'complete') {
    window.addEventListener('load', () => init());
} else {
    init();
}