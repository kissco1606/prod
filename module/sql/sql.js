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
                deleteDataCard: "delete-data-card",
                createUserCard: "create-user-card",
                lincErrorResolutionCard: "linc-error-resolution-card",
                policyNumberFrom: "policy-number__from",
                policyNumberFromTextarea: "policy-number__from__textarea",
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
                optionTemplateNB: "option-template__nb"
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
                optionTemplateTab: "option-template-tab"
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
            deleteData: "Delete Data",
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
            load: "load",
            birthday: "birthday",
            id: "id",
            extractMode: "Extract Mode",
            extractGroup: "Extract Group",
            single: "single",
            multiple: "multiple",
            skei: "skei",
            kkanri: "kkanri",
            hksiharai: "hksiharai",
            deleteMode: "Delete Mode",
            deleteGroup: "Delete Group",
            include: "include",
            exclude: "exclude"
        },
        TYPES: {
            toolId: {
                queryCommand: "queryCommand",
                dataCopy: "dataCopy",
                deleteData: "deleteData",
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
                    import: "import",
                    insert: "insert",
                    commit: "commit",
                    complete: "complete"
                },
                deleteData: {
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
            },
            design: {
                dataCopy: {
                    extractMode: {
                        single: "single",
                        multiple: "multiple"
                    },
                    extractGroup: {
                        skei: "skei",
                        kkanri: "kkanri",
                        hksiharai: "hksiharai",
                        option: "option"
                    },
                    extractExecTypes: {
                        import: "import"
                    }
                },
                deleteData: {
                    deleteMode: {
                        include: "include",
                        exclude: "exclude"
                    },
                    deleteGroup: {
                        skei: "skei",
                        kkanri: "kkanri",
                        hksiharai: "hksiharai",
                        option: "option"
                    },
                    option: {
                        backup: "backup"
                    }
                }
            }
        },
        MESSAGES: {
            locking_transaction: "Locking by other transaction",
            only_exec_select_query: "Can be excute only [SELECT] query",
            already_exits_name: "Already exists name"
        }
    };
    this.design = {
        dataCopy: {
            extractModeRadio: {
                name: "data-copy__extract-mode-radiobox",
                type: {
                    single: {
                        label: upperCase(this.Define.CAPTIONS.single, 0),
                        id: "data-copy__extract-mode-single",
                        value: this.Define.TYPES.design.dataCopy.extractMode.single,
                        isChecked: true
                    },
                    multiple: {
                        label: upperCase(this.Define.CAPTIONS.multiple, 0),
                        id: "data-copy__extract-mode-multiple",
                        value: this.Define.TYPES.design.dataCopy.extractMode.multiple,
                        isChecked: false
                    }
                }
            },
            extractGroupCheck: {
                name: "data-copy__extract-group-checkbox",
                type: {
                    skei: {
                        label: this.Define.CAPTIONS.skei,
                        id: "data-copy__extract-group-cb-skei",
                        value: this.Define.TYPES.design.dataCopy.extractGroup.skei,
                        isChecked: true
                    },
                    kkanri: {
                        label: this.Define.CAPTIONS.kkanri,
                        id: "data-copy__extract-group-cb-kkanri",
                        value: this.Define.TYPES.design.dataCopy.extractGroup.kkanri,
                        isChecked: false
                    },
                    hksiharai: {
                        label: this.Define.CAPTIONS.hksiharai,
                        id: "data-copy__extract-group-cb-hksiharai",
                        value: this.Define.TYPES.design.dataCopy.extractGroup.hksiharai,
                        isChecked: false
                    }
                }
            }
        },
        deleteData: {
            deleteModeRadio: {
                name: "delete-data__delete-mode-radiobox",
                type: {
                    include: {
                        label: upperCase(this.Define.CAPTIONS.include, 0),
                        id: "delete-data__delete-mode-include",
                        value: this.Define.TYPES.design.deleteData.deleteMode.include,
                        isChecked: true
                    },
                    exclude: {
                        label: upperCase(this.Define.CAPTIONS.exclude, 0),
                        id: "delete-data__delete-mode-exclude",
                        value: this.Define.TYPES.design.deleteData.deleteMode.exclude,
                        isChecked: false
                    }
                }
            },
            deleteGroupCheck: {
                name: "delete-data__delete-group-checkbox",
                type: {
                    skei: {
                        label: this.Define.CAPTIONS.skei,
                        id: "delete-data__delete-group-cb-skei",
                        value: this.Define.TYPES.design.deleteData.deleteGroup.skei,
                        isChecked: true
                    },
                    kkanri: {
                        label: this.Define.CAPTIONS.kkanri,
                        id: "delete-data__delete-group-cb-kkanri",
                        value: this.Define.TYPES.design.deleteData.deleteGroup.kkanri,
                        isChecked: false
                    },
                    hksiharai: {
                        label: this.Define.CAPTIONS.hksiharai,
                        id: "delete-data__delete-group-cb-hksiharai",
                        value: this.Define.TYPES.design.deleteData.deleteGroup.hksiharai,
                        isChecked: false
                    }
                }
            },
            optionCheck: {
                name: "delete-data__option-checkbox",
                type: {
                    backup: {
                        label: this.Define.CAPTIONS.backup,
                        id: "delete-data__option-cb-backup",
                        value: this.Define.TYPES.design.deleteData.option.backup,
                        isChecked: false
                    }
                }
            }
        }
    };
    this.event = {
        dataCopy: {
            status: {
                extractMode: this.Define.TYPES.design.dataCopy.extractMode.single
            },
            element: {
                extractMode: concatString("input[name=", this.design.dataCopy.extractModeRadio.name, "]"),
                extractGroup: concatString("input[name=", this.design.dataCopy.extractGroupCheck.name, "]"),
                extractGroupChecked: concatString("input[name=", this.design.dataCopy.extractGroupCheck.name, "]:checked"),
                sid: null,
                uid: null,
                pwd: null,
                pnf: null,
                pnft: null,
                pnt: null
            },
            handler: {
               a: null
            }
        },
        deleteData: {
            element: {
                deleteMode: concatString("input[name=", this.design.deleteData.deleteModeRadio.name, "]"),
                deleteModeChecked: concatString("input[name=", this.design.deleteData.deleteModeRadio.name, "]:checked"),
                deleteGroup: concatString("input[name=", this.design.deleteData.deleteGroupCheck.name, "]"),
                deleteGroupChecked: concatString("input[name=", this.design.deleteData.deleteGroupCheck.name, "]:checked"),
                option: concatString("input[name=", this.design.deleteData.optionCheck.name, "]"),
                optionChecked: concatString("input[name=", this.design.deleteData.optionCheck.name, "]:checked"),
                pn: null
            }
        },
        createUser: {
            element: {
                userCode: null,
                userName: null
            }
        },
        lincErrorResolution: {
            element: {
                pn: null
            }
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
        deleteData: new Object(),
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
    createInfoObject: function(value, name) {
        return {
            value: value,
            name: name
        };
    },
    setElementDisable: function(e, prop) {
        const disableList = prop.disableList;
        const readonlyList = prop.readonlyList;
        const convert = function(elementString) {
            return $(elementString);
        };
        Object.keys(e).forEach(function(key) {
            if(disableList.indexOf(key) < 0 && readonlyList.indexOf(key) < 0) return;
            if(disableList.indexOf(key) >= 0) {
                const item = convert(e[key]);
                const eb = new ElementBuilder(item);
                eb.setDisable();
            }
            else {
                const item = e[key];
                const eb = new ElementBuilder(item);
                eb.setReadonly();
            }
        });
        return null;
    },
    resetState: function(){
        const _event = this.event;
        const _state = this.state;
        const dataCopyEvent = _event.dataCopy;
        dataCopyEvent.status.extractMode = this.Define.TYPES.design.dataCopy.extractMode.single;
        dataCopyEvent.handler.a = null;
        _state.lock = new Object();
        _state.dataCopy = new Object();
        _state.deleteData = new Object();
        _state.createUser = new Object();
        _state.lincErrorResolution = new Object();
        _state.worker = null;
    },
    onAccess: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const pageType = _this.Define.TYPES.page;
        const loading = new Loading();
        loading.on().then(function() {
            const sid = _this.createInfoObject(jqById(seId.sid).val(), captions.sid);
            const uid = _this.createInfoObject(jqById(seId.uid).val(), captions.uid);
            const pwd = _this.createInfoObject(jqById(seId.pwd).val(), captions.pwd);
            const v = new Validation();
            const vTypes = v.getTypes();
            const sidLayout = v.getLayout(v.initLayout(sid.value, sid.name), [vTypes.required, vTypes.notSpace]);
            const uidLayout = v.getLayout(v.initLayout(uid.value, uid.name), [vTypes.required, vTypes.notSpace]);
            const pwdLayout = v.getLayout(v.initLayout(pwd.value, pwd.name), [vTypes.required, vTypes.notSpace]);
            v.reset().appendList([sidLayout, uidLayout, pwdLayout]);
            const result = v.exec();
            if(result.error) {
                new Notification().error().open(result.message);
                loading.off();
                return false;
            }
            const info = {
                sid: sid,
                uid: uid,
                pwd: pwd
            };
            // new DBUtils().connect(info).close();
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
        _this.resetState();
        _this.state.isConnecting = false;
        _this.state.info = new Object();
        _this.transition(pageType.access);
        return null;
    },
    pushQueryLog: function(list, query) {
        list.push(concatString(query, SIGN.sc));
        // const timeLog = concatString("-- # > Executed query at ", getSystemDateTimeMilliseconds());
        // list.push(timeLog);
        return null;
    },
    downloadLog: function(toolId) {
        const logData = this.state[toolId].log;
        const toolName = upperCase(toolId, 0);
        saveAsFile(logData.join(SIGN.crlf), TYPES.file.mime.TEXT_UTF8, concatString(toolName, "_Log_", getFileStamp(), TYPES.file.extension.txt));
        return null;
    },
    setPage: function(type) {
        const _this = this;
        const pageType = _this.Define.TYPES.page;
        const seId = _this.Define.ELEMENTS.id;
        const seSrc = _this.Define.ELEMENTS.src;
        const captions = _this.Define.CAPTIONS;
        const _event = _this.event;
        const dataCopyEvent = _event.dataCopy;
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
                        contents: _this.buildDataCopy()
                    },
                    {
                        id: seId.deleteDataCard,
                        title: captions.deleteData,
                        contents: _this.buildDeleteData()
                    },
                    {
                        id: seId.createUserCard,
                        title: captions.createUser,
                        contents: _this.buildCreateUser()
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
                dataCopyEvent.handler.a();
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
        const captions = _this.Define.CAPTIONS;
        const messages = _this.Define.MESSAGES;
        const title = captions.accessList;
        const sAccessList = STRUCTURE.accessList;
        const eb = new ElementBuilder();
        const itf = new Interface(sAccessList).setRoot(store.init());
        const dialog = new Dialog();
        const $container = jqNode("div", { id: eId.interfaceListContainer });
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
                    const info = dAL[key];
                    const $li = jqNode("li");
                    $li.click(function(e) {
                        e.stopPropagation();
                        apply(info);
                    });
                    const $viewArea = jqNode("div", { class: eClass.viewArea });
                    const $viewTable = jqNode("table");
                    const $colgroup = jqNode("colgroup");
                    const $viewHeader = jqNode("thead");
                    const $viewBody = jqNode("tbody");
                    const $nameRow = jqNode("tr");
                    const $nameCell = jqNode("th", { colspan: "3" }).text(info.name);
                    $nameRow.append($nameCell).appendTo($viewHeader);
                    const colgroupSizeStack = [100, 10, null];
                    colgroupSizeStack.forEach(function(size) {
                        $col = jqNode("col");
                        if(size) $col.attr({ width: size });
                        $colgroup.append($col);
                    });
                    const infoObj = {
                        0: { label: captions.sid },
                        1: { label: captions.uid },
                        2: { label: captions.pwd }
                    };
                    [info.sid, info.uid, info.pwd].forEach(function(item, i) {
                        const label = infoObj[i].label;
                        const $infoRow = jqNode("tr");
                        const $labelCell = jqNode("td").text(upperCase(label));
                        const $middleCell = jqNode("td").text(SIGN.gc);
                        const $valueCell = jqNode("td").text(item);
                        eb.listAppend($infoRow, [$labelCell, $middleCell, $valueCell]);
                        $viewBody.append($infoRow);
                    });
                    eb.listAppend($viewTable, [$colgroup, $viewHeader, $viewBody]);
                    $viewArea.append($viewTable);
                    const $actionArea = jqNode("div", { class: eClass.actionArea });
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
                const $container = jqNode("div", { class: eClass.interfaceListAddContainer });
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
                const name = _this.createInfoObject(eventInjector.name.val(), upperCase(captions.name));
                const sid = _this.createInfoObject(eventInjector.sid.val(), captions.sid);
                const uid = _this.createInfoObject(eventInjector.uid.val(), captions.uid);
                const pwd = _this.createInfoObject(eventInjector.pwd.val(), captions.pwd);
                const v = new Validation();
                const vTypes = v.getTypes();
                const nameLayout = v.getLayout(v.initLayout(name.value, name.name), [vTypes.required, vTypes.notSpace]);
                const sidLayout = v.getLayout(v.initLayout(sid.value, sid.name), [vTypes.required, vTypes.notSpace]);
                const uidLayout = v.getLayout(v.initLayout(uid.value, uid.name), [vTypes.required, vTypes.notSpace]);
                const pwdLayout = v.getLayout(v.initLayout(pwd.value, pwd.name), [vTypes.required, vTypes.notSpace]);
                v.reset().appendList([nameLayout, sidLayout, uidLayout, pwdLayout]);
                const result = v.exec();
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
        const $cancelButton = jqNode("button", { class: classes(eClass.buttonColorOrange, eClass.disable) }).text(upperCase(captions.cancel));
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
                const value = editor.getValue();
                const selection = editor.getSession().doc.getTextRange(editor.selection.getRange());
                const query = selection ? selection : value;
                _this.execQuery(query);
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
                    const value = editor.getValue();
                    const selection = editor.getSession().doc.getTextRange(editor.selection.getRange());
                    const query = selection ? selection : value;
                    _this.execQuery(query);
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
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $timer = jqById(seId.queryTimer);
        switch(phase) {
            case phaseType.executing: {
                const getTimerView = function(time) {
                    return concatString("Elapsed time : ", time, "sec");
                };
                qcState.element.removeClass(eClass.disable);
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
                    qcState.element.addClass(eClass.disable);
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
        _this.actionControllerQueryCommand(null);
        return null;
    },
    execQuery: function(query) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const messages = _this.Define.MESSAGES;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.queryCommand;
        const qcState = _this.state.queryCommand;
        if(isVoid(query)) {
            new Notification().error().open("Not found query");
            return false;
        }
        try {
            const exceptionRule = new RegExp("(((INSERT INTO))|((UPDATE).+?(SET))|((DELETE FROM))|(CREATE TABLE)|(DROP TABLE)|(TRUNCATE TABLE))", "gi");
            if(exceptionRule.test(query)) {
                new Notification().error().open(messages.only_exec_select_query);
                return false;
            }
            const queryStack = getExistArray(query.split(SIGN.sc).map(function(item) { return item.trim().replace(new RegExp("\r\nSELECT", "g"), "SELECT"); }));
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
    buildDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const dcdt = types.design.dataCopy;
        const dataCopyDesign = _this.design.dataCopy;
        const _event = _this.event;
        const dataCopyEvent = _event.dataCopy;
        const eb = new ElementBuilder();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $loadButton = jqNode("button", { class: eClass.flatButton }).append(eb.getFontAwesomeIcon(eIcon.listAlt));
        const $checkButton = jqNode("button", { class: eClass.buttonColorBrown }).text(upperCase(captions.check));
        const $extractButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.extract));
        const $importButton = jqNode("button", { class: eClass.buttonColorCyan }).text(upperCase(captions.import));
        eb.listAppend($actionArea, [$loadButton, $checkButton, $extractButton, $importButton]);
        $container.append($actionArea);
        const emr = dataCopyDesign.extractModeRadio;
        const egc = dataCopyDesign.extractGroupCheck;
        const getItemListObject = function(ds, type, optionClass) {
            return {
                label: ds.type[type].label,
                attributes: {
                    id: ds.type[type].id,
                    name: ds.name,
                    value: ds.type[type].value
                },
                isChecked: ds.type[type].isChecked,
                optionClass: optionClass ? optionClass : SIGN.none
            };
        };
        const extractModeRadioItemList = [getItemListObject(emr, dcdt.extractMode.single), getItemListObject(emr, dcdt.extractMode.multiple)];
        const $emrCommandArea = jqNode("div", { class: seClass.commandArea });
        const $emrItem = eb.createRadio(extractModeRadioItemList).getItem();
        const $emrLabel = jqNode("label").css("line-height", "2.5").text(captions.extractMode);
        const $emrMain = jqNode("div", { class: eClass.fullWidth }).append($emrItem);
        eb.listAppend($emrCommandArea, [$emrLabel, $emrMain]);
        const extractGroupCheckItemList = [getItemListObject(egc, dcdt.extractGroup.skei), getItemListObject(egc, dcdt.extractGroup.kkanri), getItemListObject(egc, dcdt.extractGroup.hksiharai)];
        const $egcCommandArea = jqNode("div", { class: seClass.commandArea });
        const $egcItem = eb.createCheckbox(extractGroupCheckItemList).getItem();
        const $egcLabel = jqNode("label").css("line-height", "2.5").text(captions.extractGroup);
        const $egcMain = jqNode("div", { class: eClass.fullWidth }).append($egcItem);
        eb.listAppend($egcCommandArea, [$egcLabel, $egcMain]);
        eb.listAppend($container, [$emrCommandArea, $egcCommandArea]);
        const setEvent = function() {
            const initInputType = function(mode) {
                switch(mode) {
                    case emr.type.single.value: {
                        jqById(seId.policyNumberFrom).parent().removeClass(eClass.hide);
                        jqById(seId.policyNumberFromTextarea).parent().addClass(eClass.hide);
                        break;
                    }
                    case emr.type.multiple.value: {
                        jqById(seId.policyNumberFrom).parent().addClass(eClass.hide);
                        jqById(seId.policyNumberFromTextarea).parent().removeClass(eClass.hide);
                        break;
                    }
                }
            };
            const emrElement = dataCopyEvent.element.extractMode;
            new EventHandler($(emrElement)).addEvent("change", function(e) {
                const target = e.target;
                dataCopyEvent.status.extractMode = target.value;
                initInputType(target.value);
            });
            initInputType(dataCopyEvent.status.extractMode);
        };
        dataCopyEvent.handler.a = setEvent;
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
                label: captions.policyNumberFrom,
                inputType: "textarea",
                inputId: seId.policyNumberFromTextarea,
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
            switch(item.inputId) {
                case seId.subSid: {
                    dataCopyEvent.element.sid = $input;
                    break;
                }
                case seId.subUid: {
                    dataCopyEvent.element.uid = $input;
                    break;
                }
                case seId.subPwd: {
                    dataCopyEvent.element.pwd = $input;
                    break;
                }
                case seId.policyNumberFrom: {
                    dataCopyEvent.element.pnf = $input;
                    break;
                }
                case seId.policyNumberFromTextarea: {
                    dataCopyEvent.element.pnft = $input;
                    break;
                }
                case seId.policyNumberTo: {
                    dataCopyEvent.element.pnt = $input;
                    break;
                }
            }
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
        const _event = _this.event;
        const dataCopyEvent = _event.dataCopy;
        const $card = jqById(seId.dataCopyCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $checkButton = jqNode("button", { class: eClass.buttonColorBrown }).text(upperCase(captions.check));
        const $extractButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.extract));
        const $insertButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.insert));
        const $optionButton = jqNode("button", { class: eClass.buttonColorEnergized }).text(upperCase(captions.option));
        const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
        const $rollbackButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.rollback));
        const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
        const $exportButton = jqNode("button", { class: eClass.buttonColorCalm }).text(upperCase(captions.export));
        const $backupButton = jqNode("button", { class: eClass.buttonColorRoyal }).text(upperCase(captions.backup));
        const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
        const propOption = {
            disableList: new Array(),
            readonlyList: new Array()
        };
        let itemList = new Array();
        switch(phase) {
            case phaseType.import: {
                itemList = [$checkButton, $extractButton, $resetButton];
                propOption.disableList = ["extractMode"];
                propOption.readonlyList = ["sid", "uid", "pwd"];
                _this.setElementDisable(dataCopyEvent.element, propOption);
                break;
            }
            case phaseType.insert: {
                itemList = [$insertButton, $optionButton, $exportButton, $backupButton, $resetButton];
                propOption.disableList = ["extractMode", "extractGroup"];
                propOption.readonlyList = ["sid", "uid", "pwd", "pnf", "pnft", "pnt"];
                _this.setElementDisable(dataCopyEvent.element, propOption);
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
        $checkButton.click(function() {
            _this.checkDataCopy();
        });
        $extractButton.click(function() {
            _this.extractDataCopy(phase);
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
            new Notification().complete().open("Data copy successfully");
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
            $cardContents.html(_this.buildDataCopy());
            dataCopyEvent.status.extractMode = types.design.dataCopy.extractMode.single;
            dataCopyEvent.handler.a();
        });
        return null;
    },
    backupDataCopy: function() {
        const _this = this;
        const extractedData = _this.state.dataCopy.extractedData;
        const fileDefine = TYPES.file;
        const parts = JSON.stringify(extractedData);
        const fileName = concatString(["Backup", getFileStamp()].join("_"), fileDefine.extension.txt);
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
            new FileController().setListener().allowedExtensions([TYPES.file.mime.TEXT]).access(onReadFile);
        });
        new Dialog().setContents(upperCase(captions.option, 0), optionContents, option).setButton([$import, $export, $templateButton]).open(callback);
        return null;
    },
    openTemplateDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const template = _this.export.dataCopy.template;
        const dataCopyState = _this.state.dataCopy;
        const extractTableList = _this.getExtractTableListDataCopy(dataCopyState.ref.extractGroupStack);
        const etLowerList = extractTableList.map(mapLowerCase);
        const $templateContainer = jqNode("div", { class: seClass.optionTemplateContainer });
        const $pannel = jqNode("div", { class: seClass.optionTemplatePannel });
        const $closeButton = jqNode("div", { class: seClass.optionTemplateClose });
        const $closeIcon = jqNode("i", { class: eIcon.timesCircle });
        $closeIcon.click(function() { $templateContainer.remove(); });
        $closeButton.append($closeIcon);
        $pannel.append($closeButton);
        const applyTemplate = function(menu) {
            const exec = function(viewerClose, data, state) {
                const $optionContainer = jqById(seId.optionContainerDataCopy);
                const $commandLines = $optionContainer.find(concatString(".", seClass.commandLine));
                const option = new Array();
                $commandLines.each(function(i, item) {
                    const $input = $(item).find("input");
                    const $textarea = $(item).find("textarea");
                    const table = _this.createInfoObject($input.val());
                    const script = _this.createInfoObject($textarea.val());
                    option.push({ table: table.value, script: script.value });
                });
                const result = {
                    error: false,
                    message: new Array()
                };
                const templateStack = new Array();
                const sb = new StringBuilder();
                template[menu].forEach(function(item) {
                    if(!item.enable || etLowerList.indexOf(lowerCase(item.table)) < 0) return;
                    const scriptInfo = {
                        isExist: false,
                        data: new Array()
                    };
                    item.columns.forEach(function(c) {
                        let cData = concatString("@", c);
                        const prop = accessObjectProperty(data, [item.table, c]);
                        if(!isVoid(prop)) {
                            scriptInfo.isExist = true;
                            cData = concatString(cData, SIGN.nl, prop);
                        }
                        scriptInfo.data.push(cData);
                    });
                    if(!scriptInfo.isExist) return;
                    const obj = {
                        table: item.table,
                        script: scriptInfo.data.join(SIGN.nl)
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
                if(typeIs(viewerClose).function) {
                    dataCopyState.template[menu] = state;
                    viewerClose();
                }
            };
            const flag = _this.optionTemplateAction(menu, exec, $templateContainer);
            if(!flag) return false;
            exec();
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
    optionTemplateAction: function(menu, sync, $templateContainer) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const dataCopyExport = _this.export.dataCopy;
        const exportTableListObject = dataCopyExport.tableListObject;
        const exportDefineSet = dataCopyExport.defineSet;
        const templateRules = dataCopyExport.templateRules;
        const dataCopyState = _this.state.dataCopy;
        const extractedData = dataCopyState.extractedData;
        const insertDataStatic = dataCopyState.insertDataStatic;
        const extractMap = dataCopyState.extractMap;
        const eb = new ElementBuilder();
        let continueFlag = true;
        if(isVoid(dataCopyState.template)) dataCopyState.template = new Object();
        switch(menu) {
            case "Name_Birth": {
                continueFlag = false;
                const oDB = new DBUtils();
                const rules = templateRules[menu];
                const toList = dataCopyState.toList;
                const tables = rules.tables;
                const isContractorAvailable = true;
                const def = {
                    target: {
                        insured: "insured",
                        contractor: "contractor",
                        customer: "customer",
                        contractorOnExist: "contractor_onExist",
                        receiver: "receiver",
                        requiredContractor: "required_contractor",
                        requiredContractorOnWeb: "required_contractor_onWeb",
                        requiredContractorOnWebOrPL: "required_contractor_onWebOrPaperLess"
                    },
                    injectorId: { increment: "increment" },
                    elements: {
                        increment: {
                            checkbox: {
                                name: "increment-checkbox",
                                label: "Auto increment",
                                id: "auto-increment-checkbox_id"
                            },
                            count: {
                                name: "increment-count",
                                label: "Count",
                                id: "auto-increment-count_id"
                            },
                            class: "increment"
                        },
                        name: {
                            labels: {
                                identifier: "Identifier",
                                id: "ID",
                                number: "Number",
                                digit: "Digit",
                                nameKana: "Name Kana",
                                nameKanji: "Name Kanji",
                                lastNameKana: "Last Name Kana",
                                firstNameKana: "First Name Kana",
                                lastNameKanji: "Last Name Kanji",
                                firstNameKanji: "First Name kanji"
                            },
                            ids: {
                                id: "name-id",
                                number: "name-number",
                                digit: "digit",
                                lastNameKana: "name-lastNameKana",
                                firstNameKana: "name-firstNameKana",
                                lastNameKanji: "name-lastNameKanji",
                                firstNameKanji: "name-firstNameKanji"
                            },
                            class: "name"
                        },
                        birthday: {
                            label: "Birthday",
                            id: "birthday",
                            class: "birth",
                            format: "YYYYMMDD"
                        }
                    },
                    keys: {
                        nameKana: "name_kana",
                        nameKanji: "name_kanji",
                        birthday: "birthday",
                        age: "age",
                        nameKanaL: "name_kana_l",
                        nameKanaF: "name_kana_f"
                    }
                };
                const initState = function() {
                    return {
                        increment: {
                            available: true,
                            count: SIGN.none
                        },
                        insured: {
                            name: {
                                id: SIGN.none,
                                number: SIGN.none,
                                digit: SIGN.none,
                                kana: { lastName: "ヒセイ", firstName: "ヒメイ" },
                                kanji: { lastName: "被姓", firstName: "被名" }
                            },
                            birthday: SIGN.none
                        },
                        contractor: {
                            name: {
                                id: SIGN.none,
                                number: SIGN.none,
                                digit: SIGN.none,
                                kana: { lastName: "ケイセイ", firstName: "ケイメイ" },
                                kanji: { lastName: "契姓", firstName: "契名" }
                            },
                            birthday: SIGN.none
                        }
                    };
                };
                const nbState = cloneJS(!isVoid(dataCopyState.template[menu]) ? dataCopyState.template[menu] : initState());
                const getAuth = function(id, w) { return concatString(id, SIGN.ub, w); };
                const executeList = isContractorAvailable ? [def.target.insured, def.target.contractor] : [def.target.insured];
                const elementInjector = new Object();
                const inputTypeDef = def.elements.inputType;
                const incrementDef = def.elements.increment;
                const nameDef = def.elements.name;
                const birthDef = def.elements.birthday;
                const $container = jqNode("div", { id: seId.optionTemplateNB });
                const $incrementSection = jqNode("div", { class: eClass.viewerSection }).css({ "padding-bottom": "20px" });
                const $incrementLine = jqNode("div", { class: classes(seClass.commandLine, incrementDef.class) });
                const incrementCheckboxItemList = [
                    {
                        label: incrementDef.checkbox.label,
                        attributes: {
                            id: incrementDef.checkbox.id,
                            name: incrementDef.checkbox.name,
                            value: SIGN.none
                        },
                        isChecked: nbState.increment.available,
                        optionClass: SIGN.none
                    }
                ];
                const $incrementCheckboxItem = eb.createCheckbox(incrementCheckboxItemList).getItem();
                const $incrementCountInput = jqNode("input", { id: incrementDef.count.id, class: eClass.applicationInput, placeholder: incrementDef.count.label, value: nbState.increment.count });
                $incrementCountInput.css({ "width": "50px", "margin-left": "10px", "margin-bottom": "5px" });
                new EventHandler($incrementCountInput).addInputEvent(function(e, value) {
                    const exp = new RegExpUtil(value);
                    if(!exp.isNumber() || exp.isOverflow(3)) return false;
                });
                $incrementSection.append(eb.listAppend($incrementLine, [$incrementCheckboxItem, $incrementCountInput]));
                elementInjector[def.injectorId.increment] = $incrementSection;
                eb.listAppend($container, [$incrementSection]);
                const buildContents = function() {
                    executeList.forEach(function(targetId) {
                        const state = nbState[targetId];
                        const $section = jqNode("div", { class: eClass.viewerSection });
                        const $title = jqNode("div", { class: eClass.sectionTitle }).text(upperCase(targetId, 0));
                        const $targetContainer = jqNode("div").css({ "padding-top": "10px" });
                        const $nameIdentifierLine = jqNode("div", { class: classes(seClass.commandLine, nameDef.class) });
                        const $nameIdentifierLabel = jqNode("label").text(nameDef.labels.identifier);
                        const $nameIdInput = jqNode("input", { id: getAuth(targetId, nameDef.ids.id), class: eClass.applicationInput, placeholder: nameDef.labels.id, value: state.name.id });
                        const $nameNumberInput = jqNode("input", { id: getAuth(targetId, nameDef.ids.number), class: eClass.applicationInput, placeholder: nameDef.labels.number, value: state.name.number }).css("width", "80px");
                        new EventHandler($nameNumberInput).addInputEvent(function(e, value) {
                            const exp = new RegExpUtil(value);
                            if(!exp.isNumberWithFullWidth() || exp.isOverflow(3)) return false;
                        });
                        const $digitInput = jqNode("input", { id: getAuth(targetId, nameDef.ids.digit), class: eClass.applicationInput, placeholder: nameDef.labels.digit, value: state.name.digit }).css("width", "80px");
                        new EventHandler($digitInput).addInputEvent(function(e, value) {
                            const exp = new RegExpUtil(value);
                            if(!exp.isNumberWithFullWidth() || exp.isOverflow(1) || toNumber(value) >= 4) return false;
                        });
                        eb.listAppend($nameIdentifierLine, [$nameIdentifierLabel, $nameIdInput, $nameNumberInput, $digitInput]);
                        const $nameKanaLine = jqNode("div", { class: classes(seClass.commandLine, nameDef.class) });
                        const $nameKanaLabel = jqNode("label").text(nameDef.labels.nameKana);
                        const $nameKanaLastNameInput = jqNode("input", { id: getAuth(targetId, nameDef.ids.lastNameKana), class: eClass.applicationInput, placeholder: nameDef.labels.lastNameKana, value: state.name.kana.lastName });
                        const $nameKanaFirstNameInput = jqNode("input", { id: getAuth(targetId, nameDef.ids.firstNameKana), class: eClass.applicationInput, placeholder: nameDef.labels.firstNameKana, value: state.name.kana.firstName });
                        eb.listAppend($nameKanaLine, [$nameKanaLabel, $nameKanaLastNameInput, $nameKanaFirstNameInput]);
                        const $nameKanjiLine = jqNode("div", { class: classes(seClass.commandLine, nameDef.class) });
                        const $nameKanjiLabel = jqNode("label").text(nameDef.labels.nameKanji);
                        const $nameKanjiLastNameInput = jqNode("input", { id: getAuth(targetId, nameDef.ids.lastNameKanji), class: eClass.applicationInput, placeholder: nameDef.labels.lastNameKanji, value: state.name.kanji.lastName });
                        const $nameKanjiFirstNameInput = jqNode("input", { id: getAuth(targetId, nameDef.ids.firstNameKanji), class: eClass.applicationInput, placeholder: nameDef.labels.firstNameKanji, value: state.name.kanji.firstName });
                        eb.listAppend($nameKanjiLine, [$nameKanjiLabel, $nameKanjiLastNameInput, $nameKanjiFirstNameInput]);
                        const $birthLine = jqNode("div", { class: classes(seClass.commandLine, birthDef.class) });
                        const $birthLabel = jqNode("label").text(birthDef.label);
                        const $birthInput = jqNode("textarea", { id: getAuth(targetId, birthDef.id), class: eClass.applicationTextarea, placeholder: birthDef.format }).val(state.birthday);
                        eb.listAppend($birthLine, [$birthLabel, $birthInput]);
                        eb.listAppend($targetContainer, [$nameIdentifierLine, $nameKanaLine, $nameKanjiLine, $birthLine]);
                        elementInjector[targetId] = $targetContainer;
                        $container.append(eb.listAppend($section, [$title, $targetContainer]));
                    });
                };
                const initIncrementCount = function($element) {
                    if(!$element) return false;
                    const available = nbState.increment.available;
                    if(available) $element.addClass(eClass.readonly).prop("readonly", true);
                    else $element.removeClass(eClass.readonly).prop("readonly", false);
                };
                const setEvent = function() {
                    executeList.forEach(function(targetId) {
                        const incrementCheckboxElement = concatString("input[name=", incrementDef.checkbox.name, "]");
                        new EventHandler($(incrementCheckboxElement)).addEvent("change", function(e) {
                            const target = e.target;
                            const available = target.checked;
                            nbState.increment.available = available;
                            const $incrementCountInput = jqById(incrementDef.count.id);
                            initIncrementCount($incrementCountInput);
                        });
                    });
                };
                const callback = function(viewerClose) {
                    try {
                        const keys = def.keys;
                        const edst = exportDefineSet.table;
                        const edsc = exportDefineSet.column;
                        const edsbt = exportDefineSet.baseTable;
                        const edswg = exportDefineSet.wg;
                        const edsukt = exportDefineSet.ukt;
                        const sb = new StringBuilder();
                        const templatePrintObject = new Object();
                        nbState.increment.count = jqById(incrementDef.count.id).val();
                        executeList.forEach(function(targetId) {
                            nbState[targetId].name.id = jqById(getAuth(targetId, nameDef.ids.id)).val();
                            nbState[targetId].name.number = jqById(getAuth(targetId, nameDef.ids.number)).val();
                            nbState[targetId].name.digit = jqById(getAuth(targetId, nameDef.ids.digit)).val();
                            nbState[targetId].name.kana.lastName = jqById(getAuth(targetId, nameDef.ids.lastNameKana)).val();
                            nbState[targetId].name.kana.firstName = jqById(getAuth(targetId, nameDef.ids.firstNameKana)).val();
                            nbState[targetId].name.kanji.lastName = jqById(getAuth(targetId, nameDef.ids.lastNameKanji)).val();
                            nbState[targetId].name.kanji.firstName = jqById(getAuth(targetId, nameDef.ids.firstNameKanji)).val();
                            nbState[targetId].birthday = jqById(getAuth(targetId, birthDef.id)).val();
                        });
                        const getState = function(targetId) {
                            return nbState[targetId];
                        };
                        const targetState = {
                            insured: getState(def.target.insured),
                            contractor: getState(def.target.contractor)
                        };
                        const calcAge = function(inputDate, submissionDate) {
                            if(isVoid(inputDate)) return SIGN.none;
                            const exp = new RegExpUtil(submissionDate);
                            if(!exp.isYYYYMMDD()) {
                                throw new Error("Submission date format is invalid");
                            }
                            const inYear = Number(inputDate.substr(0, 4));
                            const inMonth = Number(inputDate.substr(4, 2));
                            const inDate = Number(inputDate.substr(6, 2));
                            const smYear = Number(submissionDate.substr(0, 4));
                            const smMonth = Number(submissionDate.substr(4, 2));
                            const smDate = Number(submissionDate.substr(6, 2));
                            const calcY = smYear - inYear;
                            const calcM = smMonth - inMonth;
                            const calcD = smDate - inDate;
                            if(calcY < 0) return null;
                            else if(calcY <= 0) {
                                if(calcM < 0) return null;
                                if(calcM === 0 && calcD < 0) return null;
                            }
                            if(calcM > 0) return String(calcY);
                            if(calcD > 0) {
                                if(calcY === 0) return String(calcY);
                                return String(calcY - 1);
                            }
                            return String(calcY);
                        };
                        const v = new Validation();
                        const vTypes = v.getTypes();
                        const checkAllResult = {
                            error: false,
                            messageList: new Array()
                        };
                        const increment = nbState.increment;
                        if(!increment.available) {
                            const incrementCount = _this.createInfoObject(increment.count, incrementDef.count.label);
                            const outOfRangeValidate = function() {
                                const actionLayout = v.getActionLayout();
                                if(Number(increment.count) > toList.length) {
                                    actionLayout.error = true;
                                    actionLayout.message = concatString(incrementDef.count.label, " is out of range");
                                }
                                return actionLayout;
                            };
                            const actionObj = { "outOfRange": outOfRangeValidate };
                            const incrementCountLayout = v.getLayout(v.initLayout(incrementCount.value, incrementCount.name), [vTypes.required, vTypes.notSpace, vTypes.numeric, "outOfRange"], actionObj);
                            const result = v.reset().append(incrementCountLayout).exec();
                            if(result.error) {
                                checkAllResult.error = true;
                                checkAllResult.messageList.push(result.message);
                            }
                        }
                        const checkValueObject = createMultipleObject([[def.target.insured, new Array()], [def.target.contractor, new Array()]]);
                        executeList.forEach(function(targetId) {
                            const state = nbState[targetId];
                            v.reset();
                            const checkList = [
                                {
                                    label: concatString(nameDef.labels.identifier, " > ", nameDef.labels.id),
                                    value: state.name.id,
                                    type: nameDef.ids.id
                                },
                                {
                                    label: concatString(nameDef.labels.identifier, " > ", nameDef.labels.number),
                                    value: state.name.number,
                                    type: nameDef.ids.number
                                },
                                {
                                    label: concatString(nameDef.labels.identifier, " > ", nameDef.labels.digit),
                                    value: state.name.digit,
                                    type: nameDef.ids.digit
                                },
                                {
                                    label: concatString(nameDef.labels.nameKana, " > ", nameDef.labels.lastNameKana),
                                    value: state.name.kana.lastName,
                                    type: nameDef.ids.lastNameKana
                                },
                                {
                                    label: concatString(nameDef.labels.nameKana, " > ", nameDef.labels.firstNameKana),
                                    value: state.name.kana.firstName,
                                    type: nameDef.ids.firstNameKana
                                },
                                {
                                    label: concatString(nameDef.labels.nameKanji, " > ", nameDef.labels.lastNameKanji),
                                    value: state.name.kanji.lastName,
                                    type: nameDef.ids.lastNameKanji
                                },
                                {
                                    label: concatString(nameDef.labels.nameKanji, " > ", nameDef.labels.firstNameKanji),
                                    value: state.name.kanji.firstName,
                                    type: nameDef.ids.firstNameKanji
                                },
                                {
                                    label: birthDef.label,
                                    value: state.birthday,
                                    type: birthDef.id
                                }
                            ];
                            checkList.forEach(function(item, i) {
                                let layout = null;
                                if(item.type === nameDef.ids.number || item.type === nameDef.ids.digit) {
                                    layout = v.getLayout(v.initLayout(item.value, item.label), [vTypes.notSpace, vTypes.numeric]);
                                }
                                else if(item.type === birthDef.id) {
                                    const formatValidate = function() {
                                        const actionLayout = v.getActionLayout();
                                        item.value.split(SIGN.nl).forEach(function(bd, j) {
                                            if(!isVoid(bd)) {
                                                const exp = new RegExpUtil(bd);
                                                const fromKey = extractMap[Object.keys(extractMap)[j]];
                                                if(isVoid(fromKey)) {
                                                    return;
                                                }
                                                const mosKihonData = oDB.where(extractedData[fromKey], edst.mosKihon);
                                                const submissionDate = mosKihonData.ref[edsc.mosYmd][0];
                                                if(!exp.isYYYYMMDD()) {
                                                    actionLayout.error = true;
                                                    actionLayout.message = concatString("[Line:", j + 1, "]", item.label, " format is not valid");
                                                }
                                                else if(typeIs(calcAge(bd, submissionDate)).null) {
                                                    actionLayout.error = true;
                                                    actionLayout.message = concatString("[Line:", j + 1, "]", item.label, " is over the submission date(", submissionDate, ")");
                                                }
                                            }
                                        });
                                        return actionLayout;
                                    };
                                    const actionObj = { "format": formatValidate };
                                    layout = v.getLayout(v.initLayout(item.value, item.label), [vTypes.notSpace, vTypes.numericWithLineBreak, "format"], actionObj);
                                }
                                else {
                                    layout = v.getLayout(v.initLayout(item.value, item.label), [vTypes.notSpace]);
                                }
                                v.append(layout);
                                if(item.type === nameDef.ids.id || item.type === nameDef.ids.number || item.type === birthDef.id) {
                                    const tValue = item.type === birthDef.id ? getExistArray(item.value.split(SIGN.nl)).join(SIGN.none) : item.value;
                                    checkValueObject[targetId].push(tValue);
                                }
                            });
                            const result = v.exec();
                            if(result.error) {
                                const targetLabel = concatString(SIGN.abs, upperCase(targetId, 0), SIGN.abe, SIGN.br);
                                checkAllResult.error = true;
                                checkAllResult.messageList.push(targetLabel + result.message);
                            }
                        });
                        if(checkAllResult.error) {
                            throw new Error(checkAllResult.messageList.join(concatString(SIGN.br, SIGN.br)));
                        }
                        else {
                            const generator = function(fromData, table, column, c, toIdx, tableSelData, kokykKanrenData, mosKihonData) {
                                const dataStack = new Array();
                                const type = c.type;
                                const target = c.target;
                                const separator = c.separator;
                                const wg = Object.keys(exportTableListObject).filter(function(key) {
                                    const tableList = exportTableListObject[key];
                                    if(tableList.map(mapLowerCase).indexOf(lowerCase(table)) >= 0) {
                                        return true;
                                    }
                                })[0];
                                const isCustomer = target === def.target.customer;
                                const keihiKbn = kokykKanrenData.ref[edsc.keihiKbn];
                                const isSameKeihi = keihiKbn.length === 1 && keihiKbn[0] == 3;
                                const mosKbn = Number(mosKihonData.ref[edsc.mosKbn][0]);
                                const isWeb = mosKbn === 4;
                                const isPaperLess = mosKbn === 5;
                                const setDataByKeihi = function(insuredData, contractorData) {
                                    if(isSameKeihi) {
                                        dataStack.push(insuredData);
                                    }
                                    else if(keihiKbn.length >= 2) {
                                        keihiKbn.forEach(function(kbn) {
                                            switch(Number(kbn)) {
                                                case 1: {
                                                    if(!isVoid(contractorData)) {
                                                        dataStack.push(contractorData);
                                                    }
                                                    break;
                                                }
                                                case 2: {
                                                    if(!isVoid(insuredData)) {
                                                        dataStack.push(insuredData);
                                                    }
                                                    break;
                                                }
                                            }
                                        });
                                    }
                                };
                                if([keys.nameKana, keys.nameKanji, keys.nameKanaF, keys.nameKanaL].indexOf(type) >= 0) {
                                    const getName = function(ti) {
                                        const state = targetState[ti];
                                        const getId = function() {
                                            const n = state.name.number;
                                            const d = isVoid(state.name.digit) ? 3 : state.name.digit;
                                            const num = isVoid(n) ? SIGN.none : setCharPadding(Number(n) + toIdx, d);
                                            return concatString(state.name.id, num);
                                        };
                                        const o = {
                                            identifier: getId(),
                                            lastName: SIGN.none,
                                            firstName: SIGN.none
                                        };
                                        switch(type) {
                                            case keys.nameKana: {
                                                o.lastName = concatString(o.identifier, state.name.kana.lastName);
                                                o.firstName = concatString(o.identifier, state.name.kana.firstName);
                                                break;
                                            }
                                            case keys.nameKanji: {
                                                o.lastName = concatString(o.identifier, state.name.kanji.lastName);
                                                o.firstName = concatString(o.identifier, state.name.kanji.firstName);
                                                break;
                                            }
                                            case keys.nameKanaF: {
                                                o.firstName = concatString(o.identifier, state.name.kana.firstName);
                                                break;
                                            }
                                            case keys.nameKanaL: {
                                                o.firstName = concatString(o.identifier, state.name.kana.lastName);
                                                break;
                                            }
                                        }
                                        const fullName = [o.lastName, o.firstName].join(separator);
                                        return toFullWidth(fullName);
                                    };
                                    const insuredName = getName(def.target.insured);
                                    const contractorName = getName(def.target.contractor);
                                    if(isCustomer) {
                                        setDataByKeihi(insuredName, contractorName);
                                    }
                                    else {
                                        const scData = tableSelData.ref[column];
                                        const pushData = function(data) {
                                            scData.forEach(function() {
                                                dataStack.push(data);
                                            });
                                        };
                                        switch(target) {
                                            case def.target.insured: {
                                                pushData(insuredName);
                                                break;
                                            }
                                            case def.target.contractor: {
                                                pushData(contractorName);
                                                break;
                                            }
                                            case def.target.contractorOnExist: {
                                                pushData(isSameKeihi ? SIGN.none : contractorName);
                                                break;
                                            }
                                            case def.target.receiver: {
                                                const uktSyuKbnList = tableSelData.ref[edsc.uktSyuKbn];
                                                const uktNameKana = edsukt.name.kana;
                                                const uktNameKanji = edsukt.name.kanji;
                                                const receiverStack = new Array();
                                                const getReceiverName = function(uktSyuKbn) {
                                                    const state = targetState[def.target.insured];
                                                    const getId = function() {
                                                        const n = state.name.number;
                                                        const d = isVoid(state.name.digit) ? 3 : state.name.digit;
                                                        const num = isVoid(n) ? SIGN.none : setCharPadding(Number(n) + toIdx, d);
                                                        return concatString(state.name.id, num);
                                                    };
                                                    const o = {
                                                        identifier: getId(),
                                                        lastName: SIGN.none,
                                                        firstName: SIGN.none
                                                    };
                                                    switch(type) {
                                                        case keys.nameKana: {
                                                            const lastName = uktNameKana.lastName[uktSyuKbn];
                                                            const firstName = uktNameKana.firstName[uktSyuKbn];
                                                            o.lastName = isVoid(lastName) ? SIGN.none : concatString(o.identifier, lastName);
                                                            o.firstName = isVoid(firstName) ? SIGN.none : concatString(o.identifier, firstName);
                                                            break;
                                                        }
                                                        case keys.nameKanji: {
                                                            const lastName = uktNameKanji.lastName[uktSyuKbn];
                                                            const firstName = uktNameKanji.firstName[uktSyuKbn];
                                                            o.lastName = isVoid(lastName) ? SIGN.none : concatString(o.identifier, lastName);
                                                            o.firstName = isVoid(firstName) ? SIGN.none : concatString(o.identifier, firstName);
                                                            break;
                                                        }
                                                    }
                                                    if(isVoid(o.lastName) || isVoid(o.firstName)) {
                                                        return SIGN.none;
                                                    }
                                                    const fullName = [o.lastName, o.firstName].join(separator);
                                                    return toFullWidth(fullName);
                                                };
                                                scData.forEach(function(item, i) {
                                                    const uktSyuKbn = !isVoid(c.uktSyuKbn) ? c.uktSyuKbn : uktSyuKbnList[i];
                                                    if(isVoid(item)) {
                                                        dataStack.push(item);
                                                        return;
                                                    }
                                                    dataStack.push(getReceiverName(uktSyuKbn));
                                                });
                                                break;
                                            }
                                            case def.target.requiredContractor: {
                                                pushData(isSameKeihi ? insuredName : contractorName);
                                                break;
                                            }
                                            case def.target.requiredContractorOnWeb: {
                                                if(isWeb) {
                                                    pushData(isSameKeihi ? insuredName : contractorName);
                                                }
                                                break;
                                            }
                                            case def.target.requiredContractorOnWebOrPL: {
                                                if(isWeb || isPaperLess) {
                                                    pushData(isSameKeihi ? insuredName : contractorName);
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                else if(type === keys.birthday) {
                                    const getBirthDay = function(ti) {
                                        switch(ti) {
                                            case def.target.requiredContractor: {
                                                ti = isSameKeihi ? def.target.insured : def.target.contractor;
                                                break;
                                            }
                                            case def.target.contractorOnExist: {
                                                ti = isSameKeihi ? SIGN.none : def.target.contractor;
                                                break;
                                            }
                                            case def.target.requiredContractorOnWeb: {
                                                if(isWeb) {
                                                    ti = isSameKeihi ? def.target.insured : def.target.contractor;
                                                }
                                                break;
                                            }
                                            case def.target.requiredContractorOnWebOrPL: {
                                                if(isWeb || isPaperLess) {
                                                    ti = isSameKeihi ? def.target.insured : def.target.contractor;
                                                }
                                                break;
                                            }
                                        }
                                        const state = targetState[ti];
                                        if(isVoid(state)) return null;
                                        const ba = state.birthday.split(SIGN.nl);
                                        return ba.length <= 0 ? SIGN.none : ba[toIdx];
                                    };
                                    if(isCustomer) {
                                        const insuredBirthday = getBirthDay(def.target.insured);
                                        const contractorBirthday = getBirthDay(def.target.contractor);
                                        setDataByKeihi(insuredBirthday, contractorBirthday);
                                    }
                                    else {
                                        dataStack.push(getBirthDay(target));
                                    }
                                }
                                else if(type === keys.age) {
                                    const submissionDate = mosKihonData.ref[edsc.mosYmd][0];
                                    const getAge = function(ti) {
                                        switch(ti) {
                                            case def.target.requiredContractor: {
                                                ti = isSameKeihi ? def.target.insured : def.target.contractor;
                                                break;
                                            }
                                            case def.target.contractorOnExist: {
                                                ti = isSameKeihi ? SIGN.none : def.target.contractor;
                                                break;
                                            }
                                        }
                                        const state = targetState[ti];
                                        if(isVoid(state)) return null;
                                        const ba = state.birthday.split(SIGN.nl);
                                        return ba.length <= 0 ? SIGN.none : calcAge(ba[toIdx], submissionDate);
                                    };
                                    if(isCustomer) {
                                        const insuredAge = getAge(def.target.insured);
                                        const contractorAge = getAge(def.target.contractor);
                                        setDataByKeihi(insuredAge, contractorAge);
                                    }
                                    else {
                                        dataStack.push(getAge(target, submissionDate));
                                    }
                                }
                                const mapFunc = function(item) {
                                    if(isVoid(item)) {
                                        return "$eq";
                                    }
                                    return item;
                                };
                                const convertedData = dataStack.map(mapFunc);
                                return convertedData.length >= 1 ? convertedData.join(SIGN.nl) : SIGN.none;
                            };
                            Object.keys(tables).forEach(function(table) {
                                templatePrintObject[table] = new Object();
                                const co = new Object();
                                const ins = insertDataStatic[table];
                                if(isVoid(ins)) {
                                    return;
                                }
                                Object.keys(ins).some(function(toKey, toIdx) {
                                    if(!increment.available && toIdx >= Number(increment.count)) {
                                        return true;
                                    }
                                    const fromKey = extractMap[toKey];
                                    const fromData = extractedData[fromKey];
                                    const exd = fromData[table];
                                    if(!isVoid(exd)) {
                                        const t = tables[table];
                                        const tableSelData = oDB.where(fromData, table);
                                        const kokykKanrenData = oDB.where(fromData, edst.kokykKanren);
                                        const mosKihonData = oDB.where(fromData, edst.mosKihon);
                                        Object.keys(t).forEach(function(column) {
                                            const c = t[column];
                                            if(isVoid(co[column])) {
                                                co[column] = new Object();
                                            }
                                            const inData = generator(fromData, table, column, c, toIdx, tableSelData, kokykKanrenData, mosKihonData);
                                            co[column][toKey] = isVoid(inData) ? "$eq" : inData;
                                        });
                                    }
                                });
                                Object.keys(co).forEach(function(column) {
                                    const dataMap = Object.keys(co[column]).map(function(toKey) {
                                        return co[column][toKey];
                                    });
                                    const existSize = dataMap.filter(function(item) {
                                        if(!isVoid(item) && item !== "$eq") {
                                            return true;
                                        }
                                    }).length;
                                    templatePrintObject[table][column] = existSize >= 1 ? dataMap.join(SIGN.nl) : SIGN.none;
                                });
                            });
                        }
                        sync(viewerClose, templatePrintObject, nbState);
                    }
                    catch(e) {
                        new Notification().error().open(e.message);
                    }
                };
                buildContents();
                initIncrementCount($incrementCountInput);
                new Viewer().setContents(menu, $container).open(callback).onLoad(setEvent);
                break;
            }
            default: {
                continueFlag = true;
                break;
            }
        }
        $templateContainer.remove();
        return continueFlag;
    },
    checkDataCopy: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const loading = new Loading();
        loading.on().then(function() {
            const policyNumberTo = _this.createInfoObject(jqById(seId.policyNumberTo).val(), captions.policyNumberTo);
            const v = new Validation();
            const vTypes = v.getTypes();
            const policyNumberToLayout = v.getLayout(v.initLayout(policyNumberTo.value, policyNumberTo.name, v.getSizeLayout(11, 11, SIGN.nl)), [vTypes.required, vTypes.notSpace, vTypes.numericWithLineBreak, vTypes.size]);
            v.reset().append(policyNumberToLayout);
            const result = v.exec();
            if(result.error) {
                throw new Error(result.message);
            }
            const pnt = policyNumberTo.value;
            const pntList = getExistArray(pnt.split(SIGN.nl));
            const inConditions = pntList.map(function(item) { return concatString(SIGN.sq, item, SIGN.sq); }).join(SIGN.cw);
            const query = concatString("SELECT S_SYONO FROM ST_MosKihon WHERE S_SYONO IN (", inConditions, ")");
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
        const types = _this.Define.TYPES;
        const phaseType = types.phase.dataCopy;
        const _event = _this.event;
        const dataCopyEvent = _event.dataCopy;
        const dataCopyState = _this.state.dataCopy;
        const onReadFile = function(data) {
            let isImporting = true;
            let isSingleMode = true;
            let pnfElementId = SIGN.none;
            switch(dataCopyEvent.status.extractMode) {
                case types.design.dataCopy.extractMode.single:{
                    pnfElementId = seId.policyNumberFrom;
                    isSingleMode = true;
                    break;
                }
                case types.design.dataCopy.extractMode.multiple: {
                    pnfElementId = seId.policyNumberFromTextarea;
                    isSingleMode = false;
                    break;
                }
            }
            try {
                const importData = JSON.parse(data);
                isImporting = false;
                const fromKeyList = Object.keys(importData);
                const fromKeyString = fromKeyList.join(SIGN.nl);
                if(fromKeyList.length <= 0) {
                    throw new Error(MESSAGES.incorrect_data);
                }
                else if(fromKeyList.length === 1 && !isSingleMode) {
                    throw new Error("This data can be import only on single mode");
                }
                else if(fromKeyList.length >= 2 && isSingleMode) {
                    throw new Error("This data can be import only on multiple mode");
                }
                else {
                    const policyNumberFrom = _this.createInfoObject(fromKeyString, captions.policyNumberFrom);
                    const v = new Validation();
                    const vTypes = v.getTypes();
                    const policyNumberFromLayout = v.getLayout(v.initLayout(policyNumberFrom.value, policyNumberFrom.name, v.getSizeLayout(11, 11, SIGN.nl)), [vTypes.required, vTypes.notSpace, vTypes.numericWithLineBreak, vTypes.size]);
                    v.reset().append(policyNumberFromLayout);
                    const result = v.exec();
                    if(result.error) {
                        throw new Error(MESSAGES.incorrect_data);
                    }
                }
                jqById(pnfElementId).val(fromKeyString);
                _this.state.dataCopy.ref = createObject("import", {
                    fromKeyList: fromKeyList,
                    data: importData
                });
                _this.actionControllerDataCopy(phaseType.import);
            }
            catch(e) {
                const errMsg = isImporting ? MESSAGES.incorrect_data : e.message;
                new Notification().error().open(errMsg);
            }
        };
        new FileController().setListener().allowedExtensions([TYPES.file.mime.TEXT]).access(onReadFile);
        return null;
    },
    getDataCopySelectQuery: function(table, pn, isFromDelete, isInclude) {
        const _this = this;
        const dataCopyExport = _this.export.dataCopy;
        const keySet = dataCopyExport.keySet;
        const sb = new StringBuilder();
        let query = "";
        const clause = !isFromDelete ? " = " : (isInclude ? " IN " : " NOT IN ");
        const defaultKey = queryEscape(keySet.defaultKey);
        const getValue = function(func) {
            if(!isFromDelete) {
                return typeIs(func).function ? sb.sq(func(pn)) : sb.sq(pn);
            }
            else {
                const pnMap = pn.map(function(p) {
                    return typeIs(func).function ? sb.sq(func(p)) : sb.sq(p);
                }).join(", ");
                return concatString(SIGN.bs, pnMap, SIGN.be);
            }
        };
        if(!keySet[table]) {
            query = concatString("SELECT * FROM ", table, " WHERE ", defaultKey, clause, getValue());
        }
        else {
            const key = queryEscape(keySet[table].key);
            const type = keySet[table].type;
            switch(type) {
                case 0: {
                    query = concatString("SELECT * FROM ", table, " WHERE ", key, " IN (SELECT S_KOKNO FROM KT_KokKykKanren WHERE S_SYONO", clause, getValue(), ")");
                    break;
                }
                case 1: {
                    const slice1 = function(v) { return v.slice(1, v.length - 1); };
                    const slice2 = function(v) { return v.slice(0, 1); };
                    const withCond = !isFromDelete ? concatString(" AND S_HATUBANKEY = ", getValue(slice2)) : SIGN.none;
                    query = concatString("SELECT * FROM ", table, " WHERE ", key, clause, getValue(slice1), withCond);
                    break;
                }
                case 2: {
                    const joinCond = concatString("A.", key, " = ", "B.", key);
                    const mainCond = concatString("B.S_SYONO", clause, getValue());
                    query = concatString("SELECT * FROM ", table, " A WHERE EXISTS (SELECT B.* FROM ST_MosKihon B WHERE ", joinCond, " AND ", mainCond, ")");
                    break;
                }
                case 3: {
                    query = concatString("SELECT * FROM ", table, " WHERE ", key, " IN (SELECT ", key, " FROM HKT_Hb WHERE S_SYONO", clause, getValue(), ")");
                    break;
                }
            }
        }
        return query;
    },
    getExtractTableListDataCopy: function(extractGroupStack, tableObject) {
        const _this = this;
        const dataCopyExport = _this.export.dataCopy;
        const to = isVoid(tableObject) ? dataCopyExport.tableListObject : tableObject;
        const getExportTableList = function(key) {
            return getProperty(to, key);
        };
        const extractTableList = extractGroupStack.map(function(tableListKey) {
            return getExportTableList(tableListKey);
        }).reduce(function(pre, curr) {
            return pre.concat(curr);
        });
        return extractTableList;
    },
    extractDataCopy: function(phase) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.dataCopy;
        const _event = _this.event;
        const dataCopyEvent = _event.dataCopy;
        const dataCopyExport = _this.export.dataCopy;
        const dataCopyState = _this.state.dataCopy;
        let isSingleMode = true;
        let pnfElementId = SIGN.none;
        switch(dataCopyEvent.status.extractMode) {
            case types.design.dataCopy.extractMode.single:{
                pnfElementId = seId.policyNumberFrom;
                isSingleMode = true;
                break;
            }
            case types.design.dataCopy.extractMode.multiple: {
                pnfElementId = seId.policyNumberFromTextarea;
                isSingleMode = false;
                break;
            }
        }
        const loading = new Loading();
        loading.on().then(function() {
            let pnf, pnt;
            let pnfList = new Array();
            let pntList = new Array();
            let extractedData = new Object();
            const extractMap = new Object();
            const isImport = phase === phaseType.import;
            const subSid = _this.createInfoObject(jqById(seId.subSid).val(), captions.subSid);
            const subUid = _this.createInfoObject(jqById(seId.subUid).val(), captions.subUid);
            const subPwd = _this.createInfoObject(jqById(seId.subPwd).val(), captions.subPwd);
            const policyNumberFrom = _this.createInfoObject(jqById(pnfElementId).val(), captions.policyNumberFrom);
            const policyNumberTo = _this.createInfoObject(jqById(seId.policyNumberTo).val(), captions.policyNumberTo);
            const v = new Validation();
            const vTypes = v.getTypes();
            const subSidLayout = v.getLayout(v.initLayout(subSid.value, subSid.name), [vTypes.required, vTypes.notSpace]);
            const subUidLayout = v.getLayout(v.initLayout(subUid.value, subUid.name), [vTypes.required, vTypes.notSpace]);
            const subPwdLayout = v.getLayout(v.initLayout(subPwd.value, subPwd.name), [vTypes.required, vTypes.notSpace]);
            const policyNumberFromLayout = v.getLayout(v.initLayout(policyNumberFrom.value, policyNumberFrom.name, v.getSizeLayout(11, 11, SIGN.nl)), [vTypes.required, vTypes.notSpace, vTypes.numericWithLineBreak, vTypes.size]);
            const policyNumberToLayout = v.getLayout(v.initLayout(policyNumberTo.value, policyNumberTo.name, v.getSizeLayout(11, 11, SIGN.nl)), [vTypes.required, vTypes.notSpace, vTypes.numericWithLineBreak, vTypes.size]);
            let layoutList = new Array();
            if(isImport) {
                layoutList = [policyNumberFromLayout, policyNumberToLayout];
            }
            else {
                layoutList = [subSidLayout, subUidLayout, subPwdLayout, policyNumberFromLayout, policyNumberToLayout];
            }
            v.reset().appendList(layoutList);
            const result = v.exec();
            if(result.error) {
                throw new Error(result.message);
            }
            pnf = policyNumberFrom.value;
            pnt = policyNumberTo.value;
            pnfList = getExistArray(pnf.split(SIGN.nl));
            pntList = getExistArray(pnt.split(SIGN.nl));
            if(pntList.length >= 1000) {
                const lMsg = "More than 1000 items of data can not be copied";
                throw new Error(lMsg);
            }
            const dCheck = duplicationCheckForArray(pntList);
            if(dCheck.has) {
                const dMsg = [concatString("Policy Number(To) has duplicates", SIGN.br)].concat(dCheck.data).join(SIGN.br);
                throw new Error(dMsg);
            }
            if(!isSingleMode && pnfList.length != pntList.length) {
                const mMsg = "Policy Number(From) and Policy Number(To) do not match";
                throw new Error(mMsg);
            }
            const extractGroupStack = new Array();
            $(dataCopyEvent.element.extractGroupChecked).each(function() {
                extractGroupStack.push($(this).val());
            });
            if(extractGroupStack.length <= 0) {
                const egMsg = concatString(captions.extractGroup, " is required");
                throw new Error(egMsg);
            }
            pntList.forEach(function(toKey, i) {
                extractMap[toKey] = isSingleMode ? pnfList[0] : pnfList[i];
            });
            const extractGroupExecStack = cloneJS(extractGroupStack);
            if(extractGroupExecStack.indexOf(types.design.dataCopy.extractGroup.skei) < 0) {
                extractGroupExecStack.unshift(types.design.dataCopy.extractGroup.skei);
            }
            const extractTableList = _this.getExtractTableListDataCopy(extractGroupStack);
            const extractExecTableList = _this.getExtractTableListDataCopy(extractGroupExecStack);
            dataCopyState.extractMap = extractMap;
            if(isImport) {
                extractedData = cloneJS(dataCopyState.ref.import.data);
                Object.keys(extractedData).forEach(function(key) {
                    const t = extractedData[key];
                    Object.keys(t).forEach(function(table) {
                        if(extractExecTableList.indexOf(table) < 0) {
                            delete t[table];
                        }
                    });
                });
            }
            else {
                dataCopyState.ref = new Object();
                const actionStatus = {
                    extractError: false,
                    insertError: false,
                    message: new Array()
                };
                const info = {
                    sid: subSid,
                    uid: subUid,
                    pwd: subPwd
                };
                const subDB = new DBUtils().connect(info);
                const extractedPnfStack = new Array();
                pnfList.forEach(function(fromKey) {
                    if(extractedPnfStack.indexOf(fromKey) < 0) {
                        extractedPnfStack.push(fromKey);
                        extractedData[fromKey] = new Object();
                    }
                    const countStack = new Array();
                    extractExecTableList.some(function(table, i, a) {
                        console.log(table);
                        const query = _this.getDataCopySelectQuery(table, fromKey);
                        const dataSet = subDB.executeSelect(query).dataSet;
                        extractedData[fromKey][table] = dataSet;
                        if(dataSet.error) {
                            actionStatus.extractError = true;
                            actionStatus.message = ["Extract failed"];
                        }
                        countStack.push(dataSet.count);
                        return dataSet.error;
                    });
                    if(countStack.reduce(function(a, b) { return a + b; }) <= 0) {
                        actionStatus.extractError = true;
                        actionStatus.message = [concatString(fromKey, " : Nothing extracted data")];
                    }
                });
                subDB.close();
                if(actionStatus.extractError) {
                    throw new Error(actionStatus.message.join(SIGN.br));
                }
            }
            const db = new DBUtils().connect(_this.state.info);
            const rules = dataCopyExport.rules;
            const defaultKey = dataCopyExport.keySet.defaultKey;
            const insertData = new Object();
            dataCopyState.dataKey = { to: new Object() };
            dataCopyState.applyInfo = new Object();
            const extactTableLowerList = extractTableList.map(mapLowerCase);
            Object.keys(dataCopyState.extractMap).forEach(function(toKey, idUpdIndex) {
                const fromKey = dataCopyState.extractMap[toKey];
                Object.keys(extractedData[fromKey]).forEach(function(table) {
                    if(extactTableLowerList.indexOf(lowerCase(table)) < 0) {
                        return;
                    }
                    const dataSet = extractedData[fromKey][table];
                    const count = dataSet.count;
                    if(count >= 1) {
                        dataCopyState.keys = new Array();
                        const name = dataSet.name;
                        const data = dataSet.data;
                        const applyData = new Array();
                        dataCopyState.dataKey.to[table] = new Array();
                        const keyIndex = name.map(mapUpperCase).indexOf(upperCase(defaultKey));
                        data.forEach(function(record) {
                            const applyRecord = cloneJS(record);
                            if(keyIndex >= 0) {
                                applyRecord[keyIndex] = toKey;
                            }
                            applyData.push(applyRecord);
                            dataCopyState.keys.push(toKey);
                            dataCopyState.dataKey.to[table].push(toKey);
                        });
                        if(!isVoid(rules[table])) {
                            Object.keys(rules[table]).forEach(function(column) {
                                const applyType = rules[table][column];
                                const applyIndex = name.map(mapUpperCase).indexOf(upperCase(column));
                                dataCopyState.applyIndex = applyIndex;
                                _this.applyRulesDataCopy(applyType, applyData, table, db, name, extractedData[fromKey], idUpdIndex);
                            });
                        }
                        const dataObj = {
                            name: name,
                            data: applyData
                        };
                        if(isVoid(insertData[table])) {
                            insertData[table] = createObject(toKey, dataObj);
                        }
                        else {
                            insertData[table][toKey] = dataObj
                        }
                    }
                });
            });
            db.close();
            dataCopyState.extractedData = extractedData;
            dataCopyState.insertData = insertData;
            dataCopyState.insertDataStatic = cloneJS(insertData);
            dataCopyState.ref.isSingleMode = isSingleMode;
            dataCopyState.ref.extractGroupStack = extractGroupStack;
            dataCopyState.ref.extractGroupExecStack = extractGroupExecStack;
            dataCopyState.toList = pntList;
            _this.actionControllerDataCopy(phaseType.insert);
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    applyRulesDataCopy: function(applyType, applyData, table, db, nameData, exd, idUpdIndex) {
        const _this = this;
        const dataCopyExport = _this.export.dataCopy;
        const defineSet = dataCopyExport.defineSet;
        const state = _this.state.dataCopy;
        switch(applyType) {
            case "identifyCustomerNumber": {
                state.customerNumberIdentifier = new Array();
                let numberCollection = new Array();
                let checkStack = new Array();
                if(isVoid(state[applyType])) {
                    const query = "SELECT S_KOKNO FROM KT_KokKykKanren";
                    const dataSet = db.executeSelect(query).dataSet;
                    if(dataSet.count >= 1) {
                        numberCollection = dataSet.data.map(function(row) { return toString(row[0]); });
                    }
                    state[applyType] = createObject("numberCollection", numberCollection);
                    state[applyType].checkStack = new Array();
                }
                else {
                    numberCollection = state[applyType].numberCollection;
                    checkStack = state[applyType].checkStack;
                }
                let identifier = Math.floor(Math.random() * 999999) + 1000000;
                let recordIdx = 0;
                while(state.customerNumberIdentifier.length < applyData.length && identifier <= 99999999) {
                    const idStr = toString(identifier);
                    if(numberCollection.indexOf(idStr) < 0 && checkStack.indexOf(idStr) < 0) {
                        state.customerNumberIdentifier.push(idStr);
                        applyData[recordIdx][state.applyIndex] = idStr;
                        recordIdx++;
                    }
                    identifier++;
                }
                state[applyType].checkStack = checkStack.concat(state.customerNumberIdentifier);
                break;
            }
            case "changeToOne": {
                applyData.forEach(function(record) {
                    record[state.applyIndex] = "1";
                });
                break;
            }
            case "changeToZero": {
                applyData.forEach(function(record) {
                    record[state.applyIndex] = "0";
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
                const du = new DateUtil(year, month, date, hours, minutes, seconds);
                const calcDate = du.calcDate({ seconds: idUpdIndex });
                state.timeStampIdentifier = du.format.type2(calcDate);
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
            case "deleteExceptByAdProcedure": {
                let i = applyData.length;
                const adProcedureCodeStack = ["skei", "skwb", "skmd", "sksk", "sktg"];
                while(i--) {
                    const rowData = applyData[i][state.applyIndex];
                    if(adProcedureCodeStack.indexOf(rowData) < 0) {
                        applyData.splice(i, 1);
                        state.dataKey.to[table].splice(i, 1);
                    }
                }
                break;
            }
            case "setPolicyNumberHead": {
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = state.keys[i].slice(0, 1);
                });
                break;
            }
            case "slicePolicyNumber": {
                applyData.forEach(function(record, i) {
                    record[state.applyIndex] = state.keys[i].slice(1, state.keys[i].length - 1);
                });
                break;
            }
            case "identifyAccountNumber": {
                state.accountNumberIdentifier = new Array();
                let numberCollection = new Array();
                let checkStack = new Array();
                if(isVoid(state[applyType])) {
                    const query = "SELECT S_KOUZANO FROM ST_HrkmKouzaKanri";
                    const dataSet = db.executeSelect(query).dataSet;
                    if(dataSet.count >= 1) {
                        numberCollection = dataSet.data.map(function(row) { return toString(row[0]); });
                    }
                    state[applyType] = createObject("numberCollection", numberCollection);
                    state[applyType].checkStack = new Array();
                }
                else {
                    numberCollection = state[applyType].numberCollection;
                    checkStack = state[applyType].checkStack;
                }
                let identifier = Math.floor(Math.random() * 999999) + 1000000;
                let recordIdx = 0;
                while(state.accountNumberIdentifier.length < applyData.length && identifier <= 9999999) {
                    const idStr = toString(identifier);
                    if(numberCollection.indexOf(idStr) < 0 && checkStack.indexOf(idStr) < 0) {
                        state.accountNumberIdentifier.push(idStr);
                        applyData[recordIdx][state.applyIndex] = idStr;
                        recordIdx++;
                    }
                    identifier++;
                }
                state[applyType].checkStack = checkStack.concat(state.accountNumberIdentifier);
                break;
            }
            case "identifyMyPageUserId": {
                const d = new Date();
                const year = String(d.getFullYear());
                const month = setCharPadding(String(d.getMonth() + 1), 2);
                const date = setCharPadding(String(d.getDate()), 2);
                const hours = setCharPadding(String(d.getHours()), 2);
                const minutes = setCharPadding(String(d.getMinutes()), 2);
                const seconds = setCharPadding(String(d.getSeconds()), 2);
                const du = new DateUtil(year, month, date, hours, minutes, seconds);
                const calcDate = du.calcDate({ seconds: idUpdIndex });
                const oDB = new DBUtils();
                const exMyPageUserId = oDB.getColumnData(exd, defineSet.table.mosKihon, defineSet.column.myPageUserId);
                state.myPageUserIdInfo = {
                    isWeb: !isVoid(exMyPageUserId),
                    identifier: du.format.type2(calcDate),
                    policyNumberMap: new Object()
                };
                if(state.myPageUserIdInfo.isWeb) {
                    const rowPnIndex = nameData.map(mapUpperCase).indexOf(upperCase(defineSet.column.policyNumber));
                    applyData.forEach(function(record, i) {
                        const rowPn = record[rowPnIndex];
                        const id = concatString(state.myPageUserIdInfo.identifier, setCharPadding(String(i + 1), 3));
                        state.myPageUserIdInfo.policyNumberMap[rowPn] = id;
                        record[state.applyIndex] = id;
                    });
                }
                break;
            }
            case "getIdentifierMyPageUserId": {
                if(state.myPageUserIdInfo.isWeb) {
                    applyData.forEach(function(record, i) {
                        record[state.applyIndex] = concatString(state.myPageUserIdInfo.identifier, setCharPadding(String(i + 1), 3));
                    });
                }
                break;
            }
            case "getIdentifierMyPageUserIdByPolicyNumber": {
                if(state.myPageUserIdInfo.isWeb) {
                    const rowPnIndex = nameData.map(mapUpperCase).indexOf(upperCase(defineSet.column.policyNumber));
                    applyData.forEach(function(record, i) {
                        const rowPn = record[rowPnIndex];
                        record[state.applyIndex] = state.myPageUserIdInfo.policyNumberMap[rowPn];
                    });
                }
                break;
            }
            case "setMyPageLoginId": {
                applyData.forEach(function(record, i) {
                    const pn = state.toList[i];
                    record[state.applyIndex] = concatString("a", pn);
                });
                break;
            }
            case "setMyPageMail": {
                applyData.forEach(function(record, i) {
                    const pn = state.toList[i];
                    record[state.applyIndex] = concatString("a", pn, "@direct.test.com");
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
        const extractMap = dataCopyState.extractMap;
        const extractedData = dataCopyState.extractedData;
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
        const getExportData = function(refObj, table, type) {
            const o = cloneJS(refObj);
            const cd = {
                name: new Array(),
                data: new Array(),
                count: 0
            };
            const columnTypes = {
                header: "header",
                data: "data"
            };
            const setColumns = function(data, columnType, key, from) {
                switch(columnType) {
                    case columnTypes.header: {
                        data.unshift("FROM");
                        data.unshift("KEY");
                        break;
                    }
                    case columnTypes.data: {
                        data.unshift(from ? from : SIGN.none);
                        data.unshift(key ? key : SIGN.none);
                        break;
                    }
                }
            };
            switch(type) {
                case "from": {
                    Object.keys(o).forEach(function(fromKey, i) {
                        const t = o[fromKey][table];
                        if(i === 0) {
                            cd.name = t.name;
                            setColumns(cd.name, columnTypes.header);
                        }
                        t.data.forEach(function(record) {
                            setColumns(record, columnTypes.data, fromKey);
                        });
                        cd.data = cd.data.concat(t.data);
                        cd.count += t.count;
                    });
                    break;
                }
                case "to": {
                    const toObj = o[table];
                    Object.keys(toObj).forEach(function(toKey, i) {
                        const t = toObj[toKey];
                        const fromKey = extractMap[toKey];
                        if(i === 0) {
                            cd.name = t.name;
                            setColumns(cd.name, columnTypes.header);
                        }
                        t.data.forEach(function(record) {
                            setColumns(record, columnTypes.data, toKey, fromKey);
                        });
                        cd.data = cd.data.concat(t.data);
                    });
                    break;
                }
            }
            return cd;
        };
        const setStyle = function(R, C, cell, count) {
            if(R === 0 || R === count + 5 || ((C === 0 || C === 1) && cell.v)) {
                cell.s = headerStyle;
            }
            else if(R <= count || R >= count + 5) {
                cell.s = bodyStyle;
            }
        };
        const wb = new Workbook();
        Object.keys(insertData).forEach(function(table) {
            const from = getExportData(extractedData, table, "from");
            const to = getExportData(insertData, table, "to");
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
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const dataCopyState = _this.state.dataCopy;
        const extractTableList = _this.getExtractTableListDataCopy(dataCopyState.ref.extractGroupStack);
        const $optionContainer = jqById(seId.optionContainerDataCopy);
        const $commandLines = $optionContainer.find(concatString(".", seClass.commandLine));
        const option = new Array();
        let hasError = false;
        const messageStack = new Array();
        $commandLines.each(function(i, item) {
            const $input = $(item).find("input");
            const $textarea = $(item).find("textarea");
            const messageIndex = concatString("[", i + 1, "]");
            const table = _this.createInfoObject($input.val(), concatString(messageIndex, "Table"));
            const script = _this.createInfoObject($textarea.val(), concatString(messageIndex, "Script"));
            const v = new Validation();
            const vTypes = v.getTypes();
            const tableLayout = v.getLayout(v.initLayout(table.value, table.name), [vTypes.required, vTypes.notSpace]);
            const scriptLayout = v.getLayout(v.initLayout(script.value, script.name), [vTypes.required]);
            v.reset().appendList([tableLayout, scriptLayout]);
            const result = v.exec();
            if(result.error) {
                messageStack.push(result.message);
                hasError = true;
            }
            else if(find(table.value, option, ["table"], upperCase).isExist) {
                messageStack.push(concatString(messageIndex, "Table has duplicates"));
                hasError = true;
            }
            else if(!find(table.value, extractTableList, null, upperCase).isExist) {
                messageStack.push(concatString(messageIndex, "Not exists table"));
                hasError = true;
            }
            else if(!script.value.match(new RegExp("@", "g"))) {
                messageStack.push(concatString(messageIndex, "Incorrect script"));
                hasError = true;
            }
            option.push({ table: table.value, script: script.value });
        });
        if(hasError) {
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
        dataCopyState.insertData = cloneJS(dataCopyState.insertDataStatic);
        if(option.length >= 1) {
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
                if(isVoid(tableData)) return;
                const editData = {
                    name: new Array(),
                    data: new Array()
                };
                Object.keys(tableData).forEach(function(pn, i) {
                    if(i === 0) {
                        editData.name = editData.name.concat(tableData[pn].name);
                    }
                    editData.data = editData.data.concat(tableData[pn].data);
                });
                if(editData.data.length >= 1) {
                    Object.keys(script).forEach(function(column) {
                        const applyIndex = editData.name.map(mapUpperCase).indexOf(upperCase(column));
                        if(applyIndex < 0) {
                            actionState.msg.push(concatString("[", table, "]", column, " : Not exists column"));
                            return;
                        }
                        getExistArray(script[column]).forEach(function(s, i) {
                            if(!editData.data[i]) {
                                actionState.msg.push(concatString("[", table, "]", column, " > ", s, " : Overflow data"));
                                return;
                            }
                            else if(s === "$eq") return;
                            editData.data[i][applyIndex] = lowerCase(s) === "$null" ? SIGN.none : s;
                        });
                    });
                }
            });
            if(actionState.msg.length >= 1) {
                dataCopyState.insertData = actionState.backup;
                new Notification().error().open(actionState.msg.join(SIGN.br));
                return false;
            }
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
        const dbTypes = new DBUtils().getTypes();
        dataCopyState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
            const insertData = dataCopyState.insertData;
            const insertQuery = new Object();
            const getQuery = function(table, columns, values) {
                return concatString("INSERT INTO ", table, " (", columns, ") VALUES (", values, ")");
            };
            Object.keys(insertData).forEach(function(table) {
                insertQuery[table] = new Array();
                Object.keys(insertData[table]).forEach(function(toKey) {
                    const name = insertData[table][toKey].name;
                    const data = insertData[table][toKey].data;
                    const columns = name.join(SIGN.cw);
                    data.forEach(function(record) {
                        const values = record.map(function(item) {
                            const v = item || item == 0 ? item : "";
                            return concatString(SIGN.sq, v, SIGN.sq);
                        }).join(SIGN.cw);
                        insertQuery[table].push(getQuery(table, columns, values));
                    });
                });
            });
            const onTransaction = _this.transaction(transactionId);
            if(onTransaction.error) throw new Error(onTransaction.message);
            const db = onTransaction.db;
            let executeTable = SIGN.none;
            try {
                Object.keys(insertQuery).forEach(function(table) {
                    executeTable = table;
                    dataCopyState.log.push(concatString("-- <", table, ">"));
                    insertQuery[table].forEach(function(query) {
                        db.execute(query);
                        _this.pushQueryLog(dataCopyState.log, query);
                    });
                });
                _this.actionControllerDataCopy(phaseType.commit);
            }
            catch(e) {
                const errorType = dbTypes.error;
                let message = e.message;
                if(message.indexOf(errorType.uniqueConstraint) >= 0) {
                    message = concatString(SIGN.abs, executeTable, SIGN.abe, SIGN.br, message);
                }
                _this.destroy(transactionId, db);
                throw new Error(message);
            }
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    buildDeleteData: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const dddt = types.design.deleteData;
        const deleteDataDesign = _this.design.deleteData;
        const _event = _this.event;
        const deleteDataEvent = _event.deleteData;
        const eb = new ElementBuilder();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $deleteButton = jqNode("button", { class: eClass.buttonColorDeepOrange }).text(upperCase(captions.delete));
        eb.listAppend($actionArea, [$deleteButton]);
        $container.append($actionArea);
        const dmr = deleteDataDesign.deleteModeRadio;
        const dgc = deleteDataDesign.deleteGroupCheck;
        const dopt = deleteDataDesign.optionCheck;
        const getItemListObject = function(ds, type, optionClass) {
            return {
                label: ds.type[type].label,
                attributes: {
                    id: ds.type[type].id,
                    name: ds.name,
                    value: ds.type[type].value
                },
                isChecked: ds.type[type].isChecked,
                optionClass: optionClass ? optionClass : SIGN.none
            };
        };
        const deleteModeRadioItemList = [getItemListObject(dmr, dddt.deleteMode.include), getItemListObject(dmr, dddt.deleteMode.exclude)];
        const $dmrCommandArea = jqNode("div", { class: seClass.commandArea });
        const $dmrItem = eb.createRadio(deleteModeRadioItemList).getItem();
        const $dmrLabel = jqNode("label").css("line-height", "2.5").text(captions.deleteMode);
        const $dmrMain = jqNode("div", { class: eClass.fullWidth }).append($dmrItem);
        eb.listAppend($dmrCommandArea, [$dmrLabel, $dmrMain]);
        const deleteGroupCheckItemList = [getItemListObject(dgc, dddt.deleteGroup.skei), getItemListObject(dgc, dddt.deleteGroup.kkanri), getItemListObject(dgc, dddt.deleteGroup.hksiharai)];
        const $dgcCommandArea = jqNode("div", { class: seClass.commandArea });
        const $dgcItem = eb.createCheckbox(deleteGroupCheckItemList).getItem();
        const $dgcLabel = jqNode("label").css("line-height", "2.5").text(captions.deleteGroup);
        const $dgcMain = jqNode("div", { class: eClass.fullWidth }).append($dgcItem);
        eb.listAppend($dgcCommandArea, [$dgcLabel, $dgcMain]);
        const optionCheckItemList = [getItemListObject(dopt, dddt.option.backup)];
        const $doptCommandArea = jqNode("div", { class: seClass.commandArea });
        const $doptItem = eb.createCheckbox(optionCheckItemList).getItem();
        const $doptLabel = jqNode("label").css("line-height", "2.5").text(upperCase(captions.option, 0));
        const $doptMain = jqNode("div", { class: eClass.fullWidth }).append($doptItem);
        eb.listAppend($doptCommandArea, [$doptLabel, $doptMain]);
        eb.listAppend($container, [$dmrCommandArea, $dgcCommandArea, $doptCommandArea]);
        const itemList = [
            {
                label: captions.policyNumber,
                inputType: "textarea",
                inputId: seId.policyNumber
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
            switch(item.inputId) {
                case seId.policyNumber: {
                    deleteDataEvent.element.pn = $input;
                    break;
                }
            }
        });
        $deleteButton.click(function() {
            _this.deleteData();
        });
        return $container;
    },
    actionControllerDeleteData: function(phase) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.deleteData;
        const transactionId = types.toolId.deleteData;
        const _event = _this.event;
        const deleteDataEvent = _event.deleteData;
        const $card = jqById(seId.deleteDataCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
        const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
        const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
        const propOption = {
            disableList: new Array(),
            readonlyList: new Array()
        };
        let itemList = new Array();
        switch(phase) {
            case phaseType.commit: {
                itemList = [$commitButton, $logButton, $resetButton];
                propOption.disableList = ["deleteMode", "deleteGroup", "option"];
                propOption.readonlyList = ["pn"];
                _this.setElementDisable(deleteDataEvent.element, propOption);
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
            _this.actionControllerDeleteData(phaseType.complete);
            const message = "Data deleted successfully";
            new Notification().complete().open(message);
        });
        $logButton.click(function() {
            _this.downloadLog(transactionId);
        });
        $resetButton.click(function() {
            const db = _this.state.lock[transactionId];
            _this.destroy(transactionId, db);
            _this.state.deleteData = new Object();
            $cardContents.html(_this.buildDeleteData());
        });
        return null;
    },
    deleteData: function() {
        const _this = this;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const dddt = types.design.deleteData;
        const phaseType = types.phase.deleteData;
        const _event = _this.event;
        const deleteDataEvent = _event.deleteData;
        const dataCopyExport = _this.export.dataCopy;
        const deleteDataState = _this.state.deleteData;
        const transactionId = types.toolId.deleteData;
        const dbTypes = new DBUtils().getTypes();
        deleteDataState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
            const dmrElement = deleteDataEvent.element;
            const deleteMode = $(dmrElement.deleteModeChecked).val();
            const isInclude = deleteMode === dddt.deleteMode.include;
            const optionStack = new Array();
            $(dmrElement.optionChecked).each(function() {
                optionStack.push($(this).val());
            });
            const withBackup = optionStack.indexOf(dddt.option.backup) >= 0;
            const policyNumber = _this.createInfoObject(dmrElement.pn.val(), captions.policyNumber);
            const v = new Validation();
            const vTypes = v.getTypes();
            const policyNumberLayout = v.getLayout(v.initLayout(policyNumber.value, policyNumber.name, v.getSizeLayout(11, 11, SIGN.nl)), [vTypes.required, vTypes.notSpace, vTypes.numericWithLineBreak, vTypes.size]);
            v.reset().append(policyNumberLayout);
            const result = v.exec();
            if(result.error) {
                throw new Error(result.message);
            }
            const pn = policyNumber.value;
            const pnList = getExistArray(pn.split(SIGN.nl));
            const deleteGroupStack = new Array();
            $(dmrElement.deleteGroupChecked).each(function() {
                deleteGroupStack.push($(this).val());
            });
            if(deleteGroupStack.length <= 0) {
                const egMsg = concatString(captions.deleteGroup, " is required");
                throw new Error(egMsg);
            }
            const extractTableList = _this.getExtractTableListDataCopy(deleteGroupStack);
            const edsd = dataCopyExport.defineSet.delete;
            const priorityTableList = _this.getExtractTableListDataCopy(deleteGroupStack, edsd.priorityTableObject);
            const priorityTableLowCase = priorityTableList.map(mapLowerCase);
            const deleteTableList = priorityTableList.concat(extractTableList.filter(function(table) {
                if(priorityTableLowCase.indexOf(lowerCase(table)) < 0) {
                    return true;
                }
            }));
            const selRegExp = new RegExp("SELECT(.*?)FROM ");
            const delQueryHead = "DELETE FROM ";
            const onTransaction = _this.transaction(transactionId);
            if(onTransaction.error) throw new Error(onTransaction.message);
            const db = onTransaction.db;
            let executeTable = SIGN.none;
            const backupData = new Object();
            try {
                let executeFlag = false;
                deleteTableList.forEach(function(table) {
                    backupData[table] = new Object();
                    const selQuery = _this.getDataCopySelectQuery(table, pnList, true, isInclude);
                    const dataSet = db.executeSelect(selQuery).dataSet;
                    if(dataSet.count >= 1) {
                        executeFlag = true;
                        executeTable = table;
                        const delQuery = selQuery.replace(selRegExp, delQueryHead);
                        db.execute(delQuery);
                        _this.pushQueryLog(deleteDataState.log, delQuery);
                        backupData[table] = dataSet;
                    }
                });
                if(!executeFlag) {
                    throw new Error("Nothing delete data");
                }
                if(withBackup) {
                    const fileName = concatString("DELETE_BK_", getFileStamp(), TYPES.file.extension.txt);
                    const p = getOutputPath(fileName);
                    new FileSystem(p.modulePath).createFolder();
                    new FileSystem(p.filePath).createFile(false, true).write(JSON.stringify(backupData));
                }
                _this.actionControllerDeleteData(phaseType.commit);
                loading.off();
            }
            catch(e) {
                const errorType = dbTypes.error;
                let message = e.message;
                if(message.indexOf(errorType.uniqueConstraint) >= 0) {
                    message = concatString(SIGN.abs, executeTable, SIGN.abe, SIGN.br, message);
                }
                _this.destroy(transactionId, db);
                throw new Error(message);
            }
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    buildCreateUser: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const _event = _this.event;
        const createUserEvent = _event.createUser;
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
            switch(item.inputId) {
                case seId.userCode: {
                    createUserEvent.element.userCode = $input;
                    break;
                }
                case seId.userName: {
                    createUserEvent.element.userName = $input;
                    break;
                }
            }
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
        const _event = _this.event;
        const createUserEvent = _event.createUser;
        const $card = jqById(seId.createUserCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
        const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
        const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
        const propOption = {
            disableList: new Array(),
            readonlyList: new Array()
        };
        let itemList = new Array();
        switch(phase) {
            case phaseType.commit: {
                itemList = [$commitButton, $logButton, $resetButton];
                propOption.readonlyList = ["userCode", "userName"];
                _this.setElementDisable(createUserEvent.element, propOption);
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
            _this.state.createUser = new Object();
            $cardContents.html(_this.buildCreateUser());
        });
        return null;
    },
    createUser: function() {
        const _this = this;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.createUser;
        const transactionId = types.toolId.createUser;
        const _event = _this.event;
        const createUserEvent = _event.createUser;
        const createUserExport = _this.export.createUser;
        const createUserState = _this.state.createUser;
        createUserState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
            const createUserElement = createUserEvent.element;
            const userCode = _this.createInfoObject(createUserElement.userCode.val(), captions.userCode);
            const userName = _this.createInfoObject(createUserElement.userName.val(), captions.userName);
            const v = new Validation();
            const vTypes = v.getTypes();
            const userCodeLayout = v.getLayout(v.initLayout(userCode.value, userCode.name, v.getSizeLayout(6, 6)), [vTypes.required, vTypes.notSpace, vTypes.numeric, vTypes.size]);
            const userNameLayout = v.getLayout(v.initLayout(userName.value, userName.name), [vTypes.required, vTypes.notSpace]);
            const layoutList = createUserState.actionType === types.action.delete ? [userCodeLayout] : [userCodeLayout, userNameLayout];
            v.reset().appendList(layoutList);
            const result = v.exec();
            if(result.error) {
                new Notification().error().open(result.message);
                loading.off();
                return false;
            }
            const info = _this.state.info;
            const uc = userCode.value;
            const un = userName.value;
            const tableList = createUserExport.tableList;
            const tableCode = createUserExport.tableCode;
            const keySet = createUserExport.keySet;
            const querySet = createUserExport.querySet;
            const rules = createUserExport.rules;
            const resultFlag = { insert: true, delete: true };
            const getInsertQuery = function(table) {
                const insertQueryStack = new Array();
                const qs = querySet[table];
                switch(tableCode[table]) {
                    case "1": {
                        const base = rules.base[table];
                        const spec = rules.spec;
                        let specPw = SIGN.none;
                        if(info.sid.value === spec.specPassword.sid) {
                            const db = new DBUtils().connect(info);
                            const dataSet = db.executeSelect(spec.specPassword.query).onEnd(true).dataSet;
                            specPw = db.getColumnData(dataSet, spec.specPassword.table, spec.specPassword.column);
                        }
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
                                    if(prop) {
                                        if(info.sid.value === spec.specPassword.sid) value = specPw;
                                        else value = prop;
                                    }
                                    else {
                                        value = "1";
                                    }
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
            const getSelectQuery = function(table) {
                const ks = keySet[table];
                const code = concatString(SIGN.sq, uc, "%", SIGN.sq);
                const condition = concatString(ks, " LIKE ", code);
                const selectQuery = concatString("SELECT * FROM ", table, " WHERE ", condition);
                return selectQuery;
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
                            if(!resultFlag.delete) return;
                            const selectQuery = getSelectQuery(table);
                            const selectData = db.executeSelect(selectQuery).dataSet;
                            if(selectData.count <= 0) {
                                resultFlag.delete = false;
                                return;
                            }
                            const query = getDeleteQuery(table);
                            db.execute(query);
                            _this.pushQueryLog(createUserState.log, query);
                            break;
                        }
                    }
                });
                if(!resultFlag.delete) throw new Error("Not exists user");
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
        const _event = _this.event;
        const lerEvent = _event.lincErrorResolution;
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $execButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.exec));
        [$execButton].forEach(function(item) { $actionArea.append(item); });
        $container.append($actionArea);
        const itemList = [
            {
                label: captions.policyNumber,
                inputType: "textarea",
                inputId: seId.lincPolicyNumber
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
            switch(item.inputId) {
                case seId.lincPolicyNumber: {
                    lerEvent.element.pn = $input;
                    break;
                }
            }
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
        const _event = _this.event;
        const lerEvent = _event.lincErrorResolution;
        const $card = jqById(seId.lincErrorResolutionCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $card.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $commitButton = jqNode("button", { class: eClass.buttonColorDark }).text(upperCase(captions.commit));
        const $logButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.log));
        const $resetButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.reset));
        const propOption = {
            disableList: new Array(),
            readonlyList: new Array()
        };
        let itemList = new Array();
        switch(phase) {
            case phaseType.commit: {
                itemList = [$commitButton, $logButton, $resetButton];
                propOption.readonlyList = ["pn"];
                _this.setElementDisable(lerEvent.element, propOption);
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
            _this.state.lincErrorResolution = new Object();
            $cardContents.html(_this.buildLincErrorResolution());
        });
        return null;
    },
    solveLincError: function() {
        const _this = this;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const _event = _this.event;
        const lerEvent = _event.lincErrorResolution;
        const phaseType = types.phase.lincErrorResolution;
        const transactionId = types.toolId.lincErrorResolution;
        const lincErrorExport = _this.export.lincErrorResolution;
        const lincErrorState = _this.state.lincErrorResolution;
        lincErrorState.log = new Array();
        const loading = new Loading();
        loading.on().then(function() {
            const lerElement = lerEvent.element;
            const policyNumber = _this.createInfoObject(lerElement.pn.val(), captions.policyNumber);
            const v = new Validation();
            const vTypes = v.getTypes();
            const policyNumberLayout = v.getLayout(v.initLayout(policyNumber.value, policyNumber.name, v.getSizeLayout(11, 11, SIGN.nl)), [vTypes.required, vTypes.notSpace, vTypes.numericWithLineBreak, vTypes.size]);
            v.reset().append(policyNumberLayout);
            const result = v.exec();
            if(result.error) {
                throw new Error(result.message);
            }
            const pn = policyNumber.value;
            const pnList = getExistArray(pn.split(SIGN.nl));
            const onTransaction = _this.transaction(transactionId);
            if(onTransaction.error) throw new Error(onTransaction.message);
            const db = onTransaction.db;
            try {
                pnList.forEach(function(p) {
                    lincErrorState.log.push(concatString("-- <", p, ">"));
                    const mapping = { key: concatString(SIGN.sq, p, SIGN.sq) };
                    lincErrorExport.queryList.forEach(function(query) {
                        const bindedQuery = bindQuery(query, mapping);
                        db.execute(bindedQuery);
                        _this.pushQueryLog(lincErrorState.log, bindedQuery);
                    });
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
            },
            error: {
                uniqueConstraint: "ORA-00001"
            }
        }
    };
    this.driver = null;
    this.command = null;
    this.type = null;
    this.dataSet = null;
};
DBUtils.prototype = {
    getTypes: function() {
        return this.Define.TYPES;
    },
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
    },
    getColumnData: function(data, table, column) {
        const prop = getProperty(data, table);
        const tableData = prop ? prop : data;
        if(!tableData) return null;
        const index = tableData.name.map(mapUpperCase).indexOf(upperCase(column));
        return tableData.data[0][index];
    },
    convertToObject: function(name, data) {
        const dataObject = {
            count: data.length,
            ref: new Object()
        };
        name.forEach(function(n, i) {
            dataObject.ref[n] = data.map(function(item) {
                return item[i];
            });
        });
        return dataObject;
    },
    where: function(o, table, expression) {
        const prop = getProperty(o, table);
        if(!prop) return null;
        const name = prop.name;
        const data = prop.data;
        const getIndex = function(column) {
            return name.map(mapUpperCase).indexOf(upperCase(column));
        };
        const getDataList = function(func) {
            return data.filter(function(record) {
                return func(record);
            });
        };
        return this.convertToObject(name, typeIs(expression).function ? expression(getIndex, getDataList) : this.expressionLayout(getIndex, getDataList));
    },
    expressionLayout: function(getIndex, getDataList) {
        const con = function(record) {
            return true;
        };
        return getDataList(con);
    }
};
