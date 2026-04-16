const characters = {
    'fencer': {
        name: 'Valerius Bloodbrand',
        lore: 'O mestre das lâminas renegado. Sua velocidade é inigualável.',
        power: '85%',
        image: 'assets/fencer_big.png' // Substitua pelo seu arquivo
    },
    'noble': {
        name: 'Countess Elizabeth',
        lore: 'A pureza do sangue é sua arma. Controla o campo de longe.',
        power: '75%',
        image: 'assets/noble_big.png'
    },
    'brawler': {
        name: 'Mina The Beast',
        lore: 'Transformação visceral. Força bruta capaz de esmagar aço.',
        power: '100%',
        image: 'assets/brawler_big.png'
    }
};

function updateSelection(charKey) {
    const char = characters[charKey];
    
    // Atualiza Texto e Barras
    document.getElementById('p1-name').innerText = char.name;
    document.getElementById('char-lore').innerText = char.lore;
    document.getElementById('power-bar').style.width = char.power;

    // Atualiza Imagem Grande
    const portrait = document.getElementById('char-big-preview');
    portrait.style.backgroundImage = `url(${char.image})`;

    // Reinicia animação de entrada
    portrait.classList.remove('animate-char');
    void portrait.offsetWidth; // Trigger reflow
    portrait.classList.add('animate-char');
}

function confirmSelection() {
    // Efeito de flash ou redirecionamento
    document.body.style.backgroundColor = "white";
    setTimeout(() => {
        document.body.style.backgroundColor = "black";
        alert("FIGHT!");
    }, 100);
}