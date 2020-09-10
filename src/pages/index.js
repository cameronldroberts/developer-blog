import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import mainLogo from "./emoj.jpg"
import SocialFollow from "../components/SocialFollow"

class IndexPage extends React.Component {
  render() {
    const siteTitle = ""

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

        <h1>
          Hey people, welcome!{" "}
          <img className="emoji-picture" style={{ width: 100, height: 100, marginBottom: 0 }} src={mainLogo} alt="cam-emoj" />
        </h1>
        <p>
          My name is Cameron and I'm from the UK. I work as a Software Developer and enjoy all things Cloud and IoT. I'm starting a developer blog to document my journey as a developer.
        </p>
        <Link to="/blog/">
          <Button marginTop="35px" marginBottom="5px">Go to Blog</Button>
        </Link>
        <SocialFollow />

        {/* <SocialIcon url="https://twitter.com/cameron_1010" />
        <SocialIcon url="https://github.com/cameronldroberts" /> */}
      </Layout>
    )
  }
}

export default IndexPage
