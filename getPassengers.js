const axios = require('axios')
const cheerio = require('cheerio')


const url = 'https://www.nasa.gov/mission_pages/station/expeditions/index.html';

const getCurrentISSPassengers = () => {
 return axios(url)
    .then(res => {
      let html = res.data;
      let arr = html.split(' ');
      arr = arr.join("\n")
      arr = arr.split("\n")
      var start, end;
      let CF = false
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "window.cardFeed" && CF === false) {
          start = i + 2;
          CF = true;
        }
        if (arr[i] === "</script>" && CF === true) {
          end = i - 15;
          break;
        }
      }
      let htmlArr = arr.slice(start, end);
      let newHtml = htmlArr.join(' ');
      newHtml = newHtml + '"}]';
      let parsed = JSON.parse(newHtml)
      let astronautInfo = parsed[0].description;
      return astronautInfo;
    })
    .then(html => {
      //console.log({html})
      const $ = cheerio.load(html);
      const data = $(`a`);
      let keys = Object.keys(data)
      keys = keys.slice(0, 7)
      let astros = [];
      keys.map((x) => {

        let name = data[x].children[0].data;
        let bio = data[x].attribs.href;
        let astro = [name, bio];
        astros.push(astro)
      });
      return astros;


    })
    .catch(console.error)
};

module.exports = {
  getCurrentISSPassengers: getCurrentISSPassengers
}

