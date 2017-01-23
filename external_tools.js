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
