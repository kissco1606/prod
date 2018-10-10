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
                dataCopyCard: "data-copy-card",
                policyNumberFrom: "policy-number__from",
                policyNumberTo: "policy-number-to",
                subSid: "sub-sid",
                subUid: "sub-uid",
                subPwd: "sub-pwd"
            },
            class: {
                commandLine: "command-line",
                contentsContainer: "contents-container",
                commandArea: "command-area",
                actionArea: "action-area"
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
            createUser: "Create User",
            dataCopy: "Data Copy",
            exec: "exec",
            subSid: "SID(From)",
            subUid: "UID(From)",
            subPwd: "PWD(From)",
            policyNumberFrom: "Policy Number(From)",
            policyNumberTo: "Policy Number(To)"
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
            },
            command: {
                adCmdUnspecified: -1,
                adCmdText: 1,
                adCmdTable: 2,
                adCmdStoredProc: 4,
                adCmdFile: 256,
                adCmdTableDirect: 512
            }
        }
    };
    this.state = {
        page: this.Define.TYPES.page.access,
        isConnect: false,
        info: new Object(),
        db: null,
        command: null,
        recordSet: null,
        noneQuery: false
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
                const keyCode = e.which || e.keyCode;
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
                    const $cardTitle = jqNode("div", { class: eClass.cardTitle });
                    const $titleIcon = jqNode("span", { class: eClass.cardTitleIcon }).append(jqNode("i", { class: eIcon.wrench }));
                    const $titleText = jqNode("span", { class: eClass.cardTitleText }).text(cardInfo.title);
                    $cardTitle.append($titleIcon).append($titleText);
                    const $cardContentsContainer = jqNode("div", { class: eClass.cardContentsContainer });
                    const $cardContents = jqNode("div", { class: eClass.cardContents }).html(cardInfo.contents);
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
                        contents: _this.buildDataCopyContents()
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
    buildDataCopyContents: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $execButton = jqNode("button").text(upperCase(captions.exec));
        $actionArea.append($execButton);
        $container.append($actionArea);
        const itemList = [
            {
                label: captions.subSid,
                inputType: "input",
                inputId: seId.subSid
            },
            {
                label: captions.subUid,
                inputType: "input",
                inputId: seId.subUid
            },
            {
                label: captions.subPwd,
                inputType: "input",
                inputId: seId.subPwd
            },
            {
                label: captions.policyNumberFrom,
                inputType: "input",
                inputId: seId.policyNumberFrom
            },
            {
                label: captions.policyNumberTo,
                inputType: "textarea",
                inputId: seId.policyNumberTo
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
        });
        $execButton.click(function() {
            _this.execDataCopy();
        });
        return $container;
    },
    execDataCopy: function() {
        const _this = this;
        const loading = new Loading();
        loading.on().then(function() {
            const seId = _this.Define.ELEMENTS.id;
            const captions = _this.Define.CAPTIONS;
            const subSid = _this.getCheckObject(jqById(seId.subSid).val(), captions.subSid);
            const subUid = _this.getCheckObject(jqById(seId.subUid).val(), captions.subUid);
            const subPwd = _this.getCheckObject(jqById(seId.subPwd).val(), captions.subPwd);
            const policyNumberFrom = _this.getCheckObject(jqById(seId.policyNumberFrom).val(), captions.policyNumberFrom);
            const policyNumberTo = _this.getCheckObject(jqById(seId.policyNumberTo).val(), captions.policyNumberTo);
            const result = _this.validation(subSid, subUid, subPwd, policyNumberFrom, policyNumberTo);
            if(result.error) {
                new Notification().error().open(result.message);
                loading.off();
                return false;
            }
        }).catch(function(e) {
            console.log(e);
            new Notification().error().open(e.message);
            loading.off();
        });
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
        const loading = new Loading();
        loading.on().then(function() {
            const pageType = _this.Define.TYPES.page;
            const seId = _this.Define.ELEMENTS.id;
            const captions = _this.Define.CAPTIONS;
            const sid = _this.getCheckObject(jqById(seId.sid).val(), captions.sid);
            const uid = _this.getCheckObject(jqById(seId.uid).val(), captions.uid);
            const pwd = _this.getCheckObject(jqById(seId.pwd).val(), captions.pwd);
            const result = _this.validation(sid, uid, pwd);
            if(result.error) {
                new Notification().error().open(result.message);
                loading.off();
                return false;
            }
            const connectString = _this.createConnectString(sid.value, uid.value, pwd.value);
            // _this.setConnectObject().open(connectString);
            _this.state.isConnect = true;
            _this.state.info = {
                sid: sid.name + " : " + sid.value,
                uid: uid.name + " : " + uid.value
            };
            _this.transition(pageType.application);
            loading.off();
        }).catch(function(e) {
            console.log(e);
            new Notification().error().open(e.message);
            loading.off();
        });
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
    },
    dbCommand: function(connection) {
        const _this = this;
        const commandType = _this.Define.TYPES.command;
        _this.state.command = new ActiveXObject(_this.Define.ADODB.command);
        _this.state.command.ActiveConnection = connection;
        _this.state.command.CommandType = commandType.adCmdText;
        _this.state.command.Prepared = true;
        return this;
    },
    select: function(query) {
        const _this = this;
        if(_this.state.command) {
            _this.state.command.CommandText = query;
            _this.state.noneQuery = false;
        }
        return this;
    },
    insert: function(query) {
        const _this = this;
        if(_this.state.command) {
            _this.state.command.CommandText = query;
            _this.state.noneQuery = true;
        }
        return this;
    },
    update: function() {
        const _this = this;
        if(_this.state.command) {
            _this.state.command.CommandText = query;
            _this.state.noneQuery = true;
        }
        return this;
    },
    delete: function() {
        const _this = this;
        if(_this.state.command) {
            _this.state.command.CommandText = query;
            _this.state.noneQuery = true;
        }
        return this;
    },
    setParameter: function() {
        const _this = this;
        return this;
    },
    execute: function() {
        const _this = this;
        const noneQuery = _this.state.noneQuery;
        if(_this.state.command) {
            _this.state.recordSet = _this.state.command.Execute();
        }
        return this;
    },
    getData: function() {
        const _this = this;
        const rs = _this.state.recordSet;
        const dataSet = {
            error: true,
            count: 0,
            name: new Array(),
            data: new Array(),
            type: new Array()
        };
        if(rs) {
            try {
                for(let i = 0; i < rs.Fields.Count; i++) {
                    dataSet.name.push(rs.Fields.Item(i).Name);
                }
                while(!rs.EOF) {
                    const valueStack = new Array();
                    const typeStack = new Array();
                    for(let i = 0; i < dataSet.name.length; i++) {
                        const item = rs.Fields.Item(i);
                        valueStack.push(item.Value);
                        typeStack.push(item.Type);
                    }
                    dataSet.data.push(valueStack);
                    dataSet.type.push(typeStack);
                    dataSet.count += 1;
                    rs.MoveNext();
                }
                rs.Close();
                dataSet.error = false;
            }
            catch(e) {}
        }
        return dataSet;
    },
    commit: function() {
        return this;
    },
    rollback: function() {
        return this;
    },
    recordSetClose: function() {
        return this;
    }
};
