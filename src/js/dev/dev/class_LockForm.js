//
// State Manager for forms
//
class LockForm extends SimpleEvents {
    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    constructor() {

        super();
        let that = this;

        this.ui = {};
        this.ui.user = new SimpleForm(document.getElementById("lock"));
        this.ui.square = new SquareForm(document.getElementById("lock_square"));
        this.ui.btnCreateRecord = document.getElementById("btnCreateRecord");
        this.API = new ApiBridge();


        // Set the UI Element to do something once the user
        // Clicks it.
        this.ui.btnCreateRecord.onclick = function (ev) {
            that.__createRecord();
        }

    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __createRecord() {
        // 0.) Prevent User from Overclicking the button...
        this.ui.btnCreateRecord.disabled = true;
        let that = this;

        // 1.) Check the user form first to make sure its gtg
        //
        if (this.ui.user.validate()) {

            // 2.) Try and create Nonce...
            //
            this.ui.square.requestCardNonce()
                //
                //
                .then((dd) => {
                    return that.API.createRecord(
                        that.ui.square.nonce,
                        that.ui.user.fields.message.value,
                        that.ui.user.fields.price.value,
                        that.ui.user.fields.expiration.value,
                        that.ui.user.fields.cause.value
                    );
                })
                // This is a nonce failure.
                // The user interface handles it...
                .catch((ee) => {
                    that.ui.btnCreateRecord.disabled = false;
                    return Promise.reject(ee)
                })
                .then((ddd) => {
                    // //////////////////////////////////////////////
                    //
                    // INITIAL PAYMENT SUCCESS
                    //
                    // //////////////////////////////////////////////
                    console.log("SUCCESS", ddd);
                    document.location.hash = `q=${ddd.key}`;
                    document.querySelector("#lock_results").innerHTML = templates["lock/pay-success"].render(ddd);
                    that.ui.btnCreateRecord.disabled = false;
                    that.ui.square.destroy();
                    that.ui.user.empty();
                    that.ui.square.build();
                    document.getElementById("form-1").scrollIntoView();
                    return true;
                })
                .catch((ee) => {
                    console.log("FAIL - CARD ERROR", ee);
                    that.ui.btnCreateRecord.disabled = false;

                    Array.from(ee.data.response.text.errors).forEach(function (x) {
                        that.ui.square.payError(x.code)
                    })

                    return false;
                })
        } else {
            that.ui.btnCreateRecord.disabled = false;
        }

    }
}
