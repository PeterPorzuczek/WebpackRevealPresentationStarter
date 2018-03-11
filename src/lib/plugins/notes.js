
// Modified from the notes.js official plugin.
// Needed to give the custom htmlTemplate as option

// note.html template file

let htmlTemplate = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>reveal.js - Slide Notes</title><style>body {font-family: Helvetica;font-size: 18px;}#current-slide,#upcoming-slide,#speaker-controls {padding: 6px;box-sizing: border-box;-moz-box-sizing: border-box;}#current-slide iframe,#upcoming-slide iframe {width: 100%;height: 100%;border: 1px solid #ddd;}#current-slide .label,#upcoming-slide .label {position: absolute;top: 10px;left: 10px;z-index: 2;}.overlay-element {height: 34px;line-height: 34px;padding: 0 10px;text-shadow: none;background: rgba( 220, 220, 220, 0.8 );color: #222;font-size: 14px;}.overlay-element.interactive:hover {background: rgba( 220, 220, 220, 1 );}#current-slide {position: absolute;width: 60%;height: 100%;top: 0;left: 0;padding-right: 0;}#upcoming-slide {position: absolute;width: 40%;height: 40%;right: 0;top: 0;}/* Speaker controls */#speaker-controls {position: absolute;top: 40%;right: 0;width: 40%;height: 60%;overflow: auto;font-size: 18px;}.speaker-controls-time.hidden,.speaker-controls-notes.hidden {display: none;}.speaker-controls-time .label,.speaker-controls-pace .label,.speaker-controls-notes .label {text-transform: uppercase;font-weight: normal;font-size: 0.66em;color: #666;margin: 0;}.speaker-controls-time, .speaker-controls-pace {border-bottom: 1px solid rgba( 200, 200, 200, 0.5 );margin-bottom: 10px;padding: 10px 16px;padding-bottom: 20px;cursor: pointer;}.speaker-controls-time .reset-button {opacity: 0;float: right;color: #666;text-decoration: none;}.speaker-controls-time:hover .reset-button {opacity: 1;}.speaker-controls-time .timer,.speaker-controls-time .clock {width: 50%;}.speaker-controls-time .timer,.speaker-controls-time .clock,.speaker-controls-time .pacing .hours-value,.speaker-controls-time .pacing .minutes-value,.speaker-controls-time .pacing .seconds-value {font-size: 1.9em;}.speaker-controls-time .timer {float: left;}.speaker-controls-time .clock {float: right;text-align: right;}.speaker-controls-time span.mute {opacity: 0.3;}.speaker-controls-time .pacing-title {margin-top: 5px;}.speaker-controls-time .pacing.ahead {color: blue;}.speaker-controls-time .pacing.on-track {color: green;}.speaker-controls-time .pacing.behind {color: red;}.speaker-controls-notes {padding: 10px 16px;}.speaker-controls-notes .value {margin-top: 5px;line-height: 1.4;font-size: 1.2em;}/* Layout selector */#speaker-layout {position: absolute;top: 10px;right: 10px;color: #222;z-index: 10;}#speaker-layout select {position: absolute;width: 100%;height: 100%;top: 0;left: 0;border: 0;box-shadow: 0;cursor: pointer;opacity: 0;font-size: 1em;background-color: transparent;-moz-appearance: none;-webkit-appearance: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}#speaker-layout select:focus {outline: none;box-shadow: none;}.clear {clear: both;}/* Speaker layout: Wide */body[data-speaker-layout="wide"] #current-slide,body[data-speaker-layout="wide"] #upcoming-slide {width: 50%;height: 45%;padding: 6px;}body[data-speaker-layout="wide"] #current-slide {top: 0;left: 0;}body[data-speaker-layout="wide"] #upcoming-slide {top: 0;left: 50%;}body[data-speaker-layout="wide"] #speaker-controls {top: 45%;left: 0;width: 100%;height: 50%;font-size: 1.25em;}/* Speaker layout: Tall */body[data-speaker-layout="tall"] #current-slide,body[data-speaker-layout="tall"] #upcoming-slide {width: 45%;height: 50%;padding: 6px;}body[data-speaker-layout="tall"] #current-slide {top: 0;left: 0;}body[data-speaker-layout="tall"] #upcoming-slide {top: 50%;left: 0;}body[data-speaker-layout="tall"] #speaker-controls {padding-top: 40px;top: 0;left: 45%;width: 55%;height: 100%;font-size: 1.25em;}/* Speaker layout: Notes only */body[data-speaker-layout="notes-only"] #current-slide,body[data-speaker-layout="notes-only"] #upcoming-slide {display: none;}body[data-speaker-layout="notes-only"] #speaker-controls {padding-top: 40px;top: 0;left: 0;width: 100%;height: 100%;font-size: 1.25em;}@media screen and (max-width: 1080px) {body[data-speaker-layout="default"] #speaker-controls {font-size: 16px;}}@media screen and (max-width: 900px) {body[data-speaker-layout="default"] #speaker-controls {font-size: 14px;}}@media screen and (max-width: 800px) {body[data-speaker-layout="default"] #speaker-controls {font-size: 12px;}}</style></head><body><div id="current-slide"></div><div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div><div id="speaker-controls"><div class="speaker-controls-time"><h4 class="label">Time <span class="reset-button">Click to Reset</span></h4><div class="clock"><span class="clock-value">0:00 AM</span></div><div class="timer"><span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span></div><div class="clear"></div><h4 class="label pacing-title" style="display: none">Pacing – Time to finish current slide</h4><div class="pacing" style="display: none"><span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span></div></div><div class="speaker-controls-notes hidden"><h4 class="label">Notes</h4><div class="value"></div></div></div><div id="speaker-layout" class="overlay-element interactive"><span class="speaker-layout-label"></span><select class="speaker-layout-dropdown"></select></div><script>(function() {var notes,notesValue,currentState,currentSlide,upcomingSlide,layoutLabel,layoutDropdown,connected = false;var SPEAKER_LAYOUTS = {"default": "Default","wide": "Wide","tall": "Tall","notes-only": "Notes only"};setupLayout();window.addEventListener( "message", function( event ) {var data = JSON.parse( event.data );/* The overview mode is only useful to the reveal.js instance where navigation occurs so we don"t sync it */if( data.state ) delete data.state.overview;/* Messages sent by the notes plugin inside of the main window */if( data && data.namespace === "reveal-notes" ) {if( data.type === "connect" ) {handleConnectMessage( data );}else if( data.type === "state" ) {handleStateMessage( data );}}/* Messages sent by the reveal.js inside of the current slide preview */else if( data && data.namespace === "reveal" ) {if( /ready/.test( data.eventName ) ) {/* Send a message back to notify that the handshake is complete */window.opener.postMessage( JSON.stringify({ namespace: "reveal-notes", type: "connected"} ), "*" );}else if( /slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {window.opener.postMessage( JSON.stringify({ method: "setState", args: [ data.state ]} ), "*" );}}} );/** * Called when the main window is trying to establish a * connection. */function handleConnectMessage( data ) {if( connected === false ) {connected = true;setupIframes( data );setupKeyboard();setupNotes();setupTimer();}}/** * Called when the main window sends an updated state. */function handleStateMessage( data ) {/* Store the most recently set state to avoid circular loops applying the same state */currentState = JSON.stringify( data.state );/* No need for updating the notes in case of fragment changes */if ( data.notes ) {notes.classList.remove( "hidden" );notesValue.style.whiteSpace = data.whitespace;if( data.markdown ) {notesValue.innerHTML = marked( data.notes );}else {notesValue.innerHTML = data.notes;}}else {notes.classList.add( "hidden" );}/* Update the note slides */currentSlide.contentWindow.postMessage( JSON.stringify({ method: "setState", args: [ data.state ] }), "*" );upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: "setState", args: [ data.state ] }), "*" );upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: "next" }), "*" );}/* Limit to max one state update per X ms */handleStateMessage = debounce( handleStateMessage, 200 );/** * Forward keyboard events to the current slide window. * This enables keyboard events to work even if focus * isn"t set on the current slide iframe. */function setupKeyboard() {document.addEventListener( "keydown", function( event ) {currentSlide.contentWindow.postMessage( JSON.stringify({ method: "triggerKey", args: [ event.keyCode ] }), "*" );} );}/** * Creates the preview iframes. */function setupIframes( data ) {var params = ["receiver","progress=false","history=false","transition=none","autoSlide=0","backgroundTransition=none"].join( "&" );var urlSeparator = "?";var hash = "#/" + data.state.indexh + "/" + data.state.indexv;var currentURL = data.url + urlSeparator + params + "&postMessageEvents=true" + hash;var upcomingURL = data.url + urlSeparator + params + "&controls=false" + hash;currentSlide = document.createElement( "iframe" );currentSlide.setAttribute( "width", 1280 );currentSlide.setAttribute( "height", 1024 );currentSlide.setAttribute( "src", currentURL );document.querySelector( "#current-slide" ).appendChild( currentSlide );upcomingSlide = document.createElement( "iframe" );upcomingSlide.setAttribute( "width", 640 );upcomingSlide.setAttribute( "height", 512 );upcomingSlide.setAttribute( "src", upcomingURL );document.querySelector( "#upcoming-slide" ).appendChild( upcomingSlide );}/** * Setup the notes UI. */function setupNotes() {notes = document.querySelector( ".speaker-controls-notes" );notesValue = document.querySelector( ".speaker-controls-notes .value" );}function getTimings() {var slides = Reveal.getSlides();var defaultTiming = Reveal.getConfig().defaultTiming;if (defaultTiming == null) {return null;}var timings = [];for ( var i in slides ) {var slide = slides[i];var timing = defaultTiming;if( slide.hasAttribute( "data-timing" )) {var t = slide.getAttribute( "data-timing" );timing = parseInt(t);if( isNaN(timing) ) {console.warn("Could not parse timing " + t + " of slide " + i + "; using default of " + defaultTiming);timing = defaultTiming;}}timings.push(timing);}return timings;}/** * Return the number of seconds allocated for presenting * all slides up to and including this one. */function getTimeAllocated(timings) {var slides = Reveal.getSlides();var allocated = 0;var currentSlide = Reveal.getSlidePastCount();for (var i in slides.slice(0, currentSlide + 1)) {allocated += timings[i];}return allocated;}/** * Create the timer and clock and start updating them * at an interval. */function setupTimer() {var start = new Date(),timeEl = document.querySelector( ".speaker-controls-time" ),clockEl = timeEl.querySelector( ".clock-value" ),hoursEl = timeEl.querySelector( ".hours-value" ),minutesEl = timeEl.querySelector( ".minutes-value" ),secondsEl = timeEl.querySelector( ".seconds-value" ),pacingTitleEl = timeEl.querySelector( ".pacing-title" ),pacingEl = timeEl.querySelector( ".pacing" ),pacingHoursEl = pacingEl.querySelector( ".hours-value" ),pacingMinutesEl = pacingEl.querySelector( ".minutes-value" ),pacingSecondsEl = pacingEl.querySelector( ".seconds-value" );var timings = getTimings();if (timings !== null) {pacingTitleEl.style.removeProperty("display");pacingEl.style.removeProperty("display");}function _displayTime( hrEl, minEl, secEl, time) {var sign = Math.sign(time) == -1 ? "-" : "";time = Math.abs(Math.round(time / 1000));var seconds = time % 60;var minutes = Math.floor( time / 60 ) % 60 ;var hours = Math.floor( time / ( 60 * 60 )) ;hrEl.innerHTML = sign + zeroPadInteger( hours );if (hours == 0) {hrEl.classList.add( "mute" );}else {hrEl.classList.remove( "mute" );}minEl.innerHTML = ":" + zeroPadInteger( minutes );if (hours == 0 && minutes == 0) {minEl.classList.add( "mute" );}else {minEl.classList.remove( "mute" );}secEl.innerHTML = ":" + zeroPadInteger( seconds );}function _updateTimer() {var diff, hours, minutes, seconds,now = new Date();diff = now.getTime() - start.getTime();clockEl.innerHTML = now.toLocaleTimeString( "en-US", { hour12: true, hour: "2-digit", minute:"2-digit" } );_displayTime( hoursEl, minutesEl, secondsEl, diff );if (timings !== null) {_updatePacing(diff);}}function _updatePacing(diff) {var slideEndTiming = getTimeAllocated(timings) * 1000;var currentSlide = Reveal.getSlidePastCount();var currentSlideTiming = timings[currentSlide] * 1000;var timeLeftCurrentSlide = slideEndTiming - diff;if (timeLeftCurrentSlide < 0) {pacingEl.className = "pacing behind";}else if (timeLeftCurrentSlide < currentSlideTiming) {pacingEl.className = "pacing on-track";}else {pacingEl.className = "pacing ahead";}_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );}/* Update once directly */_updateTimer();/* Then update every second */setInterval( _updateTimer, 1000 );function _resetTimer() {if (timings == null) {start = new Date();}else {/* Reset timer to beginning of current slide */var slideEndTiming = getTimeAllocated(timings) * 1000;var currentSlide = Reveal.getSlidePastCount();var currentSlideTiming = timings[currentSlide] * 1000;var previousSlidesTiming = slideEndTiming - currentSlideTiming;var now = new Date();start = new Date(now.getTime() - previousSlidesTiming);}_updateTimer();}timeEl.addEventListener( "click", function() {_resetTimer();return false;} );}/** * Sets up the speaker view layout and layout selector. */function setupLayout() {layoutDropdown = document.querySelector( ".speaker-layout-dropdown" );layoutLabel = document.querySelector( ".speaker-layout-label" );/* Render the list of available layouts */for( var id in SPEAKER_LAYOUTS ) {var option = document.createElement( "option" );option.setAttribute( "value", id );option.textContent = SPEAKER_LAYOUTS[ id ];layoutDropdown.appendChild( option );}/* Monitor the dropdown for changes */layoutDropdown.addEventListener( "change", function( event ) {setLayout( layoutDropdown.value );}, false );/* Restore any currently persisted layout */setLayout( getLayout() );}/** * Sets a new speaker view layout. The layout is persisted * in local storage. */function setLayout( value ) {var title = SPEAKER_LAYOUTS[ value ];layoutLabel.innerHTML = "Layout" + ( title ? ( ": " + title ) : "" );layoutDropdown.value = value;document.body.setAttribute( "data-speaker-layout", value );/* Persist locally */if( supportsLocalStorage() ) {window.localStorage.setItem( "reveal-speaker-layout", value );}}/** * Returns the ID of the most recently set speaker layout * or our default layout if none has been set. */function getLayout() {if( supportsLocalStorage() ) {var layout = window.localStorage.getItem( "reveal-speaker-layout" );if( layout ) {return layout;}}/* Default to the first record in the layouts hash */for( var id in SPEAKER_LAYOUTS ) {return id;}}function supportsLocalStorage() {try {localStorage.setItem("test", "test");localStorage.removeItem("test");return true;}catch( e ) {return false;}}function zeroPadInteger( num ) {var str = "00" + parseInt( num );return str.substring( str.length - 2 );}/** * Limits the frequency at which a function can be called. */function debounce( fn, ms ) {var lastTime = 0,timeout;return function() {var args = arguments;var context = this;clearTimeout( timeout );var timeSinceLastCall = Date.now() - lastTime;if( timeSinceLastCall > ms ) {fn.apply( context, args );lastTime = Date.now();}else {timeout = setTimeout( function() {fn.apply( context, args );lastTime = Date.now();}, ms - timeSinceLastCall );}}}})();</script></body></html>`;

