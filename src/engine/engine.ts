
import {myriad, Parser, Renderer} from 'marktex.js';

import  * as vscode from 'vscode';

export class MarkdownEngine {
    private readonly naiveRenderer: Renderer;
    private readonly naiveParser: Parser;

    constructor() {
        this.naiveRenderer = myriad.newRenderer({
            parserOptions: myriad.newRules({enableLaTeX: true}),
            rendererOptions: {enableLaTeX: true},
        });

        this.naiveParser = myriad.newParser({
            parserOptions: myriad.newRules({enableLaTeX: true}),
        });
    }

    render(s: string): string {
        try {
            return this.naiveRenderer.renderString(s);
        } catch (e) {
            vscode.window.showErrorMessage(e.message);
            return '';
        }
    }

    debug(s: string): string {
        try {
            return JSON.stringify(
                this.naiveParser.parseBlockElements(myriad.newStringStream(s)), undefined, 2);
        } catch (e) {
            return '{}';
        }
    }

    renderToWebviewPage(s: string): string {
        return `<!DOCTYPE html>
        <html lang="zh">
<head>
    <title>Test</title>
    <meta charset="UTF-8">
    <script src="https://cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
        window.MathJax.Hub.Config({
            showProcessingMessages: true,
            messageStyle: 'none',
            // elements: document.getElementsByClassName('markdown-body'),
            extensions: ['tex2jax.js'],
            jax: ['input/TeX', 'output/HTML-CSS'],
            tex2jax: {
                inlineMath: [['$', '$']],
                displayMath: [['$$', '$$']],
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'],
                ignoreClass: 'comment-content'
            },
            'HTML-CSS': {
                availableFonts: ['STIX', 'TeX'],
                showMathMenu: false
            }
        });

        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);

    </script>
</head>
<body>${this.render(s)}</body>
</html>`
    }
};

