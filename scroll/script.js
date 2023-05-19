// seleciona todas as seções
const sections = document.querySelectorAll(".section");
// inicia na primeira seção
let currentSection = 1;

function goToView(view) {
    setTimeout(() => {
        view.scrollIntoView({ behavior: "smooth" });
    }, 500);
}

// função para rolar para a próxima seção
function scrollToNextSection() {
  // verifica se não está na última seção
  if (currentSection < sections.length) {
    // rola para a próxima seção
    goToView(sections[currentSection]);
    // atualiza a seção atual
    currentSection++;
  }
}

// função para rolar para a seção anterior
function scrollToPreviousSection() {
  // verifica se não está na primeira seção
  if (currentSection > 0) {
    // rola para a seção anterior
    goToView(sections[currentSection]);
    // atualiza a seção atual
    currentSection--;
  }
}

// função para verificar qual seção está mais visível
function getMostVisibleSection() {
  // define a variável que irá armazenar a seção mais visível
  let mostVisibleSection = null;

  // define a variável que irá armazenar o maior percentual de visibilidade
  let highestPercentageVisible = 0;

  // itera sobre todas as seções
  sections.forEach(section => {
    // obtém a posição da seção em relação ao topo da página
    const sectionTop = section.offsetTop - window.innerHeight;

    // obtém a altura da seção
    const sectionHeight = section.offsetHeight;

    // obtém a posição atual da janela de visualização em relação ao topo da página
    const viewportTop = window.pageYOffset;

    // obtém a altura atual da janela de visualização
    const viewportHeight = window.innerHeight;

    // calcula a porcentagem da seção que está visível na janela de visualização
    const percentageVisible = Math.max(0, Math.min(sectionHeight, viewportTop + viewportHeight - sectionTop, viewportHeight)) / sectionHeight * 100;

    // verifica se essa seção é a mais visível até agora
    if (percentageVisible > highestPercentageVisible) {
      mostVisibleSection = section;
      highestPercentageVisible = percentageVisible;
    }
  });

  // retorna a seção mais visível
  return mostVisibleSection;
}

// adiciona um ouvinte de evento de rolagem para verificar qual seção está mais visível
window.addEventListener('scroll', () => {
  const mostVisibleSection = getMostVisibleSection();
  console.log(`A seção mais visível é: ${mostVisibleSection.id}`);
});
