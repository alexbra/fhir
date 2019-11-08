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
    console.log(window)
    console.log(this.props)
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
    const query = queryString.parse(this.props.location.search)

    const { code } = query;
    const options = {
      code,
      redirect_uri: 'https://master.dcaniku3iszo3.amplifyapp.com/app',
    };

    try {
      const result = await oauth2.authorizationCode.getToken(options);

      const { token } = oauth2.accessToken.create(result);

      console.log('The token is : ', token);

      fhirClient.bearerToken = token.access_token;

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
