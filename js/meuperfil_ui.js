// js/meuperfil_ui.js

document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    const hellopeople = document.getElementById('hellopeople');
    const namefield = document.getElementById('inputname');
    const userfield = document.getElementById('inputuser');
    const emailfield = document.getElementById('inputemail');
    const phonefield = document.getElementById('inputphone');
    const mainProfileImage = document.getElementById('mainProfileImage');

    if (usuarioLogadoString) {
        const usuario = JSON.parse(usuarioLogadoString);

        // Atualiza a imagem principal do perfil
        if (mainProfileImage) {
            mainProfileImage.src = usuario.fotoPerfil || 'img/img_perfil/default_profile.png';
        }

        // Atualiza a mensagem de saudação
        if (hellopeople) {
            hellopeople.innerHTML = `<h3>Olá, <span>${usuario.nomeUsuario || 'Usuário'}</span>!</h3>`;
        }

        // Preenche os campos do formulário
        if (namefield) namefield.value = usuario.nomeUsuario || '';
        if (userfield) userfield.value = usuario.apelido || '';
        if (emailfield) emailfield.value = usuario.email || '';
        if (phonefield) phonefield.value = usuario.telefone || '';

        // TODO: Você precisará carregar os dados de quizzes, perguntas e pontos
        // Estes dados provavelmente não estão no localStorage e precisam de uma chamada à API.
        // Por agora, eles continuam estáticos no HTML.
        // Exemplo:
        // document.querySelector('.info_box h2:nth-of-type(1)').textContent = usuario.quizzesRespondidos || '0';
        // ...
        
    } else {
        // Se não houver usuário logado na página de perfil, talvez redirecione para login
        // Ou mostre uma mensagem de erro, dependendo do seu fluxo de UX.
        // Por enquanto, não faz nada para evitar loops de redirecionamento.
        console.warn("Usuário não logado na página de perfil. Alguns elementos podem não ser preenchidos.");
    }
});