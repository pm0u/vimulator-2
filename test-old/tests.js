// chai commands
const assert = chai.assert
const expect = chai.expect
const should = chai.should()
//
// elements on page
let vimText = document.getElementById('vim-text')
let posDiv = document.getElementById('pos-div')
let vimStorage = window.localStorage
let hintsDiv = document.getElementById('hints')
//
// key event bindings
let lKeyDown = new Event('keydown')
lKeyDown.key = 'l'
let hKeyDown = new Event('keydown')
hKeyDown.key = 'h'
//

describe('page load', function() {
  it('worked?', function() {
    expect(true).to.equal(true)
  })
})

describe('unit.initLesson()', function() {
  it('puts lesson text on screen', function() {
    unit1.initLesson()
    expect(vimText.innerText).to.equal(unit1.lessons[unit1.currLesson].lessonText.join('\n'))
  })
  it('sets hint text', () => {
    expect(hintsDiv.innerHTML).to.equal(unit1.lessons[unit1.currLesson].hints)
  })
})

describe('unit.resetLesson()', () => {
  it('puts lesson back to start condition', () => {
    document.dispatchEvent(lKeyDown)
    unit1.resetLesson()
    expect(unit1.lessons[unit1.currLesson].lessonText).to.deep.equal(unit1.lessons[unit1.currLesson].changes[0].lessonText)
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(unit1.lessons[unit1.currLesson].changes[0].cCol)
  })
  it('makes vim text area reflect this', () => {
    expect(vimText.innerHTML).to.equal(unit1.genHTML(0))
  })
})

describe('unit.changeCurrLesson', () => {
  it('changes unit.currLesson', () => {
    unit1.changeCurrLesson(1)
    expect(unit1.currLesson).to.equal(1)
    unit1.changeCurrLesson(0)
    expect(unit1.currLesson).to.equal(0)
  })
})
describe('unit.updateCursorPosDisplay()', () => {
  it('modifies div that is cursor & row position', () => {
    unit1.updateCursorPosDisplay(1, 0)
    expect(posDiv.innerText).to.equal('2,1')
  })
  it('overwrites contents', () => {
    unit1.updateCursorPosDisplay(2,0)
    expect(posDiv.innerText).to.equal('3,1')
  })
  it('updates with current row/col', () => {
    unit1.resetLesson()
    document.dispatchEvent(lKeyDown)
    expect(posDiv.innerText).to.equal('1,2')
    document.dispatchEvent(lKeyDown)
    expect(posDiv.innerText).to.equal('1,3')
    document.dispatchEvent(lKeyDown)
    expect(posDiv.innerText).to.equal('1,4')
  })
  it('displays cursor position with lesson init/reset', function () {
    unit1.resetLesson()
    expect(posDiv.innerText).to.equal('1,1')
  })
})

describe('unit.saveToStorage()', () => {
  it('saves string of unit object to localStorage', () => {
    unit1.saveToStorage()
    expect(vimStorage.units).to.be.a('string')
  })
})

describe('unit.updateFromStorage()', () => {
  it('retieves information from local storage and updates current object', () => {
    unit1.resetLesson()
    unit1.saveToStorage()
    document.dispatchEvent(lKeyDown)
    document.dispatchEvent(lKeyDown)
    document.dispatchEvent(lKeyDown)
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(3)
    unit1.updateFromStorage()
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(0)
    console.log(unit1)

  })
})


describe('Lesson 1 -- move right', () => {
  it('moves cursor to right when "l" pressed', () => {
    unit1.resetLesson()
    document.dispatchEvent(lKeyDown)
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(1)
  })
  it("stops cursor when attempting to move past EOL", () => {
    unit1.resetLesson()
    for (let i = 0; i < 50; i++) {
      document.dispatchEvent(lKeyDown)
    }
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(unit1.lessons[unit1.currLesson].lessonText[0].length - 1)
  })
  it('recognizes when lesson is not finished', () => {
    unit1.resetLesson()
    expect(unit1.lessons[unit1.currLesson].finished).to.equal(false)
    expect(unit1.finisher()).to.equal(false)
  })
  it('recognizes when lesson is finished', () => {
    unit1.resetLesson()
    for (let i = 0; i < 50; i++) {
      document.dispatchEvent(lKeyDown)
    }
    expect(unit1.lessons[unit1.currLesson].finished).to.equal(true)

  })
})

describe('unit.changeLesson()', () => {
  it('changes value of currlesson', () => {
    unit1.changeLesson(1)
    expect(unit1.currLesson).to.equal(1)
  })
})

describe('Lesson 2 -- move left', () => {
  it('moves cursor to left when h pressed', () => {
    unit1.initLesson()
    document.dispatchEvent(hKeyDown)
    expect(unit1.lessons[1].cCol).to.equal(unit1.lessons[1].lessonText[0].length - 2)
  })
  it('stops cursor when attempting to move past beginning of line', () => {
    unit1.resetLesson()
    for (let i = 0; i < 50; i++) {
      document.dispatchEvent(hKeyDown)
    }
    expect(unit1.lessons[1].cCol).to.equal(0)
  })
  it('recognizes when lesson is not finished', () => {
    unit1.resetLesson()
    expect(unit1.lessons[unit1.currLesson].finished).to.equal(false)
    expect(unit1.finisher()).to.equal(false)
  })
  it('recognizes when lesson is finished', () => {
    unit1.resetLesson()
    for (let i = 0; i < 50; i++) {
      document.dispatchEvent(hKeyDown)
    }
    expect(unit1.lessons[unit1.currLesson].finished).to.equal(true)

  })
})
