import {BOR} from './patterns';
import {debug} from '../utils';

interface Page {
    url: string;
    template: string;
}

export class Parser {

    constructor() {}

    file: string = '';
    records: string[] = [];
    pages: Page[] = [];

    loadFile(file: string): void {
        this.file = file;     //Error check
        this.processFile(file, BOR);
    }

    processFile(file: string, borPattern: RegExp): void {
        this.getRecords(this.file, BOR);
        //debug(this.records[0]);
        for (let record of this.records) {
            this.processRecord(record);
        }
    }

    private getRecords(file: string, borPattern: RegExp): void {
        let index: number = -1;
        for (let line of this.splitIntoLines(file)) {
            if (this.find(line, borPattern)) { index++; this.records[index] = '' }
            if (index > -1) { this.records[index] += line; }
        }
    }

    private processRecord(record: string): void {
        
    }

    private splitIntoLines(text: string): string[] {
        return text.split('\n');
    }

    find(text: string, pattern: RegExp) {
        return text.match(pattern);
    }

}