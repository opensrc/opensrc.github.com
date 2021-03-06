Markdown Help
=============

Paragraphs of text separated by blank lines are enclosed in `p`
tags but the underlying text remains with the original line breaks.
Click on this preview area and use Ctrl-A and Ctrl-C to copy this
text then Ctrl-V in the editor to markup and render this help text.

# h1 header tag
## h2 header tag
###### h6 header tag

*Italic text and * _more italic text_

**Bold text and ** __more Bold text__

*Italic **and** bold can be combined*

* Item 1 of an unordered list
* Item 2
  * Item 2a
  * Item 2b

*   Item 3

    If you indent extra paragraphs by 3 or 4 spaces then this text
    will be wrapped by `p` tags within the list item.

    Lists need something that starts at the begining of a new line to
    separate a list from whatever follows so we'll use a horizontal
    rule.

----

1. Item 1 of an ordered list
2. Item 2
    - Indented four spaces.
        + indented eight spaces.
    - Four spaces again.
3. Item 3
   * Item 3a
   * Item 3b

This plain http://google.com link is not marked up but this inline
[Google](http://google.com "Search The Web") link is. Here is a
reference-style link; [Check out GitHub][1] where the link definition
can be anywhere on the page but must be unique. If there is no trailing
link reference then the link tag itself can be used for the reference,
for example, [Youtube!] rocks. Links and email addresses can also be
enclosed in angle brackets to provide simple inline markup.

  [1]: https://github.com/
  [Youtube!]: http://www.youtube.com/

Here is an image -- ![This is Alt text](/favicon.ico "favicon.ico")

> Blockquotes use traditional email style angle brackets and can
> **include markup**.
>
> > You can even have nested blockquotes.

This is an example of `inline code` using backticks.

    // Code is just text indented by 4 spaces
    // Any markdown text or HTML will remain untouched

    function hello(str) {
      return "**Hello** " + (str||"_World_");
    }

And finally, if you need to do something that Markdown can't handle
then you can always just use HTML, however, block element begin and
end tags cannot be indented and must be separated by blank lines.
Span-level HTML can include markup but any block-level markup will
be ignored.

* Source: https://github.com/opensrc/opensrc.github.com/blob/master/lib/md/markdown.md
* License: http://www.gnu.org/licenses/agpl.html
* Version: 20120120
* Copyright: Mark Constable
