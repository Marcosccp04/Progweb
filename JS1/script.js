for(var k = '1'; k <='10';k++ ){
	document.write('<table border="1"><thead><td colspan="2"> Produtos ' + k + '</td></head>');
	for(var i = '1'; i <='10';i++ ){
		document.write('<tr> <td> ' + k + 'x' + i + '</td><td>'+k*i+'</td></tr>');
	}
}