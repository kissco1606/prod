﻿MSDASQL	Microsoft OLE DB Provider for ODBC	ODBC データベース
Microsoft.Jet.OLEDB.4.0	Microsoft OLE DB Provider for Microsoft Jet	Microsoft Jet データベース
Microsoft.ACE.OLEDB.12.0	Microsoft Office 12.0 Access Database Engine OLE DB Provider	Microsoft Access データベース
SQLOLEDB	Microsoft OLE DB Provider for SQL Server	Microsoft SQL Server
SQLNCLI10	SQL Server Native Client 10.0	Microsoft SQL Server
MSDAORA	Microsoft OLE DB Provider for Oracle	Oracle データベース

"PROVIDER=Microsoft.Jet.OLEDB.4.0;Data Source=.\hello.mdb"
cn.Open( "PROVIDER=MSDAORA;Data Source=ORCL", "scott", "tiger" );
cn.Open("PROVIDER=MSDASQL;Driver={Microsoft ODBC for Oracle};Server=ORCL", "scott", "tiger" );

https://social.microsoft.com/Forums/en-US/ae09c2f0-1442-4a1a-8b62-0938ee625579/javascript-to-access-oracle-database?forum=crmdevelopment
var connectionstring = "Provider=msdaora;Data Source=MyOracleDB;Persist Security Info=False;Integrated Security=Yes;";  
var conn = new ActiveXObject("ADODB.Connection");  
    conn.open(connectionstring); 


https://blog.goo.ne.jp/frontflug/e/17b210322eba3ff176663f07760b9c9b
Open("Driver={Microsoft ODBC for Oracle};CONNECTSTRING=ORCL;UID=TESTUSER;PWD=TESTPWD;")

https://forums.pentaho.com/threads/68707-How-can-I-connect-to-Oracle-by-JavaScript-Step/
https://community.oracle.com/thread/281624?start=0&tstart=0
Open("Provider=OraOLEDB.Oracle;Data Source=(DESCRIPTION=(CID=GTU_APP)(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=10.20.37.22)(PORT=1521)))(CONNECT_DATA=(SID=orcl)(SERVER=DEDICATED)));User Id=system;Password=manager1;")


https://qiita.com/tnakagawa/items/ea9c23891f0c297cdf64