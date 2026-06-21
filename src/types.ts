export interface ClientCard {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  mandateType: MandateType;
  assignedTo: string;
  dateAdded: string;
  status: StatusTag;
  notes: string;
  phaseId: string;
}

export type MandateType =
  | 'Einkommensteuer'
  | 'GmbH'
  | 'Freelancer'
  | 'UG'
  | 'Verein'
  | 'Erbschaftsteuer'
  | 'Lohnbuchhaltung'
  | 'Jahresabschluss';

export type StatusTag = 'urgent' | 'normal' | 'waiting' | 'vip';

export interface Phase {
  id: string;
  title: string;
  description: string;
}

export interface BoardState {
  phases: Phase[];
  cards: ClientCard[];
}

