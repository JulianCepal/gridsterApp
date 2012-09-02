# Author:
#*  [your name here]
#
$ ->
  # Run Matt Kersley's jQuery Responsive menu plugin (see plugins-320.js)
  ###if $.fn.mobileMenu
    $("ol#id").mobileMenu
      switchWidth: 768 # width (in px to switch at)
      topOptionText: "Choose a page" # first option text
      indentString: "&nbsp;&nbsp;&nbsp;" # string for indenting nested items###

  # Run Mathias Bynens jQuery placeholder plugin (see plugins-320.js)
  # $("input, textarea").placeholder()  if $.fn.placeholder

  i = 1
  numBoxes = 50
  colNumber = 4
  gridsterContainerlist = $('#gridster ul')
  while i <= numBoxes
    colRandom = Math.floor(Math.random() * colNumber) + 1
    rowRandom = Math.floor(Math.random() * (numBoxes/colNumber)) + 1
    sizeX = Math.floor(Math.random() * 2) + 1
    sizeY = Math.floor(Math.random() * 2) + 1
    newGridItem = $('<li>',{'data-row': rowRandom,'data-col': colRandom,'data-sizex': sizeX,'data-sizey': sizeY}).appendTo(gridsterContainerlist)
    i++

  # Gridster App Fire
  gridsterContainerlist.gridster
    widget_margins: [10, 10]
    widget_base_dimensions: [100, 100]