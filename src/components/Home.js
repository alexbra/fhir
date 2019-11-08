import React from "react";
import Patient from "./Patient";

/**
 * Wraps everything into `FhirClientProvider` so that any component
 * can have access to the fhir client through the context.
 */
export default function Page() {
    return (
        <Patient />
    )
}
