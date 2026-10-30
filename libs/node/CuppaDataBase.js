/*
  V 0.0.16
  REQUIREMENT
    npm install mysql2
* */

import {cuppa} from "./cuppa.js";
import mysql from "mysql2";

export default class CuppaDataBase {
	host;
	database;
	user;
	password;
	port;
	pool;
	connectionLimit;
	autoConnectTime = 5000;
	connectedCallback;
	
	constructor(host, database, user, password, port = 3306, connectionLimit = 20, connectedCallback) {
		cuppa.bindAll(this);
		this.host = host; this.database = database; this.user = user; this.password = password; this.port = port; this.connectionLimit = connectionLimit; this.connectedCallback = connectedCallback;
		this.connect().then();
	}
	
	async connect(){
		try{
			this.pool = await mysql.createPool({
				host: this.host,
				database: this.database,
				user: this.user,
				password:this.password,
				port:this.port,
				dateStrings:true,
				waitForConnections: true,
				connectionLimit: this.connectionLimit,
				idleTimeout: 60000,
				queueLimit: 0,
				enableKeepAlive: true,
				keepAliveInitialDelay: 0,
			});
			await this.testConnection();
			if(this.connectedCallback) this.connectedCallback();
		}catch (err){ console.log(err) }
	}
	
	async add(table, data, condition, columnsToReturn, noEscape, showError = true, classRef = null, classArgs = [], conditionArgs = [], showQuery){
		let record = await this.getRow(table, condition, "", "id", true, null, null, conditionArgs);
		if(!record){
			return await this.insert(table, data, columnsToReturn, noEscape, showError, classRef, classArgs, showQuery);
		}else{
			return await this.update(table, data, condition, columnsToReturn, noEscape, showError, classRef, classArgs, conditionArgs, showQuery);
		}
	}
	
	async add2({table = "", data = {}, condition = "", conditionArgs = [], columnsToReturn = "", noEscape = "", showError = true, classRef = null, classArgs = [], showQuery}){
		return await this.add(table, data, condition, columnsToReturn, noEscape, showError, classRef, classArgs, conditionArgs, showQuery);
	}
	
	async insert(table, data, columnsToReturn, noEscape, showError = true, classRef = null, classArgs = [], showQuery){
		data = this.escape({...data}, noEscape);
		let keys = Object.keys(data);
		let values = Object.values(data);
		let sql = "INSERT INTO " + table + " ( `";
		sql += keys.join("` , `");
		sql += "` ) VALUES ( ";
		sql += values.join(" , ")
		sql += " ) "
		let result = await this.sql(sql, showError);
		if(result && result.insertId){
			result = await this.getRow(table, `id = ${result.insertId}`, "", columnsToReturn, showError, classRef, classArgs, showQuery);
		}
		return result;
	}
	
	async insert2({table = "", data = {}, columnsToReturn = "", noEscape = "", showError = true, classRef = null, classArgs = [], showQuery}){
		return await this.insert(table, data, columnsToReturn, noEscape, showError, classRef, classArgs, showQuery);
	}
	
	async update(table, data, condition, columnsToReturn, noEscape, showError = true, classRef = null, classArgs = [], conditionArgs = [], showQuery){
		data = this.escape({...data}, noEscape);
		let sql = "UPDATE " + table + " SET ";
		Object.entries(data).map(([key, value], index)=>{
			if(!index) sql += "`" + key + "`=" + value;
			else sql += ", `" + key + "`=" + value;
		})
		sql += " WHERE " + condition;
		let result = await this.sql(sql, showError, null, null, conditionArgs);
		if(result){
			result = await this.getRow(table, condition, "", columnsToReturn, showError, classRef, classArgs, conditionArgs, showQuery);
		}
		return result;
	}
	
	async update2({table = "", data = {}, condition = "", conditionArgs = [], columnsToReturn = "", noEscape = "", showError = true, classRef = null, classArgs = [], showQuery}){
		return await this.update(table, data, condition, columnsToReturn, noEscape, showError, classRef, classArgs, conditionArgs, showQuery);
	}
	
	async getList(table, condition, limit, orderBy, columnsToReturn, showError = true, classRef = null, classArgs = [], conditionArgs = [], showQuery){
		let sql = "SELECT * FROM " + table;
		if (columnsToReturn)  sql = "SELECT " + columnsToReturn + " FROM " + table;
		if (condition) sql += " WHERE " + condition;
		if (orderBy) sql += " ORDER BY " + orderBy;
		if (limit) sql += " LIMIT " + limit;
		return await this.sql(sql, showError, classRef, classArgs, conditionArgs, showQuery);
	}
	
