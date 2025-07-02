document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos com a classe 'carrossel'
    const carousels = document.querySelectorAll('.carrossel');

    carousels.forEach(carousel => {
        const slider = carousel.querySelector('.slider');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');

        if (slider && prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                // Rola para a esquerda (um "card" por vez, aproximadamente)
                const scrollAmount = slider.offsetWidth * 0.8; // Rola 80% da largura visível
                slider.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', () => {
                // Rola para a direita
                const scrollAmount = slider.offsetWidth * 0.8; // Rola 80% da largura visível
                slider.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Opcional: Adicionar lógica para desabilitar/habilitar botões
            // quando chegar no início/fim do carrossel (mais complexo para um exemplo básico)
            // slider.addEventListener('scroll', () => {
            //     prevBtn.disabled = slider.scrollLeft === 0;
            //     nextBtn.disabled = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
            // });
            // // Estado inicial dos botões
            // slider.dispatchEvent(new Event('scroll'));
        }
    });
});