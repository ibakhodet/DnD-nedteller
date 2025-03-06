// Theme configurations
const themes = {
    'vaaralon': {
        background: 'linear-gradient(to bottom right, #0f172a, #7f1d1d)',
        icon: '🗡️',
        color: '#991b1b',
        floatingItems: ['🗡️', '🏹', '💰', '🔍']
    },
    'aktlaus': {
        background: 'linear-gradient(to bottom, #451a03, #854d0e)',
        icon: '🧘',
        color: '#ca8a04',
        floatingItems: ['🧘', '👊', '🕷️', '📿']
    },
    'vilde': {
        background: 'linear-gradient(to right, #312e81, #5b21b6)',
        icon: '🐉',
        color: '#4f46e5',
        floatingItems: ['🎲', '😈', '📚', '🐉']
    },
    'cassy': {
        background: 'linear-gradient(to bottom right, #27272a, #854d0e)',
        icon: '⚔️',
        color: '#eab308',
        floatingItems: ['⚔️', '🛡️', '🏆', '⚡']
    },
    'nahiri': {
        background: 'linear-gradient(to bottom right, #14532d, #7e22ce)',
        icon: '🍄',
        color: '#9333ea',
        floatingItems: ['🍄', '☠️', '🌿', '🔥']
    },
    'oli': {
        background: 'linear-gradient(to bottom, #1e3a8a, #0e7490)',
        icon: '🌊',
        color: '#0891b2',
        floatingItems: ['✨', '🌊', '⚓', '🧜‍♂️']
    }
};

// Memorable moments from previous sessions
const throwbacks = [
    "Etter at Vaaralon snublet dramatisk (Nat1) og brakk sitt kjære sverd, gikk han gjennom alle fem sorg-stegene i løpet av få sekunder. 😭",
    "Aktlaus fant en liten edderkopp som beskyttet ham mot gigantiske edderkopper. Dette stoppet ham likevel ikke fra å brutalt stikke ut alle øynene og knekke beina på fienden. 🕷️",
    "Nahiri satte rekord i ubrukelige terningkast da hun endte med hele fire terninger i fengsel – på to forsøk. 🎲",
    "Oli klarer aldri å dy seg fra å smake på mystisk vann, noe som endelig straffet seg da han ble forgiftet av et basseng. 🧪",
    "Gruppen løste en gåte om en magisk mace ved hjelp av TikTok. Resultatet: Nahiri fikk en mace som lyser med grønn flamme og gir ekstra ild-skade. 🔥",
    "I det sekundet Ront falt i kamp, var Vaaralons umiddelbare tanke: «loot!», til stor underholdning og mild fordømmelse fra resten av gruppa. 💰",
    "I et magisk øyeblikk mister Oli foten, og hele gruppen opplever kroppslige bytter. Ingen skjønner noe som helst, men alle kjemper videre. 🦶",
    "Da Cassandra undersøkte Buppidos kropp fant hun ikke bare gull, men også en mystisk lapp med teksten «Worshipp Buppido», og satte straks i gang spekulasjoner om fremtidige kultplaner. 📜",
    "I en tragisk vending snappet Buppido med seg lille Stool og ofret ham til Demogorgon, noe som førte til en kollektiv hevntørst i gruppen. 👹",
    "Etter at Cassandra leverte et kritisk angrep på en edderkopp, feiret hun og Aktlaus seieren med en episk «airfist», og gruppen konstaterte at de dermed bygget kultur. 👊",
    "Etter å ha våknet opp i en transeliknende dansetilstand, ble Oli bundet fast og dratt med videre av gruppen mens han fortsatte sin euforiske dans uten bekymringer. 💃",
    "Etter å ha drept edderkopper, fant Aktlaus det passende å samle opp giften deres i en hjemmelaget edderkopp-pung – treffende kalt «Edderpung». 🧪",
    "I en spektakulær kamp tok Nahiri form som en hai og angrep et vanntroll, og bet dramatisk til i trollets ankel. 🦈",
    "Oli skulle bevise sine fiskekunster, men rullet Nat1 og mistet fiskestang, snøre og dagger i vannet – alt i ett kast. 🎣",
    "Rundt bålet åpnet alle seg opp om sine traumer, inkludert Vaaralons minne om morens morder og Olis syner av sitt druknede mannskap. 🔥"
];

// DOM elements
const themeContainer = document.getElementById('theme-container');
const floatingItemsContainer = document.getElementById('floating-items-container');
const titleElement = document.querySelector('.title');
const countdownValues = document.querySelectorAll('.countdown-value');
const factContent = document.getElementById('fact-content');
const progressBar = document.getElementById('progress-bar');

