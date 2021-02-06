import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SideBar from "../components/Sidebar";
import Form from "../components/form"
class Contact extends React.Component {
    render() {
        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <Layout location={this.props.location}>
                    <SEO title="Contact me" />
                    <h1> Contact me</h1>
                    < Form />
                </Layout>
            </div>
        )
    }
}

export default Contact

