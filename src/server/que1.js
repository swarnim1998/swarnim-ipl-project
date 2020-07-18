const csvToJson = require("csvtojson");
const fs = require("fs");

exports.getMatchesPerYear = () => {
  csvToJson()
    .fromFile("../data/matches.csv")
    .then((matches) => {
      const resultData = matches.reduce((acc, cur) => {
        acc[cur.season] = acc[cur.season] ? acc[cur.season] + 1 : 1;
        return acc;
      }, {});

      let data = JSON.stringify(resultData);
      fs.writeFileSync("../output/matchesPerYear.json", data);
    });
};
