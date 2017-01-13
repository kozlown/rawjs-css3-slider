let slider_container = document.getElementById('slider-container')
let slider_dom = document.getElementById('slider')
let slider_left =  document.getElementById('slider-left')
let slider_right =  document.getElementById('slider-right')

let go_right_dom = document.getElementById('go-right')
let go_left_dom = document.getElementById('go-left')
let actual_section = 1


// slide buttons
let go_right = (() => {
  let last_section = actual_section
  // set the new actual section
  if (actual_section < 4){
    actual_section ++
    removeClass(slider_dom, "slider-anim-"+last_section)
    addClass(slider_dom, "slider-anim-"+actual_section)
  }
  else {
    actual_section = 1
    removeClass(slider_dom, "slider-anim-"+last_section)
    addClass(slider_dom, "slider-anim-"+actual_section)
  }
})
let go_left = (() => {
  let last_section = actual_section
  // set the new actual section
  if (actual_section > 1){
    actual_section --
    removeClass(slider_dom, "slider-anim-"+last_section)
    addClass(slider_dom, "slider-anim-"+actual_section)
  }
  else {
    actual_section = 4
    removeClass(slider_dom, "slider-anim-"+last_section)
    addClass(slider_dom, "slider-anim-"+actual_section)
  }
})


// show / hide arrows
let show_right_arrow = () => {
  addClass(go_right_dom, "over")
}
let hide_right_arrow = () => {
  removeClass(go_right_dom, "over")
}
let show_left_arrow = () => {
  addClass(go_left_dom, "over")
}
let hide_left_arrow = () => {
  removeClass(go_left_dom, "over")
}



// automatic scrolling
let automatic_scrolling = setInterval(go_right, 3000)


// stop automatic scrolling
let stop_automatic_scrolling = (() => {
  clearInterval(automatic_scrolling)
})


// arrow event listener
go_right_dom.addEventListener("click", () => {
  stop_automatic_scrolling()
  go_right()
})
go_left_dom.addEventListener("click", () => {
  stop_automatic_scrolling()
  go_left()
})


// stop automatic scrolling
slider_dom.addEventListener("click", stop_automatic_scrolling)
slider_left.addEventListener("mouseover", show_left_arrow)
slider_left.addEventListener("mouseout", hide_left_arrow)
slider_right.addEventListener("mouseover", show_right_arrow)
slider_right.addEventListener("mouseout", hide_right_arrow)

go_left_dom.addEventListener("mouseover", show_left_arrow)
go_left_dom.addEventListener("mouseout", hide_left_arrow)
go_right_dom.addEventListener("mouseover", show_right_arrow)
go_right_dom.addEventListener("mouseout", hide_right_arrow)

// CLASSES FUNCTIONS
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}