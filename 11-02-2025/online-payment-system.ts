//
// ## Online Payment System
//
// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.

abstract class Payment {
  constructor(
    protected amount: number,
    public date: Date,
  ) {}

  abstract processPayment(): void;
}

class CreditCardPayment extends Payment {
  private cardNumber: string;
  private cvv: number;

  constructor(amount: number, date: Date, cardNumber: string, cvv: number) {
    super(amount, date);
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  processPayment() {
    console.log(`
Credit Card Payment - ${this.date.toISOString()}
  Amount: $${this.amount}
  Card: ${this.cardNumber.slice(-4).padStart(this.cardNumber.length, "*")}
  Status: Successfully processed
      `);
  }
}

class PaypalPayment extends Payment {
  private email: string;

  constructor(amount: number, date: Date, email: string) {
    super(amount, date);
    this.email = email;
  }

  processPayment() {
    console.log(`
PayPal Payment - ${this.date.toISOString()}
  Amount: $${this.amount.toFixed(2)}
  Card: ${this.email}
  Status: Successfully processed
      `);
  }
}

class CryptoPayment extends Payment {
  private walletAddress: string;

  constructor(amount: number, date: Date, walletAddress: string) {
    super(amount, date);
    this.walletAddress = walletAddress;
  }

  processPayment() {
    console.log(`
Crypto Payment - ${this.date.toISOString()}
  Amount: $${this.amount.toFixed(2)}
  Card: ${this.walletAddress.slice(-4).padStart(this.walletAddress.length, "*")}
  Status: Successfully processed
      `);
  }
}

const payment1 = new CreditCardPayment(
  100,
  new Date(),
  "1234 5678 9012 3456",
  123,
);
payment1.processPayment();
// Credit Card Payment - 2025-02-11T13:35:05.773Z
//   Amount: $100
//   Card: ***************3456
//   Status: Successfully processed

const payment2 = new PaypalPayment(200, new Date(), "john@doe.com");
payment2.processPayment();
// PayPal Payment - 2025-02-11T13:35:05.783Z
//   Amount: $200.00
//   Card: john@doe.com
//   Status: Successfully processed

const payment3 = new CryptoPayment(300, new Date(), "0x1234567890");
payment3.processPayment();
// Crypto Payment - 2025-02-11T13:35:05.783Z
//   Amount: $300.00
//   Card: ********7890
//   Status: Successfully processed
