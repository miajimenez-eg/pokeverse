import React from 'react';
import useSWR, { fetcher } from "../swr";
import Card from 'react-bootstrap/Card';

export default function PokemonCard({ url, name }) {
  const { data, error, isLoading } = useSWR(url, fetcher)

  if(error){
    return(
      <Card>
        <Card.Body>
          <Card.Title>Error</Card.Title>
          <Card.Text>There was an error fetching the Pokemon data</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  if(isLoading){
    return(
      <Card>
        <Card.Body>
          <Card.Title>Loading...</Card.Title>
          <Card.Text>Fetching the Pokemon data...</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card>
			<img
				className="d-block mx-auto"
				src={data.sprites.front_default}
				alt=""
				width="96"
				height="96"
			/>
			<Card.Body>
				<Card.Title className="text-capitalize">{name}</Card.Title>
				<Card.Text as="div">
					<p>Abilities:</p>
					<ul>
						{data.abilities.map(({ ability }) => (
							<li key={ability.name}>{ability.name}</li>
						))}
					</ul>
				</Card.Text>
			</Card.Body>
		</Card>
  );
}


