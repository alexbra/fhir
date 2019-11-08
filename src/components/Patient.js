import React from "react";
import FHIR from "fhirclient";

function PatientName({ name = [] }) {
  let entry =
    name.find(nameRecord => nameRecord.use === "official") || name[0];
  if (!entry) {
    return <h1>No Name</h1>;
  }
  return <h1>{entry.given.join(" ") + " " + entry.family}</h1>;
}

function PatientBanner(patient) {
  return (
    <div>
      <PatientName name={patient.name} />
      <span>
        Gender: <b>{patient.gender}</b>,{" "}
      </span>
      <span>
        DOB: <b>{patient.birthDate}</b>
      </span>
    </div>
  )
}

export default class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      patient: null,
      error: null
    };
  }
  async componentDidMount() {
    const client = await FHIR.oauth2.ready()
    const patients = await client.request("Patient")
    const release = await client.getFhirRelease()
    console.log(patients)
    const patient = await client.patient.read()
    this.setState({ patient, loading: false, error: null });
    // client => {
    //   client.patient.read()
    //     .then(patient => {
    //       this.setState({ patient, loading: false, error: null });
    //     })
    //     .catch(error => {
    //       this.setState({ error, loading: false });
    //     })
    // })
  }
  render() {
    const { error, loading, patient } = this.state
    return <PatientBanner {...patient} />
  }
}
