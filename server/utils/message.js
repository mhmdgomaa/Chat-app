const moment = require('moment');
var generateMessage = (from,text)=> {
  return{
    from,
    text ,
  createdAt: moment().valueOf()  } ;
} ;
var generatelocationMessage = (from ,latitude , longitude) =>{
  return {
    from,
    url:`https://www.google.com.eg/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }};


module.exports = {generateMessage, generatelocationMessage};