// Session date
const SESSION_DATE = new Date('2025-03-25T18:00:00');

// Initialize the app
function init() {
    // Set default theme (Vaaralon)
    switchTheme('vaaralon', document.querySelector('.vaaralon-theme'));
    
    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Initialize facts rotation
    startFactRotation();
    
    // Update progress bar
    updateProgressBar();
}

// Function to create bursting dice effect
function createDiceBurst(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 15-25 dice
    const diceCount = 15 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < diceCount; i++) {
        const dice = document.createElement('div');
        dice.className = 'dice';
        dice.textContent = '🎲';
        dice.style.left = centerX + 'px';
        dice.style.top = centerY + 'px';
        dice.style.opacity = '1';
        document.body.appendChild(dice);
        
        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 150;
        const size = 16 + Math.random() * 14;
        
        // Set random destination
        const destX = centerX + Math.cos(angle) * distance;
        const destY = centerY + Math.sin(angle) * distance;
        
        // Apply initial styles
        dice.style.fontSize = size + 'px';
        
        // Trigger animation in the next frame
        setTimeout(() => {
            dice.style.transform = `translate(${destX - centerX}px, ${destY - centerY}px) rotate(${Math.random() * 360}deg)`;
            dice.style.opacity = '0';
        }, 10);
        
        // Remove dice after animation
        setTimeout(() => {
            dice.remove();
        }, 1000);
    }
}

// Function to update countdown timer
function updateCountdown() {
    const now = new Date();
    const diff = SESSION_DATE - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Update progress bar
    updateProgressBar();
}

// Update progress bar based on time remaining
function updateProgressBar() {
    const now = new Date();
    const diff = SESSION_DATE - now;
    
    // We start the progress bar at 60 days before the session
    const totalDuration = 60 * 24 * 60 * 60 * 1000; // 60 days in ms
    const elapsed = totalDuration - diff;
    
    let progressPercentage = 0;
    if (elapsed > 0) {
        progressPercentage = Math.min(100, (elapsed / totalDuration) * 100);
    }
    
    progressBar.style.width = `${progressPercentage}%`;
}

// Start the fact rotation (change every hour)
function startFactRotation() {
    // Set initial random fact
    showRandomFact();
    
    // Calculate time until the next hour
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(nextHour.getHours() + 1);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    nextHour.setMilliseconds(0);
    
    const timeUntilNextHour = nextHour - now;
    
    // Set timeout to change at the next hour boundary
    setTimeout(() => {
        showRandomFact();
        // Then set interval to change every hour
        setInterval(showRandomFact, 3600000);
    }, timeUntilNextHour);
}

// Display a random fact from our collection
function showRandomFact() {
    const currentFact = factContent.textContent;
    let newFact;
    
    do {
        const randomIndex = Math.floor(Math.random() * throwbacks.length);
        newFact = throwbacks[randomIndex];
    } while (newFact === currentFact && throwbacks.length > 1);
    
    factContent.textContent = newFact;
}

// Generate floating item elements for a theme
function generateFloatingItems(themeName) {
    // Clear existing items
    floatingItemsContainer.innerHTML = '';
    
    const items = themes[themeName].floatingItems;
    const count = 40; // Number of floating items
    
    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'floating-item';
        item.textContent = items[i % items.length];
        
        // Random positioning and timing
        item.style.left = `${Math.random() * 90 + 5}%`;
        item.style.top = `${Math.random() * -100 - 20}%`;
        item.style.fontSize = `${Math.random() * 10 + 15}px`;
        item.style.opacity = `${Math.random() * 0.3 + 0.2}`;
        item.style.animationDuration = `${Math.random() * 10 + 15}s`;
        item.style.animationDelay = `${Math.random() * 10}s`;
        
        floatingItemsContainer.appendChild(item);
    }
}

// Theme switching function
function switchTheme(themeName, button) {
    // Proceed only if it's different from current theme
    if (!button.classList.contains('active')) {
        // Create dice burst
        createDiceBurst(button);
        
        // Get all theme buttons and remove active class
        document.querySelectorAll('.theme-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update theme colors
        themeContainer.style.background = themes[themeName].background;
        titleElement.innerHTML = `${themes[themeName].icon} D&D Session Countdown ${themes[themeName].icon}`;
        
        // Update countdown boxes
        countdownValues.forEach(value => {
            value.style.backgroundColor = themes[themeName].color;
        });
        
        // Generate new floating items for this theme
        generateFloatingItems(themeName);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);