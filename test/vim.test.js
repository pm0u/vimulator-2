const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()
import Vim from '../src/vim'



describe('Vim', function () {
    let vim
    beforeEach(() => {
        vim = new Vim()
    })
    describe('basic initialization', () => {
        it('can be imported', () => {
            expect(vim).to.exist
        })
        it('has cursor position initialized to 0,0', () => {
            expect(vim.getCursorPos()).to.deep.equal([0, 0])
        })
        it('initializes furthestCol to 0', () => {
            expect(vim.getFurthestCol()).to.equal(0)
        })
    })
    describe('moving cursor position', () => {
        it('can move forward',() => {
            vim.changeCol(1)
            expect(vim.getCursorPos()).to.deep.equal([1,0])
        })
        it('can move backward',() => {
            vim.changeCol(1)
            vim.changeCol(1)
            vim.changeCol(-1)
            expect(vim.getCursorPos()).to.deep.equal([1,0])
        })
        it('can move up a row',() => {
            vim.changeRow(1)
            expect(vim.getCursorPos()).to.deep.equal([0,1])
        })
        it('can move down a row',() => {
            vim.changeRow(1)
            vim.changeRow(1)
            vim.changeRow(-1)
            expect(vim.getCursorPos()).to.deep.equal([0,1])
        })
    })
})