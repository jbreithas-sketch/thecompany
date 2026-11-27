import * as SQLite from 'expo-sqlite';
import type {Save,SaveStore} from '../domain/model';
let pending:Promise<SQLite.SQLiteDatabase>|undefined;
function db(){return pending??=(async()=>{const d=await SQLite.openDatabaseAsync('novaria.db');await d.execAsync('CREATE TABLE IF NOT EXISTS saves (id INTEGER PRIMARY KEY, payload TEXT NOT NULL)');return d;})().catch(e=>{pending=undefined;throw e;});}
export const store:SaveStore={
 async load(){const row=await (await db()).getFirstAsync<{payload:string}>('SELECT payload FROM saves WHERE id=1');if(!row)return null;const s=JSON.parse(row.payload);if(s.version!==1||typeof s.hero!=='string'||typeof s.node!=='string'||!Array.isArray(s.memories))throw Error('Invalid save');return s as Save;},
 async save(s){await (await db()).runAsync('INSERT INTO saves(id,payload) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload',JSON.stringify(s));},
 async clear(){await (await db()).runAsync('DELETE FROM saves WHERE id=1');}
};