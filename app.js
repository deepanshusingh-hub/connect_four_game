var tableRow=document.getElementsByTagName('tr');
var tableCell=document.getElementsByTagName('td');
var reset=document.querySelector('.btn');
var columnNumber; 
var numberOfMovesComleted=0;
// program to find which index we clicked on
for(var i=0;i<tableCell.length;i++)
{
    tableCell[i].addEventListener('click',(e)=>{
        columnNumber=(parseInt)(e.target.cellIndex);
        ///console.log(columnNumber);
    })
}
reset.addEventListener('click',()=>{
    initialiseArr();
    Array.prototype.forEach.call(tableCell,(cell)=>{
        cell.addEventListener('click',changeColor);
        cell.style.background='white';
    });
    numberOfMovesComleted=0;
})
var currentPlayer=0;
var arr=[
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1]
];
// if u make changes to an array it is reflected globally in an array even in the function defined before the function that actually alters the array
function initialiseArr()
{
    for(var i=0;i<6;i++)
    {
        for(var j=0;j<7;j++)arr[i][j]=-1;
    }
}

//-----------------------------------------------------------

//MINIMAX ALGORITHM
// Dibas Version of heuristic

function calculateByMatchDibas(c,d,e,count){
//    console.log(""+c+" "+d+" "+e+" "+count);    e=0;
    let tot = 0;
    if(count==4) {
        if(c==4) tot+=1000;
        else if(c==3) {if(d==1) tot+=100; else tot+=70;}
        else if(c==2) {if(d==1) tot+=5; else tot+=20;}
        
    if(e==3) tot-=50;
    else if(e==2) tot-=20;
    else if(e==1) tot-=1;
    }
    else if(count==3){

        if(c==3) tot+=100;
        else if(c==2) {if(d==1) tot+=20; else tot+=5;}
    if(e==2) tot-=20;
    else if(e==1) tot-=1;
    }
    else if(count==2){
        if(c==2) tot+=5;
    if(e==1) tot-=1;    
    }
    //console.log(tot);
    return tot;
}

function calculateByMatchDeepanshu(c,d,e,count){
    //    console.log(""+c+" "+d+" "+e+" "+count);    e=0;
        
        let tot = 0;
        if(count==4) {
            if(c==4) tot+=100;
            else if(c==3&&d==1) tot+=5;
            else if(c==2&&d==2) tot+=2;
            else if(c==1&&e==3) tot+=20;
            if(e==3&&d==1) tot-=4;    
        }
        return tot;
}

function calculateByMatch(c,d,e,count){
    return calculateByMatchDeepanshu(c,d,e,count);
    //return calculateByMatchDibas(c,d,e,count);
}
function findRowMatch(p1,count){
    let tot=0;var c=0,d=0,e=0;
    for(let i=0;i<6;++i){
        for(let j=0;j<8-count;++j){
            for(let k=0;k<count;++k){
            if(arr[i][j+k]==p1) c++;
            else if(arr[i][j+k]==-1) d++;   
            else e++;

            }     

    tot +=calculateByMatch(c,d,e,count);
    c=0,d=0,e=0;
        }
    }
    return tot;
}
function findColMatch(p1,count){
    let tot=0;var c=0,d=0,e=0;
    for(let i=0;i<7-count;++i){
        for(let j=0;j<8;++j){
            for(let k=0;k<count;++k){
            if(arr[i+k][j]==p1) c++;
            else if(arr[i+k][j]==-1) d++;   
            else e++;
            }     

            tot +=calculateByMatch(c,d,e,count);
            c=0,d=0,e=0;
        }
    }
    return tot;
}
function findDiag1Match(p1,count){
    let tot=0;var c=0,d=0,e=0;
    for(let i=0;i<7-count;++i){
        for(let j=0;j<8-count;++j){
            for(let k=0;k<count;++k){
            if(arr[i+k][j+k]==p1) c++;
            else if(arr[i+k][j+k]==-1) d++;   
            else e++;
            }     

            tot +=calculateByMatch(c,d,e,count);
            c=0,d=0,e=0;
        }
    }
    return tot;
}
function findDiag2Match(p1,count){
    let tot=0;var c=0,d=0,e=0;
    for(let i=5;i>=count-1;--i){
        for(let j=0;j<8-count;++j){
            for(let k=0;k<count;++k){
            if(arr[i-k][j+k]==p1) c++;
            else if(arr[i-k][j+k]==-1) d++;   
            else e++;
            }     

            tot +=calculateByMatch(c,d,e,count);
            c=0,d=0,e=0;
        }
    }
    return tot;
}
function calcScore(start){
    let score=start;
    var count = 4;
    
    //for(count = 1;count <5;++count) {
        score +=findColMatch(currentPlayer,count);
        //console.log("Count :"+count+" "+score);
        score +=findRowMatch(currentPlayer,count);
        score +=findDiag1Match(currentPlayer,count);
        score +=findDiag2Match(currentPlayer,count);
    //} 
    return score;
}

