

function selectDayFromCurrent(day){

    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('en-us', {month: 'short'})
    let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()


    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
        if( !dateAttribute.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        } 
        else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateAssert
}


export class DatepickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)

            cy.wrap(input).invoke('prop', 'value').should('contains', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    selectDatepickerWithRangeFromToday(firstDay, SecondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDay)
            let dateAssertSecond = selectDayFromCurrent(SecondDay)
            const finalDate = dateAssertFirst +' - '+dateAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('contains', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })
    }

}

export const onDatePickerPage = new DatepickerPage()