import { Buffer } from 'node:buffer';


export class QueryBuffer{

    // offset : number
    // size   : number
    // bytelen: number

    
    create(size: number): Buffer;
    create(url: string): Buffer; 


    create(x : unknown) : unknown {
        if (typeof x === 'string') {
            var size =x.length+1;
            const buf = Buffer.alloc(size);
            return buf
        } else if(typeof x === 'number') {
            const buf = Buffer.alloc(x);
            return   buf
        }
    }

    getOffsetArray(url:string[]): number[] {
        var offset : number[]=[];
        for(let i=0,j=0,k=0;i<url.length;i++,k=k+2){
            offset[k]=j;
            j=j+1;
            offset[k+1]=j;
            j=j+url[i].length;
        }      
        return offset
    }



}