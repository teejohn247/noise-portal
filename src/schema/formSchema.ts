import { z } from "zod";

const eventSchema = z.object({
  eventAddress1: z.string().min(1, "Address should not be empty"),
  eventAddress2: z.string().optional(),
  eventCity: z.string().min(1, "City should not be empty"),
  eventState: z.string().min(1, "State should not be empty"),
  eventLGA: z.enum([
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
  ]),
  startEndTime: z.string(),
  adequateParking: z.enum(["Yes", "No"]),
  numberOfAttendees: z
    .number()
    .min(1, { message: "Numbers of attendees cannot not be less than 1" }),
  eventDate: z.date(),
});

export default z.object({
  firstname: z.string().min(1, "First name should not be empty"),
  lastname: z.string().min(1, "Last name should not be empty"),
  organizationName: z.string().optional(),
  organizationType: z.enum([
    "Industrial",
    "Commercial",
    "Residential",
    "Religious",
    "Bake Houses & Eateries",
    "Hotel & Suites",
    "Bars, Clubs & Casinos",
    "Warehouses",
  ]),
  personalAddress1: z.string().min(1, "Address should not be empty"),
  personalAddress2: z.string().optional(),
  city: z.string().min(1, "City should not be empty"),
  state: z.string().min(1, "State should not be empty"),
  email: z.string().email("Invalid email format"),
  phone: z.string(),
  eventsNumber: z
    .number()
    .min(1, { message: "Event number should not be lower than 1" })
    .max(10, { message: "Event number should not be higher than 10" })
    .default(1),
  events: z.array(eventSchema),
});
