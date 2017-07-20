/**
hello .
3 5 + .
2 6 * .
*/

const str = "helloworld .";
var i = 0;
var n = str.length;
var d = [];
var print = console.log;

while (i < n) {
    var tok = '';

    while (i < n && str[i] != ' ') {
        tok += str[i];
        i++;
    }

    switch (tok) {
        case '+':
        case '-':
        case '.':
        case '*':
            d.push(tok);
            break;
        case '':
            break;
        default:
        // literal content
    }

    const alphas = tok.match(/[a-zA-Z]*/);

    if (alphas && alphas[0]) {
        d.push(tok);
        continue;
    }

    const nums = tok.match(/[0-9]*/);

    if (nums && nums[0]) {
        d.push(tok);
        continue;
    }

    i++;
}

n = d.length;
i = n;

var cmd = { token: null, args: [], argc: 0 };

var dic = {
    '.': { argc: 1, execute: cmd => print(cmd.args[0]) },
    '+': { argc: 2, execute: cmd => Number(cmd.args[0]) + Number(cmd.args[1]) },
    '-': { argc: 2, execute: cmd => Number(cmd.args[0]) - Number(cmd.args[1]) },
    '*': { argc: 2, execute: cmd => Number(cmd.args[0]) * Number(cmd.args[1]) },
    '/': { argc: 2, execute: cmd => Number(cmd.args[0]) / Number(cmd.args[1]) },
}

while (d.length > 0 || i >= 0) {
    const tok = d[i];

    if (dic[tok]) {
        cmd.token = tok;
        cmd.argc = dic[tok].argc;
        cmd.args = [];
    } else {
        cmd.args.push(tok);
        if (cmd.args.length == cmd.argc) {
            let result = dic[cmd.token].execute(cmd);
            if (result) {
                d.splice(i, cmd.argc + 1, result);
            } else {
                d.splice(i, cmd.argc + 1);
            }
            // cmd.token = null;
            i = d.length - 1;
            continue;
        }
    }

    i--;
}

process.exit();
