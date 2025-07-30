/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AppointmentCreateFormInputValues = {
    customerName?: string;
    email?: string;
    phone?: string;
    style?: string;
    date?: string;
    time?: string;
    notes?: string;
};
export declare type AppointmentCreateFormValidationValues = {
    customerName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    style?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AppointmentCreateFormOverridesProps = {
    AppointmentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customerName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    style?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AppointmentCreateFormProps = React.PropsWithChildren<{
    overrides?: AppointmentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AppointmentCreateFormInputValues) => AppointmentCreateFormInputValues;
    onSuccess?: (fields: AppointmentCreateFormInputValues) => void;
    onError?: (fields: AppointmentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AppointmentCreateFormInputValues) => AppointmentCreateFormInputValues;
    onValidate?: AppointmentCreateFormValidationValues;
} & React.CSSProperties>;
export default function AppointmentCreateForm(props: AppointmentCreateFormProps): React.ReactElement;
