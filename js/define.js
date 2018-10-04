const SC = ";";
const BS = "(";
const BE = ")";
const NL = "\n";
const WHITE_SPACE = " ";

const ADODB = {
    connection: "ADODB.Connection",
    recordset: "ADODB.Recordset",
    command: "ADODB.Command"
};
const ODBC = {
    driver: "Driver={Microsoft ODBC for Oracle};",
    connect_string: "CONNECTSTRING=ORCL;",
    uid: "UID=",
    pwd: "PWD="
};
const DIRECT = {
    provider: "Provider=OraOLEDB.Oracle;",
    cid: "CID=GTU_APP",
    protocol: "PROTOCOL=",
    host: "HOST=",
    port: "PORT=",
    sid: "SID=",
    server: "SERVER=",
    id: "User Id=",
    pw: "Password="
};
const CONNECT_TYPE = {
    odbc: "ODBC",
    direct: "DIRECT"
};
const DEFAULT_SET = {
    uid: "USERPSSE_X2",
    pwd: "USERPSSE_X2",
    protocol: "TCP",
    host: "192.168.40.206",
    port: "1521",
    sid: "xora",
    server: "DEDICATED"
};
const state = {
	db: null
};
