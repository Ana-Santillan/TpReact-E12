import { React, useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import Lista from './Lista';

const Formulario = () => {
    const [categoria, setCategoria] = useState("");
    const [pais, setPais] = useState("");
    const [listaNoticias, setListaNoticias] = useState([]);
    const [listaPaises, setListaPaises] = useState([]);
    const apiKey = "pub_241782e226ccca37315e12e270a9ef6fd4259"

    const traerNoticias = async () => {
        try {
            const respuesta = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&category=${categoria}&country=${pais}`);
            const dato = await respuesta.json();
            console.log(respuesta)
            console.log(dato);
            setListaNoticias(dato.results);
        } catch (error) {
            console.log(error);
        }
    }

    const paises = async () => {
        try {
            const respuesta = await fetch(`https://restcountries.com/v3.1/all`);
            const paises = await respuesta.json();
            let nuevosPaises = paises.map((pais) => {
                return {
                    Country: pais.name.common,
                    CountryCode: pais.cca2.toLowerCase()
                }
            })
            console.log(nuevosPaises);
            setListaPaises(nuevosPaises)

        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        traerNoticias();
    }

    const eliminarPelicula = (index) => {
        let PeliculasActualizadas = listaPeliculas.filter((pelicula, indexPelicula) => indexPelicula != index);
        setPeliculas(PeliculasActualizadas);
    }

    useEffect(() => {
        paises()
    }, [])
    /* useEffect(()=>{
        localStorage.setItem('Peliculas', JSON.stringify(listaPeliculas))
    },[listaPeliculas]) */

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Card className='fondoCard'>
                    <Card.Body>
                        <Card.Title className='text-center'>
                            <h3>Pelicula</h3>
                        </Card.Title>
                        <Form.Group className='mt-3'>
                            <Form.Select onChange={(e) => setCategoria(e.target.value)} value={categoria}>
                                <option value="business">business</option>
                                <option value="entertainment">entertainment</option>
                                <option value="environment">environment</option>
                                <option value="food">food</option>
                                <option value="health">health</option>
                                <option value="politics">politics</option>
                                <option value="science">science</option>
                                <option value="sports">sports</option>
                                <option value="technology">technology</option>
                                <option value="top">top</option>
                                <option value="tourism">tourism</option>
                                <option value="world">world</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Select onChange={(e) => setPais(e.target.value)} value={pais}>
                                {listaPaises.map((pais, index) => {
                                    return (
                                        <option key={index} value={pais.CountryCode}>{pais.Country}</option>
                                    )
                                })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mt-3 text-end'>
                            <Button variant="primary" type="submit">Buscar</Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Form>
            <Lista listaNoticias={listaNoticias}></Lista>
        </>

    );
};

export default Formulario;