	async getList2({table = '', condition = '', conditionArgs = [], limit = '', orderBy = '', columnsToReturn = '', showError = true, classRef = null, classArgs = [], showQuery}){
		return await this.getList(table, condition, limit, orderBy, columnsToReturn, showError, classRef, classArgs, conditionArgs, showQuery);
	}
	
	async getRow(table, condition, orderBy, columnsToReturn, showError = true, classRef = null, classArgs = [], conditionArgs = [], showQuery){
		let sql = "SELECT * FROM " + table;
		if (columnsToReturn) sql = "SELECT " + columnsToReturn + " FROM " + table;
		if(condition) sql += ` WHERE ${condition} `;
		if(orderBy) sql += ` ORDER BY ${orderBy} `;
		sql += " LIMIT 1";
		let result = await this.sql(sql, showError, classRef, classArgs, conditionArgs, showQuery);
		if(result){
			return result[0];
		}
		return null;
	}
	
	async getRow2({table = '', condition = '', conditionArgs = [], orderBy = '', columnsToReturn = '', showError = true, classRef = null, classArgs = [], showQuery}){
		return await this.getRow(table, condition, orderBy, columnsToReturn, showError, classRef, classArgs, conditionArgs, showQuery);
	}
	
	async delete(table, condition, showError = true, conditionArgs =[], showQuery){
		let sql = `DELETE FROM ${table} `;
		if(condition) sql += ` WHERE ${condition} `;
		await this.sql(sql, showError, null, null, conditionArgs, showQuery);
		return null;
	}
	
	async delete2({table = '', condition = '', conditionArgs = [], showError = true, showQuery}){
		return await this.delete(table, condition, showError, conditionArgs, showQuery);
	}
	
	async getTotalRows(table, condition, showError = true, conditionArgs = [], showQuery){
		let sql = "SELECT COUNT(*) as 'total' FROM " + table;
		if(condition) sql += ` WHERE ${condition} `;
		let result = (await this.sql(sql, showError, null, null, conditionArgs, showQuery));
		if(result) return result[0].total;
		return 0
	}
	
	async getTotalRows2({table = '', condition = '', conditionArgs = [], showError = true, showQuery}){
		return await this.getTotalRows(table, condition, showError, conditionArgs, showQuery);
	}
	
	async getTotalRowsByQuery(sql, showError = true, conditionArgs = [], showQuery){
		let result = (await this.sql(sql, showError, null, null, conditionArgs, showQuery));
		if(result) return result[0].total;
		return 0
	}
	
	async sql(query, showError = true, classRef = null, classArgs = null, queryArgs = [], showQuery = false){
		if(showQuery) console.log(query);
		let [result, error] = await new Promise((resolve) => {
			this.pool.execute(query, queryArgs, function (error, results) {
				if (error){
					resolve([null, error]);
				}else{
					resolve([results]);
				}
			});
		});
		if(error?.code === 'ECONNREFUSED'){
			if(showError) console.log(error);
			this.onError(error);
			return null;
		}
		result = this.castToClassList(result, classRef, classArgs);
		return result;
	}
	
	async sql2({query = '', queryArgs = [], showError = true, classRef = null, classArgs = null}){
		return await this.sql(query, showError, classRef, classArgs, queryArgs);
	}
	
	escape(data, noEscape = ""){
		if(!noEscape) { noEscape = ""; }
		if(cuppa.isNull(data)) { return; }
		if(typeof data === 'string'){
			data = SqlString.escape(data);
			data = data.slice(1, -1)
			return "'"+data+"'";
		}
		if(noEscape === "*" || noEscape === "all") {
			return data;
		}
		Object.keys(data).map(key=>{
			if(noEscape.indexOf(key) !== -1) {
				return;
			}
			let value = data[key];
			if(value === "NOW()") {
				return;
			}
			value = SqlString.escape(value);
			data[key] = value;
		})
		return data;
	}
	
