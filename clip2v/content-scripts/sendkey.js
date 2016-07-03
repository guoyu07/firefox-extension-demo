function sendKeys(req, sender, resp) {
	var keys = req.text;
	sendAll(keys);
	chrome.runtime.onMessage.removeListener(sendKeys);
}
function sendAll(s) {
	var target = document.getElementById('noVNC_canvas');
	for (var i = 0; i < s.length; i++) {
		var c = s[i];
		var ev = document.createEvent("KeyboardEvent");
		ev.initKeyEvent("keypress", true, true, null, 0, 0, 0, 0, c.charCodeAt(), c);
		target.dispatchEvent(ev);
	}
}
chrome.runtime.onMessage.addListener(sendKeys);
