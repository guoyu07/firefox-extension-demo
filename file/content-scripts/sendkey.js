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
function sendAll2(s) {
	for (var i = 0; i < s.length; i++) {
		var c = s[i];
		var ev = document.createEvent("KeyboardEvent");
		if ((c >= 'A' && c <= 'Z') || (c == '+')) {
			sendUpper(c);
		} else {
			sendLower(c);
		}
	}
}
function sendLower(c) {
	var target = document.getElementById('noVNC_canvas');
	var ev = document.createEvent("KeyboardEvent");
	ev.initKeyEvent("keydown", true, true, null, 0, 0, 0, 0, c.charCodeAt(), 0);
	target.dispatchEvent(ev);
	ev.initKeyEvent("keypress", true, true, null, 0, 0, 0, 0, c.charCodeAt(), c);
	target.dispatchEvent(ev);
	ev.initKeyEvent("keyup", true, true, null, 0, 0, 0, 0, c.charCodeAt(), 0);
	target.dispatchEvent(ev);
}
function sendUpper(c) {
	var target = document.getElementById('noVNC_canvas');
	var ev = document.createEvent("KeyboardEvent");
	//shift
	ev.initKeyEvent("keydown", true, true, null, 0, 0, 0, 0, 16, 0);
	target.dispatchEvent(ev);
	//down
	ev.initKeyEvent("keydown", true, true, null, 0, 0, 1, 0, c.charCodeAt(), 0);
	target.dispatchEvent(ev);
	//press
	ev.initKeyEvent("keypress", true, true, null, 0, 0, 1, 0, c.charCodeAt(), c.toLowerCase());
	target.dispatchEvent(ev);
	//up
	ev.initKeyEvent("keyup", true, true, null, 0, 0, 1, 0, c.charCodeAt(), 0);
	target.dispatchEvent(ev);
	//up
	ev.initKeyEvent("keyup", true, true, null, 0, 0, 1, 0, 16, 0);
	target.dispatchEvent(ev);
}
chrome.runtime.onMessage.addListener(sendKeys);