	prepare(string, args = [], {removeQuotes = false, auto = false} = {}){
		if(!args?.length) {
			return string;
		}
		for(let i = 0; i < args.length; i++){
			let arg = args[i];
			if(Array.isArray(arg)){
				arg.forEach((val, index)=>{
					if(!auto){
						arg[index] = this.escape(val);
					}else{
						arg[index] = this.escape(val);
					}
					if(removeQuotes) arg[index] = cuppa.replace(arg[index], "'", "");
				});
				string = string.replace('?', arg.join(','));
			}else{
				if(!auto) arg = this.escape(arg);
				if(removeQuotes) arg = cuppa.replace(arg, "'", "");
				string = string.replace('?', arg);
			}
		}
		return string;
	}
	
	castToClassList(result, classRef, classArgs){
		if(!result?.length || !classRef) return result;
		let arrayData = [];
		for(let i = 0; i < result.length; i++){
			let row = result[i];
			let classObject = new classRef(...(classArgs || []));
			Object.keys(row).forEach(key=>{ classObject[key] = row[key]; })
			arrayData.push(classObject);
		}
		return arrayData;
	}
	
	async callStoredProcedure(procedureName, params, showError = true, classRef = null, classArgs = []) {
		const placeholders = params.map(() => '?').join(',');
		let sql = `CALL ${procedureName}(${placeholders})`;
		let result = await this.sql2(sql, params, showError, classRef, classArgs);
		if(result){
			return result;
		}
		return null;
	}
	
	async testConnection(){
		return await this.sql2({query:'SELECT 1', showError:true});
	}
	
	static adjustDate = function(date){
		if(!date) return '';
		if(typeof date === 'object'){
			date = date.toISOString();
		}
		date = date.replace('Z','');
		date = date.replace('T',' ');
		return date;
	}
	
	onError(err){
		console.error(`ERROR ESTABLISHING DATABASE CONNECTION | host: ${this.host}, port: ${this.port}, database: ${this.database}, user: ${this.user}, pass: ${this.password}`);
		setTimeout(()=>this.connect(), this.autoConnectTime);
	}
}


