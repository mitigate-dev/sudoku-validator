const fs = require('fs')
const path = require('node:path');
const { threadId } = require('worker_threads');

class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  isValidY(suCleaned){
    let rowIter = 0 //row iterator
    for(let l = 0;l<9;l++){// to iterate throo rows
      let getRow = suCleaned.substring(0+rowIter, 9+rowIter) //row
      for(let i=0;i<9;i++){ //to iterate thoo row characters
        let rowChar = getRow.charAt(i) //row char
        let duble = 0 //find 
        let column = ''
        let colIter = 0
        for(let k=0;k<9;k++){ //column stack
          column += suCleaned.charAt(0+i+colIter)
          colIter=colIter+9
        }
        for(let j=0;j<9;j++){ //check for duplicates
          if(rowChar==0 && column.charAt(j)==0){
            break
          }
          if(rowChar == column.charAt(j)){
            duble = duble + 1
            if(duble == 2){
              // console.log('Sudoku is invalid.')
              return false
            }
          }  
        }
      }
      rowIter = rowIter+9
    }
    return true
  }

  isValidX(suCleaned){
    for(let l = 0;l<9;l++){
      let column = ''
      let colIter = 0
      for(let k=0;k<9;k++){ 
        column += suCleaned.charAt(0+l+colIter)
        colIter=colIter+9
      }
      let rowIter = 0 
      for(let i=0;i<9;i++){ 
        let getRow = suCleaned.substring(0+rowIter, 9+rowIter) 
        let colChar = column.charAt(i) 
        let duble = 0 
  
        for(let j=0;j<9;j++){ 
          if(colChar && getRow.charAt(j)==0){
            break
          }
          if(getRow.charAt(j) == colChar){
            duble = duble + 1
            if(duble == 2){
              // console.log('Sudoku is invalid.')
              return false
            }
          }  
        }
        rowIter = rowIter+9
      }
    }
    return true
  }

  isValidSubGroup(suCleaned){
    var suArray = new Array(9)
    for (var i = 0; i < suArray.length; i++) {
      suArray[i] = new Array(9);
    }
    var iterator = 0
    for (var i = 0; i < suArray.length; i++) {
      for (var j = 0; j < suArray.length; j++) {
        suArray[i][j] = suCleaned.charAt(j+iterator);
      }
      iterator = iterator+9
    }

    var subGridArray = new Array(9)
    for (var i = 0; i < subGridArray.length; i++) {
      subGridArray[i] = new Array(9);
    }

    let grid = [] 
    let offsetX = 0
    let offsetY = 0
    for (var k = 0; k < 9; k++) {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          grid.push(suArray[i+offsetX][j+offsetY])
          
        }
      }
      subGridArray[k] = grid
      grid = []
      offsetY = offsetY+3
      if(offsetY == 9){
        offsetY = 0
        offsetX= offsetX+3
      } 
    }
    const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
    for(var i = 0; i < 9; i++){
      const duplicateElements = toFindDuplicates(subGridArray[i]);
      var filtered = duplicateElements.filter(function(value, index, arr){ 
        return value !== '0';
      });
      if (filtered.length !== 0) {
        // console.log("grid dupe!")
        return false
      }
    }
    return true
  }

  isComplete(suCleaned){
    for (var i = 0; i < suCleaned.length; i++) {
        if(suCleaned.charAt(i)=='0'){
          // console.log("Incomplete!")
          return false
        }
    }
    return true
  }




  validate(sudoku) {
    // Your code here 
    const path1 = path.join(process.cwd(), sudoku) //path with back forward slash
    var path2 = path1.replace(/\\/g, "/");//path with forwardd forward slash

    const su = fs.readFileSync(path2,'utf8') // if you type 'C:/Users/dota2/Desktop/Project/sudoku-validator-node/test/fixtures/valid_complete.sudoku' insted of path test will pass
    const suCleaned = su.replace(/\D+/g, "")
    let isValidY = true
    let isValidX = true
    let isValidSubGroup = true
    let isComplete = true
   
    isValidY = this.isValidY(suCleaned)
    isValidX = this.isValidX(suCleaned)
    isValidSubGroup = this.isValidSubGroup(suCleaned)
    isComplete = this.isComplete(suCleaned)

    // console.log('isValidX        '+isValidX)
    // console.log('isValidSubGroup '+isValidSubGroup)
    // console.log('isComplete      '+isComplete)

    if(isValidY && isValidX && isValidSubGroup && isComplete){
      return 'Sudoku is valid.'
    }
    if(isValidY && isValidX && isValidSubGroup){
      return 'Sudoku is valid but incomplete.'
    }
    if(!isValidY || !isValidX || !isValidSubGroup){
      return 'Sudoku is invalid.'
    }


    
  }
}
    // node bin/validate
    // node bin/validate test\fixtures\invalid_due_to_column_dupe.sudoku

module.exports = Validator
