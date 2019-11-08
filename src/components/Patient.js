import React from "react";

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
  }
  render() {
    const { error, loading, patient } = this.state
    return "Patient"
  }
}
