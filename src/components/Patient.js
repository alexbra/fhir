import React from "react";
import Client from 'fhir-kit-client'
import simpleOauthModule from '../libs/oauth2'
import queryString from 'query-string'
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
    const iss = 'https://apporchard.epic.com/interconnect-aocurprd-oauth/api/FHIR/DSTU2'
    const CLIENT_ID = 'a19cfe80-43f6-42b0-954e-784f771bdb72';

    const fhirClient = new Client({ baseUrl: iss });
    const { authorizeUrl, tokenUrl } = await fhirClient.smartAuthMetadata();
    console.log(window.location.search)
    // Create a new OAuth2 object using the Client capability statement:
    const oauth2 = simpleOauthModule.create({
      client: {
        id: CLIENT_ID,
      },
      auth: {
        tokenHost: `${tokenUrl.protocol}//${tokenUrl.host}`,
        tokenPath: tokenUrl.pathname,
        authorizeHost: `${authorizeUrl.protocol}//${authorizeUrl.host}`,
        authorizePath: authorizeUrl.pathname,
      },
      options: {
        authorizationMethod: 'body',
      },
    });
    const query = queryString.parse(window.location.search)

    const { code } = query;
    const options = {
      code,
      redirect_uri: 'https://master.dcaniku3iszo3.amplifyapp.com/app',
    };

    try {
      // const result = await oauth2.authorizationCode.getToken(options);
      // console.log('result', result)
      const result = {
        access_token: "UJO-ycW0Iunal01hoMSn6o6MNIZehJiBfXJoTwxI9tdWFk_HADzaHe-YhNcR9JTE7wvuajFmtr0ejXg5QNb3pzssDRwVm_wBT44tkIaQypWrPFhd_iATHgN9WD9s4jds",
        encounter: "TCbcjwKK3IOU9mCTss9wi8m-E-EpVfXQ6bTTzrh5HbIIB",
        expires_in: 3600,
        id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik9pZUlRYW04MGRhSStSbWMrZ3VqS2FaRnJ2dUx0c05OVDl2MHZ1ZjRGOTQ9IiwidHlwIjoiSldUIn0.eyJhdWQiOiJhMTljZmU4MC00M2Y2LTQyYjAtOTU0ZS03ODRmNzcxYmRiNzIiLCJleHAiOjE1NzMxOTU0OTAsImlhdCI6MTU3MzE5NTE5MCwiaXNzIjoiaHR0cHM6Ly9hcHBvcmNoYXJkLmVwaWMuY29tL2ludGVyY29ubmVjdC1hb2N1cnByZC1vYXV0aC9vYXV0aDIvdG9rZW4iLCJzdWIiOiJlQ0s0dXRwUE43MVlMUy1oSFR0WTdFUTMifQ.CVueIvSAx7Nyd8dZir2CUEgEoaBAm7kExwRm-K9MSnRVoDJodrulowKXw0TU8UFBLGte4x8gJ1tD7_rH2Y97JARN7OCBGFrfhpBz1xGdgjagBu9DrrksYh0kFlwn2Gx9YNj5-MidCkW1Oe3U51JyyJPNBZu4pyznyM9fkVf4GT5sSyHTNH94YHMl4LHdctPOEHTSOGOYucZApcOT-bP_qGL7IEaswQXfv2x8AvhRRP0F84ulOop-xuovR2qJ27WKb2_97jClIOljpBttrTR-UB4J9X9mLuzevXj6ZJPlDIXH_02A0AjmF65XhJ415X-GWdRu4DTlb9VpEnC_5_fqyg",
        location: "TJAAnzPV3aoaXFJTg6bautgB",
        need_patient_banner: "false",
        patient: "TVMN5ZaLn5SPfIwGoAGoGUBrG8w0AWoxyNbE7F-EPJ2MB",
        scope: "launch openid PATIENT.READ Patient.search Patient.Read (STU3) Patient.Read (R4)",
        smart_style_url: "https://apporchard.epic.com/interconnect-aocurprd-oauth/api/epic/2016/EDI/HTTP/style/102202/I0YwRjJGNHwjQzEyMTI3fCMxQUFCRkZ8I0QzRDhERXwjODZCNTQwfCMwMDAwMDB8MHB4fDEwcHh8fEFyaWFsLCBzYW5zLXNlcmlmfCdTZWdvZSBVSScsIEFyaWFsLCBzYW5zLXNlcmlmfHw%3D.json",
        state: "12345",
        token_type: "bearer",
        "__epic.dstu2.patient": "TVMN5ZaLn5SPfIwGoAGoGUBrG8w0AWoxyNbE7F-EPJ2MB"
      }
      const { token } = oauth2.accessToken.create(result);

      console.log('The token is : ', token);

      fhirClient.bearerToken = token.access_token;
      console.log(fhirClient)
      const patient = await fhirClient.read({ resourceType: 'Patient', id: token.patient });

      console.log('patient', patient)
    } catch (error) {
      console.error('Access Token Error', error.message);
    }
  }
  render() {
    const { error, loading, patient } = this.state
    return "Patient"
  }
}
