import React, { useCallback, useState } from "react";
import { SelectedDate } from "../Calendar/Calendar";
import { useEventContext } from "../../hooks/useEventContext.ts";

type AddEventModalProps = {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectedDate: SelectedDate;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
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

	// @TODO: FIX TYPE ERROR	
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
		setIsEditing(false);
		setModalOpen(false);
	};

	const handleDelete = () => {
		deleteEvent(formValues);
		setIsEditing(false);
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

	return (
		<div className="modal">
			<div className="overlay"></div>
			<div className="modal-body">
				<div className="modal-title">
					<div>Add Event</div>
					<small>{`${selectedDate.date}/${selectedDate.month}/${selectedDate.year}`}</small>
					<button
						className="close-btn"
						onClick={() => setModalOpen(false)}
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
						/>
					</div>
					<div className="form-group checkbox">
						<input
							type="checkbox"
							name="allDay"
							id="all-day"
							value={formValues.allDay.toString()}
							onChange={handleChange}
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
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="end-time">End Time</label>
							<input
								type="time"
								name="endTime"
								id="end-time"
								value={formValues.endTime}
								onChange={handleChange}
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
