const SqlModule = function() {
    this.Define = {
        ELEMENTS: {
            id: {
                accessPage: "access-page",
                accessLogo: "access-logo",
                accessCommand: "access-command",
                sid: "sid",
                uid: "uid",
                pwd: "pwd",
                sqlHeader: "sql-header",
                sqlContents: "sql-contents",
                sqlMenuContainer: "sql-menu-container",
                headerToolsConfigIcon: "header-tools-config-icon",
                applicationPage: "application-page",
                queryCommandCard: "query-command-card",
                dataCopyCard: "data-copy-card",
                createUserCard: "create-user-card",
                lincErrorResolutionCard: "linc-error-resolution-card",
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
                queryTimer: "query-timer",
                lincPolicyNumber: "linc-policy-number",
                exportButtonQueryCommand: "export-button__query-command",
                exportContainerQueryCommand: "export-container__query-command",
                accessListContainer: "access-list-container"
            },
            class: {
                commandLine: "command-line",
                accessButton: "access-button",
                accessLoadButton: "access-load-button",
                contentsContainer: "contents-container",
                commandArea: "command-area",
                actionArea: "action-area",
                viewArea: "view-area",
                optionCommandArea: "option-command-area",
                optionRemoveButton: "option-remove-button",
                commandLineRow: "command-line-row",
                removeRow: "remove-row",
                queryEditorTextInput: "ace_text-input",
                queryGridContainer: "query-grid-container",
                dataGrid: "data-grid",
                optionTemplateContainer: "option-template-container",
                optionTemplatePannel: "option-template-pannel",
                optionTemplateClose: "option-template-close",
                optionTemplateTab: "option-template-tab",
                accessListAddContainer: "access-list-add-container",
                nameCell: "name-cell",
                infoLabelCell: "info-label-cell",
                infoMiddleCell: "info-middle-cell",
                accessListFlatButton: "access-list-flat-button"
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
            lincErrorResolution: "Linc Error Resolution",
            access: "access",
            exec: "exec",
            cancel: "cancel",
            tab: "tab",
            console: "console",
            check: "check",
            extract: "extract",
            import: "import",
            export: "export",
            template: "template",
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
            policyNumber: "Policy Number",
            policyNumberFrom: "Policy Number(From)",
            policyNumberTo: "Policy Number(To)",
            userCode: "User Code",
            userName: "User Name",
            create: "create",
            delete: "delete",
            exportType: "Export Type",
            accessList: "Access List",
            add: "add",
            edit: "edit",
            name: "name",
            load: "load"
        },
        TYPES: {
            toolId: {
                queryCommand: "queryCommand",
                dataCopy: "dataCopy",
                createUser: "createUser",
                lincErrorResolution: "lincErrorResolution"
            },
            message: {
                required: "required",
                matchWhitespace: "match-whitespace"
            },
            page: {
                access: "access",
                application: "application"
            },
            phase: {
                queryCommand: {
                    executing: "executing",
                    complete: "complete"
                },
                dataCopy: {
                    insert: "insert",
                    commit: "commit",
                    complete: "complete"
                },
                createUser: {
                    commit: "commit",
                    complete: "complete"
                },
                lincErrorResolution: {
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
                create: "create",
                delete: "delete"
            },
            export: {
                queryCommand: [
                    { label: "All", value: "all" },
                    { label: "All(without columns)", value: "all_without_columns" },
                    { label: "Separate by consoles", value: "separate_by_consoles" }
                ]
            }
        },
        MESSAGES: {
            locking_transaction: "Locking by other transaction",
            only_exec_select_query: "Can be excute only [SELECT] query",
            already_exits_name: "Already exists name"
        }
    };
    this.state = {
        page: this.Define.TYPES.page.access,
        isConnecting: false,
        info: new Object(),
        lock: new Object(),
        queryCommand: {
            ui: new Object(),
            phase: null,
            timer: null,
            element: null,
            export: {
                data: null,
                type: this.Define.TYPES.export.queryCommand[0].value
            }
        },
        dataCopy: new Object(),
        createUser: new Object(),
        lincErrorResolution: new Object(),
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
            new Notification().error().open("Failed load module");
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
    transaction: function(id) {
        const messages = this.Define.MESSAGES;
        const lock = cloneJS(this.state.lock);
        delete lock[id];
        const error = !isVoid(lock);
        let db = null;
        if(!error) {
            db = new DBUtils().connectBegin(this.state.info);
            this.state.lock[id] = db;
        }
        return {
            error: error,
            message: messages.locking_transaction,
            db: db
        };
    },
    destroy: function(id, db, isCommit) {
        const lock = this.state.lock;
        if(!isVoid(db)) {
            if(isCommit) db.commit();
            else db.rollback();
        }
        delete lock[id];
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
        createMenuItem(itemList, eIcon.home, CAPTIONS.home, transitionMenu);
        if(_this.state.isConnecting) {
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
    onAccess: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const pageType = _this.Define.TYPES.page;
        const loading = new Loading();
        loading.on().then(function() {
            const sid = _this.getCheckObject(jqById(seId.sid).val(), captions.sid);
            const uid = _this.getCheckObject(jqById(seId.uid).val(), captions.uid);
            const pwd = _this.getCheckObject(jqById(seId.pwd).val(), captions.pwd);
            const result = _this.validation(sid, uid, pwd);
            if(result.error) {
                new Notification().error().open(result.message);
                loading.off();
                return false;
            }
            const info = {
                sid: sid,
                uid: uid,
                pwd: pwd
            }
            new DBUtils().connect(info).close();
            _this.state.isConnecting = true;
            _this.state.info = info;
            _this.transition(pageType.application);
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    onDisconnect: function() {
        const _this = this;
        const pageType = _this.Define.TYPES.page;
        _this.state.isConnecting = false;
        _this.state.info = new Object();
        _this.transition(pageType.access);
        return null;
    },
    pushQueryLog: function(list, query) {
        list.push(query);
        const timeLog = concatString("# > Executed query at ", getSystemDateTimeMilliseconds());
        list.push(timeLog);
        return null;
    },
    downloadLog: function(toolId) {
        const logData = this.state[toolId].log;
        const toolName = upperCase(toolId, 0);
        saveAsFile(logData.join(SIGN.crlf), TYPES.file.mime.TEXT_UTF8, concatString(toolName, "_LogData_", getFileStamp(), TYPES.file.extension.txt));
        return null;
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
                    },
                    {
                        id: seId.lincErrorResolutionCard,
                        title: captions.lincErrorResolution,
                        contents: _this.buildLincErrorResolution()
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
        const injector = new Object();
        const getInput = function(id, ph) {
            const $input = jqNode("input", { type: "text", id: id, placeholder: ph });
            $input.keypress(function(e) {
                const keyCode = e.which || e.keyCode;
                if(keyCode === 13) {
                    _this.onAccess();
                }
            });
            injector[id] = $input;
            return $input;
        };
        const $sid = jqNode("div", { class: seClass.commandLine }).append(getInput(seId.sid, captions[seId.sid]));
        const $uid = jqNode("div", { class: seClass.commandLine }).append(getInput(seId.uid, captions[seId.uid]));
        const $pwd = jqNode("div", { class: seClass.commandLine }).append(getInput(seId.pwd, captions[seId.pwd]));
        const getAccessButton = function() {
            const $button = jqNode("button", { class: seClass.accessButton }).text(upperCase(captions.access));
            $button.click(function() {
                _this.onAccess();
            });
            return $button;
        };
        const getLoadButton = function() {
            const $icon = jqNode("i", { class: eIcon.listAlt });
            const $button = jqNode("button", { class: seClass.accessLoadButton }).append($icon);
            $button.click(function() {
                _this.openAccessTemplate(injector);
            });
            return $button;
        };
        const $confirm = jqNode("div", { class: seClass.commandLine }).append(getAccessButton());
        const $load = jqNode("div", { class: seClass.commandLine }).append(getLoadButton());
        [$sid, $uid, $pwd, $confirm, $load].forEach(function(item) { $accessCommand.append(item); });
        return $accessCommand;
    },
    openAccessTemplate: function(elementInjector) {
        const store = new Store(storage);
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const messages = _this.Define.MESSAGES;
        const title = captions.accessList;
        const sAccessList = STRUCTURE.accessList;
        const eb = new ElementBuilder();
        const itf = new Interface(sAccessList).setRoot(store.init());
        const dialog = new Dialog();
        const $container = jqNode("div", { id: seId.accessListContainer });
        const buildContents = function() {
            const dAL = store.init()[itf.getKey()];
            const apply = function(info) {
                Object.keys(elementInjector).forEach(function(key) {
                    elementInjector[key].val(info[key]);
                });
                dialog.close();
            };
            const edit = function(info) {
                openAccessListEditor(info);
            };
            const remove = function(info) {
                const callback = function(warningClose) {
                    store.connect([itf.getKey(), info.name]).delete().apply();
                    buildContents();
                    store.sync();
                    warningClose();
                };
                new Notification().warning(callback).open(MESSAGES.warning_remove_record);
            };
            if(!isVoid(dAL)) {
                const $ul = jqNode("ul");
                getObjectOrderList(dAL).forEach(function(key) {
                    console.log(key);
                    const info = dAL[key];
                    const $li = jqNode("li");
                    $li.click(function(e) {
                        e.stopPropagation();
                        apply(info);
                    });
                    const $viewArea = jqNode("div", { class: seClass.viewArea });
                    const $viewTable = jqNode("table");
                    const $colgroup = jqNode("colgroup");
                    const $viewHeader = jqNode("thead");
                    const $viewBody = jqNode("tbody");
                    const $nameRow = jqNode("tr");
                    const $nameCell = jqNode("th", { colspan: "3" }).text(info.name);
                    $nameRow.append($nameCell).appendTo($viewHeader);
                    const infoObj = {
                        0: { label: captions.sid, size: 100 },
                        1: { label: captions.uid, size: 10 },
                        2: { label: captions.pwd, size: null }
                    };
                    [info.sid, info.uid, info.pwd].forEach(function(item, i) {
                        const label = infoObj[i].label;
                        const size = infoObj[i].size;
                        const $infoRow = jqNode("tr");
                        const $labelCell = jqNode("td").text(upperCase(label));
                        const $middleCell = jqNode("td").text(SIGN.gc);
                        const $valueCell = jqNode("td").text(item);
                        eb.listAppend($infoRow, [$labelCell, $middleCell, $valueCell]);
                        $viewBody.append($infoRow);
                        $col = jqNode("col");
                        if(size) $col.attr({ width: size });
                        $colgroup.append($col);
                    });
                    eb.listAppend($viewTable, [$colgroup, $viewHeader, $viewBody]);
                    $viewArea.append($viewTable);
                    const $actionArea = jqNode("div", { class: seClass.actionArea });
                    const $editIcon = eb.getFontAwesomeIcon(eIcon.edit);
                    const $removeIcon = eb.getFontAwesomeIcon(eIcon.trash);
                    const $actionTable = jqNode("table");
                    const $actionBody = jqNode("tbody");
                    [$editIcon, $removeIcon].forEach(function(item, i) {
                        const $row = jqNode("tr");
                        const $cell = jqNode("td").append(item);
                        $row.append($cell).appendTo($actionBody);
                        $cell.click(function(e) {
                            e.stopPropagation();
                            switch(i) {
                                case 0: {
                                    edit(info);
                                    break;
                                }
                                case 1: {
                                    remove(info);
                                    break;
                                }
                            }
                        });
                    });
                    $actionTable.append($actionBody).appendTo($actionArea);
                    eb.listAppend($li, [$viewArea, $actionArea]);
                    $ul.append($li);
                });
                $container.empty().append($ul);
            }
            else {
                $container.empty();
            }
        };
        const openAccessListEditor = function(editData) {
            const isEditMode = !isVoid(editData);
            const info = isEditMode ? editData : itf.getInjectData(null, null, null, null);
            const subOption = { "width": "360px", "max-height": "500px" };
            const title = isEditMode ? upperCase(captions.edit, 0) : upperCase(captions.add, 0);
            const eventInjector = new Object();
            const buildSubContents = function() {
                const $container = jqNode("div", { class: seClass.accessListAddContainer });
                const $table = jqNode("table");
                const itemList = [
                    { key: "name", label: upperCase(captions.name), value: info.name ? info.name : SIGN.none },
                    { key: "sid", label: upperCase(captions.sid), value: info.sid ? info.sid : SIGN.none },
                    { key: "uid", label: upperCase(captions.uid), value: info.uid ? info.uid : SIGN.none },
                    { key: "pwd", label: upperCase(captions.pwd), value: info.pwd ? info.pwd : SIGN.none }
                ];
                itemList.forEach(function(item) {
                    const $row = jqNode("tr");
                    const $label = jqNode("label").text(item.label);
                    const $input = jqNode("input", { class: eClass.applicationInput, value: item.value });
                    const $labelCell = jqNode("td").append($label);
                    const $inputCell = jqNode("td").append($input);
                    eb.listAppend($row, [$labelCell, $inputCell]);
                    $table.append($row);
                    eventInjector[item.key] = $input;
                });
                $container.append($table);
                return $container;
            };
            const callback = function(dialogClose) {
                const name = _this.getCheckObject(eventInjector.name.val(), upperCase(captions.name));
                const sid = _this.getCheckObject(eventInjector.sid.val(), captions.sid);
                const uid = _this.getCheckObject(eventInjector.uid.val(), captions.uid);
                const pwd = _this.getCheckObject(eventInjector.pwd.val(), captions.pwd);
                const result = _this.validation(name, sid, uid, pwd);
                if(result.error) {
                    new Notification().error().open(result.message);
                    return false;
                }
                const dAL = store.init()[itf.getKey()];
                if(!isVoid(dAL) && !isVoid(dAL[name.value]) && !(isEditMode && info.name === name.value)) {
                    new Notification().error().open(messages.already_exits_name);
                    return false;
                }
                const getOrder = function() {
                    if(isEditMode && !isVoid(dAL[info.name])) return dAL[info.name].order;
                    return getObjectMaxOrder(dAL) + 1;
                };
                const injectData = itf.getInjectData(name.value, sid.value, uid.value, pwd.value, getOrder());
                itf.inject(store, injectData, name.value);
                if(isEditMode && info.name !== name.value) store.connect([itf.getKey(), info.name]).delete().apply();
                store.connect([itf.getKey()]).set(sortObjectByOrder(store.init()[itf.getKey()])).apply();
                buildContents();
                store.sync();
                dialogClose();
            };
            const okIcon = eb.getFontAwesomeIcon(eIcon.check);
            const closeIcon = eb.getFontAwesomeIcon(eIcon.times);
            new SubDialog().setContents(title, buildSubContents(), subOption).setUserButton(okIcon, closeIcon).open(callback);
        };
        const $addButton = jqNode("button").append(eb.getFontAwesomeIcon(eIcon.plus));
        $addButton.click(function() { openAccessListEditor(); });
        buildContents();
        const option = { "width": "400px", "max-height": "530px" };
        dialog.setContents(title, $container, option).setButton([$addButton]).disableOkButton().open();
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
        [$execButton].forEach(function(item) { $actionArea.append(item); });
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
                bindKey: { mac: "cmd-f", win: "ctrl-f" }
            });
        }
        catch(e) {
            console.log(e);
        }
        return null;
    },
    actionControllerQueryCommand: function(phase) {
        const _this = this;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.queryCommand;
        const exportType = types.export.queryCommand;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const qcState = _this.state.queryCommand;
        const $card = jqById(seId.queryCommandCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
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
                    const milisec = (queryTimeCounter / 10).toFixed(3);
                    $timer.text(getTimerView(milisec));
                }, 100);
                break;
            }
            case phaseType.complete: {
                jqById(seId.exportButtonQueryCommand).remove();
                const $exportButton = jqNode("button", { id: seId.exportButtonQueryCommand, class: eClass.buttonColorPositive }).text(upperCase(captions.export));
                $actionArea.append($exportButton);
                $exportButton.click(function() {
                    const callback = function(dialogClose) {
                        _this.exportQueryCommandConsoles(dialogClose);
                    };
                    const exportContents = function() {
                        const $container = jqNode("div", { id: seId.exportContainerQueryCommand });
                        const $label = jqNode("label").text(captions.exportType);
                        const $select = jqNode("select");
                        exportType.forEach(function(item) {
                            const $option = jqNode("option", { value: item.value }).text(item.label);
                            if(qcState.export.type === item.value) {
                                $option.attr({ selected: true });
                            }
                            $select.append($option);
                        });
                        [$label, $select].forEach(function(item) { $container.append(item); });
                        $select.change(function(e) {
                           qcState.export.type = e.target.value; 
                        });
                        return $container;
                    };
                    new Dialog().setContents(upperCase(captions.export, 0), exportContents()).open(callback);
                });
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
    exportQueryCommandConsoles: function(dialogClose) {
        const _this = this;
        const types = _this.Define.TYPES;
        const exportType = types.export.queryCommand;
        const qcState = _this.state.queryCommand;
        const exportState = qcState.export;
        const fileType = TYPES.file.mime.OCTET_STREAM;
        if(!exportState.data) {
            new Notification.error().open(MESSAGES.nothing_data);
            return false;
        }
        const loading = new Loading();
        loading.on().then(function() {
            const consoleData = exportState.data;
            const type = exportState.type;
            let convertedData = new Array();
            const convertColumns = function(columns) {
                return [columns.map(function(cObj) { return cObj.caption; })];
            };
            const convertData = function(data) {
                if(isVoid(data)) return [SIGN.none];
                return data.map(function(dObj) {
                    delete dObj.recid;
                    return Object.keys(dObj).map(function(key) { return dObj[key] });
                });
            };
            const headerStyle = {
                fill: {
                    patternType: "solid",
                    fgColor:{ rgb: "9E9E9E" }
                }
            };
            switch(type) {
                case exportType[0].value: {
                    const setStyle = function(R, C, cell) {
                        if(headerIndex.indexOf(R) >= 0) cell.s = headerStyle;
                    };
                    const headerIndex = new Array();
                    consoleData.forEach(function(dataSet) {
                       const columns = convertColumns(dataSet.name);
                       const data = convertData(dataSet.data);
                       headerIndex.push(convertedData.length);
                       convertedData = convertedData.concat(columns.concat(data));
                    });
                    const wb = new Workbook();
                    const ws = sheetFromArrayOfArrays(convertedData, setStyle);
                    wb.SheetNames.push(type);
                    wb.Sheets[type] = ws;
                    const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "binary" });
                    const fileName = concatString("QueryCommand_", type ,"_", getFileStamp(), TYPES.file.extension.xlsx);
                    saveAsFile(s2ab(wbout), fileType, fileName);
                    break;
                }
                case exportType[1].value: {
                	consoleData.forEach(function(dataSet) {
                       const data = convertData(dataSet.data);
                       convertedData = convertedData.concat(data);
                    });
                    const wb = new Workbook();
                    const ws = sheetFromArrayOfArrays(convertedData);
                    wb.SheetNames.push(type);
                    wb.Sheets[type] = ws;
                    const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "binary" });
                    const fileName = concatString("QueryCommand_", type ,"_", getFileStamp(), TYPES.file.extension.xlsx);
                    saveAsFile(s2ab(wbout), fileType, fileName);
                    break;
                }
                case exportType[2].value: {
                    const setStyle = function(R, C, cell) {
                        if(R === 0) cell.s = headerStyle;
                    };
                    const wb = new Workbook();
                    consoleData.forEach(function(dataSet, i) {
                        const columns = convertColumns(dataSet.name);
                        const data = convertData(dataSet.data);
                        const ws_data = columns.concat(data);
                        const ws = sheetFromArrayOfArrays(ws_data, setStyle);
                        const console = concatString("Console", i + 1);
                        wb.SheetNames.push(console);
                        wb.Sheets[console] = ws;
                    });
                    const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "binary" });
                    const fileName = concatString("QueryCommand_", type ,"_", getFileStamp(), TYPES.file.extension.xlsx);
                    saveAsFile(s2ab(wbout), fileType, fileName);
                    break;
                }
            }
            dialogClose();
            loading.off();
        }).catch(function(e) {
            new Notification.error().open(e.message);
            loading.off();
        });
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
        const types = _this.Define.TYPES;
        const phaseType = types.phase.queryCommand;
        const qcState = _this.state.queryCommand;
        if(isVoid(selection)) return false;
        try {
            const exceptionRule = new RegExp("(((INSERT INTO))|((UPDATE).+?(SET))|((DELETE FROM))|(CREATE TABLE)|(DROP TABLE)|(TRUNCATE TABLE))", "gi");
            if(exceptionRule.test(selection)) {
                new Notification().error().open(messages.only_exec_select_query);
                return false;
            }
            const queryStack = getExistArray(selection.split(SIGN.sc).map(function(item) { return item.trim().replace(new RegExp("\r\nSELECT", "g"), "SELECT"); }));
            const $tabs = jqById(seId.queryGridTabs);
            const $contents = jqById(seId.queryGridContents);
            if(!isVoid(qcState.ui)) {
                _this.clearQueryCommandUI();
            }
            const uiTabIdList = new Array();
            const uiGridIdList = new Array();
            const dataList = new Array();
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
            const createDataGrid = function(idx, dataSet) {
                const option = {
                    header: false,
                    toolbar: false,
                    footer: false,
                    lineNumbers: true,
                    selectColumn: false,
                    expandColumn: false
                };
                const gridId = getGridId(idx);
                uiGridIdList.push(gridId);
                dataList.push(dataSet);
                return {
                    name: gridId,
                    header: SIGN.none,
                    show: option,
                    columns: dataSet.name,
                    records: dataSet.data
                };
            };
            // _this.actionControllerQueryCommand(phaseType.executing);
            const db = new DBUtils().connect(_this.state.info);
            queryStack.forEach(function(query, i, a) {
                const idx = i + 1;
                const dataSet = db.executeSelectGrid(query).onEnd(a.length === idx).dataSet;
                tabsStack.push(createTabs(idx));
                const gridId = getGridId(idx);
                const $grid = jqNode("div", { id: gridId, style: "width: 100%; height: 300px;" });
                $contents.append($grid);
                mapping[getTabId(idx)] = $grid;
                const dataGrid = createDataGrid(idx, dataSet);
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
            qcState.export.data = dataList;
            _this.actionControllerQueryCommand(phaseType.complete);
        }
        catch(e) {
            new Notification().error().open(e.message);
            // _this.actionControllerQueryCommand(null);
        }
        return null;
    },
    buildDataCopyContents: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const eb = new ElementBuilder();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $loadButton = jqNode("button", { class: classes(eClass.flatButton, seClass.accessListFlatButton) }).append(eb.getFontAwesomeIcon(eIcon.listAlt));
        const $checkButton = jqNode("button", { class: eClass.buttonColorBrown }).text(upperCase(captions.check));
        const $extractButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.extract));
        const $importButton = jqNode("button", { class: eClass.buttonColorCyan }).text(upperCase(captions.import));
        eb.listAppend($actionArea, [$loadButton, $checkButton, $extractButton, $importButton]);
        $container.append($actionArea);
        const itemList = [
            {
                label: captions.subSid,
                inputType: "input",
                inputId: seId.subSid,
                injectId: seId.sid
            },
            {
                label: captions.subUid,
                inputType: "input",
                inputId: seId.subUid,
                injectId: seId.uid
            },
            {
                label: captions.subPwd,
                inputType: "input",
                inputId: seId.subPwd,
                injectId: seId.pwd
            },
            {
                label: captions.policyNumberFrom,
                inputType: "input",
                inputId: seId.policyNumberFrom,
                injectId: null
            },
            {
                label: captions.policyNumberTo,
                inputType: "textarea",
                inputId: seId.policyNumberTo,
                injectId: null
            }
        ];
        const injector = new Object();
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
            if(item.injectId) injector[item.injectId] = $input;
        });
        $loadButton.click(function() {
            _this.openAccessTemplate(injector);
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
        const $commandArea = jqNode("div", { class: seClass.optionCommandArea });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $addButton = jqNode("button").append(jqNode("i", { class: eIcon.plus }));
        $addButton.click(function() {
            $commandArea.append(_this.createOptionCommandLine());
            jqByClass(eClass.dialogContents).scrollTop(function() { return this.scrollHeight; });
        });
        $actionArea.append($addButton);
        const data = optionData ? optionData : dataCopyState.option;
        if(data) {
            data.forEach(function(item) {
                $commandArea.append(_this.createOptionCommandLine(item.table, item.script));
            });
        }
        [$commandArea, $actionArea].forEach(function(item) { $container.append(item); });
        return $container;
    },
    createOptionCommandLine: function(table, script) {
        const _this = this;
        const seClass = _this.Define.ELEMENTS.class;
        const $commandLine = jqNode("div", { class: seClass.commandLine });
        const $removeRow = jqNode("div", { class: classes(seClass.commandLineRow, seClass.removeRow) });
        const $removeButton = jqNode("button", { class: seClass.optionRemoveButton }).append(jqNode("i", { class: eIcon.trash }))
        $removeRow.append($removeButton);
        const $inputRow = jqNode("div", { class: seClass.commandLineRow });
        const $inputLabel = jqNode("label").text("Table");
        const $input = jqNode("input", { type: "text" });
        const $textareaRow = jqNode("div", { class: seClass.commandLineRow });
        const $textareaLabel = jqNode("label").text("Script");
        const placeholder = "@column\nvalue1\nvalue2...($null: remove, $eq: pass)";
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
    },
    actionControllerDataCopy: function(phase) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.dataCopy;
        const transactionId = types.toolId.dataCopy;
        const $card = jqById(seId.dataCopyCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $insertButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.insert));
        const $optionButton = jqNode("button", { class: eClass.buttonColorEnergized }).text(upperCase(captions.option));
        const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
        const $rollbackButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.rollback));
        const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
        const $exportButton = jqNode("button", { class: eClass.buttonColorCalm }).text(upperCase(captions.export));
        const $backupButton = jqNode("button", { class: eClass.buttonColorRoyal }).text(upperCase(captions.backup));
        const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
        let itemList = new Array();
        switch(phase) {
            case phaseType.insert: {
                itemList = [$insertButton, $optionButton, $exportButton, $backupButton, $resetButton];
                break;
            }
            case phaseType.commit: {
                itemList = [$commitButton, $rollbackButton, $logButton, $exportButton, $backupButton, $resetButton];
                break;
            }
            case phaseType.complete: {
                itemList = [$logButton, $exportButton, $backupButton, $resetButton];
                break;
            }
        }
        $actionArea.empty();
        itemList.forEach(function(item) {
            $actionArea.append(item);
        });
        $insertButton.click(function() {
            _this.insertDataCopy();
        });
        $optionButton.click(function() {
            _this.openOptionDataCopy();
        });
        $commitButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db, true);
            _this.actionControllerDataCopy(phaseType.complete);
            const message = "Data copy successfully";
            new Notification().complete().open(message);
        });
        $rollbackButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db);
            _this.actionControllerDataCopy(phaseType.insert);
        });
        $logButton.click(function() {
            _this.downloadLog(transactionId);
        });
        $exportButton.click(function() {
            _this.exportToExcelDataCopy();
        });
        $backupButton.click(function() {
            _this.backupDataCopy();
        });
        $resetButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db);
            _this.state.dataCopy = new Object();
            $cardContents.html(_this.buildDataCopyContents());
        });
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
        const $templateButton = jqNode("button").text(upperCase(captions.template));
        const $export = jqNode("button").text(upperCase(captions.export));
        const $import = jqNode("button").text(upperCase(captions.import));
        $templateButton.click(function() {
            _this.openTemplateDataCopy();
        });
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
        new Dialog().setContents(upperCase(captions.option, 0), optionContents, option).setButton([$import, $export, $templateButton]).open(callback);
        return null;
    },
    openTemplateDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const template = _this.export.dataCopy.template;
        const $templateContainer = jqNode("div", { class: seClass.optionTemplateContainer });
        const $pannel = jqNode("div", { class: seClass.optionTemplatePannel });
        const $closeButton = jqNode("div", { class: seClass.optionTemplateClose });
        const $closeIcon = jqNode("i", { class: eIcon.timesCircle });
        $closeIcon.click(function() { $templateContainer.remove(); });
        $closeButton.append($closeIcon);
        $pannel.append($closeButton);
        const applyTemplate = function(menu) {
            const $optionContainer = jqById(seId.optionContainerDataCopy);
            const $commandLines = $optionContainer.find(concatString(".", seClass.commandLine));
            const option = new Array();
            $commandLines.each(function(i, item) {
                const $input = $(item).find("input");
                const $textarea = $(item).find("textarea");
                const table = _this.getCheckObject($input.val());
                const script = _this.getCheckObject($textarea.val());
                option.push({ table: table.value, script: script.value });
            });
            const result = {
                error: false,
                message: new Array()
            };
            const templateStack = new Array();
            template[menu].forEach(function(item) {
                const obj = {
                    table: item.table,
                    script: item.columns.map(function(c) { return concatString("@", c); }).join(SIGN.nl)
                };
                templateStack.push(obj);
                if(find(item.table, option, ["table"], upperCase).isExist) {
                    result.error = true;
                    result.message.push(item.table);
                }
            });
            if(result.error) {
                const aet = "Already exists table";
                const message = concatString(aet, SIGN.br, SIGN.br, result.message.join(SIGN.br));
                new Notification().error().open(message);
                return false;
            }
            const $commandArea = $optionContainer.find(concatString(".", seClass.optionCommandArea));
            templateStack.forEach(function(item) {
                $commandArea.append(_this.createOptionCommandLine(item.table, item.script));
            });
            jqByClass(eClass.dialogContents).scrollTop(function() { return this.scrollHeight; });
            $templateContainer.remove();
        };
        Object.keys(template).forEach(function(menu) {
            const $labelButton = jqNode("div", { class: seClass.optionTemplateTab }).text(menu);
            $labelButton.click(function() { applyTemplate(menu); });
            $pannel.append($labelButton);
        });
        $templateContainer.append($pannel);
        jqByTag("body").append($templateContainer);
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
            const db = new DBUtils().connect(_this.state.info);
            const dataSet = db.executeSelect(query).onEnd(true).dataSet;
            if(dataSet.count >= 1) {
                const ngMessage = new Array();
                ngMessage.push(concatString("Already exists", SIGN.br));
                dataSet.data.forEach(function(record) {
                    ngMessage.push(record[0]);
                });
                throw new Error(ngMessage.join(SIGN.br));
            }
            else {
                const okMessage = "You can use these";
                new Notification().complete().open(okMessage);
            }
            loading.off();
        }).catch(function(e) {
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
        const types = _this.Define.TYPES;
        const phaseType = types.phase.dataCopy;
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
                const info = {
                    sid: subSid,
                    uid: subUid,
                    pwd: subPwd
                };
                const subDB = new DBUtils().connect(info);
                extractedData[pnf] = new Object();
                dataCopyExport.tableList.some(function(table, i, a) {
                    const query = _this.getDataCopySelectQuery(table, pnf);
                    const dataSet = subDB.executeSelect(query).onEnd((a.length === i + 1)).dataSet;
                    extractedData[pnf][table] = dataSet;
                    if(dataSet.error) {
                        actionStatus.extractError = true;
                        actionStatus.message = "Extract failed";
                    }
                    return dataSet.error;
                });
                if(actionStatus.extractError) throw new Error(actionStatus.message);
            }
            else {
                extractedData = dataCopyState.extractedData;
                pnf = Object.keys(extractedData)[0];
                pnt = jqById(seId.policyNumberTo).val();
            }
            const db = new DBUtils().connect(_this.state.info);
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
                            _this.applyRulesDataCopy(applyType, applyData, table, db);
                        });
                    }
                    insertData[table] = {
                        name: name,
                        data: applyData
                    };
                }
            });
            if(countStack.reduce(function(a, b) { return a + b; }) <= 0) throw new Error("Nothing extracted data");
            db.close();
            dataCopyState.extractedData = extractedData;
            dataCopyState.insertData = insertData;
            dataCopyState.insertDataStatic = cloneJS(insertData);
            dataCopyState.dataKey.from = pnf;
            _this.actionControllerDataCopy(phaseType.insert);
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    applyRulesDataCopy: function(applyType, applyData, table, db) {
        const _this = this;
        const state = _this.state.dataCopy;
        switch(applyType) {
            case "identifyCustomerNumber": {
                state.customerNumberIdentifier = new Array();
                const query = "SELECT S_KOKNO FROM KT_KokKykKanren";
                const dataSet = db.executeSelect(query).dataSet;
                let numberCollection = new Array();
                if(dataSet.count >= 1) {
                    numberCollection = dataSet.data.map(function(row) { return toNumber(row[0]); });
                }
                let identifier = Math.floor(Math.random() * 999999) + 1000000;
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
                const dataSet = db.executeSelect(query).dataSet;
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
        const setStyle = function(R, C, cell, count) {
            if(R === 0 || R === count + 5 || (C === 0 && cell.v)) {
                cell.s = headerStyle;
            }
            else if(R <= count || R >= count + 5) {
                cell.s = bodyStyle;
            }
        };
        const wb = new Workbook();
        Object.keys(insertData).forEach(function(table) {
            const from = getExportData(getProperty(extractedData, table), "from");
            const to = getExportData(getProperty(insertData, table), "to", dataCopyState.dataKey.to[table]);
            wb.SheetNames.push(table);
            const a = new Array(from.name).concat(from.data);
            const b = getIterator(4).map(function() { return [SIGN.none]; });
            const c = new Array(to.name).concat(to.data);
            const ws_data = a.concat(b).concat(c);
            const ws = sheetFromArrayOfArrays(ws_data, setStyle, from.count);
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
            else if(find(table.value, option, ["table"], upperCase).isExist) {
                messageStack.push(concatString(messageIndex, "Table has duplicates"));
                error = true;
            }
            else if(!find(table.value, _this.export.dataCopy.tableList, null, upperCase).isExist) {
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
            dataCopyState.insertData = cloneJS(dataCopyState.insertDataStatic);
        }
        else {
            actionState.backup = cloneJS(dataCopyState.insertData);
            const convertScript = function(script) {
                const scriptObj = new Object();
                const sc = getExistArray(script.replace(new RegExp("\n@", "g"), "@").split("@")).map(function(item) { return item.split(SIGN.nl); });
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
                        if(applyIndex < 0) {
                            actionState.msg.push(concatString("[", table, "]", column, " : Not exists column"));
                            return;
                        }
                        getExistArray(script[column]).forEach(function(s, i) {
                            if(!tableData.data[i]) {
                                actionState.msg.push(concatString("[", table, "]", column, " > ", s, " : Overflow data"));
                                return;
                            }
                            else if(s === "$eq") return;
                            tableData.data[i][applyIndex] = lowerCase(s) === "$null" ? SIGN.none : s;
                        });
                    });
                }
            });
        }
        if(actionState.msg.length >= 1) {
            dataCopyState.insertData = actionState.backup;
            new Notification().error().open(actionState.msg.join(SIGN.br));
            return false;
        }
        dataCopyState.option = option;
        dialogClose();
    },
    insertDataCopy: function() {
        const _this = this;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.dataCopy;
        const transactionId = types.toolId.dataCopy;
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
            const onTransaction = _this.transaction(transactionId);
            if(onTransaction.error) throw new Error(onTransaction.message);
            const db = onTransaction.db;
            try {
                Object.keys(insertQuery).forEach(function(table) {
                    dataCopyState.log.push(concatString("[[", table, "]]"));
                    insertQuery[table].forEach(function(query) {
                        db.execute(query);
                        _this.pushQueryLog(dataCopyState.log, query);
                    });
                });
                _this.actionControllerDataCopy(phaseType.commit);
            }
            catch(e) {
                _this.destroy(transactionId, db);
                throw new Error(e.message);
            }
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
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
            createUserState.actionType = types.action.create;
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
        const types = _this.Define.TYPES;
        const phaseType = types.phase.createUser;
        const transactionId = types.toolId.createUser;
        const $card = jqById(seId.createUserCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
        const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
        const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
        let itemList = new Array();
        switch(phase) {
            case phaseType.commit: {
                itemList = [$commitButton, $logButton, $resetButton];
                break;
            }
            case phaseType.complete: {
                itemList = [$logButton, $resetButton];
                break;
            }
        }
        $actionArea.empty();
        itemList.forEach(function(item) {
            $actionArea.append(item);
        });
        $commitButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db, true);
            _this.actionControllerCreateUser(phaseType.complete);
            const message = "Create user successfully";
            new Notification().complete().open(message);
        });
        $logButton.click(function() {
            _this.downloadLog(transactionId);
        });
        $resetButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db);
            _this.state.dataCopy = new Object();
            $cardContents.html(_this.buildCreateUserContents());
        });
        return null;
    },
    createUser: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.createUser;
        const transactionId = types.toolId.createUser;
        const createUserExport = _this.export.createUser;
        const createUserState = _this.state.createUser;
        createUserState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
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
            const info = _this.state.info;
            const uc = userCode.value;
            const un = userName.value;
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
                                let value = qs[column];
                                if(typeIs(qs[column]).array) {
                                	value = qs[column][i];
                                }
                                else if(typeIs(qs[column]).object) {
                                	const prop = getProperty(qs[column], info.sid.value);
                                	if(prop) value = prop;
                                	else value = "1";
                                }
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
                                    valueStack.push(concatString(SIGN.sq, concatString(uc, a), SIGN.sq));
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
            const onTransaction = _this.transaction(transactionId);
            if(onTransaction.error) throw new Error(onTransaction.message);
            const db = onTransaction.db;
            try {
                tableList.forEach(function(table) {
                    createUserState.log.push(concatString("[[", table, "]]"));
                    switch(createUserState.actionType) {
                        case types.action.create: {
                            const insertQueryList = getInsertQuery(table);
                            insertQueryList.forEach(function(query) {
                                db.execute(query);
                                _this.pushQueryLog(createUserState.log, query);
                            });
                            break;
                        }
                        case types.action.delete: {
                            const query = getDeleteQuery(table);
                            db.execute(query);
                            _this.pushQueryLog(createUserState.log, query);
                            break;
                        }
                    }
                });
                _this.actionControllerCreateUser(phaseType.commit);
            }
            catch(e) {
                _this.destroy(transactionId, db);
                throw new Error(e.message);
            }
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    buildLincErrorResolution: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $execButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.exec));
        [$execButton].forEach(function(item) { $actionArea.append(item); });
        $container.append($actionArea);
        const itemList = [
            {
                label: captions.policyNumber,
                inputType: "input",
                inputId: seId.lincPolicyNumber
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
            _this.solveLincError();
        });
        return $container;
    },
    actionControllerLincErrorResolution: function(phase) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.lincErrorResolution;
        const transactionId = types.toolId.lincErrorResolution;
        const $card = jqById(seId.lincErrorResolutionCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
        const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
        const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
        let itemList = new Array();
        switch(phase) {
            case phaseType.commit: {
                itemList = [$commitButton, $logButton, $resetButton];
                break;
            }
            case phaseType.complete: {
                itemList = [$logButton, $resetButton];
                break;
            }
        }
        $actionArea.empty();
        itemList.forEach(function(item) {
            $actionArea.append(item);
        });
        $commitButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db, true);
            _this.actionControllerLincErrorResolution(phaseType.complete);
            const message = "Linc error solved successfully";
            new Notification().complete().open(message);
        });
        $logButton.click(function() {
            _this.downloadLog(transactionId);
        });
        $resetButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db);
            _this.state.dataCopy = new Object();
            $cardContents.html(_this.buildLincErrorResolution());
        });
        return null;
    },
    solveLincError: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.lincErrorResolution;
        const transactionId = types.toolId.lincErrorResolution;
        const lincErrorExport = _this.export.lincErrorResolution;
        const lincErrorState = _this.state.lincErrorResolution;
        lincErrorState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
            const policyNumber = _this.getCheckObject(jqById(seId.lincPolicyNumber).val(), captions.policyNumber);
            const result = _this.validation(policyNumber);
            if(result.error) {
                throw new Error(result.message);
            }
            else {
                const numericCheckResult = {
                    error: false,
                    message: new Array()
                };
                if(!policyNumber.value.match(REG_EXP.numeric)) {
                    numericCheckResult.error = true;
                    numericCheckResult.message.push([captions.policyNumber, MESSAGES.allowedOnlyNumeric].join(" : "));
                }
                if(numericCheckResult.error) {
                    throw new Error(numericCheckResult.message.join(SIGN.br));
                }
            }
            const pn = policyNumber.value;
            const onTransaction = _this.transaction(transactionId);
            if(onTransaction.error) throw new Error(onTransaction.message);
            const db = onTransaction.db;
            try {
                const mapping = { key: concatString(SIGN.sq, pn, SIGN.sq) };
                lincErrorExport.queryList.forEach(function(query) {
                    const bindedQuery = bindQuery(query, mapping);
                    db.execute(bindedQuery);
                    _this.pushQueryLog(lincErrorState.log, bindedQuery);
                });
                _this.actionControllerLincErrorResolution(phaseType.commit);
            }
            catch(e) {
                _this.destroy(transactionId, db);
                throw new Error(e.message);
            }
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    }
};

