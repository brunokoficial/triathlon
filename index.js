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

// 2. SISTEMA DE INTERAÇÃO (LIKE/DISLIKE COM CANCELAMENTO E TRAVA)
function inicializarInteracao() {
    if (window.location.pathname.includes('acesso.html')) return;

    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const likeCount = document.getElementById('likeCount');
    const dislikeCount = document.getElementById('dislikeCount');

    if (!likeBtn || !dislikeBtn) return;

    // Carregar dados persistentes do LocalStorage
    let totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;
    let totalDislikes = parseInt(localStorage.getItem('totalDislikes')) || 0;
    
    likeCount.textContent = totalLikes;
    dislikeCount.textContent = totalDislikes;

    // Recupera a escolha feita nesta sessão ('like', 'dislike' ou null)
    let escolhaSessao = sessionStorage.getItem('escolhaSessao');

    // Função para atualizar o visual e estado dos botões
    function atualizarInterface() {
        // Reset visual
        likeBtn.classList.remove('active', 'disabled');
        dislikeBtn.classList.remove('active', 'disabled');
        likeBtn.disabled = false;
        dislikeBtn.disabled = false;

        if (escolhaSessao === 'like') {
            likeBtn.classList.add('active');
            dislikeBtn.classList.add('disabled');
            dislikeBtn.disabled = true; // Impede clicar no dislike enquanto like está ativo
        } else if (escolhaSessao === 'dislike') {
            dislikeBtn.classList.add('active');
            likeBtn.classList.add('disabled');
            likeBtn.disabled = true; // Impede clicar no like enquanto dislike está ativo
        }
    }

    atualizarInterface();

    // Lógica para o botão de LIKE
    likeBtn.addEventListener('click', () => {
        if (escolhaSessao === 'like') {
            // SEGUNDO CLIQUE: Remove a curtida (Desativa)
            totalLikes = Math.max(0, totalLikes - 1);
            escolhaSessao = null;
            sessionStorage.removeItem('escolhaSessao');
        } else {
            // PRIMEIRO CLIQUE: Adiciona a curtida (Ativa)
            totalLikes++;
            escolhaSessao = 'like';
            sessionStorage.setItem('escolhaSessao', 'like');
        }
        
        localStorage.setItem('totalLikes', totalLikes);
        likeCount.textContent = totalLikes;
        atualizarInterface();
        animarBotao(likeBtn);
    });

    // Lógica para o botão de DISLIKE
    dislikeBtn.addEventListener('click', () => {
        if (escolhaSessao === 'dislike') {
            // SEGUNDO CLIQUE: Remove a descurtida (Desativa)
            totalDislikes = Math.max(0, totalDislikes - 1);
            escolhaSessao = null;
            sessionStorage.removeItem('escolhaSessao');
        } else {
            // PRIMEIRO CLIQUE: Adiciona a descurtida (Ativa)
            totalDislikes++;
            escolhaSessao = 'dislike';
            sessionStorage.setItem('escolhaSessao', 'dislike');
        }

        localStorage.setItem('totalDislikes', totalDislikes);
        dislikeCount.textContent = totalDislikes;
        atualizarInterface();
        animarBotao(dislikeBtn);
    });

    function animarBotao(btn) {
        btn.style.transform = 'scale(1.4)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
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
