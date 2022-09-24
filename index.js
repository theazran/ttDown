const axios = require("axios");
const log = console.log;

async function shortUrl(url) {
  const result = await require("tinyurl").shorten(url);
  return result
}

async function tiktok(url) {
  const res = (await axios.get("https://registry.npmjs.org/ttdown")).data;
  if (require("./package.json").version != res['dist-tags'].latest) {
    log("-> Follow igku\n");
  }
  return new Promise(async function (resolve, reject) {
    try {
      var data = require("qs").stringify({
        'id': url,
        'locale': "vi"
      })
      var options = {
        method: "POST",
        url: "https://ssstik.io/abc?url=dl",
        headers: {
          "uset-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.33"
        },
        data
      };
      await axios(options)
        .then(async function (res) {
          const data = res.data;
          try {
            const author = data
              .split('alt="')[1]
              .split('"')[0];
            const avatar = await shortUrl(
              data.split('src="')[1].split('"')[0]
            );
            const title = data
              .split('maintext">')[1]
              .split("</p>")[0];
            const likes = data
              .split('</svg>\n</div>\n<div>\n')[1]
              .split(" </div>")[0];
            const cmts = data
              .split("</path>\n</svg>\n<div>\n")[1]
              .split(" </div>")[0];
            const shares = data
                .split("</line>\n</svg>\n<div>\n")[1]
                .split(" </div")[0];
            const UrlVideo = await shortUrl(
              data.split('<a href="')[2].split('"')[0]
            );
            const UrlAudio = await shortUrl(
              data.split('<a href="')[4].split('"')[0]
            );
            const Thumb = await shortUrl(
              data.split("(")[1].split(')')[0]
            );
            resolve({
              owner: {
                author,
                avatar
              },
              result: {
                title,
                Thumb,
                likes,
                cmts,
                shares,
                UrlVideo,
                UrlAudio
              }
            });
          } catch {
            try {
              const author = data
                .split('alt="')[1]
                .split('"><h2>')[0];
              const avatar = await shortUrl(
                data
                .split('" alt=')[0]
                .split('src="')[1]
              );
              const title = data
                .split('</p>')[0]
                .split('class="maintext">')[1];
              const UrlVideo = await shortUrl(
                data
                .split('<a href="')[1]
                .split('" class=')[0]
              );
              const UrlAudio = await shortUrl(
                data
                .split('download_link music')[0]
                .split('_watermark_direct" ')[1]
                .split('href="')[1]
                .split('" class=')[0]
              );
              const Thumb = await shortUrl(
                data
                .split('(')[1]
                .split(')')[0]
              );
              const likes = data
                .split('</svg>\n</div>\n<div>\n')[1]
                .split(" </div>")[0];
              const cmts = data
                .split("</path>\n</svg>\n<div>\n")[1]
                .split(" </div>")[0];
              const shares = data
                .split("</line>\n</svg>\n<div>\n")[1]
                .split(" </div")[0];
              log("-> An Error Happened While Processing HD Video So We Transferred SD Video For You");
              resolve({
                owner: {
                  author,
                  avatar
                },
                result: {
                  title,
                  Thumb,
                  likes,
                  cmts,
                  shares,
                  UrlVideo,
                  UrlAudio
                }
              });
            } catch (e) {
              reject(e)
            }
          }
        })
    } catch (e) {
      log("-> Please Catch This Error And Send It To The Admin");
      reject(e);
    }
  })
}

module.exports = tiktok;