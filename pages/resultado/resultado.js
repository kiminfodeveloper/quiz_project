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
    localStorage.removeItem("pontos");
    localStorage.removeItem("assunto");
    window.location.href = "../../index.html";
}

inserirResultado();
