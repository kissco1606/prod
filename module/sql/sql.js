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
            protocol: "TCP",
            host: "192.168.40.206",
            port: "1521",
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
                queryCommandCard: "query-command-card",
                dataCopyCard: "data-copy-card",
                createUserCard: "create-user-card",
                policyNumberFrom: "policy-number__from",
                policyNumberTo: "policy-number-to",
                subSid: "sub-sid",
                subUid: "sub-uid",
                subPwd: "sub-pwd",
                optionContainerDataCopy: "option-container__data-copy",
                userCode: "user-code",
                userName: "user-name",
                queryEditor: "query-editor",
                queryGridTabs: "query-grid-tabs",
                queryGridContents: "query-grid-contents",
                tab: "tab",
                queryTabs: "query-tabs", 
                dataGrid: "data-grid",
                queryTimer: "query-timer"
            },
            class: {
                commandLine: "command-line",
                contentsContainer: "contents-container",
                commandArea: "command-area",
                actionArea: "action-area",
                optionCommandArea: "option-command-area",
                optionRemoveButton: "option-remove-button",
                commandLineRow: "command-line-row",
                removeRow: "remove-row",
                queryEditorTextInput: "ace_text-input",
                queryGridContainer: "query-grid-container",
                dataGrid: "data-grid"
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
            queryCommand: "Query Command",
            dataCopy: "Data Copy",
            createUser: "Create User",
            access: "access",
            exec: "exec",
            cancel: "cancel",
            tab: "tab",
            console: "console",
            check: "check",
            extract: "extract",
            import: "import",
            export: "export",
            insert: "insert",
            commit: "commit",
            rollback: "rollback",
            backup: "backup",
            option: "option",
            reset: "reset",
            log: "log",
            subSid: "SID(From)",
            subUid: "UID(From)",
            subPwd: "PWD(From)",
            policyNumberFrom: "Policy Number(From)",
            policyNumberTo: "Policy Number(To)",
            userCode: "User Code",
            userName: "User Name",
            create: "create",
            delete: "delete"
        },
        TYPES: {
            message: {
                required: "required",
                matchWhitespace: "match-whitespace"
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
            },
            phase: {
                queryCommand: {
                    executing: "executing"
                },
                dataCopy: {
                    insert: "insert",
                    commit: "commit",
                    complete: "complete"
                },
                createUser: {
                    commit: "commit",
                    complete: "complete"
                }
            },
            editor: {
                mode: {
                    sql: "ace/mode/sqlserver"
                },
                theme: {
                    monokai: "ace/theme/monokai",
                    terminal: "ace/theme/terminal",
                    twilight: "ace/theme/twilight"
                }
            },
            path: {
                export: "module/sql/export.json",
                worker: "module/sql/actions/worker.js"
            },
            action: {
                commit: "commit",
                delete: "delete"
            },
            worker: {
                onAccess: "onAccess",

            }
        },
        MESSAGES: {
            only_exec_select_query: "Can be excuted only [SELECT] query"
        }
    };
    this.state = {
        page: this.Define.TYPES.page.access,
        isConnect: false,
        info: new Object(),
        db: null,
        subDb: null,
        isSubConnection: false,
        command: null,
        recordSet: null,
        noneQuery: false,
        lock: false,
        queryCommand: {
            ui: new Object(),
            phase: null,
            timer: null,
            element: null
        },
        dataCopy: new Object(),
        createUser: new Object(),
        worker: null
    };
    this.export = new Object();
};
SqlModule.prototype = {
    initSqlModule: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seSrc = _this.Define.ELEMENTS.src;
        const seStyle = _this.Define.ELEMENTS.style;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
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

        getJson(types.path.export).then(function(data) {
            _this.export = data;
            fadeIn($container);
        }).catch(function(e) {
            $container.empty();
            console.log(e);
            new Notification().error().open("Failed init module");
        });
        return this;
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
            const menuInfo = { sid: _this.state.info.sid, uid: _this.state.info.uid };
            const onDisconnect = function() { _this.onDisconnect(); };
            createMenuItem(itemList, eIcon.signOut, CAPTIONS.disconnect, onDisconnect);
            createMenuInfo(itemList, menuInfo);
        }
        itemList.forEach(function(item) { $menu.append(item); });
        $menuContainer.append($menu);
        setTimeout(function() { $menuContainer.addClass(eClass.isVisible); });
        return null;
    },
    onAccess: function() {
        let _this = this;
        const types = _this.Define.TYPES;
        const loading = new Loading();
        loading.on().then(function() {
            const test = function() {
                importScripts("external.js");
                postMessage("ok worker");
            };
            const response = "(" + test.toString() + ")();";
            var worker = new Worker(types.path.worker);
            worker.onmessage = function(e) {
                console.log(e.data);
            }
            worker.postMessage(response);
            
            // const pageType = _this.Define.TYPES.page;
            // const seId = _this.Define.ELEMENTS.id;
            // const captions = _this.Define.CAPTIONS;
            // const sid = _this.getCheckObject(jqById(seId.sid).val(), captions.sid);
            // const uid = _this.getCheckObject(jqById(seId.uid).val(), captions.uid);
            // const pwd = _this.getCheckObject(jqById(seId.pwd).val(), captions.pwd);
            // const result = _this.validation(sid, uid, pwd);
            // if(result.error) {
            //     new Notification().error().open(result.message);
            //     loading.off();
            //     return false;
            // }
            // const thread = new Worker(types.path.worker);
            // thread.onmessage = function(e) {
            //     // _this = e.data;
            //     // _this.state.isConnect = true;
            //     // _this.state.info = {
            //     //     sid: sid,
            //     //     uid: uid,
            //     //     pwd: pwd
            //     // };
            //     // _this.transition(pageType.application);
            //     // loading.off();
            //     console.log(e.data);
            // };
            // thread.onerror = function(e) {
            //     new Notification().error().open(e.message);
            //     loading.off();
            // };
            // const connectString = _this.createConnectString(sid.value, uid.value, pwd.value);
            // const messageObj = threadMessage(_this, types.worker.onAccess, { connectString: connectString });
            // thread.postMessage(messageObj);
            // const connectString = _this.createConnectString(sid.value, uid.value, pwd.value);
            // _this.mainConnect().setConnectObject().open(connectString);
            // _this.state.isConnect = true;
            // _this.state.info = {
            //     sid: sid,
            //     uid: uid,
            //     pwd: pwd
            // };
            // _this.transition(pageType.application);
            // loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    onDisconnect: function() {
        const _this = this;
        const pageType = _this.Define.TYPES.page;
        _this.state.isConnect = false;
        _this.state.info = new Object();
        _this.transition(pageType.access);
        return null;
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
            else if(value.match(new RegExp(SIGN.ws, "g"))) {
                result.error = true;
                errorMsg.push(_this.getMessage(msgTypes.matchWhitespace, name));
            }
        });
        if(result.error) {
            result.message = errorMsg.join(SIGN.br);
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
            case msgTypes.matchWhitespace: {
                msg = msg + " : whitespace is not allowed";
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
    mainConnect: function() {
        this.state.isSubConnection = false;
        return this;
    },
    subConnect: function() {
        this.state.isSubConnection = true;
        return this;
    },
    setConnectObject: function() {
        const isSubConnection = this.state.isSubConnection;
        if(!isSubConnection) {
            this.state.db = new ActiveXObject(this.Define.ADODB.connection);
        }
        else {
            this.state.subDb = new ActiveXObject(this.Define.ADODB.connection);
        }
        return this;
    },
    open: function(connectString) {
        const isSubConnection = this.state.isSubConnection;
        const db = !isSubConnection ? this.state.db : this.state.subDb;
        if(db) {
            db.Open(connectString);
        }
        return this;
    },
    subClose: function() {
        if(this.state.subDb) {
            this.state.subDb.Close();
        }
        return this;
    },
    close: function() {
        if(this.state.db) {
            if(this.state.lock) {
                this.rollback();
            }
            this.state.db.Close();
        }
        this.state.lock = false;
        return this;
    },
    redirect: function() {
        const _this = this;
        _this.close();
        if(_this.state.db) {
            const info = _this.state.info;
            const connectString = _this.createConnectString(info.sid.value, info.uid.value, info.pwd.value);
            _this.mainConnect().setConnectObject().open(connectString);
        }
        return this;
    },
    dbCommand: function(connection) {
        if(connection) {
            const commandType = this.Define.TYPES.command;
            this.state.command = new ActiveXObject(this.Define.ADODB.command);
            this.state.command.ActiveConnection = connection;
            this.state.command.CommandType = commandType.adCmdText;
            this.state.command.Prepared = true;
        }
        return this;
    },
    setQuery: function(query, isNoneQuery) {
        if(this.state.command) {
            this.state.command.CommandText = query;
            this.state.noneQuery = isNoneQuery;
        }
        return this;
    },
    setParameter: function() {
        const _this = this;
        const argumentsList = Array.prototype.slice.call(arguments);
        _this.state.command.Parameters.Refresh();
        argumentsList.forEach(function(item, i) {
            _this.state.command.Parameters(i).Value = item;
        });
        return this;
    },
    execute: function() {
        this.state.recordSet = this.state.command.Execute();
        return this;
    },
    cancel: function() {
        if(this.state.command) {
            this.state.command.Cancel();
        }
        return this;
    },
    getData: function() {
        const rs = this.state.recordSet;
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
    transaction: function() {
        const _this = this;
        const state = {
            error: false,
            message: null
        };
        if(_this.state.lock) {
            const message = "Locking by other transaction";
            state.error = true;
            state.message = message;
            return state;
        }
        if(_this.state.db) {
            _this.state.db.BeginTrans();
            _this.state.lock = true;
        }
        return state;
    },
    commit: function() {
        this.state.db.CommitTrans();
        this.state.lock = false;
        return this;
    },
    rollback: function() {
        this.state.db.RollbackTrans();
        this.state.lock = false;
        return this;
    },
    recordSetClose: function() {
        return this;
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
                        id: seId.queryCommandCard,
                        title: captions.queryCommand,
                        contents: _this.buildQueryCommand()
                    },
                    {
                        id: seId.dataCopyCard,
                        title: captions.dataCopy,
                        contents: _this.buildDataCopyContents()
                    },
                    {
                        id: seId.createUserCard,
                        title: captions.createUser,
                        contents: _this.buildCreateUserContents()
                    }
                ];
                cardList.forEach(function(item) {
                    $cardContainer.append(buildCard(item));
                });
                $screen.append($cardContainer);
                $contents.append($screen);
                _this.renderQueryEditor();
                break;
            }
        }
        _this.state.page = pageType;
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
            const $button = jqNode("button").text(upperCase(captions.access));
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
    buildQueryCommand: function() {
        const _this = this;
        const qcState = _this.state.queryCommand;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $timer = jqNode("div", { id: seId.queryTimer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $execButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.exec));
        const $cancelButton = jqNode("button", { class: classes(eClass.buttonColorOrange, eClass.buttonDisable) }).text(upperCase(captions.cancel));
        $cancelButton.prop("disabled", true);
        [$execButton, $cancelButton].forEach(function(item) { $actionArea.append(item); });
        const $queryEditor = jqNode("div", { id: seId.queryEditor });
        const $queryGridContainer = jqNode("div", { class: seClass.queryGridContainer });
        const $queryGridTabs = jqNode("div", { id: seId.queryGridTabs });
        const $queryGridContents = jqNode("div", { id: seId.queryGridContents });
        [$queryGridTabs, $queryGridContents].forEach(function(item) { $queryGridContainer.append(item); });
        [$timer, $actionArea, $queryEditor, $queryGridContainer].forEach(function(item) { $container.append(item); });
        $execButton.click(function() {
            const editor = _this.state.queryEditor;
            if(editor) {
                const selection = editor.getSession().doc.getTextRange(editor.selection.getRange());
                _this.execQuery(selection);
            }
        });
        $cancelButton.click(function() {
            if(!qcState.phase) return false;
            _this.cancel();
            _this.actionControllerQueryCommand(null);
        });
        qcState.element = $cancelButton;
        return $container;
    },
    renderQueryEditor: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const editorTypes = _this.Define.TYPES.editor;
        try {
            const editor = ace.edit(seId.queryEditor);
            _this.state.queryEditor = editor;
            editor.setShowPrintMargin(false);
            editor.getSession().setMode(editorTypes.mode.sql);
            editor.setTheme(editorTypes.theme.monokai);
            editor.setFontSize(15);
            editor.getSession().setUseWrapMode(false);
            editor.commands.addCommand({
                name: "exec_key_event",
                exec: function() {
                    const selection = editor.getSession().doc.getTextRange(editor.selection.getRange());
                    _this.execQuery(selection);
                },
                bindKey: { mac: "cmd-e", win: "ctrl-e" }
            });
        }
        catch(e) {
            console.log(e);
        }
        return null;
    },
    actionControllerQueryCommand: function(phase) {
        const _this = this;
        const phaseType = _this.Define.TYPES.phase.queryCommand;
        const qcState = _this.state.queryCommand;
        const seId = _this.Define.ELEMENTS.id;
        const $timer = jqById(seId.queryTimer);
        switch(phase) {
            case phaseType.executing: {
                const getTimerView = function(time) {
                    return concatString("Elapsed time : ", time, "sec");
                };
                qcState.element.removeClass(eClass.buttonDisable);
                qcState.element.prop("disabled", false);
                qcState.phase = phase;
                let queryTimeCounter = 0;
                $timer.text(getTimerView(queryTimeCounter));
                qcState.timer = setInterval(function() {
                    queryTimeCounter += 1;
                    const milisec = (queryTimeCounter / 10).toFixed(1);
                    $timer.text(getTimerView(milisec));
                }, 100);
                break;
            }
            default: {
                setTimeout(function() {
                    qcState.element.addClass(eClass.buttonDisable);
                    qcState.element.prop("disabled", true);
                    qcState.phase = null;
                    clearInterval(qcState.timer);
                });
                break;
            }
        }
        return null;
    },
    clearQueryCommandUI: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const qcState = _this.state.queryCommand;
        const $tabs = jqById(seId.queryGridTabs);
        const $contents = jqById(seId.queryGridContents);
        if(w2ui[seId.queryTabs]) {
            w2ui[seId.queryTabs].destroy();
        }
        qcState.ui.gridIdList.forEach(function(gridId) {
            if(w2ui[gridId]) {
                w2ui[gridId].destroy();
            }
        });
        $tabs.empty();
        $contents.empty();
        _this.state.queryCommand.ui = new Object();
        return null;
    },
    execQuery: function(selection) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const messages = _this.Define.MESSAGES;
        const qcState = _this.state.queryCommand;
        if(isVoid(selection)) return false;
        try {
            const exceptionRule = new RegExp("(((INSERT INTO))|((UPDATE).+?(SET))|((DELETE FROM))|(CREATE TABLE)|(DROP TABLE)|(TRUNCATE TABLE))", "gi");
            if(selection.match(exceptionRule)) {
                new Notification().error().open(messages.only_exec_select_query);
                return false;
            }
            const queryStack = selection.split(SIGN.sc).filter(function(item) {
                return item;
            }).map(function(item) {
                return item.trim().replace(new RegExp("\nSELECT", "gi"), "SELECT");
            });
            const $tabs = jqById(seId.queryGridTabs);
            const $contents = jqById(seId.queryGridContents);
            if(!isVoid(qcState.ui)) {
                _this.clearQueryCommandUI();
            }
            const uiTabIdList = new Array();
            const uiGridIdList = new Array();
            const tabsStack = new Array();
            const mapping = new Object();
            const getTabId = function(idx) {
                return concatString(seId.tab, idx);
            };
            const getGridId = function(idx) {
                return concatString(seId.dataGrid, idx);
            };
            const createTabs = function(idx) {
                const tabId = getTabId(idx);
                uiTabIdList.push(tabId);
                return {
                    id: tabId,
                    text: concatString(upperCase(captions.console, 0), idx),
                    closable: true
                };
            };
            const createDataGrid = function(idx, name, data) {
                const option = {
                    header: false,
                    toolbar: false,
                    footer: false,
                    lineNumbers: true,
                    selectColumn: false,
                    expandColumn: false
                };
                const fieldStack = new Array();
                const columns = name.map(function(item) {
                    const field = item.replace(new RegExp(SIGN.ws, "g"), SIGN.none);
                    fieldStack.push(field);
                    return {
                        field: field,
                        caption: item,
                        sortable:true
                    };
                });
                const recordStack = new Array();
                data.forEach(function(row, i) {
                    const recordObj = new Object();
                    recordObj.recid = i + 1;
                    row.forEach(function(col, i) {
                        recordObj[fieldStack[i]] = col;
                    });
                    recordStack.push(recordObj);
                });
                const gridId = getGridId(idx);
                uiGridIdList.push(gridId);
                return {
                    name: gridId,
                    header: SIGN.none,
                    show: option,
                    columns: columns,
                    records: recordStack
                };
            };
            const phaseType = _this.Define.TYPES.phase.queryCommand;
            _this.actionControllerQueryCommand(phaseType.executing);
            queryStack.forEach(function(query, i, a) {
                const idx = i + 1;
                const dataSet = _this.dbCommand(_this.state.db).setQuery(query).execute().getData();
                tabsStack.push(createTabs(idx));
                const gridId = getGridId(idx);
                const $grid = jqNode("div", { id: gridId, style: "width: 100%; height: 300px;" });
                $contents.append($grid);
                mapping[getTabId(idx)] = $grid;
                const dataGrid = createDataGrid(idx, dataSet.name, dataSet.data);
                $grid.w2grid(dataGrid);
                if(idx < a.length) {
                    $grid.hide();
                }
            });
            $tabs.w2tabs({
                name: seId.queryTabs,
                active: tabsStack[tabsStack.length - 1].id,
                tabs: tabsStack,
                onClick: function(e) {
                    const tabId = e.target;
                    Object.keys(mapping).forEach(function(key, i) {
                        const idx = i + 1;
                        const $iGrid = mapping[key];
                        if(tabId === key) {
                            $iGrid.show();
                            w2ui[getGridId(idx)].reload();
                        }
                        else {
                            $iGrid.hide();
                        }
                    });
                },
                onClose: function(e) {
                    const removeTab = e.target;
                    const tabUI = w2ui[seId.queryTabs];
                    const activeTab = tabUI.active;
                    const tabs = qcState.ui.tabIdList;
                    tabs.splice(tabs.indexOf(removeTab), 1);
                    if(tabs.length >= 1) {
                        if(activeTab === removeTab) {
                            const lastTab = tabs[tabs.length - 1];
                            tabUI.select(lastTab);
                            tabUI.click(lastTab);
                        }
                    }
                    else {
                        _this.clearQueryCommandUI();
                    }
                }
            });
            qcState.ui.tabIdList = uiTabIdList;
            qcState.ui.gridIdList = uiGridIdList;
            _this.actionControllerQueryCommand(null);
        }
        catch(e) {
            console.log(e);
            new Notification().error().open(e.message);
            _this.actionControllerQueryCommand(null);
        }
        return null;
    },
    buildDataCopyContents: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $checkButton = jqNode("button", { class: eClass.buttonColorBrown }).text(upperCase(captions.check));
        const $extractButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.extract));
        const $importButton = jqNode("button", { class: eClass.buttonColorCyan }).text(upperCase(captions.import));
        [$checkButton, $extractButton, $importButton].forEach(function(item) { $actionArea.append(item); });
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
        $checkButton.click(function() {
            _this.checkDataCopy();
        });
        $extractButton.click(function() {
            _this.extractDataCopy();
        });
        $importButton.click(function() {
            _this.importDataCopy();
        });
        return $container;
    },
    buildOptionContents: function(optionData) {
        const _this = this;
        const dataCopyState = _this.state.dataCopy;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const $container = jqNode("div", { id: seId.optionContainerDataCopy });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $addButton = jqNode("button").append(jqNode("i", { class: eIcon.plus }));
        $addButton.click(function() {
            $commandArea.append(createCommandLine());
        });
        $actionArea.append($addButton);
        const $commandArea = jqNode("div", { class: seClass.optionCommandArea });
        const createCommandLine = function(table, script) {
            const $commandLine = jqNode("div", { class: seClass.commandLine });
            const $removeRow = jqNode("div", { class: classes(seClass.commandLineRow, seClass.removeRow) });
            const $removeButton = jqNode("button", { class: seClass.optionRemoveButton }).append(jqNode("i", { class: eIcon.trash }))
            $removeRow.append($removeButton);
            const $inputRow = jqNode("div", { class: seClass.commandLineRow });
            const $inputLabel = jqNode("label").text("Table");
            const $input = jqNode("input", { type: "text" });
            const $textareaRow = jqNode("div", { class: seClass.commandLineRow });
            const $textareaLabel = jqNode("label").text("Script");
            const placeholder = "@column\nvalue1\nvalue2";
            const $textarea = jqNode("textarea", { placeholder: placeholder });
            if(table && script) {
                $input.val(table);
                $textarea.val(script);
            }
            [$inputLabel, $input].forEach(function(item) {
                $inputRow.append(item);
            });
            [$textareaLabel, $textarea].forEach(function(item) {
                $textareaRow.append(item);
            });
            [$removeRow, $inputRow, $textareaRow].forEach(function(item) {
                $commandLine.append(item);
            });
            $removeButton.click(function() {
                $commandLine.remove();
            });
            return $commandLine;
        };
        const data = optionData ? optionData : dataCopyState.option;
        if(data) {
            data.forEach(function(item) {
                $commandArea.append(createCommandLine(item.table, item.script));
            });
        }
        $container.append($actionArea).append($commandArea);
        return $container;
    },
    actionControllerDataCopy: function(phase) {
        const _this = this;
        const phaseType = _this.Define.TYPES.phase.dataCopy;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const $card = jqById(seId.dataCopyCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        switch(phase) {
            case phaseType.insert: {
                const $insertButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.insert));
                const $optionButton = jqNode("button", { class: eClass.buttonColorEnergized }).text(upperCase(captions.option));
                const $exportButton = jqNode("button", { class: eClass.buttonColorCalm }).text(upperCase(captions.export));
                const $backupButton = jqNode("button", { class: eClass.buttonColorRoyal }).text(upperCase(captions.backup));
                const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
                $actionArea.empty();
                [$insertButton, $optionButton, $exportButton, $backupButton, $resetButton].forEach(function(item) {
                    $actionArea.append(item);
                });
                $insertButton.click(function() {
                    _this.insertDataCopy();
                });
                $optionButton.click(function() {
                    _this.openOptionDataCopy();
                });
                $exportButton.click(function() {
                    _this.exportToExcelDataCopy();
                });
                $backupButton.click(function() {
                    _this.backupDataCopy();
                });
                $resetButton.click(function() {
                    _this.redirect();
                    _this.state.dataCopy = new Object();
                    $cardContents.html(_this.buildDataCopyContents());
                });
                break;
            }
            case phaseType.commit: {
                const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
                const $rollbackButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.rollback));
                const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
                const $exportButton = jqNode("button", { class: eClass.buttonColorCalm }).text(upperCase(captions.export));
                const $backupButton = jqNode("button", { class: eClass.buttonColorRoyal }).text(upperCase(captions.backup));
                const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
                $actionArea.empty();
                [$commitButton, $rollbackButton, $logButton, $exportButton, $backupButton, $resetButton].forEach(function(item) {
                    $actionArea.append(item);
                });
                $commitButton.click(function() {
                    _this.commit().redirect();
                    const message = "Data copy successfully";
                    new Notification().complete().open(message);
                    _this.actionControllerDataCopy(phaseType.complete);
                });
                $rollbackButton.click(function() {
                    _this.redirect().actionControllerDataCopy(phaseType.insert);
                });
                $logButton.click(function() {
                    _this.downloadLogDataCopy();
                });
                $exportButton.click(function() {
                    _this.exportToExcelDataCopy();
                });
                $backupButton.click(function() {
                    _this.backupDataCopy();
                });
                $resetButton.click(function() {
                    _this.redirect();
                    _this.state.dataCopy = new Object();
                    $cardContents.html(_this.buildDataCopyContents());
                });
                break;
            }
            case phaseType.complete: {
                const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
                const $exportButton = jqNode("button", { class: eClass.buttonColorCalm }).text(upperCase(captions.export));
                const $backupButton = jqNode("button", { class: eClass.buttonColorRoyal }).text(upperCase(captions.backup));
                const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
                $actionArea.empty();
                [$logButton, $exportButton, $backupButton, $resetButton].forEach(function(item) {
                    $actionArea.append(item);
                });
                $logButton.click(function() {
                    _this.downloadLogDataCopy();
                });
                $exportButton.click(function() {
                    _this.exportToExcelDataCopy();
                });
                $backupButton.click(function() {
                    _this.backupDataCopy();
                });
                $resetButton.click(function() {
                    _this.redirect();
                    _this.state.dataCopy = new Object();
                    $cardContents.html(_this.buildDataCopyContents());
                });
                break;
            }
        }
        return null;
    },
    backupDataCopy: function() {
        const _this = this;
        const extractedData = _this.state.dataCopy.extractedData;
        const key = Object.keys(extractedData)[0];
        const fileDefine = TYPES.file;
        const parts = JSON.stringify(extractedData);
        const fileName = concatString(["Backup", key, getFileStamp()].join("_"), fileDefine.extension.txt);
        const mime = TYPES.file.mime.TEXT_UTF8;
        saveAsFile(parts, mime, fileName);
        return null;
    },
    openOptionDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const optionContents = _this.buildOptionContents();
        const option = { "min-width": "400px", "max-height": "530px" };
        const callback = function(dialogClose) {
            _this.saveOptionDataCopy(dialogClose);
        };
        const $export = jqNode("button").text(upperCase(captions.export));
        const $import = jqNode("button").text(upperCase(captions.import));
        $export.click(function() {
            const fileData = _this.saveOptionDataCopy();
            if(fileData) {
                if(isVoid(fileData.data)) {
                    new Notification().error().open(MESSAGES.nothing_data);
                    return false;
                }
                saveAsFile(JSON.stringify(fileData.data), TYPES.file.mime.TEXT_UTF8, concatString("OptionData_", getFileStamp(), TYPES.file.extension.txt));
            }
        });
        $import.click(function() {
            const onReadFile = function(data) {
                try {
                    const parsedData = JSON.parse(data);
                    const structureCheck = function() {
                        let isCorrect = true;
                        parsedData.some(function(item) {
                            if(!(!isVoid(item.table) && typeIs(item.table).string) || !(!isVoid(item.script) && typeIs(item.script).string)) {
                                isCorrect = false;
                                return true;
                            }
                        });
                        return isCorrect;
                    };
                    if(parsedData.length >= 1 && structureCheck()) {
                        const $container = jqById(seId.optionContainerDataCopy).parent();
                        $container.empty().append(_this.buildOptionContents(parsedData));
                    }
                    else {
                        new Notification().error().open(MESSAGES.incorrect_data);
                    }
                }
                catch(e) {
                    new Notification().error().open(MESSAGES.incorrect_data);
                }
            };
            new FileController().setListener(eId.fileListener).allowedExtensions([TYPES.file.mime.TEXT]).access(onReadFile);
        });
        new Dialog().setContents(upperCase(captions.option, 0), optionContents, option).setButton([$import, $export]).open(callback);
        return null;
    },
    downloadLogDataCopy: function() {
        const _this = this;
        const dataCopyState = _this.state.dataCopy;
        const logData = dataCopyState.log;
        saveAsFile(logData.join(SIGN.crlf), TYPES.file.mime.TEXT_UTF8, concatString("LogData_", getFileStamp(), TYPES.file.extension.txt));
        return null;
    },
    checkDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const loading = new Loading();
        loading.on().then(function() {
            const policyNumberTo = _this.getCheckObject(jqById(seId.policyNumberTo).val(), captions.policyNumberTo);
            const result = _this.validation(policyNumberTo);
            if(result.error) {
                new Notification().error().open(result.message);
                loading.off();
                return false;
            }
            else {
                const numericCheckResult = {
                    error: false,
                    message: new Array()
                };
                if(!policyNumberTo.value.match(REG_EXP.numeric_nl)) {
                    numericCheckResult.error = true;
                    numericCheckResult.message.push([captions.policyNumberTo, MESSAGES.allowedOnlyNumeric].join(" : "));
                }
                if(numericCheckResult.error) {
                    new Notification().error().open(numericCheckResult.message.join(SIGN.br));
                    loading.off();
                    return false;
                }
            }
            const pnt = policyNumberTo.value;
            const pntList = pnt.split(SIGN.nl).filter(function(item) { return item });
            const inConditions = pntList.map(function(item) { return concatString(SIGN.sq, item, SIGN.sq); }).join(SIGN.cw);
            const query = concatString("SELECT S_SYONO FROM KT_KokKykKanren WHERE S_SYONO IN (", inConditions, ")");
            const dataSet = _this.dbCommand(_this.state.db).setQuery(query).execute().getData();
            if(dataSet.count >= 1) {
                const ngMessage = new Array();
                ngMessage.push(concatString("Already exists", SIGN.br));
                dataSet.data.forEach(function(record) {
                    ngMessage.push(record[0]);
                });
                new Notification().error().open(ngMessage.join(SIGN.br));
            }
            else {
                const okMessage = "You can use these";
                new Notification().complete().open(okMessage);
            }
            loading.off();
        }).catch(function(e) {
            console.log(e);
            new Notification().error().open(e.message);
            loading.off();
        });
    },
    importDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const policyNumberTo = _this.getCheckObject(jqById(seId.policyNumberTo).val(), captions.policyNumberTo);
        const result = _this.validation(policyNumberTo);
        if(result.error) {
            new Notification().error().open(result.message);
            return false;
        }
        else if(!policyNumberTo.value.match(REG_EXP.numeric_nl)) {
            new Notification().error().open([captions.policyNumberTo, MESSAGES.allowedOnlyNumeric].join(" : "));
            return false;
        }
        const onReadFile = function(data) {
            try {
                _this.state.dataCopy.extractedData = JSON.parse(data);
            }
            catch(e) {
                new Notification().error().open(MESSAGES.incorrect_data).exit(e.message);
            }
            _this.extractDataCopy();
        };
        new FileController().setListener(eId.fileListener).allowedExtensions([TYPES.file.mime.TEXT]).access(onReadFile);
        return null;
    },
    getDataCopySelectQuery: function(table, pn) {
    	const _this = this;
        const dataCopyExport = _this.export.dataCopy;
        const keySet = dataCopyExport.keySet;
        let query = "";
        table = queryEscape(table);
        pn = queryEscape(pn);
        const defaultKey = queryEscape(keySet.defaultKey);
        if(!keySet[table]) {
            query = concatString("SELECT * FROM ", table, " WHERE ", defaultKey, " = '", pn, "'");
        }
        else {
            const key = queryEscape(keySet[table].key);
            const type = keySet[table].type;
            switch(type) {
                case 0: {
                    query = concatString("SELECT * FROM ", table, " WHERE ", key, " IN (SELECT S_KOKNO FROM KT_KokKykKanren WHERE S_SYONO = '", pn, "')");
                    break;
                }
                case 1: {
                    query = concatString("SELECT * FROM ", table, " WHERE ", key, " = '", pn.slice(1, pn.length - 1), "'");
                    break;
                }
            }
        }
        return query;
    },
    extractDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const dataCopyExport = _this.export.dataCopy;
        const dataCopyState = _this.state.dataCopy;
        const loading = new Loading();
        loading.on().then(function() {
            dataCopyState.dataKey = { from: null, to: new Object() };
            let pnf, pnt;
            let extractedData = new Object();
            if(!dataCopyState.extractedData) {
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
                else {
                    const numericCheckResult = {
                        error: false,
                        message: new Array()
                    };
                    if(!policyNumberFrom.value.match(REG_EXP.numeric)) {
                        numericCheckResult.error = true;
                        numericCheckResult.message.push([captions.policyNumberFrom, MESSAGES.allowedOnlyNumeric].join(" : "));
                    }
                    if(!policyNumberTo.value.match(REG_EXP.numeric_nl)) {
                        numericCheckResult.error = true;
                        numericCheckResult.message.push([captions.policyNumberTo, MESSAGES.allowedOnlyNumeric].join(" : "));
                    }
                    if(numericCheckResult.error) {
                        new Notification().error().open(numericCheckResult.message.join(SIGN.br));
                        loading.off();
                        return false;
                    }
                }
                const actionStatus = {
                    extractError: false,
                    insertError: false,
                    message: null
                };
                pnf = policyNumberFrom.value;
                pnt = policyNumberTo.value;
                const connectString = _this.createConnectString(subSid.value, subUid.value, subPwd.value);
                _this.subConnect().setConnectObject().open(connectString);
                extractedData[pnf] = new Object();
                dataCopyExport.tableList.some(function(table, i) {
                    const query = _this.getDataCopySelectQuery(table, pnf);
                    const dataSet = _this.dbCommand(_this.state.subDb).setQuery(query).execute().getData();
                    dataSet.sort = i;
                    extractedData[pnf][table] = dataSet;
                    if(dataSet.error) {
                        actionStatus.extractError = true;
                        actionStatus.message = "Extract failed";
                    }
                    return dataSet.error;
                });
                _this.subClose().redirect();
                if(actionStatus.extractError) {
                    new Notification().error().open(actionStatus.message);
                    loading.off();
                    return false;
                }
            }
            else {
                extractedData = dataCopyState.extractedData;
                pnf = Object.keys(extractedData)[0];
                pnt = jqById(seId.policyNumberTo).val();
            }
            const rules = dataCopyExport.rules;
            const defaultKey = dataCopyExport.keySet.defaultKey;
            const insertData = new Object();
            const pntList = pnt.split(SIGN.nl).filter(function(item) { return item });
            const countStack = new Array();
            Object.keys(extractedData[pnf]).forEach(function(table) {
                const dataSet = extractedData[pnf][table];
                const count = dataSet.count;
                countStack.push(count);
                if(count >= 1) {
                    dataCopyState.keys = new Array();
                    const name = dataSet.name;
                    const data = dataSet.data;
                    const applyData = new Array();
                    dataCopyState.dataKey.to[table] = new Array();
                    pntList.forEach(function(to) {
                        const keyIndex = name.map(mapUpperCase).indexOf(upperCase(defaultKey));
                        data.forEach(function(record) {
                            const applyRecord = cloneJS(record);
                            if(keyIndex >= 0) {
                                applyRecord[keyIndex] = to;
                            }
                            applyData.push(applyRecord);
                            dataCopyState.keys.push(to);
                            dataCopyState.dataKey.to[table].push(to);
                        });
                    });
                    if(rules[table]) {
                        Object.keys(rules[table]).forEach(function(column) {
                            const applyType = rules[table][column];
                            const applyIndex = name.map(mapUpperCase).indexOf(upperCase(column));
                            dataCopyState.applyIndex = applyIndex;
                            _this.applyRulesDataCopy(applyType, applyData, table);
                        });
                    }
                    insertData[table] = {
                        name: name,
                        data: applyData
                    };
                }
            });
            if(countStack.reduce(function(a, b) { return a + b; }) <= 0) {
                new Notification().error().open("Nothing extracted data");
                loading.off();
                return false;
            }
            dataCopyState.extractedData = extractedData;
            dataCopyState.insertData = insertData;
            dataCopyState.insertDataStatic = cloneJS(insertData);
            dataCopyState.dataKey.from = pnf;
            const phaseType = _this.Define.TYPES.phase.dataCopy;
            _this.actionControllerDataCopy(phaseType.insert);
            loading.off();
        }).catch(function(e) {
            try { _this.subClose().redirect(); } catch(e) {}
            finally {
                console.log(e);
                new Notification().error().open(e.message);
                loading.off();
            }
        });
        return null;
    },
    applyRulesDataCopy: function(applyType, applyData, table) {
        const _this = this;
        const state = _this.state.dataCopy;
        switch(applyType) {
            case "identifyCustomerNumber": {
                state.customerNumberIdentifier = new Array();
                const query = "SELECT S_KOKNO FROM KT_KokKykKanren";
                const dataSet = _this.dbCommand(_this.state.db).setQuery(query).execute().getData();
                let numberCollection = new Array();
                if(dataSet.count >= 1) {
                    numberCollection = dataSet.data.map(function(row) { return toNumber(row[0]); });
                }
                let identifier = Math.floor(Math.random() * 99999) + 1000000;
                while(state.customerNumberIdentifier.length < applyData.length && identifier <= 99999999) {
                    if(numberCollection.indexOf(identifier) < 0) {
                        state.customerNumberIdentifier.push(toString(identifier));
                    }
                    identifier++;
                }
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = state.customerNumberIdentifier[i];
                });
                break;
            }
            case "changeTo": {
                applyData.forEach(function(record) {
                    record[state.applyIndex] = "1";
                });
                break;
            }
            case "changeUpdateFunction": {
                applyData.forEach(function(record) {
                    record[state.applyIndex] = "mousikomisyo";
                });
                break;
            }
            case "changeUpdateUser": {
                applyData.forEach(function(record) {
                    record[state.applyIndex] = "80563901";
                });
                break;
            }
            case "getIdentifierCustomerNumber": {
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = state.customerNumberIdentifier[i];
                });
                break;
            }
            case "identifyTimeStamp": {
                const d = new Date();
                const year = String(d.getFullYear());
                const month = setCharPadding(String(d.getMonth() + 1), 2);
                const date = setCharPadding(String(d.getDate()), 2);
                const hours = setCharPadding(String(d.getHours()), 2);
                const minutes = setCharPadding(String(d.getMinutes()), 2);
                const seconds = setCharPadding(String(d.getSeconds()), 2);
                state.timeStampIdentifier = concatString(year, month, date, hours, minutes, seconds);
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = concatString(state.timeStampIdentifier, setCharPadding(String(i + 1), 3));
                });
                break;
            }
            case "getIdentifierTimeStamp": {
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = concatString(state.timeStampIdentifier, setCharPadding(String(i + 1), 3));
                });
                break;
            }
            case "deleteExceptSkei": {
                let i = applyData.length;
                while(i--) {
                    if(applyData[i][state.applyIndex] !== "skei") {
                        applyData.splice(i, 1);
                        state.dataKey.to[table].splice(i, 1);
                    }
                }
                break;
            }
            case "slicePolicyNumber": {
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = state.keys[i].slice(1, state.keys[i].length - 1);
                });
                break;
            }
            case "identifyAccountNumber": {
                const accountNumberIdentifier = new Array();
                const query = "SELECT S_KOUZANO FROM ST_HrkmKouzaKanri";
                const dataSet = _this.dbCommand(_this.state.db).setQuery(query).execute().getData();
                let numberCollection = new Array();
                if(dataSet.count >= 1) {
                    numberCollection = dataSet.data.map(function(row) { return toNumber(row[0]); });
                }
                let identifier = Math.floor(Math.random() * 999999) + 1000000;
                while(accountNumberIdentifier.length < applyData.length && identifier <= 9999999) {
                    if(numberCollection.indexOf(identifier) < 0) {
                        accountNumberIdentifier.push(toString(identifier));
                    }
                    identifier++;
                }
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = accountNumberIdentifier[i];
                });
                break;
            }
        }
        return null;
    },
    exportToExcelDataCopy: function() {
        const _this = this;
        const fileDefine = TYPES.file;
        const dataCopyState = _this.state.dataCopy;
        const extractedData = dataCopyState.extractedData[Object.keys(dataCopyState.extractedData)[0]];
        const insertData = dataCopyState.insertData;
        const wb = new Workbook();
        const sheet_from_array_of_arrays = function(data, count) {
            const ws = new Object();
            const range = {
                s: { c: 10000000, r: 10000000 },
                e: { c: 0, r: 0 }
            };
            const headerStyle = {
                fill: {
                    patternType: "solid",
                    fgColor:{ rgb: "9E9E9E" }
                },
                font: {
                    bold: false
                },
                border: {
                    top: { style: "thin", tint: 1 },
                    left: { style: "thin", tint: 1 },
                    right: { style: "thin", tint: 1 },
                    bottom: { style: "thin", tint: 1 }
                }
            };
            const bodyStyle = {
                border: {
                    top: { style: "thin", tint: 1 },
                    left: { style: "thin", tint: 1 },
                    right: { style: "thin", tint: 1 },
                    bottom: { style: "thin", tint: 1 }
                }
            };
            for(let R = 0; R != data.length; ++R) {
                for(let C = 0; C != data[R].length; ++C) {
                    if(range.s.r > R) range.s.r = R;
                    if(range.s.c > C) range.s.c = C;
                    if(range.e.r < R) range.e.r = R;
                    if(range.e.c < C) range.e.c = C;
                    const cell = { v: data[R][C] };
                    if(cell.v == null) cell.v = SIGN.none;
                    const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                    if(typeof cell.v === "number") cell.t = "n";
                    else if(typeof cell.v === "boolean") cell.t = "b";
                    else if(cell.v instanceof Date) {
                        cell.t = "n";
                        cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    }
                    else cell.t = "s";
                    if(R === 0 || R === count + 5 || (C === 0 && cell.v)) {
                        cell.s = headerStyle;
                    }
                    else if(R <= count || R >= count + 5) {
                        cell.s = bodyStyle;
                    }
                    ws[cell_ref] = cell;
                }
            }
            if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        };
        const getExportData = function(data, type, toKey) {
            const dataKey = dataCopyState.dataKey;
            const cd = cloneJS(data);
            cd.name.unshift("KEY");
            switch(type) {
                case "from": {
                    cd.data.forEach(function(record) {
                        record.unshift(dataKey.from);
                    });
                    break;
                }
                case "to": {
                    cd.data.forEach(function(record, i) {
                        record.unshift(toKey[i]);
                    });
                    break;
                }
            }
            return cd;
        };
        Object.keys(insertData).forEach(function(table) {
            const from = getExportData(getProperty(extractedData, table), "from");
            const to = getExportData(getProperty(insertData, table), "to", dataCopyState.dataKey.to[table]);
            wb.SheetNames.push(table);
            const a = new Array(from.name).concat(from.data);
            const b = [[SIGN.none], [SIGN.none], [SIGN.none], [SIGN.none]];
            const c = new Array(to.name).concat(to.data);
            const ws_data = a.concat(b).concat(c);
            const ws = sheet_from_array_of_arrays(ws_data, from.count);
            wb.Sheets[table] = ws;
        });
        const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "binary" });
        const fileName = concatString("DataCopyCheck_", getFileStamp(), TYPES.file.extension.xlsx);
        saveAsFile(s2ab(wbout), fileDefine.mime.OCTET_STREAM, fileName);
        return null;
    },
    saveOptionDataCopy: function(dialogClose) {
        const _this = this;
        const dataCopyState = _this.state.dataCopy;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const $optionContainer = jqById(seId.optionContainerDataCopy);
        const $commandLines = $optionContainer.find(concatString(".", seClass.commandLine));
        const option = new Array();
        let error = false;
        const messageStack = new Array();
        $commandLines.each(function(i, item) {
            const $input = $(item).find("input");
            const $textarea = $(item).find("textarea");
            const messageIndex = concatString("[", i + 1, "]");
            const table = _this.getCheckObject($input.val(), concatString(messageIndex, "Table"));
            const script = _this.getCheckObject($textarea.val(), concatString(messageIndex, "Script"));
            const result = _this.validation(table, script);
            if(result.error) {
                messageStack.push(result.message);
                error = true;
            }
            else if(filter(table.value, option, ["table"]).isExist) {
                messageStack.push(concatString(messageIndex, "Table duplicated"));
                error = true;
            }
            else if(!filter(table.value, _this.export.dataCopy.tableList, null, upperCase).isExist) {
                messageStack.push(concatString(messageIndex, "Not exists table"));
                error = true;
            }
            else if(!script.value.match(new RegExp("@", "g"))) {
                messageStack.push(concatString(messageIndex, "Incorrect script"));
                error = true;
            }
            option.push({ table: table.value, script: script.value });
        });
        if(error) {
            new Notification().error().open(messageStack.join(SIGN.br));
            return false;
        }
        if(!dialogClose) {
            return { data: option };
        }
        const actionState = {
            msg: new Array(),
            backup: null
        };
        if(option.length <= 0) {
            dataCopyState.insertData = dataCopyState.insertDataStatic;
        }
        else {
            actionState.backup = cloneJS(dataCopyState.insertData);
            const convertScript = function(script) {
                const scriptObj = new Object();
                let sc = script.replace(new RegExp("\n@", "g"), "@").split("@").filter(function(item) { return item; }).map(function(item) { return item.split(SIGN.nl); });
                sc.forEach(function(item) {
                    const column = item.slice(0, 1)[0];
                    const data = item.slice(1);
                    scriptObj[column] = data;
                });
                return scriptObj;
            };
            option.forEach(function(line) {
                const table = line.table;
                const script = convertScript(line.script);
                const tableData = getProperty(dataCopyState.insertData, table);
                if(tableData) {
                    Object.keys(script).forEach(function(column) {
                        const applyIndex = tableData.name.map(mapUpperCase).indexOf(upperCase(column));
                        script[column].forEach(function(s, i) {
                            if(tableData.data[i]) tableData.data[i][applyIndex] = s;
                            else actionState.msg.push(concatString(column, " > ", s, " : Failed set data"));
                        });
                    });
                }
            });
        }
        if(actionState.msg.length >= 1) {
            dataCopyState.insertData = actionState.backup;
            new Notification().error().open(actionState.msg.join(SIGN.nl));
            return false;
        }
        dataCopyState.option = option;
        dialogClose();
    },
    insertDataCopy: function() {
        const _this = this;
        const dataCopyState = _this.state.dataCopy;
        dataCopyState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
            const insertData = dataCopyState.insertData;
            const insertQuery = new Object();
            const getQuery = function(table, columns, values) {
                return concatString("INSERT INTO ", table, " (", columns, ") VALUES (", values, ")");
            };
            Object.keys(insertData).forEach(function(table) {
                const name = insertData[table].name;
                const data = insertData[table].data;
                insertQuery[table] = new Array();
                const columns = name.join(SIGN.cw);
                data.forEach(function(record) {
                    const values = record.map(function(item) {
                        const v = item || item == 0 ? item : "";
                        return concatString(SIGN.sq, v, SIGN.sq);
                    }).join(SIGN.cw);
                    insertQuery[table].push(getQuery(table, columns, values));
                });
            });
            const transaction = _this.transaction();
            if(!transaction.error) {
                Object.keys(insertQuery).forEach(function(table) {
                    dataCopyState.log.push(concatString("[[", table, "]]"));
                    insertQuery[table].forEach(function(query) {
                        _this.dbCommand(_this.state.db).setQuery(query).execute();
                        dataCopyState.log.push(query);
                        const timeLog = concatString("# > Executed query at ", getSystemDateTimeMilliseconds());
                        dataCopyState.log.push(timeLog);
                    });
                });
                const phaseType = _this.Define.TYPES.phase.dataCopy;
                _this.actionControllerDataCopy(phaseType.commit);
            }
            else {
                new Notification().error().open(transaction.message);
            }
            loading.off();
        }).catch(function(e) {
            try { _this.redirect(); } catch(e) {}
            finally {
                console.log(e);
                new Notification().error().open(e.message);
                loading.off();
            }
        });
        return null;
    },
    buildCreateUserContents: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const createUserState = _this.state.createUser;
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $createButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.create));
        const $deleteButton = jqNode("button", { class: eClass.buttonColorDeepOrange }).text(upperCase(captions.delete));
        [$createButton, $deleteButton].forEach(function(item) { $actionArea.append(item); });
        $container.append($actionArea);
        const itemList = [
            {
                label: captions.userCode,
                inputType: "input",
                inputId: seId.userCode
            },
            {
                label: captions.userName,
                inputType: "input",
                inputId: seId.userName
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
        });
        $createButton.click(function() {
            createUserState.actionType = types.action.commit;
            _this.createUser();
        });
        $deleteButton.click(function() {
            createUserState.actionType = types.action.delete;
            _this.createUser();
        });
        createUserState.actionType = null;
        return $container;
    },
    actionControllerCreateUser: function(phase) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const phaseType = _this.Define.TYPES.phase.createUser;
        const $card = jqById(seId.createUserCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        switch(phase) {
            case phaseType.commit: {
                const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
                const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
                const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
                $actionArea.empty();
                [$commitButton, $logButton, $resetButton].forEach(function(item) {
                    $actionArea.append(item);
                });
                $commitButton.click(function() {
                    _this.commit().redirect();
                    const message = "Create user successfully";
                    new Notification().complete().open(message);
                    _this.actionControllerCreateUser(phaseType.complete);
                });
                $logButton.click(function() {
                    _this.downloadLogCreateUser();
                });
                $resetButton.click(function() {
                    _this.redirect();
                    _this.state.dataCopy = new Object();
                    $cardContents.html(_this.buildCreateUserContents());
                });
                break;
            }
            case phaseType.complete: {
                const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
                const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
                $actionArea.empty();
                [$logButton, $resetButton].forEach(function(item) {
                    $actionArea.append(item);
                });
                $logButton.click(function() {
                    _this.downloadLogCreateUser();
                });
                $resetButton.click(function() {
                    _this.redirect();
                    _this.state.dataCopy = new Object();
                    $cardContents.html(_this.buildCreateUserContents());
                });
                break;
            }
        }
        return null;
    },
    downloadLogCreateUser: function() {
        const _this = this;
        const createUserState = _this.state.createUser;
        const logData = createUserState.log;
        saveAsFile(logData.join(SIGN.crlf), TYPES.file.mime.TEXT_UTF8, concatString("LogData_", getFileStamp(), TYPES.file.extension.txt));
        return null;
    },
    createUser: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const createUserExport = _this.export.createUser;
        const createUserState = _this.state.createUser;
        createUserState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
            const seId = _this.Define.ELEMENTS.id;
            const captions = _this.Define.CAPTIONS;
            const userCode = _this.getCheckObject(jqById(seId.userCode).val(), captions.userCode);
            const userName = _this.getCheckObject(jqById(seId.userName).val(), captions.userName);
            const result = _this.validation(userCode, userName);
            if(result.error) {
                new Notification().error().open(result.message);
                loading.off();
                return false;
            }
            else {
                const numericCheckResult = {
                    error: false,
                    message: new Array()
                };
                if(!userCode.value.match(REG_EXP.numeric)) {
                    numericCheckResult.error = true;
                    numericCheckResult.message.push([captions.userCode, MESSAGES.allowedOnlyNumeric].join(" : "));
                }
                if(numericCheckResult.error) {
                    new Notification().error().open(numericCheckResult.message.join(SIGN.br));
                    loading.off();
                    return false;
                }
            }
            const uc = userCode.value;
            const un = userName.value;
            const transaction = _this.transaction();
            if(!transaction.error) {
                const tableList = createUserExport.tableList;
                const tableCode = createUserExport.tableCode;
                const keySet = createUserExport.keySet;
                const querySet = createUserExport.querySet;
                const rules = createUserExport.rules;
                const getInsertQuery = function(table) {
                    const insertQueryStack = new Array();
                    const qs = querySet[table];
                    switch(tableCode[table]) {
                        case "1": {
                            const base = rules.base[table];
                            const iterator = qs[base].length;
                            for(let i = 0; i < iterator; i++) {
                                const columnStack = new Array();
                                const valueStack = new Array();
                                Object.keys(qs).forEach(function(column) {
                                    let value = typeIs(qs[column]).array ? qs[column][i] : qs[column];
                                    if(rules.combine.code.indexOf(column) >= 0) {
                                        value = concatString(uc, value);
                                    }
                                    else if(rules.combine.name.indexOf(column) >= 0) {
                                        value = concatString(un, "@", value);
                                    }
                                    columnStack.push(column);
                                    valueStack.push(concatString(SIGN.sq, value, SIGN.sq));
                                });
                                const n = concatString("(", columnStack.join(SIGN.cw), ")");
                                const v = concatString("(", valueStack.join(SIGN.cw), ")");
                                const query = concatString("INSERT INTO ", table, SIGN.ws, n, " VALUES ", v);
                                insertQueryStack.push(query);
                            }
                            break;
                        }
                        case "2": {
                            const iterator = 1;
                            for(let i = 0; i < iterator; i++) {
                                const columnStack = new Array();
                                const valueStack = new Array();
                                Object.keys(qs).forEach(function(column) {
                                    let value = typeIs(qs[column]).array ? qs[column][i] : qs[column];
                                    if(rules.combine.code.indexOf(column) >= 0) {
                                        value = concatString(uc, value);
                                    }
                                    else if(rules.combine.name.indexOf(column) >= 0) {
                                        value = concatString(un, "@", value);
                                    }
                                    columnStack.push(column);
                                    valueStack.push(concatString(SIGN.sq, value, SIGN.sq));
                                });
                                const n = concatString("(", columnStack.join(SIGN.cw), ")");
                                const v = concatString("(", valueStack.join(SIGN.cw), ")");
                                const query = concatString("INSERT INTO ", table, SIGN.ws, n, " VALUES ", v);
                                insertQueryStack.push(query);
                            }
                            break;
                        }
                        case "3": {
                            const base = rules.base[table];
                            const getIterator = function(idx) {
                                return qs[base[Object.keys(base)[idx]]];
                            };
                            getIterator(0).forEach(function(a, ai) {
                                getIterator(1).forEach(function(b, bi) {
                                    getIterator(2).forEach(function(c, ci) {
                                        const columnStack = new Array();
                                        const valueStack = new Array();
                                        Object.keys(qs).forEach(function(column) {
                                            columnStack.push(column);
                                        });
                                        valueStack.push(concatString(SIGN.sq, a, SIGN.sq));
                                        valueStack.push(concatString(SIGN.sq, b, SIGN.sq));
                                        valueStack.push(concatString(SIGN.sq, c, SIGN.sq));
                                        const n = concatString("(", columnStack.join(SIGN.cw), ")");
                                        const v = concatString("(", valueStack.join(SIGN.cw), ")");
                                        const query = concatString("INSERT INTO ", table, SIGN.ws, n, " VALUES ", v);
                                        insertQueryStack.push(query);
                                    });
                                });
                            });
                            break;
                        }
                    }
                    return insertQueryStack;
                };
                const getDeleteQuery = function(table) {
                    const ks = keySet[table];
                    const code = concatString(SIGN.sq, uc, "%", SIGN.sq);
                    const condition = concatString(ks, " LIKE ", code);
                    const deleteQuery = concatString("DELETE FROM ", table, " WHERE ", condition);
                    return deleteQuery;
                };
                tableList.forEach(function(table) {
                    createUserState.log.push(concatString("[[", table, "]]"));
                    switch(createUserState.actionType) {
                        case types.action.commit: {
                            const insertQueryList = getInsertQuery(table);
                            insertQueryList.forEach(function(query) {
                                _this.dbCommand(_this.state.db).setQuery(query).execute();
                                createUserState.log.push(query);
                                const timeLog = concatString("# > Executed query at ", getSystemDateTimeMilliseconds());
                                createUserState.log.push(timeLog);
                            });
                            break;
                        }
                        case types.action.delete: {
                            const query = getDeleteQuery(table);
                            _this.dbCommand(_this.state.db).setQuery(query).execute();
                            createUserState.log.push(query);
                            const timeLog = concatString("# > Executed query at ", getSystemDateTimeMilliseconds());
                            createUserState.log.push(timeLog);
                            break;
                        }
                    }
                });
                const phaseType = _this.Define.TYPES.phase.createUser;
                _this.actionControllerCreateUser(phaseType.commit);
            }
            else {
                new Notification().error().open(transaction.message);
            }
            loading.off();
        }).catch(function(e) {
            try { _this.redirect(); } catch(e) {}
            finally {
                console.log(e);
                new Notification().error().open(e.message);
                loading.off();
            }
        });
        return null;
    }
};
