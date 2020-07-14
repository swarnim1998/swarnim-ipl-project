const csvToJson= require('csvtojson');
const fs= require('fs');
const { parse } = require('path');



exports.matchesWonPerYear=()=>
{
  fillTeams=(teams,users)=>
  {
    for(key in users)
    {
     if(!teams[users[key].team1])
     {
       teams[users[key].team1]=0;
     }
     if(!teams[users[key].team2])
     {
       teams[users[key].team2]=0;
     }
    }
  }

csvToJson().fromFile('../data/matches.csv')
 .then(users => {
 
  // using fillTeams method i can get all the teams in the teams object  
  let teams={};
  fillTeams(teams,users); 
  
  // result array contains the resultant data
  let result={}; 

  for(key in users)
  {
    if(result[users[key].season])
    {
     let newTeams={...result[users[key].season]};
     newTeams[users[key].winner]+=1;
     result[users[key].season]=newTeams;
    }
    else{
      let newTeams={...teams};
      newTeams[users[key].winner]=1;
      result[users[key].season]=newTeams;
    }
  }
  
  let data=JSON.stringify(result);  
  fs.writeFileSync('../output/matchesWonPerYear.json',data);  
})
}