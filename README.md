
## Web Scraping com NodeJS


### Índice
   * [Sobre](#Sobre)
   * [API Reference ( Rotas )](#Referência-da-API)
   * [Tecnologias](#Tecnologias)
   * [Instalação](#Instalação)
   ### Sobre
O projeto: o projeto listado neste repórisotro pegara os dados dos vídeos de um canal no YouTube sem pesquisa nenhuma na API, simulando o acesso de um úsuario real ( web Scraping )

## Instalação

Execute o projeto em sua máquina

```bash
  git clone git@github.com:nicolasteofilo/WebScrap.git
  cd WebScrap/project-get-videos-channel-youtube
  yarn
  yarn dev
```
    
### Tecnologias
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [Puppeteer](https://github.com/puppeteer/puppeteer)


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
