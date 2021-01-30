import React from 'react'
import SideBar from '../components/Sidebar'
import Layout from "../components/layout"
import SEO from "../components/seo"

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

