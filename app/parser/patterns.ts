export class Pattern {

    constructor(matchText: string) {
        this.text = matchText;
        this.regex = this.makeRegex(matchText);
    }

    text: string;
    regex: RegExp;

    makeRegex = (text: string): RegExp => {
        return new RegExp('^' + text + '\(.*)$', 'gm');
    };

    public removeMatchText(text: string): string {
        let pos: number = text.indexOf(this.text),
            result = text.substr(0, pos) + text.substr(pos + this.text.length, text.length);
        return result.trim();
    }

    public findIn(text: string) {
        return text.match(this.regex);
    }
}

// Set of regex patterns to match in file
export const BOR = new Pattern(' Pagebuilder Template ');
export const RECORD_URL = new Pattern(' Pagebuilder Template ');
export const RECORD_TEMPLATE = new Pattern(' Template ');
export const ROW = new Pattern(' Dropzone:  ');
export const COL = new Pattern('           Column ');
export const WIDGET = new Pattern('               Widget ');

export const COL_WIDTH = /^\d+ ()/g;