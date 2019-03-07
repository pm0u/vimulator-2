import Unit from "./Unit.js";

function Curriculum (units) {
    this.changeCurrLesson = (lessonNum) => {
        this.currLesson = lessonNum
    }
    this.changeLesson = (lessonNum) => {
        let activeLesson = unit1.lessons[this.currLesson]
        activeLesson.killKeys()
        this.changeCurrLesson(lessonNum)
        this.initLesson()
    }
    this.nextLesson = () => {
        console.log(!!unit1.lessons[unit1.currLesson + 1])
        if (!!unit1.lessons[unit1.currLesson + 1]) {
            unit1.changeLesson(unit1.currLesson + 1)
        } else {
            unit1.initLesson()
        }
    }
    this.makeUnits = (units) => {
        let unitList = []
        for (let unit of units) {
            unitList.push(new Unit(unit))
        }
        return unitList
    }
    this.curriculumListMaker = () => {
        let units = []
        for (let unit of this.units) {
            units.push(unit.lessonListMaker())
        }
        return units
    }
    this.units = this.makeUnits(units)
    this.currUnitNum = 0
    this.currUnit = this.units[this.currUnitNum]
    this.currLesson = this.currUnit.currLesson
}

export default Curriculum