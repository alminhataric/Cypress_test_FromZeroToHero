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
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text() ).to.equal('Email address')
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

        cy.visit('http://localhost:4200/pages')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contains', 'Nov 17, 2022')
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

})

