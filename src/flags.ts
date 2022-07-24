export class Flags {
    // properties
    qr: boolean;
    aa: boolean;
    tc: boolean;
    rd: boolean;
    ra: boolean;

    private qr_mask: number = 0x8000;
    private aa_mask: number = 0x0400;
    private tc_mask: number = 0x0200;
    private rd_mask: number = 0x0100;
    private ra_mask: number = 0x0080;
    
    

    public constructor(qr:boolean = false,aa:boolean = false,tc:boolean = false,rd:boolean = true,ra:boolean = false) {
        this.qr = qr;
        this.aa = aa;
        this.tc = tc;
        this.rd = rd;
        this.ra = ra;
    }

    to_int() : number{
        let b : number = 0
        if (this.qr)
            b |= this.qr_mask
        if (this.aa)
            b |= this.aa_mask
        if (this.tc)
            b |= this.tc_mask
        if (this.rd)
            b |= this.rd_mask
        if (this.ra)
            b |= this.ra_mask
        return b;
    }

    parse_flags(flags_container : number) : Flags{
        var qr:boolean=(this.qr_mask & flags_container)  == this.qr_mask;
        var rd:boolean=(this.rd_mask & flags_container)  == this.rd_mask;
        var ra:boolean=(this.ra_mask & flags_container)  == this.ra_mask;
        var tc:boolean = (this.tc_mask & flags_container) == this.tc_mask;
        var aa:boolean=(this.aa_mask & flags_container) == this.aa_mask;
        return new Flags(qr,aa,tc,rd,ra)
    }
    

}