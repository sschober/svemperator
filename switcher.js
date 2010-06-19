window.addEventListener('keydown',checkKeyDown,false);
safari.self.addEventListener("message", handleMessage, false);

var keyCombo = 'ctrl'; //default prior to fetching the valid one

getKeyCombo();

function getKeyCombo() {
	safari.self.tab.dispatchMessage('getKeyCombo','');
}

function handleMessage(event) {
	if(event.name == 'keyCombo') {
		keyCombo = event.message;
	}
}

function toggleLinkHighlight() {
    $("a").addClass("highlighted");
}

function checkKeyDown(event) {
	switch(event.keyCode) {
        /* 102 acsii == f */
		case 70:
        case 102:
			if (
			(keyCombo == 'ctrl' && event.ctrlKey == true) || 
			(keyCombo == 'opt' && event.altKey == true) || 
			(keyCombo == 'ctrlopt' && event.altKey == true && event.ctrlKey == true) || 
			(keyCombo == 'cmd' && event.metaKey == true)
			) {
				event.stopPropagation();
				event.preventDefault();
                toggleLinkHighlight();
			}
		break;
		default:
		//do nothing
	}
}
