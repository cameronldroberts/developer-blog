import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SideBar from "../components/Sidebar";
class Contact extends React.Component {
    render() {
        const { data } = this.props

        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <Layout location={this.props.location}>
                    <SEO title="Contact me" />
                    <h1> Contact me</h1>
                    <p> Page coming soon...</p>
                </Layout>
            </div>
        )
    }
}

export default Contact

