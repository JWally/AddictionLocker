// ////////////////////////////////
//
// So this is weird, and I'm sure full of code stink,
// but...it works.
//
// I need a way to have this object emit events.
// It doesn't look like HTML-javascript can do this
// without being pegged to an element. So...if its an
// element they wants; its an element they gets!

//
// ////////////////////////////////


class SimpleEvents {


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    addEventListener(eventType, callBack) {

        if (!this.radio) {
            this.radio = document.createDocumentFragment();
        }

        this.radio.addEventListener(eventType, callBack);
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __broadcast(eventName, eventData) {

        if (!this.radio) {
            this.radio = document.createDocumentFragment();
        }

        let event = new Event(eventName, {
            "name": eventName,
            "info": eventData
        });

        this.radio.dispatchEvent(event);

    }

}
