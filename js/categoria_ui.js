document.addEventListener('DOMContentLoaded', () => {
    // A função scrollToGenre já pode ser global se estiver no HTML ou neste script.
    // Se for chamada via onclick no HTML, ela precisa ser global (window.scrollToGenre).
    // Ou você pode adicionar listeners aqui para os botões.

    // Exemplo: Se quiser adicionar listeners aqui em vez de onclick no HTML:
    // const generoButtons = document.querySelectorAll('.genre-buttons button');
    // generoButtons.forEach(button => {
    //     button.addEventListener('click', (event) => {
    //         const genreId = event.target.getAttribute('onclick').match(/'(.*)'/)[1]; // Extrai o ID
    //         scrollToGenre(genreId);
    //     });
    // });
});

// Tornar a função global para que os onclicks no HTML a encontrem
window.scrollToGenre = function(id) {
    const element = document.getElementById(id);
    if (element) { // Adicionar verificação para garantir que o elemento existe
        const headerOffset = 100; // altura em pixels que você quer deixar de espaço antes da seção
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};