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

// 2. SISTEMA DE INTERAÇÃO INTELIGENTE (ALTERNÂNCIA CURTIDAS & DESLIKES)
function inicializarInteracao() {
    if (window.location.pathname.includes('acesso.html')) return;

    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const likeCount = document.getElementById('likeCount');
    const dislikeCount = document.getElementById('dislikeCount');

    if (!likeBtn || !dislikeBtn) return;

    // Carregar dados persistentes
    let totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;
    let totalDislikes = parseInt(localStorage.getItem('totalDislikes')) || 0;
    
    likeCount.textContent = totalLikes;
    dislikeCount.textContent = totalDislikes;

    // Recupera a escolha feita nesta sessão ('like', 'dislike' ou null)
    let escolhaAtual = sessionStorage.getItem('escolhaSessao');

    // Função para atualizar o visual dos botões baseado na escolha
    function atualizarVisual() {
        if (escolhaAtual === 'like') {
            likeBtn.style.opacity = '1';
            likeBtn.style.filter = 'none';
            dislikeBtn.style.opacity = '0.3';
            dislikeBtn.style.filter = 'grayscale(1)';
        } else if (escolhaAtual === 'dislike') {
            dislikeBtn.style.opacity = '1';
            dislikeBtn.style.filter = 'none';
            likeBtn.style.opacity = '0.3';
            likeBtn.style.filter = 'grayscale(1)';
        } else {
            likeBtn.style.opacity = '1';
            dislikeBtn.style.opacity = '1';
            likeBtn.style.filter = 'none';
            dislikeBtn.style.filter = 'none';
        }
    }

    atualizarVisual();

    // Evento: Curtir (Permite alternar se já tiver dado dislike)
    likeBtn.addEventListener('click', () => {
        if (escolhaAtual === 'like') return;

        // Se estava em dislike, remove o dislike anterior
        if (escolhaAtual === 'dislike') {
            totalDislikes = Math.max(0, totalDislikes - 1);
            localStorage.setItem('totalDislikes', totalDislikes);
            dislikeCount.textContent = totalDislikes;
        }

        // Adiciona o like
        totalLikes++;
        localStorage.setItem('totalLikes', totalLikes);
        likeCount.textContent = totalLikes;

        escolhaAtual = 'like';
        sessionStorage.setItem('escolhaSessao', 'like');
        atualizarVisual();
        animarBotao(likeBtn);
    });

    // Evento: Descurtir (Permite alternar se já tiver dado like)
    dislikeBtn.addEventListener('click', () => {
        if (escolhaAtual === 'dislike') return;

        // Se estava em like, remove o like anterior
        if (escolhaAtual === 'like') {
            totalLikes = Math.max(0, totalLikes - 1);
            localStorage.setItem('totalLikes', totalLikes);
            likeCount.textContent = totalLikes;
        }

        // Adiciona o dislike
        totalDislikes++;
        localStorage.setItem('totalDislikes', totalDislikes);
        dislikeCount.textContent = totalDislikes;

        escolhaAtual = 'dislike';
        sessionStorage.setItem('escolhaSessao', 'dislike');
        atualizarVisual();
        animarBotao(dislikeBtn);
    });

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

// 4. INICIALIZAÇÃO UNIVERSAL
document.addEventListener('DOMContentLoaded', () => {
    gerenciarSaudacao();
    inicializarInteracao();

    const inputNome = document.getElementById('nome');
    if (inputNome) inputNome.focus();

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.getElementById('nome')) {
            salvarAcesso();
        }
    });
});
