document.addEventListener('DOMContentLoaded', () => {
    const categoriaBtn = document.getElementById('categoriaBtn');
    const categoriaMenu = document.getElementById('categoriaMenu');

    // Verifica se os elementos do dropdown existem na página
    if (categoriaBtn && categoriaMenu) {
        categoriaBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique no botão feche o dropdown imediatamente
            categoriaMenu.classList.toggle('hidden');
        });

        // Fecha o menu se clicar fora
        window.addEventListener('click', (e) => {
            if (!categoriaBtn.contains(e.target) && !categoriaMenu.contains(e.target)) {
                categoriaMenu.classList.add('hidden');
            }
        });
    }
});