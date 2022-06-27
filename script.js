function throttle(callback, limit) {
    var waiting = false;                      // Initially, we're not waiting
    return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
            callback.apply(this, arguments);  // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}
let height_dict = {};
let last_idx;
let root = document.documentElement;

let update_heights = () => {
    if (document.getElementById("TOC")) {
        const elems = Array.from(document.getElementById("TOC").getElementsByTagName("a"));
        elems.forEach(e => {
            height_dict[e.id] = window.pageYOffset + document.getElementById(e.id.slice(4)).getBoundingClientRect().top;
        })
    }
}

let update_bold = () => {
    let k = Object.keys(height_dict), v = Object.values(height_dict);
    let scrollTop = root.scrollTop;
    if (k.length > 0) {
        let tmp = v.map(x => scrollTop + 30 > x ? (scrollTop - x) : Infinity);
        const idx = k[tmp.indexOf(Math.min(...tmp))];
        if (idx !== last_idx) {
            if (last_idx) {
                document.getElementById(last_idx).style.fontWeight = 'normal';
            }
            document.getElementById(idx).style.fontWeight = 'bold';
            last_idx = idx;
        }
    }
}
update_proofs = () => {
    let proofs = document.getElementsByClassName('proof');
    for (let i = 0; i < proofs.length; i++) {
        if (proofs[i].style.maxHeight){
            proofs[i].style.maxHeight = proofs[i].scrollHeight + "px";
          }
    }
}

update_bold = throttle(update_bold, 50);
update_heights = throttle(update_heights, 50);
update_proofs = throttle(update_proofs, 50);

document.addEventListener('DOMContentLoaded', () => {
    let root = window.location.pathname.split('/')[1];
    if (root === '') root = 'home';
    document.getElementById("nav-" + root).style.textDecoration = 'underline';
    document.getElementById("nav-" + root).style.fontWeight = 'bold';
    update_heights();
    update_bold();

    let coll = document.querySelectorAll(".lemma, .theorem");
    console.log(coll);
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", () => {

            coll[i].classList.toggle("active");
            var content = coll[i].nextElementSibling;

            if (Array.from(content.classList).includes('proof')) {
                if (content.style.maxHeight){
                    content.style.maxHeight = null;
                  } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                  }
            }
        });
    }
}, false);

window.addEventListener('resize', () => {
    update_heights();
    update_bold();
    update_proofs();
});


document.addEventListener("scroll", evt => {
    root.style.setProperty("--scrolltop", root.scrollTop);
    update_bold();
});