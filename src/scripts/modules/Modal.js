let modals = {};
let zIndexCount = 0;

export default class {
    constructor(elementSelector) {
        // If a modal has already been created for this selector, return the already created modal
        if (modals[elementSelector]) { return modals[elementSelector]; }
        
        modals[elementSelector] = this;

        this.modal = document.querySelector(elementSelector);
        this.modal.style.zIndex = zIndexCount + 2;
        
        this.mask = document.createElement('div');
        this.mask.className = 'modal-mask modal-fade';
        this.mask.style.zIndex = zIndexCount + 1;
        this.mask.addEventListener('click', () => this.hide());
        document.body.appendChild(this.mask);
        
        zIndexCount += 2;

        let closeButton = this.modal.querySelector('.modal-close-button');
        closeButton.addEventListener('click', () => this.hide());
    }

    show() {
        document.body.style.overflow = 'hidden';

        this.modal.querySelector('.modal-content').scrollTop = 0;
    
        this.mask.classList.remove('modal-fade-out');
        this.mask.classList.add('modal-fade-in');

        this.modal.classList.remove('modal-fade-out');
        this.modal.classList.add('modal-fade-in');
    }
    
    hide() {
        document.body.style.overflow = 'visible';
    
        this.mask.classList.remove('modal-fade-in');
        this.mask.classList.add('modal-fade-out');

        this.modal.classList.remove('modal-fade-in');
        this.modal.classList.add('modal-fade-out');
    }
}