const DB = function () {
    this.conObj = null;
    this.connection = null;
    this.recordSet = null;
    this.command = null;
    this.params = {
    	sid: def.sid,
    	uid: def.uid,
    	pwd: def.pwd
    };
};
DB.prototype = {
    setConObj: function() {
        this.conObj = new ActiveXObject(ADODB.connection);
        return this;
    },
    setParameter: function(sid, uid, pwd) {
    	if(sid) this.params.sid = sid ? sid : null;
    	if(uid) this.params.uid = uid ? uid : null;
    	if(pwd) this.params.pwd = pwd ? pwd : null;
    },
    setConnection: function(type) {
        const ccs = new CreateConnectString();
        const params = this.params;
        switch(type) {
            case ct.odbc: {
                this.connection = ccs.getOdbc(params.uid, params.pwd);
                break;
            }
            case ct.direct: {
                this.connection = ccs.getDirect(params.sid, params.uid, params.pwd);
                break;
            }
        }
        return this;
    },
    open: function() {
    	const conObj = this.conObj;
    	const connection = this.connection;
    	return new Promise(function(resolve, reject) {
    		if(conObj && connection) {
            	try {
            		conObj.Open(connection);
            		return resolve();
            	}
            	catch(e) {
                	return reject(e);
            	}
        	}
    	});
    },
    setCommand: function() {
    	try {
    		this.command = new ActiveXObject(ADODB.command);
    		this.command.ActiveConnection = this.conObj;
    		this.command.CommandType = 1; // text
    		this.command.Prepared = true;
    		this.command.CommandText = "SELECT * FROM ST_SyoriCTL WHERE S_SYONO = '10000009080'";
    		// this.command.Parameters(0).Value = '';
    		this.recordSet = this.command.Execute();
    		console.log(this.recordSet.Fields.Count);
    		console.log(this.recordSet.Fields(0).Value);
    	}
    	catch(e) {
    	}
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

function jqNode(tag, option) {
	return $("<" + tag + " />", option);
};

function jqById(id) {
	return $("#" + id);
};

function jqByClass(className) {
	return $("." + className);
};

function classes() {
	const classes = new Array(); 
	const argumentsList = Array.prototype.slice.call(arguments); 
	argumentsList.forEach(function(item) { 
		classes.push(item); 
	});
	const size = classes.length; 
	return size >= 1 ? classes.join(WHITE_SPACE) : '';
};
