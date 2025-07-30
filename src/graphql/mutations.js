/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const bookAppointment = /* GraphQL */ `
  mutation BookAppointment($input: CreateAppointmentInput!) {
    bookAppointment(input: $input) {
      id
      customerName
      email
      phone
      style
      date
      time
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
      id
      customerName
      email
      phone
      style
      date
      time
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
      id
      customerName
      email
      phone
      style
      date
      time
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
      id
      customerName
      email
      phone
      style
      date
      time
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
