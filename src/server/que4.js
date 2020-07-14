const csvToJson= require('csvtojson');
const fs= require('fs');
const { parse } = require('path');

exports.top10Bowlers=()=>{

    csvToJson().fromFile('../data/matches.csv')
    .then(matches=>{
    
        // matchId contains the Id of 2015 matches
      let matchId=[];
      for(key in matches)
      {
        if(matches[key].season==="2015")
        {  
          matchId.push(matches[key].id);
        }     
      }

      csvToJson().fromFile('../data/deliveries.csv')
       .then(deliveries=>{
        
        // here first i calculate number of balls and runs per bowler   
        let bowlers={};
        let bowlerDetails={runs: 0,balls: 1}; 
        for(key in deliveries)
         {
           let tmp=deliveries[key].bowler;
           if(matchId.includes(deliveries[key].match_id))
           {
             if(bowlers[tmp])
             {  
               bowlers[tmp].runs=bowlers[tmp].runs+parseInt(deliveries[key].total_runs);
               bowlers[tmp].balls=bowlers[tmp].balls+1;
             }
             else
             {
                let temp={...bowlerDetails};
                temp.runs=parseInt(deliveries[key].total_runs);
                bowlers[tmp]=temp;
             }
            }    
         }

         
         let result=[];
         for(key in bowlers)
         {
           result.push({bowlerName: key,ecomy: (bowlers[key].runs/(bowlers[key].balls/6))});
         }
         
         result.sort(function(a,b){
           return a.ecomy-b.ecomy;
         })

        result=result.slice(0,10);
        
        let data=JSON.stringify(result);  
        fs.writeFileSync('../output/top10Bowlers.json',data);     
       })
           
    })
  }