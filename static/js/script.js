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
        if (proofs[i].style.maxHeight) {
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

    let activeIdx = JSON.parse(Cookies.get('active-statements') || '[]');
    let statements = Array.from(document.querySelectorAll(".lemma, .theorem, .statement"));
    for (let elem of statements) {
        let content = elem.nextElementSibling;
        if (Array.from(content.classList).includes('proof')) {
            if (!elem.id) {
                let idx = elem.querySelector('.statement-label').innerHTML.replace(/\W/g, '_');
                elem.id = idx;
            }
            let hov = elem.querySelector('p>.statement-heading');
            hov.addEventListener("click", () => {
                if (activeIdx.includes(elem.id)) {
                    activeIdx = activeIdx.filter(x => (x !== elem.id));
                } else {
                    activeIdx.push(elem.id);
                }
                Cookies.set('active-statements', JSON.stringify(activeIdx));
                elem.classList.toggle("active");
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
            elem.classList.add('has-proof');
        } else {
            elem.querySelector('p>.statement-heading').classList.add('hide-before');
            elem.querySelector('p>.statement-heading').style.cursor = 'auto';
        }
    }

    activeIdx.forEach(idx => {
        let elem = document.getElementById(idx)
        if (elem) {
            elem.classList.add("active");
            elem.nextElementSibling.style.maxHeight = elem.nextElementSibling.scrollHeight + "px";
        }
    })

    Array.from(document.querySelectorAll('h1:not(.title), h2:not(#toc-title), h3, h4, h5, h6')).forEach(elem => {
        elem.addEventListener("click", () => {
            window.location.hash = "#" + elem.id;
        })
    })
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