/**
 * Handles opening of and synchronization with the reveal.js
 * notes window.
 *
 * Handshake process:
 * 1. This window posts 'connect' to notes window
 *    - Includes URL of presentation to show
 * 2. Notes window responds with 'connected' when it is available
 * 3. This window proceeds to send the current presentation state
 *    to the notes window
 */
var RevealNotes = (function() {

	function openNotes( html = htmlTemplate ) {

		var notesPopup = window.open( '', 'reveal.js - Notes', 'width=1100,height=700' );

		notesPopup.document.write(html);
		
		// Allow popup window access to Reveal API
		notesPopup.Reveal = Reveal;
		
		/**
		 * Connect to the notes window through a postmessage handshake.
		 * Using postmessage enables us to work in situations where the
		 * origins differ, such as a presentation being opened from the
		 * file system.
		 */
		function connect() {
			// Keep trying to connect until we get a 'connected' message back
			var connectInterval = setInterval( function() {
				notesPopup.postMessage( JSON.stringify( {
					namespace: 'reveal-notes',
					type: 'connect',
					url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
					state: Reveal.getState()
				} ), '*' );
			}, 500 );

			window.addEventListener( 'message', function( event ) {
				var data = JSON.parse( event.data );
				if( data && data.namespace === 'reveal-notes' && data.type === 'connected' ) {
					clearInterval( connectInterval );
					onConnected();
				}
			} );
		}

		/**
		 * Posts the current slide data to the notes window
		 */
		function post( event ) {

			var slideElement = Reveal.getCurrentSlide(),
				notesElement = slideElement.querySelector( 'aside.notes' ),
				fragmentElement = slideElement.querySelector( '.current-fragment' );

			var messageData = {
				namespace: 'reveal-notes',
				type: 'state',
				notes: '',
				markdown: false,
				whitespace: 'normal',
				state: Reveal.getState()
			};

			// Look for notes defined in a slide attribute
			if( slideElement.hasAttribute( 'data-notes' ) ) {
				messageData.notes = slideElement.getAttribute( 'data-notes' );
				messageData.whitespace = 'pre-wrap';
			}

			// Look for notes defined in a fragment
			if( fragmentElement ) {
				var fragmentNotes = fragmentElement.querySelector( 'aside.notes' );
				if( fragmentNotes ) {
					notesElement = fragmentNotes;
				}
				else if( fragmentElement.hasAttribute( 'data-notes' ) ) {
					messageData.notes = fragmentElement.getAttribute( 'data-notes' );
					messageData.whitespace = 'pre-wrap';

					// In case there are slide notes
					notesElement = null;
				}
			}

			// Look for notes defined in an aside element
			if( notesElement ) {
				messageData.notes = notesElement.innerHTML;
				messageData.markdown = typeof notesElement.getAttribute( 'data-markdown' ) === 'string';
			}

			notesPopup.postMessage( JSON.stringify( messageData ), '*' );

		}

		/**
		 * Called once we have established a connection to the notes
		 * window.
		 */
		function onConnected() {

			// Monitor events that trigger a change in state
			Reveal.addEventListener( 'slidechanged', post );
			Reveal.addEventListener( 'fragmentshown', post );
			Reveal.addEventListener( 'fragmenthidden', post );
			Reveal.addEventListener( 'overviewhidden', post );
			Reveal.addEventListener( 'overviewshown', post );
			Reveal.addEventListener( 'paused', post );
			Reveal.addEventListener( 'resumed', post );

			// Post the initial state
			post();

		}

		connect();

	}

	if( !/receiver/i.test( window.location.search ) ) {

		// If the there's a 'notes' query set, open directly
		if( window.location.search.match( /(\?|\&)notes/gi ) !== null ) {
			openNotes();
		}

		// Open the notes when the 's' key is hit
		document.addEventListener( 'keydown', function( event ) {
			// Disregard the event if the target is editable or a
			// modifier is present
			if ( document.querySelector( ':focus' ) !== null || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey ) return;

			// Disregard the event if keyboard is disabled
			if ( Reveal.getConfig().keyboard === false ) return;

			if( event.keyCode === 83 ) {
				event.preventDefault();
				openNotes();
			}
		}, false );

		// Show our keyboard shortcut in the reveal.js help overlay
		if( window.Reveal ) Reveal.registerKeyboardShortcut( 'S', 'Speaker notes view' );

	}

	return { open: openNotes };

})();