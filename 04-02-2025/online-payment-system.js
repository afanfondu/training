//
// ## Online Payment System
//
// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.

class Payment {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }

  // this should be overwritten
  processPayment() {
    console.log("Processing payment...");
  }
}

class CreditCardPayment extends Payment {
  #cardNumber;
  #cvv;

  constructor(amount, date, cardNumber, cvv) {
    super(amount, date);
    this.#cardNumber = cardNumber;
    this.#cvv = cvv;
  }

  processPayment() {
    console.log(
      `Processing payment of amount ${this.amount} using credit card...`,
    );
  }
}

class PaypalPayment extends Payment {
  #email;

  constructor(amount, date, email) {
    super(amount, date);
    this.#email = email;
  }

  processPayment() {
    console.log(
      `Processing payment of amount ${this.amount} using paypal account...`,
    );
  }
}

class CryptoPayment extends Payment {
  #walletAddress;

  constructor(amount, date, walletAddress) {
    super(amount, date);
    this.#walletAddress = walletAddress;
  }

  processPayment() {
    console.log(
      `Processing payment of amount ${this.amount} using cypto wallet...`,
    );
  }
}

const payment1 = new CreditCardPayment(
  100,
  new Date(),
  "1234 5678 9012 3456",
  123,
);
payment1.processPayment();
const payment2 = new PaypalPayment(200, new Date(), "john@doe.com");
payment2.processPayment();
const payment3 = new CryptoPayment(300, new Date(), "0x1234567890");
payment3.processPayment();