// SqlString Escape
var SqlString = {};
var ID_GLOBAL_REGEXP    = /`/g;
var QUAL_GLOBAL_REGEXP  = /\./g;
var CHARS_GLOBAL_REGEXP = /[\0\b\t\n\r\x1a\"\'\\]/g; // eslint-disable-line no-control-regex
var CHARS_ESCAPE_MAP    = {
	'\0'   : '\\0',
	'\b'   : '\\b',
	'\t'   : '\\t',
	'\n'   : '\\n',
	'\r'   : '\\r',
	'\x1a' : '\\Z',
	'"'    : '\\"',
	'\''   : '\\\'',
	'\\'   : '\\\\'
};

SqlString.escapeId = function escapeId(val, forbidQualified) {
	if (Array.isArray(val)) {
		var sql = '';
		
		for (var i = 0; i < val.length; i++) {
			sql += (i === 0 ? '' : ', ') + SqlString.escapeId(val[i], forbidQualified);
		}
		
		return sql;
	} else if (forbidQualified) {
		return '`' + String(val).replace(ID_GLOBAL_REGEXP, '``') + '`';
	} else {
		return '`' + String(val).replace(ID_GLOBAL_REGEXP, '``').replace(QUAL_GLOBAL_REGEXP, '`.`') + '`';
	}
};

SqlString.escape = function escape(val, stringifyObjects, timeZone) {
	if (val === undefined || val === null) {
		return 'NULL';
	}
	
	switch (typeof val) {
		case 'boolean': return (val) ? 'true' : 'false';
		case 'number': return val + '';
		case 'object':
			if (Object.prototype.toString.call(val) === '[object Date]') {
				return SqlString.dateToString(val, timeZone || 'local');
			} else if (Array.isArray(val)) {
				return SqlString.arrayToList(val, timeZone);
			} else if (Buffer.isBuffer(val)) {
				return SqlString.bufferToString(val);
			} else if (typeof val.toSqlString === 'function') {
				return String(val.toSqlString());
			} else if (stringifyObjects) {
				return escapeString(val.toString());
			} else {
				return SqlString.objectToValues(val, timeZone);
			}
		default: return escapeString(val);
	}
};

SqlString.arrayToList = function arrayToList(array, timeZone) {
	var sql = '';
	
	for (var i = 0; i < array.length; i++) {
		var val = array[i];
		
		if (Array.isArray(val)) {
			sql += (i === 0 ? '' : ', ') + '(' + SqlString.arrayToList(val, timeZone) + ')';
		} else {
			sql += (i === 0 ? '' : ', ') + SqlString.escape(val, true, timeZone);
		}
	}
	
	return sql;
};

SqlString.format = function format(sql, values, stringifyObjects, timeZone) {
	if (values == null) {
		return sql;
	}
	
	if (!Array.isArray(values)) {
		values = [values];
	}
	
	var chunkIndex        = 0;
	var placeholdersRegex = /\?+/g;
	var result            = '';
	var valuesIndex       = 0;
	var match;
	
	while (valuesIndex < values.length && (match = placeholdersRegex.exec(sql))) {
		var len = match[0].length;
		
		if (len > 2) {
			continue;
		}
		
		var value = len === 2
			? SqlString.escapeId(values[valuesIndex])
			: SqlString.escape(values[valuesIndex], stringifyObjects, timeZone);
		
		result += sql.slice(chunkIndex, match.index) + value;
		chunkIndex = placeholdersRegex.lastIndex;
		valuesIndex++;
	}
	
	if (chunkIndex === 0) {
		// Nothing was replaced
		return sql;
	}
	
	if (chunkIndex < sql.length) {
		return result + sql.slice(chunkIndex);
	}
	
	return result;
};

SqlString.dateToString = function dateToString(date, timeZone) {
	var dt = new Date(date);
	
	if (isNaN(dt.getTime())) {
		return 'NULL';
	}
	
	var year;
	var month;
	var day;
	var hour;
	var minute;
	var second;
	var millisecond;
	
	if (timeZone === 'local') {
		year        = dt.getFullYear();
		month       = dt.getMonth() + 1;
		day         = dt.getDate();
		hour        = dt.getHours();
		minute      = dt.getMinutes();
		second      = dt.getSeconds();
		millisecond = dt.getMilliseconds();
	} else {
		var tz = convertTimezone(timeZone);
		
		if (tz !== false && tz !== 0) {
			dt.setTime(dt.getTime() + (tz * 60000));
		}
		
		year       = dt.getUTCFullYear();
		month       = dt.getUTCMonth() + 1;
		day         = dt.getUTCDate();
		hour        = dt.getUTCHours();
		minute      = dt.getUTCMinutes();
		second      = dt.getUTCSeconds();
		millisecond = dt.getUTCMilliseconds();
	}
	
	// YYYY-MM-DD HH:mm:ss.mmm
	var str = zeroPad(year, 4) + '-' + zeroPad(month, 2) + '-' + zeroPad(day, 2) + ' ' +
		zeroPad(hour, 2) + ':' + zeroPad(minute, 2) + ':' + zeroPad(second, 2) + '.' +
		zeroPad(millisecond, 3);
	
	return escapeString(str);
};

SqlString.bufferToString = function bufferToString(buffer) {
	return 'X' + escapeString(buffer.toString('hex'));
};

SqlString.objectToValues = function objectToValues(object, timeZone) {
	var sql = '';
	
	for (var key in object) {
		var val = object[key];
		
		if (typeof val === 'function') {
			continue;
		}
		
		sql += (sql.length === 0 ? '' : ', ') + SqlString.escapeId(key) + ' = ' + SqlString.escape(val, true, timeZone);
	}
	
	return sql;
};

SqlString.raw = function raw(sql) {
	if (typeof sql !== 'string') {
		throw new TypeError('argument sql must be a string');
	}
	
	return {
		toSqlString: function toSqlString() { return sql; }
	};
};

function escapeString(val) {
	var chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex = 0;
	var escapedVal = '';
	var match;
	
	while ((match = CHARS_GLOBAL_REGEXP.exec(val))) {
		escapedVal += val.slice(chunkIndex, match.index) + CHARS_ESCAPE_MAP[match[0]];
		chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex;
	}
	
	if (chunkIndex === 0) {
		// Nothing was escaped
		return "'" + val + "'";
	}
	
	if (chunkIndex < val.length) {
		return "'" + escapedVal + val.slice(chunkIndex) + "'";
	}
	
	return "'" + escapedVal + "'";
}

function zeroPad(number, length) {
	number = number.toString();
	while (number.length < length) {
		number = '0' + number;
	}
	
	return number;
}

function convertTimezone(tz) {
	if (tz === 'Z') {
		return 0;
	}
	
	var m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
	if (m) {
		return (m[1] === '-' ? -1 : 1) * (parseInt(m[2], 10) + ((m[3] ? parseInt(m[3], 10) : 0) / 60)) * 60;
	}
	return false;
}
