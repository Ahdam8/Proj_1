// spiner grid || open setting
document.querySelector(".toogle-icon .fa-cog").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting").classList.toggle("open");
};
// changed the root color
let locscolor = localStorage.getItem("--main--color");
if (locscolor !== null) {
  document.documentElement.style.setProperty(
    "--main--color",
    localStorage.getItem("--main--color")
  );
}

const listcol = document.querySelectorAll(".list-color li");
listcol.forEach((li) => {
  li.addEventListener("click", (e) => {
    //add color to --main--color in css file
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    //add color to --main--color in local storage
    localStorage.setItem("--main--color", e.target.dataset.color);
    handleactive(e);
  });
});
//changed the backgrond-image
let backgrounoption = true;
let backgroundInterval;

let imags = [
  "4.jpg",
  "5.jpg",
  "a3.jfif",
  "a4.jfif",
  "a5.jfif",
  "a6.jfif",
  "a7.jfif",
];
let lan = document.querySelector(".landing");
function randomizebackg() {
  if (backgrounoption === true) {
    backgroundInterval = setInterval(() => {
      let rand = Math.floor(Math.random() * imags.length);
      lan.style.backgroundImage = `url(./imgs/${imags[rand]})`;
    }, 1000);
  }
}
//changed  backgrond-image(yes || no)
const ss = document.querySelectorAll(".setting-container span");
ss.forEach((sapn) => {
  sapn.addEventListener("click", (e) => {
    handleactive(e);
    ///////////////////////////////
    if (e.target.dataset.background === "yes") {
      randomizebackg();
      backgrounoption = true;
      localStorage.setItem("backImage", true);
    } else {
      backgrounoption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("backImage", false);
    }
  });
  let backgImage = localStorage.getItem("backImage");
  if (backgImage !== null) {
    document.querySelectorAll(".setting-container .yes").forEach((ele) => {
      ele.classList.remove("active");
    });
  }
  if (backgImage === "true") {
    document.querySelector(".setting-container .yes").classList.add("active");
  } else {
    document.querySelector(".setting-container .no").classList.add("active");
  }
});
////////////////////////////////////////////////////////////////////////////////////
//function remove active and add
function handleactive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}
///////////////////////////////////////////////////////////////////////////////////////
// animation skill width% when on scrool

let skills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsoffsetTop = skills.offsetTop;
  //المساحة يلي فوق القسم تبع السكيل لحتى اوصلو
  let skillsheight = skills.offsetHeight;
  //شقد طول القسم تبع السكيل
  let windowheight = this.innerHeight;
  // يلي انا فيهاpage   طول ال
  let windowscrolltop = this.pageYOffset;
  // وين وصل السكرول بقيسو من فوق لتحت

  if (windowscrolltop > skillsoffsetTop + skillsheight - windowheight - 1) {
    let spans = document.querySelectorAll(".sapn-skill span");
    spans.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////////
// image-popup
let imges = document.querySelectorAll(".gallery img");
imges.forEach((img) => {
  img.addEventListener("click", (el) => {
    // overlay part
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    //imagebox part
    let boxpop = document.createElement("div");
    boxpop.className = "popup-box";
    //add text
    if (img.alt !== null) {
      let textimage = document.createElement("h3");
      textimage.className = "text-image";
      let textvalue = document.createTextNode(img.alt);
      textimage.appendChild(textvalue);
      boxpop.appendChild(textimage);
    }
    // img in box
    let imgpop = document.createElement("img");
    imgpop.src = img.src;
    // add to overlay and add to body
    boxpop.appendChild(imgpop);
    document.body.appendChild(boxpop);
    //icone close
    let closespan = document.createElement("span");
    closespan.className = "span-close";
    let iconclose = document.createTextNode("X");
    iconclose.className = "icon-close";
    closespan.appendChild(iconclose);
    boxpop.appendChild(closespan);
  });
});
//event to close
document.addEventListener("click", (e) => {
  if (e.target.className == "span-close") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
////////////////////////////////////////////////////////////////////////////////////////////

// click on bullets // scroll to link
// let bullets=document.querySelectorAll(".bullets .bullet")
// bullets.forEach(el =>{
//     el.addEventListener("click" , (e)=>{
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior : "smooth"
//         })
//     })
// })

// scroll to link (a)
// let alink=document.querySelectorAll(".links a")
// alink.forEach(el =>{
//     el.addEventListener("click" , (e)=>{
//         e.preventDefault()
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior : "smooth"
//         })
//     })
// })
function leavelink(links) {
  links.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
let alink = document.querySelectorAll(".links a");
let bullets = document.querySelectorAll(".bullets .bullet");
leavelink(alink);
leavelink(bullets);
////////////////////////////////////////////////////////////////////////////////////////////
let bulletsshoworhide = document.querySelectorAll(".bullets-show span");
let bulletsdisp = document.querySelector(".bullets");
let localget = localStorage.getItem("bullet-option");

if (localget !== null) {
  bulletsshoworhide.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (localget === "block") {
    bulletsdisp.style.display = "block";
    document.querySelector(".bullets-show .yes").classList.add("active");
  } else {
    bulletsdisp.style.display = "none";
    document.querySelector(".bullets-show .no").classList.add("active");
  }
}
bulletsshoworhide.forEach((span) => {
  span.addEventListener("click", (el) => {
    if (span.dataset.display === "show") {
      bulletsdisp.style.display = "block";
      localStorage.setItem("bullet-option", "block");
    } else {
      bulletsdisp.style.display = "none";
      localStorage.setItem("bullet-option", "none");
    }
    handleactive(el);
  });
});
///////////////////////////////////////////////////////////////////////////////////////
//button reset local
document.querySelector(".reset-local").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("backImage")
  // localStorage.removeItem("--main--color")
  // localStorage.removeItem("bullet-option")
  window.location.reload();
};
/////////////////////////////////////////////////////////////////////////////////////////
