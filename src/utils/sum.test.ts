import { sum } from './sum';

describe('sum', () => {
    it('可以做整数的加法', () => {
        expect(sum(1, 3)).toEqual(4)
    })
})