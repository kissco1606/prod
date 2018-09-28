const DB = function () {
    this.driver = null;
    this.connection = null;
}
DB.prototype = {
    setDriver: function(driver) {
        this.driver = new ActiveXObject(D_ADODB);
        return this;
    },   
    setConnection: function(uid, pwd) {
        let connection = "";
        if(uid && pwd) {
            connection += D_DRIVER;
            connection += D_CONNECTSTRING;
            connection += D_UID + uid + SC;
            connection += D_PWD + pwd + SC;
        }
        this.connection = connection;
        console.log(this.connection);
        return this;
    },
    open: function() {
        if(this.driver && this.connection) {
            try {
                this.driver.Open(this.connection);
            }
            catch(e) {
                console.log("Cannot connects to database");
            }
        }
        return this;
    },
    execute: function(query) {
        if(this.driver && query) {
            try {
                this.driver.Execute(query);
            }
            catch(e) {
                console.log("Cannot executes query");
            }
        }
        return this;
    },
    close: function() {
        if(this.driver) {
            this.driver.Close();
        }
        return this;
    }
};