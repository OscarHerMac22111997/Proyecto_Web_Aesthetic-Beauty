import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-bootstrap/Carousel";
import "./app.css";
import Nav from 'react-bootstrap/Nav';
import AnimatedText from 'react-animated-text-content';
function Nothing(){
    return(
        <div style ={{fontSize: 25, fontStyle: 'bold', textAlign: 'center'}}>
            Nothing to show. Do you want to give yourself a <Nav.Link href="#/ClientPanel/clientDates/add">New Look?</Nav.Link>
        </div>
    );

}
function Date(params){
    const yeison = JSON.parse(JSON.stringify(params));
    console.log(yeison['params']['day']);
    console.log(yeison['day']);
    return(
        <div style ={{fontSize: 20, fontStyle: 'bold', textAlign: 'center'}}>
            Remember that you have a date for 
            <p style={{fontWeight: 'bold'}}>{yeison['params']['day']}</p> at 
            <p style={{fontWeight: 'bold'}}>{yeison['params']['time']}</p> in
            <p style={{fontWeight: 'bold'}}>{yeison['params']['place']}.</p>
        </div>
    );

}


function ClientDashboard() {

    const [CurrentId, setCurrentId] = useState();
    const [name, setName] = useState();
    const [id, setId] =useState();
    const [day, setDay] = useState('');
    const[place, setPlace] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] =useState(false);
    useEffect(()=>{
        getCurrentUser()
    },[])
    const getCurrentUser = async () => {
        const loc = localStorage.getItem('email');
        await axios.get('/api/getCurrentUser/' + loc).then(({data})=>{
            const {id, name}  = data.user[0];
            setName(name);
            setId(id);
            axios.get('/api/getNextUserDate/' + id).then(({data})=>{
                const {hour, date, name}  = data;
                setTime(hour);
                setDay(date); 
                setPlace(name);
                if(hour == null){
                    setMessage(true);
                }
            })

        })
    }

    return (
        <div className="bg" style ={{backgroundImage: 'https://estudioniddo.com/wp-content/uploads/2019/01/img_destacada_17-1200x800.jpg'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8" >
                        <div
                            style={{
                                fontFamily: "Aesthetic",
                                fontSize: 50,
                                color: "white",
                                textAlign: "center",
                                backgroundColor: 'rgba(0,0,0,0.8)'
                            }}
                        >
                            Welcome, {name}
                        </div>
                        <div className="card" style={{ top: 20, alignContent: 'center' }}>
                            <div><AnimatedText
                            style={{backgroundColor: '#FFFFFF00', textAlign: 'center'}}
                            type="words" // animate words or chars
                            animation={{
                                x: '200px',
                                y: '-20px',
                                scale: 1.1,
                                ease: 'ease-in-out',
                            }}
                            animationType="float"
                            interval={0.06}
                            duration={0.8}
                            tag="p"
                            className="animated-paragraph"
                            includeWhiteSpaces
                            threshold={0.1}
                            rootMargin="20%"
                            >
                            Remember that you always look nice! 😶😍
                            </AnimatedText>
                                
                            </div>
                        </div>
                        <div style={{borderColor: 'white', backgroundColor: 'rgba(128,54,12,0.8)', color: 'white',textAlign: "center", fontSize: 20, alignContent: 'center',marginTop: 70, borderRadius: 15}}>
                                Next dates :3

                            </div>
                            <div style={{borderColor: 'black', borderWidth: 3,backgroundColor: 'white', color: 'black',textAlign: "center", fontSize: 17, padding: 15,alignContent: 'center',marginTop: 3, borderRadius: 15}}>
                                
                                {message ? <Nothing/> : <Date params={{day,time,place}}/>}

                            </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ClientDashboard;

if (document.getElementById("clientdashboard")) {
    ReactDOM.render(<ClientDashboard />, document.getElementById("clientdashboard"));
}
