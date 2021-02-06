import React from 'react'
import SideBar from '../components/Sidebar'
import Layout from "../components/layout"
class Project extends React.Component {
    render() {
        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <Layout location={this.props.location}>

                    <h1>Thank you!</h1>
                    <p> I will get back to you as soon as possible.</p>
                </Layout>
            </div>
        )
    }
}

export default Project

