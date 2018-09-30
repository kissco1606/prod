const DB = function () {
    this.conObj = null;
    this.connection = null;
    this.recordSet = null;
}
DB.prototype = {
    setConObj: function() {
        this.conObj = new ActiveXObject(ADODB.connection);
        return this;
    },   
    setConnection: function(type) {
        const ccs = new CreateConnectString();
        switch(type) {
            case ct.odbc: {
                this.connection = ccs.getOdbc(def.uid, def.pwd);
                break;
            }
            case ct.direct: {
                this.connection = ccs.getDirect(def.sid, def.uid, def.pwd);
                break;
            }
        }
        console.log(this.connection);
        return this;
    },
    open: function() {
        if(this.conObj && this.connection) {
            try {
                this.conObj.Open(this.connection);
            }
            catch(e) {
                console.log("Cannot connects to database");
            }
        }
        return this;
    },
    execute: function(query) {
        if(this.conObj && query) {
            try {
                this.conObj.Execute(query);
            }
            catch(e) {
                console.log("Cannot executes query");
            }
        }
        return this;
    },
    close: function() {
        if(this.conObj) {
            this.conObj.Close();
        }
        return this;
    }
};

const CreateConnectString = function() {
};
CreateConnectString.prototype = {
    getOdbc: function(uid, pwd) {
        let str = "";
        str += ODBC.driver;
        str += ODBC.connect_string;
        str += getConnectString(ODBC.uid, uid);
        str += getConnectString(ODBC.pwd, pwd);
        return str;
    },
    getDirect: function(sid, id, pw) {
        let str = "";
        str += DIRECT.provider;
        str += "Data Source=(";
        str +=  "DESCRIPTION=";
        str +=   "(CID=GTU_APP)";
        str +=   "(ADDRESS_LIST=(ADDRESS="
        str +=    getDataSourceString(DIRECT.protocol, def.protocol);
        str +=    getDataSourceString(DIRECT.host, def.host);
        str +=    getDataSourceString(DIRECT.port, def.port);
        str +=   "))"
        str +=   "(CONNECT_DATA=";
        str +=    getDataSourceString(DIRECT.sid, sid);
        str +=    getDataSourceString(DIRECT.server, def.server);
        str +=   ")";
        str += ");";
        str += getConnectString(DIRECT.id, id);
        str += getConnectString(DIRECT.pw, pw);
        return str;
    }
};

function getConnectString(name, value) {
    return name + value + SC;
};

function getDataSourceString(name, value) {
    return BS + name + value + BE;
};