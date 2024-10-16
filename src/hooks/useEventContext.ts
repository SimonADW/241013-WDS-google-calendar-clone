import { useContext } from "react";
import { EventContext } from "../components/EventProvider/EventProvider";


export const useEventContext = () => {
	const context = useContext(EventContext);
	if(!context) {
		throw new Error("useEventContext must be used within a EventProvider");
	}
	return context;
}