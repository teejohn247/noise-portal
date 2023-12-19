/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import formSchema from "@/schema/formSchema";
import { ApiCreateApplicant } from "@/types/apiCreateApplicant";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import ReactRecorder from '@/components/Recorder/ReactRecorder';
import VideoRecorder from '@/components/Recorder/VideoRecorder';

import { render } from 'react-dom';


import { ReactMediaRecorder } from "react-media-recorder";
import ImageCapture from "../Recorder/ImageCapture";
type FormFields = z.infer<typeof formSchema>;

const apiEndpoint =
  "https://lasepa-applicant-a00a81c0036a.herokuapp.com/api/v1/createApplicant";

const organizations = [
  "Industrial",
  "Commercial",
  "Residential",
  "Religious",
  "Bake Houses & Eateries",
  "Hotel & Suites",
  "Bars, Clubs & Casinos",
  "Warehouses",
];

const lgas = [
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "Eti-Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Lagos Mainland",
  "Mushin",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
  "Surulere",
];

export default function FormSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [eventsFields, setEventsFields] = useState([
    {
      name: "Event 1",
    },
  ]);
  

  const { toast } = useToast();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormFields) {
    const formattedData: ApiCreateApplicant = {
      firstName: data.firstname,
      lastName: data.lastname,
      companyName: data.organizationName,
      companyAddress: data.personalAddress1,
      organisationType: data.organizationType,
      city: data.city,
      state: data.state,
      email: data.email,
      phoneNumber: data.phone,
      totalEvent: data.eventsNumber,
      event: data.events.map((rawEvent) => ({
        Date: rawEvent.eventDate,
        city: rawEvent.eventCity,
        state: rawEvent.eventState,
        LGA: rawEvent.eventLGA,
        eventAddress: rawEvent.eventAddress1,
        parkingSpace: rawEvent.adequateParking,
        Time: rawEvent.startEndTime,
        totalAttendees: rawEvent.numberOfAttendees,
      })),
    };

    try {
      setIsLoading(true);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("An error occured please try again");
      }

      // const data = await response.json();

      toast({
        description: "Application created successfully",
        className:
          "bg-[#27502B] text-white md:fixed md:top-4 md:right-8 md:w-auto",
      });
    } catch (error) {
      toast({
        description: "An error occured please try again",
        variant: "destructive",
        className: "md:fixed md:top-4 md:right-8 md:w-auto",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-6 py-8 text-center md:max-h-[100dvh] md:flex-1 md:space-y-4 md:overflow-y-scroll md:py-14">
      <h3 className="relative text-xl font-semibold before:absolute before:-bottom-[2.5px] before:left-1/2 before:h-[2px] before:w-1/12 before:-translate-x-1/2 before:bg-[#DC3837]">
        Permit Request Form
      </h3>

      <p className="mx-auto max-w-4xl px-4 text-center text-sm font-medium md:px-8 2xl:px-12">
        To ensure a smooth and efficient permit approval process, please fill
        out the required information accurately.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-4xl space-y-6 px-4 pt-3 text-left md:space-y-4 md:px-8 md:pt-5 2xl:px-12"
        >
          <p className="pl-1 font-medium">Personal Information :</p>

          <div className="flex gap-6 md:gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>First Name</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="First Name"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Last Name</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6 md:gap-4">
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Organization Name</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Organization Name"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Type of Organization</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-md px-4 py-3 text-left text-xs focus:ring-[#212121] md:px-5 md:py-4 md:text-sm">
                        <SelectValue placeholder="Select type of organization" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {organizations.map((organization) => (
                        <SelectItem key={organization} value={organization}>
                          {organization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6 md:gap-4">
            <FormField
              control={form.control}
              name="personalAddress1"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Address Line 1</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Address Line 1"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalAddress2"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Address Line 2</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Address Line 2"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6 md:gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>City / District</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="City / District"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>State / Province</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="State / Province"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6 md:gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Email</FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Phone</FormLabel>

                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      {...field}
                      className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="eventsNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel hidden>Total Events</FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    placeholder="How many events are you applying for?"
                    {...field}
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={(event) => {
                      field.onChange(Number(event.target.value));

                      setEventsFields(
                        Array.from(
                          {
                            length: Number(event.target.value),
                          },
                          (_, index) => ({
                            name: `event${index + 1}`,
                          }),
                        ),
                      );
                    }}
                    className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                  />
                </FormControl>

                <FormDescription className="pl-2 italic">
                  How many events are you applying for?
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          {eventsFields.map((eventFields, index) => (
            <div key={eventFields.name} className="space-y-6 md:space-y-4">
              <p className="pl-1 pt-2 font-medium">
                Event {index + 1} Information :
              </p>

              <div className="flex gap-6 md:gap-4">
                <FormField
                  control={form.control}
                  name={`events.${index}.eventAddress1`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel hidden>Address Line 1</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Address Line 1"
                          {...field}
                          className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`events.${index}.eventAddress2`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel hidden>Address Line 2</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Address Line 2"
                          {...field}
                          className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-6 md:gap-4">
                <FormField
                  control={form.control}
                  name={`events.${index}.eventCity`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel hidden>City / District</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="City / District"
                          {...field}
                          className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`events.${index}.eventState`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel hidden>State / Province</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="State / Province"
                          {...field}
                          className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-6 md:gap-4">
                <FormField
                  control={form.control}
                  name={`events.${index}.eventLGA`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel hidden>LGA</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-md px-4 py-3 text-xs focus:ring-[#212121] md:px-5 md:py-4 md:text-sm">
                            <SelectValue placeholder="Select LGA" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {lgas.map((lga) => (
                            <SelectItem key={lga} value={lga}>
                              {lga}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`events.${index}.startEndTime`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel hidden>Event Start and End Time</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Event Start and End Time"
                          {...field}
                          className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <FormField
                control={form.control}
                name={`events.${index}.eventDate`}
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="rounded-md px-4 py-3 text-xs focus-visible:ring-[#212121] md:px-5 md:py-4 md:text-sm">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date for the event</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <div className="flex gap-6 md:gap-4">
              <ReactRecorder />
          </div>

              <div className="flex gap-6 md:gap-4">
                <VideoRecorder />
              </div>

              <div className="flex gap-6 md:gap-4">
                <ImageCapture />
              </div>
       
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-2 w-full rounded-lg border bg-[#212121] py-4 text-xs font-semibold md:mt-3 md:py-5 md:text-base"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {isLoading ? "Please wait ..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
