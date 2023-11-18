const gameField = document.querySelector('.gamefield-container')
let columnNumber = document.querySelector('.columnNumber')
let rowNumber = document.querySelector('.rowNumber')
let initLine = 20
let initColumn = 20;
let randomOrNo = false;
let randowButtonField = document.querySelector('.btn-random')
let restartButtonField = document.querySelector('.btn-reset')
let stopButtonField = document.querySelector('.btn-stop')
let startButtonField = document.querySelector('.btn-start')
let tab = [];
let stop = false;

create(initLine, initColumn);
rowNumber.addEventListener('input',(rn)=>{
   if(rn.target.value !== ''){
    console.log('vide');
    initLine = parseInt(rn.target.value);
    create(initLine, initColumn);
   }
})

stopButtonField.addEventListener('click',()=>{
    stop =true;
})

restartButtonField.addEventListener('click',()=>{
    console.log(randomOrNo);
    randomOrNo = false
    create(initLine,initColumn)
})

randowButtonField.addEventListener('click',()=>{
    randomOrNo = true;
    create(initLine, initColumn);
})

startButtonField.addEventListener('click',()=>{
    stop = false;
    start();
     console.log(tab);
})


function start(){
 let inter = setInterval(() => {
    getButton();
    toAlive();
    if(stop == true){
        clearInterval(inter);
    }
}, 1000);
}


function getButton(){
    tab = []
    let buttons = document.querySelectorAll('.gamefield-container button')
    buttons.forEach(element => {
        let id = element.id.split('_');
        // chechkButtonDieORAlive(element)
        
        neighbor(parseInt(id[2]), parseInt(id[1]));
    });
    doAllDie()

}
function doAllDie(){
    let buttons = document.querySelectorAll('.gamefield-container button')
    buttons.forEach(element => {
        element.style.backgroundColor = '#181818';
        console.log('doALLie');
    });
}
function toAlive() {
    tab.forEach(element => {
        let button = document.querySelector(`#button_${element.col.toString()}_${element.line.toString()}`)
        button.style.backgroundColor = 'rgb(255, 255, 255)';
    });
}

function chechkButtonDieORAlive(element){
    if(element.style.backgroundColor == 'rgb(255, 255, 255)' ){
        // console.log(element.style.backgroundColor);
        // element.style.backgroundColor = 'RGB(231 230 0)'
        return true;
    }
    return false
}

function neighbor(line , column) {
    let tabNeighbor = [
        {
            line: line,
            col: column -1
        },
        {
            line: line,
            col: column +1
        },
        {
            line: line -1,
            col: column
        },
        {
            line: line +1,
            col: column 
        },
        {
            line: line -1,
            col: column -1
        },
        {
            line: line -1,
            col: column +1
        },
        {
            line: line +1,
            col: column -1
        },
        {
            line:line +1,
            col: column +1
        }
    ];
    //console.log(tabNeighbor);
    let isAlive = 0;
    tabNeighbor.forEach(element => {
        if(document.querySelector(`#button_${element.col.toString()}_${element.line.toString()}`)){

            let button = document.querySelector(`#button_${element.col.toString()}_${element.line.toString()}`)
            isAlive = chechkButtonDieORAlive(button) == true ? isAlive + 1 : isAlive; 
            // button.style.backgroundColor = 'blue'
            
        }
       
    });
    //console.log(`nombre de voisin vivant:${isAlive}`);
    let thisButton = document.getElementById(`button_${column}_${line}`)
    if(thisButton.style.backgroundColor == "rgb(255, 255, 255)"){
        alivaToAlive(isAlive,column,line);
    }else{
        dieToAlive(isAlive,column,line)
    }
}

     

columnNumber.addEventListener('input',(cn)=>{
   if(cn.target.value !== ''){
    initColumn = parseInt(cn.target.value);
   create(initLine, initColumn);
   }
})


function gridInitialazer(div, index, positionLine) {
    let num = randomOrNo == true ? Math.floor(Math.random(5)*10) : 2;
    let button = document.createElement('button')
    button.style.backgroundColor = num%2 == 0 ? '#181818' : "#ffffff";
    button.style.width = '1rem'
    button.style.height = '1rem'
    button.style.borderRadius = '0.5rem'
    button.setAttribute('id', `button_${index.toString()+'_'+positionLine.toString()}`)
    div.appendChild(button)
    button.addEventListener('click',(e)=>{
        neighbor(parseInt(e.target.id.split('_')[2]), parseInt(e.target.id.split('_')[1]))
        if(e.target.style.backgroundColor === 'rgb(24, 24, 24)'){
            e.target.style.backgroundColor = '#ffffff'
            // e.target.style.backgroundColor = 'green'
            
        }else{
            e.target.style.backgroundColor = '#181818'
        }
    })
}

function alivaToAlive(numberNeighbor, column, line){
    if(numberNeighbor == 3 || numberNeighbor == 2){
        tab.push({
            col: column,
            line: line
        })
    }
    
}

function dieToAlive(numberNeighbor, column, line) {
    if(numberNeighbor == 3){
        tab.push({
            col: column,
            line: line
        })
    }
}



function initRow(maxColumn,positionLine) {
    let div = document.createElement('div')
    div.style.width = '100%'
    gameField.appendChild(div)
    for (let i = 0; i < maxColumn; i++) {
        gridInitialazer(div,i,positionLine)
    }
}


function create(maxLine, MaxColumn){
    gameField.innerHTML = '';
    for (let i = 0; i < maxLine; i++) {
        initRow(MaxColumn, i)
    }
}



