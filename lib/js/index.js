function $(id) {
  return document.getElementById(id);
}

function html_encode(str) {
  return str.replace(/[&<>"']/g, function($0) {
    return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
  });
}

function markup() {
  $('content').innerHTML = marked($('editor').value)
}

function html() {
  $('content').innerHTML = '<textarea>'+
    html_encode(marked($('editor').value)) +'</textarea>';
}

function json() {
  $('content').innerHTML = '<textarea>'+
    JSON.stringify(marked.lexer($('editor').value), null, 2) +'</textarea>';
}

//function help() {
//  $('content').innerHTML = '<textarea>'+
//    $('help').innerHTML.toString() +'</textarea>';
//}

function clearit() {
  $('content').innerHTML = '';
  $('editor').value = '# Hello World\n';
  localStorage.removeItem('markup');
}

function save() {
  localStorage.setItem('markup', $('editor').value);
}

function tab(a, js) {
  get(a.hash.replace(/^#/, ''), a, js||null)
}

function get(u, a, s) {
  var x = new XMLHttpRequest();
  x.onreadystatechange = function() {
    if (x.readyState == 4 && x.status == 200) {
      $('content').innerHTML = u.match(/\.md$/)
        ? marked(x.responseText) : x.responseText;
      if (a) sel(a)
      if (s) js(s)
    }
  }
  x.open('GET', u, true); x.send();
}

function sel(a) {
  var l = document.links
  for (var i = 0; i < l.length; i++) {
    if (l[i].classList.contains('selected'))
      l[i].classList.remove('selected')
  }
  if (typeof a == 'object')
    a.classList.add('selected')
}

function js(js) {
  $('tempjs').src = js;
}

function newjs(js) {
  var h = document.getElementsByTagName("head")[0]
    , s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = js;
  h.appendChild(s);
}

window.onload = function() {
console.log('location.hash='+location.hash)
  if (location.hash && location.hash !== '#/')
    get(location.hash.replace(/^#/, ''), true)
  else
    get('/lib/md/home.md')

  if (localStorage.getItem('markup'))
    $('editor').value = localStorage.getItem('markup');
}

