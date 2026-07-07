// LÓGICA UNIVERSAL TRIATHLON - INDEX.JS

// 1. Função de Acesso (Login)
function salvarAcesso(event) {
    if (event) event.preventDefault();
    
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');

    if (inputNome && inputIdade) {
        const nome = inputNome.value.trim();
        const idade = inputIdade.value.trim();

        if (nome && idade) {
            localStorage.setItem('usuarioNome', nome);
            localStorage.setItem('usuarioIdade', idade);
            window.location.href = 'index.html';
        } else {
            alert('Por favor, preencha seu nome e idade.');
        }
    }
}

// 2. Sistema de Curtidas (Style1)
function inicializarSistemaCurtidas() {
    // Não inicializa curtidas na página de acesso
    if (window.location.pathname.includes('acesso.html')) return;

    // Cria a estrutura do botão dinamicamente
    const likeContainer = document.createElement('div');
    likeContainer.className = 'like-container';
    likeContainer.innerHTML = `
        <span class="like-count" id="countDisplay">0</span>
        <button class="like-button" id="likeBtn" title="Curtir esta página">👍</button>
    `;
    document.body.appendChild(likeContainer);

    const likeBtn = document.getElementById('likeBtn');
    const countDisplay = document.getElementById('countDisplay');

    // Recupera total salvo
    let totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;
    countDisplay.textContent = totalLikes;

    // Verifica se já curtiu nesta sessão
    if (sessionStorage.getItem('curtiu')) {
        likeBtn.disabled = true;
        likeBtn.style.opacity = '0.5';
    }

    // Evento de clique
    likeBtn.addEventListener('click', () => {
        if (!sessionStorage.getItem('curtiu')) {
            totalLikes++;
            localStorage.setItem('totalLikes', totalLikes);
            sessionStorage.setItem('curtiu', 'true');
            countDisplay.textContent = totalLikes;
            likeBtn.disabled = true;
            likeBtn.style.opacity = '0.5';
            
            // Efeito visual de clique
            likeBtn.style.transform = 'scale(1.2)';
            setTimeout(() => likeBtn.style.transform = 'scale(1)', 200);
        }
    });
}

// 3. Gerenciamento de Saudação e Redirecionamento
function gerenciarSaudacao() {
    const nomeUsuario = localStorage.getItem('usuarioNome');
    const saudacaoDiv = document.getElementById('saudacao');

    if (saudacaoDiv) {
        if (nomeUsuario) {
            saudacaoDiv.innerHTML = `<p>Bem-vindo, <strong>${nomeUsuario}</strong>!</p>`;
        } else if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            window.location.href = 'acesso.html';
        }
    }
}

// 4. Inicialização Universal
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os módulos
    gerenciarSaudacao();
    inicializarSistemaCurtidas();

    // Foco automático no login
    const inputNome = document.getElementById('nome');
    if (inputNome) inputNome.focus();

    // Ouvinte tecla Enter
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.getElementById('nome')) {
            salvarAcesso();
        }
    });
});
