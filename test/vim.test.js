 const chai = require('chai')
 const assert = chai.assert
 const expect = chai.expect
 const should = chai.should()
 import Vim from '../src/vim'

 describe('Vim', function () {
     it('can be imported', function () {
         expect(Vim).to.exist
     })
     it('has cursor position initialized to 0,0', () => {
         expect(Vim.cursorPos).to.deep.equal([0,0])
     })
 })