	document.write('<div class="row">\
		<nav>\
			<div class="input-field col s3">\
				<select class="controller-choose" id="controller-choose">\
					<option value="" disabled>Выберите контроллер</option>\
					<option value="1" selected>Модули</option>\
					<option value="2">Общий контроллер</option>\
				</select>\
			</div>\
\
			<div class="nav-wrapper teal lighten-2">\
				<ul id="nav-mobile" class="right hide-on-med-and-down">\
					<li><a href="index.html">Управление</a></li>\
					<li><a href="settings.html">Настройки</a></li>\
					<li><a href="index.html">Тесты</a></li>\
					<li><a href="log.html">Консоль</a></li>\
					<li><a href="#" onclick="window.close();" class="exit-menu">Выход</a></li>\
				</ul>\
			</div>\
		</nav>\
	</div>');
	var Refs = document.getElementsByTagName('a');
	var path = location.href.substr(1+location.href.lastIndexOf('/'));
	for (var i = 0; i < Refs.length; i++)
	{
		if (Refs[i].getAttribute('href') == path)
		{
			Refs[i].classList.add("active");
		}
	}

	var Opts = document.getElementsByTagName('option');
	for (var i = 0; i < Opts.length; i++)
	{
		if (Opts[i].getAttribute('value') == path)
		{
			Opts[i].classList.add("active");
		}
	}


			var contr_select = document.getElementById('controller-choose');
			var pageState = contr_select.value;
			contr_select.addEventListener('change', (event) => {
				console.log(contr_select.value);
				console.log(pageState);
			if (contr_select.value != pageState)
			{
				var path = location.href.substr(1+location.href.lastIndexOf('/'));
				pageState = contr_select.value;
				if (path == 'index.html')
				{
					location.href = 'main.html';
				}
				else if (path == 'main.html')
				{
					location.href = 'index.html';
				}
			}
		});
