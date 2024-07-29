---
layout: post
title:  "Tufte-style Jekyll blog"
date:   2024-07-29 09:46:04
categories: jekyll css
---

{% newthought 'The Tufte Jekyll theme' %} is an attempt to create a website design with the look and feel of Edward Tufte's books and handouts. Tufte’s style is known for its extensive use of sidenotes, tight integration of graphics with text, and well-set typography.<!--more--> The idea for this project is essentially cribbed wholesale from Tufte and R Markdown's Tufte Handout format{% sidenote 'One' 'See [tufte-latex.github.io/tufte-latex/](https://tufte-latex.github.io/tufte-latex/) and [rmarkdown.rstudio.com/tufte_handout_format](http://rmarkdown.rstudio.com/tufte_handout_format.html)' %} This page is an adaptation of the [Tufte Handout PDF](http://rmarkdown.rstudio.com/examples/tufte-handout.pdf).

## Jekyll customizations

This Jekyll blog theme is based on the github repository by Edward Tufte [here](https://github.com/edwardtufte/tufte-css), which was orginally created by Dave Leipmann, but is now labeled under Edward Tufte's moniker. I borrowed freely from the Tufte-CSS repo and have transformed many of the typographic and page-structural features into a set of custom Liquid tags that make creating content using this style much easier than writing straight HTML. Essentially, if you know markdown, and mix in a few custom Liquid tags, you can be creating a website with this document style in short order.

The remainder of this sample post is a self-documenting survey of the features of the Tufte-Jekyll theme. I have taken almost all of the sample content from the [Tufte-css](https://github.com/edwardtufte/tufte-css) repo and embedded it here to illustrate the parity in appearence between the two. The additional verbiage and commentary I have added is to document the custom *Liquid* markup tags and other features that are bundled with this theme.

### The SASS settings file

I have taken much of the actual *Tufte-css* files and modified them as necessary to accomodate the needs inherent in creating a Jekyll theme that has additional writing aids such as the Liquid tags. I have also turned the CSS file into a [SASS](http://sass-lang.com) file (the .scss type).  This means that you can alter things like font choices, text color, background color, and underlining style by changing values in this file. When the Jekyll site is built using ```jekyll build``` the settings in this file will be compiled into the customized CSS file that the site uses. If you don't use SCSS or SASS, you are missing out on a huge productivity tool.

This file looks like this:

```
/* This file contains all the constants for colors and font styles */

$body-font:   ETBembo, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
// Note that Gill Sans is the top of the stack and corresponds to what is used in Tufte's books
// However, it is not a free font, so if it is not present on the computer that is viewing the webpage
// The free Google 'Lato' font is used instead. It is similar.
$sans-font:  "Gill Sans", "Gill Sans MT", "Lato", Calibri, sans-serif;
$code-font: Consolas, "Liberation Mono", Menlo, Courier, monospace;
$url-font: "Lucida Console", "Lucida Sans Typewriter", Monaco, "Bitstream Vera Sans Mono", monospace;
$text-color: #111;
$bg-color: #fffff8;
$contrast-color: #a00000;
$border-color: #333333;
$link-style: color; // choices are 'color' or 'underline'. Default is color using $contrast-color set above
```
Any of these values can be changed in the ```_sass/_settings.scss``` file before the site is built. The default values are the ones from *tufte-css*.

## Fundamentals

### Color

Although paper handouts obviously have a pure white background, the web is better served by the use of slightly off-white and off-black colors. I picked ```#fffff8``` and ```#111111``` because they are nearly indistinguishable from their 'pure' cousins, but dial down the harsh contrast. Tufte's books are a study in spare, minimalist design. In his book [The Visual Display of Quantitative Information](http://www.edwardtufte.com/tufte/books_vdqi), he uses a red ink to add some visual punctuation to the buff colored paper and dark ink. In that spirit, links are styled using a similar red color.

### Headings

Tufte CSS uses ```<h1>``` for the document title, ```<p>``` with class ```code``` for the document subtitle, ```<h2>``` for section headings, and ```<h3>``` for low-level headings. More specific headings are not encouraged. If you feel the urge to reach for a heading of level 4 or greater, consider redesigning your document:


> [It is] notable that the Feynman lectures (3 volumes) write about all of physics in 1800 pages, using only 2 levels of hierarchical headings: chapters and A-level heads in the text. It also uses the methodology of *sentences* which then cumulate sequentially into *paragraphs*, rather than the grunts of bullet points. Undergraduate Caltech physics is very complicated material, but it didn’t require an elaborate hierarchy to organize.

<cite>[http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000hB](http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000hB)</cite>


As a bonus, this excerpt regarding the use of headings provides an example of using block quotes. Markdown does not have a native ```<cite>``` shorthand, but real html can be sprinkled in with the Markdown text. In the previous example, the ```<cite>``` was preceded with a single return after the quotation itself. The previous blockquote was written in Markdown thusly:

```Liquid
[It is] notable that the Feynman lectures (3 volumes) write about all of physics in 1800 pages, using only 2 levels of hierarchical headings: chapters and A-level heads in the text. It also uses the methodology of *sentences* which then cumulate sequentially into *paragraphs*, rather than the grunts of bullet points. Undergraduate Caltech physics is very complicated material, but it didn’t require an elaborate hierarchy to organize.
<cite>[http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000hB](http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000hB)</cite>
```



{% newthought 'In his later books' %}{% sidenote 'two' '[http://www.edwardtufte.com/tufte/books_be](http://www.edwardtufte.com/tufte/books_be)'%}, Tufte starts each section with a bit of vertical space, a non-indented paragraph, and sets the first few words of the sentence in small caps. To accomplish this using this style, enclose the sentence fragment you want styled with small caps in a custom Liquid tag called 'newthought' like so:

```Liquid
{{ "{% newthought 'In his later books'" }} %}
```

### Text

In print, Tufte uses the proprietary Monotype Bembo{% sidenote 3 'See Tufte’s comment in the [Tufte book fonts](http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000Vt) thread.' %} font. A similar effect is achieved in digital formats with the now open-source ETBembo, which Tufte-Jekyll supplies with a ```@font-face``` reference to a .ttf file. Thanks to [Linjie Ding](https://github.com/daveliepmann/tufte-css/commit/0a810a7d5f4707941c6f9fe99a53ec41f50a5c00), italicized text uses the ETBembo Italic font instead of mechanically skewing the characters. In case ETBembo somehow doesn’t work, Tufte CSS degrades gracefully to other serif fonts like Palatino and Georgia. Notice that Tufte CSS includes separate font files for **bold** (strong) and *italic* (emphasis), instead of relying on the browser to mechanically transform the text. This is typographic best practice. It’s also really important. Thus concludes my unnecessary use of em and strong for the purpose of example.

Code snippets ape GitHub's font selection using Microsoft's [*Consolas*](http://www.microsoft.com/typography/ClearTypeFonts.mspx) and the sans-serif font uses Tufte's choice of Gill Sans. Since this is not a free font, and some systems will not have it installed, the free google font [*Lato*](https://www.google.com/fonts/specimen/Lato) is designated as a fallback.

