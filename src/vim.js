// beginning refactor of vim engine to separate from lessons.
// as I dig into this.. wondering if things should be separated further

// Vim engine -- specifically vim related functionality and state management of
//  vim object..
//    would this even involve drawing to the window area?
//    perhaps this would just involve tracking data, etc

// keytracker -- this would listen for keypresses and issue commands to vim
//  engine
//    engage keys from lesson
//    handle key events
//    pass to specific methods of vim engine
//    remove initkeys/killkeys from units!!
//    cursormove as well, not in VIM obj

// displayer -- would render information to window based on info from vim engine
//    queries current lesson, cursor position, etc to draw window
//    any decisions about how to display happen here

import View from './View/View'

function Vim (instance = {}) {
  let cursorPos = instance.cursorPos || [0,0] 
  let furthestCol = 0
  const changeCol = (amount) => {
    cursorPos[0] += amount
  }
  const changeRow = (amount) => {
    cursorPos[1] += amount
  }
  const getCursorPos = () => {
    return cursorPos
  }
  const getFurthestCol = () => {
    return furthestCol
  }
  return Object.assign(this,instance,{
    changeCol,
    changeRow,
    getCursorPos,
    getFurthestCol
  })
}


export default Vim