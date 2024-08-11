// Exibir o modal quando a página for carregada
window.onload = function () {
    const modal = document.getElementById("quizModal");

    // Verifica se o usuário já completou o quiz
    const quizCompleted = localStorage.getItem("quizCompleted");

    if (!quizCompleted) {
        modal.style.display = "block";
    }
};

// Função para mudar a pergunta
function showNextQuestion(currentQuestionId) {
    const currentQuestion = document.getElementById(currentQuestionId);
    const nextQuestionId = `question${
        parseInt(currentQuestionId.replace("question", "")) + 1
    }`;
    const nextQuestion = document.getElementById(nextQuestionId);

    if (nextQuestion) {
        setTimeout(() => {
            currentQuestion.style.display = "none";
            nextQuestion.style.display = "block";
        }, 300); // Espera 0,3 segundos antes de mostrar a próxima pergunta
    } else {
        // Se não houver mais perguntas, exibe o formulário de lead
        document.getElementById("questions").style.display = "none";
        document.getElementById("leadForm").style.display = "block";
    }
}

// Adiciona evento de clique aos inputs de rádio
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
        const currentQuestionId = event.target.closest(".question").id;
        showNextQuestion(currentQuestionId);
    });
});

document
    .getElementById("quizForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os valores dos campos do formulário
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;

        // Cria um objeto com os dados do formulário
        const formData = {
            name: name,
            email: email,
            phone: phone,
        };

        // Converte o objeto em JSON
        const jsonData = JSON.stringify(formData);

        // Envia os dados para o PHP usando fetch
        fetch("form/process_quiz.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                if (data.status === "success") {
                    // Armazena no localStorage que o quiz foi completado
                    localStorage.setItem("quizCompleted", "true");

                    // Esconde o modal
                    document.getElementById("quizModal").style.display = "none";

                    // Exibe uma mensagem de sucesso, redireciona para outra página, etc.
                    alert("Dados enviados com sucesso!");

                    // Redireciona para outra página sem recarregar a página atual
                    window.location.href = "index.html";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
