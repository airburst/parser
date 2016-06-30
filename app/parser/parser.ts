import {debug} from '../utils';
import {
    Pattern,
    BOR,
    RECORD_URL,
    RECORD_TEMPLATE,
    ROW,
    COLS
} from './patterns';

class Row {

    constructor(type: string) { 
        this.type = type;
    }
    
    type: string = '';
    cols: string[] = [];
}

class Page {
    url: string = '';
    template: string = '';
    rows: Row[] = [];

    addRow(type: string) {
        this.rows.push(new Row(type));
    }    
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

    processFile(file: string, borPattern: Pattern): void {
        this.records = this.getRecords(this.file, borPattern);
        for (let record of this.records) {
            this.processRecord(record);
        }
        debug(this.pages[0]);
    }

    private getRecords(file: string, borPattern: Pattern): string[] {
        let index: number = -1,
            records: string[] = [];
        for (let line of this.splitIntoLines(file)) {
            if (this.find(line, borPattern)) {
                index++;
                records[index] = ''
            }
            if (index > -1) {records[index] += line + '\n'; }
        }
        return records;
    }

    private processRecord(record: string): void {
        let page = new Page();
        for (let line of this.splitIntoLines(record)) {
            if (this.find(line, RECORD_URL)) { page.url = RECORD_URL.removeMatchText(line); }
            if (this.find(line, RECORD_TEMPLATE)) { page.template = RECORD_TEMPLATE.removeMatchText(line); }
            if (this.find(line, ROW)) { page.addRow(ROW.removeMatchText(line)); }
        }
        this.pages.push(page);
    }

    private splitIntoLines(text: string): string[] {
        return text.split('\n');
    }

    find(text: string, matchPattern: Pattern) {
        return text.match(matchPattern.regex);
    }

}
