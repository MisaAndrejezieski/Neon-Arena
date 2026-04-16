const nina = document.getElementById('nina-sprite');
const stateText = document.getElementById('current-state');
const hpFill = document.getElementById('hp-fill');
let health = 100;

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // ANDAR PARA FRENTE / TRÁS (Simulado com inclinação)
    if (key === 'd') {
        nina.style.transform = 'translateX(20px) skewX(-5deg)';
        stateText.innerText = 'WALKING FORWARD';
    } 
    else if (key === 'a') {
        nina.style.transform = 'translateX(-20px) skewX(5deg)';
        stateText.innerText = 'WALKING BACKWARD';
    }
    
    // AGACHAR
    else if (key === 's') {
        nina.style.transform = 'scaleY(0.6) translateY(40px)';
        stateText.innerText = 'DUCKING';
    }

    // CHUTAR (Simulado com escala)
    else if (key === 'j') {
        nina.style.transform = 'scaleX(1.2) rotate(-5deg)';
        stateText.innerText = 'KICKING';
    }

    // LEVAR DANO
    else if (key === 'k') {
        health -= 10;
        hpFill.style.width = health + "%";
        nina.classList.add('sprite-hurt');
        stateText.innerText = 'TAKING DAMAGE';
        
        if(health <= 0) {
            stateText.innerText = 'DEAD';
            nina.style.transform = 'rotate(90deg) translateY(100px)';
        }
    }
});

document.addEventListener('keyup', () => {
    nina.classList.remove('sprite-hurt');
    nina.style.transform = 'scaleY(1) translateX(0)';
    if(health > 0) stateText.innerText = 'IDLE';
});