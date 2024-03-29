import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Dropzone from '../../components/Dropzone';
import { MakerPoint } from '../../components/MakerPoint';
import api from '../../services/api';
import './styles.css';

const CreatePoint = () => {
    /*==========|INTERFACES|==========*/
    interface Item {
        id: number;
        title: string;
        image_url: string;
    }

    interface IBGEUFResponse {
        sigla: string;
    }
    
    interface IBGECityResponse {
        nome: string;
    }

    /*==========|INTERFACES|==========*/


    /*================|Estado|================*/
    const [items , setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedUF, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedFile, setSelectedFile] = useState<File>();
    /*================|Estado|================*/

    const navigate = useNavigate();

/*-------------- |EFECT ITEMS| --------------*/
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

/*------------------------------------ |EFECT UF| -------------------------------------------------------------------*/
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

/*------------------------------------ |EFECT CITY| -------------------------------------------------------------------*/
    useEffect(() => {
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
            // carregar as cidades empre que a UF mudarcons
            if (selectedUF === '0'){
                return;
            }
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        })
    }, [selectedUF]);

/*------------------------------------ |EFECT CITY| -------------------------------------------------------------------*/
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setSelectedPosition([latitude, longitude]);
        })
    }, []);
/*=================================================================================*/

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleMapClick(lat: number, lon: number) {
        setSelectedPosition(() => [
            lat,
            lon,
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id);
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude,longitude] = selectedPosition;
        const items = selectedItems;

        const data = new FormData();

        
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if (selectedFile) {
            data.append('image', selectedFile)
        }
        
        await api.post('points', data);

        alert('Ponto de coleta criado!');

        navigate('/');
    }

    return (
    <div id="page-create-point">
        <header>
            <img src={logo} alt="Ecoleta"/>
            <Link to="/">
                <FiArrowLeftCircle />
                Voltar para home
            </Link>
        </header>

        <form onSubmit={handleSubmit}>
            <h1>Cadastro do <br/> ponto decoleta</h1>

            <div style={{marginTop: 50}} >
                <Dropzone onFileUploader={setSelectedFile} />
            </div>
            
            <fieldset>
                <legend>
                    <h2>Dados</h2>
                </legend>
                <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input type="text" name="name" id="name" onChange={handleInputChange}/>
                </div>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" onChange={handleInputChange}/>
                    </div>
                    <div className="field">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione o endereço no mapa</span>
                </legend>

                <MapContainer center={selectedPosition} zoom={13.25}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MakerPoint onClick={handleMapClick} position={selectedPosition} />
                </MapContainer>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select name="uf" id="uf" value={selectedUF} onChange={handleSelectUf}>
                            <option value="0">Selecione uma UF</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                            <option value="0">Selecione uma cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Ítens de coleta</h2>
                    <span>Selecione um ou mais ítens abaixo</span>
                </legend>

                <ul className="items-grid">
                    {items.map(item => (
                        <li 
                            key={item.id} 
                            onClick={() => handleSelectItem(item.id)}
                            className={selectedItems.includes(item.id) ? 'selected' : ''}
                        >
                            <img src={item.image_url} alt={item.title}/>
                            <span>{item.title}</span>
                        </li>
                    ))}
                    
                </ul>

            </fieldset>

            <button type="submit">
                Cadastrar ponto de coleta
            </button>
        </form>
    </div>
    )
}

export default CreatePoint;