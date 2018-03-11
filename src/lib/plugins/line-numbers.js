// Line numbers adder for highligthjs
Reveal.addEventListener( 'ready', function( event ) {
    // Check to see if code blocks with line-numbers class exist.
   });
   
   // Adding an event listener on slidechanged event to add line numbers to
   // code blocks.
   Reveal.addEventListener('slidechanged', function(event) {
     addLineNumbers();
   });
   
   function addLineNumbers() {
     // For any code blocks in the current slide with class 'line-numbers'.
     var line_numbers = document.getElementsByClassName("line-numbers");
     // Store line numbers to highlight
     var highlights = [];
     // Loop through all code blocks
     for (var l = 0; l < line_numbers.length; l++) {
       highlights = [];
       // See if current block has highlight js and line number not already applied.
       if (line_numbers[l].classList.contains('hljs') && (line_numbers[l].innerHTML.indexOf("line-number") < 1)) {
         // See if there are any lines that need to be highlighted.
         if (line_numbers[l].hasAttribute("data-highlight-lines")) {
           // Get the lines to be highlighted.
           highlights = getLineNumberHighlights(line_numbers[l].getAttribute("data-highlight-lines"));
         }
   
         // Get the content of the code block.
         var content = line_numbers[l].innerHTML;
         var classes = '';
         // Split the code block at new line, but make sure we don't carry an
         // empty trailing line.
         content = content.split("\n");
         if (content.length != 0 && !content[content.length - 1])
           content.pop();
         // Loop through each line.
         for (var n = 0; n < content.length; n++) {
           // Add class 'line-number'.
           classes = 'line-number';
           // Should this line be highlighted?
           if (highlights.indexOf(n+1) > -1) {
             classes += ' highlight-line';
           }
           // Append line with line number span.
           content[n] = "<span class=\"" + classes + "\"></span>" + content[n];
         }
         // Rejoin all content.
         content = content.join("\n");
         // Replace content of code block.
         line_numbers[l].innerHTML = content;
       }
     }
   }
   
   // Determins which lines from a range to be highlighted.
   function getLineNumberHighlights(line_numbers) {
     var highlights = num_range = [];
     var start = end = num = 0;
     // Split line groups on comma
     if (line_numbers.indexOf(',') > 0) {
       line_numbers = line_numbers.split(",");
     }
     else {
       // No seperator, assume it is just a single line.
       line_numbers = [line_numbers];
     }
   
     // Loop through each number group.
     for(n = 0; n < line_numbers.length; n++) {
       // Is number group a range?
       if (line_numbers[n].indexOf("-") > 0) {
         // split on seperator
         num_range = line_numbers[n].split("-");
         start = Number.parseInt(num_range[0]);
         end = Number.parseInt(num_range[1]);
         // Add all lines between ranges
         while (start <= end) {
           // Check if line number is not already in list.
           if (highlights.indexOf(start) < 0) {
             highlights.push(start);
           }
           start++;
         }
       }
       else {
         // Else assume a single line number
         num = Number.parseInt(line_numbers[n]);
         // Confirm that line number is not already in array.
         if ((num == line_numbers[n]) && highlights.indexOf(num) < 0) {
           highlights.push(num);
         }
       }
     }
     // Return count of hightlight lines.
     return highlights;
   }