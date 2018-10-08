const SqlModule = function() {
    this.Define = {
        ADODB: {
            connection: "ADODB.Connection",
            recordset: "ADODB.Recordset",
            command: "ADODB.Command"
        },
        ODBC: {
            driver: "Driver={Microsoft ODBC for Oracle};",
            connect_string: "CONNECTSTRING=ORCL;",
            uid: "UID=",
            pwd: "PWD="
        },
        DIRECT: {
            provider: "Provider=OraOLEDB.Oracle;",
            cid: "CID=GTU_APP",
            protocol: "PROTOCOL=",
            host: "HOST=",
            port: "PORT=",
            sid: "SID=",
            server: "SERVER=",
            uid: "User Id=",
            pwd: "Password="
        },
        DEFAULT_SET: {
            uid: "USERPSSE_X2",
            pwd: "USERPSSE_X2",
            protocol: "TCP",
            host: "192.168.40.206",
            port: "1521",
            sid: "xora",
            server: "DEDICATED"
        },
        ELEMENTS: {
            id: {
                accessPage: "access-page",
                accessLogo: "access-logo",
                accessCommand: "access-command",
                sid: "sid",
                uid: "uid",
                pwd: "pwd",
                sqlHeader: "sql-header",
                sqlMenuContainer: "sql-menu-container",
                headerToolsConfigIcon: "header-tools-config-icon",
                applicationPage: "application-page",
                createUserCard: "create-user-card",
                dataCopyCard: "data-copy-card"
            },
            class: {
                commandLine: "command-line"
            },
            src: {
                cloudgs_dbaas: "assets/cloudgs_dbaas.png"
            },
            style: {
                backgroundColor: "#333",
                headerHeight: "50px",
                transitionDuration: 200
            }
        },
        CAPTIONS: {
            title: "SQL Management",
            sid: "SID",
            uid: "USER ID",
            pwd: "PASSWORD",
            createUser: "Create user",
            dataCopy: "Data copy"
        },
        TYPES: {
            message: {
                required: "required"
            },
            page: {
                access: "access",
                application: "application"
            },
            connect: {
                odbc: "odbc",
                direct: "direct"
            }
        }
    };
    this.state = {
        page: this.Define.TYPES.page.access,
        isConnect: false,
        info: new Object(),
        db: null
    };
};
SqlModule.prototype = {
    initSqlModule: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seSrc = _this.Define.ELEMENTS.src;
        const seStyle = _this.Define.ELEMENTS.style;
        const captions = _this.Define.CAPTIONS;
        const $container = jqById(eId.container);
        $container.css({ "margin-top": seStyle.headerHeight, "background-color": seStyle.backgroundColor });
        const $header = jqNode("header", { id: getHeaderId() });
        const $contents = jqNode("div", { id: getContentsId() });
        const $headerTitle = jqNode("div", { id: eId.headerTitle });
        const $titleIcon = jqNode("i", { class: eIcon.database });
        const $titleIconSpan = jqNode("span", { id: eId.titleIcon }).append($titleIcon);
        const $titleTextSpan = jqNode("span", { id: eId.titleText }).text(captions.title);
        $headerTitle.append($titleIconSpan).append($titleTextSpan);
        const $headerTools = jqNode("div", { id: eId.headerTools });
        const $ellipsisVIconSpan = jqNode("span", { class: classes(eClass.toolsIcon, eClass.iconButton) }).append(jqNode("i", { class: eIcon.ellipsisV }));
        $ellipsisVIconSpan.click(function(e) {
            e.stopPropagation();
            _this.openMenu();
        });
        [$ellipsisVIconSpan].forEach(function(item) { $headerTools.append(item); });
        const $menuContainer = jqNode("div", { id: seId.sqlMenuContainer, class: eClass.menuContainer });
        [$headerTitle, $headerTools, $menuContainer].forEach(function(item) { $header.append(item); });

        const $screen = jqNode("div", { id: seId.accessPage, class: eClass.screen });
        const $logo = jqNode("div").append(jqNode("img", { id: seId.accessLogo, src: seSrc.cloudgs_dbaas }));
        const $command = _this.buildAccessCommand(jqNode("div", { id: seId.accessCommand }));
        $screen.append($logo).append($command);
        $contents.append($screen);
        [$header, $contents].forEach(function(item) { $container.append(item) });

        const titleIconSize = $titleIcon.width();
        const headerToolsSize = $headerTools.width();
        jqById(eId.titleIcon).css({ width: (Math.ceil(titleIconSize) + 2) + "px" });
        jqById(eId.headerTitle).css({ width: "calc(100% - " + Math.ceil(headerToolsSize) + "px)" });

        fadeIn($container);
        return null;
    },
    buildAccessCommand: function($accessCommand){
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const getInput = function(id, ph) {
            const $input = jqNode("input", { type: "text", id: id, placeholder: ph });
            $input.keypress(function(e) {
                var keyCode = e.which || e.keyCode;
                if(keyCode === 13) {
                    _this.onAccess();
                }
            });
            return $input;
        };
        const getButton = function() {
            const $button = jqNode("button").text("ACCESS");
            $button.click(function() {
                _this.onAccess();
            });
            return $button;
        };
        const $sid = jqNode("div", { class: seClass.commandLine }).append(getInput(seId.sid, captions[seId.sid]));
        const $uid = jqNode("div", { class: seClass.commandLine }).append(getInput(seId.uid, captions[seId.uid]));
        const $pwd = jqNode("div", { class: seClass.commandLine }).append(getInput(seId.pwd, captions[seId.pwd]));
        const $confirm = jqNode("div", { class: seClass.commandLine }).append(getButton());
        [$sid, $uid, $pwd, $confirm].forEach(function(item) { $accessCommand.append(item); });
        return $accessCommand;
    },
    setPage: function(type) {
        const _this = this;
        const pageType = _this.Define.TYPES.page;
        const seId = _this.Define.ELEMENTS.id;
        const seSrc = _this.Define.ELEMENTS.src;
        const captions = _this.Define.CAPTIONS;
        const $contents = jqById(getContentsId());
        $contents.empty();
        switch(type) {
            case pageType.access: {
                const $screen = jqNode("div", { id: seId.accessPage, class: eClass.screen });
                const $logo = jqNode("div").append(jqNode("img", { id: seId.accessLogo, src: seSrc.cloudgs_dbaas }));
                const $command = _this.buildAccessCommand(jqNode("div", { id: seId.accessCommand }));
                $screen.append($logo).append($command);
                $contents.append($screen);
                break;
            }
            case pageType.application: {
                const $screen = jqNode("div", { id: seId.applicationPage, class: eClass.screen });
                const $cardContainer = jqNode("div", { class: eClass.cardContainer });
                const buildCard = function(cardInfo) {
                    const $card = jqNode("div", { id: cardInfo.id, class: eClass.card });
                    const $cardTitle = jqNode("div", { class: eClass.cardTitle }).text(cardInfo.title);
                    const $cardContentsContainer = jqNode("div", { class: eClass.cardContentsContainer });
                    const $cardContents = jqNode("div", { class: eClass.cardContents }).text(cardInfo.contents);
                    const $cardActions = jqNode("div", { class: eClass.cardActions });
                    const $openIcon = jqNode("i", { class: eIcon.chevronCircleDown });
                    $openIcon.click(function() {
                        const isOpenned = $card.hasClass("card-contents-openned");
                        if(isOpenned) {
                            $card.removeClass("card-contents-openned");
                        }
                        else {
                            $card.addClass("card-contents-openned");
                        }
                    });
                    $cardContentsContainer.append($cardContents);
                    $cardActions.append($openIcon);
                    $card.append($cardTitle).append($cardContentsContainer).append($cardActions);
                    return $card;
                };
                const cardList = [
                    {
                        id: seId.createUserCard,
                        title: captions.createUser,
                        contents: "create user tool"
                    },
                    {
                        id: seId.dataCopyCard,
                        title: captions.dataCopy,
                        contents: "data copy tool"
                    }
                ];
                cardList.forEach(function(item) {
                    $cardContainer.append(buildCard(item));
                });
                $screen.append($cardContainer);
                $contents.append($screen);
                break;
            }
        }
        _this.state.page = pageType;
        return null;
    },
    transition: function(type) {
        const _this = this;
        const seStyle = _this.Define.ELEMENTS.style;
        const $contents = jqById(getContentsId());
        $contents.css({ opacity: 0 });
        setTimeout(function() {
            _this.setPage(type);
            $contents.css({ opacity: 1 });
        }, seStyle.transitionDuration);
        return null;
    },
    openMenu: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const $container = jqById(eId.container);
        const $menuContainer = jqById(seId.sqlMenuContainer);
        $container.click(function() { $menuContainer.removeClass(eClass.isVisible); });
        $menuContainer.empty();
        const $menu = jqNode("ul", { class: classes(eClass.menu, eClass.menuBottomRight) });
        const itemList = new Array();
        createMenuItem(itemList, eIcon.home, CAPTIONS.home, transitonMenu);
        if(_this.state.isConnect) {
            const onDisconnect = function() { _this.onDisconnect(); }
            createMenuItem(itemList, eIcon.signOut, CAPTIONS.disconnect, onDisconnect);
            createMenuInfo(itemList, _this.state.info);
        }
        itemList.forEach(function(item) { $menu.append(item); });
        $menuContainer.append($menu);
        setTimeout(function() { $menuContainer.addClass(eClass.isVisible); });
    },
    onAccess: function() {
        const _this = this;
        const pageType = _this.Define.TYPES.page;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const sid = _this.getCheckObject(jqById(seId.sid).val(), captions.sid);
        const uid = _this.getCheckObject(jqById(seId.uid).val(), captions.uid);
        const pwd = _this.getCheckObject(jqById(seId.pwd).val(), captions.pwd);
        const result = _this.validation(sid, uid, pwd);
        if(result.error) {
            new Notification().error().open(result.message);
            return false;
        }
        new Loading().on();
        try {
            const connectString = _this.createConnectString(sid.value, uid.value, pwd.value);
            // _this.setConnectObject().open(connectString);
            _this.state.isConnect = true;
            _this.state.info = {
                sid: sid.name + " : " + sid.value,
                uid: uid.name + " : " + uid.value
            };
            _this.transition(pageType.application);
        }
        catch(e) {
            console.log(e);
            new Notification().error().open(e.message);
        }
        finally {
            new Loading().off();
        }
        // new Notification().complete().open("Successfully connected");
    },
    onDisconnect: function() {
        const _this = this;
        const pageType = _this.Define.TYPES.page;
        _this.state.isConnect = false;
        _this.state.info = new Object();
        _this.transition(pageType.access);
    },
    getCheckObject: function(value, name) {
        return {
            value: value,
            name: name
        };
    },
    validation: function() {
        const _this = this;
        const msgTypes = _this.Define.TYPES.message;
        const result = {
            error: false,
            message: null
        };
        const argumentsList = Array.prototype.slice.call(arguments);
        const errorMsg = new Array();
        argumentsList.forEach(function(arg) {
            const value = arg.value;
            const name = arg.name;
            if(!value) {
                result.error = true;
                errorMsg.push(_this.getMessage(msgTypes.required, name));
            }
        });
        if(result.error) {
            result.message = errorMsg.join("<br />");
        }
        return result;
    },
    getMessage: function(type, msg) {
        const _this = this;
        const msgTypes = _this.Define.TYPES.message;
        switch(type) {
            case msgTypes.required: {
                msg = msg + " is required";
                break;
            }
        }
        return msg;
    },
    createConnectString: function(sid, uid, pwd, type) {
        const _this = this;
        const ODBC = _this.Define.ODBC;
        const DIRECT = _this.Define.DIRECT;
        const DEFAULT_SET = _this.Define.DEFAULT_SET;
        const paramType = type ? type : _this.Define.TYPES.connect.direct;
        const connectType = this.Define.TYPES.connect;
        const getConnectString = function(name, value) {
            return name + value + SIGN.sc;
        };
        const getDataSourceString = function(name, value) {
            return SIGN.bs + name + value + SIGN.be;
        };
        let str = "";
        switch(paramType) {
            case connectType.odbc: {
                str += ODBC.driver;
                str += ODBC.connect_string;
                str += getConnectString(ODBC.uid, uid);
                str += getConnectString(ODBC.pwd, pwd);
                break;
            }
            case connectType.direct: {
                str += DIRECT.provider;
                str += "Data Source=(";
                str +=  "DESCRIPTION=";
                str +=   "(CID=GTU_APP)";
                str +=   "(ADDRESS_LIST=(ADDRESS="
                str +=    getDataSourceString(DIRECT.protocol, DEFAULT_SET.protocol);
                str +=    getDataSourceString(DIRECT.host, DEFAULT_SET.host);
                str +=    getDataSourceString(DIRECT.port, DEFAULT_SET.port);
                str +=   "))"
                str +=   "(CONNECT_DATA=";
                str +=    getDataSourceString(DIRECT.sid, sid);
                str +=    getDataSourceString(DIRECT.server, DEFAULT_SET.server);
                str +=   ")";
                str += ");";
                str += getConnectString(DIRECT.uid, uid);
                str += getConnectString(DIRECT.pwd, pwd);
                break;
            }
        }
        return str;
    },
    setConnectObject: function() {
        const _this = this;
        _this.state.db = new ActiveXObject(_this.Define.ADODB.connection);
        return this;
    },
    open: function(connectString) {
        const _this = this;
        const db = _this.state.db;
        console.log(db);
        if(db) {
            db.Open(connectString);
        }
        return null;
    },
    close: function() {
        const _this = this;
        const db = _this.state.db;
        if(db) {
            db.Close();
        }
        return null;
    }
};

const DatabaseService = function (constructor) {
    this.Define = constructor.Define;

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
DatabaseService.prototype = {
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
