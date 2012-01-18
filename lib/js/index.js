function $(id) {
  return document.getElementById(id);
}

function html_encode(str) {
  return str.replace(/[&<>"']/g, function($0) {
    return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
  });
}

function markup() {
  $('preview').innerHTML = marked($('editor').value)
}

function html() {
  $('preview').innerHTML = '<textarea>'+
    html_encode(marked($('editor').value)) +'</textarea>';
}

function json() {
  $('preview').innerHTML = '<textarea>'+
    JSON.stringify(marked.lexer($('editor').value), null, 2) +'</textarea>';
}

function help() {
  $('preview').innerHTML = '<textarea>'+
    $('help').innerHTML.toString() +'</textarea>';
}

function clearit() {
  $('preview').innerHTML = '';
  $('editor').value = '# Hello World\n';
  localStorage.removeItem('markup');
}

function save() {
  localStorage.setItem('markup', $('editor').value);
}

function get(url) {
  var x = new XMLHttpRequest();
  x.onreadystatechange = function() {
    if (x.readyState == 4 && x.status == 200) {
      $('preview').innerHTML = marked(x.responseText); }}
  x.open('GET', url, true); x.send();
}

window.onload = function() {
  if (localStorage.getItem('markup')) {
    $('editor').value = localStorage.getItem('markup');
  }
}

