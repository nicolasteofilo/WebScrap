## Web Scraping com NodeJS


### Índice
   * [Sobre](#Sobre)
   * [API Reference ( Rotas )](#tabela-de-conteudo)
   * [Tecnologias](#tecnologias)
   * [Como usar](#como-usar)
   ### Sobre
O projeto: o projeto listado neste repórisotro pegara os dados dos vídeos de um canal no YouTube sem pesquisa nenhuma na API, simulando o acesso de um úsuario real ( web Scraping )

### Tecnologias
- NodeJS
- Express
- Cheerio
- Puppeteer


### Referência da API

#### Pegar vídeo de um canal

```http
  GET http://localhost:3000/videos/:channel
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `channel` | `string` | **Required** |

Exemplo
```http
  GET http://localhost:3000/GitHub
```
