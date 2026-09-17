// Abre la invitacion en la app, o muestra como bajarla.
// El codigo sale de la direccion: se valida antes de usarlo y se escribe
// siempre como texto, nunca como HTML.
(function () {
  var TIENDAS = { ios: null, android: null };
  var cuerpo = document.body;
  var tipo = cuerpo.getAttribute('data-tipo');
  var codigo = new URLSearchParams(location.search).get('c') || '';
  var valido = /^[A-Za-z0-9-]{4,40}$/.test(codigo);

  var elCodigo = document.getElementById('codigo');
  var abrir = document.getElementById('abrir');
  var error = document.getElementById('error');
  var invitacion = document.getElementById('invitacion');

  if (tipo && !valido) {
    invitacion.hidden = true;
    error.hidden = false;
  } else if (tipo) {
    elCodigo.textContent = codigo;
    var app = 'krewup://' + (tipo === 'noche' ? 'noche/' : 'unirse/') + encodeURIComponent(codigo);
    abrir.setAttribute('href', app);
    // Si la app esta instalada, el telefono ofrece abrirla solo.
    setTimeout(function () { location.href = app; }, 400);
  }

  var tiendas = document.getElementById('tiendas');
  var pronto = document.getElementById('pronto');
  var hay = false;
  [['ios', 'App Store'], ['android', 'Google Play']].forEach(function (t) {
    if (!TIENDAS[t[0]]) return;
    hay = true;
    var a = document.createElement('a');
    a.className = 'boton contorno';
    a.href = TIENDAS[t[0]];
    a.textContent = 'Bajala en ' + t[1];
    tiendas.appendChild(a);
  });
  if (hay) pronto.hidden = true;
})();
