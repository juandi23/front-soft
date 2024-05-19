import { Payment } from "@models/payments/payment.model";

export interface Order {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  addressOptional: string;
  city: string;
  country: string;
  postalCode: string;
  optional: string;
  payment: Payment;

  createdAt: string;
  deletedAt ?: string;
}

