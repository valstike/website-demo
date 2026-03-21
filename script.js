// Fade-in animation
const faders = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
  });
});

faders.forEach(el => observer.observe(el));

// Fake form submit
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Message sent (demo)");
});

    document.addEventListener('DOMContentLoaded', () => {
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenuPane = document.getElementById('mobile-menu-pane');
        const mainNav = document.getElementById('main-nav');
        if(mainNav) {
            mobileMenuPane.innerHTML = mainNav.innerHTML;
        }
        if(mobileToggle) {
            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenuPane.classList.toggle('is-open');
            });
        }
    });

    class TypewriterEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.typingSpeed = options.typingSpeed || 8;
        this.deletingSpeed = options.deletingSpeed || 10;
        this.pauseTime = options.pauseTime || 1500;
        this.animationType = options.animationType || 'typeDeleteLoop';
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.displayText = '';
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (!this.isDeleting) {
            if (this.currentCharIndex < currentText.length) {
                this.displayText += currentText.charAt(this.currentCharIndex);
                this.currentCharIndex++;
            } else {
                if (this.animationType === 'typeDelete' || this.animationType === 'typeDeleteLoop') {
                    setTimeout(() => { this.isDeleting = true; this.type(); }, this.pauseTime);
                    return;
                } else if (this.animationType === 'typeLoop' || this.animationType === 'typeDeleteLoop') {
                    if (this.currentTextIndex < this.texts.length - 1) {
                        this.currentTextIndex++;
                        this.currentCharIndex = 0;
                        this.displayText += '\n';
                    } else if (this.animationType === 'typeLoop') {
                        this.currentTextIndex = 0;
                        this.currentCharIndex = 0;
                        this.displayText = '';
                    }
                } else {
                    if (this.currentTextIndex < this.texts.length - 1) {
                        this.currentTextIndex++;
                        this.currentCharIndex = 0;
                        this.displayText += '\n';
                    } else {
                        this.element.innerHTML = this.displayText.replace(/\n/g, '<br>');
                        return;
                    }
                }
            }
        } else {
            if (this.displayText.length > 0) {
                this.displayText = this.displayText.slice(0, -1);
            } else {
                this.isDeleting = false;
                if (this.animationType === 'typeDeleteLoop') {
                    this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                    this.currentCharIndex = 0;
                }
            }
        }
        
        this.element.innerHTML = this.displayText.replace(/\n/g, '<br>');
        
        const speed = this.isDeleting ? 1000 / this.deletingSpeed : 1000 / this.typingSpeed;
                        setTimeout(() => this.type(), speed);
    }
}

// Initialize the typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById('typewriter-text');
    const texts = ["Defense is a system, not a moment."];
    
    new TypewriterEffect(element, texts, {
        typingSpeed: 8,
        deletingSpeed: 10,
        pauseTime: 1500,
        animationType: 'typeDeleteLoop'
    });
});
