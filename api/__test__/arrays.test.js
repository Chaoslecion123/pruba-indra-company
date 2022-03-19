const {carsList } = require('../arrays')

describe('Array', () => {
    it('deberia esta luis en la lista', async ()=>{
        expect(carsList()).toContain('Luis')
    })
})

