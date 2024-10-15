import { SelectedDate } from "../Calendar/Calendar";



// COMPONENT TO CONTAIN DATE AND EVENT-LISININGS
type DateofMonthProps = {
  year: number;
  month: number;  
  date: number;
  dayClass?: string;
  setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate | null>>;
}



const DateOfMonth: React.FC<DateofMonthProps> = ({ year, month, date, dayClass, setModalOpen, setSelectedDate }) => {

	const dayOfWeek = new Date(year, month, date).getDay();	

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	const handleAddEvent = (year: number, month: number, date: number) => {
		setModalOpen(true)
		setSelectedDate({ year, month, date })
	}

  return (
	<div className={`day ${dayClass}`}>
		    <div className="day-header">
              <div className="week-name">{days[dayOfWeek]}</div>
              <div className="day-number">{date}</div>
              <button className="add-event-btn" onClick={()=>handleAddEvent(year, month, date)}>+</button>
            </div>
	</div>
  )
}

export default DateOfMonth;