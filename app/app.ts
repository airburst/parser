import {debug} from './utils';
import {Parser} from './parser/parser';

// Main
document.addEventListener('DOMContentLoaded', () => {
    //let drop = document.getElementById('dropzone');
    // drop.addEventListener('drop', handleDrop, false);
    // if(drop.addEventListener) {
    //     drop.addEventListener('dragenter', handleDragover, false);
    //     drop.addEventListener('dragover', handleDragover, false);
    //     drop.addEventListener('drop', handleDrop, false);
    // }
    let xlf = document.getElementById('xlf');
    xlf.addEventListener('change', handleFile, false);
});

// function handleDrop(e) {
//     console.log('dropped..');
//     e.stopPropagation();
//     e.preventDefault();
//     handleFile(e);
// }

function handleDragover(e: any) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleFile(e: any) {
    let files = e.target.files,
        f: any;
    for (let i = 0, f = files[i]; i != files.length; ++i) {
        let reader = new FileReader();
        let name = f.name;
        reader.onload = function(e: any) {
            let data = e.target.result;
            loadFile(data);
        };
        reader.readAsBinaryString(f);
    }
}

function loadFile(file: any) {
    //debug(file);
    let parser = new Parser();
    parser.loadFile(file);
}
