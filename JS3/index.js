var counter = function (init){
	return function (){
			return ++init;
	}
}

var incrementar = counter(0);
console.log("primeira Chamada " + incrementar());
console.log("Segunda chamada " + incrementar());
console.log ("terceira Cmanda " + incrementar());
