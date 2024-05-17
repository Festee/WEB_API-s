import React, { useEffect, useState } from 'react';
import "./style.css"

interface FoodItem {
  food: {
    value: string;
  };
  foodLabel: {
    value: string;
  };
}

const FoodItems: React.FC = () => {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?food ?foodLabel
        WHERE {
          ?food wdt:P279 wd:Q2095 ;  
                rdfs:label ?foodLabel .
          FILTER(LANG(?foodLabel) = 'en')
        }
      `;

      const endpoint = 'https://query.wikidata.org/sparql';
      const url = `${endpoint}?query=${encodeURIComponent(query)}&format=json`;

      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        });

        const data = await response.json();
        console.log('Data from SPARQL endpoint:', data);
        setFoodData(data.results.bindings);
      } catch (error) {
        console.error('Error fetching RDF data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container-food'>
      <h1 className='food-h1'>Food Items</h1>
      <ul className='food-ul'>
        {foodData.map((food) => (
          <li key={food.food.value} className='food-li'>
            {food.foodLabel.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodItems;