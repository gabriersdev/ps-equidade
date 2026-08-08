import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

const siteUrl = "https://prog.sabara.app.br";

const contacts = {
  "mail": "contato@ps-equidade.com.br",
}

const appConfigs = {
  "app-name": "Programa Sabará - Equidade Racial",
  "app-name-slug": "ps-equidade",
  "title": "Programa Sabará - Equidade Racial",
  "description": "Website do Programa Sabará - Equidade Racial",
  
  "locale": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "datetime-format": "YYYY-MM-DD HH:mm:ss",
  "UTC": -3,
}

export {
  appConfigs,
  contacts,
  siteUrl,
}
