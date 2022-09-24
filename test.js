(async function (url) {
    const tiktok = require("./index");
  tiktok(url)
    .then(result => console.log(result))
  })("https://vt.tiktok.com/ZSRxM8puu/")