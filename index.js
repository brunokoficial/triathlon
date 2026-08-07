// ==========================================
// LÓGICA UNIVERSAL TRIATHLON - INDEX.JS
// ==========================================

// 1. SISTEMA DE ACESSO (LOGIN)
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

// 2. SISTEMA DE INTERAÇÃO UNIFICADO (CURTIDAS & DESLIKES)
function inicializarInteracao() {
    // Não carregar na página de login
    if (window.location.pathname.includes('acesso.html')) return;

    // Elementos do DOM
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const likeCount = document.getElementById('likeCount');
    const dislikeCount = document.getElementById('dislikeCount');

    if (!likeBtn || !dislikeBtn) return;

    // Carregar dados persistentes (LocalStorage)
    let totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;
    let totalDislikes = parseInt(localStorage.getItem('totalDislikes')) || 0;
    
    likeCount.textContent = totalLikes;
    dislikeCount.textContent = totalDislikes;

    // Verificar se já interagiu nesta sessão (SessionStorage)
    if (sessionStorage.getItem('interagiu')) {
        travarBotoes();
    }

    // Evento: Curtir
    likeBtn.addEventListener('click', () => {
        if (!sessionStorage.getItem('interagiu')) {
            totalLikes++;
            localStorage.setItem('totalLikes', totalLikes);
            sessionStorage.setItem('interagiu', 'true');
            likeCount.textContent = totalLikes;
            travarBotoes();
            animarBotao(likeBtn);
        }
    });

    // Evento: Descurtir
    dislikeBtn.addEventListener('click', () => {
        if (!sessionStorage.getItem('interagiu')) {
            totalDislikes++;
            localStorage.setItem('totalDislikes', totalDislikes);
            sessionStorage.setItem('interagiu', 'true');
            dislikeCount.textContent = totalDislikes;
            travarBotoes();
            animarBotao(dislikeBtn);
        }
    });

    function travarBotoes() {
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
        likeBtn.classList.add('disabled');
        dislikeBtn.classList.add('disabled');
    }

    function animarBotao(btn) {
        btn.style.transform = 'scale(1.4)';
        setTimeout(() => btn.style.transform = 'scale(1)', 250);
    }
}

// 3. SAUDAÇÃO E REDIRECIONAMENTO
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

// 4. INICIALIZAÇÃO AO CARREGAR
document.addEventListener('DOMContentLoaded', () => {
    gerenciarSaudacao();
    inicializarInteracao();

    // Foco automático no login
    const inputNome = document.getElementById('nome');
    if (inputNome) inputNome.focus();

    // Atalho tecla Enter
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.getElementById('nome')) {
            salvarAcesso();
        }
    });
});
