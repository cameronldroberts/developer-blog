import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from "../components/layout"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Contact() {
    const classes = useStyles();
    const [state, setState] = React.useState({})

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch((error) => alert(error))
    }

    return (

        <div>
            <form
                name="contact"
                method="post"
                action="/thanks/"
                netlify
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
            >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                    <label>
                        Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                    </label>
                </p>
                {/* <p> */}

                <TextField id="standard-basic" label="name" type="text" name="name" onChange={handleChange} />
                {/* <input type="text" name="name" onChange={handleChange} /> */}
                {/* </p> */}
                {/* <p> */}

                <TextField id="standard-basic" label="email" type="email" name="email" onChange={handleChange} />
                {/* <input type="email" name="email" onChange={handleChange} /> */}
                {/* </p> */}

                <p>
                    {/* <textarea name="message" onChange={handleChange} /> */}
                    <TextField
                        id="standard-multiline-flexible"
                        label="message"
                        multiline
                        rowsMax={4}
                        onChange={handleChange}
                    />
                </p>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                // endIcon={<Icon>send</Icon>}
                >
                    Send
          </Button>
            </form>

        </div>
    )
}