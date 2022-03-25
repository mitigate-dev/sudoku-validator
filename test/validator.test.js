const Validator = require('../src/validator')
const fs = require('fs').promises

describe('it recognizes valid sudoku', () => {
  test('', async () => {
    const sudoku = await fs.readFile(__dirname + '/fixtures/valid_complete.sudoku')

    expect(Validator.validate(sudoku.toString())).toBe('Sudoku is valid.')
  })

  test('', async () => {
    const sudoku = await fs.readFile(__dirname + '/fixtures/valid_incomplete.sudoku')

    expect(Validator.validate(sudoku.toString())).toBe('Sudoku is valid.')
  })
})

describe('it recognizes invalid sudoku', () => {
  [
    __dirname + 'fixtures/invalid_due_to_row_dupe.sudoku',
    __dirname + 'fixtures/invalid_due_to_column_dupe.sudoku',
    __dirname + 'fixtures/invalid_due_to_subgroup_dupe.sudoku'
  ].forEach(path => {
    test('', async () => {
      const sudoku = await fs.readFile(path)

      expect(Validator.validate(sudoku.toString())).toBe('Sudoku is invalid.')
    })
  })
})
