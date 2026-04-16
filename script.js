// Estado do jogo
let p1 = { name: "Ryu", health: 100, special: 0, img: "https://via.placeholder.com/200x300?text=Ryu" };
let p2 = { name: "Ken", health: 100, special: 0, img: "https://via.placeholder.com/200x300?text=Ken" };
let selected = false;
let currentPlayer = 1; // 1 = player1, 2 = player2 (para ataques)

// Elementos DOM
const p1HealthFill = document.getElementById('p1-health');
const p1HealthValue = document.getElementById('p1-health-value');
const p1SpecialFill = document.getElementById('p1-special');
const p1SpecialValue = document.getElementById('p1-special-value');
const p2HealthFill = document.getElementById('p2-health');
const p2HealthValue = document.getElementById('p2-health-value');
const p2SpecialFill = document.getElementById('p2-special');
const p2SpecialValue = document.getElementById('p2-special-value');
const fighter1Img = document.getElementById('fighter1-img');
const fighter2Img = document.getElementById('fighter2-img');
const logList = document.getElementById('log-list');
const characterSelectDiv = document.getElementById('character-select');
const controlsDiv = document.getElementById('controls');

// Função para adicionar log
function addLog(msg) {
    const li = document.createElement('li');
    li.textContent = msg;
    logList.prepend(li);
    if (logList.children.length > 8) logList.removeChild(logList.lastChild);
}

// Atualizar HUD
function updateHUD() {
    p1HealthFill.style.width = `${p1.health}%`;
    p1HealthValue.textContent = `${p1.health}%`;
    p1SpecialFill.style.width = `${p1.special}%`;
    p1SpecialValue.textContent = `${p1.special}%`;
    p2HealthFill.style.width = `${p2.health}%`;
    p2HealthValue.textContent = `${p2.health}%`;
    p2SpecialFill.style.width = `${p2.special}%`;
    p2SpecialValue.textContent = `${p2.special}%`;
    fighter1Img.src = p1.img;
    fighter2Img.src = p2.img;
    document.getElementById('player1-info').querySelector('.fighter-name').textContent = p1.name;
    document.getElementById('player2-info').querySelector('.fighter-name').textContent = p2.name;
}

// Aplicar dano e verificar KO
function applyDamage(player, damage, attackerName) {
    if (player.health <= 0) return;
    player.health = Math.max(0, player.health - damage);
    updateHUD();
    addLog(`${attackerName} causou ${damage} de dano!`);
    if (player.health <= 0) {
        addLog(`💀 ${player.name} foi derrotado! ${attackerName} venceu! 💀`);
        controlsDiv.style.display = 'none';
        characterSelectDiv.style.display = 'block';
        selected = false;
    }
}

// Ataques do Player 1 (Ryu)
function p1Light() { if (!selected || p1.health <= 0 || p2.health <= 0) return; applyDamage(p2, 8, p1.name); addSpecial(p1, 10); }
function p1Heavy() { if (!selected || p1.health <= 0 || p2.health <= 0) return; applyDamage(p2, 15, p1.name); addSpecial(p1, 15); }
function p1Special() {
    if (!selected || p1.health <= 0 || p2.health <= 0) return;
    if (p1.special >= 100) {
        applyDamage(p2, 30, `${p1.name} (Hadouken)`);
        p1.special = 0;
        updateHUD();
        addLog(`✨ ${p1.name} usou HADOUKEN! ✨`);
    } else {
        addLog(`⚠️ Energia especial insuficiente para ${p1.name}!`);
    }
}

// Ataques do Player 2 (Ken)
function p2Light() { if (!selected || p1.health <= 0 || p2.health <= 0) return; applyDamage(p1, 8, p2.name); addSpecial(p2, 10); }
function p2Heavy() { if (!selected || p1.health <= 0 || p2.health <= 0) return; applyDamage(p1, 15, p2.name); addSpecial(p2, 15); }
function p2Special() {
    if (!selected || p1.health <= 0 || p2.health <= 0) return;
    if (p2.special >= 100) {
        applyDamage(p1, 30, `${p2.name} (Hadouken)`);
        p2.special = 0;
        updateHUD();
        addLog(`✨ ${p2.name} usou HADOUKEN! ✨`);
    } else {
        addLog(`⚠️ Energia especial insuficiente para ${p2.name}!`);
    }
}

function addSpecial(player, amount) {
    player.special = Math.min(100, player.special + amount);
    updateHUD();
}

// Seleção de personagem
document.querySelectorAll('.select-fighter').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = btn.closest('.char-card');
        const fighter = card.getAttribute('data-fighter');
        if (!selected) {
            // Escolhe o lutador para o Player 1
            if (fighter === 'ryu') {
                p1 = { name: "Ryu", health: 100, special: 0, img: "https://via.placeholder.com/200x300?text=Ryu" };
            } else if (fighter === 'chunli') {
                p1 = { name: "Chun-Li", health: 100, special: 0, img: "https://via.placeholder.com/200x300?text=Chun-Li" };
            } else {
                p1 = { name: "Ken", health: 100, special: 0, img: "https://via.placeholder.com/200x300?text=Ken" };
            }
            // Oponente fixo (Ken) ou poderia ser escolhido depois
            p2 = { name: "Ken", health: 100, special: 0, img: "https://via.placeholder.com/200x300?text=Ken" };
            selected = true;
            updateHUD();
            characterSelectDiv.style.display = 'none';
            controlsDiv.style.display = 'block';
            addLog(`🎮 Luta iniciada! ${p1.name} vs ${p2.name}`);
        }
    });
});

// Botão reset
document.getElementById('reset-fight').addEventListener('click', () => {
    p1.health = 100;
    p1.special = 0;
    p2.health = 100;
    p2.special = 0;
    selected = true;
    updateHUD();
    addLog(`🔄 Luta reiniciada!`);
    controlsDiv.style.display = 'block';
    characterSelectDiv.style.display = 'none';
});

// Eventos dos botões de controle
document.getElementById('p1-light').addEventListener('click', p1Light);
document.getElementById('p1-heavy').addEventListener('click', p1Heavy);
document.getElementById('p1-special').addEventListener('click', p1Special);
document.getElementById('p2-light').addEventListener('click', p2Light);
document.getElementById('p2-heavy').addEventListener('click', p2Heavy);
document.getElementById('p2-special').addEventListener('click', p2Special);

// Efeito visual de hit (simples)
function hitEffect(fighterId) {
    const fighter = document.getElementById(fighterId);
    fighter.classList.add('hit');
    setTimeout(() => fighter.classList.remove('hit'), 150);
}

// Chamar hitEffect nos ataques (adicionar dentro de applyDamage)
const originalApplyDamage = applyDamage;
window.applyDamage = function(player, damage, attackerName) {
    if (player === p1) hitEffect('fighter1');
    else hitEffect('fighter2');
    originalApplyDamage(player, damage, attackerName);
};
applyDamage = window.applyDamage;