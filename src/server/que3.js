const csvToJson= require('csvtojson');
const fs= require('fs');
const { parse } = require('path');


exports.extraRunPerTeam=()=>{
  let matchId=[];

 // matchId  contains the id of 2016 matches
  csvToJson().fromFile('../data/matches.csv')
  .then(matches=>{
    
    for(key in matches)
    {
      if(matches[key].season==="2016")
      {  
        matchId.push(matches[key].id);
      }     
    }
  
    
    csvToJson().fromFile('../data/deliveries.csv')
    .then(deliveries=>{
      let resultData={};
       
      for(key in deliveries)   
      {
        if(matchId.includes(deliveries[key].match_id))
        {
          let p=deliveries[key].batting_team;
          resultData[p]=resultData[p]? resultData[p]+parseInt(deliveries[key].extra_runs):parseInt(deliveries[key].extra_runs); 
        }
      }

      let data=JSON.stringify(resultData);  
      fs.writeFileSync('../output/extraRunsPerTeam.json',data);   
    })
  }) 
}