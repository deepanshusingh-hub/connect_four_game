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
        else alert('oops computer won,better luck next time.Cheers!!!!')
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
    }
    else
    {
        row[0].style.backgroundColor='yellow';
        currentPlayer=0;
    }
}
//MINIMAX ALGORITHM



