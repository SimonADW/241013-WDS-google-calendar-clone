import React, { useCallback, useEffect, useState } from "react";
import type { Event } from "../../hooks/useEvent.ts";
import { SelectedDate } from "../Calendar/Calendar";
import { useEventContext } from "../../hooks/useEventContext.ts";

type AddEventModalProps = {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectedDate: SelectedDate;
	isEditing: Event | null;
	setIsEditing: React.Dispatch<React.SetStateAction<Event | null>>;
};

const AddEventModal = ({
	setModalOpen,
	selectedDate,
	isEditing,
	setIsEditing,
}: AddEventModalProps) => {
	const [formValues, setFormValues] = useState({
		date: `${selectedDate.date}/${selectedDate.month + 1}/${selectedDate.year}`,
		name: "",
		allDay: false,
		startTime: "",
		endTime: "",
		color: "blue",
		id: Date.now(),
	});
	
	// POPULATE FORM IF EDITING
	useEffect(()=> {
	const populateFormIfIsEditing = ()=> {	
		if(isEditing) {
			setFormValues(isEditing);
		} 
	}
		populateFormIfIsEditing();		
	}, [isEditing])

	// GET FUNCTIONS FROM useEvent HOOK
	const { addEvent, editEvent, deleteEvent } = useEventContext();
	
	// HANDLE FORM SUBMISSION
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isEditing) {
			editEvent(formValues);
		} else {
			addEvent(formValues);
		}
		setIsEditing(null);
		setModalOpen(false);
	};

	const handleDelete = () => {
		deleteEvent(formValues);
		setIsEditing(null);
		setModalOpen(false);
	};

	// HANDLE FORM INPUT CHANGE
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setFormValues({
				...formValues,
				[name]: value,
			});
		},
		[formValues]
	);

	// VALIDATE THAT END TIME IS AFTER START TIME
	const validateTime = () => {
		const startTime = formValues.startTime;
		const endTime = formValues.endTime;
	
		if (startTime && endTime) {
		  const start = new Date(`1970-01-01T${startTime}:00`);
		  const end = new Date(`1970-01-01T${endTime}:00`);
		  const endTimeInput = document.getElementById("end-time") as HTMLInputElement | null;
	
		  if (endTimeInput) {
			if (end <= start) {
			  // SET CUSTOM VALIDITY FOR THE END TIME INPUT IF IT'S INVALID
			  endTimeInput.setCustomValidity("End time must be after start time.");
			} else {
			  // CLEAR CUSTOM VALIDITY IF VALID
			  endTimeInput.setCustomValidity("");
			}
		  }
		}
	  };

	  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(event)
		validateTime()
	  }

	// HANDLE CLOSE MODAL
	const handleClose = ()=> {
		setIsEditing(null);
		setModalOpen(false);
	}

	return (
		<div className="modal">
			<div className="overlay"></div>
			<div className="modal-body">
				<div className="modal-title">
					<div>{ isEditing ? "Edit Event" : "Add Event"}</div>
					<small>{isEditing ? (
						`${isEditing.date.slice(0, 2)}/${isEditing.date.slice(3,5)}/${isEditing.date.slice(6)}`
						) : (
						`${selectedDate.date}/${selectedDate.month}/${selectedDate.year}`)
					}</small>
					<button
						className="close-btn"
						onClick={handleClose}
					>
						&times;
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={formValues.name}
							onChange={handleChange}
							autoFocus={isEditing === null}
							required							
						/>
					</div>

					<div className="form-group checkbox">
						<input
							type="checkbox"
							name="allDay"
							id="all-day"							
							checked={formValues.allDay}													
							onChange={(event)=> {								
								setFormValues({									
									...formValues, 
									allDay: event.target.checked
								})
							}}
						/>
						<label htmlFor="all-day">All Day?</label>
					</div>
					<div className="row">
						<div className="form-group">
							<label htmlFor="start-time">Start Time</label>
							<input
								type="time"
								name="startTime"
								id="start-time"
								value={formValues.startTime}
								onChange={(e)=>handleTimeChange(e)}
								disabled={formValues.allDay}
								required={!isEditing}
								
								/>
						</div>
						<div className="form-group">
							<label htmlFor="end-time">End Time</label>
							<input
								type="time"
								name="endTime"
								id="end-time"
								value={formValues.endTime}
								onChange={(e)=>handleTimeChange(e)}
								disabled={formValues.allDay}
								required={!isEditing}

							/>
						</div>
					</div>

					<div className="form-group">
						<label>Color</label>
						<div className="row left">
							<input
								type="radio"
								name="color"
								value="blue"
								id="blue"
								className="color-radio"
								checked={formValues.color === "blue"}
								onChange={handleChange}
							/>
							<label htmlFor="blue">
								<span className="sr-only">Blue</span>
							</label>
							<input
								type="radio"
								name="color"
								value="red"
								id="red"
								className="color-radio"
								checked={formValues.color === "red"}
								onChange={handleChange}
							/>
							<label htmlFor="red">
								<span className="sr-only">Red</span>
							</label>
							<input
								type="radio"
								name="color"
								value="green"
								id="green"
								className="color-radio"
								checked={formValues.color === "green"}
								onChange={handleChange}
							/>
							<label htmlFor="green">
								<span className="sr-only">Green</span>
							</label>
						</div>
					</div>
					<div className="row">
						{/* RENDER BUTTONS DEPENDING ON IsEditing */}
						{isEditing ? (
							<>
								<button
									className="btn btn-success"
									type="submit"
								>
									Save
								</button>
								<button
									className="btn btn-delete"
									type="button"
									onClick={handleDelete}
								>
									Delete
								</button>
							</>
						) : (
							<button className="btn btn-success" type="submit">
								Add
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddEventModal;
