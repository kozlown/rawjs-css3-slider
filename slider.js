let init_slider = function () {
    let slider_container = document.getElementById('slider-container')
    let slider_dom = document.getElementById('slider')

    let go_right_dom = document.getElementById('go-right')
    let go_left_dom = document.getElementById('go-left')
    let go_down_dom = document.getElementById('go-down')
    let actual_section = 5
    let translate3dX = 0
    let translate3dXGrab = 0
    let mousePos = {}
    let mousePosOnClick = {}
    let grabing = false


    // slide buttons
    let go_right = (() => {
        actual_section ++
        slider_dom.style.left = `${ -(actual_section-1) * slider_container.clientWidth }px`

        // last is first
        setTimeout(() => {
            slider_dom.appendChild(slider_dom.children[0])
            translate3dX += slider_container.clientWidth
            slider_dom.style.transform = `translate3d(${ translate3dX }px,0,0)`
        }, 2000)
    })
    let go_left = (() => {
        actual_section --
        slider_dom.style.left = `${ -(actual_section-1) * slider_container.clientWidth }px`

        // first is last
        setTimeout(() => {
            slider_dom.insertBefore(slider_dom.children[11], slider_dom.children[0])
            translate3dX -= slider_container.clientWidth
            slider_dom.style.transform = `translate3d(${ translate3dX }px,0,0)`
        }, 2000)
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
        scrollTo(document.getElementById("destinations-a-velo").offsetTop-50, 600)
    })


    // stop automatic scrolling and handle grab sliding
    slider_dom.addEventListener("mousedown", () => {
        stop_automatic_scrolling()
        mousePosOnClick.x = mousePos.x
        grabing = true
        slider_dom.style.transition = "left 0s"
    })

    // handle grab ending
    slider_dom.addEventListener("mouseup", () => {
        if (mousePos.x - mousePosOnClick.x > 100){
            go_left()
        }
        else if (mousePos.x - mousePosOnClick.x < -100){
            go_right()
        }
        else {
            // go back to the last position
            slider_dom.style.left = `${ -(actual_section-1) * slider_container.clientWidth }px`
        }
        grabing = false
        slider_dom.style.transition = "left .5s"
    })

    // handle grabing and show/hide arrows of the slider
    slider_container.addEventListener("mousemove", () => {
        // if the mouse is on the left side
        if (mousePos.x < window.innerWidth/2){
            show_left_arrow()
            hide_right_arrow()
        }
        else {
            show_right_arrow()
            hide_left_arrow()
        }
        if (grabing){
            let delta = (mousePos.x - mousePosOnClick.x)
            slider_dom.style.left = `${ -(actual_section-1) * slider_container.clientWidth + delta }px`
        }
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
    function scrollTo(to, duration) {
        if (duration <= 0) return;
        var difference = to - window.scrollY;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            window.scroll(0, window.scrollY + perTick);
            if (window.scrollY === to) return;
            scrollTo(to, duration - (1/perTick > 5 ? 1/perTick : 5));
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
}