function getValidLocations(){
    var ans=[];
    for(var i=0;i<7;++i) if(arr[0][i]==-1) ans.push(i);
    return ans;
}

function findBestColumn(p1){
    var valid = getValidLocations();
    var ans=valid[0];
    var debug = [];
    let score = -10000;
    if(valid.length==1) return ans;

    for(var f=0;f<valid.length;++f){
        var j=valid[f];
        var i=0;
        while(i+1<6&&arr[i+1][j]==-1) i++;
        arr[i][j]=p1;
        var start =0;
        for(var z=0;z<6;++z) if(arr[z][3]==p1) start+=3;
        var newScore = calcScore(start);
        debug.push(newScore);
        if(newScore>score) {score=newScore; ans=j;}
        arr[i][j] = -1;
        //console.log(arr);
    }
    console.log(debug);
    return ans;
}
//-----------------------------------------------------------

// return row where coin should be placed
var rowToBeFilled=function(col)
{   
    for(var i=5;i>=0;i--)
    {
        if(arr[i][col]==-1)return i;
    }
    return -1;
}
// calculates if score is greater than or equal to four or not

var isScoreEnough=function(row,col)
{
    var scoreLeft=0,scoreRight=0,scoreTop=0,scoreBottom=0,scoreLeftUpperDiagonal=0,scoreLeftLowerDiagonal=0,scoreRightUpperDiagonal=0,scoreRightLowerDiagonal=0;
    // left score
    for(var j=col;j>=0;j--)
    {
        if(arr[row][j]==arr[row][col])scoreLeft++;
        else break;
    }
    //right score
    for(var j=col;j<7;j++)
    {
        if(arr[row][j]==arr[row][col])scoreLeft++;
        else break;
    }
    // left+right-1>=4 then condition is satisfied
    if(scoreRight+scoreLeft-1>=4)return true;
     // left top
     for(var i=row;i>=0;i--)
     {
         if(arr[i][col]==arr[row][col])scoreTop++;
         else break;
     }
     //right score
     for(var i=row;i<6;i++)
     {
         if(arr[i][col]==arr[row][col])scoreBottom++;
         else break;
     }
     // top+bottom-1>=4 then condition is satisfied
     if(scoreBottom+scoreTop-1>=4)return true;

     var i=row;
     var j=col;
     while(i>=0 && j>=0)
     {
         if(arr[i][j]==arr[row][col]){scoreLeftUpperDiagonal++;i--;j--;}
         else break;
     }
     i=row;
     j=col;
     while(i<6 && j<7)
     {
         if(arr[i][j]==arr[row][col]){scoreLeftLowerDiagonal++;i++;j++;}
         else break;
     }
     // leftDiagonal-1>=4 then condition is satisfied
     if(scoreLeftUpperDiagonal+scoreLeftLowerDiagonal-1>=4)return true;

     i=row;
     j=col;
     while(i>=0 && j<7)
     {
         if(arr[i][j]==arr[row][col]){scoreRightUpperDiagonal++;i--;j++;}
         else break;
     }
     i=row;
     j=col;
     while(i<6 && j>=0)
     {
         if(arr[i][j]==arr[row][col]){scoreRightLowerDiagonal++;i++;j--;}
         else break;
     }
     // RightDiagonal-1>=4 then condition is satisfied
     if(scoreRightUpperDiagonal+scoreRightLowerDiagonal-1>=4)return true;


     return false; //if score is not enough
}

//function to display coin in html
    //function to add event listener to each column
Array.prototype.forEach.call(tableCell,(cell)=>{
    cell.addEventListener('click',changeColor);
    cell.style.background='white';
})
    //function to actually chagne the color
function changeColor(e)
{   numberOfMovesComleted++;
    var column=e.target.cellIndex;  //to find out column number of table created in html
    var row=[];
    var r=rowToBeFilled(column);
    arr[r][column]=currentPlayer;
    if(isScoreEnough(r,column))
    {
        if(currentPlayer==0)alert(`Congratulations you won!!!!!!!`);
        else alert('oops computer won,better luck next time.Cheers!!!!');
        
    }
    else if(numberOfMovesComleted==42){
        //console.log(arr);
        alert(`It's a tie`);
    }
    row.push(tableRow[r].children[column]);  //this selects the actual column to be filled
    if(currentPlayer==0)
    {
        row[0].style.backgroundColor='red';
        currentPlayer=1;

        console.log(findBestColumn(1));
    }
    else
    {
        row[0].style.backgroundColor='yellow';
        currentPlayer=0;

        console.log(findBestColumn(1));
    }
}

