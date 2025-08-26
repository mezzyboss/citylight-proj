import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import BookingCalendarDemo from "./components/BookingCalendarDemo";
import BookingQuestionnaire from "./components/BookingQuestionnaire";
import BookingConfirmation from "./components/BookingConfirmation";
// import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<BookingCalendarDemo />} />
          <Route path="/questionnaire" element={<BookingQuestionnaire />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
        </Routes>
  {/* Tempo routes removed due to missing module */}
      </>
    </Suspense>
  );
}

export default App;
