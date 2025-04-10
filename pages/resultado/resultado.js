import { trocarTema, verificarTema } from "../../js/tema-helpers.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");
const assunto = localStorage.getItem("assunto");
const botaoJogarNovamente = document.querySelector("main button");

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema);
});
verificarTema(body, botaoTema);

botaoJogarNovamente.addEventListener("click", jogaNovamente);

function normalizarAssunto(assunto) {
    return assunto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
}
function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone");
    const iconeImg = document.querySelector(".assunto_icone img");
    const assuntoTitulo = document.querySelector(".assunto h1");

    const assuntoNormalizado = normalizarAssunto(assunto);

    divIcone.classList.add(assuntoNormalizado);
    iconeImg.setAttribute(
        "src",
        `../../assets/images/${assuntoNormalizado}.svg`
    );
    iconeImg.setAttribute("alt", assunto);
    assuntoTitulo.innerText = assunto;
}

alterarAssunto();

function inserirResultado() {
    const sectionPontuacao = document.querySelector(".pontuacao");
    const divAssunto = document.querySelector(".assunto");
    const pontos = localStorage.getItem("pontos");

    sectionPontuacao.innerHTML = `
    ${divAssunto.outerHTML}
    <strong>${pontos}</strong>
    <p>de 10</p>`;
}

function jogaNovamente() {
    const pontos = localStorage.getItem("pontos");

    if (pontos >= 8) {
        const botaoNomeTexto = document.querySelector(".botaoReiniciar");
        if (botaoNomeTexto) {
            // Define a URL de redirecionamento com base no assunto
            let redirectUrl = "";
            switch (assunto) {
                case "Nível Fácil":
                    redirectUrl = "../../index.html";
                    break;

                case "Nível Intermediário":
                    redirectUrl = "../../index.html";
                    break;

                case "Nível Difícil":
                    redirectUrl = "../../index.html";
                    break;

                case "Nível Expert":
                    redirectUrl = "../../index.html";
                    break;

                default:
                    localStorage.removeItem("pontos");
                    localStorage.removeItem("assunto");
                    window.location.href = "../../index.html";

                    return;
            }

            // Atualiza o texto do botão e define o evento de clique para redirecionar
            botaoNomeTexto.innerText = "JOGAR NOVAMENTE";
            botaoNomeTexto.addEventListener("click", () => {
                window.location.href = redirectUrl;
            });
        }
    } else {
        // Redireciona para a página inicial se a pontuação for menor que 8
        localStorage.removeItem("pontos");
        localStorage.removeItem("assunto");
        window.location.href = "../../index.html";
    }
}

// Certifique-se de que a função seja chamada após o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", jogaNovamente);

inserirResultado();
