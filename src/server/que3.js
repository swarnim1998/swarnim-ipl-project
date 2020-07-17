const csvToJson = require("csvtojson");
const fs = require("fs");

exports.getExtraRunPerTeam = () => {
  let matchId = [];

  // matchId  contains the id of 2016 matches
  csvToJson()
    .fromFile("../data/matches.csv")
    .then((matches) => {
      matches.forEach((current) => {
        if (current.season === "2016") {
          matchId.push(current.id);
        }
      });

      csvToJson()
        .fromFile("../data/deliveries.csv")
        .then((deliveries) => {
          let resultData = deliveries
            .filter((current) => {
              return matchId.includes(current.match_id);
            })
            .reduce((acc, current) => {
              let p = current.bowling_team;
              acc[p] = acc[p]
                ? acc[p] + parseInt(current.extra_runs)
                : parseInt(current.extra_runs);
              return acc;
            }, {});

          let data = JSON.stringify(resultData);
          fs.writeFileSync("../output/extraRunsPerTeam.json", data);
        });
    });
};
