import {QueryType} from './QueryType';
import { Buffer } from 'node:buffer';
import {QueryBuffer} from './QueryBuffer';
// import assert from 'node:assert';

export class Question{

    url : string
    query_type : number
    query_class : number =1;

    constructor(domain:string,query_type:string){
        this.url = domain;
        if (query_type === 'A') 
            this.query_type=QueryType.A;
        else
        this.query_type = QueryType.CNAME;
    }

    
    to_bytes():Buffer{
        let parts : string[] =this.url.split(".")
        const buffer = new QueryBuffer();
        const buf=buffer.create(this.url);
        let offset : number[]=buffer.getOffsetArray(parts);
        var byteslen=1;
        const encoding ='utf-8'
        var parts_len : number[] =[];
        for (let i = 0,j=0; i < parts.length; i++,j=j+2) {            
            parts_len[i]=parts[i].length;
            buf.writeIntBE(parts_len[i],offset[j],byteslen)
            buf.write(parts[i],offset[j+1],encoding);
        }
        const buf2=buffer.create(5);
        buf2.writeInt8(0,0)
        buf2.writeInt16BE(this.query_type,1);
        buf2.writeInt16BE(this.query_class,3);
        var arr = [buf, buf2];
        var question_buf = Buffer.concat(arr);
        return question_buf
    }

    

    
    
}

