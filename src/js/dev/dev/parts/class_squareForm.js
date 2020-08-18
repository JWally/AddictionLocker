class SquareForm extends SimpleEvents {
    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    constructor(el) {

        super();



        this._private_ = {};
        this._private_.el = el;
        this._private_.formData = {};
        this._private_.formObject = null;
        this._private_.fieldFlags = {};
        this._private_.nonceData = false;

        // Build the form, dummy...
        this.__buildFormData();

    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    get nonce() {
        if (this._private_.nonceData.nonce) {
            return this._private_.nonceData.nonce;
        } else {
            return false;
        }
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    get id() {
        if (this._private_.id) {
            return this._private_.id;
        } else {
            return false;
        }
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    set id(id) {
        this._private_.id = id;
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    get price() {
        if (this._private_.price) {
            return this._private_.price;
        } else {
            return false;
        }
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    set price(price) {
        this._private_.price = price;
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    destroy() {
        if (this._private_.formObject.destroy) {
            return this._private_.formObject.destroy();
        } else {
            throw new Error("Method does not exist...");
        }
    }

    // ////////////////////////////////
    //
    // Requests a nonce from 
    // the payment information to the server
    // to pay for a N*E*W record.
    // ////////////////////////////////
    requestCardNonce() {

        // Great googley moogley...dammit!
        let that = this;

        // Empty the nonceData so there isn't
        // a lot of confusion..
        that._private_.nonceData = false;

        return new Promise((resolve, reject) => {

            if (!that._private_.formObject) {
                reject({
                    "errors": "Form Object not Loaded..."
                });
            } else {
                that._private_.formObject.requestCardNonce();


                let intvalCount = 0;
                let intval = setInterval(function () {

                    let nonceData = that._private_.nonceData;


                    // If we have nonce data, lets
                    // handle it, no?
                    //
                    if (nonceData) {

                        if (nonceData.errors) {

                            // Update Flag Text...
                            nonceData.errors.forEach(e => {
                                that.setFlag(e.field, e.message);
                            });

                            // Clear the interval
                            clearInterval(intval);

                            // Reject the Promise
                            reject(nonceData);
                            return;
                        } else {
                            // Clear the interval
                            clearInterval(intval);

                            // Return our data
                            resolve(nonceData);
                            return;
                        }
                    }


                    // If we've gone more than 600ms; lets
                    // bail out...
                    //
                    //
                    if (intvalCount > 6) {

                        // Broadcast an error, and reject
                        // the promise
                        that.__broadcast("error", {
                            "error": true,
                            "message": "Timeout"
                        });

                        // Clear the counter
                        clearInterval(intval);
                    }

                }, 100);
            }
        });
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    setFlag(field, value) {
        this._private_.fieldFlags[field].innerText = value;
        this._private_.fieldFlags[field].parentNode.querySelector("iframe")
            .classList.add("sq-input--error");
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    clearFlag(field) {
        this._private_.fieldFlags[field].innerText = "";
        this._private_.fieldFlags[field].parentNode.querySelector("iframe")
            .classList.remove("sq-input--error");
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    build() {
        this.__buildFormData();
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __buildFormData() {

        //return true;

        // Set generic for future tax purposes
        let formData = {};
        let fieldFlags = {};
        let formObject = {};

        // Yuck
        let that = this;

        // Application Id
        formData.applicationId = window.envVariables[window.env].applicationId;

        // Generic Input Class
        formData.inputClass = "sq-input";

        // Auto-Build...forget what it means...
        formData.autoBuild = false;

        // Auto-Build...forget what it means...
        formData.inputStyles = [{
            "fontSize": '16px',
            "lineHeight": '24px',
            "padding": '16px',
            "placeholderColor": '#a0a0a0',
            "backgroundColor": 'transparent',
        }];

        // Listing of call backs square needs to respond to events
        // ...
        // I don't like this...
        //
        formData.callbacks = {
            "cardNonceResponseReceived": function (errors, nonce, cardData) {
                // Store All of this S*** private for now, I guess...
                that._private_.nonceData = {
                    "errors": errors,
                    "nonce": nonce,
                    "cardData": cardData
                };
            },
            "inputEventReceived": function (ev) {
                if (ev.eventType == "focusClassAdded") {
                    that.clearFlag(ev.field);
                }
            }
        };

        // Load Square Fields via Data-Attrs from the given element
        Array.from(this._private_.el.querySelectorAll("[data-role='square']")).forEach(function (el) {
            formData[el.dataset.squareattr] = {
                "elementId": el.id,
                "placeholder": el.dataset.placeholder
            }
            // Set Reference to the actual fields so we can error handle them...
            // maybe...!
            //
            fieldFlags[el.dataset.squareattr] = el.parentElement.querySelector(`[data-flag-for='${el.id}']`);
        });

        // Mount formData
        try {
            formObject = new SqPaymentForm(formData);
        } catch (e) {
            // Log the error
            console.error("Error Creating Form Object", e);
            // Broadcast the error
            this.__broadcast("error", {
                "notes": "Build Form -> New SqPaymentForm",
                "data": e
            });
            // Return False
            return false;
        }


        // Build the form
        try {
            formObject.build();
        } catch (e) {
            // Log the error
            console.error("Error Building Form Object", e);
            // Broadcast the error
            this.__broadcast("error", {
                "notes": "Build Form -> formObject.build",
                "data": e
            });
            // Return False
            return false;
        }

        // Move temp data to the "private" class variables...
        //
        this._private_.formData = formData;
        this._private_.fieldFlags = fieldFlags;
        this._private_.formObject = formObject;

        return true;

    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    payError(pay_error) {

        let lookup = {
            "BAD_EXPIRATION": {
                "descr": "The card expiration date is missing or incorrectly formatted.",
                "el": "expirationDate"
            },
            "INVALID_ACCOUNT": {
                "descr": "The card issuer was not able to locate the account on record.",
                "el": ""
            },
            "CARDHOLDER_INSUFFICIENT_PERMISSIONS": {
                "descr": "The card issuer has declined the transaction due to restrictions on where the card can be used. For example, a Gift Card is limited to a single seller.",
                "el": ""
            },
            "INSUFFICIENT_PERMISSIONS": {
                "descr": "The Square account does not have the permissions to accept this payment. For example, Square might limit which sellers are allowed to receive Gift Card payments.",
                "el": ""
            },
            "INSUFFICIENT_FUNDS": {
                "descr": "The payment source has insufficient funds to cover the payment.",
                "el": ""
            },
            "INVALID_LOCATION": {
                "descr": "The Square account cannot take payments in the specified region. A Square account can take payments only in the region where the account was created.",
                "el": ""
            },
            "TRANSACTION_LIMIT": {
                "descr": "The card issuer has determined the payment amount is too high or too low. The API returns the error code mostly for credit cards (for example, the card reached the credit limit). However, sometimes the issuer bank can indicate the error for debit or prepaid cards (for example, the card has insufficient funds).",
                "el": ""
            },
            "CARD_EXPIRED": {
                "descr": "The card issuer declined the request because the card is expired.",
                "el": "expirationDate"
            },
            "CVV_FAILURE": {
                "descr": "The card issuer declined the request because the CVV value is invalid.",
                "el": "cvv"
            },
            "ADDRESS_VERIFICATION_FAILURE": {
                "descr": "The card issuer declined the request because the postal code is invalid.",
                "el": "postalCode"
            },
            "TEMPORARY_ERROR": {
                "descr": "A temporary internal error occurred. You can safely retry your call using the same idempotency key.",
                "el": ""
            },
            "VOICE_FAILURE": {
                "descr": "The card issuer declined the request because the issuer requires voice authorization from the cardholder.",
                "el": ""
            },
            "PAN_FAILURE": {
                "descr": "The specified card number is invalid. For example, it is an incorrect length or is incorrectly formatted.",
                "el": ""
            },
            "EXPIRATION_FAILURE": {
                "descr": "The card expiration date is invalid or indicates that the card is expired.",
                "el": "expirationDate"
            },
            "CARD_NOT_SUPPORTED": {
                "descr": "The card is not supported in the geographic region.",
                "el": ""
            },
            "INVALID_PIN": {
                "descr": "The card issuer declined the request because the PIN is invalid.",
                "el": ""
            },
            "INVALID_POSTAL_CODE": {
                "descr": "The postal code is incorrectly formatted.",
                "el": "postalCode"
            },
            "CHIP_INSERTION_REQUIRED": {
                "descr": "The card issuer requires reading the card using a chip reader.",
                "el": ""
            },
            "ALLOWABLE_PIN_TRIES_EXCEEDED": {
                "descr": "The card has exhausted its available pin entry retries set by the card issuer. Typically this requires the card holder to resolve the issue by contacting the card issuer.",
                "el": ""
            },
            "MANUALLY_ENTERED_PAYMENT_NOT_SUPPORTED": {
                "descr": "The card must be swiped, tapped, or dipped. Payments attempted by manually entering the card number are declined.",
                "el": ""
            },
            "PAYMENT_LIMIT_EXCEEDED": {
                "descr": "Square declined the request because the payment amount exceeded the processing limit for this seller.",
                "el": ""
            },
            "GENERIC_DECLINE": {
                "descr": "An unexpected error occurred.",
                "el": ""
            },
            "INVALID_FEES": {
                "descr": "The app_fee_money on a payment is too high.",
                "el": ""
            },
            "CARD_DECLINED_VERIFICATION_REQUIRED": {
                "descr": "This payment requires verification. For more information, see SCA Overview.",
                "el": ""
            },
            "INVALID_EXPIRATION": {
                "descr": "Expiration date is invalid",
                "el": "expirationDate"
            }
        }

        if (lookup[pay_error]) {
            let tmp = lookup[pay_error];

            if (tmp.el == "") {
                tmp.el = "cardNumber"
            }

            this.setFlag(tmp.el, tmp.descr);

        }
    }

}
