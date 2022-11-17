///<reference types="cypress" />



describe('Our first suite', () => {

    it('first test', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attribute
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
            
        cy.contains('nb-card','Horizontal form').find('[type="email"]')


    })

    it('then and wrap methods', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //selenium
        // const firstForm =  cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')

        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email')

        //cypress style using jQuery methods
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordSecondText)

                // if want to switch to cypress use wrap
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })

        })


    })

    it('invoke command', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain', 'checked')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })

    })

    it('assert property', () => {

        // Use date object to get date and modify object to get needed values

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
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('http://localhost:4200/pages')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(300)

            cy.wrap(input).invoke('prop', 'value').should('contains', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })

    })

    it('radio button', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {

            // Verify that first radio button is found and checked
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')

            // Verify second radio button is found and checked
            // Setting eq(1) -> that means that second index (radio button) will be detected
            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})

            // Verify that first is unchecked after second is marked as checked
            // Setting eq(0) -> that means that first radio button is found it's the same as .first()
            cy.wrap(radioButtons)
                .eq(0)
                .should('not.be.be.checked')

            // Verify that third radio button is disabled 
            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')

        })

    })

    it('check boxes', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // Verify all three checkboxes and mark them as checked
        cy.get('[type="checkbox"]').check({force: true})

        // Use click to uncheck checkbox
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})

    })

    it('lists and dropdowns', () => {

        cy.visit('http://localhost:4200/pages')

        // 1. Example of changing theme for only one color

        cy.get('nav nb-select').click()
        // Changing the theme to Dark

        cy.get('.options-list').contains('Dark').click()
        // Verify value for dropdown is changed to Dark

        cy.get('nav nb-select').should('contain', 'Dark')
        // Verify background color for nav is the sam as on styles

        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // 2. Example of changing theme for all colors
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                // Object of colors to go through
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                // Click and validate themes one by one
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3){
                    cy.wrap(dropdown).click()
                }
                
            })
        })


    })

    it('Web table', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1. Find table body and table row which contains name 'Larry' and change data 
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // 2 Add brand new value to the table
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder= "First Name"]').type('Joe')
            cy.wrap(tableRow).find('[placeholder= "Last Name"]').type('Doe')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Joe')
            cy.wrap(tableColumns).eq(3).should('contain', 'Doe')
        })

        // 3 Search all data with same parameter
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('th [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }
                else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        
        })
    })

    it('tooltip', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        // Find tooltip by using cypress locator
        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
            cy.get('.top').should('contain', 'This is a tooltip')

    })

    it('dialog box', () => {

        cy.visit('http://localhost:4200/pages')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // Approach no1 which is not good for finding built in dialog boxes(like from Google)
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        // Approach no2 
        const stub = cy.stub()
        cy.on('window:confirm',stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // If you want to select Cancel button
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false) 

    })

})

