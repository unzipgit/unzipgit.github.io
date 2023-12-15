function q(e) {
  return document.querySelector(e);
}
function qq(e) {
  return document.querySelectorAll(e);
}
function cl(e) {
  console.log(e);
}
let filename = "none";
let filesize = "none";
document.querySelector(".litext");
document.querySelector(".inputfile");
let token;
let zipFile;
let preurl;
const t = {};
let gsaploading = gsap.timeline({paused: true});
gsaploading.to(".logo", .3, {opacity: 1, x: 0}).to(".desc", .3, {opacity: 1, x: 0}, 0).to(".gsbox", .3, {opacity: 1, y: 0, stagger: .1}, .15).to(".footer", .3, {opacity: 1, y: 0, stagger: .1}, .6);
q(".shadow").addEventListener("click", e => {
  gsap.to(".shadow", .25, {autoAlpha: 0});
  gsap.to(".donat", .25, {autoAlpha: 0});
  gsap.to(".readme", .25, {autoAlpha: 0});
});
q(".donatlink").addEventListener("click", e => {
  gsap.to(".shadow", .25, {visibility: "inherit", opacity: .5});
  gsap.to(".donat", .25, {autoAlpha: 1});
});
q(".readmelink").addEventListener("click", e => {
  gsap.to(".shadow", .25, {visibility: "inherit", opacity: .5});
  gsap.to(".readme", .25, {autoAlpha: 1});
});
const divinputtextall = qq(".litext input");
divinputtextall.forEach(e => {
  e.addEventListener("focus", e => {
    e.target.parentNode.querySelector(".inputlabel").classList.add("ulet");
    if (e.target.parentNode.querySelector(".tokendesc")) {
      gsap.to(".tokendesc", .2, {autoAlpha: 0});
    }
    if (e.target.closest(".filegroup")) {
      let a = Array.from(e.target.closest(".filegroup").children).find(a => a !== e.target.parentNode);
      if (a.querySelector("input").value === "") {
        gsap.to(a, .25, {opacity: .2});
      } else {
        gsap.to(e.target.parentNode, .25, {opacity: 1});
      }
    }
  });
  e.addEventListener("blur", a => {
    if (e.value.trim() === "") {
      a.target.parentNode.querySelector(".inputlabel").classList.remove("ulet");
      if (a.target.parentNode.querySelector(".tokendesc")) {
        gsap.to(".tokendesc", .2, {autoAlpha: 1});
      }
      if (a.target.closest(".filegroup")) {
        let i = Array.from(a.target.closest(".filegroup").children).find(e => e !== a.target.parentNode);
        if (a.target.value === "") {
          gsap.to(i, .25, {opacity: 1});
          if (i.querySelector("input").value !== "") {
            gsap.to(a.target.parentNode, .25, {opacity: .2});
          }
        }
      }
    }
  });
});
const labelgroup = qq(".filegroup label");
labelgroup.forEach(e => {
  e.addEventListener("mouseenter", e => {
    let a = Array.from(labelgroup).find(a => a !== e.target);
    if (a.querySelector("input").value === "" && a.querySelector("input") !== document.activeElement) {
      gsap.to(a, .25, {opacity: .2});
    } else if (e.target.querySelector("input") === document.activeElement) {
      gsap.to(e.target.parentNode, .25, {opacity: 1});
    }
  });
  e.addEventListener("mouseleave", e => {
    if (e.target.querySelector("input").value === "") {
      let a = Array.from(labelgroup).find(a => a !== e.target);
      gsap.to(a, .25, {opacity: 1});
    }
  });
});
q(".ifdatainfo");
var tl = gsap.timeline({paused: true}).to(".inputfile span", .2, {autoAlpha: 0, onComplete() {
  q(".inputfile span").style.display = "none";
}, onReverseComplete() {
  q(".inputfile span").style.display = "block";
  q(".ifdatainfo").style.display = "none";
}}).to(".ifdatainfo", .2, {autoAlpha: 1, onStart() {
  q(".ifdatainfo").style.display = "block";
  q(".ifname").innerHTML = filename;
  q(".ifsize").innerHTML = filesize;
}});
q("#gitfile").addEventListener("change", e => {
  if (q("#gitfilepath").parentNode.querySelector(".inputlabel").classList.contains("errlabel")) {
    q("#gitfilepath").parentNode.querySelector(".inputlabel").classList.remove("errlabel");
  }
  if (e.target.value === "") {
    tl.reverse();
  } else {
    filename = (filename = e.target.files[0].name).length > 8 ? filename.slice(0, 6) + "..." : filename;
    filesize = (e.target.files[0].size / 1048576).toFixed(2) + " mb";
    tl.restart();
    gsap.to(e.target.parentNode, .25, {opacity: 1});
    q("#gitfilepath").value = "";
    q("#gitfilepath").dispatchEvent(new Event("blur"));
    gsap.to(q("#gitfilepath").parentNode, .25, {opacity: .2});
  }
});
q("#gitfilepath").addEventListener("input", e => {
  q("#gitfile").parentNode.querySelector(".inputlabel").classList.remove("errlabel");
  if (q("#gitfile").value === "") {
    gsap.to(q("#gitfilepath").parentNode, .25, {opacity: 1});
  } else {
    tl.reverse();
    q("#gitfile").value = "";
  }
  gsap.to(q("#gitfile").parentNode, .25, {opacity: .2});
});
const agr = {def: "linear-gradient(00deg, #60676b, #a4a4a4)", error: "linear-gradient(00deg, #c40000, #ff8181)", success: "linear-gradient(0deg, #1b8705, #89e657)"};
let atna = gsap.timeline({paused: true}).set(".atn", {y: 0, autoAlpha: 0}).to(".atn", .3, {y: -10, autoAlpha: 1});
function ale(e = ["title", "description"], a = "def", i = false) {
  if (i) {
    gsap.to(".atn .closer", .2, {autoAlpha: 1});
  } else {
    gsap.set(".atn .closer", {autoAlpha: 0});
  }
  q(".atn").style.background = agr[a];
  q(".atn .title").innerHTML = e[0];
  q(".atn .info").innerHTML = e[1];
  atna.restart();
}
function aletxt(e, a) {
  q(".atn .title").innerHTML = e;
  q(".atn .info").innerHTML = a;
}
function errorHandler(s) {
  const errorMessages = {
    401: ['invalid token', 'check the token and try again'],
    404: ['not found', 'github responded with 404 error. check the data and try again'],
    1422: ['validation error', 'check the fields and try again'],
    2000: ['download error 404', `could not find the archive in the repository. check the data and try again`],
    2001: ['download error 404', `failed to download large archive`],
    2002: ['download error', `failed to download archive: ${s.message}`],
    2003: ['download error', `failed to download large archive: ${s.message}`],
    2004: ['download error', s.message],
    2005: ['upload error', s.message],
    2006: ['upload error', `failed to write the file: ${s.message}`],
    2007: ['upload error', `failed to overwrite the file: ${s.message}`],
    3400: ['archive error', s.message],
    3401: ['archive error', `either it's not an archive or the file is corrupted`],
    4000: ['request error', `error when executing a GET or PUT request: ${s.message}`],
  };

  const errorCode = s.code;
  const [errorTitle, errorMessage] = errorMessages[errorCode] || ['unexpected error', s.message];

  ale([errorTitle, errorMessage], 'error', 1);
}
async function req(e, a, i = "json", r = null) {
  try {
    let o = {method: e, headers: {"Content-Type": "application/json", Authorization: `token ${token}`}};
    if (r) {
      o.body = JSON.stringify(r);
    }
    let l = await fetch(a, o);
    let n = {http: l};
    if (i === "json") {
      n.data = await l.json();
    } else if (i === "blob") {
      n.data = await l.blob();
    } else if (i === "text") {
      n.data = await l.text();
    }
    return n;
  } catch (s) {
    throw {code: "4000", message: s.message};
  }
}
async function downZip(e) {
  try {
    let a = await req("GET", e, "json");
    if (a.http.status === 200) {
      if (a.content === "") {
        aletxt("Processing", "Large file. Wait for download to complete...");
        a = await req("GET", a.data.giturl, "json");
        if (a.http.ok === true) {
          t.gitarchive = a.data;
        } else {
          throw {arch: 2, res: a};
        }
      } else {
        t.gitarchive = a.data.content;
      }
      t.gitformat = "base";
    } else {
      throw {arch: 1, res: a};
    }
  } catch (i) {
    if (i.message) {
      throw {code: 2004, message: i.message};
    }
    let r = i.res.http;
    let o = i.res.data;
    if (r.status === 404) {
      throw i.arch === 1 ? {code: 2000} : {code: 2001};
    }
    if (r.status === 401) {
      document.querySelector('label[for="gittoken"] .inputlabel').classList.add("errlabel");
      throw {code: 401};
    }
    {
      let l = o.message || r.statusText || r.status;
      throw i.arch === 1 ? {code: 2002, message: l} : {code: 2003, message: l};
    }
  }
}
async function readZip(e) {
  aletxt("Processing", "Opening archive...");
  let a = {};
  if (t.gitformat === "buffer") {
    a = {binary: true};
  } else if (t.gitformat === "base") {
    a = {base64: true};
  }
  try {
    let i = await e.loadAsync(t.gitarchive, a);
    zipFile = i;
  } catch (r) {
    if (r.message.includes("Can't find end of central directory") || r.message.includes("Corrupted zip ?")) {
      throw {code: 3401};
    }
    throw {code: 3400, message: r.message};
  }
}
async function uploadZip() {
  try {
    let e = 0;
    for (let [a, i] of (countfile = Object.keys(zipFile.files).length, ale(["Archive upload", `Please wait, do not close the tab... <span>0</span>/${countfile}`]), Object.entries(zipFile.files))) {
      e++;
      if (i.dir === false) {
        let r = t.unzippath ? `${t.unzippath}/${a}` : a;
        let o = await i.async("base64");
        let l = await req("PUT", `${preurl}/${r}`, "json", {message: "unzipgit", content: o});
        if (l.http.status === 422) {
          l = await req("PUT", `${preurl}/${r}`, "json", {message: "unzipgit", content: o, sha: (await req("GET", `${preurl}/${r}`)).data.sha});
          if (l.http.ok === false) {
            throw {action: "rewrite", res: l};
          }
        } else if (l.http.ok === false) {
          throw {action: "write", res: l};
        }
        q(".atn .info span").innerHTML = e;
      }
    }
  } catch (n) {
    if (n.message) {
      throw {code: 2005, message: n.message};
    }
    let s = n.res.http;
    let c = n.res.data;
    if (s.status === 401) {
      document.querySelector('label[for="gittoken"] .inputlabel').classList.add("errlabel");
      throw {code: 401};
    }
    {
      let d = c.message || s.statusText || s.status;
      throw {code: n.action === "write" ? 2006 : 2007, message: d};
    }
  }
}
q(".closer").addEventListener("click", () => {
  atna.reverse();
});
q("#unzip").addEventListener("input", async function (e) {
  if (e.target.parentNode.querySelector(".errlabel")) {
    e.target.parentNode.querySelector(".errlabel").classList.remove("errlabel");
  }
});
q("#unzip").addEventListener("submit", async function (e) {
  e.preventDefault();
  window.addEventListener('beforeunload', confirmExit);
  try {
    this.querySelector("button").disabled = true;
    ale(["Processing", "Wait for completion..."]);
    let a = true;
    let i = new FormData(this);
    for (let [r, o] of i.entries()) {
      t[r] = o;
      if (o === "" && r !== "gitfilepath" && r !== "gitfile") {
        document.querySelector(`label[for="${r}"] .inputlabel`).classList.add("errlabel");
        a = false;
      }
    }
    if (!a) {
      throw {code: 1422};
    }
    token = t.gittoken;
    if (t.gitrepo.includes("/") || t.gitrepo.includes("\\")) {
      let l = t.gitrepo.replace(/\\+|\/\/+/g, '/').match(/[\/]?([^\/]+)[\/](.*?)[\/]?$/);
      t.unzippath = l[2];
      t.gitrepo = l[1];
    }
    let n = await req("GET", `${preurl = `https://api.github.com/repos/${t.gitname}/${t.gitrepo}/contents`}`, "info");
    if (n.http.ok === false) {
      throw {code: n.http.status};
    }
    if (t.gitfilepath === "") {
      if (t.gitfile.size > 0) {
        t.gitarchive = await t.gitfile.arrayBuffer();
        t.gitformat = "buffer";
      } else {
        document.querySelector('label[for="gitfilepath"] .inputlabel').classList.add("errlabel");
        document.querySelector('label[for="gitfile"] .inputlabel').classList.add("errlabel");
        throw {code: 1422};
      }
    } else {
      aletxt("Processing", "Downloading archive from repository...");
      await downZip(`${preurl}/${t.gitfilepath.replace(/\\+|\/\/+/g, '/').replace(/^\/+|\/+$/g, '')}`);
    }
    await readZip(new JSZip);
    await uploadZip();
    q("#gitfilepath").value = "";
    q("#gitfilepath").dispatchEvent(new Event("blur"));
    q("#gitfile").value = "";
    tl.reverse();
    gsap.to('label[for="gitfile"]', .25, {opacity: 1});
    gsap.to('label[for="gitfilepath"]', .25, {opacity: 1});
    ale(["Success", `All files are unzipped. <a href="https://github.com/${t.gitname}/${t.gitrepo}">Go to repository</a>`], "success", 1);
  } catch (s) {
    errorHandler(s);
  } finally {
    this.querySelector("button").disabled = false;
    window.removeEventListener('beforeunload', confirmExit);
  }
});

  function confirmExit(event) {
    const confmsg = 'unzipping is not over. leave the page?';
    event.returnValue = confmsg; 
    return confmsg; 
}



window.onload = function () {
  q("#unzip").reset();
  gsaploading.play();


};