function handleFile(f) {
	var reader = new FileReader();
	reader.onload = function(e) {
		saveRaw(reader.result);
	}
	reader.readAsBinaryString(f);
}
function saveRaw(txt) {
	chrome.storage.local.set({content: Base64.encode(txt)});
}
function pasteRaw() {
	saveRaw(document.getElementById('txt').value);
}
function pasteB64() {
	chrome.storage.local.set({content: document.getElementById('txt').value});
}
function send() {
	chrome.storage.local.get("content", function(result) {
		chrome.tabs.executeScript(null, {
			file: "/content-scripts/sendkey.js"
		});
		chrome.tabs.executeScript(null, {
			file: "/content-scripts/jquery.js"
		});
		chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {text: result.content});
		});
	});
}
function show() {
	chrome.storage.local.get("content", function(result) {
		document.getElementById("txt").value = result.content;
	});
}
function clear() {
	chrome.storage.local.clear();
}

