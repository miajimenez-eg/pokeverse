import React from 'react';
import useSWR, { fetcher } from "../swr";

export default function PokemonCard({ url, name }) {
  const { data, error, isLoading } = useSWR(url, fetcher)

  if(error){
    return(
      <Card>
        <Card.body>
          <Card.title>Error</Card.title>
          <Card.text>There was an error fetching the Pokemon data</Card.text>
        </Card.body>
      </Card>
    )
  }

  if(isLoading){
    return(
      <Card>
        <Card.body>
          <Card.title>Loading...</Card.title>
          <Card.text>Fetching the Pokemon data...</Card.text>
        </Card.body>
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


