import { trocarTema, verificarTema } from "./tema-helpers.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema);
});
verificarTema(body, botaoTema);

const botoesAssunto = document.querySelectorAll(".assuntos button");
botoesAssunto.forEach((botao) => {
    botao.addEventListener("click", selecionarAssunto);
});

function selecionarAssunto(evento) {
    const assunto = evento.target.innerText;
    localStorage.setItem("assunto", assunto);
    window.location.href = "./pages/quiz/quiz.html";
}

function clicarBotao() {
    const botaoWpp = document.querySelector(".btn_whatsApp");

    botaoWpp.addEventListener("click", function () {
        window.location.href =
            "https://chat.whatsapp.com/JcFfpm9dvAWKlF8eWYuuCJ";
    });
}

document.addEventListener("DOMContentLoaded", clicarBotao);
