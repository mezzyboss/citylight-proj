import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import BookingCalendar from "./BookingCalendar";
import BookingQuestionnaire from "./BookingQuestionnaire";
import BookingConfirmation from "./BookingConfirmation";

type BookingStep = "calendar" | "questionnaire" | "confirmation";

interface BookingDetails {
  date: Date | null;
  startTime: string | null;
  duration: number | null;
  purpose: string;
  attendees: number;
  specialRequirements: string;
  contactName: string;
  contactEmail: string;
  soundEngineer: boolean;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("calendar");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: null,
    startTime: null,
    duration: null,
    purpose: "",
    attendees: 1,
    specialRequirements: "",
    contactName: "",
    contactEmail: "",
    soundEngineer: false,
  });

  const handleCalendarSubmit = (
    date: Date,
    startTime: string,
    duration: number,
  ) => {
    setBookingDetails((prev) => ({
      ...prev,
      date,
      startTime,
      duration,
    }));
    setCurrentStep("questionnaire");
  };

  const handleQuestionnaireSubmit = (
    questionnaireData: Omit<BookingDetails, "date" | "startTime" | "duration">,
  ) => {
    setBookingDetails((prev) => ({
      ...prev,
      ...questionnaireData,
    }));
    setCurrentStep("confirmation");
  };

  const handleBackToCalendar = () => {
    setCurrentStep("calendar");
  };

  const handleBackToQuestionnaire = () => {
    setCurrentStep("questionnaire");
  };

  const handleNewBooking = () => {
    setBookingDetails({
      date: null,
      startTime: null,
      duration: null,
      purpose: "",
      attendees: 1,
      specialRequirements: "",
      contactName: "",
      contactEmail: "",
      soundEngineer: false,
    });
    setCurrentStep("calendar");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Space Booking Application
        </h1>
        <p className="text-muted-foreground mt-2">
          Book a space for your next event or meeting
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep === "calendar" || currentStep === "questionnaire" || currentStep === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                1
              </div>
              <div className="h-1 w-12 bg-muted">
                <div
                  className={`h-full ${currentStep === "questionnaire" || currentStep === "confirmation" ? "bg-primary" : "bg-muted"}`}
                ></div>
              </div>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep === "questionnaire" || currentStep === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <div className="h-1 w-12 bg-muted">
                <div
                  className={`h-full ${currentStep === "confirmation" ? "bg-primary" : "bg-muted"}`}
                ></div>
              </div>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center text-sm mb-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div
                className={
                  currentStep === "calendar"
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }
              >
                Select Date & Time
              </div>
              <div
                className={
                  currentStep === "questionnaire"
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }
              >
                Complete Questionnaire
              </div>
              <div
                className={
                  currentStep === "confirmation"
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }
              >
                Confirm Booking
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {currentStep === "calendar" && "Select Date and Time"}
              {currentStep === "questionnaire" &&
                "Complete Booking Questionnaire"}
              {currentStep === "confirmation" && "Booking Confirmation"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === "calendar" && (
              <BookingCalendar onSubmit={handleCalendarSubmit} />
            )}

            {currentStep === "questionnaire" && (
              <BookingQuestionnaire
                onSubmit={handleQuestionnaireSubmit}
                onBack={handleBackToCalendar}
                initialValues={{
                  purpose: bookingDetails.purpose,
                  attendees: bookingDetails.attendees,
                  specialRequirements: bookingDetails.specialRequirements,
                  contactName: bookingDetails.contactName,
                  contactEmail: bookingDetails.contactEmail,
                  soundEngineer: bookingDetails.soundEngineer,
                }}
              />
            )}

            {currentStep === "confirmation" && (
              <BookingConfirmation
                bookingDetails={bookingDetails}
                onBack={handleBackToQuestionnaire}
                onNewBooking={handleNewBooking}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
