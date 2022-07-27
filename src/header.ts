import { Flags } from './flags';
import { Buffer } from 'node:buffer';
import {QueryBuffer} from './QueryBuffer';

import * as assert from 'node:assert';

export class Header {
    flags: Flags;
    private id: number  // 2 bytes

    // # qr: bool  # 1 bit
    // # aa: bool  # 1 bit
    // # tc: bool  # 1 bit
    // # rd: bool  # 1 bit
    // # ra: bool  # 1 bit
    // flags: DNSHeaderFlags

    z: number  // 3 bits
    rcode: number  // 4 bits

    qd_count: number  // 2 bytes - short
    an_count: number  // 2 bytes
    ns_count: number  // 2 bytes
    ar_count: number  // 2 bytes

    private z_mask: number = 0x0070;
    private rcode_mask: number = 0x000f;

    constructor(flags: Flags =new Flags(),qd_count:number=1,an_count:number=0,ns_count:number=0,ar_count:number=0,z:number= 2,rcode:number = 0,) {
        this.id = Math.floor(Math.random() * 255) + 1;
        this.flags = flags;
        this.qd_count = qd_count;
        this.an_count = an_count;
        this.ns_count = ns_count;
        this.ar_count = ar_count;
        this.z = z;
        this.rcode = rcode;
    }

    // METHODS

    to_bytes(): Buffer { // to change
        var flags_container: number = this.flags.to_int();
        flags_container |= (this.z << 4)
        flags_container += this.rcode // last 4 bits, so no shifts needed
        const buffer = new QueryBuffer();
        const buf=buffer.create(12);
        // const buf = Buffer.allocUnsafe(12);
        // const buf4 = Buffer.from([134, 42,288,0,1,0,0,0,0,0,0]);
        buf.writeInt16BE(this.id,0);
        buf.writeInt16BE(flags_container,2);
        buf.writeInt16BE(this.qd_count,4);
        buf.writeInt16BE(this.an_count,6);
        buf.writeInt16BE(this.ns_count,8);
        buf.writeInt16BE(this.ar_count,10);
        return buf;
    }

    parse(buf: Buffer):Header{
        if (Buffer.byteLength(buf) >= 12)
            var id:number = buf.readInt16BE(0);
            var flags_container: number= buf.readInt16BE(2);
            this.flags=this.flags.parse_flags(flags_container);
            var qd_count:number = buf.readInt16BE(4);
            var an_count:number = buf.readInt16BE(6);
            var ns_count:number = buf.readInt16BE(8);
            var ar_count:number = buf.readInt16BE(10);
            var z:number = (this.z_mask & flags_container);
            var rcode:number = (this.rcode_mask & flags_container);
            var tempheader:Header = new Header(this.flags,qd_count,an_count,ns_count,ar_count,z,rcode) 
            // tempheader.id=id;
            return tempheader
    }
}


