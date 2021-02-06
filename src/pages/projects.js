import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Button from "../components/button"
import SideBar from "../components/Sidebar";
import GitProject from "../components/gitProjects"
class Project extends React.Component {
    render() {

        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <Layout location={this.props.location}>
                    <SEO title="Projects" />
                    <h1> The project wall </h1>
                    <GitProject />
                </Layout>
            </div>
        )
    }
}

export default Project

