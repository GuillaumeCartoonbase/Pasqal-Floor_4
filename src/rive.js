const stateMachine = "Floor 4";

const riveInstance = new rive.Rive({
	src: "src/floor-4.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: onLoadHandler,
	onStateChange: onStateChangeHandler,
});

// Handle the onLoad event
function onLoadHandler() {
	// Prevent a blurry canvas by using the device pixel ratio
	riveInstance.resizeDrawingSurfaceToCanvas();

	const inputs = riveInstance.stateMachineInputs(stateMachine);
	// myInput = inputs.find((i) => i.name === "inputName");
	// myInput.value = true;

	// Text change
	// riveInstance.setTextRunValue(textRun, newString);

	// Nested inputs setup
	//riveInstance.setNumberStateAtPath(inputName, number, path)
	//riveInstance.setBooleanStateAtPath(inputName, boolean, path)
	//riveInstance.fireStateAtPath(inputName, path)
}

// Handle the onStateChange event
function onStateChangeHandler(e) {
	// Custom logic for state change
	// console.log(e.data[0]); // Get curent timeline name
}

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

// Events handling setup
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	const eventKey = eventName;
	switch (eventKey) {
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		default:
			console.log("Unhandled event:", eventName, "\n", riveEvent);
			break;
	}
};

// Register the event handler
riveInstance.on(rive.EventType.RiveEvent, eventFire);
