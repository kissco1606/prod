const testDataSet = {
    KT_KokKykKanren: {
        error: false,
        count: 2,
        name: ["S_SYONO", "S_KOKNO", "N_SKEIKIKEIYAKUKBN"],
        data: [["100012345", "1000", "2"], ["100012345", "1001", "2"]],
        type: new Array()
    },
    KT_NayoseKihon: {
        error: false,
        count: 2,
        name: ["S_KOKNO", "S_HKSNAME"],
        data: [["1000", "S214"], ["1001", "S215"]],
        type: new Array()
    },
    WFT_KOUTEIKANRI: {
        error: false,
        count: 3,
        name: ["S_SYONO", "S_DOCUMENTID", "S_JIMUTETUZUKICD"],
        data: [["100012345", "20181013112330001", "skei"], ["100012345", "20181013112330002", "keiyaku"], ["100012345", "20181013112330003", "skei"]],
        type: new Array()
    },
    CM_SyonoKanri: {
        error: false,
        count: 1,
        name: ["S_SYONONINE", "S_TEST"],
        data: [["0001234", "TEST"]],
        type: new Array()
    }
};

const SqlModule = function() {
    this.export = {
        dataCopy: {
            tableList: [
                "KT_KokKykKanren",
                "KT_NayoseKihon",
                "WFT_KOUTEIKANRI",
                "CM_SyonoKanri"
            ],
            keySet: {
            	defaultKey: "S_SYONO",
            	KT_NayoseKihon: {
            		key: "S_KOKNO",
            		type: 0
                },
                CM_SyonoKanri: {
                    key: "S_SYONONINE",
                    type: 1
                }
            },
            rules: {
                KT_KokKykKanren: {
                    S_KOKNO: "identifyCustomerNumber",
                    N_SKEIKIKEIYAKUKBN: "changeTo"
                },
                KT_NayoseKihon: {
                    S_KOKNO: "getIdentifierCustomerNumber"
                },
                WFT_KOUTEIKANRI: {
                    S_DOCUMENTID: "identifyTimeStamp",
                    S_JIMUTETUZUKICD: "deleteExceptSkei"
                },
                CM_SyonoKanri: {
                    S_SYONONINE: "slicePolicyNumber"
                }
            }
        }    
    };
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
                createUserCard: "create-user-card",
                dataCopyCard: "data-copy-card",
                policyNumberFrom: "policy-number__from",
                policyNumberTo: "policy-number-to",
                subSid: "sub-sid",
                subUid: "sub-uid",
                subPwd: "sub-pwd",
                optionContainerDataCopy: "option-container__data-copy"
            },
            class: {
                commandLine: "command-line",
                contentsContainer: "contents-container",
                commandArea: "command-area",
                actionArea: "action-area",
                optionCommandArea: "option-command-area",
                optionRemoveButton: "option-remove-button",
                commandLineRow: "command-line-row",
                removeRow: "remove-row"
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
            extract: "extract",
            import: "import",
            export: "export",
            insert: "insert",
            commit: "commit",
            backup: "backup",
            option: "option",
            reset: "reset",
            subSid: "SID(From)",
            subUid: "UID(From)",
            subPwd: "PWD(From)",
            policyNumberFrom: "Policy Number(From)",
            policyNumberTo: "Policy Number(To)"
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
                dataCopy: {
                    insert: "insert",
                    commit: "commit",
                    complete: "complete"
                }
            }
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
        dataCopy: new Object()
    };
};
SqlModule.prototype = {
    testOnAccess: function() {
        const _this = this;
        const pageType = _this.Define.TYPES.page;
        const sid = { value: "test" };
        const uid = { value: "test" };
        _this.state.isConnect = true;
        _this.state.info = {
            sid: sid.name + " : " + sid.value,
            uid: uid.name + " : " + uid.value
        };
        _this.transition(pageType.application);
        return null;
    },
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
        return this;
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
        const $extractButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.extract));
        const $importButton = jqNode("button", { class: eClass.buttonColorCyan }).text(upperCase(captions.import));
        $actionArea.append($extractButton).append($importButton);
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
            const $textarea = jqNode("textarea");
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
                $optionButton.click(function() {
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
                            saveAsFile(JSON.stringify(fileData.data), TYPES.file.mime.TEXT_UTF8, concatString("OptionData", TYPES.file.extension.txt));
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
                });
                $exportButton.click(function() {
                    _this.exportToExcelDataCopy();
                });
                $backupButton.click(function() {
                    const extractedData = _this.state.dataCopy.extractedData;
                    const key = Object.keys(extractedData)[0];
                    const fileDefine = TYPES.file;
                    const parts = JSON.stringify(extractedData);
                    const fileName = concatString(key, "_Backup_", getSystemDate(), fileDefine.extension.txt);
                    const mime = TYPES.file.mime.TEXT_UTF8;
                    saveAsFile(parts, mime, fileName);
                });
                $resetButton.click(function() {
                    _this.state.dataCopy = new Object();
                    $cardContents.html(_this.buildDataCopyContents());
                });
                break;
            }
            case phaseType.commit: {
                break;
            }
            case phaseType.complete: {
                break;
            }
        }
        return null;
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
        const loading = new Loading();
        loading.on().then(function() {
            const seId = _this.Define.ELEMENTS.id;
            const captions = _this.Define.CAPTIONS;
            const dataCopyExport = _this.export.dataCopy;
            let pnf, pnt;
            let extractedData = new Object();
            if(!_this.state.dataCopy.extractedData) {
                    // const subSid = _this.getCheckObject(jqById(seId.subSid).val(), captions.subSid);
                // const subUid = _this.getCheckObject(jqById(seId.subUid).val(), captions.subUid);
                // const subPwd = _this.getCheckObject(jqById(seId.subPwd).val(), captions.subPwd);
                // const policyNumberFrom = _this.getCheckObject(jqById(seId.policyNumberFrom).val(), captions.policyNumberFrom);
                // const policyNumberTo = _this.getCheckObject(jqById(seId.policyNumberTo).val(), captions.policyNumberTo);
                
                // test
                const subSid = _this.getCheckObject("xora", captions.subSid);
                const subUid = _this.getCheckObject("test", captions.subUid);
                const subPwd = _this.getCheckObject("test", captions.subPwd);
                const policyNumberFrom = _this.getCheckObject("100012345", captions.policyNumberFrom);
                const policyNumberTo = _this.getCheckObject("100012356\n100012367", captions.policyNumberTo);
                // test

                const result = _this.validation(subSid, subUid, subPwd, policyNumberFrom, policyNumberTo);
                if(result.error) {
                    new Notification().error().open(result.message);
                    loading.off();
                    return false;
                }
                const actionStatus = {
                    extractError: false,
                    insertError: false,
                    message: null
                };
                pnf = policyNumberFrom.value;
                pnt = policyNumberTo.value;
                // const connectString = _this.createConnectString(subSid.value, subUid.value, subPwd.value);
                // _this.subConnect().setConnectObject().open(connectString);
                extractedData[pnf] = new Object();
                dataCopyExport.tableList.some(function(table, i) {
                    //test
                    const dataSet = testDataSet[table];
                    dataSet.sort = i;
                    //test

                    const query = _this.getDataCopySelectQuery(table, pnf);
                    // const dataSet = _this.dbCommand(_this.state.subDb).setQuery(query).execute().getData();
                    extractedData[pnf][table] = dataSet;
                    if(dataSet.error) {
                        actionStatus.extractError = true;
                        actionStatus.message = "Extract failed";
                    }
                    return dataSet.error;
                });
                _this.close().mainConnect();
                if(actionStatus.extractError) {
                    new Notification().error().open(actionStatus.message);
                    loading.off();
                    return false;
                }
            }
            else {
                extractedData = _this.state.dataCopy.extractedData;
                pnf = Object.keys(extractedData)[0];
                pnt = jqById(seId.policyNumberTo).val();
            }
            const rules = dataCopyExport.rules;
            const defaultKey = dataCopyExport.keySet.defaultKey;
            const insertData = new Object();
            const pntList = pnt.split(SIGN.nl);
            Object.keys(extractedData[pnf]).forEach(function(table) {
                const dataSet = extractedData[pnf][table];
                const count = dataSet.count;
                if(count >= 1) {
                    _this.state.dataCopy.keys = new Array();
                    const name = dataSet.name;
                    const data = dataSet.data;
                    const applyData = new Array();
                    pntList.forEach(function(to) {
                        const keyIndex = name.map(mapUpperCase).indexOf(upperCase(defaultKey));
                        data.forEach(function(record) {
                            const applyRecord = cloneJS(record);
                            if(keyIndex >= 0) {
                                applyRecord[keyIndex] = to;
                            }
                            applyData.push(applyRecord);
                            _this.state.dataCopy.keys.push(to);
                        });
                    });
                    if(rules[table]) {
                        console.log(table);
                        Object.keys(rules[table]).forEach(function(column) {
                            const applyType = rules[table][column];
                            const applyIndex = name.map(mapUpperCase).indexOf(upperCase(column));
                            _this.state.dataCopy.applyIndex = applyIndex;
                            _this.applyRulesDataCopy(applyType, applyData);
                        });
                    }
                    insertData[table] = {
                        name: name,
                        data: applyData
                    };
                }
            });
            _this.state.dataCopy.extractedData = extractedData;
            _this.state.dataCopy.insertData = insertData;
            console.log(extractedData);
            console.log(insertData);
            const phaseType = _this.Define.TYPES.phase.dataCopy;
            // _this.buildDataCopyInsertContents();
            _this.actionControllerDataCopy(phaseType.insert);
            loading.off();
        }).catch(function(e) {
            _this.subConnect().close().mainConnect();
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    applyRulesDataCopy: function(applyType, applyData) {
        const _this = this;
        const state = _this.state.dataCopy;
        switch(applyType) {
            case "identifyCustomerNumber": {
                state.customerNumberIdentifier = new Array();
                const query = "SELECT S_KOKNO FROM KT_KokKykKanren";
                // const dataSet = _this.dbCommand(_this.state.db).setQuery(query).execute().getData();
                // test
                const dataSet = {
                    data: [["10"],["11"],["12"],["13"],["14"],["15"],["17"],["18"],["19"],["20"],["22"]],
                    count: 11
                };
                // test
                let numberCollection = new Array();
                if(dataSet.count >= 1) {
                    numberCollection = dataSet.data.map(function(row) { return toNumber(row[0]); });
                }
                let identifier = 10;
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
                const seconds = "30";
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
            for(let R = 0; R != data.length; ++R) {
                for(let C = 0; C != data[R].length; ++C) {
                    if(range.s.r > R) range.s.r = R;
                    if(range.s.c > C) range.s.c = C;
                    if(range.e.r < R) range.e.r = R;
                    if(range.e.c < C) range.e.c = C;
                    const cell = { v: data[R][C] };
                    if(cell.v == null) continue;
                    const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                    if(typeof cell.v === "number") cell.t = "n";
                    else if(typeof cell.v === "boolean") cell.t = "b";
                    else if(cell.v instanceof Date) {
                        cell.t = "n";
                        cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    }
                    else cell.t = "s";
                    if(R === 0 || R === count + 5) {
                        cell.s = {
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
                        }
                    }
                    else if(R <= count || R >= count + 5) {
                        cell.s = {
                            border: {
                                top: { style: "thin", tint: 1 },
                                left: { style: "thin", tint: 1 },
                                right: { style: "thin", tint: 1 },
                                bottom: { style: "thin", tint: 1 }
                            }
                        }
                    }
                    ws[cell_ref] = cell;
                }
            }
            if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        };
        Object.keys(insertData).forEach(function(table) {
            const from = extractedData[table];
            const to = insertData[table];
            wb.SheetNames.push(table);
            const a = new Array(from.name).concat(from.data);
            const b = [[""], [""], [""], [""]];
            const c = new Array(to.name).concat(to.data);
            const ws_data = a.concat(b).concat(c);
            if(table === "WFT_KOUTEIKANRI") {
                console.log(ws_data);
            }
            const ws = sheet_from_array_of_arrays(ws_data, from.count);
            wb.Sheets[table] = ws;
        });
        const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "binary" });
        saveAsFile(s2ab(wbout), fileDefine.mime.OCTET_STREAM, "dataCopyCheck.xlsx");
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
            // else {
            //     option.forEach(function(item) {
            //         if(item.table === table.value) {
            //             messageStack.push(concatString(messageIndex, "Table duplicated"));
            //             error = true;
            //         }
            //     });
            // }
            option.push({ table: table.value, script: script.value });
        });
        if(error) {
            new Notification().error().open(messageStack.join("<br />"));
            return false;
        }
        if(!dialogClose) {
            return { data: option };
        }
        dataCopyState.option = option;
        dialogClose();
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
        return null;
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
            // _this.mainConnect().setConnectObject().open(connectString);
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
    close: function() {
        const isSubConnection = this.state.isSubConnection;
        const db = !isSubConnection ? this.state.db : this.state.subDb;
        if(db) {
            db.Close();
        }
        return this;
    },
    dbCommand: function(connection) {
        const commandType = this.Define.TYPES.command;
        this.state.command = new ActiveXObject(this.Define.ADODB.command);
        // this.state.command.ActiveConnection = connection;
        this.state.command.CommandType = commandType.adCmdText;
        this.state.command.Prepared = true;
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
        const noneQuery = this.state.noneQuery;
        if(this.state.command) {
            this.state.recordSet = this.state.command.Execute();
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
        if(this.state.db) {
            this.state.db.BeginTrans();
        }
        return this;
    },
    commit: function() {
        return this;
    },
    rollback: function() {
        return this;
    },
    recordSetClose: function() {
        return this;
    },
    getPolicyNumberTo: function(data) {
        return data;
    },
    getIdentifierCustomerNumber: function(data) {
        return data;
    },
    identifyCustomerNumber: function() {

    }
};
