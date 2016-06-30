import {debug} from '../utils';
import {
    Pattern,
    BOR,
    RECORD_URL,
    RECORD_TEMPLATE
} from './patterns';

class Page {
    url: string = '';
    template: string = '';
}

export class Parser {

    constructor() {}

    file: string = '';
    records: string[] = [];
    pages: Page[] = [];

    loadFile(file: string): void {
        this.file = file;     //Error check
        this.processFile(file, BOR);
        console.log(this.records.length);
    }

    processFile(file: string, borPattern: Pattern): void {
        this.getRecords(this.file, borPattern);
        for (let record of this.records) {
            this.processRecord(record);
        }
        debug(this.pages[0]);
    }

    private getRecords(file: string, borPattern: Pattern): void {
        let index: number = -1;
        for (let line of this.splitIntoLines(file)) {
            if (this.find(line, borPattern)) { index++; this.records[index] = '' }
            if (index > -1) { this.records[index] += line + '\n'; }
        }
    }

    private processRecord(record: string): void {
        let page = new Page();
        for (let line of this.splitIntoLines(record)) {
            if (this.find(line, RECORD_URL)) { page.url = line; }
            if (this.find(line, RECORD_TEMPLATE)) { page.template = line; }
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