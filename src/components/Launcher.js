import React from 'react'
import Client from 'fhir-kit-client'
import simpleOauthModule from '../libs/oauth2'
import queryString from 'query-string'

/**
 * Typically the launch page is an empty page with a `SMART.authorize`
 * call in it.
 *
 * This example demonstrates that the call to authorize can be postponed
 * and called manually. In this case we use ReactRouter which will match
 * the `/launch` path and render our component. Then, after our page is
 * rendered we start the auth flow.
 */
export default class Launcher extends React.Component {
  /**
   * This is configured to make a Standalone Launch, just in case it
   * is loaded directly. An EHR can still launch it by passing `iss`
   * and `launch` url parameters
   */
  async componentDidMount() {
    const CLIENT_ID = 'a19cfe80-43f6-42b0-954e-784f771bdb72';
    const iss = 'https://apporchard.epic.com/interconnect-aocurprd-oauth/api/FHIR/DSTU2'
    const fhirClient = new Client({ baseUrl: iss })
    const { authorizeUrl, tokenUrl } = await fhirClient.smartAuthMetadata()
    console.log(this.props.location.search)
    const query = queryString.parse(this.props.location.search)
    console.log(query)
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

    // Authorization uri definition
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: 'https://master.dcaniku3iszo3.amplifyapp.com/app',
      launch: '',
      aud: iss,
      scope: 'launch openid profile user/Patient.read patient/*.*',
      state: '12345',
    });
    console.log(authorizationUri)
    window.location.href = authorizationUri
  }
  /**
   * Could also return `null` for empty page
   */
  render() {
    return "Launching...";
  }
}
