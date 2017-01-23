window.onload = function () {

    // slider script (slider.js)
    init_slider()

    let go_top_dom = document.getElementById('go-top')

    // show/hide go-top button
    window.addEventListener('scroll', function(e) {
        if (window.scrollY >= document.getElementById("destinations-a-velo").offsetTop-50){
            go_top_dom.style.right = "30px"
            go_top_dom.style.opacity = 1
        }
        else {
            go_top_dom.style.right = "-50px"
            go_top_dom.style.opacity = 0
        }
    })

    go_top_dom.addEventListener("click", () => {
        scrollTo(0, 600)
    })
}
