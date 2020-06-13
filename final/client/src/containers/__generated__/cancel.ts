/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: cancel
// ====================================================

export interface cancel_cancelTrip_launches {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
}

export interface cancel_cancelTrip {
  __typename: "TripUpdateResponse";
  success: boolean;
  message: string | null;
  launches: (cancel_cancelTrip_launches | null)[] | null;
}

export interface cancel {
  cancelTrip: cancel_cancelTrip;
}

export interface cancelVariables {
  launchId: string;
}
