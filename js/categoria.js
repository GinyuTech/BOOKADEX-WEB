const categoriaBtn = document.getElementById('categoriaBtn');
const categoriaMenu = document.getElementById('categoriaMenu');

categoriaBtn.addEventListener('click', () => {
  categoriaMenu.classList.toggle('hidden');
});

// Fecha o menu se clicar fora
window.addEventListener('click', (e) => {
  if (!categoriaBtn.contains(e.target) && !categoriaMenu.contains(e.target)) {
    categoriaMenu.classList.add('hidden');
  }
});

function scrollToGenre(id) {
    const element = document.getElementById(id);
    const headerOffset = 100; // altura em pixels que você quer deixar de espaço antes da seção
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}



