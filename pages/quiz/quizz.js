import { trocarTema, verificarTema } from "../../js/tema-helpers.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");
const assunto = localStorage.getItem("assunto");
let quiz = {};
let pontos = 0;
let pergunta = 1;
let resposta = "";
let idInputResposta = "";
let respostaCorretaId = "";

function normalizarAssunto(assunto) {
    return assunto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
}

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema);
});
verificarTema(body, botaoTema);

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone");
    const iconeImg = document.querySelector(".assunto_icone img");
    const assuntoTitulo = document.querySelector(".assunto h1");

    divIcone.classList.add(normalizarAssunto(assunto));
    iconeImg.setAttribute(
        "src",
        `../../assets/images/${normalizarAssunto(assunto)}.svg`
    );
    iconeImg.setAttribute("alt", `${assunto}`);
    assuntoTitulo.innerText = assunto;
}

async function buscarPerguntas() {
    const urlDados = "../../data.json";

    await fetch(urlDados)
        .then((resposta) => resposta.json())
        .then((dados) => {
            dados.quizzes.forEach((dado) => {
                if (dado.title === normalizarAssunto(assunto)) {
                    quiz = dado;
                }
            });
        });
}

function montarPergunta() {
    const main = document.querySelector("main");

    main.innerHTML = `
    <section class="pergunta">
        <div>
            <p>Questão ${pergunta} de 10</p>
            <h2>${quiz.questions[pergunta - 1].question}</h2>
        </div>
        <div class="barra_progresso">
            <div style="width: ${pergunta * 10}%"></div>
        </div>
    </section>
    <section class="alternativas">
        <form>
            <label for="alternativa_a">
                <input
                    name="alternativa"
                    type="radio"
                    id="alternativa_a"
                    value="${quiz.questions[pergunta - 1].options[0].trim()}"
                />
                <div>
                    <span>A</span>
                    ${quiz.questions[pergunta - 1].options[0]}
                </div>
            </label>
            <label for="alternativa_b">
                <input
                    name="alternativa"
                    type="radio"
                    id="alternativa_b"
                    value="${quiz.questions[pergunta - 1].options[1].trim()}"
                />
                <div>
                    <span>B</span>
                    ${quiz.questions[pergunta - 1].options[1]}
                </div>
            </label>
            <label for="alternativa_c">
                <input
                    name="alternativa"
                    type="radio"
                    id="alternativa_c"
                    value="${quiz.questions[pergunta - 1].options[2].trim()}"
                />
                <div>
                    <span>C</span>
                    ${quiz.questions[pergunta - 1].options[2]}
                </div>
            </label>
            <label for="alternativa_d">
                <input
                    name="alternativa"
                    type="radio"
                    id="alternativa_d"
                    value="${quiz.questions[pergunta - 1].options[3].trim()}"
                />
                <div>
                    <span>D</span>
                    ${quiz.questions[pergunta - 1].options[3]}
                </div>
            </label>
        </form>
    </section>
    `;
}

function validarResposta(evento) {
    resposta = evento.target.value;
    idInputResposta = evento.target.id;

    if (resposta === quiz.questions[pergunta - 1].answer) {
        document
            .querySelector(`label[for='${idInputResposta}']`)
            .setAttribute("id", "correta");
        pontos += 1;
    } else {
        document
            .querySelector(`label[for='${idInputResposta}']`)
            .setAttribute("id", "errada");
        document
            .querySelector(`label[for='${respostaCorretaId}']`)
            .setAttribute("id", "correta");
    }

    pergunta += 1;

    if (pergunta > quiz.questions.length) {
        finalizar();
    } else {
        setTimeout(() => {
            montarPergunta();
            adicionarEventosInputs();
        }, 1000); // Adiciona um pequeno atraso para o usuário visualizar a resposta antes de avançar
    }
}

function finalizar() {
    localStorage.setItem("pontos", pontos);
    window.location.href = "../resultado/resultado.html";
}

function adicionarEventosInputs() {
    const inputsResposta = document.querySelectorAll(".alternativas input");
    inputsResposta.forEach((input) => {
        input.addEventListener("click", validarResposta);

        if (input.value === quiz.questions[pergunta - 1].answer) {
            respostaCorretaId = input.id;
        }
    });
}

async function iniciar() {
    alterarAssunto();
    await buscarPerguntas();
    montarPergunta();
    adicionarEventosInputs();
}

iniciar();
