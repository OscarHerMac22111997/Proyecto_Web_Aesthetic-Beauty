import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./app.css";
import {
    HashRouter as Router,
    Route,
    NavLink,
    BrowserRouter,
    Switch,
    Routes,
} from "react-router-dom";
import ReactDOM from "react-dom";
import AdminServices from "./AdminServices";
import EditServices from "./EditServices";
import CreateServices from "./CreateServices";

import {
    // main component
    Chart,
    // graphs
    Bars,
    Cloud,
    Dots,
    Labels,
    Lines,
    Pies,
    Ticks,
    Title,
    // wrappers
    Layer,
    Animate,
    Transform,
    Handlers,
    // helpers
    helpers,
    DropShadow,
    Gradient,
} from "rumble-charts";

class AdminGeneral extends React.Component {
    render() {
        const series = [
            {
                data: [1, 2, 3],
            },
            {
                data: [5, 7, 11],
            },
            {
                data: [13, 17, 19],
            },
        ];
        return (
            <Container>
                <div>
                    <Chart
                        width={600}
                        height={250}
                        series={series}
                        minY={0}
                        maxY={20}
                    >
                        <Bars innerPadding={5} groupPadding={10} />
                        <Lines />
                        <Dots />
                    </Chart>
                </div>
            </Container>
        );
    }
}

export default AdminGeneral;

if (document.getElementById("admingeneral")) {
    ReactDOM.render(<AdminGeneral />, document.getElementById("admingeneral"));
}
