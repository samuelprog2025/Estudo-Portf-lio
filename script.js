document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Seletores ---
    const navLinks = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('section, header'); // Seleciona todas as seções e o cabeçalho
    const form = document.getElementById('formulario');
    const nomeInput = document.getElementById('nome-contato');
    const mensagemTextarea = document.getElementById('mensagem-contato');
    const botaoForm = document.querySelector('.botao-form');


    // --- 2. Função de Scroll Spy (Destacar Link Ativo) ---
    // Esta função verifica qual seção está visível e destaca o link correspondente na navegação.
    function activateLinkOnScroll() {
        let current = '';

        sections.forEach(section => {
            // Obtém a posição vertical do topo da seção
            const sectionTop = section.offsetTop;
            // Define o ponto onde o link deve ser ativado (ex: 150px abaixo do topo da tela)
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('ativo'); // Remove a classe de todos os links
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('ativo'); // Adiciona a classe no link ativo
            }
        });
    }

    // Adiciona o listener para rodar a função sempre que o usuário rolar
    window.addEventListener('scroll', activateLinkOnScroll);
    
    // Roda a função uma vez ao carregar a página para ativar o link inicial
    activateLinkOnScroll();


    // --- 3. Navegação Suave (Smooth Scroll) ---
    // Já existe no seu CSS (scroll-behavior: smooth), mas esta parte garante a ativação do link ao clicar
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // e.preventDefault(); // Descomente se quiser gerenciar o scroll 100% via JS, mas o CSS já faz isso
            
            // Remove a classe 'ativo' de todos e adiciona no link clicado imediatamente
            navLinks.forEach(l => l.classList.remove('ativo'));
            this.classList.add('ativo');
        });
    });


    // --- 4. Validação Básica e Feedback do Formulário ---
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário (para não recarregar a página)

        // Verifica se os campos estão preenchidos
        if (nomeInput.value.trim() === '' || mensagemTextarea.value.trim() === '') {
            alert('Por favor, preencha todos os campos do formulário antes de enviar.');
            return; // Interrompe o envio
        }

        // Simula o envio
        botaoForm.textContent = 'Enviando...';
        botaoForm.disabled = true;

        setTimeout(() => {
            // Limpa os campos após a simulação de envio
            nomeInput.value = '';
            mensagemTextarea.value = '';
            
            // Dá feedback de sucesso
            alert('Mensagem enviada com sucesso! Em breve, entrarei em contato.');
            
            // Restaura o botão
            botaoForm.textContent = 'Enviar E-mail';
            botaoForm.disabled = false;
        }, 2000); // Espera 2 segundos (simulando um envio de rede)

    });

});