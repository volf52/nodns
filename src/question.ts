import {QueryType} from './QueryType';
import { Buffer } from 'node:buffer';
// import assert from 'node:assert';

class Question{

    url : string
    query_type : number

    constructor(domain:string,query_type:string){
        this.url = domain;
        if (query_type === 'A') 
            this.query_type=QueryType.A;
        else
        this.query_type = QueryType.CNAME;
    }

    to_bytes():Buffer{
        var len=this.url.length+1;
        const buf = Buffer.alloc(len);
        let parts : string[] =this.url.split(".")
        var parts_len: number [] =[];
        var pos=0;
        for (let i = 0; i < parts.length; i++) {            
            parts_len[i]=parts[i].length;
            buf.writeIntBE(parts_len[i],pos,1)
            buf.write(parts[i],pos+1,'utf8');
            pos=pos+1+parts_len[i];
        }
        return buf
    }
    
    
}
