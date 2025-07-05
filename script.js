async function verValor() {
  const input = document.getElementById("bairroInput").value.trim();
  const popup = document.getElementById("popup");
  const whatsapp = document.getElementById("whatsapp");

  const response = await fetch("https://instalacao-por-bairro-gps.vercel.app/bairros-rj.json");
  const data = await response.json();

  const normalizar = str =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

  const resultado = data.find(entry => normalizar(entry.bairro) === normalizar(input));

  popup.style.display = "block";
  whatsapp.style.display = "block";

  if (resultado) {
    const valor = resultado.valor.replace(",", "."); // garante que vírgula não quebre
    popup.innerHTML = `✅ Sua instalação é apenas R$ ${parseFloat(valor).toFixed(2).replace(".", ",")}`;
  } else {
    popup.innerHTML = `❌ Este bairro não foi encontrado.<br>📌 Verifique se você digitou corretamente o nome do bairro.`;
  }
}
