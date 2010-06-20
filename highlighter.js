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

var highlighted = false;

/**
 * Creates a div element as child of body and positios it absolutely
 * to the coords of the element.
 */
function createHint(index, elem){
    var elemPos = elem.getBoundingClientRect();
    $("body").append("<div class='hint'><span class='hint' style='top:"
                     +elemPos.top+"px;left:"+elemPos.left+"px'>"
                     +index+"</span></div>");
}

function toggleLinkHighlight() {
    if(!highlighted){
        // Iterates over every anchor an executes the anonymous function
        var links=$("a").each(function(index){createHint(index,this);});
        highlighted=true;
    }
    else {
        $(".hint").remove();
        highlighted=false;
    }
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
