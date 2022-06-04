import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-bootstrap/Carousel";
import "./app.css";
import Nav from 'react-bootstrap/Nav';
import AnimatedText from 'react-animated-text-content';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2';

function CreateDate() {
    const navigate = useNavigate();

    const horas = ['09:00', '09:30','10:00','10:30','11:00',
    '11:30','12:00','12:30', '13:00', '13:30', 
    '14:00', '14:30','13:00', '13:30',
    '16:00', '16:30'];
    const [startDate, setStartDate] = useState(new Date());

    const [CurrentId, setCurrentId] = useState();

    const [id, setId] =useState();
    const [day, setDay] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] =useState(false);
    const [tempDate, setTempDate] = useState('');
    const [notAvailable, setNotAvailable] = useState([]);
    const [cocolor, setCocolor] = useState('');
    const [mensageee, setMensageee] = useState('');
    const [id_shop, setId_shop] = useState();
    const [id_service, setId_service] = useState();
    const [shops, getShops] = useState([]);
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('')
    const [services, setServices] =useState([]);
    const [temporalSer, setTemporalSer] = useState([]);
    const [excluded, setExcluded] = useState([]);
    const [styles, setStyles] = useState([]);
    const [color, setColors] = useState([]);
    const [tempSty, setTemporalSty] =useState([]);
    const [tempCol, setTemporalCol] =useState([]);
    const [reloadShop, setReloadShop] =useState(false);
    const [reloadService, setReloadService] =useState(false);   

    const [id_style, setId_style] = useState('');
    const [id_color, setId_color] = useState('');

    const [isdisa, setIsdisa] = useState(true);
    const [filtrogen, setFiltrogen] = useState('0'); 
    const [filtroTexto, setFiltroTexto] = useState(''); 

    const [nameStyle, setNameStyle] = useState('');
    const [urlStyle, setUrlStyle] = useState('');
    const [descriptionStyle, setDescriptionstyle] = useState('');
    const [costStyle, setCostStyle] = useState();
    const [ok,setOk] = useState(false);
    const [urlColor, setUrlColor] = useState('');
    var id_style2;
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        getCurrentUser(),
        fetchShops(),
        fetchTemporalServices(),
        fetchAvailableServices(),
        fetchAvailable()

    },[])
    const fetchTemporalServices = async () =>{
        await axios.get(`http://localhost:8000/api/services`).then(({data})=>{
            setTemporalSer(data); 
          });   
          await axios.get(`http://localhost:8000/api/styles`).then(({data})=>{
            setTemporalSty(data); 
            setStyles(data);
          });  
          await axios.get(`http://localhost:8000/api/colors`).then(({data})=>{
            setTemporalCol(data);
            setColors(data);
          });  

    }

    const load = async () =>{

    }
    
    const Option = async (ids) => {
        setIsdisa(false);
        services.map(e=>{
            if(e.id == ids){
                setUrl(e.url);
                setDescription(e.description);
            }
        });
    }

    const showColor = async (ids) => {
        color.map(e=>{
            if(e.id == ids){
                setUrlColor(e.url);
            }
        });
    }

    const refreshColorSearch = (ddd) =>{
        setColors([]);
        console.log("Estilo: " + id_style);
        if(!loaded || ddd.length == 0 || ddd == null){
            console.log("falsete");
            tempCol.map(e=>{
                console.log("No" + e.id_style + " = "  + id_style);
                if(e.id_style == id_style)
                    setColors(old=>[...old, e])
            })
            setLoaded(true)
        }else{
            color.map((e, index)=>{
                const word = e.name.toLowerCase();
                console.log("Si" + ddd + " = "  + id_style);

                word.includes(ddd.toLowerCase()) ? setColors(old =>[...old, e]) : console.log("XDXD");
        });
        }
    }

    const refreshpersex = () =>{
        setStyles([]);
        tempSty.map(r=>{
            if(id_service==r.id_service){
                if(filtrogen == '0')
                    setStyles(temp => [...temp, r])
                if(filtrogen == '1' && r.genre == '1')
                    setStyles(temp => [...temp, r])
                if(filtrogen == '2' && r.genre == '2')
                    setStyles(temp => [...temp, r])
                if(filtrogen == '3' && r.genre == '3')
                    setStyles(temp => [...temp, r])
            }
        });
    }
    const refreshSexData = (ids) =>{
        tempSty.map(e=>{
            if(e.id == ids){
                setNameStyle(e.name);
                setUrlStyle(e.url);
                setDescriptionstyle(e.description);
                setCostStyle(e.cost);
            }
        });
    }
    const fetchAvailableServices = async () => {
        const packets = {
            id: id,
            id_shop: id_shop
        };
        await axios.get(`http://localhost:8000/api/getAvailableServices/`+id).then(({data})=>{
            setServices([]);
            if(data.length == 0){
                setServices(temporalSer);
            }
            temporalSer.map((e)=>{
                data.map((h)=>{
                    if(e.id != h.id_service){
                        setServices(old => [...old, e]);
                    }
                })
            });
        });   
    }
    const cleanStyles = () =>{
        setCostStyle();
        setNameStyle('');
        setUrlStyle('');
    }
    const fetchShops = async () => {
        await axios.get(`http://localhost:8000/api/shops`).then(({data})=>{
          getShops(data);
          const ids = data[0].id;
          if(!reloadShop){
              setId_shop(ids);
              setReloadShop(true);
          }
        });   
    }

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        const closed = new Date();
        return (currentDate.getTime() < selectedDate.getTime());
    };
    const fetchAvailable= async () =>{
        const paquete={
            id_shop: id_shop,
            date: moment(startDate).format('yyyy-MM-DD')
        };
        await axios.post('http://localhost:8000/api/getAvailable', paquete).then(({data})=>{
            if(data.length==0)
                setOk(true);

                data.map((e, key)=>{
                    
                if(tempDate != e.nope){
                    setTempDate(e.nope);
                    setNotAvailable([]);
                    if(e.XD<=e.counted){
                        setNotAvailable(old=>[...old, e.nope])

                    }}else{
                        console.log("misma fecha");
                    }
                }
            )
            
            notAvailable.map((e,key)=>{
                if(e == moment(startDate).format('HH:mm:SS')){
                    setMensageee('This time is not available 🔴');
                    setCocolor('red');
                    setOk(false)
                }else{
                    setMensageee('');
                    setCocolor('black');
                    setOk(true);
                }
            });
          });   
    }
    const filteredDays = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const getCurrentUser = async () => {
        const loc = localStorage.getItem('email');
        await axios.get('/api/getCurrentUser/' + loc).then(({data})=>{
            const {id}  = data.user[0];
            setId(id);
        })
    }

    const createDate = async (e) => {
        e.preventDefault();
        console.log("service: " + id_service);
        console.log("shop: " + id_shop);
        console.log("date: " + ok);
        console.log("style: " + id_style);
        console.log("color: " + id_color);
        if(id_service != null && id_shop != null && ok && id_service != null && id_color != null){
            const packet = {
                date: moment(startDate).format('yyyy-MM-DD HH:mm:00'),
                id_shop: id_shop,
                access: 'soso'
            };
            await axios.post('/api/getAvailableStylist/', packet).then(({data})=>{
                const formData = new FormData()
                formData.append('id_service', id_service)
                formData.append('id_client', id)
                formData.append('id_shop', id_shop)

                const {id_sss}  = data[0].id;
                formData.append('id_stylist', data[0].id)
                console.log(data[0].id);
                            formData.append('id_style', id_style)
            formData.append('id_color', id_color)
            formData.append('fulldate', moment(startDate).format('yyyy-MM-DD HH:mm:00'))
            formData.append('date', moment(startDate).format('yyyy-MM-DD'))
            formData.append('hour', moment(startDate).format('HH:mm:00'))
            formData.append('payed', 0)
            formData.append('ok', 0)
            axios.post(`http://localhost:8000/api/dates`, formData).then(({data})=>{
                Swal.fire({
                  icon:"success",
                  text:"You have added correctly a new date! 😍😶"
                })
                navigate("/ClientPanel/clientDates/add")
              }).catch(({response})=>{
                if(response.status===422){
                  setValidationError(response.data.errors)
                }else{
                  Swal.fire({
                    text:response.data.message,
                    icon:"error"
                  })
                }
              })
            })


        }else{
            Swal.fire({
                text:'You need to set all the inputs',
                icon:"error"
              })
        }
    

      }
    return (
        <div className="bg" style ={{backgroundImage: 'https://estudioniddo.com/wp-content/uploads/2019/01/img_destacada_17-1200x800.jpg' }}>
            <div className="container" style={{
                                backgroundColor: 'rgba(0,0,0,0.7)'}}>
                <div className="row justify-content-center">
                    <div className="col-md-8" >
                        <div
                            style={{
                                fontFamily: "Aesthetic",
                                fontSize: 25,
                                color: "white",
                                textAlign: "center"
                            }}
                        >
                            Create a new date
                        </div>
                        <Form onSubmit={createDate}>
                        <div style={{ top: 20, fontSize: 15, color: 'white',alignContent: 'center', borderWidth: 15 , borderRadius: 25, 
                            borderColor:'white', backgroundColor: 'black',fontStyle: 'italik', textAlign: 'center' }}>
                            Choose your Aesthetic Beauty shop
                            <div>
                                <select className="form-control" name="id_shop" options = {shops} id="id_shop" onChange={(event)=>{{
                                setId_shop(event.target.value), fetchAvailableServices(), cleanStyles()}
                                }} value={id_shop} style={{backgroundColor: 'black', color: 'white'}}>
                                    {shops.map((e, key) => {
                                        return <option key={key} value={e.id}>{e.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                            <div style={{ top: 20, fontSize: 15, color: 'white',alignContent: 'center', borderWidth: 15 , borderRadius: 25, 
                            borderColor:'white', backgroundColor: '#190a4d',fontStyle: 'italik', textAlign: 'center', marginTop: 20, paddingBottom: 10 }}>
                                Check availability
                                <div>
                                    <DatePicker  selected={startDate} minDate={new Date()} filterDate={filteredDays} 
                                        filterTime={filterPassedTime} placeholderText="Pick a date" 
                                        minTime={setHours(setMinutes(0,0),10)} maxTime={setHours(setMinutes(0,45),16)} 
                                        dateFormat="yyyy-MM-dd hh:mm:ss" 
                                        showTimeSelect onChange={(date) => {setStartDate(date), fetchAvailable()}}>

                                        
                                    </DatePicker>
                                    <div style={{ color: {cocolor} }}>{mensageee}</div>
                                </div>
                            </div>
                            <div style={{ top: 20, fontSize: 15, color: 'white',alignContent: 'center', borderWidth: 15 , borderRadius: 25, 
                            borderColor:'white', backgroundColor: '#190a4d',fontStyle: 'italik', textAlign: 'center', marginTop: 20, paddingBottom: 10 }}>
                                Select a service
                                <div>
                                
                                <select className="form-control" name="id_Service" options = {services} id="id_Service" onChange={(event)=>{{{
                                setId_service(event.target.value), Option(event.target.value), cleanStyles()}}
                                }} value={id_service} style={{backgroundColor: 'black', color: 'white'}}>
                                    {services.map((e, key) => {
                                        return (

                                                <option key={key} value={e.id}>{e.name}</option>
                                            );
                                    })}
                                </select>
                                <div style ={{fontStyle: 'bold', textAlign: 'center'}}>
                                
                            <div style ={{display: 'flex', alignContent: 'center',fontSize: 15, color: 'white'}}>
                                <div>{(url!='') ? <img style={{borderRadius: 50}} width="100px" src={`./storage/service/image/${url}`} /> : <></>

                                    }
                                </div>
                                <div style ={{fontSize: 13, color: '#FFF00A'}}>
                                    {description}
                                </div>
                            </div>

                        </div>
                            </div>
                            </div>
                            <div style={{ top: 20, fontSize: 15, color: 'white',alignContent: 'center', borderWidth: 15 , borderRadius: 25, 
                                borderColor:'white', backgroundColor: '#232F93',fontStyle: 'italik', textAlign: 'center', marginTop: 20, paddingBottom: 10 }}>
                                Select a style
                                <div>
                                <Button as="input" variant="light" type="button" value="All 🌐" onClick={()=> {setFiltrogen('0'), refreshpersex(), cleanStyles()}} disabled={isdisa}/>{' '}
                                <Button as="input" type="button" value="Men ♂️" onClick={()=> {setFiltrogen('1'), refreshpersex(), cleanStyles()}} disabled={isdisa}/>{' '}
                                <Button as="input" variant="danger" type="button" value="Women ♀️" onClick={()=> {setFiltrogen('2'), refreshpersex(), cleanStyles()}} disabled={isdisa}/>{' '}
                                <Button as="input"  variant="warning" type="button" value="Unisex ♀️♂️" onClick={()=> {setFiltrogen('3'), refreshpersex(), cleanStyles()}} disabled={isdisa}/>{' '}
                                <select className="form-control" name="id_style" options = {styles} id="id_style" onChange={(event)=>{{{
                                setId_style(event.target.value), refreshSexData(event.target.value), id_style2 = event.target.value, console.log(id_style2),refreshColorSearch(event.target.value)}}
                                }} value={id_style} style={{backgroundColor: 'black', color: 'white'}}>
                                    {styles.map((e, key) => {
                                        return (

                                                <option key={key} value={e.id}>{e.name}</option>
                                            );
                                    })}
                                </select>
                                <div style ={{fontStyle: 'bold', textAlign: 'center'}}>
                                
                            <div style ={{display: 'flex', alignItems: 'center',fontSize: 15, color: 'white'}}>
                                <div>{(urlStyle!='') ? <img width="100px" style = {{borderRadius: 50}}src={`./storage/style/image/${urlStyle}`} /> : <></>

                                    }
                                </div>
                                    <div style ={{fontSize: 50, color: 'white'}}>
                                        {(costStyle!=null) ? '$' + costStyle : <></>}
                                </div>
                            </div>

                        </div>
                            </div>
                            </div>
                            <div style={{ top: 20, fontSize: 15, color: 'white',alignContent: 'center', borderWidth: 15 , borderRadius: 25, 
                                borderColor:'white', backgroundColor: '#30f348',fontStyle: 'italik', textAlign: 'center', marginTop: 20, paddingBottom: 10 }}>
                                Select a color
                                <div>
                                <input
                                    type="text"
                                    placeholder="⚛️ Search"
                                    value={filtroTexto}
                                    onChange={(event)=>{
                                        setFiltroTexto(event.target.value),
                                        refreshColorSearch(event.target.value)
                                      }}
                                    />
                                <select className="form-control" name="id_style" options = {color} id="id_color" onChange={(event)=>{{{
                                setId_color(event.target.value),showColor(event.target.value) }}
                                }} value={id_color} style={{backgroundColor: 'black', color: 'white'}}>
                                    {color.map((e, key) => {
                                        return (

                                                <option key={key} value={e.id}>{e.name}</option>
                                            );
                                    })}
                                </select>
                                <div style ={{fontStyle: 'bold', textAlign: 'center'}}>
                                
                            <div style ={{display: 'flex', alignItems: 'center',fontSize: 15, color: 'white'}}>
                                <div>{(urlColor!='') ? <img width="100px" style = {{borderRadius: 50}}src={`./storage/color/image/${urlColor}`} /> : <></>

                                    }
                                </div>
                            </div>
                        </div>
                            </div>
                            </div>
                            <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                Save Date
                            </Button>
                        </Form>

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CreateDate;

if (document.getElementById("createdate")) {
    ReactDOM.render(<CreateDate />, document.getElementById("createdate"));
}
