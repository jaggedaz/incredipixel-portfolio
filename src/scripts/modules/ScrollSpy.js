let sectionAnchors;
let scrollHeight;
let sectionIds;
let sectionOffsets;

function setScrollSpyOffsets() {
    sectionIds = [];
    sectionOffsets = [];

    for (let i = 0; i < sectionAnchors.length; i++) {
        const sectionAnchor = sectionAnchors[i];
        sectionIds.push(sectionAnchor.id);
        sectionOffsets.push(sectionAnchor.offsetTop);
    }
}

function setActiveLink() {
    // Reset the offsets if the scroll height of the window has changed
    const currentScrollHeight = getScrollHeight();
    if (currentScrollHeight !== scrollHeight) {
        scrollHeight = currentScrollHeight;
        setScrollSpyOffsets();
    }

    // Find the section we're scrolled to and set it's link to active
    const scrollPosition = window.pageYOffset;
    for (let i = sectionOffsets.length; i--;) {
        if (sectionOffsets[i] <= scrollPosition) {
            const link = document.querySelector(`a[href*=${ sectionIds[i] }]`);
            if (!link.classList.contains('active')) {
                const currentlyActiveLink = document.querySelector('.navigation-link.active');
                if (currentlyActiveLink) {
                    currentlyActiveLink.classList.remove('active');
                }
                link.classList.add('active');
            }
            break;
        }
    }
}

function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

export default class {
    static init() {
        sectionAnchors = document.querySelectorAll('.anchor');
        scrollHeight = getScrollHeight();

        setScrollSpyOffsets();
        setActiveLink();

        window.addEventListener('scroll', () => setActiveLink());
    }
}