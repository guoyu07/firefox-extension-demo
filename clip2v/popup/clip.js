function sendClip(raw) {
	var txt = document.getElementById('txt').value;
	if (txt == '') {
		return;
	}
	if (raw) {
		send(txt);
	} else {
		send(Base64.encode(txt));
	}
}
function send(txt) {
	chrome.tabs.executeScript(null, {
		file: "/content-scripts/sendkey.js"
	});
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {text: txt});
	});
}

