const nina = document.getElementById('nina-sprite');
const stateText = document.getElementById('current-state');

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();

    // LEVAR DANO (Tecla D)
    if (key === 'd') {
        applyState('HURT', 'sprite-hurt');
        setTimeout(() => resetToIdle(), 300); // Volta ao normal após o susto
    }

    // AGACHAR (Tecla S)
    if (key === 's') {
        nina.style.transform = 'scaleY(0.6) translateY(20px)';
        stateText.innerText = 'DUCKING';
        stateText.style.color = '#ffd700';
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key === 's') {
        resetToIdle();
    }
});

function applyState(label, className) {
    nina.className = ''; // Limpa classes
    nina.classList.add(className);
    stateText.innerText = label;
    stateText.style.color = '#ff0000';
}

function resetToIdle() {
    nina.className = 'sprite-idle';
    nina.style.transform = 'scaleY(1)';
    stateText.innerText = 'IDLE';
    stateText.style.color = 'white';
}

console.log("Sistema de combate da Nina Syko carregado.");