const DBUtils = function() {
    this.Define = {
        ADODB: {
            connection: "ADODB.Connection",
            recordset: "ADODB.Recordset",
            command: "ADODB.Command"
        },
        OLEDB: {
        	provider: "Provider=OraOLEDB.Oracle;",
        	dataSource: "Data Source=",
        	uid: "User ID=",
            pwd: "Password="
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
        TYPES: {
            connect: {
                oledb: "oledb",
                direct: "direct"
            },
            actionType: {
                query: "q",
                noneQuery: "nq"
            },
            command: {
                adCmdUnspecified: -1,
                adCmdText: 1,
                adCmdTable: 2,
                adCmdStoredProc: 4,
                adCmdFile: 256,
                adCmdTableDirect: 512,
                adVarWChar: 202,
                adParamInput: 1,
            }
        }
    };
    this.driver = null;
    this.command = null;
    this.type = null;
    this.dataSet = null;
};
DBUtils.prototype = {
    createConnectString: function(sid, uid, pwd, type) {
        const OLEDB = this.Define.OLEDB;
        const DIRECT = this.Define.DIRECT;
        const DEFAULT_SET = this.Define.DEFAULT_SET;
        const types = this.Define.TYPES;
        const connectType = types.connect;
        const paramType = type ? type : connectType.oledb;
        const getConnectString = function(name, value) {
            return name + value + SIGN.sc;
        };
        const getDataSourceString = function(name, value) {
            return SIGN.bs + name + value + SIGN.be;
        };
        let str = "";
        switch(paramType) {
            case connectType.oledb: {
            	str += OLEDB.provider;
            	str += getConnectString(OLEDB.dataSource, sid);
            	str += getConnectString(OLEDB.uid, uid);
            	str += getConnectString(OLEDB.pwd, pwd);
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
    connect: function(info) {
        const ADODB = this.Define.ADODB;
        const types = this.Define.TYPES;
        const connectString = this.createConnectString(info.sid.value, info.uid.value, info.pwd.value);
        this.driver = new ActiveXObject(ADODB.connection);
        this.driver.Open(connectString);
        this.type = types.actionType.query;
        return this;
    },
    connectBegin: function(info) {
        const types = this.Define.TYPES;
        this.connect(info);
        this.type = types.actionType.noneQuery;
        this.driver.BeginTrans();
        return this;
    },
    initCommand: function(query) {
        const ADODB = this.Define.ADODB;
        const types = this.Define.TYPES;
        const commandType = types.command;
        const command = new ActiveXObject(ADODB.command);
        command.ActiveConnection = this.driver;
        command.CommandType = commandType.adCmdText;
        command.Prepared = true;
        command.CommandText = query;
        this.command = command;
        return command;
    },
    execute: function(query) {
        const command = this.initCommand(query);
        command.Execute();
        this.dataSet = null;
        return null;
    },
    executeSelect: function(query) {
        const command = this.initCommand(query);
        const recordSet = command.Execute();
        this.dataSet = this.getData(recordSet);
        return this;
    },
    executeSelectGrid: function(query) {
        const command = this.initCommand(query);
        const recordSet = command.Execute();
        this.dataSet = this.getGridData(recordSet);
        return this;
    },
    getData: function(rs) {
        const dataSet = {
            error: true,
            count: 0,
            name: new Array(),
            data: new Array()
        };
        for(let i = 0; i < rs.Fields.Count; i++) {
            dataSet.name.push(rs.Fields(i).Name);
        }
        while(!rs.EOF && dataSet.count <= 1000000) {
            const valueStack = new Array();
            for(let i = 0; i < rs.Fields.Count; i++) {
                valueStack.push(rs.Fields(i).Value);
            }
            dataSet.data.push(valueStack);
            dataSet.count += 1;
            rs.MoveNext();
        }
        rs.Close();
        dataSet.error = false;
        return dataSet;
    },
    getGridData: function(rs) {
        const dataSet = {
            error: true,
            count: 0,
            name: new Array(),
            data: new Array()
        };
        for(let i = 0; i < rs.Fields.Count; i++) {
            const columnName = rs.Fields(i).Name;
            const field = columnName.replace(new RegExp(SIGN.ws, "g"), SIGN.none);
            const obj = {
                field: field,
                caption: columnName,
                sortable: true
            };
            dataSet.name.push(obj);
        }
        while(!rs.EOF && dataSet.count <= 1000000) {
            const valueObj = new Object();
            valueObj.recid = dataSet.count + 1;
            for(let i = 0; i < rs.Fields.Count; i++) {
                valueObj[dataSet.name[i].field] = rs.Fields(i).Value;
            }
            dataSet.data.push(valueObj);
            dataSet.count += 1;
            rs.MoveNext();
        }
        rs.Close();
        dataSet.error = false;
        return dataSet;
    },
    commit: function() {
        this.driver.CommitTrans();
        this.close();
        return this;
    },
    rollback: function() {
        this.driver.RollbackTrans();
        this.close();
        return this;
    },
    cancel: function() {
        this.command.Cancel();
        this.close();
        return this;
    },
    close: function() {
        this.driver.Close();
        this.driver = null;
        this.command = null;
        this.type = null;
        return null;
    },
    onEnd: function(condition, callback, bindParam) {
        if(condition) {
            if(!callback) {
                this.close();
            }
            else {
                callback(bindParam);
            }
        }
        return this;
    },
    setParameter: function() {
        const _this = this;
        const types = _this.Define.TYPES;
        const commandType = types.command;
        const command = _this.command;
        const argumentsList = Array.prototype.slice.call(arguments);
        command.Parameters.Refresh();
        argumentsList.forEach(function(item, i) {
            command.Parameters.Append(command.CreateParameter("?", commandType.adVarWChar, commandType.adParamInput, 100, item));
        });
        return this;
    }
};
