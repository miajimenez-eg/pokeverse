import React, { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Navigation from "./components/Navigation";
import PokemonCard from "./components/PokemonCard";
import useSWR, { fetcher } from "./swr";

const LIMIT = 150;
const POKE_API = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

export default function App() {

  function Wrapper({ children }) {
    return (
      <>
        <Navigation />
        <Container className="py-4">{children}</Container>
      </>
    );
  }

  // use states
  const { data, error, isLoading } = useSWR(POKE_API, fetcher);
  const [searchTerms, setSearchTerms] = useState("");

  function handleChange(event) {
    setSearchTerms(event.target.value);
  }

  function includesSearchTerms({ name }) {
    return name.toLowerCase().includes(searchTerms.toLowerCase());
  }

  if (error){
    return (
      <Wrapper>
				<Alert variant="danger">
					Error: There was a problem fetching the Pokémon data.
				</Alert>
			</Wrapper>
    );
  }

  if (isLoading) {
    return (
			<Wrapper>
				<Alert>Fetching the Pokémon data...</Alert>
			</Wrapper>
		);
  }

  return (
    <Wrapper>
      <InputGroup class="mb-3">
        <InputGroup.Text id="search">Search</InputGroup.Text>
        <Form.Control
          aria-label="pokemon name"
          aria-describedby="search"
          value={searchTerms}
          onChange={handleChange}
        />
      </InputGroup>
      { <Row xs={1} sm={2} md={3} lg={4} className="g-4">
				{data.results.filter(includesSearchTerms).map((pokemon) => (
					<Col key={pokemon.name}>
						<PokemonCard {...pokemon} />
					</Col>
				))} 
			</Row>}
    </Wrapper>
  );
}


