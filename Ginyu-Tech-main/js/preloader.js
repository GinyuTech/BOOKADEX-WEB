document.addEventListener('DOMContentLoaded', function () {
    // Exibe o preloader
    const preloader = document.querySelector('.preloader');

    // Desabilita a barra de rolagem
    document.body.style.overflow = 'hidden';

    // Define um tempo limite de 2 segundos (2000 milissegundos)
    setTimeout(function () {
        // Esconde o preloader após 2 segundos
        preloader.style.display = 'none';

        // Reabilita a barra de rolagem
        document.body.style.overflow = 'auto';
    }, 2000);
});
