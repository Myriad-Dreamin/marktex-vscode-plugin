# marktex

markdown rendered by MarkTex.js for Visual Studio Code

## Features

Example 1 Latex style new command

```
Latex style new command
=======================

\newcommand{\sstriling}[2]{\left\{#1 \atop #2\right\}}
\newcommand{\striling}[2]{{#1 \brack #2}}


## Stirling numbers

Stirling cycle numbers $\striling{n}{m}$ are defined  by
$$ \ln^m(1+z) = m! \sum_n (-1)^{n+m} \striling{n}{m} {z^n\over n!}$$
The numbers $(-1)^{n+m}\striling{n}{m}$ are also called Stirling numbers of the first kind.
Stirling subset numbers $\sstriling{n}{m}$, also called Stirling numbers
of the second kind, are defined by
$$ \left( e^z-1\right)^m = m! \sum_n\sstriling {n}{ m} {z^n\over n!}$$
and 2-associated Stirling subset numbers $\sstriling{n}{m}_{\ge 2}$ are
defined by 

$$ \left( e^z-1-z\right)^m = m!\sum_n\sstriling {n}{ m}_{\!\ge 2} {z^n\over n!}$$
```

## Requirements

+ vscode version >= 1.42.1

## Extension Settings

Todo

## Known Issues

+ `$` symbols for math blocks in inline style cannot be close together

## Release Notes


### 0.1.0

implement two commands:

+ preview MarkTeX files in vscode

+ compile MarkTeX files in vscode
