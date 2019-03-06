import { lessonListMaker, hintMaker } from './Lesson/lessonPopulator.js'
import {
  unit1
} from './units.js'
import Unit from './Lesson/Unit.js';
import View from './View/View.js'

const view = new View()

function saveEntry() {
  unit1.promptForSave()
}

function loadEntry() {
  unit1.promptForUpdate()
}

function reset() {
  unit1.resetLesson()
}


view.checkForColors()

const unit = new Unit(unit1)

const lessonList = document.getElementById('lessons')
lessonList.appendChild(unit.lessonListMaker())

const hints = document.getElementById('hints-content')
hints.appendChild(unit.hintMaker())

let save = document.getElementById('save')
let resetLesson = document.getElementById('reset')
let load = document.getElementById('load')
let hintToggle = document.getElementById('hint-toggle')
let lessonToggle = document.getElementById('lesson-toggle')
let darkMode = document.getElementById('change-colors')

hintToggle.addEventListener('click', view.toggleDiv)
lessonToggle.addEventListener('click', view.toggleDiv)
save.addEventListener('click', view.promptForSave)
load.addEventListener('click', view.promptForUpdate)
resetLesson.addEventListener('click', reset)
darkMode.addEventListener('click', view.changeColors)