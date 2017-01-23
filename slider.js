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
    let lock = false
    let touchStart = {}
    let currentTouch = {}


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

    // SLIDE WITH PC
    // stop automatic scrolling and handle grab sliding
    slider_dom.addEventListener("mousedown", (e) => {
        stop_automatic_scrolling()
        mousePosOnClick.x = e.pageX
        grabing = true
        slider_dom.style.transition = "left 0s"
    })

    // handle grab ending
    slider_dom.addEventListener("mouseup", (e) => {
        if (e.pageX - mousePosOnClick.x > 100){
            go_left()
        }
        else if (e.pageX - mousePosOnClick.x < -100){
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
    slider_container.addEventListener("mousemove", (e) => {
        // if the mouse is on the left side
        if (e.pageX < window.innerWidth/2){
            show_left_arrow()
            hide_right_arrow()
        }
        else {
            show_right_arrow()
            hide_left_arrow()
        }
        if (grabing){
            let delta = (e.pageX - mousePosOnClick.x)
            slider_dom.style.left = `${ -(actual_section-1) * slider_container.clientWidth + delta }px`
        }
    })

    // SLIDE WITH SMARTPHONE
    // stop automatic scrolling and handle grab sliding
    slider_dom.addEventListener("touchstart", (e) => {
        stop_automatic_scrolling()
        touchStart.x = e.touches[0].clientX
        touchStart.y = e.touches[0].clientY
        slider_dom.style.transition = "left 0s"
    })

    // handle grab ending
    slider_dom.addEventListener("touchend", (e) => {
        if (lock === "X")
        {
            if (currentTouch.x - touchStart.x > 30){
                go_left()
            }
            else if (currentTouch.x - touchStart.x < -30){
                go_right()
            }
            else {
                // go back to the last position
                slider_dom.style.left = `${ -(actual_section-1) * slider_container.clientWidth }px`
            }
        }
        slider_dom.style.transition = "left .5s"
        lock = false
    })

    // handle grabing and show/hide arrows of the slider
    slider_container.addEventListener("touchmove", (e) => {
        currentTouch.x = e.touches[0].clientX
        currentTouch.y = e.touches[0].clientY
        let deltaX = Math.abs(currentTouch.x - touchStart.x)
        let deltaY = Math.abs(currentTouch.y - touchStart.y)
        // if sliding on the x-axis, no way to scroll down
        if (!lock) {
            if (deltaX > deltaY && deltaX > 10){
                lock = "X"
            }
            else if (deltaY > 10) {
                lock = "Y"
            }
        }
        if (lock === "X") {
            let delta = (currentTouch.x - touchStart.x)
            slider_dom.style.left = `${ -(actual_section-1) * slider_container.clientWidth + delta }px`
        }
    })

    document.body.addEventListener('touchmove', function(e) {
        if (lock === "X")
            e.preventDefault();
    }, false);
}
