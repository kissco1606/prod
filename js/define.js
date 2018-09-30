const SC = ";";
const BS = "(";
const BE = ")";
const NL = "\n";
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
const DEFAULT = {
    uid: "XXX",
    pwd: "XXX",
    protocol: "TCP",
    host: "196.168.30.66",
    port: "1521",
    sid: "orcl",
    server: "DEDICATED"
};