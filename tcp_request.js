	function sendCustomTcpReq ()
	{
		var request  = document.getElementById('custom_tcp');
		sendTcpReq (request.value);
	}

	async function sendTcpReq (command)
	{
		var controllers = document.getElementsByClassName('ip_check');
		for (var i = 0; i < controllers.length; i++)
		{
			if (controllers[i].checked)
			{
				var num = i + 1;
				var was_connected = false, conn_closed = false;
				var ip_addr = document.getElementById('ip_' + controllers[i].id);
				var net = require('net');
				var client = new net.Socket();
				client.connect ( {port:8080, host:ip_addr.value} );

				client.on('error', (e) => {
					console.log('Error!');
				});

				client.setTimeout(1000, (e) => {
					if (was_connected)
					{
						addStringToField('received', 'n/a', num);
					}
					else
					{
						addStringToField('sended', 'not conn', num);
						addStringToField('received', 'n/a', num);
					}
					client.destroy();
				});

				client.on('connect',function()
				{
					was_connected = true;
					console.log('Sended: ' + command);
					addStringToField('sended', command, num);
					client.write(command);
				});

				client.on('data', function(data)
				{
					console.log('Received: ' + data);
					var str = data + '\n';
					str = str.replace('*', '');
					addStringToField('received', str, num);
					client.destroy();
				});

				client.on('close', function()
				{
					console.log('Connection closed');
					conn_closed = true;
				});

				while (!conn_closed)
				{
					await sleep (100);
				}
			}
		}
	}

	function setAllIp (obj)
	{
		if (obj.checked)
		{
			var checkboxes = document.getElementsByClassName('ip_check');
		    for (var i = 0; i < checkboxes.length; i++)
		    {
		    	checkboxes[i].checked = true;
		    }
		}
		else
		{
			var checkboxes = document.getElementsByClassName('ip_check');
		    for (var i = 0; i < checkboxes.length; i++)
		    {
		    	checkboxes[i].checked = false;
		    }
		}
	}

	function addStringToField (id, string, num)
	{
		//resetColorForClass('actual_' + id);
		var stringField = document.getElementById(id);
		stringField.innerHTML += "<span class='contr-num'>" + num + ": </span><span class='actual_" + id + "'>" + string + "</span><br>";
		setTimeout(function request() {
			resetColorForClass('actual_' + id);
		}, 750);
		stringField.scrollTop = stringField.scrollHeight;
	}

	function resetColorForClass (className)
	{
		var actual = document.getElementsByClassName(className);
		for (var i = 0; i < actual.length; i++)
		{
			actual[i].style.color="black";
		}
	}
	
	function sleep(ms)
	{
		return new Promise(resolve => setTimeout(resolve, ms));
	}
