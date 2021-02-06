
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import '../css/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub
} from "@fortawesome/free-brands-svg-icons";


// async function getLanguageStats(repoLanguagesUrl) {
//     let responses = await Promise.all(repoLanguagesUrl.map(url => axios.get(url)));
//     let masterObj = {
//         CSS: 0,
//         Go: 0,
//         HTML: 0,
//         JavaScript: 0,
//         Makefile: 0,
//         Ruby: 0,
//         SCSS: 0,
//         Shell: 0
//     };

//     responses.forEach(obj => {
//         const keys = Object.keys(obj.data);
//         keys.forEach(key => {
//             const val = obj.data[key];
//             masterObj[key] = (obj.data.hasOwnProperty(key)) ? masterObj[key] + val : val;
//         })
//     })
// }
class Projects extends React.Component {

    state = {
        projects: []
    };

    componentDidMount() {
        let repoLanguagesUrl = [];
        fetch('https://api.github.com/users/cameronldroberts/repos\?sort\=updated\&direction\=desc', {
        })
            .then(res => res.json())
            .then((data) => {
                data.sort();

                let projectInfo = [];
                data.forEach(res => {
                    const obj = {
                        name: res["name"],
                        url: res["html_url"],
                        stars: res["stargazers_count"],
                        description: res["description"],
                        date: res["updated_at"]
                    }
                    repoLanguagesUrl.push(res["languages_url"])
                    projectInfo.push(obj);
                })
                projectInfo = projectInfo.slice(0, 9)
                // getLanguageStats(repoLanguagesUrl)
                this.setState({ projects: projectInfo })
            })
            .catch(console.log)

    }
    render() {
        return (
            <div>
                <Grid container className="empty" spacing={0}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1}>
                            {this.state.projects.map((value) => (
                                <Grid key={value} item>
                                    <Card className="project-card">
                                        <CardContent >
                                            <FontAwesomeIcon icon={faGithub} size="2x" />
                                            <Typography color="textSecondary" >
                                                <a href={value.url}>{value.name}</a>
                                            </Typography>
                                            <Typography className="projectDescription" color="textSecondary">
                                                {value.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid >
            </div>
        )
    }

}

export default Projects;
