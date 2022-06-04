import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./app.css";
import AnimatedText from 'react-animated-text-content';

function Nothing(){
    return(
        <div style ={{fontSize: 25, fontFamily: 'roboto' , fontStyle: 'bold', textAlign: 'center'}}>
            Enjoy your free time! 🥰
        </div>
    );
}

function Date(params){

    const yeison = JSON.parse(JSON.stringify(params));
    return(
        <div style ={{fontSize: 20, fontStyle: 'bold', textAlign: 'center'}}>
            Your next date is:
            <p style={{fontWeight: 'bold'}}>{yeison['params']['day']}</p> at 
            <p style={{fontWeight: 'bold'}}>{yeison['params']['time']}</p>Client: 
            <p style={{fontWeight: 'bold'}}>{yeison['params']['clientname']}.</p>
        </div>
    );

}


function StylistDashboard() {

    const [CurrentId, setCurrentId] = useState();
    const [name, setName] = useState();
    const [url, setUrl] = useState();
    const [clientname, setClientname] = useState('');
    const [id, setId] =useState();
    const [dateId, setDateid] =useState();
    const [day, setDay] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] =useState(false);
    useEffect(()=>{
        getCurrentUser()
    },[url])
    const getCurrentUser = async () => {
        const loc = localStorage.getItem('email');
        await axios.get('/api/getCurrentUser/' + loc).then(({data})=>{
            const {id, name, url}  = data.user[0];
            setName(name);
            setId(id);
            setUrl(url);
            axios.get('/api/getNextClient/'+id).then(({data})=>{
                const {hour, date, names} = data;
                setTime(hour);
                setDay(date); 
                setClientname(names);

                if(hour == null){
                    setMessage(true);
                    console.log('no message')
                }
            })

        })
    }

    return (
        <div className="bg" style ={{backgroundImage: 'https://yberausa.com/wp-content/uploads/2020/05/beuhair-interior-3-min-cropped-scaled.jpg'}}>
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
                            <div style={{display: 'flex'}}>
                                Welcome, {name}
                                <img width="150px" height="200px" style={{paddingRight: 20,borderRadius: 80}} src={`./storage/stylist/image/${url}`} />
                            </div>
                            
                        </div>
                        <div className="card" style={{ top: 20, alignContent: 'center' }}>
                            <div>
                                <AnimatedText
                                    style={{backgroundColor: '#FFFFFF00', fontSize: 18, textAlign: 'center', fontFamily: 'Aesthetic'}}
                                    type="words"
                                    animation={{
                                        x: '200px',
                                        y: '-20px',
                                        scale: 1.1,
                                        ease: 'ease-in-out',
                                    }}
                                    animationType="float"
                                    interval={0.06}
                                    duration={1.0}
                                    tag="p"
                                    className="animated-paragraph"
                                    includeWhiteSpaces
                                    threshold={0.1}
                                    rootMargin="20%"
                                    >
                                    🎨 Remember that you are an artist ❁´◡`❁
                                </AnimatedText>
                            </div>
                        </div>
                        <div style={{borderColor: 'white', backgroundColor: 'rgba(128,54,12,0.8)', color: 'white',textAlign: "center", fontSize: 20, alignContent: 'center',marginTop: 70, borderRadius: 15}}>
                                Next dates :3
                        </div>
                        <div style={{borderColor: 'black', borderWidth: 3,backgroundColor: 'white', color: 'black',textAlign: "center", fontSize: 17, padding: 15,alignContent: 'center',marginTop: 3, borderRadius: 15}}>
                            {message ? <Nothing/> : <Date params={{day,time,clientname}}/>}
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    );
}

export default StylistDashboard;

if (document.getElementById("stylistdashboard")) {
    ReactDOM.render(<StylistDashboard />, document.getElementById("stylistdashboard"));
}
