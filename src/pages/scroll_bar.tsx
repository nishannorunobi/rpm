import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Scroll_bar = (props: any) => {
  console.log(props.doc_names);

  const [items, setItems] = useState([]);
  const [noMore, setNoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [size, setSize] = useState(5);

  const [doc, setDoc] = useState([]);
  const [rank, setRank] = useState([]);
  const [similarity, setSimilarity] = useState([]);
  const [years, setYears] = useState([]);

  const fetchDocuments = async () => {
    const resp = fetch('http://localhost:8000/get-paginated-data?page=1&size=5');
    const data = await resp.json();
    return data;
  };

  const fetchData = () => {
    const itemsFromServer = fetchDocuments();
    //setItems(items.concat(itemsFromServer));

    if (itemsFromServer.length == 0 || itemsFromServer.length < size) {
      setNoMore(false);
    }
    setPage((page) => page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={props.fetchData}
      hasMore={noMore}
      loader={<Button onClick={props.fetchData}>Load more</Button>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    ></InfiniteScroll>
  );
};

export default Scroll_bar;
