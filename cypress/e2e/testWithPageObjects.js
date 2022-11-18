import {navigateTo} from "../support/page_objects/navigationPage"

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.visit('http://localhost:4200/pages')
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()

    })

})