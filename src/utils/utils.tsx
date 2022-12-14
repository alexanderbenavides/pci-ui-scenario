import { PhaCurrent, PhaNew } from "./enums";

export function dateFomat(val: string): string {
    const dateISO = new Date(val);
    const date = dateISO.getDate();
    const month = dateISO.getMonth() + 1;
    const fullYear = dateISO.getFullYear();
    const yyyymmdd =  (fullYear <= 9 ? '0' + fullYear : fullYear) + '-' + (month<=9 ? '0' + month : month) + '-' + (date <=9 ? '0' + date : date);
    return yyyymmdd;
}

export function phaPipe(val: string): string {
    switch (val) {
        case PhaCurrent.YES:
            return PhaNew.YES;
        case PhaCurrent.NO:
            return PhaNew.NO;
        default:
            return PhaNew.NA;
    }
}

export function ConvertToCSV(arr: any[]) {
    const arrayLen = arr.length;
    let str = '';

    for (let i = 0; i < arrayLen; i++) {
        let line = '';
        for (const index in arr[i]) {
            if (line !== '') line += ', '

            line += `"${arr[i][index]}"`;
        }

        str += line + '\r\n';
    }    
    return str;
}