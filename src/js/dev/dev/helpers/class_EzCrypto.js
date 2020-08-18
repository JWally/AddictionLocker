/*
  Generate an encryption key, then set up event listeners
  on the "Encrypt" and "Decrypt" buttons.
*/


class EzCrypto {




    static encrypt(message) {

        // YUCK!
        let that = this;
        let encryptionKey;
        let cipherText;
        let lookup;


        let retObj = {};

        // STEP 1:) GENERATE A KEY
        //
        return window.crypto.subtle.generateKey({
                    "name": "AES-GCM",
                    "length": 256
                },
                true,
            ["encrypt", "decrypt"]
            ).then((key) => {

                // Store key here:
                retObj.key = key;


                //
                // STEP 2:) ENCODE OUR MESSAGE TO BITS OR SOMETHING...
                //
                message = new TextEncoder().encode(message);


                //
                // STEP 3:) ENCRYPT IT
                //
                //return encryptMessage(message, key);



                // The iv must never be reused with a given key.
                retObj.nonce = window.crypto.getRandomValues(new Uint8Array(12));

                return window.crypto.subtle.encrypt({
                        "name": "AES-GCM",
                        "iv": retObj.nonce
                    },
                    key,
                    message
                )




            }).then((data) => {
                retObj.message = data;
                //
                // Extract Key
                //
                return window.crypto.subtle.exportKey("raw", retObj.key)
            }).then((data) => {

                retObj.nonce = btoa(JSON.stringify(Object.values(retObj.nonce)));
                retObj.key = btoa(JSON.stringify(Object.values(new Uint8Array(data))));
                retObj.message = btoa(JSON.stringify(Object.values(new Uint8Array(retObj.message))));

                return that.randomHash();
            })
            .then((hash) => {

                retObj.lookup = hash;

                return retObj;

            })

    }





    static decrypt(key, nonce, message) {

        // Convert Back Up...
        nonce = (new Uint8Array(JSON.parse(atob(nonce)))).buffer;
        message = (new Uint8Array(JSON.parse(atob(message)))).buffer;
        key = (new Uint8Array(JSON.parse(atob(key)))).buffer;


        // Convert key into Crypto-Key...
        return window.crypto.subtle.importKey("raw", key, "AES-GCM", true, ["encrypt", "decrypt"])
            .then((key) => {

                return window.crypto.subtle.decrypt({
                        "name": "AES-GCM",
                        "iv": nonce
                    },
                    key,
                    message
                );

            }).
        then((decrypted) => {
            return new TextDecoder().decode(decrypted);
        });
    }






    static randomHash() {
        const message = window.crypto.getRandomValues(new Uint32Array(10)).join();
        const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array


        return crypto.subtle.digest('SHA-256', msgUint8)
            .then((hashBuffer) => {

                const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
                return hashHex;

            })
    }

}
