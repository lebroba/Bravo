;(function() {
    var app = {
     // routes (ie. views and their functionality) defined here
     'routes': {
      'time-speed-distance': {
       'rendered': function() {
        console.log('this view is "time-speed-distance"');
       }
      },
      'status-board': {
       'rendered': function() {
        console.log('this view is "status-board"');
       }
      },
      'alternate-view': {
       'rendered': function() {
        console.log('this view is "alternate-view"');
       }
      },
      'distances': {
       'rendered': function() {
        console.log('this view is "distances"');
       }
      },
      'himarker': {
       'rendered': function() {
        console.log('this view is "himarker"');
       }
      }
     },
     // The default view is recorded here. A more advanced implementation
     // might query the DOM to define it on the fly
     'default': 'status-board',
     'routeChange': function() {
      app.routeID = location.hash.slice(1);
      app.route = app.routes[app.routeID];
      app.routeElem = document.getElementById(app.routeID);
      if (app.route) {
       app.route.rendered();
      }
     },
     // The function to start the app.
     'init': function() {
      window.addEventListener('hashchange', function() {
       app.routeChange();
      });
      // If there's no hash in the URL, change the URL to
      // include the default view's hash
      if (!window.location.hash) {
       window.location.hash = app.default;
      } else {
       // Execute routeChange() for the first time
       app.routeChange();
      }
     }
    };
    window.app = app;
   })();