const input = document.querySelector("input");
const button = document.querySelector("button");
const content = document.querySelector("main");

function view(text) {
  const element = document.createElement("p");
  element.textContent = text;

  content.appendChild(element);
}

async function dispatch(event) {
  event.preventDefault();

  let codex = input.value;

  codex = codex.replace(" ", "");
  codex = codex.replace(".", "");
  codex = codex.trim();

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${codex}/json/`);
    const { erro, logradouro, localidade, uf, bairro } = response.data;

    if (erro) {
      throw new Error("CEP inválido!");
    }

    content.innerHTML = "";
    view(logradouro);
    view(localidade + "/" + uf);
    view(bairro);
  } catch (error) {
    content.innerHTML = "";
    view("Ops, algo deu errado!");
  }
}

button.addEventListener("click", dispatch);
