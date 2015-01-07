var jsmediamatch = (function() {
	
	var _queryList = [],
		_queryState = {};

	/**
	 * initialization
	 * @param {object} queries: key/value list of objects describing media queries
	 * Example:
	 * {
	 * 		mobile: "(min-width:1px)",
	 *   	tablet: "(min-width:768px)",
	 *    	desktop: "(min-width:960px)",
	 *    	largedesktop: "(min-width:1200px)"
	 * }
	 */
	function init(queries) {

		for (var query in queries) {

			var mql = window.matchMedia(queries[query]);
			mql.addListener(onQueryChange);			

			_queryList.push({
				id: query,
				query: queries[query],
				mql: mql
			});		
		}

		//initialization state
		matchAllQueries();
	}

	/**
	 * check registered queries and update saved query state with matches
	 */
	function matchAllQueries() {
		for (var i=0; i < _queryList.length; i++) {
			_queryState[_queryList[i].id] = _queryList[i].mql.matches;				
		}
	}

	/**
	 * handle media query listener change event
	 */
	function onQueryChange() {

		matchAllQueries();

		//dispatch change event with state as detail payload
		//old style custom event for ie9 support
		var evt = document.createEvent("CustomEvent");
		evt.initCustomEvent('change.jsmediamatch', false, false, _queryState);
		window.dispatchEvent(evt);
	}

	return {
		init: init,
		getState: function() {
			return _queryState;
		}
	}

})();

//polyfills for older browsers

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css",t.id="matchmediajs-test",i.parentNode.insertBefore(t,i),n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=i:t.textContent=i,"1px"===n.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());

/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
!function(){if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var e=window.matchMedia,n=e("only all").matches,i=!1,t=0,a=[],r=function(){clearTimeout(t),t=setTimeout(function(){for(var n=0,i=a.length;i>n;n++){var t=a[n].mql,r=a[n].listeners||[],o=e(t.media).matches;if(o!==t.matches){t.matches=o;for(var c=0,d=r.length;d>c;c++)r[c].call(window,t)}}},30)};window.matchMedia=function(t){var o=e(t),c=[],d=0;return o.addListener=function(e){n&&(i||(i=!0,window.addEventListener("resize",r,!0)),0===d&&(d=a.push({mql:o,listeners:c})),c.push(e))},o.removeListener=function(e){for(var n=0,i=c.length;i>n;n++)c[n]===e&&c.splice(n,1)},o}}();