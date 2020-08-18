class ApiBridge extends SimpleEvents {
    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    constructor() {
        super();

        this._private_ = {};
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    createRecord(sqNonce, message, price, expiration, cause) {
        //
        // This'll hold 
        // the lookup and nonce; which the user keeps
        //
        // The rest of the crypto data, the server keeps...
        //
        let userData;
        let that = this;


        // 1.) Encrypt our Message
        return EzCrypto.encrypt(message)

            // 2a.) Make our Crypto Data useful
            //     to the server
            .then((cryptoData) => {

                // Pull user data out of crypto object, and delete it
                // before sending anything over to the server.
                userData = cryptoData.lookup + "-" + cryptoData.nonce;
                delete cryptoData.nonce;


                // Add user created data to the object
                // so we can send it
                cryptoData.nonce = sqNonce;
                cryptoData.price = price;
                cryptoData.expiration = expiration;
                cryptoData.cause = cause;

                return cryptoData;

                // return that.__sendToServer("POST", "create", cryptoData);
            })
            // 2b.) Crypto failed?!?!
            .catch((e) => {
                return Promise.reject(e);
            })
            // 3.) Send Crypto data to the server
            .then((cryptoData) => {
                return that.__sendToServer("POST", "create", cryptoData);
            })
            // 3a) Looks like everything got sent; return our lookup
            //     for the user
            .then((d) => {
                return Promise.resolve({
                    "key": userData,
                    "data": d
                });
            })
            // 3b.) Something in the payment cycle failed.
            //      Return the rejection
            .catch((paymentError) => {
                return Promise.reject(paymentError);
            })
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    updateRecord(id, sqNonce, price) {
        //
        // This'll hold 
        // the lookup and nonce; which the user keeps
        //
        // The rest of the crypto data, the server keeps...
        //
        let userData;
        let that = this;

        let data = {
            "nonce": sqNonce,
            "price": price
        }

        // 1.) Encrypt our Message
        return that.__sendToServer("POST", `update/${id}`, data)
            // 3a) Looks like everything got sent; return our lookup
            //     for the user
            .then((d) => {
                return Promise.resolve(d);
            })
            // 3b.) Something in the payment cycle failed.
            //      Return the rejection
            .catch((paymentError) => {
                return Promise.reject(paymentError);
            })
    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    findRecord(hash) {

        let tmpAry = hash.match(/[A-Za-z0-9]+\-.*/)[0].split("-");
        let id = tmpAry[0];
        let iv = tmpAry[1];

        return this.__sendToServer("GET", `find/${id}`, {})
            .then((d) => {
                // If its already been paid for, we'll get back a key, if not; no
                if (d.data.key) {
                    return EzCrypto.decrypt(d.data.key, iv, d.data.message)
                        .then((dd) => {

                            d.data.decrypted = dd;

                            return Promise.resolve(d);
                        });
                } else {
                    return Promise.resolve(d);
                }
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __sendToServer(method, route, data) {


        let that = this;

        let sendObj = {
            "method": method,
            "headers": {
                "accept": "application/json",
                "content-type": "application/json"
            },
            "body": JSON.stringify(data)
        };

        if (method == "GET") {
            delete sendObj.body;
        }

        //
        // No Need for jQuery Here...?
        //
        return fetch(window.envVariables[window.env].apiUrl + route, sendObj)
            .then((response) => {
                // Anything other than 2xx methods...
                // Handle Errors Here...
                //
                if (!response.ok) {
                    //
                    // Throw the promise of the JSON up
                    // with a rejection
                    return response.json()
                        .then((errorInfo) => {
                            return Promise.reject(errorInfo)
                        });
                } else {
                    //
                    // Return the JSON response up...
                    return response.json();
                }
            })
            .catch(err => {
                // Vomit Something to the top
                return Promise.reject(err);
            })
    }

}
