export class Pattern {

    constructor(matchText: string) {
        this.text = matchText;
        this.regex = this.makeRegex(matchText);
    }

    text: string;
    regex: RegExp;

    makeRegex = (text: string): RegExp => {
        return new RegExp('^' + text + '\ (.*)$', 'gm');
    };
}

// Set of regex patterns to match in file
export const BOR = new Pattern(' Pagebuilder Template');
export const RECORD_URL = new Pattern(' Pagebuilder Template');
export const RECORD_TEMPLATE = new Pattern(' Template');
