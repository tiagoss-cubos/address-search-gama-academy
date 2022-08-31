const cep = document.getElementById("cep");
const container = document.querySelector(".container-error");
const erro = document.createElement("p");
const btn = document.querySelector("[data-btn]");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  clearForm();
});

const clearForm = () => {
  document.getElementById("cep").value = "";
  document.getElementById("logradouro").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("localidade").value = "";
  document.getElementById("uf").value = "";
  document.getElementById("ibge").value = "";
};

const showData = (result) => {
  for (const campo in result) {
    if (document.getElementById(`${campo}`)) {
      const element = result[campo];
      document.getElementById(`${campo}`).value = element;
    }
  }

  erro.innerHTML = "";
};

const searchCEP = () => {
  cep.addEventListener("blur", (event) => {
    const validaCep = /^[0-9]{8}$/;
    const search = cep.value.replace(/\D/g, "");

    if (!cep.value || !validaCep.test(search)) {
      erro.innerText = "Informe um CEP válido!";
      erro.classList.add("erro");
      clearForm();

      return container.appendChild(erro);
    }

    const options = {
      method: "GET",
      mode: "cors",
      cache: "default",
    };

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
      .then((response) => {
        response.json().then((data) => showData(data));
      })
      .catch((event) => console.log(`Erro: ${event.message}`));
  });
};

const main = () => {
  searchCEP();
};

main();
