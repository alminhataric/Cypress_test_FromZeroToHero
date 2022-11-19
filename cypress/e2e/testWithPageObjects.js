import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import {navigateTo} from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

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

    it('should submit InLine and Basic form and select tomorrow date in the calendar', () => {

        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInLineFormWithNameAndEmail('James', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('John', 'Doe')
        onSmartTablePage.updateAgeByFirstName('John', '25')
        onSmartTablePage.deleteRowByIndex(1)

    })

})