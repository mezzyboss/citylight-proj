import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck, Download, ArrowLeft, CalendarPlus } from "lucide-react";

interface BookingDetails {
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  intendedUse: string;
  attendees: number;
  specialRequirements: string;
  contactInfo: string;
  soundEngineer: boolean;
}

interface BookingConfirmationProps {
  bookingDetails?: BookingDetails;
  onBack?: () => void;
  onAddToCalendar?: () => void;
  onDownloadDetails?: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingDetails = {
    date: new Date(),
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    duration: 2,
    intendedUse: "Team meeting",
    attendees: 8,
    specialRequirements: "Need projector and whiteboard",
    contactInfo: "john.doe@example.com",
    soundEngineer: false,
  },
  onBack = () => console.log("Back clicked"),
  onAddToCalendar = () => console.log("Add to calendar clicked"),
  onDownloadDetails = () => console.log("Download details clicked"),
}) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-background">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Booking Confirmation
              </CardTitle>
              <CardDescription>
                Your space has been successfully booked
              </CardDescription>
            </div>
            <CalendarCheck className="h-12 w-12 text-primary" />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Date & Time Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-md">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {formatDate(bookingDetails.date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">
                    {bookingDetails.startTime} - {bookingDetails.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {bookingDetails.duration} hour
                    {bookingDetails.duration !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Intended Use</p>
                  <p className="font-medium">{bookingDetails.intendedUse}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Number of Attendees
                  </p>
                  <p className="font-medium">{bookingDetails.attendees}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Special Requirements
                  </p>
                  <p className="font-medium">
                    {bookingDetails.specialRequirements || "None"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Contact Information
                  </p>
                  <p className="font-medium">{bookingDetails.contactInfo}</p>
                </div>
                {bookingDetails.soundEngineer && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Sound Engineer
                    </p>
                    <p className="font-medium text-green-600">✓ Included</p>
                    <p className="text-sm text-orange-600 font-medium">
                      Additional fee: $150
                    </p>
                  </div>
                )}
              </div>
            </div>

            {bookingDetails.soundEngineer && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-md">
                <h4 className="font-medium text-orange-800 mb-2">
                  Sound Engineer Service
                </h4>
                <p className="text-sm text-orange-700">
                  A professional sound engineer will be available for your event
                  to handle audio setup, microphone management, and technical
                  support throughout your booking.
                </p>
              </div>
            )}

            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm">
                A confirmation email has been sent to your email address. Please
                keep this information for your records.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
            <Button
              variant="outline"
              onClick={onDownloadDetails}
              className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Details
            </Button>
            <Button onClick={onAddToCalendar} className="w-full sm:w-auto">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to Calendar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
