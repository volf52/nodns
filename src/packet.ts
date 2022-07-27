import { Buffer } from 'node:buffer';
import {Header } from './header';
import {Question} from './question';
import { Response } from './response';


export class Packet{

    header : Buffer;
    hostname : Buffer;

    constructor(header : Buffer, hostname:Buffer){
        this.header = header;
        this.hostname=hostname;
    }

    createQuery():Buffer{
        var arr = [this.header, this.hostname];
        var buf = Buffer.concat(arr);
        return buf
    }



}

// const q = new Question("www.google.com","A");
// const h =new Header();

// const qb:Buffer=q.to_bytes();
// const hb:Buffer=h.to_bytes();
// const packet =new Packet(hb,qb);
// const buf=packet.createQuery()

// console.log(buf)

// h.parse(buf);
// const resp = new Response();
// console.log(resp.parse_hostname(buf));
// console.log(resp.parse_ipv4(buf));
// console.log(resp.parse_ttl(buf));
