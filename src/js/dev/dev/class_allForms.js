//
// State Manager for forms
//
class AllForms extends SimpleEvents {
    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    constructor() {

        super();

        // YUCK CITY!
        var that = this;

        // Instantiate
        this.LockSection = document.querySelector("#form-1");
        this.UnLockSection = document.querySelector("#form-2");

        // ADD FUNCTIONALITY TO HIDDEN BUTTONS
        // SO THAT WE CAN TOGGLE BACK AND FORTH
        // BETWEEN EACH FORM BEING (IN)VISIBLE
        //
        this.buttons = {
            "btnLockForm": document.getElementById("btnLockForm"),
            "btnUnLockForm": document.getElementById("btnUnLockForm")
        };



        // There's a query string in the URL; start off showing
        // the unlock form...
        //
        let hash = false;

        if (window.location.hash.length > 0) {
            hash = window.location.hash;
            this.__showUnLock();
        } else {
            this.__showLock();
        }

        // Instantiate our Forms
        //
        this.LockForm = new LockForm();
        this.UnLockForm = new UnLockForm(hash);




        this.__registerEvents();

    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __showLock() {
        this.buttons.btnLockForm.classList.add("active");
        this.buttons.btnUnLockForm.classList.remove("active");
        this.LockSection.classList.remove("hide-small");
        this.UnLockSection.classList.add("hide-small");
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __showUnLock() {
        this.buttons.btnUnLockForm.classList.add("active");
        this.buttons.btnLockForm.classList.remove("active");
        this.LockSection.classList.add("hide-small");
        this.UnLockSection.classList.remove("hide-small");
    }


    // ////////////////////////////////
    //
    //
    // ////////////////////////////////
    __registerEvents() {

        // Because Scope:
        let that = this;

        // Show the left hand side of screen when its small
        this.buttons.btnLockForm.onclick = function () {
            that.__showLock();
        }

        // Show the right hand of screen when its small...
        this.buttons.btnUnLockForm.onclick = function () {
            that.__showUnLock();
        }

        // Handle when the window's hash changes...
        window.addEventListener('hashchange', function () {
            that.UnLockForm.renderLockStatus(window.location.hash);
        }, false);
    }
}
