import { Buffer } from 'node:buffer';
import { hostname } from 'node:os';
import {QueryBuffer} from './QueryBuffer';


export class Response{

    url : string 
    query_type : number 
    query_class : number
    ttl : number
    len  : number 
    constructor(url:string="",query_type:number=1,query_class:number=1,ttl:number=0,len:number=0){
        this.url = url;
        this.query_type=query_type;
        this.query_class=query_class;
        this.ttl=ttl;
        this.len=len;
    }


    parse_response(buf:Buffer) : Response{
        var url=this.parse_hostname(buf);
        var query_type=this.parse_type(buf);
        var query_class=this.parse_class(buf);
        var ttl=this.parse_class(buf);
        var len=this.parse_len(buf);
        return new Response(url,query_type,query_class,ttl,len)
    }

    parse_hostname(buf : Buffer) : string{
        var index:number =12
        var len : number;
        var hostname : string =""
        do{
        len = buf.readInt8(index);
        if(len == 0)
            break;
        index++;
        var start =index;
        var end = start +len;
        hostname+=buf.toString('utf8', start, end)+"."
        index=end;
    }while(true)
    return hostname
    }

    parse_len(buf : Buffer ): number{
        const bytes_to_read:number=2
        const buf_size:number =buf.length-4;
        var pos = buf_size-bytes_to_read; 
        var len = buf.readInt16BE(pos);
        return len;
    }

    parse_ipv4(buf : Buffer ) : string{
        const bytes_to_read:number=4
        const buf_size:number =buf.length;
        var pos = buf_size-bytes_to_read; 
        var ipv4 : string[] =[]
        for(let i=0;i<bytes_to_read;i++){
            ipv4[i]=buf.readInt8(pos-1).toString()
            pos++;
        }
        return ipv4.join('.')
    }

    parse_ttl(buf : Buffer): number{
        const bytes_to_read:number=4
        const buf_size:number =buf.length-6;
        var pos = buf_size-bytes_to_read; 
        var ttl=buf.readInt32BE(pos);
        return ttl;
    }

    parse_type(buf:Buffer):number{
        const bytes_to_read:number=2
        const buf_size:number =buf.length-12;
        var pos = buf_size-bytes_to_read; 
        var type = buf.readInt16BE(pos);
        return type;
    }

    parse_class(buf : Buffer ): number{
        const bytes_to_read:number=2
        const buf_size:number =buf.length-10;
        var pos = buf_size-bytes_to_read; 
        var query_class = buf.readInt16BE(pos);
        return query_class;
    }




}

// const buf : Buffer =  [86,2a,81,80,00,01,00,01,00,00,00,00,06,67,6f,6f,67,6c,65,03,63,6f,6d,00,00,01,00,01,c0,0c,00,01,00,01,00,00,01,25,00,04,d8,3a,d3,8e]
// console.log(buf)