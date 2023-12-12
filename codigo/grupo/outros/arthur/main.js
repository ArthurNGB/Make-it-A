$(document).ready(function(data){
    $.getJSON("main.json", function(data){
        console.log(data)

        $('.a-box-item-1').html(data.AtrNome);
        $('.a-box-item-2-1').html(data.AtrData);
        $('.sd-box-item-1').html(data.SdNome);
        $('.h-box-item-1').html(data.HjNome);
        $('.h-box-item-2').html(data.HjData);
        $('.mdum-box-item-1').html(data.EmNome);
        $('.mdum-box-item-2').html(data.EmData);

    }).fail(function(){
        console.log("Revise seu codigo")
    })
})

document.addEventListener("DOMContentLoaded", function() {
    const descricaoInputs = document.querySelectorAll(".inputTarefa");
    const cardsContainer = document.querySelector(".exibir-semdata");
    let cardsData = [];

    descricaoInputs.forEach((descricaoInput, index) => {
        descricaoInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.keyCode === 13) {
                const descricao = descricaoInput.value;

                if (descricao.trim() !== "") {
                    const cardData = { descricao };
                    cardsData.push(cardData);

                    displayCards();

                    descricaoInput.value = "";
                }
            }
        });
    });

    function displayCards() {
        cardsContainer.innerHTML = "";

        cardsData.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.className = "tarefa-semdata";
            cardElement.innerHTML = `
                    <p class="sd-box-item-1">${card.descricao}</p>
                    <div class="button-tarefa">
                        <button class="but-check">
                            <i class="bi-check-lg"></i>
                        </button>
                        <button class="but-pencil">
                            <i class="bi-pencil-fill"></i>
                        </button>
                        <button onclick="deleteCard(${index})" class="but-trash">
                            <i class="bi-trash3-fill"></i>
                        </button>
                    </div>
            `;
            cardsContainer.appendChild(cardElement);

            const deleteButton = cardElement.querySelector(".but-trash");
            deleteButton.addEventListener("click", function() {
                deleteCard(index);
            });
        });
    }

    function deleteCard(index) {
        cardsData.splice(index, 1);
        displayCards();
    }
});

function toggleCard1() {
    var card1 = document.querySelector(".tarefa-atrasado");

    if (card1.style.display === "none") {
        card1.style.display = "flex";
    } else {
        card1.style.display = "none";
    }
}

function toggleCard2() {
    var card2 = document.querySelector(".exibir-semdata");

    if (card2.style.display === "none") {
        card2.style.display = "flex";
    } else {
        card2.style.display = "none";
    }
}

function toggleCard3() {
    var card3 = document.querySelector(".tarefa-hoje");

    if (card3.style.display === "none") {
        card3.style.display = "flex";
    } else {
        card3.style.display = "none";
    }
}

function toggleCard4() {

    var card4 = document.querySelector(".tarefa-mdum");

    if (card4.style.display === "none") {
        card4.style.display = "flex";
    } else {
        card4.style.display = "none";
    }
}

