export type ApiCreateApplicant = {
  firstName: string;
  lastName: string;
  companyName?: string;
  organisationType: string;
  companyAddress: string;
  city: string;
  state: string;
  email: string;
  phoneNumber: string;
  totalEvent: number;
  event: Event[];
};

export type Event = {
  Date: Date;
  eventAddress: string;
  city: string;
  state: string;
  LGA: string;
  Time: string;
  parkingSpace: string;
  totalAttendees: number;
};
