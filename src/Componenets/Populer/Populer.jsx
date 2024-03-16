import React from 'react';
import './Populer.css';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const Populer = () => {
  const chunkSize = 3; // Number of items per row

  const chunkedData = data_product.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new row
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return (
    <div className='populer'>
      <h1>New Launch Bikes</h1>
      <hr />
      <div className="populer-items">
        {chunkedData.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="populer-row">
            {chunk.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Populer;
