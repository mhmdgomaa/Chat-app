var generateMessage = (from,text)=> {
  return{
    from,
    text ,
  createdAt: new Date().getTime()  } ;
} ;
var generatelocationMessage = (from ,latitude , longitude) =>{
  return {
    from,
    url:`https://www.google.com.eg/maps?q=${latitude},${longitude}`
  }};


module.exports = {generateMessage, generatelocationMessage};
