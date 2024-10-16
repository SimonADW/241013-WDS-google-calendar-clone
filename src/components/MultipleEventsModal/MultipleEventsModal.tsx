import React from "react";

const MultipleEventsModal = () => {
	return (
		<div class="modal">
			<div class="overlay"></div>
			<div class="modal-body">
				<div class="modal-title">
					6/8/23
					<button class="close-btn">&times;</button>
				</div>
				{/* MAP OVER EVENTS AND RENDER */}
				<div class="events">
					<button class="all-day-event green event">
						<div class="event-name">Short</div>
					</button>
					<button class="event">
						<div class="color-dot blue"></div>
						<div class="event-time">7am</div>
						<div class="event-name">Event Name</div>
					</button>
					<button class="event">
						<div class="color-dot green"></div>
						<div class="event-time">8am</div>
						<div class="event-name">Event Name</div>
					</button>
					<button class="event">
						<div class="color-dot blue"></div>
						<div class="event-time">9am</div>
						<div class="event-name">Event Name</div>
					</button>
					<button class="event">
						<div class="color-dot blue"></div>
						<div class="event-time">10am</div>
						<div class="event-name">Event Name</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default MultipleEventsModal;
