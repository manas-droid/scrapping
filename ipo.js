const request = require('request-promise');
const cheerio = require("cheerio");
const fs = require('fs');

const url = 'https://www.moneycontrol.com/news/business/ipo/';

 (async ()=>{
   let  moneyControlData = [];
   const response = await request({
      uri : url,
      headers : {
        "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" ,
        "Accept-Encoding" :" gzip, deflate, br" ,
        "Accept-Language" :" en-US,en;q=0.5"
      } ,
      gzip : true
   });
   let $ =  cheerio.load(response);

   //under for loop
   // console.log($('ul[id="cagetory"] > li')[0].children[0].next.children); // for images
   console.log($('ul[id="cagetory"] > li > p')[0].children[0].data);

   for(let i = 0 ; i<=30;i++){
     if($('ul[id="cagetory"] > li')[i].children[0].next){
       const title = $('ul[id="cagetory"] > li')[i].children[0].next.attribs.title;
       const data =  $('ul[id="cagetory"] > li > p')[0].children[0].data;
       const href = $('ul[id="cagetory"] > li')[i].children[0].next.attribs.href; // href
       moneyControlData.push({
         title,
         data,
         href
       });
     }
   }
   try {
     const json = JSON.stringify(moneyControlData)
     fs.writeFileSync("./moneycontrol.json" ,json, "utf-8");
   } catch (e) {
     console.log(e);
   }
 }
)();
