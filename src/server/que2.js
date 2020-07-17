const csvToJson = require("csvtojson");
const fs = require("fs");

exports.getMatchesWonPerYear = () => {
  csvToJson()
    .fromFile("../data/matches.csv")
    .then((matches) => {
      // using fillTeams method i can get all the teams in the teams object
      let teams = matches.reduce((acc, current) => {
        acc[current.team1] = 0;
        return acc;
      }, {});

      // result array contains the resultant data

      const resultData = matches.reduce((acc, current) => {
        if (acc[current.season]) {
          let newTeams = { ...acc[current.season] };
          newTeams[current.winner] += 1;
          acc[current.season] = newTeams;
        } else {
          let newTeams = { ...teams };
          newTeams[current.winner] = 1;
          acc[current.season] = newTeams;
        }
        return acc;
      }, {});

      let data = JSON.stringify(resultData);
      fs.writeFileSync("../output/matchesWonPerYear.json", data);
    });
};
