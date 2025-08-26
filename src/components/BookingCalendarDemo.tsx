import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface BookingCalendarProps {
  onBookingSelect?: (date: Date, timeSlot: TimeSlot, duration: number) => void;
  availableDates?: Date[];
}

const BookingCalendarDemo = ({
  onBookingSelect = () => {},
  availableDates = [new Date(), addDays(new Date(), 1), addDays(new Date(), 2)],
}: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );
  const [duration, setDuration] = useState<number>(1);

  // Demo/mock time slots
  const timeSlots: TimeSlot[] = [
    { id: "1", startTime: "09:00", endTime: "10:00", isAvailable: true },
    { id: "2", startTime: "10:00", endTime: "11:00", isAvailable: true },
    { id: "3", startTime: "11:00", endTime: "12:00", isAvailable: false },
    { id: "4", startTime: "12:00", endTime: "13:00", isAvailable: true },
    { id: "5", startTime: "13:00", endTime: "14:00", isAvailable: true },
    { id: "6", startTime: "14:00", endTime: "15:00", isAvailable: true },
    { id: "7", startTime: "15:00", endTime: "16:00", isAvailable: false },
    { id: "8", startTime: "16:00", endTime: "17:00", isAvailable: true },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    if (!timeSlot.isAvailable) return;
    setSelectedTimeSlot(timeSlot);
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0]);
  };

  const navigate = useNavigate();
  const handleBookingConfirm = () => {
    if (selectedDate && selectedTimeSlot) {
      onBookingSelect(selectedDate, selectedTimeSlot, duration);
      navigate("/questionnaire", {
        state: {
          selectedDate,
          selectedTimeSlot: selectedTimeSlot.startTime,
          selectedDuration: duration,
        },
      });
    }
  };

  // Function to determine if a date is available
  const isDateAvailable = (date: Date) => {
    return availableDates.some((availableDate) =>
      isSameDay(startOfDay(date), startOfDay(availableDate)),
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>
              Choose an available date for your booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => !isDateAvailable(date)}
            />
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span>Unavailable</span>
            </div>
          </CardFooter>
        </Card>

        {/* Time Slots Section */}
        <Card>
          <CardHeader>
            <CardTitle>Select Time</CardTitle>
            <CardDescription>
              {selectedDate
                ? `Available slots for ${format(selectedDate, "MMMM d, yyyy")}`
                : "Please select a date first"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      className={`flex justify-between items-center bg-white border text-black hover:bg-primary hover:text-white transition-colors duration-150 ${selectedTimeSlot?.id === slot.id ? "bg-primary text-white" : ""} ${!slot.isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => handleTimeSlotSelect(slot)}
                      disabled={!slot.isAvailable}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{slot.startTime}</span>
                    </Button>
                  ))}
                </div>

                {selectedTimeSlot && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Duration (hours)
                      </h4>
                      <div className="flex items-center space-x-4">
                        <Slider
                          defaultValue={[1]}
                          max={4}
                          min={1}
                          step={1}
                          onValueChange={handleDurationChange}
                          className="w-full"
                        />
                        <span className="text-sm font-medium">{duration}h</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-sm font-medium mb-2">
                        Booking Summary
                      </h4>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm">
                          <span className="font-medium">Date:</span>{" "}
                          {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Time:</span>{" "}
                          {selectedTimeSlot.startTime} -{" "}
                          {duration > 1
                            ? `${parseInt(selectedTimeSlot.startTime.split(":")[0]) + duration}:${selectedTimeSlot.startTime.split(":")[1]}`
                            : selectedTimeSlot.endTime}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Duration:</span>{" "}
                          {duration} hour{duration > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={handleBookingConfirm}
                    >
                      Continue to Confirmation
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <Calendar className="h-10 w-10 mb-2" />
                <p>Select a date to view available time slots</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingCalendarDemo;
