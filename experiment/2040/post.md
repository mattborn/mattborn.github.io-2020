# Experiment # 2040 — Cabinet Cards

Name inspired by [The Horse in Motion, 1878](https://en.wikipedia.org/wiki/The_Horse_in_Motion).

## Hypothesis

Any words in the browser can be individually masked and animated.

## Thought Process

Just a quick recap. Ask for a more detailed explanation.

1. Initialize with sets of possible values
2. Tokenize heading so we have DOM elements for specific, individual words
3. Start separate execution paths for each word
4. Wrap current word in an element
5. Select next word from possible values (random for now)
6. Append next word as an element
7. Use `overflow: hidden` to ensure next word is hidden
8. Add parent class to animate
9. Clean up the DOM once transition is complete
10. Repeat the execution path

[← View previous experiment](/experiment/2039/)