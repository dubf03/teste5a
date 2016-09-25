$(document).ready(function(){


	 var converteGB = function (value){
			 return (value / (1024*1024)).toFixed(2);
	 };

	 var percents = function (total, used){
		value = (100 * used) / total;
		value = value.toFixed(0);

		return value;
	 };

	 var setColor = function(value) {

		if(value <= 50) {
			color = 'green';
		}else if (value >= 51 && value <= 100) {
			color = 'yellow';
		}else if(value >= 102){
			color = 'red';
		}

		return color;
	 };


	 $.ajax({
		 url: "../plano.json",
		 context: document.body
	 }).done(function(res) {
			$('#calls .data p:first-child var').text(res.ligacoes.utilizados);
			$('#calls .data p:last-child var').text(res.ligacoes.contratados);
			value1 = percents(res.ligacoes.contratados, res.ligacoes.utilizados);
			$('#calls .bar').css('width', value1+"%");
			$('#calls .bar').addClass(setColor(value1));

			$('#messages .data p:first-child var').text(res.torpedos.utilizados);
			$('#messages p:last-child var').text(res.torpedos.contratados);
			value2 = percents(res.torpedos.contratados, res.torpedos.utilizados);
			$('#messages .bar').css('width', value2+"%");
			$('#messages .bar').addClass(setColor(value2));

			$('#internet .data p:first-child var').text( converteGB(res.dados.utilizados));
			$('#internet .data p:last-child var').text( converteGB(res.dados.contratados));
			value3 = percents(res.dados.contratados, res.dados.utilizados);
			$('#internet .bar').css('width', value3+"%");
			$('#internet .bar').addClass(setColor(value3));
	 });

});