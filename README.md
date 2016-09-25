
# Teste Front-end

O objetivo deste teste é avaliar seus conhecimentos em HTML, JS, CSS, Git e linha de comando.

Para rodar o teste, você precisará ter o **nodejs** instalado.

# Rodando o teste

Faça um clone deste projeto e instale as dependências, rodando os comandos a seguir na raiz do seu clone:

`npm install`

Depois, rode a aplicação:

`gulp`

No seu navegador, abra `http://localhost:3000`

Desenvolva dentro da pasta **www**. Se quiser mudar a estrutura de pastas e arquivos, fique à vontade.

# Instruções para o desenvolvimento

- Seguir o layout **teste-front.psd** (há um **teste-front.jpg** para referência rápida)
    + Verifique as **Layer Comps** para os eventos de mouseover/mouseout
    + Animações, efeitos no mouseover/mouseout, tudo isso fica a seu critério ;)
    + **O layout deve ser responsivo**. A largura do componente todo deve ser **100%** e se adequar a qualquer largura de container (mínimo de 320px)
    + Para larguras menores, os textos do lado direito de cada item podem ficar abaixo dos títulos e o tamanho das fontes podem ser diminuídos, se for necessário

- Em JavaScript, faça uma requisição para **/plano.json**
    + Pode usar jQuery (ou qualquer outro framework de sua preferência)
    + Apresente os dados do JSON no layout

- Atenção para:
    + Os dados apresentados devem ser de acordo com o tipo (minutos, mensagens, gigabytes)
    + Você precisará calcular os gigabytes (os dados estão em bytes)
    + Você precisará calcular as porcentagens de uso / contratado para exibir as barras com tamanho de acordo
    + Verde: <= 50%; Amarelo: > 50% e <= 100%; Vermelho: > 100%.
    + Quando for maior que 100%, o tamanho "excedente" da barra é fixo, de acordo com o layout

- **Não altere** o arquivo **plano.json** em hipótese alguma!

- Suporte para **IE9 ou superior**.

- Ao finalizar, envie por e-mail o link do seu repositório clonado aqui no GitHub.

# Extras

- Se fizer o stylesheet usando Sass (pode usar compass, bourbon, fique à vontade!), ganha pontos.
- Se usar automatizador de tarefas (grunt, gulp), também ganha.

Boa sorte! ;D
