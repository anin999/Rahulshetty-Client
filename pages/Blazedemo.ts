import { Page, Locator, expect } from '@playwright/test';


export class FlightBookingPage {
    constructor(private page: Page) {}

    // Human Delay
    async delay(ms: number = 1000) {
        await this.page.waitForTimeout(ms);
    }

    async humanClick(locator: Locator) {
        await this.delay();
        await locator.click();
    }

    async humanFill(locator: Locator, value: string) {
        await this.delay();
        await locator.fill(value);
    }

    async humanSelect(locator: Locator, value: string) {
        await this.delay();
        await locator.selectOption(value);
    }

    // Navigation

    async navigate() {
        await this.page.goto('https://blazedemo.com/');
        
        await this.delay();
    }

 
    // Flight Search
    async selectCities(from: string, to: string) {

        await this.humanSelect(
            this.page.locator('select[name="fromPort"]'),
            from
        );

        await this.humanSelect(
            this.page.locator('select[name="toPort"]'),
            to
        );

        await this.humanClick(
            this.page.getByRole('button', { name: 'Find Flights' })
        );
    }


// Select Flight
async chooseFlight(flightName: string) {

    await this.humanClick(
        this.page
            .getByRole('row', { name: flightName })
            .getByRole('button')
    );
}

    
    // Passenger Details
  
    async fillPassengerDetails(data: {
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        cardType: string;
        cardNumber: string;
        month: string;
        year: string;
        nameOnCard: string;
    }) {

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'Name', exact: true }),
            data.name
        );

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'Address' }),
            data.address
        );

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'City' }),
            data.city
        );

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'State' }),
            data.state
        );

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'Zip Code' }),
            data.zipCode
        );

        await this.humanSelect(
            this.page.locator('#cardType'),
            data.cardType
        );

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'Credit Card Number' }),
            data.cardNumber
        );

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'Month' }),
            data.month
        );

        await this.delay();
        await this.page.mouse.wheel(0, 300);

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'Year' }),
            data.year
        );

        await this.humanFill(
            this.page.getByRole('textbox', { name: 'Name on Card' }),
            data.nameOnCard
        );

        await this.humanClick(
    this.page.getByText('Remember me')
    );
    }

   
    // Purchase Flight
  
    async purchaseFlight() {

        await this.humanClick(
            this.page.getByRole('button', { name: 'Purchase Flight' })
        );
    }

    // Verification

    async verifyPurchase() {

        await this.delay();

        await expect(
            this.page.getByRole('heading', {
                name: 'Thank you for your purchase today!'
            })
        ).toBeVisible();
    }


    // Back to Home
    async backToHome() {

        await this.humanClick(
            this.page.getByRole('link', { name: 'Travel The World' })
            
            
        );
            await this.page.waitForTimeout(4000);

    }
}