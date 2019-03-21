const BatchModule = function() {
    this.Define = {
        ELEMENTS: {
            id: {
                batchHeader: "batch-header",
                batchContents: "batch-contents",
                batchMenuContainer: "batch-menu-container",
                headerToolsConfigIcon: "header-tools-config-icon",
                applicationPage: "application-page",
                rateDumpCard: "rate-dump-card",
                rateDump: {
                    phase: "rate-dump__phase",
                    userName: "rate-dump__user-name",
                    dbName: "rate-dump__db-name",
                    sysDate: "rate-dump__sys-date",
                    tableName: "rate-dump__table-name",
                    syouhnCd: "rate-dump__syouhn-cd",
                    ryourituVer: "rate-dump__ryouritu-ver",
                    batchPath: {
                        exportRateByProductCode: "rate-dump__batch-path__export-rate-by-product-code",
                        exportRateVOnlyT210: "rate-dump__batch-path__export-rate-v-only-t210",
                        exportRateByTable: "rate-dump__batch-path__export-rate-by-table"
                    }
                }
            },
            class: {
                contentsContainer: "contents-container",
                commandArea: "command-area",
                actionArea: "action-area",
                commandBlock: "command-block",
                rateDumpBlock: "rate-dump-block",
                rateDumpBlockTitle: "rate-dump-block-title",
                subLabel: "sub-label"
            },
            style: {
                backgroundColor: "#333",
                headerHeight: "50px",
                transitionDuration: 200
            }
        },
        CAPTIONS: {
            title: "Batch Management",
            exec: "exec",
            clear: "clear",
            allExec: "all exec",
            allClear: "all clear",
            rateDump: {
                title: "Rate Dump Export",
                block: {
                    label: {
                        commonParameter: "Common Parameter",
                        exportRateByProductCode: "Rate export by product code",
                        exportRateVOnlyT210: "Rate_V export only T210",
                        exportRateByTable: "Rate export by table"
                    }
                },
                parameter: {
                    phase: "PHASE",
                    userName: "USER_NAME",
                    dbName: "DB_NAME",
                    sysDate: "SYS_DATE",
                    tableName: "TABLE_NAME",
                    syouhnCd: "SYOUHN_CD",
                    ryourituVer: "RYOURITU_VER",
                    batchPath: "Batch Path"
                }
            }
        },
        TYPES: {
            page: {
                application: "application"
            },
            path: {
                export: "module/batch/export.json"
            },
            rateDump: {
                parameter: {
                    common: "common",
                    exportRateByProductCode: "exportRateByProductCode",
                    exportRateVOnlyT210: "exportRateVOnlyT210",
                    exportRateByTable: "exportRateByTable"
                },
                path: {
                    log: "module/batch/log",
                    temp: "module/batch/temp",
                    execute: "module/batch/temp/execute.bat"
                }
            }
        },
        MESSAGES: {
        }
    };
    this.state = {
        rateDump: new Object()
    };
    this.export = new Object();
};
BatchModule.prototype = {
    initBatchModule: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seStyle = _this.Define.ELEMENTS.style;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const $container = jqById(eId.container);
        $container.css({ "margin-top": seStyle.headerHeight, "background-color": seStyle.backgroundColor });
        const $header = jqNode("header", { id: getHeaderId() });
        const $contents = jqNode("div", { id: getContentsId() });
        const $headerTitle = jqNode("div", { id: eId.headerTitle });
        const $titleIcon = jqNode("i", { class: eIcon.fileCode });
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
        const $menuContainer = jqNode("div", { id: seId.batchMenuContainer, class: eClass.menuContainer });
        [$headerTitle, $headerTools, $menuContainer].forEach(function(item) { $header.append(item); });
        const $screen = jqNode("div", { id: seId.applicationPage, class: eClass.screen });
        $contents.append($screen);
        [$header, $contents].forEach(function(item) { $container.append(item) });

        const titleIconSize = $titleIcon.width();
        const headerToolsSize = $headerTools.width();
        jqById(eId.titleIcon).css({ width: (Math.ceil(titleIconSize) + 2) + "px" });
        jqById(eId.headerTitle).css({ width: "calc(100% - " + Math.ceil(headerToolsSize) + "px)" });

        getJson(types.path.export).then(function(data) {
            _this.export = data;
            _this.setPage();
            fadeIn($container);
        }).catch(function(e) {
            $container.empty();
            console.log(e);
            new Notification().error().open("Failed load module");
        });
        return this;
    },
    openMenu: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const $container = jqById(eId.container);
        const $menuContainer = jqById(seId.batchMenuContainer);
        $container.click(function() { $menuContainer.removeClass(eClass.isVisible); });
        $menuContainer.empty();
        const $menu = jqNode("ul", { class: classes(eClass.menu, eClass.menuBottomRight) });
        const itemList = new Array();
        createMenuItem(itemList, eIcon.home, CAPTIONS.home, transitionMenu);
        itemList.forEach(function(item) { $menu.append(item); });
        $menuContainer.append($menu);
        setTimeout(function() { $menuContainer.addClass(eClass.isVisible); });
        return null;
    },
    setPage: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const $contents = jqById(getContentsId());
        $contents.empty();
        const $screen = jqNode("div", { id: seId.applicationPage, class: eClass.screen });
        const $cardContainer = jqNode("div", { class: eClass.cardContainer });
        const cardList = [
            {
                id: seId.rateDumpCard,
                title: captions.rateDump.title,
                contents: _this.buildRateDump()
            }
        ];
        cardList.forEach(function(item) {
            $cardContainer.append(buildCard(item));
        });
        $screen.append($cardContainer);
        $contents.append($screen);
        return null;
    },
    createInfoObject: function(value, name) {
        return {
            value: value,
            name: name
        };
    },
    buildRateDump: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const rateDumpTypes = types.rateDump;
        const blockLabel = captions.rateDump.block.label;
        const rateDumpExport = _this.export.rateDump;
        const parameterCaptions = captions.rateDump.parameter;
        const rateDumpState = _this.state.rateDump;
        rateDumpState.path = new Object();
        rateDumpState.injector = new Object();
        const eb = new ElementBuilder();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $allExecButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.allExec));
        const $allClearButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.allClear));
        $container.append(eb.listAppend($actionArea, [$allExecButton, $allClearButton]));
        const getElementId = function(type, id) {
            return concatString(id, "__", type);
        };
        const getParameterElements = function(type) {
            const getCommandObject = function(label, inputType, inputId, injectorKey, subLabel) {
                return {
                    label: label,
                    inputType: inputType,
                    inputId: inputId,
                    subLabel: subLabel,
                    injectorKey: injectorKey
                };
            };
            const elementStack = new Array();
            const batchPathObj = getCommandObject(parameterCaptions.batchPath, "input", seId.rateDump.batchPath[type]);
            elementStack.push(batchPathObj);
            switch(type) {
                case rateDumpTypes.parameter.exportRateByProductCode: {
                    rateDumpExport.tableList.forEach(function(table, i) {
                        const subLabel = concatString("TABLE : ", table);
                        const injectorKey = [type, table, rateDumpExport.variables.syouhnCd];
                        const commandObj = getCommandObject(parameterCaptions.syouhnCd, "textarea", getElementId(type, concatString(seId.rateDump.syouhnCd, i)), injectorKey, subLabel);
                        elementStack.push(commandObj);
                    });
                    break;
                }
                case rateDumpTypes.parameter.exportRateVOnlyT210: {
                    const injectorKey = [type, rateDumpExport.variables.ryourituVer];
                    const commandObj = getCommandObject(parameterCaptions.ryourituVer, "textarea", getElementId(type, seId.rateDump.ryourituVer), injectorKey);
                    elementStack.push(commandObj);
                    break;
                }
                case rateDumpTypes.parameter.exportRateByTable: {
                    const injectorKey = [type, rateDumpExport.variables.tableName];
                    const commandObj = getCommandObject(parameterCaptions.tableName, "textarea", getElementId(type, seId.rateDump.tableName), injectorKey);
                    elementStack.push(commandObj);
                    break;
                }
            }
            return elementStack;
        };
        const blockList = [
            {
                label: blockLabel.commonParameter,
                commandArea: [
                    {
                        label: captions.rateDump.parameter.phase,
                        inputType: "input",
                        inputId: seId.rateDump.phase,
                        injectorKey: ["common", rateDumpExport.variables.phase]
                    },
                    {
                        label: captions.rateDump.parameter.userName,
                        inputType: "input",
                        inputId: seId.rateDump.userName,
                        injectorKey: ["common", rateDumpExport.variables.userName]
                    },
                    {
                        label: captions.rateDump.parameter.dbName,
                        inputType: "input",
                        inputId: seId.rateDump.dbName,
                        injectorKey: ["common", rateDumpExport.variables.dbName]
                    },
                    {
                        label: captions.rateDump.parameter.sysDate,
                        inputType: "input",
                        inputId: seId.rateDump.sysDate,
                        injectorKey: ["common", rateDumpExport.variables.sysDate]
                    }
                ],
                execType: null
            },
            {
                label: blockLabel.exportRateByProductCode,
                commandArea: getParameterElements(rateDumpTypes.parameter.exportRateByProductCode),
                execType: rateDumpTypes.parameter.exportRateByProductCode
            },
            {
                label: blockLabel.exportRateVOnlyT210,
                commandArea: getParameterElements(rateDumpTypes.parameter.exportRateVOnlyT210),
                execType: rateDumpTypes.parameter.exportRateVOnlyT210
            },
            {
                label: blockLabel.exportRateByTable,
                commandArea: getParameterElements(rateDumpTypes.parameter.exportRateByTable),
                execType: rateDumpTypes.parameter.exportRateByTable
            }
        ];
        blockList.forEach(function(blockItem) {
            const $commandBlock = jqNode("div", { class: classes(seClass.commandBlock, seClass.rateDumpBlock) });
            const $title = jqNode("label").text(blockItem.label);
            const labelStack = [$title];
            const execType = blockItem.execType;
            if(execType) {
                const $buttonContainer = jqNode("div");
                const $execButton = jqNode("button", { class: eClass.buttonColorPositive }).text(upperCase(captions.exec));
                const $clearButton = jqNode("button", { class: eClass.buttonColorOrange }).text(upperCase(captions.clear));
                labelStack.push(eb.listAppend($buttonContainer, [$execButton, $clearButton]));
                $execButton.click(function() {
                    _this.rateDumpExport(execType);
                });
                $clearButton.click(function() {
                    _this.rateDumpClear(execType);
                });
            }
            const $label = eb.listAppend(jqNode("div", { class: seClass.rateDumpBlockTitle }), labelStack);
            $commandBlock.append($label);
            blockItem.commandArea.forEach(function(areaItem) {
                const $commandArea = jqNode("div", { class: seClass.commandArea });
                const $multiLabel = areaItem.subLabel ? eb.listAppend(jqNode("label"), [jqNode("div").text(areaItem.label), jqNode("div", { class: seClass.subLabel }).text(areaItem.subLabel)]) : null;
                const $label = $multiLabel ? $multiLabel : jqNode("label").text(areaItem.label);
                let $input = jqNode(areaItem.inputType, { id: areaItem.inputId });
                if(areaItem.label === parameterCaptions.batchPath) {
                    const $fileListener = $input;
                    $fileListener.attr("type", "file").addClass(eClass.hide);
                    const $clipIcon = eb.getFontAwesomeIcon(eIcon.paperClip);
                    const $pathContent = jqNode("span");
                    const $forLabel = eb.listAppend(jqNode("label", { for: areaItem.inputId, class: eClass.attachLabel }), [$clipIcon, $pathContent]);
                    const fileTypeArrayBuffer = TYPES.file.readType.arrayBuffer;
                    const fileExtensionBatch = TYPES.file.extension.bat;
                    const callback = function(data, path) {
                        $pathContent.text(path);
                        rateDumpState.path[execType] = path;
                    };
                    new FileController().setListener().setReadType(fileTypeArrayBuffer).allowedExtensions([fileExtensionBatch]).access(callback);
                    $input = $forLabel.append($fileListener);
                    if(execType) setObject(rateDumpState.injector, [execType, "batchPath"], $pathContent);
                }
                else {
                    setObject(rateDumpState.injector, areaItem.injectorKey, $input);
                }
                $commandArea.append($label).append($input);
                $commandBlock.append($commandArea);
            });
            $container.append($commandBlock);
        });
        $allExecButton.click(function() {
            _this.rateDumpExport();
        });
        $allClearButton.click(function() {
            _this.rateDumpClear();
        });
        return $container;
    },
    rateDumpExport: function(execType) {
        const _this = this;
        const types = _this.Define.TYPES;
        const captions = _this.Define.CAPTIONS;
        const blockLabel = captions.rateDump.block.label;
        const parameterCaptions = captions.rateDump.parameter;
        const rateDumpTypes = types.rateDump;
        const rateDumpState = _this.state.rateDump;
        const rateDumpExport = _this.export.rateDump;
        const tempPath = getApplicationPath(rateDumpTypes.path.temp);
        const executeFilePath = getApplicationPath(rateDumpTypes.path.execute);
        const fileStamp = getFileStamp();
        let logId = 1;
        const parameterSet = new Object();
        const allTypesStack = [rateDumpTypes.parameter.exportRateByProductCode, rateDumpTypes.parameter.exportRateVOnlyT210, rateDumpTypes.parameter.exportRateByTable];
        const injector = rateDumpState.injector;
        const phase = _this.createInfoObject(injector.common[rateDumpExport.variables.phase].val(), parameterCaptions.phase);
        const userName = _this.createInfoObject(injector.common[rateDumpExport.variables.userName].val(), parameterCaptions.userName);
        const dbName = _this.createInfoObject(injector.common[rateDumpExport.variables.dbName].val(), parameterCaptions.dbName);
        const sysDate = _this.createInfoObject(injector.common[rateDumpExport.variables.sysDate].val(), parameterCaptions.sysDate);
        parameterSet.common = [
            { variable: rateDumpExport.variables.phase, value: null, bind: null },
            { variable: rateDumpExport.variables.userName, value: null, bind: null },
            { variable: rateDumpExport.variables.dbName, value: null, bind: null },
            { variable: rateDumpExport.variables.sysDate, value: null, bind: null }
        ];
        const loading = new Loading();
        loading.on().then(function() {
            const createExecuteBatchFile = function(ps, execType, fromPath) {
                const common = ps.common;
                const self = ps[execType];
                const convertList = common.concat(self);
                const data = new FileSystem(fromPath).read().getData();
                const pauseRegExp = new RegExp("^pause", "g");
                let parameterCounter = 1;
                const stringArray = data.split(SIGN.crlf);
                stringArray.forEach(function(line, i) {
                    const isPause = !(new RegExpUtil(line).isNot(pauseRegExp));
                    if(isPause) {
                        stringArray[i] = "rem pause";
                        return;
                    }
                    convertList.some(function(item, j) {
                        const variableRegExp = new RegExp(concatString("^(set )", item.variable, "(=).+?$"), "g");
                        const isSetVariable = !(new RegExpUtil(line).isNot(variableRegExp));
                        if(isSetVariable) {
                            let value = item.value;
                            if(!value) {
                                value = concatString("%", parameterCounter);
                                if(j < common.length) {
                                    parameterSet.common[j].bind = parameterCounter;
                                }
                                else {
                                    parameterSet[execType][j - common.length].bind = parameterCounter;
                                }
                                parameterCounter++;
                            }
                            stringArray[i] = concatString("set ", item.variable, "=", value);
                            return true;
                        }
                    });
                });
                const batchData = stringArray.join(SIGN.crlf);
                new FileSystem(tempPath).createFolder();
                new FileSystem(executeFilePath).createFile(true).write(batchData);
            };
            const execBatch = function(execType) {
                const ps = parameterSet;
                const psoPhase = find(rateDumpExport.variables.phase, ps.common, ["variable"]).data[0];
                const psoUserName = find(rateDumpExport.variables.userName, ps.common, ["variable"]).data[0];
                const psoDbName = find(rateDumpExport.variables.dbName, ps.common, ["variable"]).data[0];
                const psoSysDate = find(rateDumpExport.variables.sysDate, ps.common, ["variable"]).data[0];
                const mappingObjBase = [[psoPhase.variable, phase.value], [psoUserName.variable, userName.value], [psoDbName.variable, dbName.value], [psoSysDate.variable, sysDate.value]];
                const getBindParameter = function(setList, vm) {
                    const bindParameter = new Array();
                    setList.forEach(function(pso) {
                        const v = pso.variable;
                        const b = pso.bind;
                        bindParameter[b] = vm[v];
                    });
                    bindParameter.shift();
                    return bindParameter;
                };
                const runBatch = function(parameter) {
                    const logFile = concatString(fileStamp, SIGN.ub, logId, TYPES.file.extension.log);
                    const logFilePath = getApplicationPath(concatString(rateDumpTypes.path.log, SIGN.ssh, logFile));
                    const bat = new BatchUtil();
                    const windowStyle = bat.getIntWindowStyle();
                    const result = bat.run(executeFilePath, parameter, windowStyle.showShellMinSize, true, logFilePath);
                    if(result !== 0) throw new Error("Occurred error on a batch");
                    const logFs = new FileSystem(logFilePath);
                    const logData = logFs.read().getData();
                    const exp = new RegExp("LOG=(.*?).log", "g");
                    const consoleLogPathArray = exp.exec(logData);
                    const consoleLogPath = concatString(consoleLogPathArray[1], TYPES.file.extension.log);
                    const consoleLogData = new FileSystem(consoleLogPath).read().getData();
                    const consoleLogDataArray = getExistArray(consoleLogData.split(SIGN.crlf));
                    const hasError = !new RegExpUtil(consoleLogData).isNot(new RegExp("エラー", "g"));
                    const fileMessage = consoleLogDataArray.join(SIGN.crlf);
                    const dialogMessage = consoleLogDataArray.join(SIGN.br);
                    logFs.write(fileMessage);
                    if(hasError) {
                        new FileSystem(tempPath).deleteFolder();
                        throw new Error(dialogMessage);
                    }
                    logId++;
                };
                switch(execType) {
                    case rateDumpTypes.parameter.exportRateByProductCode: {
                        const psoTableName = find(rateDumpExport.variables.tableName, ps[execType], ["variable"]).data[0];
                        const psoSyouhnCd = find(rateDumpExport.variables.syouhnCd, ps[execType], ["variable"]).data[0];
                        rateDumpExport.tableList.forEach(function(table) {
                            const syouhnCd = _this.createInfoObject(injector[execType][table][rateDumpExport.variables.syouhnCd].val(), parameterCaptions.syouhnCd);
                            const scArray = getExistArray(syouhnCd.value.split(SIGN.nl));
                            if(isVoid(scArray)) return;
                            scArray.forEach(function(sc) {
                                const valueMap = createMultipleObject(mappingObjBase.concat([[psoTableName.variable, table], [psoSyouhnCd.variable, sc]]));
                                const bindParameter = getBindParameter([psoPhase, psoUserName, psoDbName, psoSysDate, psoTableName, psoSyouhnCd], valueMap);
                                runBatch(bindParameter);
                            });
                        });
                        break;
                    }
                    case rateDumpTypes.parameter.exportRateVOnlyT210: {
                        const psoTableName = find(rateDumpExport.variables.tableName, ps[execType], ["variable"]).data[0];
                        const psoSyouhnCd = find(rateDumpExport.variables.syouhnCd, ps[execType], ["variable"]).data[0];
                        const psoRyourituVer = find(rateDumpExport.variables.ryourituVer, ps[execType], ["variable"]).data[0];
                        const ryourituVer = _this.createInfoObject(injector[execType][rateDumpExport.variables.ryourituVer].val(), parameterCaptions.ryourituVer);
                        const rvArray = getExistArray(ryourituVer.value.split(SIGN.nl));
                        if(isVoid(rvArray)) break;
                        rvArray.forEach(function(rv) {
                            const valueMap = createMultipleObject(mappingObjBase.concat([[psoRyourituVer.variable, rv]]));
                            const bindParameter = getBindParameter([psoPhase, psoUserName, psoDbName, psoSysDate, psoRyourituVer], valueMap);
                            runBatch(bindParameter);
                        });
                        break;
                    }
                    case rateDumpTypes.parameter.exportRateByTable: {
                        const psoTableName = find(rateDumpExport.variables.tableName, ps[execType], ["variable"]).data[0];
                        const tableName = _this.createInfoObject(injector[execType][rateDumpExport.variables.tableName].val(), parameterCaptions.tableName);
                        const tnArray = getExistArray(tableName.value.split(SIGN.nl));
                        if(isVoid(tnArray)) break;
                        tnArray.forEach(function(tn) {
                            const valueMap = createMultipleObject(mappingObjBase.concat([[psoTableName.variable, tn]]));
                            const bindParameter = getBindParameter([psoPhase, psoUserName, psoDbName, psoSysDate, psoTableName], valueMap);
                            runBatch(bindParameter);
                        });
                        break;
                    }
                }
            };
            const executeList = execType ? [execType] : allTypesStack;
            const checkAllResult = {
                error: false,
                messageList: new Array()
            };
            const v = new Validation();
            const vTypes = v.getTypes();
            const phaseLayout = v.getLayout(v.initLayout(phase.value, phase.name), [vTypes.required]);
            const userNameLayout = v.getLayout(v.initLayout(userName.value, userName.name), [vTypes.required, vTypes.notSpace]);
            const dbNameLayout = v.getLayout(v.initLayout(dbName.value, dbName.name), [vTypes.required, vTypes.notSpace]);
            const formatValidate = function(layout) {
                const actionLayout = v.getActionLayout();
                const exp = new RegExpUtil(layout.value);
                if(!exp.isYYYYMMDD()) {
                    actionLayout.error = true;
                    actionLayout.message = concatString(layout.label, " format is not valid");
                }
                return actionLayout;
            };
            const actionObj = { "format": formatValidate };
            const sysDateLayout = v.getLayout(v.initLayout(sysDate.value, sysDate.name), [vTypes.required, vTypes.notSpace, "format"], actionObj);
            v.reset().appendList([phaseLayout, userNameLayout, dbNameLayout, sysDateLayout]);
            const commonResult = v.exec();
            if(commonResult.error) {
                const message = concatString(concatString(SIGN.abs, blockLabel.commonParameter, SIGN.abe), SIGN.br, commonResult.message);
                checkAllResult.error = true;
                checkAllResult.messageList.push(message);
            }
            executeList.forEach(function(execType) {
                const label = blockLabel[execType];
                const injector = rateDumpState.injector[execType];
                const path = rateDumpState.path[execType];
                const batchPathLayout = v.getLayout(v.initLayout(path, parameterCaptions.batchPath), [vTypes.required]);
                const updateCheckResult = function(result) {
                    checkAllResult.error = true;
                    checkAllResult.messageList.push(concatString(concatString(SIGN.abs, label, SIGN.abe), SIGN.br, result.message));
                };
                switch(execType) {
                    case rateDumpTypes.parameter.exportRateByProductCode: {
                        const ratePSyouhnCd = _this.createInfoObject(injector[rateDumpExport.tableObject.rateP][rateDumpExport.variables.syouhnCd].val(), parameterCaptions.syouhnCd);
                        const rateVSyouhnCd = _this.createInfoObject(injector[rateDumpExport.tableObject.rateV][rateDumpExport.variables.syouhnCd].val(), parameterCaptions.syouhnCd);
                        const rateWSyouhnCd = _this.createInfoObject(injector[rateDumpExport.tableObject.rateW][rateDumpExport.variables.syouhnCd].val(), parameterCaptions.syouhnCd);
                        const combineValue = [ratePSyouhnCd.value, rateVSyouhnCd.value, rateWSyouhnCd.value].join(SIGN.nl);
                        const combineLayout = v.getLayout(v.initLayout(combineValue, parameterCaptions.syouhnCd), [vTypes.requiredWithLineBreak]);
                        v.reset().appendList([batchPathLayout, combineLayout]);
                        const requiredResult = v.exec();
                        if(requiredResult.error) {
                            updateCheckResult(requiredResult);
                        }
                        else {
                            const rpscLayout = v.getLayout(v.initLayout(ratePSyouhnCd.value, ratePSyouhnCd.name), [vTypes.notSpace]);
                            const rvscLayout = v.getLayout(v.initLayout(rateVSyouhnCd.value, rateVSyouhnCd.name), [vTypes.notSpace]);
                            const rwscLayout = v.getLayout(v.initLayout(rateWSyouhnCd.value, rateWSyouhnCd.name), [vTypes.notSpace]);
                            v.reset().appendList([rpscLayout, rvscLayout, rwscLayout]);
                            const result = v.exec();
                            if(result.error) {
                                updateCheckResult(result);
                            }
                        }
                        break;
                    }
                    case rateDumpTypes.parameter.exportRateVOnlyT210: {
                        const ryourituVer = _this.createInfoObject(injector[rateDumpExport.variables.ryourituVer].val(), parameterCaptions.ryourituVer);
                        const ryourituVerLayout = v.getLayout(v.initLayout(ryourituVer.value, ryourituVer.name), [vTypes.requiredWithLineBreak, vTypes.notSpace]);
                        v.reset().appendList([batchPathLayout, ryourituVerLayout]);
                        const result = v.exec();
                        if(result.error) {
                            updateCheckResult(result);
                        }
                        break;
                    }
                    case rateDumpTypes.parameter.exportRateByTable: {
                        const tableName = _this.createInfoObject(injector[rateDumpExport.variables.tableName].val(), parameterCaptions.tableName);
                        const tableNameLayout = v.getLayout(v.initLayout(tableName.value, tableName.name), [vTypes.requiredWithLineBreak, vTypes.notSpace]);
                        v.reset().appendList([batchPathLayout, tableNameLayout]);
                        const result = v.exec();
                        if(result.error) {
                            updateCheckResult(result);
                        }
                        break;
                    }
                }
            });
            if(checkAllResult.error) {
                throw new Error(checkAllResult.messageList.join(concatString(SIGN.br, SIGN.br)));
            }
            executeList.forEach(function(execType) {
                const path = rateDumpState.path[execType];
                const injector = rateDumpState.injector[execType];
                switch(execType) {
                    case rateDumpTypes.parameter.exportRateByProductCode: {
                        parameterSet[execType] = [
                            { variable: rateDumpExport.variables.tableName, value: null, bind: null },
                            { variable: rateDumpExport.variables.syouhnCd, value: null, bind: null }
                        ];
                        createExecuteBatchFile(parameterSet, execType, path);
                        execBatch(execType);
                        break;
                    }
                    case rateDumpTypes.parameter.exportRateVOnlyT210: {
                        parameterSet[execType] = [
                            { variable: rateDumpExport.variables.tableName, value: rateDumpExport.tableObject.rateV, bind: null, isUserCommand: false },
                            { variable: rateDumpExport.variables.syouhnCd, value: "T210", bind: null },
                            { variable: rateDumpExport.variables.ryourituVer, value: null, bind: null }
                        ];
                        createExecuteBatchFile(parameterSet, execType, path);
                        execBatch(execType);
                        break;
                    }
                    case rateDumpTypes.parameter.exportRateByTable: {
                        parameterSet[execType] = [
                            { variable: rateDumpExport.variables.tableName, value: null, bind: null }
                        ];
                        createExecuteBatchFile(parameterSet, execType, path);
                        execBatch(execType);
                        break;
                    }
                }
            });
            new FileSystem(tempPath).deleteFolder();
            new Notification().complete().open("Rate dump file exported successfully");
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
    },
    rateDumpClear: function(execType) {
        const _this = this;
        const types = _this.Define.TYPES;
        const rateDumpTypes = types.rateDump;
        const rateDumpState = _this.state.rateDump;
        const injector = rateDumpState.injector;
        const clear = function(obj, ak) {
            Object.keys(obj).forEach(function(key) {
                const target = obj[key];
                const isElement = target.jquery;
                if(!isElement) {
                    clear(target, ak);
                }
                else {
                    if(key === "batchPath") {
                        target.text(SIGN.none);
                        rateDumpState.path[ak] = null;
                    }
                    else {
                        target.val(SIGN.none);
                    }
                }
            });
        };
        Object.keys(injector).forEach(function(key) {
            let ak = null;
            if(isVoid(execType)) {
                ak = key;
            }
            else if(key === execType) {
                ak = execType;
            }
            else {
                return;
            }
            const obj = accessObject(injector, [ak]);
            clear(obj, ak);
        });
    }
};

const BatchUtil = function() {
    this.WSH = "WScript.Shell";
    this.intWindowStyle = {
        hideShellActiveOtherWindow: 0,
        activeShellResetSize: 1,
        activeShellMinSize: 2,
        activeShellMaxSize: 3,
        showShellLatestSize: 4,
        activeShellCurrentSize: 5,
        setWindowMinSizeActiveZorder: 6,
        showShellMinSize: 7,
        showShellCurrentSet: 8,
        activeShellResetSizePosition: 9,
        applicationSet: 10
    };
};
BatchUtil.prototype = {
    init: function() {
       const shell = new ActiveXObject(this.WSH);
       return shell;
    },
    getIntWindowStyle: function() {
        return this.intWindowStyle;
    },
    run: function(exePath, parameter, windowStyle, wait, logPath) {
        const shell = this.init();
        let commandList = [exePath];
        if(!isVoid(parameter) && typeIs(parameter).array) commandList = commandList.concat(parameter);
        if(!isVoid(logPath)) commandList.push(concatString("> ", logPath));
        const strCommand = commandList.join(SIGN.ws);
        return shell.Run(strCommand, windowStyle, wait);
    }
};
