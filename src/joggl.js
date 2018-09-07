jQuery(document).ready(function ($) {
    var url = null, token = null;
    function getSettings() {
        function setCurrentChoice(result) {
            url = result.url;
            token = result.token;
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        var getting = browser.storage.sync.get(["token", "url"]);
        getting.then(setCurrentChoice, onError);
    }
    getSettings();
    function createWorklog(id, data) {
        data = JSON.stringify(data);
        $.ajax({
            url: url + 'rest/api/2/issue/' + id + '/worklog',
            type: 'POST',
            data: data,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', 'Basic ' + token);
                xhr.setRequestHeader('User-Agent', 'Jira won\'t accept FireFox\'s user-agent string for some reason...');
            },
            complete: function(response) {
                if (response.statusText === 'Created')
                {
                    $('#' + id + '-popup').hide();
                }
            },
            fail: function(response) {
                console.log(response);
            }
        });
	};

	function prependButtons() {
		$(".ListItem__item:not(.joggled)").each(function () {
			if ($(this).find('.joggl').length == 0) {
			    var id = null;
			    try {
                    id = $(this).find('.css-ly1zji0')[0].innerText.split(' ')[0];
                    $(this).addClass('joggled');
                    $(this).prepend('<div class="ContextMenu__container joggl" id="' + id + '"><img src="' +
						browser.extension.getURL("assets/images/joggl.png") + '" class="joggl-button"/></div><div id="'
                        + id + '-popup' + '" class="popup">' +
                        '<input type="text" id="timeSpent" placeholder="Time Spent, e.g. 1h 30m"/>' +
                        '<input type="text" id="comment" placeholder="Comment"/>' +
                        '<button id="create-log-' + id + '">Create Worklog</button></div>');
                    document.getElementById(id).addEventListener('click', function (e) {
                        var popup = $('#' + e.srcElement.parentElement.id + '-popup');
                        popup.show();
                    });
                    document.getElementById('create-log-' + id).addEventListener('click', function (e) {
                        var popup = $('#' + e.srcElement.parentElement.id);
                        var data = {
                            timeSpent: popup.find('#timeSpent')[0].value,
                            started: new Date().toISOString().split('.')[0] + '.000-0000',
                            comment: popup.find('#comment')[0].value
                        };
                        createWorklog(id, data);
                    });
				} catch (e) {
			        console.log(e);
				}
			}
		});
	};
    setInterval(prependButtons, 1000);
});
