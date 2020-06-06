import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import './styles.css';

// sempre que se cria um estado para um array ou objeto: Precisa manualmente informar o tipo da variavel 

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

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [ cities, setCities ] = useState<string[]>([]);

    const [ selectedUf, setSelectedUF ] = useState('0');


    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    

    useEffect(() => {
        //carregar as cidades sempre que a UF mudar
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGEUFResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUf]);


    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUF(uf);
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

        <form>
            <h1>Cadastro do <br/> ponto de coleta</h1>
            
            <fieldset>
                <legend>
                    <h2>Dados</h2>
                </legend>
            </fieldset>
            <div className="field">
                <label htmlFor="name">Nome da entidade</label>
                <input type="text" name="name" id="name"/>
            </div>
            <div className="field-group">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="field">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <input type="text" name="whatsapp" id="whatsapp"/>
                </div>
            </div>

            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione o endereço no mapa</span>
                </legend>

                <Map center={[55.7509012, 37.6146]} zoom={15.75}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position= {[55.7509012, 37.6146]} />
                </Map>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado</label>
                        <select name="uf" value={selectedUf} id="uf" onChange={handleSelectUf}>
                            <option value="0">Selecione uma UF</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                            
                        </select>
                    </div>
                </div>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city">
                            <option value="0">Selecone uma cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>

            </fieldset>

            <fieldset>
                <legend>
                    <h2>Ítems de coleta</h2>
                    <span>Selecione um ou mais ítems abaixo</span>
                </legend>

                <ul className="items-grid">
                    {
                        items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))
                    }
                    
                </ul>
            </fieldset>
            <button type="submit">Cadastrar ponto de coleta</button>
        </form>

        </div>
    );
};

export default CreatePoint;