import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";

interface BookingQuestionnaireProps {
  onSubmit?: (formData: BookingFormData) => void;
  onBack?: () => void;
  selectedDate?: Date;
  selectedTimeSlot?: string;
  selectedDuration?: number;
  initialValues?: Partial<BookingFormData>;
}

export interface BookingFormData {
  intendedUse: string;
  attendees: number;
  specialRequirements: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  soundEngineer: boolean;
}

const BookingQuestionnaire: React.FC<BookingQuestionnaireProps> = ({
  onSubmit,
  onBack,
  selectedDate,
  selectedTimeSlot,
  selectedDuration,
  initialValues = {} as Partial<BookingFormData>,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get state from previous route if not provided via props
  const routeState = location.state || {};
  const [formData, setFormData] = useState<BookingFormData>({
    intendedUse: initialValues?.intendedUse || "",
    attendees: initialValues?.attendees || 1,
    specialRequirements: initialValues?.specialRequirements || "",
    contactName: initialValues?.contactName || "",
    contactEmail: initialValues?.contactEmail || "",
    contactPhone: initialValues?.contactPhone || "",
    soundEngineer: initialValues?.soundEngineer || false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});

  const handleChange = (
    field: keyof BookingFormData,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.intendedUse.trim()) {
      newErrors.intendedUse = "Please describe how you will use the space";
    }

    if (!formData.attendees || formData.attendees < 1) {
      newErrors.attendees = "Please enter a valid number of attendees";
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) onSubmit(formData);
      // Use props if available, else fallback to route state
      navigate("/confirmation", {
        state: {
          ...formData,
          selectedDate: selectedDate || routeState.selectedDate,
          selectedTimeSlot: selectedTimeSlot || routeState.selectedTimeSlot,
          selectedDuration: selectedDuration || routeState.selectedDuration,
        },
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Booking Questionnaire
        </CardTitle>
        <CardDescription>
          Please provide details about how you'll use the space
          {selectedDate && selectedTimeSlot && (
            <span className="block mt-2 font-medium">
              Selected: {selectedDate.toLocaleDateString()} at{" "}
              {selectedTimeSlot}
              {selectedDuration &&
                ` for ${selectedDuration} hour${selectedDuration > 1 ? "s" : ""}`}
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="intendedUse">
              How will you use the space?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="intendedUse"
              placeholder="e.g., Team meeting, workshop, presentation, etc."
              value={formData.intendedUse}
              onChange={(e) => handleChange("intendedUse", e.target.value)}
              className={errors.intendedUse ? "border-red-500" : ""}
            />
            {errors.intendedUse && (
              <p className="text-sm text-red-500">{errors.intendedUse}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">
              Number of attendees <span className="text-red-500">*</span>
            </Label>
            <Input
              id="attendees"
              type="number"
              min="1"
              value={formData.attendees}
              onChange={(e) =>
                handleChange("attendees", parseInt(e.target.value) || 0)
              }
              className={`w-full ${errors.attendees ? "border-red-500" : ""}`}
            />
            {errors.attendees && (
              <p className="text-sm text-red-500">{errors.attendees}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special requirements</Label>
            <Textarea
              id="specialRequirements"
              placeholder="e.g., Projector, whiteboard, catering, etc."
              value={formData.specialRequirements}
              onChange={(e) =>
                handleChange("specialRequirements", e.target.value)
              }
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="soundEngineer"
                checked={formData.soundEngineer}
                onCheckedChange={(checked) =>
                  handleChange("soundEngineer", checked as boolean)
                }
              />
              <div className="space-y-1">
                <Label
                  htmlFor="soundEngineer"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sound Engineer Required
                </Label>
                <p className="text-sm text-muted-foreground">
                  Professional sound engineer for audio setup and support.
                  <span className="block font-medium text-orange-600 mt-1">
                    Additional fee: $150 will be added to your booking.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  className={errors.contactName ? "border-red-500" : ""}
                />
                {errors.contactName && (
                  <p className="text-sm text-red-500">{errors.contactName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  className={errors.contactEmail ? "border-red-500" : ""}
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button className="border" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default BookingQuestionnaire;
