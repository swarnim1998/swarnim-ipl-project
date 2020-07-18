/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
const csvToJson = require("csvtojson");
const fs = require("fs");

exports.getTop10Bowlers = () => {
  csvToJson()
    .fromFile("../data/matches.csv")
    .then((matches) => {
      // matchId contains the Id of 2015 matches
      let matchId = [];
      matches.forEach((currentrent) => {
        if (currentrent.season === "2015") {
          matchId.push(currentrent.id);
        }
      });

      csvToJson()
        .fromFile("../data/deliveries.csv")
        .then((deliveries) => {
          // here first i calculate number of balls and runs per bowler
          console.log();
          function findcurrentrent(arr, name) {
            let ind = -1;
            arr.forEach((value, index) => {
              if (value.name === name) {
                ind = index;
              }
            });
            return ind;
          }

          function getData(currentrent) {
            return matchId.includes(currentrent.match_id);
          }

          let resultData = deliveries
            .filter(getData)
            .reduce((bowlers, current) => {
              const tmp = current.bowler;
              const index = findcurrentrent(bowlers, tmp);
              if (index > -1) {
                bowlers[index].runs =
                  bowlers[index].runs + parseInt(current.total_runs);
                bowlers[index].balls += 1;
              } else {
                let temp = {
                  name: tmp,
                  balls: 1,
                  runs: parseInt(current.total_runs),
                };
                bowlers.push(temp);
              }
              return bowlers;
            }, [])
            .reduce((acc, current) => {
              acc.push({
                bowlerName: current.name,
                economy: current.runs / (current.balls / 6),
              });
              return acc;
            }, []);

          resultData.sort(function (a, b) {
            return a.economy - b.economy;
          });

          resultData = resultData.slice(0, 10);

          let data = JSON.stringify(resultData);
          fs.writeFileSync("../output/top10Bowlers.json", data);
        });
    });
};
