//
// State Manager for forms
//
class UnLockForm extends SimpleEvents {
    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    constructor(hash) {

        // Since this is an extension of `SimpleEvents`, we need to call super
        // In order to access its properties and methods, should we need them.
        //
        super();

        // YUCK CITY!
        let that = this;
        this.hash = hash;

        this.ui = {
            "user": new SimpleForm(document.getElementById("outer-unlock")),
            "searchTarget": document.getElementById("unlock_results")
        };

        this.API = new ApiBridge();


        // Show the form, error, or results
        //
        if (hash) {
            this.renderLockStatus(hash);
        } else {
            this.renderLockStatus(false);
        }

    }

    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    renderLockStatus(hash) {

        let that = this;

        if (hash) {

            this.hash = hash;
            this.API.findRecord(hash)
                .then((d) => {
                    if (d.data.decrypted) {
                        that.ui.searchTarget.innerHTML = templates["find/decrypted"].render(d);
                    } else {

                        // They Owe us money...
                        // Show a form:
                        //
                        that.ui.searchTarget.innerHTML = templates["find/encrypted"].render(d);
                        that.ui.square = new SquareForm(document.querySelector("#unlock_square"));

                        // Seriously, you couldn't do better than this?
                        //
                        that.ui.square.id = d.data.id
                        that.ui.square.price = d.data.price;
                        that.ui.btnUnLockRecord = document.getElementById(`btnUnLockRecord-${d.data.id}`);
                        that.ui.btnUnLockRecord.onclick = function (ev) {
                            that.__payOffRecord(ev, this);
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                    that.ui.searchTarget.innerHTML = templates["find/error"].render(e);


                    that.ui.user = new SimpleForm(document.getElementById("unlock"));
                    that.ui.btnSearchRecord = document.getElementById("btnSearchRecord");
                    that.ui.btnSearchRecord.onclick = function (ev) {
                        ev.preventDefault();
                        that.renderLockStatus(that.ui.user.fields.lookup.value);
                    }
                })



        } else {

            that.ui.searchTarget.innerHTML = templates["find/empty"].render();
            that.ui.user = new SimpleForm(document.getElementById("unlock"));
            that.ui.btnSearchRecord = document.getElementById("btnSearchRecord");
            that.ui.btnSearchRecord.onclick = function (ev) {
                ev.preventDefault();
                that.renderLockStatus(that.ui.user.fields.lookup.value);
            }


        }
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __payOffRecord(ev, el) {

        // 1.) Prevent User from Overclicking the button...
        el.disabled = true;

        let that = this;

        // 2.) Try and create Nonce...
        //
        this.ui.square.requestCardNonce()

            //
            // 
            //
            .then((dd) => {

                let id = that.ui.square.id;
                let price = that.ui.square.price;
                let sqNonce = that.ui.square.nonce;

                return that.API.updateRecord(id, sqNonce, price)

            })
            .catch((ee) => {
                el.disabled = false;
                return Promise.reject(ee)
            }) // Silently Fail here since its handled in square class
            .then((ddd) => {
                // Lets decrypt this mother f*cker!
                //
                if (!that.hash) {
                    that.hash = that.ui.user.fields.lookup.value;
                }

                let iv = that.hash.match(/[A-Za-z0-9\=]+$/)[0];


                EzCrypto.decrypt(ddd.data.key, iv, ddd.data.message)
                    .then((dddd) => {

                        console.log(ddd, dddd);
                        ddd.data.decrypted = dddd;
                        // //////////////////////////////////////////////
                        //
                        // INITIAL PAYMENT SUCCESS
                        //
                        // //////////////////////////////////////////////
                        el.disabled = false;
                        that.ui.square.destroy();

                        that.ui.searchTarget.innerHTML = templates["find/decrypted"].render(ddd);

                        document.getElementById("form-2").scrollIntoView()

                    });

            })
            .catch((ee) => {
                console.log("FAIL - CARD ERROR", ee);

                Array.from(ee.data.response.text.errors).forEach(function (x) {
                    that.ui.square.payError(x.code)
                })

                el.disabled = false;
                return false;
            })
    }
}
