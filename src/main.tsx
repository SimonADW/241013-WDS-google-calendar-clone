import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import EventProvider from "./components/EventProvider/EventProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<EventProvider>
			<App />
		</EventProvider>
	</StrictMode>
);
