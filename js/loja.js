const substore = document.querySelector(".substore");
    const itemBoxes = document.querySelectorAll(".item_box h2");
    const subAbas = {
        "Roupas": document.getElementById("aba_roupas"),
        "Acessórios": document.getElementById("aba_acess"),
        "Octoken": document.getElementById("aba_octoken"),
        "Item": document.getElementById("aba_item")
    };

    function showElementWithTransition(toShow, toHide) {
        toHide.classList.remove("active");
        setTimeout(() => {
            toHide.style.display = "none";
            toShow.style.display = "flex";
            setTimeout(() => {
                toShow.classList.add("active");
            }, 10);
        }, 400);
    }

    itemBoxes.forEach(box => {
        box.parentElement.addEventListener("click", () => {
            const aba = subAbas[box.textContent.trim()];
            if (aba) {
                showElementWithTransition(aba, substore);
            }
        });
    });

    Object.values(subAbas).forEach(aba => {
        const btn = aba.querySelector(".btn-voltar");
        btn.addEventListener("click", () => {
            showElementWithTransition(substore, aba);
        });
    });

    window.addEventListener("DOMContentLoaded", () => {
        substore.style.display = "flex";
        substore.classList.add("active");
    });