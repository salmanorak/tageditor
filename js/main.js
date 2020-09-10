
var subMenuList = {
    'product':  ['Clothing Labels', 'Paper Tags'] ,
    'label' : ['Shape', 'Material'] ,
    'color' : ['Standart','Pattern'] ,
    'text' : ['Text1', 'Text2', 'Text3'] ,
    'symbol' : [],
    'frame' :  [],
    'cord' : [],
    'quantity' : []
};

window.onload = init;

function init (){
    addEventListenerToAllSelectedItem('.main-list li', 'click', toggleActive );
    addEventListenerToAllSelectedItem('.submenu', 'click', toggleDetailMenu );
    addEventListenerToAllSelectedItem('.text-detail-input', 'focusout', textController );
    addEventListenerToAllSelectedItem('.stage-element-wrapper', 'click', handleStageClick);
    addEventListenerToAllSelectedItem('.shape-item', 'click', hangleShapeSelect);
    addEventListenerToAllSelectedItem('.element-item', 'click', hangleElementSelect);
}

function toggleActive (e){
    document.querySelector('.main-list .active').classList.remove('active');
    e.currentTarget.classList.toggle('active');
    var id = e.currentTarget.attributes.id.value;
    toogleSubMenuActive(id);
    if(id == 'text') closeDetailMenu();

}

function toogleSubMenuActive(id){
    var submenu = document.querySelector( `.sub-lists #${id}`);
    if(document.querySelector('.submenu.active')) document.querySelector('.submenu.active').classList.remove('active');
    if(submenu) submenu.classList.add('active');
}

function toggleDetailMenu(e){
    var detailType = e.target.attributes.id.value;
    var selectedDetailMenu = document.querySelector(`#detail-${detailType}`);
    var currentActiveDetailMenu = document.querySelector(`.detail-menu.active`);
    if(currentActiveDetailMenu == selectedDetailMenu || detailType == 'text' ) return;
    if(currentActiveDetailMenu) currentActiveDetailMenu.classList.remove('active');
    if(selectedDetailMenu) selectedDetailMenu.classList.add('active');
    document.querySelector('.menu-detail-wrapper').classList.add('active');
}

function closeDetailMenu(){
    document.querySelector('.menu-detail-wrapper').classList.remove('active');
    var activeDetailMenu = document.querySelector('.detail-menu.active');
    if(activeDetailMenu) activeDetailMenu.classList.remove('active');
}

function addEventListenerToAllSelectedItem(selector, eventType, handler){
    document.querySelectorAll(selector).forEach(function (item){
        item.addEventListener(eventType, handler);
    });
}

function removeEventListenerToAllSelectedItem(selector, eventType, handler){
    document.querySelectorAll(selector).forEach(function (item){
        item.removeEventListener(eventType, handler);
    });
}


function textController(e){
    var textElem = e.currentTarget;
    var textId = textElem.attributes.id.value;
    var textString = textElem.value;
    var textLabel = document.querySelector(`.label-${textId}`);

    if( !textString && textLabel) {
        textLabel.remove();
    }else if( textString && !textLabel){
        createStageElement(textId,'text', textString);
    }else if(textString){
        textLabel.innerText = textString;
    }
}

function createStageElement(id, type, content){
    var wrapper = document.createElement('div');
    wrapper.classList.add('stage-item-wrapper');
    var elem = document.createElement('div');
    elem.classList.add(`stage-${type}`);
    if(type=='element'){
        elem.classList.add(content);
    }else if(type=='text'){
        elem.innerText = content;
        elem.classList.add(`label-${id}`);
    }    
    wrapper.appendChild(elem);
    document.querySelector(`.stage-wrapper #${type}-field`).appendChild(wrapper);
    dragElement(wrapper);
}



function handleStageClick (e){
    e.stopPropagation();
    var currentSelectedElement= document.querySelector('.stage-element-wrapper .selected');
    var newSelectedElement = e.target;
    addEventListenerToAllSelectedItem('body', 'click', handleOutsideStageClick);
    if(newSelectedElement == currentSelectedElement ) return;
    if(currentSelectedElement) currentSelectedElement.classList.remove('selected');
    newSelectedElement.classList.add('selected');

}
function handleOutsideStageClick (e){
    var currentSelectedElement= document.querySelector('.stage-element-wrapper .selected');
    if(currentSelectedElement) currentSelectedElement.classList.remove('selected');
    removeEventListenerToAllSelectedItem('body', 'click', handleOutsideStageClick);
}


function hangleShapeSelect(e){
    var selectedShapeType = e.currentTarget.attributes['data-type'].value;
    var shapeElement = document.querySelector('#shape-field');
    var currentShapeType = document.querySelector('#shape-field').classList[0];
    if(selectedShapeType !=  currentShapeType ){
        shapeElement.classList.remove(currentShapeType);
        shapeElement.classList.add(selectedShapeType);
    }
    closeDetailMenu();
}

function hangleElementSelect(e){
    var selectedElementType = e.currentTarget.attributes['data-type'].value;
    createStageElement( Math.floor(Math.random()*500) ,'element',selectedElementType);
    closeDetailMenu();
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}