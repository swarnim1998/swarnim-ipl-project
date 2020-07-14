const csvToJson= require('csvtojson');
const fs= require('fs');
const { parse } = require('path');


exports.matchesPerYear=()=>
{

csvToJson().fromFile('../data/matches.csv')
 .then(matches => {

   const result=matches.reduce((acc,cur)=>{
       acc[cur.season]=acc[cur.season]?acc[cur.season]+1: 1;
       return acc;
   },{});

  let data=JSON.stringify(result);  
  fs.writeFileSync('../output/matchesPerYear.json',data);
  
  let pdata= fs.readFileSync('../output/matchesPerYear.json');  
})
}