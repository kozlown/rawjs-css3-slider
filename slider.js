document.addEventListener('DOMContentLoaded', function () {
    let slider_container = document.getElementById('slider-container')
    let slider_dom = document.getElementById('slider')

    let go_right_dom = document.getElementById('go-right')
    let go_left_dom = document.getElementById('go-left')
    let go_down_dom = document.getElementById('go-down')
    let actual_section = 1
    mousePos = {}


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
    let automatic_scrolling = setInterval(go_right, 5000)


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
    go_down_dom.addEventListener("click", () => {
        scrollTo(document.body, document.getElementById("destinations-a-velo").offsetTop-100, 600)
    })


    // stop automatic scrolling
    slider_dom.addEventListener("click", stop_automatic_scrolling)
    slider_container.addEventListener("mousemove", () => {
      if (mousePos.x < window.innerWidth/2){
        show_left_arrow()
        hide_right_arrow()
      }
      else {
        show_right_arrow()
        hide_left_arrow()
      }
    })
    slider_container.addEventListener("mouseout", () => {
      hide_left_arrow()
      hide_right_arrow()
    })


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


    // SCROLL FUNCTION
    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - (1/perTick > 5 ? 1/perTick : 5));
        }, 10);
    }


    // GET MOUSE POSITON
    (function() {
        document.onmousemove = handleMouseMove;
        function handleMouseMove(event) {
            var dot, eventDoc, doc, body, pageX, pageY;

            event = event || window.event; // IE-ism

            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = event.clientX +
                  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                  (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                  (doc && doc.clientTop  || body && body.clientTop  || 0 );
            }

            mousePos = {
                x: event.pageX,
                y: event.pageY
            };
        }
    })();
})
