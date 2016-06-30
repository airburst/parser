import {debug, flatten} from '../utils';
import {
    Pattern,
    BOR,
    RECORD_URL,
    RECORD_TEMPLATE,
    ROW,
    COL,
    WIDGET,
    COL_WIDTH
} from './patterns';

class Column {
    width: number = 0;
    widgets: any[] = [];

    toString(): string {
        return 'width: ' + this.width + ', widgets: ' + flatten(this.widgets);
    }
}

class Row {
    constructor(type: string) {
        this.type = type;
    }

    type: string = '';
    cols: Column[] = [];

    toString(): string {
        return 'type: ' + this.type + ', cols: ' + this.cols.map((c) => {
            return c.toString();
        });
    }
}

class Page {
    url: string = '';
    template: string = '';
    rows: Row[] = [];

    addRow(type: string) {
        this.rows.push(new Row(type));
    }

    setRows(rows: Row[]) {
        this.rows = rows;
    }

    toString(): string {
        return 'url: ' + this.url + 'template: ' + this.template + ', cols: ' + this.rows.map((r) => {
            return r.toString();
        });
    }
}

export class Parser {
    constructor() { }

    file: string = '';
    records: string[] = [];
    pages: Page[] = [];

    loadFile(file: string): void {
        this.file = file;     //Error check
        this.processFile(file, BOR);
        //this.display();
        debug(this.pages[0].toString());
    }

    processFile(file: string, borPattern: Pattern): void {
        this.records = this.getCollection(this.file, borPattern);
        for (let record of this.records) {
            this.processRecord(record);
        }
    }

    display() {
        for (let p of this.pages) {
            debug(p.toString());
        }
    }

    private getCollection(block: string, pattern: Pattern): string[] {
        let index: number = -1,
            records: string[] = [];
        for (let line of this.splitIntoLines(block)) {
            if (pattern.findIn(line)) {
                index++;
                records[index] = ''
            }
            if (index > -1) { records[index] += line + '\n'; }
        }
        return records;
    }

    private getFieldInBlock(block: string, pattern: Pattern): string {
        for (let line of this.splitIntoLines(block)) {
            if (pattern.findIn(line)) {
                return pattern.removeMatchText(line);
            }
        }
        return undefined;
    }

    private splitIntoLines(text: string): string[] {
        return text.split('\n');
    }

    // This method will vary dependent on specific handling    
    private processRecord(record: string): void {
        let page = new Page();
        page.url = this.getFieldInBlock(record, RECORD_URL);
        page.template = this.getFieldInBlock(record, RECORD_TEMPLATE);
        page.setRows(this.processRows(record));
        this.pages.push(page);
    }

    private processRows(record: string): Row[] {
        let rows: Row[] = [];
        for (let row of this.getCollection(record, ROW)) {
            let r = new Row('TYPE');
            r.type = this.getFieldInBlock(row, ROW);
            r.cols = this.processCols(row);
            rows.push(r);
        }
        return rows;
    }

    private processCols(row: string): Column[] {
        let cols: any[] = [];
        for (let col of this.getCollection(row, COL)) {
            let c = new Column();
            c.width = this.getColumnWidth(this.getFieldInBlock(col, COL));
            c.widgets = this.processWidgets(col)
            cols.push(c);
        }
        return cols;
    }

    // Parse pattern '1 (): 12' to get 12   
    private getColumnWidth(text: string): number {
        let len: number = text.match(COL_WIDTH)[0].length;
        return parseInt(text.substr(len + 4, text.length), 10);
    }

    private processWidgets(col: string) {
        let widgets: string[] = [];
        for (let widget of this.getCollection(col, WIDGET)) {
            widgets.push(this.getFieldInBlock(col, WIDGET));
        }
        return widgets;
    }

}
