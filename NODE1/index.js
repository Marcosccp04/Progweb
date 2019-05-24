var Diretorios = require("fs");
Diretorios.readdir("/home/icomp/", function(err, arquivos){
  console.log(arquivos);
});
var arquivos = Diretorios.readdir("/home/icomp/");
console.log(arquivos);