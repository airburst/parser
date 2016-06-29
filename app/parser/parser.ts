import {URL_PATTERN} from './patterns';

interface Page {
    url: string;
    template: string;
}

export class Parser {

    constructor() {}

    lines: string[];
    pages: Page[];

    loadFile(file: any) {
        this.lines = this.splitIntoLines(file);
        //this.blocks = this.find(file, URL_PATTERN);
    }

    splitIntoLines(text: string) {
        return text.split('\n');
    }

    find(text: string, pattern: RegExp) {
        return text.match(pattern);
    }

}