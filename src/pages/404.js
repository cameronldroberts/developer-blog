import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SideBar from "../components/Sidebar"
class NotFoundPage extends React.Component {
  render() {
    return (
      <div id="App">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <Layout location={this.props.location} >
          <SEO title="404: Not Found" />
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
      </div>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
