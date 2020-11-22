import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Button from "../components/button"
import SideBar from "../components/Sidebar";
class Project extends React.Component {
    render() {
        const { data } = this.props
        // const siteTitle = data.site.siteMetadata.title
        // const posts = data.allMdx.edges

        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <Layout location={this.props.location}>
                    <SEO title="Projects" />
                    <h1> Projects</h1>
                    <p> Page coming soon...</p>
                    {/* <Link to="/">
                        <Button marginTop="85px">Go Home</Button>
                    </Link> */}
                </Layout>
            </div>
        )
    }
}

export default Project

